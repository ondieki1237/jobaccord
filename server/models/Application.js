const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    // Basic Information
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    eligibleToWork: {
      type: String,
      required: [true, 'Work eligibility is required'],
      enum: ['yes', 'no'],
    },

    // Experience & Background
    hasDegree: {
      type: String,
      enum: ['yes', 'no'],
    },
    degreeDetails: {
      type: String,
      trim: true,
    },
    yearsExperience: {
      type: String,
      enum: ['less-than-1', '1-2', '2-3', 'over-3'],
    },
    hasSupervised: {
      type: String,
      enum: ['yes', 'no'],
    },
    leadershipDescription: {
      type: String,
      trim: true,
    },
    equipmentExperience: {
      type: String,
      trim: true,
    },
    majorSaleDescription: {
      type: String,
      trim: true,
    },

    // Skills & Competencies
    strengths: {
      type: [String],
      default: [],
    },
    crmProficiency: {
      type: String,
      default: '3',
    },
    trainingExample: {
      type: String,
      trim: true,
    },
    motivation: {
      type: String,
      trim: true,
    },

    // Results & Leadership
    hadSalesTarget: {
      type: String,
      enum: ['yes', 'no', ''],
    },
    targetPerformance: {
      type: String,
      trim: true,
    },
    teamMotivation: {
      type: String,
      trim: true,
    },
    leadershipStyle: {
      type: String,
      trim: true,
    },
    challenges: {
      type: String,
      trim: true,
    },

    // Culture & Fit
    difficultClients: {
      type: String,
      trim: true,
    },
    crossDepartment: {
      type: String,
      trim: true,
    },
    whyJoin: {
      type: String,
      trim: true,
    },
    availableStart: {
      type: String,
    },

    // Attachments
    cvLink: {
      type: String,
      required: [true, 'CV link is required'],
      trim: true,
    },
    achievementsLink: {
      type: String,
      trim: true,
    },
    additionalDetails: {
      type: String,
      trim: true,
    },
    additionalDocuments: [
      {
        label: String,
        url: String,
      },
    ],

    // Application Metadata
    applicationId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
applicationSchema.index({ email: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);
