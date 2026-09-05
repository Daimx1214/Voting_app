require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Candidate = require('./models/candidate');

const mongoURL = process.env.MONGODB_URL_LOCAL || 'mongodb://127.0.0.1:27017/voting';

const targetVotes = {
  'Imran Khan': 85,
  'Maryam Nawaz': 45,
  'Bilawal Bhutto Zardari': 35,
  'Saad Hussain Rizvi': 28,
  'Siraj-ul-Haq': 22,
  'Shehbaz Sharif': 16,       // Rank 6
  'Asad Umar': 12,
  'Fazal-ur-Rehman': 9,
  'Mustafa Kamal': 6,
  'Nawaz Sharif': 4,
  'Ali Zaidi': 2
};

const firstNames = ['Ahmad', 'Ali', 'Usman', 'Hamza', 'Bilal', 'Zain', 'Hassan', 'Omer', 'Fahad', 'Tariq', 'Sana', 'Ayesha', 'Fatima', 'Zahra', 'Hira', 'Maryam', 'Sara', 'Sadia', 'Noreen', 'Khadija'];
const lastNames = ['Khan', 'Chaudhry', 'Malik', 'Sheikh', 'Syed', 'Qureshi', 'Bhatti', 'Raza', 'Shah', 'Abbasi', 'Siddiqui', 'Mughal', 'Dar', 'Gill', 'Jutt', 'Mirza', 'Farooqi', 'Hashmi'];

async function seedVotes() {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB');

    const candidates = await Candidate.find({});
    console.log(`Found ${candidates.length} candidates in database.`);

    // Clear old seeded voters
    await User.deleteMany({ roles: 'voter' });
    console.log('Cleared previous seeded voter accounts.');

    // Pre-hash default voter password once for speed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('voterPassword123', salt);

    let cnicCounter = 3520200000000;
    let mobileCounter = 3001000000;
    let totalVotersCreated = 0;

    for (const cand of candidates) {
      const count = targetVotes[cand.name] || 5;
      cand.votes = []; // reset votes

      for (let i = 0; i < count; i++) {
        cnicCounter++;
        mobileCounter++;
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${fn} ${ln}`;
        const email = `voter_${cnicCounter}@votingapp.org`;

        // Direct user creation with pre-hashed password (bypasses pre-save hook)
        const userObj = new User({
          name: fullName,
          age: 20 + Math.floor(Math.random() * 45),
          email: email,
          mobile: `0${mobileCounter}`,
          address: 'District Central, Pakistan',
          Id_Card: cnicCounter,
          password: hashedPassword,
          roles: 'voter',
          isVoted: true
        });

        // Save raw object directly to avoid double hashing
        await User.collection.insertOne(userObj.toObject());
        totalVotersCreated++;

        const randomDaysAgo = Math.floor(Math.random() * 10);
        const voteDate = new Date(Date.now() - randomDaysAgo * 86400000 - Math.random() * 3600000);
        cand.votes.push({
          user: userObj._id,
          votedAt: voteDate
        });
      }

      cand.votesCount = cand.votes.length;
      await cand.save();
      console.log(`Updated candidate '${cand.name}': ${cand.votesCount} votes assigned.`);
    }

    console.log(`\nSuccessfully created ${totalVotersCreated} users and assigned all votes!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding votes:', err);
    process.exit(1);
  }
}

seedVotes();
