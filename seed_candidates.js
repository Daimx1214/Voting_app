require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('./models/candidate');

const mongoURL = process.env.MONGODB_URL_LOCAL || 'mongodb://127.0.0.1:27017/voting';

const candidatesList = [
  { name: 'Imran Khan', party: 'PTI', age: 71, image: '/candidates/imran_khan.jpg' },
  { name: 'Shehbaz Sharif', party: 'PML-N', age: 72, image: '/candidates/shehbaz_sharif.jpg' },
  { name: 'Nawaz Sharif', party: 'PML-N', age: 74, image: '/candidates/nawaz_sharif.jpg' },
  { name: 'Bilawal Bhutto Zardari', party: 'PPP', age: 35, image: '/candidates/bilawal_bhutto.jpg' },
  { name: 'Maryam Nawaz', party: 'PML-N', age: 50, image: '/candidates/maryam_nawaz.jpg' },
  { name: 'Siraj-ul-Haq', party: 'Jamaat-e-Islami', age: 61, image: '/candidates/siraj_ul_haq.jpg' },
  { name: 'Mustafa Kamal', party: 'MQM-P', age: 52, image: '/candidates/mustafa_kamal.jpg' },
  { name: 'Saad Hussain Rizvi', party: 'TLP', age: 29, image: '/candidates/saad_rizvi.jpg' },
  { name: 'Fazal-ur-Rehman', party: 'JUI-F', age: 70, image: '/candidates/fazal_ur_rehman.jpg' },
  { name: 'Ali Zaidi', party: 'Independent', age: 53, image: '/candidates/ali_zaidi.jpg' },
  { name: 'Asad Umar', party: 'Independent', age: 62, image: '/candidates/asad_umar.jpg' }
];

async function seed() {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB');

    for (const cand of candidatesList) {
      await Candidate.findOneAndUpdate(
        { name: cand.name },
        cand,
        { upsert: true, new: true }
      );
      console.log(`Updated/Created candidate: ${cand.name} (${cand.party})`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding candidates:', err);
    process.exit(1);
  }
}

seed();
