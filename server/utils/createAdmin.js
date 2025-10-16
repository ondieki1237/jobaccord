require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const createInitialAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists with email:', process.env.ADMIN_EMAIL);
      process.exit(0);
    }

    // Create admin
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Accord Medical Admin',
      role: 'super-admin',
    });

    console.log('✅ Initial admin created successfully');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Role:', admin.role);
    console.log('\n⚠️  Please change the default password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createInitialAdmin();
