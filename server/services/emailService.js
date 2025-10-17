const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT || '587');
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    requireTLS: port === 587, // Force TLS for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 15000, // 15 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 15000, // 15 seconds
    tls: {
      rejectUnauthorized: false, // Accept self-signed certificates
      ciphers: 'SSLv3' // Support older TLS versions if needed
    },
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    logger: process.env.NODE_ENV === 'development' // Enable logger in development
  });
};

// Send application confirmation email
const sendApplicationConfirmation = async (applicationData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: applicationData.email,
      subject: 'Application Received - Technical Sales Supervisor Position',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.7;
      color: #22223b;
      background: #f4f8fb;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      padding: 0;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(37, 99, 235, 0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #0077c8 0%, #00b4d8 100%);
      color: #fff;
      padding: 36px 30px 18px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 8px 0;
      font-size: 2.2rem;
      letter-spacing: 1px;
    }
    .header p {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .content {
      background: #fafdff;
      padding: 32px 30px 24px 30px;
      border-top: 1px solid #e0e7ef;
    }
    .application-id {
      background: #e0f2fe;
      border-left: 5px solid #00b4d8;
      padding: 14px 18px;
      margin: 22px 0 18px 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #0077c8;
      border-radius: 6px;
    }
    .info-box {
      background: #fff;
      border: 1px solid #e0e7ef;
      border-radius: 8px;
      padding: 18px 16px;
      margin: 18px 0;
      box-shadow: 0 2px 8px rgba(0,180,216,0.04);
    }
    .info-box h3 {
      color: #0077c8;
      margin-top: 0;
      font-size: 1.1rem;
    }
    .footer {
      text-align: center;
      padding: 24px 10px 18px 10px;
      color: #6b7280;
      font-size: 15px;
      background: #f4f8fb;
    }
    .social-links {
      margin: 24px 0 0 0;
      text-align: center;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      color: #00b4d8;
      text-decoration: none;
      font-size: 1.2rem;
      transition: color 0.2s;
    }
    .social-links a:hover {
      color: #0077c8;
    }
    .button {
      display: inline-block;
      background: linear-gradient(90deg, #00b4d8 0%, #0077c8 100%);
      color: #fff;
      padding: 13px 28px;
      text-decoration: none;
      border-radius: 8px;
      margin: 18px 0 0 0;
      font-weight: 600;
      font-size: 1.1rem;
      box-shadow: 0 2px 8px rgba(0,119,200,0.08);
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Received!</h1>
      <p>Thank you for applying to Accord Medical Supplies Ltd</p>
    </div>
    <div class="content">
      <p style="font-size:1.1rem;">Dear ${applicationData.fullName},</p>
      <p>Thank you for your interest in the <strong>Technical Sales Supervisor</strong> position in our Biomedical Division - Nairobi.</p>
      <div class="application-id">
        📋 Application ID: ${applicationData.applicationId}
      </div>
      <div class="info-box">
        <h3>What Happens Next?</h3>
        <ul style="padding-left:18px;">
          <li>Our HR team will carefully review your application</li>
          <li>Shortlisted candidates will be contacted any time soon</li>
          <li>Please keep your phone and email accessible</li>
          <li>You can reference your Application ID for any inquiries</li>
        </ul>
      </div>
      <div class="info-box">
        <h3>Application Summary</h3>
        <p><strong>Position:</strong> Technical Sales Supervisor</p>
        <p><strong>Department:</strong> Biomedical Division</p>
        <p><strong>Location:</strong> Nairobi, Kenya</p>
        <p><strong>Submitted:</strong> ${new Date(applicationData.submittedAt).toLocaleString()}</p>
        <p><strong>Email:</strong> ${applicationData.email}</p>
        <p><strong>Phone:</strong> +254 729 115000</p>
      </div>
      <p>If you have any questions, please don't hesitate to contact us at <strong>info@accordmedical.co.ke</strong></p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://accordmedical.co.ke/" class="button">Visit Our Website</a>
      </div>
      <div class="social-links">
        <p><strong>Stay Connected:</strong></p>
        <a href="https://www.facebook.com/AccordMedKe" title="Facebook">Facebook</a>
        <a href="https://x.com/AccordMedKe" title="Twitter/X">Twitter/X</a>
        <a href="https://www.tiktok.com/@accordmedicalke" title="TikTok">TikTok</a>
        <a href="https://www.linkedin.com/company/accord-medical-supplies-ltd/" title="LinkedIn">LinkedIn</a>
        <a href="https://www.instagram.com/accordmedicalke/" title="Instagram">Instagram</a>
      </div>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Accord Medical Supplies Ltd. All rights reserved.</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully to:', applicationData.email);
    console.log('   Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Confirmation email sending error:');
    console.error('   To:', applicationData.email);
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    return { success: false, error: error.message };
  }
};

// Send notification to admin
const sendAdminNotification = async (applicationData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Application: ${applicationData.fullName} - Technical Sales Supervisor`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #dc2626;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      background: #f9fafb;
      padding: 20px;
      border: 1px solid #e5e7eb;
    }
    .section {
      background: white;
      padding: 15px;
      margin: 15px 0;
      border-left: 4px solid #2563eb;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      padding: 8px;
      border-bottom: 1px solid #e5e7eb;
    }
    .label {
      font-weight: bold;
      width: 200px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🆕 New Job Application Received</h2>
    </div>
    
    <div class="content">
      <div class="section">
        <h3>Applicant Information</h3>
        <table>
          <tr>
            <td class="label">Application ID:</td>
            <td>${applicationData.applicationId}</td>
          </tr>
          <tr>
            <td class="label">Full Name:</td>
            <td>${applicationData.fullName}</td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td>${applicationData.email}</td>
          </tr>
          <tr>
            <td class="label">Phone:</td>
            <td>${applicationData.phone}</td>
          </tr>
          <tr>
            <td class="label">Location:</td>
            <td>${applicationData.location}</td>
          </tr>
          <tr>
            <td class="label">Eligible to Work:</td>
            <td>${applicationData.eligibleToWork === 'yes' ? '✅ Yes' : '❌ No'}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h3>Experience</h3>
        <table>
          <tr>
            <td class="label">Has Degree:</td>
            <td>${applicationData.hasDegree === 'yes' ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td class="label">Degree Details:</td>
            <td>${applicationData.degreeDetails || 'N/A'}</td>
          </tr>
          <tr>
            <td class="label">Years of Experience:</td>
            <td>${applicationData.yearsExperience || 'N/A'}</td>
          </tr>
          <tr>
            <td class="label">Has Supervised:</td>
            <td>${applicationData.hasSupervised === 'yes' ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td class="label">CRM Proficiency:</td>
            <td>${applicationData.crmProficiency}/5</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h3>Documents</h3>
        <p><strong>CV/Resume:</strong> <a href="${applicationData.cvLink}">View CV</a></p>
        ${applicationData.achievementsLink ? `<p><strong>Achievements:</strong> <a href="${applicationData.achievementsLink}">View Achievements</a></p>` : ''}
      </div>
      
      <div class="section">
        <h3>Quick Actions</h3>
        <p>Review this application in your admin dashboard.</p>
        <p><strong>Submitted:</strong> ${new Date(applicationData.submittedAt).toLocaleString()}</p>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent successfully to:', process.env.ADMIN_EMAIL);
    console.log('   Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Admin notification email error:');
    console.error('   To:', process.env.ADMIN_EMAIL);
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendApplicationConfirmation,
  sendAdminNotification,
};
