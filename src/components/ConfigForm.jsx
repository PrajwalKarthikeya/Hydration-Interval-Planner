import { useState } from 'react'
import './ConfigForm.css'

function ConfigForm({ onStart }) {
  const [weight, setWeight] = useState(70)
  const [intensity, setIntensity] = useState('moderate')
  const [temperature, setTemperature] = useState('moderate')
  const [duration, setDuration] = useState(60)

  const handleSubmit = (e) => {
    e.preventDefault()
    onStart({ weight, intensity, temperature, duration })
  }

  return (
    <form className="config-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="weight">
          Body Weight (kg)
          <span className="value-display">{weight} kg</span>
        </label>
        <input
          type="range"
          id="weight"
          min="40"
          max="150"
          step="1"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>40</span>
          <span>150</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="intensity">Workout Intensity</label>
        <select
          id="intensity"
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        >
          <option value="light">Light (Walking, Yoga)</option>
          <option value="moderate">Moderate (Jogging, Cycling)</option>
          <option value="high">High (HIIT, Running)</option>
          <option value="extreme">Extreme (Marathon, Competition)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="temperature">Temperature / Climate</label>
        <select
          id="temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        >
          <option value="cool">Cool (&lt;15°C / 59°F)</option>
          <option value="moderate">Moderate (15-25°C / 59-77°F)</option>
          <option value="warm">Warm (25-32°C / 77-90°F)</option>
          <option value="hot">Hot (&gt;32°C / 90°F)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="duration">
          Session Duration (minutes)
          <span className="value-display">{duration} min</span>
        </label>
        <input
          type="range"
          id="duration"
          min="15"
          max="240"
          step="15"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>15</span>
          <span>240</span>
        </div>
      </div>

      <button type="submit" className="btn-primary">
        Generate Hydration Plan
      </button>
    </form>
  )
}

export default ConfigForm
