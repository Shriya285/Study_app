function ProgressBar({ value }) {
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <div className="progress-fill" style={{ width: `${value}%` }} />
      <span>{value}%</span>
    </div>
  );
}

export default ProgressBar;
