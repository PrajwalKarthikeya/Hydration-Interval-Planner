import './HydrationSchedule.css'

function HydrationSchedule({ schedule, currentInterval, sessionStartTime }) {
  const formatTime = (intervalIndex) => {
    const minutesFromStart = intervalIndex * schedule.intervalMinutes
    const time = new Date(sessionStartTime + minutesFromStart * 60000)
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="schedule-card">
      <h2>Your Hydration Schedule</h2>

      <div className="schedule-summary">
        <div className="summary-item">
          <div className="summary-label">Total Water</div>
          <div className="summary-value">
            {schedule.totalWater}<span className="summary-unit">ml</span>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Per Interval</div>
          <div className="summary-value">
            {schedule.amountPerInterval}<span className="summary-unit">ml</span>
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Every</div>
          <div className="summary-value">
            {schedule.intervalMinutes}<span className="summary-unit">min</span>
          </div>
        </div>
      </div>

      {schedule.electrolytes && (
        <div className="electrolyte-notice">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>Consider adding electrolytes for this intensity level</span>
        </div>
      )}

      <div className="intervals-list">
        <h3>Intervals</h3>
        <div className="intervals-grid">
          {Array.from({ length: schedule.totalIntervals }, (_, i) => (
            <div
              key={i}
              className={`interval-item ${i === currentInterval ? 'current' : ''} ${i < currentInterval ? 'completed' : ''}`}
            >
              <div className="interval-number">{i + 1}</div>
              <div className="interval-details">
                <div className="interval-time">{formatTime(i)}</div>
                <div className="interval-amount">{schedule.amountPerInterval}ml</div>
              </div>
              {i < currentInterval && (
                <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HydrationSchedule
