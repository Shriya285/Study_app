import { useEffect, useState } from 'react';
import { getDashboard, getLesson } from '../services/api.js';

function Lesson() {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const loadLesson = async () => {
      const dashboard = await getDashboard();
      const lessonData = await getLesson(dashboard.currentDay);
      setPayload(lessonData);
    };

    loadLesson().catch(console.error);
  }, []);

  if (!payload) return <p>Loading lesson...</p>;

  const { day, lesson, assignmentStatus } = payload;

  return (
    <section className="card-stack">
      <article className="card">
        <h2>Day {day}: {lesson.topic}</h2>
        <p>{lesson.explanation}</p>
        <p><strong>Assignment Status:</strong> {assignmentStatus}</p>
      </article>
      <article className="card">
        <h3>Code Examples</h3>
        {lesson.codeExamples?.map((example) => (
          <pre key={example}>{example}</pre>
        ))}
      </article>
      <article className="card">
        <h3>Suggested Videos</h3>
        <ul>
          {lesson.suggestedVideos?.map((video) => <li key={video}>{video}</li>)}
        </ul>
      </article>
      <article className="card">
        <h3>Key Notes</h3>
        <ul>
          {lesson.keyNotes?.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </article>
    </section>
  );
}

export default Lesson;
