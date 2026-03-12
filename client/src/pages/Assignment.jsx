import { useMemo, useState } from 'react';
import CodeEditor from '../components/CodeEditor.jsx';
import { submitAssignment } from '../services/api.js';

function Assignment() {
  const [day, setDay] = useState(1);
  const [code, setCode] = useState('def solve():\n    # Write your solution\n    print("Hello Bootcamp")\n\nsolve()');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const assignmentPrompt = useMemo(
    () => ({
      description: 'Write a Python function that takes a list of numbers and returns the sum of even numbers only.',
      instructions: ['Create a reusable function.', 'Use clear variable names.', 'Print result for [1,2,3,4,5,6].'],
      expectedOutput: '12'
    }),
    []
  );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await submitAssignment({ day, code });
      setFeedback(result.feedback);
    } catch (error) {
      console.error(error);
      setFeedback({ correctness: 'Unable to evaluate at this time.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card-stack">
      <article className="card">
        <h2>Today's Assignment</h2>
        <p>{assignmentPrompt.description}</p>
        <ul>{assignmentPrompt.instructions.map((item) => <li key={item}>{item}</li>)}</ul>
        <p><strong>Expected Output:</strong> {assignmentPrompt.expectedOutput}</p>
      </article>
      <article className="card">
        <label htmlFor="day-input">Day</label>
        <input id="day-input" type="number" min="1" max="90" value={day} onChange={(e) => setDay(Number(e.target.value))} />
        <CodeEditor code={code} setCode={setCode} />
        <button type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Evaluating...' : 'Evaluate'}
        </button>
      </article>
      {feedback && (
        <article className="card">
          <h3>AI Feedback</h3>
          <p><strong>Correctness:</strong> {feedback.correctness}</p>
          <p><strong>Efficiency:</strong> {feedback.efficiency}</p>
          <p><strong>Code Quality:</strong> {feedback.codeQuality}</p>
          <p><strong>Score:</strong> {feedback.score}/10</p>
          <h4>Improvements</h4>
          <ul>{feedback.improvements?.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      )}
    </section>
  );
}

export default Assignment;
