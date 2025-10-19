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

    // Get notification emails (support multiple recipients)
    const notificationEmails = process.env.NOTIFICATION_EMAILS || process.env.ADMIN_EMAIL;
    const hrEmail = process.env.HR_EMAIL || process.env.EMAIL_USER;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: notificationEmails, // Primary recipients
      cc: hrEmail !== notificationEmails ? hrEmail : undefined, // CC HR if different
      subject: `🔔 New Application: ${applicationData.fullName} - Technical Sales Supervisor`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 750px;
      margin: 20px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 600;
    }
    .header p {
      margin: 8px 0 0 0;
      opacity: 0.95;
      font-size: 1.05rem;
    }
    .alert {
      background: #fef3c7;
      border-left: 5px solid #f59e0b;
      padding: 15px 20px;
      margin: 20px;
      border-radius: 6px;
    }
    .alert strong {
      color: #92400e;
      display: block;
      margin-bottom: 5px;
    }
    .content {
      padding: 20px 30px;
    }
    .section {
      background: #f9fafb;
      padding: 20px;
      margin: 20px 0;
      border-left: 5px solid #2563eb;
      border-radius: 8px;
    }
    .section h3 {
      margin-top: 0;
      color: #1e40af;
      font-size: 1.3rem;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 6px;
      overflow: hidden;
    }
    tr {
      border-bottom: 1px solid #e5e7eb;
    }
    tr:last-child {
      border-bottom: none;
    }
    td {
      padding: 12px 15px;
    }
    .label {
      font-weight: 600;
      width: 180px;
      color: #4b5563;
    }
    .value {
      color: #1f2937;
    }
    .button {
      display: inline-block;
      background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 10px 0;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
    .button:hover {
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
    }
    .footer {
      background: #f9fafb;
      padding: 20px 30px;
      text-align: center;
      color: #6b7280;
      font-size: 0.9rem;
      border-top: 1px solid #e5e7eb;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .badge-success {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-warning {
      background: #fef3c7;
      color: #92400e;
    }
    .highlight {
      background: #dbeafe;
      padding: 3px 8px;
      border-radius: 4px;
      font-weight: 600;
      color: #1e40af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🆕 New Job Application Received</h2>
      <p>Technical Sales Supervisor - Biomedical Division</p>
    </div>
    
    <div class="alert">
      <strong>⏰ Action Required</strong>
      A new application has been submitted and requires your review. Please review and update the status in the admin dashboard.
    </div>
    
    <div class="content">
      <div class="section">
        <h3>👤 Applicant Information</h3>
        <table>
          <tr>
            <td class="label">Application ID:</td>
            <td class="value"><span class="highlight">${applicationData.applicationId}</span></td>
          </tr>
          <tr>
            <td class="label">Full Name:</td>
            <td class="value"><strong>${applicationData.fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Email:</td>
            <td class="value"><a href="mailto:${applicationData.email}">${applicationData.email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone:</td>
            <td class="value"><a href="tel:${applicationData.phone}">${applicationData.phone}</a></td>
          </tr>
          <tr>
            <td class="label">Location:</td>
            <td class="value">${applicationData.location}</td>
          </tr>
          <tr>
            <td class="label">Work Eligibility:</td>
            <td class="value">
              ${applicationData.eligibleToWork === 'yes' 
                ? '<span class="badge badge-success">✅ Eligible to Work</span>' 
                : '<span class="badge badge-warning">❌ Not Eligible</span>'}
            </td>
          </tr>
          <tr>
            <td class="label">Submitted:</td>
            <td class="value">${new Date(applicationData.submittedAt).toLocaleString('en-KE', { 
              dateStyle: 'full', 
              timeStyle: 'short',
              timeZone: 'Africa/Nairobi'
            })}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h3>🎓 Education & Experience</h3>
        <table>
          <tr>
            <td class="label">Degree:</td>
            <td class="value">${applicationData.hasDegree === 'yes' 
              ? '<span class="badge badge-success">✅ Has Degree</span>' 
              : '<span class="badge badge-warning">No Degree</span>'}</td>
          </tr>
          ${applicationData.degreeDetails ? `
          <tr>
            <td class="label">Degree Details:</td>
            <td class="value">${applicationData.degreeDetails}</td>
          </tr>` : ''}
          <tr>
            <td class="label">Years of Experience:</td>
            <td class="value"><strong>${applicationData.yearsExperience || 'Not specified'}</strong></td>
          </tr>
          <tr>
            <td class="label">Supervisory Experience:</td>
            <td class="value">${applicationData.hasSupervised === 'yes' 
              ? '<span class="badge badge-success">✅ Has Supervised Teams</span>' 
              : 'No supervisory experience'}</td>
          </tr>
          ${applicationData.leadershipDescription ? `
          <tr>
            <td class="label">Leadership Details:</td>
            <td class="value">${applicationData.leadershipDescription}</td>
          </tr>` : ''}
          <tr>
            <td class="label">CRM Proficiency:</td>
            <td class="value"><strong>${applicationData.crmProficiency || '3'}/5</strong> ⭐</td>
          </tr>
        </table>
      </div>

      ${applicationData.strengths && applicationData.strengths.length > 0 ? `
      <div class="section">
        <h3>💪 Key Strengths</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
          ${applicationData.strengths.map(strength => 
            `<span class="badge badge-success">${strength}</span>`
          ).join('')}
        </div>
      </div>` : ''}

      ${applicationData.equipmentExperience || applicationData.majorSaleDescription ? `
      <div class="section">
        <h3>🏆 Experience Highlights</h3>
        <table>
          ${applicationData.equipmentExperience ? `
          <tr>
            <td class="label">Equipment Experience:</td>
            <td class="value">${applicationData.equipmentExperience}</td>
          </tr>` : ''}
          ${applicationData.majorSaleDescription ? `
          <tr>
            <td class="label">Major Sale Achievement:</td>
            <td class="value">${applicationData.majorSaleDescription}</td>
          </tr>` : ''}
        </table>
      </div>` : ''}
      
      <div class="section">
        <h3>📎 Documents</h3>
        <table>
          <tr>
            <td class="label">CV/Resume:</td>
            <td class="value">
              <a href="${applicationData.cvLink}" class="button" style="padding: 10px 24px; font-size: 0.95rem;">
                📄 View CV/Resume
              </a>
            </td>
          </tr>
          ${applicationData.achievementsLink ? `
          <tr>
            <td class="label">Achievements:</td>
            <td class="value">
              <a href="${applicationData.achievementsLink}" class="button" style="padding: 10px 24px; font-size: 0.95rem;">
                🏆 View Achievements
              </a>
            </td>
          </tr>` : ''}
          ${applicationData.additionalDocuments && applicationData.additionalDocuments.length > 0 ? 
            applicationData.additionalDocuments.filter(doc => doc.label && doc.url).map(doc => `
          <tr>
            <td class="label">${doc.label}:</td>
            <td class="value">
              <a href="${doc.url}" style="color: #2563eb; text-decoration: none;">📎 View Document</a>
            </td>
          </tr>`).join('') : ''}
        </table>
      </div>
      
      <div class="section" style="text-align: center; background: #eff6ff; border-left-color: #2563eb;">
        <h3 style="color: #1e40af;">⚡ Quick Actions</h3>
        <p style="margin: 15px 0;">Review this application in your admin dashboard to update its status and add notes.</p>
        <a href="http://localhost:3002/admin/applications" class="button">
          🔍 Review in Admin Dashboard
        </a>
        <p style="margin-top: 15px; font-size: 0.9rem; color: #6b7280;">
          Or search for Application ID: <strong>${applicationData.applicationId}</strong>
        </p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Accord Medical Supplies Ltd</strong> - HR Department</p>
      <p>© ${new Date().getFullYear()} Accord Medical Supplies Ltd. All rights reserved.</p>
      <p style="margin-top: 10px; font-size: 0.85rem;">
        This is an automated notification. Emails sent to: ${notificationEmails}
      </p>
    </div>
  </div>
</body>
</html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification sent successfully');
    console.log('   To:', notificationEmails);
    if (hrEmail && hrEmail !== notificationEmails) {
      console.log('   CC:', hrEmail);
    }
    console.log('   Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Admin notification email error:');
    console.error('   To:', process.env.NOTIFICATION_EMAILS || process.env.ADMIN_EMAIL);
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendApplicationConfirmation,
  sendAdminNotification,
};
