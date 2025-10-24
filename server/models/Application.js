const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    // Job Reference
    jobId: {
      type: String,
      required: false,
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    department: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      trim: true,
    },
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
      enum: ['yes', 'no'],
    },

    // Credit Control Officer specific fields
    highestQualification: {
      type: String,
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      trim: true,
    },
    experienceDescription: {
      type: String,
      trim: true,
    },
    debtCollected: {
      type: String,
      trim: true,
    },
    collectionStrategies: {
      type: String,
      trim: true,
    },
    financeSystems: {
      type: String,
      trim: true,
    },
    excelProficiency: {
      type: String,
      trim: true,
    },
    comfortableWithCalls: {
      type: String,
      enum: ['yes', 'no', ''],
    },
    willingToReport: {
      type: String,
      enum: ['yes', 'no', ''],
    },
    currentSalary: {
      type: String,
      trim: true,
    },
    expectedSalary: {
      type: String,
      trim: true,
    },
    availableImmediately: {
      type: String,
      enum: ['yes', 'no', ''],
    },
    earliestStartDate: {
      type: String,
      trim: true,
    },
    coverLetterLink: {
      type: String,
      trim: true,
    },
    credentialsLink: {
      type: String,
      trim: true,
    },
    confirmAccuracy: {
      type: Boolean,
    },
    understandContractTerms: {
      type: Boolean,
    },
    noConflictOfInterest: {
      type: Boolean,
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
