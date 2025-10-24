const mongoose = require('mongoose');

const creditControlApplicationSchema = new mongoose.Schema(
  {
    // Job Information
    jobId: {
      type: String,
      default: 'credit-control-officer',
    },
    jobTitle: {
      type: String,
      default: 'Credit Control Officer',
    },
    department: {
      type: String,
      default: 'Accounts',
    },
    employmentType: {
      type: String,
      default: 'Contract (6 months, renewable)',
    },

    // Section 1: Personal Information
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

    // Section 2: Education and Experience
    highestQualification: {
      type: String,
      required: true,
      enum: ['diploma', 'bachelors', 'other'],
    },
    fieldOfStudy: {
      type: String,
      required: true,
      trim: true,
    },
    yearsExperience: {
      type: String,
      required: true,
      enum: ['less-than-1', '1-2-years', 'over-2-years'],
    },
    experienceDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // Section 3: Credit Control Competence
    debtCollected: {
      type: String,
      required: true,
      trim: true,
    },
    collectionStrategies: {
      type: String,
      required: true,
      trim: true,
    },
    financeSystems: {
      type: String,
      required: true,
      trim: true,
    },
    excelProficiency: {
      type: String,
      required: true,
      default: '3',
    },
    comfortableWithCalls: {
      type: String,
      required: true,
      enum: ['yes', 'no'],
    },
    willingToReport: {
      type: String,
      required: true,
      enum: ['yes', 'no'],
    },

    // Section 4: Compensation and Availability
    currentSalary: {
      type: String,
      required: true,
      trim: true,
    },
    expectedSalary: {
      type: String,
      required: true,
      trim: true,
    },
    availableImmediately: {
      type: String,
      required: true,
      enum: ['yes', 'no'],
    },
    earliestStartDate: {
      type: String,
      trim: true,
    },

    // Section 5: Declarations and Attachments
    cvLink: {
      type: String,
      required: [true, 'CV link is required'],
      trim: true,
    },
    coverLetterLink: {
      type: String,
      required: true,
      trim: true,
    },
    credentialsLink: {
      type: String,
      trim: true,
    },
    confirmAccuracy: {
      type: Boolean,
      required: true,
    },
    understandContractTerms: {
      type: Boolean,
      required: true,
    },
    noConflictOfInterest: {
      type: Boolean,
      required: true,
    },

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
creditControlApplicationSchema.index({ email: 1 });
creditControlApplicationSchema.index({ status: 1 });
creditControlApplicationSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('CreditControlApplication', creditControlApplicationSchema);
