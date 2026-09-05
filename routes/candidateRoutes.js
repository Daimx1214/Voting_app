const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../jwt');

const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return false;
        }
        return user.roles === 'admin';
    } catch (error) {
        console.error('Error checking user role:', error);
        return false;
    }
};

router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log("Candidate created successfully");
        res.status(200).json({ response: response });
    } catch (error) {
        console.error('Error creating candidate:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

router.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const candidateId = req.params.candidateId;
        const response = await Candidate.findByIdAndUpdate(candidateId, req.body, {
            new: true,
            runValidators: true
        });

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log('Candidate updated successfully');
        res.status(200).json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

router.delete('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
        const candidateId = req.params.candidateId;
        const response = await Candidate.findByIdAndDelete(candidateId);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log('Candidate deleted successfully');
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json({ candidates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

router.post("/vote/:candidateId", jwtAuthMiddleware, async (req, res) => {
    try {
        const candidateId = req.params.candidateId;
        const userId = req.user.id;

        // Check if the user has already voted
        const user = await User.findById(userId);
        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
         if (user.isVoted) {
            return res.status(400).json({ error: 'You have already voted' });
        }
        if(user.roles === 'admin'){
            return res.status(403).json({ error: 'Admins are not allowed to vote' });
        }
        candidate.votes.push({ user: userId });
        candidate.votesCount += 1;
        await candidate.save();

        // Mark the user as having voted
        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote cast successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

router.get('/vote/count', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ votesCount: -1 }); // Sort candidates by votesCount in descending order
        const voteCounts = candidates.map(candidate => ({
            candidateId: candidate._id,
            name: candidate.name,
            party: candidate.party,
            count: candidate.votesCount
        }));
        res.status(200).json({ voteCounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
}); 

module.exports = router;