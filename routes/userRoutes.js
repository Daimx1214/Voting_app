const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the Person model
const { jwtAuthMiddleware, generateToken } = require('../jwt'); // Import the JWT authentication middleware


router.post('/signup', async (req, res) => {
    try {
        const data = req.body; 

        // Check only one admin user can be created
        if (data.roles === 'admin') {
            const adminUser = await User.findOne({ roles: 'admin' });
            if (adminUser) {
                return res.status(400).json({ error: 'Admin user already exists' });
            }
        }

        const newUser = new User(data);
        const response = await newUser.save();

        const payload = {
            id: response.id
        };
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({ response: response, token: token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { Id_Card, password } = req.body;
        const user = await User.findOne({ Id_Card: Id_Card });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid Id_Card  or password' });
        }

        const payload = {
            id: user.id
        };
        const token = generateToken(payload);

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});


router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid old password' });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error: ' + error.message });
    }
});
module.exports = router;