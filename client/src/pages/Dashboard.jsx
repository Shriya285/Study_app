import { useEffect, useState } from 'react';
import ProgressBar from '../components/ProgressBar.jsx';
import { getDashboard } from '../services/api.js';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(setData).catch(console.error);
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <section className="card-grid">
      <article className="card">
        <h2>Day {data.currentDay} / {data.totalDays}</h2>
        <p>Today's Topic: <strong>{data.lessonTopic}</strong></p>
      </article>
      <article className="card">
        <h3>Assignment Status</h3>
        <p>{data.assignmentStatus}</p>
      </article>
      <article className="card">
        <h3>Learning Streak</h3>
        <p>{data.streak} days 🔥</p>
      </article>
      <article className="card full-width">
        <h3>Overall Progress</h3>
        <ProgressBar value={data.progressPercent} />
      </article>
    </section>
  );
}

export default Dashboard;
