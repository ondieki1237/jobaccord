const Job = require('../models/Job');

// Create a new job posting
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedBy: req.admin._id,
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      message: 'Job posted successfully',
      data: job,
    });
  } catch (error) {
    console.error('❌ Error creating job:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all jobs (with filters for admin)
exports.getAllJobs = async (req, res) => {
  try {
    const { status, department, page = 1, limit = 10 } = req.query;

    const query = {};
    
    if (status) query.status = status;
    if (department) query.department = department;

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('postedBy', 'name email')
      .exec();

    const count = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      data: jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch jobs',
    });
  }
};

// Get all open jobs (public - for job seekers)
exports.getOpenJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ 
      status: 'open',
      deadline: { $gte: new Date() } // Only jobs with future deadlines
    })
      .sort({ createdAt: -1 })
      .select('-postedBy -__v');

    res.status(200).json({
      success: true,
      data: jobs,
      count: jobs.length,
    });
  } catch (error) {
    console.error('❌ Error fetching open jobs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch open jobs',
    });
  }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('❌ Error fetching job:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job',
    });
  }
};

// Update a job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job,
    });
  } catch (error) {
    console.error('❌ Error updating job:', error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('❌ Error deleting job:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete job',
    });
  }
};

// Close a job (change status to closed)
exports.closeJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      { status: 'closed', updatedAt: Date.now() },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job closed successfully',
      data: job,
    });
  } catch (error) {
    console.error('❌ Error closing job:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to close job',
    });
  }
};

// Reopen a job (change status back to open)
exports.reopenJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      { status: 'open', updatedAt: Date.now() },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Job reopened successfully',
      data: job,
    });
  } catch (error) {
    console.error('❌ Error reopening job:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reopen job',
    });
  }
};

// Get job statistics
exports.getJobStatistics = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const openJobs = await Job.countDocuments({ status: 'open' });
    const closedJobs = await Job.countDocuments({ status: 'closed' });
    const draftJobs = await Job.countDocuments({ status: 'draft' });

    // Get jobs by department
    const jobsByDepartment = await Job.aggregate([
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalJobs,
        open: openJobs,
        closed: closedJobs,
        draft: draftJobs,
        byDepartment: jobsByDepartment,
      },
    });
  } catch (error) {
    console.error('❌ Error fetching job statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job statistics',
    });
  }
};
