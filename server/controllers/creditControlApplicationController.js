const CreditControlApplication = require('../models/CreditControlApplication');
const { sendApplicationConfirmation, sendAdminNotification } = require('../services/emailService');

// Submit a new credit control application
exports.submitCreditControlApplication = async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields for credit control officer
    const requiredFields = [
      'fullName', 
      'email', 
      'phone', 
      'location',
      'highestQualification',
      'fieldOfStudy',
      'yearsExperience',
      'experienceDescription',
      'debtCollected',
      'collectionStrategies',
      'financeSystems',
      'excelProficiency',
      'comfortableWithCalls',
      'willingToReport',
      'currentSalary',
      'expectedSalary',
      'availableImmediately',
      'cvLink',
      'coverLetterLink',
      'confirmAccuracy',
      'understandContractTerms',
      'noConflictOfInterest'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field] && formData[field] !== false) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`,
        });
      }
    }

    // Validate experience requirement
    if (formData.yearsExperience === 'less-than-1') {
      return res.status(400).json({
        success: false,
        error: 'This position requires at least 1 year of experience',
      });
    }

    // Generate unique application ID
    const applicationId = `CCO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create application
    const application = await CreditControlApplication.create({
      ...formData,
      applicationId,
      submittedAt: new Date(),
    });

    console.log('📝 Credit Control Application created:', applicationId);
    console.log('📧 Sending confirmation email to:', formData.email);

    // Send confirmation email to applicant
    const emailResult = await sendApplicationConfirmation({
      ...formData,
      applicationId,
      jobTitle: 'Credit Control Officer',
      submittedAt: application.submittedAt,
    });

    console.log('📧 Email result:', emailResult);

    // Send notification to admin
    console.log('📧 Sending admin notification...');
    const adminEmailResult = await sendAdminNotification({
      ...formData,
      applicationId,
      jobTitle: 'Credit Control Officer',
      submittedAt: application.submittedAt,
    });

    console.log('📧 Admin email result:', adminEmailResult);

    res.status(201).json({
      success: true,
      message: 'Credit Control application submitted successfully',
      data: {
        applicationId,
        email: application.email,
        emailSent: emailResult.success,
        adminNotified: adminEmailResult.success,
      },
    });
  } catch (error) {
    console.error('❌ Credit Control application submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process application',
      details: error.message,
    });
  }
};

// Get all credit control applications (Admin only)
exports.getAllCreditControlApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};
    
    const applications = await CreditControlApplication.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await CreditControlApplication.countDocuments(query);

    res.status(200).json({
      success: true,
      data: applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('❌ Error fetching credit control applications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch applications',
    });
  }
};

// Get single credit control application by ID
exports.getCreditControlApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Try finding by applicationId first (CCO-xxx format)
    let application = await CreditControlApplication.findOne({ applicationId: id });

    // If not found, try MongoDB _id (for backward compatibility with old applications)
    if (!application && id.match(/^[0-9a-fA-F]{24}$/)) {
      application = await CreditControlApplication.findById(id);
    }

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('❌ Error fetching credit control application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch application',
    });
  }
};

// Update credit control application status (Admin only)
exports.updateCreditControlApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData = {
      status,
      notes,
      reviewedAt: new Date(),
      reviewedBy: req.admin?._id,
    };

    // Try finding by applicationId first (CCO-xxx format)
    let application = await CreditControlApplication.findOneAndUpdate(
      { applicationId: id },
      updateData,
      { new: true, runValidators: true }
    );

    // If not found, try MongoDB _id (for backward compatibility with old applications)
    if (!application && id.match(/^[0-9a-fA-F]{24}$/)) {
      application = await CreditControlApplication.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
    }

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      data: application,
    });
  } catch (error) {
    console.error('❌ Error updating credit control application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update application',
    });
  }
};

// Delete credit control application (Admin only)
exports.deleteCreditControlApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Try finding by applicationId first (CCO-xxx format)
    let application = await CreditControlApplication.findOneAndDelete({ applicationId: id });

    // If not found, try MongoDB _id (for backward compatibility with old applications)
    if (!application && id.match(/^[0-9a-fA-F]{24}$/)) {
      application = await CreditControlApplication.findByIdAndDelete(id);
    }

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting credit control application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete application',
    });
  }
};

// Get credit control application statistics
exports.getCreditControlStatistics = async (req, res) => {
  try {
    const total = await CreditControlApplication.countDocuments();
    const pending = await CreditControlApplication.countDocuments({ status: 'pending' });
    const reviewed = await CreditControlApplication.countDocuments({ status: 'reviewed' });
    const shortlisted = await CreditControlApplication.countDocuments({ status: 'shortlisted' });
    const rejected = await CreditControlApplication.countDocuments({ status: 'rejected' });
    const hired = await CreditControlApplication.countDocuments({ status: 'hired' });

    // Get recent applications
    const recentApplications = await CreditControlApplication.find()
      .sort({ submittedAt: -1 })
      .limit(5)
      .select('fullName email submittedAt status applicationId');

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          total,
          pending,
          reviewed,
          shortlisted,
          rejected,
          hired,
        },
        recentApplications,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching credit control statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
    });
  }
};
