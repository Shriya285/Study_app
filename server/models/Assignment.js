import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: Number, required: true },
    code: { type: String, required: true },
    feedback: {
      correctness: { type: String, default: '' },
      efficiency: { type: String, default: '' },
      codeQuality: { type: String, default: '' },
      improvements: { type: [String], default: [] }
    },
    score: { type: Number, min: 0, max: 10, default: 0 }
  },
  { timestamps: true }
);

assignmentSchema.index({ userId: 1, day: 1 }, { unique: true });

export default mongoose.model('Assignment', assignmentSchema);
