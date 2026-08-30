/**
 * Play a subtle notification sound using Web Audio API
 * Creates a pleasant water droplet-like sound
 */

let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function playNotificationSound() {
  try {
    const ctx = getAudioContext()

    // Resume context if suspended (required by some browsers)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    // Create a pleasant water droplet sound
    // First droplet
    playDroplet(ctx, 0, 800)

    // Second droplet (slightly higher pitch)
    playDroplet(ctx, 0.1, 1000)

    // Third droplet (even higher)
    playDroplet(ctx, 0.2, 1200)

  } catch (error) {
    console.warn('Audio notification failed:', error)
  }
}

function playDroplet(ctx, delay, frequency) {
  const now = ctx.currentTime + delay
  const duration = 0.15

  // Oscillator for the tone
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(frequency, now)
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, now + duration)

  // Envelope for natural sound
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration)

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start(now)
  oscillator.stop(now + duration)
}
