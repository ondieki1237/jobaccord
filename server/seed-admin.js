require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const email = 'humanresource@accordmedical.co.ke';
  const password = 'accord2026';

  let admin = await Admin.findOne({ email });
  if (admin) {
    console.log('✅ Admin account already exists:', email);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    console.log('✅ Seeded admin account:', email);
  }
  mongoose.disconnect();
}

seedAdmin().catch(err => {
  console.error('❌ Error seeding admin:', err);
  mongoose.disconnect();
});
