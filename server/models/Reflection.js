import mongoose from 'mongoose';

const reflectionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: Number, required: true },
    notes: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

reflectionSchema.index({ userId: 1, day: 1 }, { unique: true });

export default mongoose.model('Reflection', reflectionSchema);
