import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    currentDay: { type: Number, default: 1, min: 1, max: 90 },
    completedLessons: { type: [Number], default: [] },
    streak: { type: Number, default: 0 },
    weeklyProjects: { type: [Number], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);
