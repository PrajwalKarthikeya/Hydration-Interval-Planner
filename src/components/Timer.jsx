import './Timer.css'

function Timer({ timeRemaining, currentInterval, totalIntervals, isRunning, onPause, onResume, onStop }) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const progress = ((currentInterval) / totalIntervals) * 100

  return (
    <div className="timer-card">
      <div className="progress-ring">
        <svg className="progress-svg" viewBox="0 0 200 200">
          <circle
            className="progress-bg"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="12"
          />
          <circle
            className="progress-bar"
            cx="100"
            cy="100"
            r="90"
            fill="none"
            strokeWidth="12"
            strokeDasharray={`${progress * 5.65} 565`}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="timer-display">
          <div className="time">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="interval-display">
            Interval {currentInterval + 1} of {totalIntervals}
          </div>
        </div>
      </div>

      <div className="timer-controls">
        {isRunning ? (
          <button className="btn-control btn-pause" onClick={onPause}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
            Pause
          </button>
        ) : (
          <button className="btn-control btn-resume" onClick={onResume}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Resume
          </button>
        )}
        <button className="btn-control btn-stop" onClick={onStop}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
          Stop
        </button>
      </div>
    </div>
  )
}

export default Timer
