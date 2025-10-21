const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  qualifications: {
    type: String,
    required: [true, 'Qualifications are required'],
  },
  responsibilities: {
    type: String,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    default: 'full-time',
  },
  deadline: {
    type: Date,
    required: [true, 'Application deadline is required'],
  },
  salary: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'draft'],
    default: 'open',
  },
  applicationCount: {
    type: Number,
    default: 0,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for efficient queries
jobSchema.index({ status: 1 });
jobSchema.index({ department: 1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ createdAt: -1 });

// Update the updatedAt field before saving
jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);
