# ⛅ WeatherNow

A beginner-friendly **React + Vite** weather app built for a fresher developer portfolio.  
Search any city and instantly see the current conditions plus a 5-day forecast — all wrapped in a clean, responsive glass-morphism UI.

![App Screenshot](./screenshot-placeholder.png)
> _Replace the image above with a real screenshot after running the app._

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔍 City search | Search weather by any city name worldwide |
| 🌡️ Current weather | Temperature, feels-like, humidity, wind speed, icon & description |
| 📅 5-day forecast | One card per day with icon, temp, humidity & wind |
| 🔄 Unit toggle | Switch between **°C** and **°F** with one click |
| ⏳ Loading spinner | Animated spinner while data is fetched |
| ⚠️ Error messages | Clear feedback for invalid city or network failure |
| 💾 localStorage | Remembers your last searched city on page reload |
| 📱 Fully responsive | Works on mobile (320 px+), tablet and desktop |

---

## 🛠️ Tech Stack

- **React 19** — functional components only
- **Vite 8** — lightning-fast dev server & build tool
- **Axios** — HTTP requests with clean error handling
- **OpenWeatherMap API** — current weather + 5-day forecast endpoints
- **Plain CSS** — Flexbox, Grid, CSS custom properties, glass-morphism
- **localStorage** — browser API for persisting last city

---

## 📁 Folder Structure

```
weatherapp/
├── public/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── SearchBar.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── ForecastList.jsx
│   │   ├── ForecastItem.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── hooks/
│   │   └── useWeather.js   # Custom hook — all API logic lives here
│   ├── services/
│   │   └── weatherApi.js   # Axios calls to OpenWeatherMap
│   ├── styles/             # One CSS file per component + global
│   │   ├── global.css
│   │   ├── App.css
│   │   ├── SearchBar.css
│   │   ├── WeatherCard.css
│   │   ├── ForecastList.css
│   │   ├── ForecastItem.css
│   │   ├── Loader.css
│   │   └── ErrorMessage.css
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── .env                    # Your API key (never commit this)
├── .env.example            # Safe template to share
└── vite.config.js
```

---

## 🚀 Setup & Installation

### 1 — Get a free OpenWeatherMap API key

1. Sign up at [https://openweathermap.org/api](https://openweathermap.org/api)
2. Go to **My API Keys** and copy your key (it activates within ~2 hours of signup)

### 2 — Clone & install

```bash
# Clone the repo (or download the ZIP)
git clone https://github.com/your-username/weatherapp.git
cd weatherapp

# Install dependencies
npm install
```

### 3 — Add your API key

```bash
# Copy the example env file
cp .env.example .env
```

Open `.env` and replace the placeholder:

```env
VITE_API_KEY=your_actual_api_key_here
```

> ⚠️ **Never commit `.env` to Git.** It is already listed in `.gitignore`.

### 4 — Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5 — Build for production

```bash
npm run build       # outputs to /dist
npm run preview     # preview the production build locally
```

---

## 🌐 Deploy

### Deploy to Vercel (recommended — zero config)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from the project root
vercel

# Follow the prompts, then add your env variable in the Vercel dashboard:
# Project → Settings → Environment Variables → VITE_API_KEY
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) — Vercel auto-detects Vite.

### Deploy to Netlify

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build first
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or drag-and-drop the `/dist` folder at [app.netlify.com](https://app.netlify.com).

**Add your environment variable in Netlify:**  
Site → Site configuration → Environment variables → Add `VITE_API_KEY`

> After adding env vars on any platform, trigger a **redeploy** so the build picks them up.

---

## 🪝 How Each React Hook Is Used

This section is written to help you explain the hooks confidently in an interview.

### `useState`

> _"useState lets a functional component remember values between renders."_

| State variable | What it holds |
|---|---|
| `weather` | The current weather object from the API (or `null`) |
| `forecast` | Array of up to 5 daily forecast objects |
| `loading` | Boolean — `true` while the API call is in-flight |
| `error` | String with the error message, or `null` when all is fine |
| `unit` | `"metric"` (°C) or `"imperial"` (°F) |
| `city` | The last city the user searched (initialised from localStorage) |

```js
// Example from useWeather.js
const [loading, setLoading] = useState(false);
const [weather, setWeather]  = useState(null);
```

**Interview answer:** _"I used useState to store all the pieces of data my UI depends on — weather results, loading status, errors, and the selected unit. Every time one of those values changes, React re-renders only the parts of the UI that need updating."_

---

### `useEffect`

> _"useEffect runs a side effect (like a data fetch) after a render."_

I used **two** `useEffect` calls in `useWeather.js`:

```js
// 1. On mount — restore the last searched city from localStorage
useEffect(() => {
  const saved = localStorage.getItem("weather_last_city");
  if (saved) searchCity(saved);
}, []); // empty array → runs once after the first render

// 2. When the unit changes — re-fetch so temperatures update
useEffect(() => {
  if (city) searchCity(city);
}, [unit]); // runs every time `unit` changes
```

**Interview answer:** _"The first useEffect runs once when the component mounts — it reads localStorage and auto-loads the last city so the user doesn't have to search again. The second runs whenever the unit changes, re-fetching the data so the temperature display updates to the correct unit."_

---

### `useCallback`

> _"useCallback memoises a function so its reference doesn't change on every render."_

```js
const searchCity = useCallback(async (cityName) => {
  // ... API fetch logic
}, [unit]); // new function only when unit changes
```

**Interview answer:** _"searchCity is passed down as a prop to SearchBar. Without useCallback, a new function reference would be created on every render, which can cause unnecessary re-renders in child components. useCallback caches the function and only recreates it when its dependency (unit) changes."_

---

### Lazy initialiser in `useState`

```js
const [city, setCity] = useState(() => {
  // This function runs once — avoids calling localStorage on every render
  return localStorage.getItem("weather_last_city") || "";
});
```

**Interview answer:** _"When I pass a function to useState instead of a value, React only calls it once on the initial render. This is called a lazy initialiser — it's a small optimisation that avoids hitting localStorage (a synchronous browser API) on every single render."_

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_KEY` | Your OpenWeatherMap API key |

Variables prefixed with `VITE_` are automatically exposed to client-side code by Vite via `import.meta.env`.

---

## 📜 License

MIT — free to use, modify, and share.
