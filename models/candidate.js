const mongoose = require('mongoose');

// Define the schema for the Candidate model
const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    votesCount: {   
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;