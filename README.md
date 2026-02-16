# 🌤️ Weather App

Weather app built with **Vue 3 + Vite**, consuming data from the **Open-Meteo API**.

This project allows you to search for cities, save them, and visualize detailed weather information (hourly and weekly forecasts).

---

## 🚀 Tech Stack

- ⚡ Vue 3
- 🛠️ Vite
- 🎨 Tailwind CSS
- 🌎 Open-Meteo API
- 📦 JavaScript
- 🔀 Vue Router
- 📡 Axios

---

## ✨ Features

- 🔍 Search for cities
- 📌 Save cities to LocalStorage
- 🌡️ Current weather
- 📅 Weather forecast with minimum and maximum temperatures
- 🔄 Skeleton loading with Suspense
- 🎬 Smooth page transitions
- 📱 Fully responsive layout

---

## 📂 Project Structure
📁 src/
├── 📁 components/
│   └── 🟩 AnimatedPlaceholder.vue
│   └── 🟩 AsyncCityView.vue
│   └── 🟩 BaseModal.vue
│   └── 🟩 CityCard.vue
│   └── 🟩 CityCardSkeleton.vue
│   └── 🟩 CityList.vue
│   └── 🟩 CityViewSkeleton.vue
│   └── 🟩 SiteNavigation.vue
├── 📁 router/
│   └── 🟨 index.js
├── 📁 views/
│   └── 🟩 CityView.vue
│   └── 🟩 HomeView.vue
├── 🟩 App.vue
├── 🟨 main.js
└── 🎨 style.css

---

## ▶️ Run

Clone the project
```
git clone git@github.com:A-Marvulle/weather-app.git
```

Change to the right directory
```
cd weather-app
```

Install dependencies
```
npm install
```

Run the project, it should open on `localhost:5173`
```
npm run dev
```


---

# ⛓️ References

Api: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer noopener nofollow" title="https://open-meteo.com/">https://open-meteo.com/</a>

Video: <a href="https://www.youtube.com/watch?v=gUsBaB5ViAo&list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ&index=1" target="_blank" rel="noreferrer noopener nofollow" title="https://www.youtube.com/watch?v=gUsBaB5ViAo&list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ&index=1">https://www.youtube.com/watch?v=gUsBaB5ViAo&list=PL4cUxeGkcC9hfoy8vFQ5tbXO3vY0xhhUZ&index=1</a>

---

# 📄 License

This projects has only learning purposes