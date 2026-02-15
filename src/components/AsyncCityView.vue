<template>
  <div>
    <div v-if="weatherData" class="flex flex-col flex-1 items-center">
      <div
        v-if="route.query.preview"
        class="text-white p-4 bg-weather-secondary w-full text-center"
      >
        <p>
          You are currently previewing this city, click the "+" icon to start
          tracking this city.
        </p>
      </div>

      <div class="flex flex-col items-center text-white py-12 text-center">
        <h2 class="text-4xl mb-2">{{ city }}</h2>
        <p class="text-sm mb-12">
          {{
            new Date(weatherData.current_weather.time).toLocaleDateString(
              "en-us",
              { weekday: "short", day: "2-digit", month: "long" },
            )
          }}
          {{
            new Date(weatherData.current_weather.time).toLocaleTimeString(
              "en-us",
              { timeStyle: "short" },
            )
          }}
          <span class="block">{{ weatherData.timezone_abbreviation }}</span>
        </p>
        <p class="text-8xl mb-8">
          {{
            Math.round(weatherData.current_weather.temperature) +
            weatherData.current_weather_units.temperature
          }}
        </p>
      </div>

      <div
        class="flex flex-col lg:flex-row justify-between items-center w-100 text-white"
      >
        <p class="text-2xl">
          {{
            Math.round(weatherData.daily.temperature_2m_min[0]) +
            weatherData.current_weather_units.temperature
          }}
        </p>

        <div class="flex flex-col items-center text-white mb-6">
          <span class="text-6xl mb-2">
            <font-awesome-icon :icon="weatherIcon" class="text-6xl mb-2" />
          </span>
          <p class="text-xl">{{ weatherDescription }}</p>
        </div>

        <p class="text-2xl">
          {{
            Math.round(weatherData.daily.temperature_2m_max[0]) +
            weatherData.current_weather_units.temperature
          }}
        </p>
      </div>

      <hr class="border-white/10 border w-full my-4" />

      <div class="max-w-5xl w-full py-12">
        <div class="mx-8 text-white text-center">
          <h2 class="mb-4">Hourly Weather</h2>
          <div class="hourly-bar flex gap-10 overflow-x-scroll py-5">
            <div
              v-for="(time, index) in weatherData.hourly.time"
              :key="time"
              class="flex flex-col gap-3 items-center w-full"
            >
              <span class="text-xs">
                {{
                  new Date(time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </span>
              <font-awesome-icon
                :icon="getHourlyIcon(index)"
                class="text-2xl"
              />
              <span class="text-sm"
                >{{
                  Math.round(weatherData.hourly.temperature_2m[index])
                }}°</span
              >
            </div>
          </div>
        </div>
      </div>

      <hr class="border-white/10 border w-full my-4" />

      <div class="max-w-5xl w-full py-12">
        <div class="mx-8 text-white text-center">
          <h2 class="mb-4">7 Day Forecast</h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 w-full"
          >
            <div
              v-for="(day, index) in weatherData.daily.time"
              :key="day"
              class="flex flex-col justify-between mb-4 items-center bg-black/10 p-3 rounded"
            >
              <span class="text-6xl mb-2">
                <font-awesome-icon
                  :icon="getDailyIcon(index)"
                  class="text-6xl mb-2"
                />
              </span>

              <span>
                {{
                  new Date(day).toLocaleDateString("en-us", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                }}
              </span>

              <span>
                Min:
                {{
                  Math.round(weatherData.daily.temperature_2m_min[index]) +
                  weatherData.current_weather_units.temperature
                }}
              </span>

              <span>
                Max:
                {{
                  Math.round(weatherData.daily.temperature_2m_max[index]) +
                  weatherData.current_weather_units.temperature
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
        @click="removeCity"
      >
        <font-awesome-icon icon="fa-solid fa-trash" />
        <p>Remove City</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const weatherMap = {
  0: { text: "Clear sky", icon: ["fas", "sun"] },
  1: { text: "Mainly clear", icon: ["fas", "cloud-sun"] },
  2: { text: "Partly cloudy", icon: ["fas", "cloud-sun"] },
  3: { text: "Overcast", icon: ["fas", "cloud"] },
  45: { text: "Fog", icon: ["fas", "smog"] },
  48: { text: "Depositing rime fog", icon: ["fas", "smog"] },
  51: { text: "Light drizzle", icon: ["fas", "cloud-sun-rain"] },
  53: { text: "Moderate drizzle", icon: ["fas", "cloud-sun-rain"] },
  55: { text: "Dense drizzle", icon: ["fas", "cloud-showers-heavy"] },
  61: { text: "Slight rain", icon: ["fas", "cloud-showers-heavy"] },
  63: { text: "Moderate rain", icon: ["fas", "cloud-showers-heavy"] },
  65: { text: "Heavy rain", icon: ["fas", "cloud-showers-heavy"] },
  71: { text: "Slight snowfall", icon: ["fas", "snowflake"] },
  73: { text: "Moderate snowfall", icon: ["fas", "snowflake"] },
  75: { text: "Heavy snowfall", icon: ["fas", "snowflake"] },
  80: { text: "Slight rain showers", icon: ["fas", "cloud-sun-rain"] },
  81: { text: "Moderate rain showers", icon: ["fas", "cloud-showers-heavy"] },
  82: { text: "Violent rain showers", icon: ["fas", "cloud-bolt"] },
  95: { text: "Thunderstorm", icon: ["fas", "cloud-bolt"] },
  96: { text: "Thunderstorm with slight hail", icon: ["fas", "cloud-bolt"] },
  99: { text: "Thunderstorm with heavy hail", icon: ["fas", "cloud-bolt"] },
};

const route = useRoute();
const weatherData = ref(null);
const error = ref(null);
const city = computed(() => route.params.city?.replaceAll("-", " "));

const weatherDescription = computed(() => {
  if (!weatherData.value) return "";
  const code = weatherData.value.current_weather.weathercode;
  return weatherMap[code]?.text || "Unknown weather";
});

const weatherIcon = computed(() => {
  if (!weatherData.value) return ["fas", "circle-exclamation"];
  const code = weatherData.value.current_weather.weathercode;
  return weatherMap[code]?.icon || ["fas", "circle-exclamation"];
});

const getDailyIcon = (index) => {
  if (!weatherData.value) return ["fas", "circle-exclamation"];
  const code = weatherData.value.daily.weathercode[index];
  return weatherMap[code]?.icon || ["fas", "circle-exclamation"];
};

const getHourlyIcon = (index) => {
  if (!weatherData.value) return ["fas", "circle-exclamation"];
  const code = weatherData.value.hourly.weathercode[index];
  return weatherMap[code]?.icon || ["fas", "circle-exclamation"];
};

const getWeatherData = async () => {
  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: route.query.lat,
        longitude: route.query.lng,
        current_weather: true,
        daily: "temperature_2m_max,temperature_2m_min,weathercode",
        hourly: "temperature_2m,weathercode",
        timezone: "auto",
      },
    });
    weatherData.value = response.data;
    console.log(weatherData.value);
  } catch (err) {
    error.value = true;
    console.error("Fail to find:", err);
  }
};

onMounted(() => {
  getWeatherData();
});

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>
