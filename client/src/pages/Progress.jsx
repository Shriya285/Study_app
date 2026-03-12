import { useEffect, useState } from 'react';
import { getProgress, saveReflection } from '../services/api.js';

function Progress() {
  const [data, setData] = useState(null);
  const [notes, setNotes] = useState('');

  const load = async () => {
    const result = await getProgress();
    setData(result);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const handleSaveNote = async () => {
    if (!data?.progress?.currentDay || !notes.trim()) return;
    await saveReflection({ day: data.progress.currentDay, notes });
    setNotes('');
    await load();
  };

  if (!data) return <p>Loading progress...</p>;

  return (
    <section className="card-stack">
      <article className="card">
        <h2>Progress Overview</h2>
        <p><strong>Completed Days:</strong> {data.progress.completedLessons.length}</p>
        <p><strong>Submitted Assignments:</strong> {data.assignments.length}</p>
        <p><strong>Weekly Projects:</strong> {data.progress.weeklyProjects.length}</p>
        <p><strong>Learning Streak:</strong> {data.progress.streak} days</p>
      </article>
      <article className="card">
        <h3>Personal Notes</h3>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write your reflection..." rows={4} />
        <button type="button" onClick={handleSaveNote}>Save Reflection</button>
      </article>
      <article className="card">
        <h3>Previous Reflections</h3>
        <ul>
          {data.reflections.map((reflection) => (
            <li key={reflection._id}>Day {reflection.day}: {reflection.notes}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default Progress;
