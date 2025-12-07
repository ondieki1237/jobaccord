const OpenAI = require('openai');
const Application = require('../models/Application');
const CreditControlApplication = require('../models/CreditControlApplication');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get application data for AI analysis
async function getApplicationsData() {
  try {
    // Fetch all applications from both collections
    const salesApplications = await Application.find({}).lean();
    const creditControlApplications = await CreditControlApplication.find({}).lean();

    return {
      salesApplications,
      creditControlApplications,
      totalApplications: salesApplications.length + creditControlApplications.length,
    };
  } catch (error) {
    console.error('Error fetching applications data:', error);
    throw error;
  }
}

// Format applications data for AI context
function formatApplicationsForAI(data) {
  const { salesApplications, creditControlApplications } = data;

  let context = `You are an AI assistant analyzing job applications for Accord Medical. Here's the current database:\n\n`;

  // Sales Supervisor Applications
  if (salesApplications.length > 0) {
    context += `=== TECHNICAL SALES SUPERVISOR APPLICATIONS (${salesApplications.length} total) ===\n\n`;
    salesApplications.forEach((app, index) => {
      context += `Application ${index + 1}:\n`;
      context += `- ID: ${app.applicationId}\n`;
      context += `- Name: ${app.fullName}\n`;
      context += `- Email: ${app.email}\n`;
      context += `- Phone: ${app.phone}\n`;
      context += `- Location: ${app.location}\n`;
      context += `- Experience: ${app.yearsExperience}\n`;
      context += `- Degree: ${app.hasDegree === 'yes' ? 'Yes' : 'No'}${app.degreeDetails ? ` - ${app.degreeDetails}` : ''}\n`;
      context += `- Supervised Teams: ${app.hasSupervised === 'yes' ? 'Yes' : 'No'}\n`;
      if (app.leadershipDescription) context += `- Leadership: ${app.leadershipDescription}\n`;
      if (app.equipmentExperience) context += `- Equipment Experience: ${app.equipmentExperience}\n`;
      if (app.majorSaleDescription) context += `- Major Sale: ${app.majorSaleDescription}\n`;
      if (app.strengths && app.strengths.length > 0) context += `- Strengths: ${app.strengths.join(', ')}\n`;
      context += `- CRM Proficiency: ${app.crmProficiency}/5\n`;
      if (app.motivation) context += `- Motivation: ${app.motivation}\n`;
      context += `- Sales Target Experience: ${app.hadSalesTarget === 'yes' ? 'Yes' : 'No'}\n`;
      if (app.targetPerformance) context += `- Target Performance: ${app.targetPerformance}\n`;
      if (app.teamMotivation) context += `- Team Motivation Style: ${app.teamMotivation}\n`;
      if (app.leadershipStyle) context += `- Leadership Style: ${app.leadershipStyle}\n`;
      context += `- Status: ${app.status}\n`;
      context += `- Submitted: ${new Date(app.submittedAt).toLocaleDateString()}\n`;
      context += `\n`;
    });
  }

  // Credit Control Applications
  if (creditControlApplications.length > 0) {
    context += `\n=== CREDIT CONTROL OFFICER APPLICATIONS (${creditControlApplications.length} total) ===\n\n`;
    creditControlApplications.forEach((app, index) => {
      context += `Application ${index + 1}:\n`;
      context += `- ID: ${app.applicationId}\n`;
      context += `- Name: ${app.fullName}\n`;
      context += `- Email: ${app.email}\n`;
      context += `- Phone: ${app.phone}\n`;
      context += `- Location: ${app.location}\n`;
      context += `- Qualification: ${app.highestQualification}${app.fieldOfStudy ? ` in ${app.fieldOfStudy}` : ''}\n`;
      context += `- Experience: ${app.yearsExperience}\n`;
      if (app.experienceDescription) context += `- Experience Details: ${app.experienceDescription}\n`;
      if (app.debtCollected) context += `- Debt Collection Experience: ${app.debtCollected}\n`;
      if (app.collectionStrategies) context += `- Collection Strategies: ${app.collectionStrategies}\n`;
      if (app.financeSystems) context += `- Finance Systems: ${app.financeSystems}\n`;
      context += `- Excel Proficiency: ${app.excelProficiency}/5\n`;
      context += `- Comfortable with Calls: ${app.comfortableWithCalls === 'yes' ? 'Yes' : 'No'}\n`;
      context += `- Current Salary: KSh ${app.currentSalary}\n`;
      context += `- Expected Salary: KSh ${app.expectedSalary}\n`;
      context += `- Status: ${app.status}\n`;
      context += `- Submitted: ${new Date(app.submittedAt).toLocaleDateString()}\n`;
      context += `\n`;
    });
  }

  return context;
}

