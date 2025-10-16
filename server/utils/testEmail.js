require('dotenv').config();
const nodemailer = require('nodemailer');

// Test email configuration
const testEmail = async () => {
  console.log('🔍 Testing Email Configuration...\n');
  console.log('SMTP Settings:');
  console.log(`  Host: ${process.env.EMAIL_HOST}`);
  console.log(`  Port: ${process.env.EMAIL_PORT}`);
  console.log(`  User: ${process.env.EMAIL_USER}`);
  console.log(`  From: ${process.env.EMAIL_FROM}\n`);

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('📧 Verifying SMTP connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');

    // Send test email
    console.log('📨 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to self
      subject: 'Test Email - Accord Medical Job Application System',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email from your job application system.</p>
        <p><strong>SMTP Configuration:</strong></p>
        <ul>
          <li>Host: ${process.env.EMAIL_HOST}</li>
          <li>Port: ${process.env.EMAIL_PORT}</li>
          <li>User: ${process.env.EMAIL_USER}</li>
        </ul>
        <p>If you received this email, your SMTP configuration is working correctly! ✅</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Accord Medical Supplies Ltd<br>
          Job Application System
        </p>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}\n`);
    console.log('🎉 Email configuration is working perfectly!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    console.error('\n📝 Troubleshooting tips:');
    console.error('  1. Verify SMTP credentials are correct');
    console.error('  2. Check if port 465 is not blocked by firewall');
    console.error('  3. Ensure email account allows SMTP access');
    console.error('  4. Try using port 587 with STARTTLS if 465 fails\n');
    process.exit(1);
  }
};

testEmail();
