require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');

const sampleJobs = [
  {
    title: 'Social Media Marketing Intern',
    department: 'Marketing',
    description: 'We are looking for a creative and enthusiastic Social Media Marketing Intern to join our dynamic marketing team. You will help manage our social media accounts, create engaging content, and analyze social media metrics.',
    qualifications: `
• Currently pursuing or recently completed a degree in Marketing, Communications, or related field
• Strong understanding of social media platforms (Facebook, Instagram, Twitter, LinkedIn, TikTok)
• Excellent written and verbal communication skills
• Creative mindset with attention to detail
• Basic knowledge of graphic design tools (Canva, Adobe Creative Suite) is a plus
• Ability to work independently and as part of a team
    `.trim(),
    responsibilities: `
• Create and schedule engaging social media content
• Monitor and respond to comments and messages
• Assist in developing social media strategies
• Analyze social media metrics and prepare reports
• Stay up-to-date with social media trends and best practices
• Collaborate with the marketing team on campaigns
    `.trim(),
    location: 'Nairobi',
    employmentType: 'internship',
    deadline: new Date('2025-11-15'),
    salary: 'Ksh 15,000 - 20,000 per month',
    status: 'open',
  },
  {
    title: 'Technical Sales Supervisor',
    department: 'Sales - Biomedical',
    description: 'Lead our technical sales team in the biomedical equipment sector. This role requires a combination of technical knowledge and sales expertise to drive revenue growth and maintain customer relationships.',
    qualifications: `
• Bachelor's degree in Biomedical Engineering, Sales, or related field
• Minimum  years of 3 experience in technical sales, preferably in medical equipment
• Proven track record of meeting or exceeding sales targets
• Strong leadership and team management skills
• Excellent communication and presentation skills
• Technical understanding of medical equipment and healthcare industry
• Valid driving license
    `.trim(),
    responsibilities: `
• Lead and manage the technical sales team
• Develop and implement sales strategies
• Build and maintain relationships with key clients
• Conduct product demonstrations and technical presentations
• Prepare sales forecasts and reports
• Train and mentor junior sales staff
• Collaborate with other departments to ensure customer satisfaction
    `.trim(),
    location: 'Nairobi',
    employmentType: 'full-time',
    deadline: new Date('2025-11-30'),
    salary: 'Competitive salary + commission',
    status: 'open',
  },
  {
    title: 'Customer Service Representative',
    department: 'Customer Support',
    description: 'Join our customer service team to provide exceptional support to our clients. You will be the first point of contact for customer inquiries, complaints, and product support.',
    qualifications: `
• Diploma or Degree in Business, Communication, or related field
• 1-2 years of customer service experience
• Excellent communication skills in English and Swahili
• Strong problem-solving abilities
• Proficiency in MS Office and CRM software
• Ability to remain calm under pressure
• Empathy and patience when dealing with customers
    `.trim(),
    responsibilities: `
• Respond to customer inquiries via phone, email, and chat
• Resolve customer complaints in a timely manner
• Process orders, forms, and applications
• Maintain accurate customer records
• Follow up with customers to ensure satisfaction
• Provide product and service information
• Escalate complex issues to supervisors when necessary
    `.trim(),
    location: 'Nairobi',
    employmentType: 'full-time',
    deadline: new Date('2025-11-20'),
    salary: 'Ksh 35,000 - 45,000 per month',
    status: 'open',
  },
  {
    title: 'Accountant',
    department: 'Finance',
    description: 'We are seeking a detail-oriented Accountant to join our finance team. You will be responsible for maintaining financial records, preparing reports, and ensuring compliance with accounting standards.',
    qualifications: `
• Bachelor's degree in Accounting, Finance, or related field
• CPA(K) qualification or in progress
• 3+ years of accounting experience
• Strong knowledge of accounting principles and standards
• Proficiency in accounting software (QuickBooks, Sage, etc.)
• Excellent analytical and numerical skills
• High level of accuracy and attention to detail
    `.trim(),
    responsibilities: `
• Prepare and maintain financial statements
• Manage accounts payable and receivable
• Reconcile bank statements and general ledger accounts
• Prepare monthly, quarterly, and annual reports
• Assist with budget preparation and forecasting
• Ensure compliance with tax regulations
• Support internal and external audits
    `.trim(),
    location: 'Nairobi',
    employmentType: 'full-time',
    deadline: new Date('2025-11-25'),
    salary: 'Ksh 60,000 - 80,000 per month',
    status: 'open',
  },
  {
    title: 'IT Support Specialist',
    department: 'Information Technology',
    description: 'Provide technical support to our staff and maintain our IT infrastructure. You will troubleshoot hardware and software issues, manage network systems, and ensure smooth technology operations.',
    qualifications: `
• Diploma or Degree in Computer Science, IT, or related field
• 2+ years of IT support experience
• Strong knowledge of Windows and Mac operating systems
• Experience with networking, hardware, and software troubleshooting
• Familiarity with cloud services (Google Workspace, Microsoft 365)
• Excellent problem-solving skills
• Good communication and customer service skills
    `.trim(),
    responsibilities: `
• Provide technical support to staff via phone, email, and in-person
• Install, configure, and maintain hardware and software
• Troubleshoot network connectivity issues
• Manage user accounts and permissions
• Maintain IT equipment inventory
• Implement security measures and data backups
• Document IT procedures and create user guides
    `.trim(),
    location: 'Nairobi',
    employmentType: 'full-time',
    deadline: new Date('2025-12-05'),
    salary: 'Ksh 50,000 - 70,000 per month',
    status: 'open',
  },
  {
    title: 'Human Resources Officer',
    department: 'Human Resources',
    description: 'Support our HR department in recruitment, employee relations, and HR administration. You will play a key role in attracting talent and maintaining a positive work environment.',
    qualifications: `
• Bachelor's degree in Human Resource Management or related field
• 2-3 years of HR experience
• Knowledge of Kenyan labor laws and regulations
• Strong interpersonal and communication skills
• Proficiency in HRIS software
• Excellent organizational and time management skills
• Discretion and confidentiality
    `.trim(),
    responsibilities: `
• Manage the recruitment and selection process
• Conduct employee onboarding and orientation
• Maintain employee records and HR databases
• Assist with payroll processing
• Handle employee inquiries and grievances
• Coordinate training and development programs
• Ensure compliance with labor laws and company policies
    `.trim(),
    location: 'Nairobi',
    employmentType: 'full-time',
    deadline: new Date('2025-11-28'),
    salary: 'Ksh 55,000 - 75,000 per month',
    status: 'open',
  },
];

async function seedJobs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing jobs
    const deleteResult = await Job.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing jobs`);

    // Insert sample jobs
    const jobs = await Job.insertMany(sampleJobs);
    console.log(`✅ Successfully created ${jobs.length} sample jobs:\n`);
    
    jobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title}`);
      console.log(`   Department: ${job.department}`);
      console.log(`   Location: ${job.location}`);
      console.log(`   Deadline: ${job.deadline.toLocaleDateString()}`);
      console.log(`   Status: ${job.status.toUpperCase()}\n`);
    });

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📍 Next Steps:');
    console.log('1. Restart your server: node server/server.js');
    console.log('2. Visit http://localhost:3000/admin/dashboard to manage jobs');
    console.log('3. Visit http://localhost:3000/jobs to view public job listings\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedJobs();
