const Application = require('../models/Application');
const { sendApplicationConfirmation, sendAdminNotification } = require('../services/emailService');

// Submit a new application
exports.submitApplication = async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'location', 'cvLink'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        return res.status(400).json({
          success: false,
          error: `Missing required field: ${field}`,
        });
      }
    }

    // Generate unique application ID
    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create application
    const application = await Application.create({
      ...formData,
      applicationId,
      submittedAt: new Date(),
    });

    console.log('📝 Application created:', applicationId);
    console.log('📧 Sending confirmation email to:', formData.email);

    // Send confirmation email to applicant
    const emailResult = await sendApplicationConfirmation({
      ...formData,
      applicationId,
      submittedAt: application.submittedAt,
    });

    console.log('📧 Email result:', emailResult);

    // Send notification to admin
    console.log('📧 Sending admin notification...');
    const adminEmailResult = await sendAdminNotification({
      ...formData,
      applicationId,
      submittedAt: application.submittedAt,
    });

    console.log('📧 Admin email result:', adminEmailResult);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        applicationId,
        email: application.email,
        emailSent: emailResult.success,
        adminNotified: adminEmailResult.success,
      },
    });
  } catch (error) {
    console.error('❌ Application submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process application',
      details: error.message,
    });
  }
};

// Get all applications (Admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = status ? { status } : {};
    
    const applications = await Application.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Application.countDocuments(query);

    res.status(200).json({
      success: true,
      data: applications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch applications',
    });
  }
};

// Get single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findById(id);

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
    console.error('❌ Error fetching application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch application',
    });
  }
};

// Update application status (Admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      {
        status,
        notes,
        reviewedAt: new Date(),
        reviewedBy: req.admin._id,
      },
      { new: true, runValidators: true }
    );

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
    console.error('❌ Error updating application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update application',
    });
  }
};

// Delete application (Admin only)
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

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
    console.error('❌ Error deleting application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete application',
    });
  }
};

// Get application statistics
exports.getStatistics = async (req, res) => {
  try {
    const total = await Application.countDocuments();
    const pending = await Application.countDocuments({ status: 'pending' });
    const reviewed = await Application.countDocuments({ status: 'reviewed' });
    const shortlisted = await Application.countDocuments({ status: 'shortlisted' });
    const rejected = await Application.countDocuments({ status: 'rejected' });
    const hired = await Application.countDocuments({ status: 'hired' });

    // Get recent applications
    const recentApplications = await Application.find()
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
    console.error('❌ Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
    });
  }
};
