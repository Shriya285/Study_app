import { useEffect, useState } from 'react';
import { getDashboard } from '../services/api.js';

function WeeklyChallenge() {
  const [week, setWeek] = useState(1);

  useEffect(() => {
    getDashboard()
      .then((dashboard) => setWeek(Math.max(1, Math.ceil(dashboard.currentDay / 7))))
      .catch(console.error);
  }, []);

  return (
    <section className="card-stack">
      <article className="card">
        <h2>Week {week} Challenge</h2>
        <p>Build a Python script that fetches API data and stores it in CSV.</p>
        <ol>
          <li>Use the <code>requests</code> library for API calls.</li>
          <li>Parse JSON and extract useful fields.</li>
          <li>Write records to a CSV file.</li>
          <li>Handle network failures gracefully.</li>
        </ol>
      </article>
    </section>
  );
}

export default WeeklyChallenge;
