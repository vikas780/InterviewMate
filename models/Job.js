const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please enter company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please enter position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Pending', 'Declined'],
      default: 'Applied',
    },
    /* This code is defining a Mongoose schema for a job. The `createdBy` field is a reference to a
   `User` document, identified by its `ObjectId`. This field is required and must be provided when
   creating a new job. The `timestamps` option adds `createdAt` and `updatedAt` fields to the
   schema, which are automatically managed by Mongoose. */
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('job', JobSchema)
