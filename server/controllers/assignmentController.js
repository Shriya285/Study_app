import Assignment from '../models/Assignment.js';
import Progress from '../models/Progress.js';
import Reflection from '../models/Reflection.js';
import User from '../models/User.js';
import { evaluateCode } from '../services/geminiService.js';

const getOrCreateDemoUser = async () => {
  let user = await User.findOne({ email: 'student@aicoach.dev' });
  if (!user) {
    user = await User.create({ username: 'demo_student', email: 'student@aicoach.dev' });
  }
  await Progress.findOneAndUpdate(
    { userId: user._id },
    { $setOnInsert: { userId: user._id, currentDay: 1, completedLessons: [], streak: 1, weeklyProjects: [] } },
    { upsert: true, new: true }
  );
  return user;
};

export const submitAssignment = async (req, res) => {
  try {
    const { day, code } = req.body;
    if (!day || !code) {
      return res.status(400).json({ message: 'day and code are required' });
    }

    const user = await getOrCreateDemoUser();
    const feedback = await evaluateCode(code);

    const assignment = await Assignment.findOneAndUpdate(
      { userId: user._id, day },
      {
        userId: user._id,
        day,
        code,
        feedback: {
          correctness: feedback.correctness,
          efficiency: feedback.efficiency,
          codeQuality: feedback.codeQuality,
          improvements: feedback.improvements || []
        },
        score: Number(feedback.score) || 0
      },
      { new: true, upsert: true }
    );

    await Progress.findOneAndUpdate(
      { userId: user._id },
      {
        $max: { currentDay: Math.min(day + 1, 90) },
        $addToSet: { completedLessons: day }
      }
    );

    return res.json({ assignment, feedback });
  } catch (error) {
    return res.status(500).json({ message: 'Assignment evaluation failed', error: error.message });
  }
};

export const getProgress = async (_req, res) => {
  try {
    const user = await getOrCreateDemoUser();
    const progress = await Progress.findOne({ userId: user._id }).lean();
    const assignments = await Assignment.find({ userId: user._id }).sort({ day: 1 }).lean();
    const reflections = await Reflection.find({ userId: user._id }).sort({ day: 1 }).lean();

    return res.json({ progress, assignments, reflections });
  } catch (error) {
    return res.status(500).json({ message: 'Could not load progress', error: error.message });
  }
};

export const saveReflection = async (req, res) => {
  try {
    const { day, notes } = req.body;
    if (!day || !notes) {
      return res.status(400).json({ message: 'day and notes are required' });
    }

    const user = await getOrCreateDemoUser();
    const reflection = await Reflection.findOneAndUpdate(
      { userId: user._id, day },
      { userId: user._id, day, notes },
      { upsert: true, new: true }
    );

    return res.status(201).json(reflection);
  } catch (error) {
    return res.status(500).json({ message: 'Could not save reflection', error: error.message });
  }
};
