# 💧 Hydration & Electrolyte Interval Planner

A personalized hydration scheduling app that generates custom hydration plans based on your body weight, workout intensity, ambient temperature, and session duration. Get timed visual and audio reminders to stay properly hydrated during your activities.

## Features

- **Personalized Calculations**: Custom hydration schedules based on scientific formulas
- **Smart Intervals**: Optimized reminder timing based on workout duration
- **Multi-factor Analysis**: Considers body weight, workout intensity, and temperature
- **Real-time Timer**: Visual countdown with progress tracking
- **Audio Notifications**: Subtle water droplet sounds using Web Audio API
- **Browser Notifications**: Desktop notifications (with permission)
- **Visual Reminders**: Toast notifications with dismiss functionality
- **Electrolyte Recommendations**: Smart suggestions for intense activities
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode UI**: Easy on the eyes during workouts

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## Deploy to Vercel

### Method 1: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

### Method 2: Using GitHub

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy

### Method 3: Drag and Drop

1. Run `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag the `dist` folder to deploy

## How It Works

### Hydration Calculation

The app uses evidence-based formulas to calculate hydration needs:

- **Base rate**: 35ml per kg of body weight per hour
- **Intensity multipliers**:
  - Light: 1.0x
  - Moderate: 1.3x
  - High: 1.6x
  - Extreme: 2.0x
- **Temperature multipliers**:
  - Cool (<15°C): 1.0x
  - Moderate (15-25°C): 1.2x
  - Warm (25-32°C): 1.5x
  - Hot (>32°C): 1.8x

### Interval Timing

- **Short sessions** (<30 min): Every 15 minutes
- **Medium sessions** (30-90 min): Every 20 minutes
- **Long sessions** (>90 min): Every 25 minutes

### Electrolyte Recommendations

Suggests electrolyte supplementation for:
- High or extreme intensity workouts
- Hot weather conditions
- Sessions longer than 60 minutes

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Web Audio API** - Notification sounds
- **Notifications API** - Browser notifications
- **CSS3** - Responsive styling with CSS variables

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## License

MIT

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
