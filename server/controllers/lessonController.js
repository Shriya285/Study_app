import Assignment from '../models/Assignment.js';
import Progress from '../models/Progress.js';
import User from '../models/User.js';
import { generateLesson } from '../services/geminiService.js';

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

export const getLessonByDay = async (req, res) => {
  try {
    const day = Number(req.params.day);
    const user = await getOrCreateDemoUser();
    const lesson = await generateLesson(day);
    const assignment = await Assignment.findOne({ userId: user._id, day });

    res.json({
      day,
      lesson,
      assignmentStatus: assignment ? 'Submitted' : 'Pending'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate lesson', error: error.message });
  }
};

export const getDashboardData = async (_req, res) => {
  try {
    const user = await getOrCreateDemoUser();
    const progress = await Progress.findOne({ userId: user._id });
    const todayAssignment = await Assignment.findOne({ userId: user._id, day: progress.currentDay });
    const lesson = await generateLesson(progress.currentDay);

    res.json({
      currentDay: progress.currentDay,
      totalDays: 90,
      lessonTopic: lesson.topic,
      assignmentStatus: todayAssignment ? 'Submitted' : 'Pending',
      progressPercent: Math.round((progress.completedLessons.length / 90) * 100),
      streak: progress.streak
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load dashboard', error: error.message });
  }
};
