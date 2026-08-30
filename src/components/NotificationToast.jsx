import './NotificationToast.css'

function NotificationToast({ message, onDismiss }) {
  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast-icon">💧</div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onDismiss} aria-label="Dismiss">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NotificationToast