// Analyze applications with AI
async function analyzeApplications(query) {
  try {
    console.log('🤖 AI Agent: Fetching application data...');
    const data = await getApplicationsData();
    
    console.log('🤖 AI Agent: Formatting context for AI...');
    const context = formatApplicationsForAI(data);

    console.log('🤖 AI Agent: Sending query to OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an intelligent HR assistant analyzing job applications for Accord Medical. 
          
Your role is to:
- Analyze candidate qualifications and experience
- Compare candidates based on specific criteria
- Identify top candidates for positions
- Provide insights on candidate strengths and weaknesses
- Answer questions about the applicant pool
- Make hiring recommendations based on job requirements

Always be specific, cite candidate names and IDs, and provide reasoning for your analysis. Use data from the applications to support your answers.`,
        },
        {
          role: 'user',
          content: `${context}\n\nQuestion: ${query}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const response = completion.choices[0].message.content;
    console.log('✅ AI Agent: Analysis complete');

    return {
      success: true,
      response,
      metadata: {
        totalApplications: data.totalApplications,
        salesApplications: data.salesApplications.length,
        creditControlApplications: data.creditControlApplications.length,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('❌ AI Agent Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze applications',
    };
  }
}

// Get application statistics
async function getApplicationStatistics() {
  try {
    const salesApps = await Application.find({}).lean();
    const creditApps = await CreditControlApplication.find({}).lean();

    const stats = {
      sales: {
        total: salesApps.length,
        pending: salesApps.filter(a => a.status === 'pending').length,
        reviewed: salesApps.filter(a => a.status === 'reviewed').length,
        shortlisted: salesApps.filter(a => a.status === 'shortlisted').length,
        rejected: salesApps.filter(a => a.status === 'rejected').length,
        hired: salesApps.filter(a => a.status === 'hired').length,
        withDegree: salesApps.filter(a => a.hasDegree === 'yes').length,
        withSupervisionExp: salesApps.filter(a => a.hasSupervised === 'yes').length,
        averageCRM: salesApps.reduce((sum, a) => sum + (parseInt(a.crmProficiency) || 0), 0) / salesApps.length || 0,
      },
      creditControl: {
        total: creditApps.length,
        pending: creditApps.filter(a => a.status === 'pending').length,
        reviewed: creditApps.filter(a => a.status === 'reviewed').length,
        shortlisted: creditApps.filter(a => a.status === 'shortlisted').length,
        rejected: creditApps.filter(a => a.status === 'rejected').length,
        hired: creditApps.filter(a => a.status === 'hired').length,
        withBachelors: creditApps.filter(a => a.highestQualification === 'bachelors').length,
        averageExcel: creditApps.reduce((sum, a) => sum + (parseInt(a.excelProficiency) || 0), 0) / creditApps.length || 0,
      },
      overall: {
        total: salesApps.length + creditApps.length,
        pending: salesApps.filter(a => a.status === 'pending').length + creditApps.filter(a => a.status === 'pending').length,
        reviewed: salesApps.filter(a => a.status === 'reviewed').length + creditApps.filter(a => a.status === 'reviewed').length,
        shortlisted: salesApps.filter(a => a.status === 'shortlisted').length + creditApps.filter(a => a.status === 'shortlisted').length,
        rejected: salesApps.filter(a => a.status === 'rejected').length + creditApps.filter(a => a.status === 'rejected').length,
        hired: salesApps.filter(a => a.status === 'hired').length + creditApps.filter(a => a.status === 'hired').length,
      },
    };

    return stats;
  } catch (error) {
    console.error('Error getting statistics:', error);
    throw error;
  }
}

module.exports = {
  analyzeApplications,
  getApplicationStatistics,
};
