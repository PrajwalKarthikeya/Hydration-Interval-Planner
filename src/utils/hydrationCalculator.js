/**
 * Calculate hydration needs based on user parameters
 * Realistic formula: Max 1L per 2 hours of workout
 */

const BASE_HYDRATION = {
  light: 250,      // 250ml per hour
  moderate: 350,   // 350ml per hour
  high: 450,       // 450ml per hour
  extreme: 500     // 500ml per hour (max)
}

const TEMPERATURE_ADJUSTMENT = {
  cool: 0,         // No adjustment
  moderate: 50,    // +50ml per hour
  warm: 100,       // +100ml per hour
  hot: 150         // +150ml per hour
}

export function calculateHydration(weight, intensity, temperature, duration) {
  // Base hydration per hour based on intensity
  const basePerHour = BASE_HYDRATION[intensity] || 350

  // Temperature adjustment
  const tempAdjustment = TEMPERATURE_ADJUSTMENT[temperature] || 50

  // Total per hour (capped at 500ml/hour which is 1L per 2 hours)
  const perHour = Math.min(basePerHour + tempAdjustment, 500)

  // Calculate total water for the session
  const hoursOfActivity = duration / 60
  const totalWater = Math.round(perHour * hoursOfActivity)

  // Determine optimal interval timing
  let intervalMinutes
  if (duration <= 30) {
    intervalMinutes = 15
  } else if (duration <= 90) {
    intervalMinutes = 20
  } else {
    intervalMinutes = 25
  }

  // Calculate number of intervals
  const totalIntervals = Math.ceil(duration / intervalMinutes)

  // Amount to drink per interval
  const amountPerInterval = Math.round(totalWater / totalIntervals)

  // Determine if electrolytes are recommended
  const needsElectrolytes = (
    intensity === 'high' ||
    intensity === 'extreme' ||
    temperature === 'hot' ||
    duration > 60
  )

  return {
    totalWater,
    amountPerInterval,
    intervalMinutes,
    totalIntervals,
    electrolytes: needsElectrolytes,
    breakdown: {
      basePerHour,
      tempAdjustment,
      perHour,
      hoursOfActivity
    }
  }
}
