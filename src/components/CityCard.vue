<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">
        {{ city.city?.replaceAll("-", " ") ?? "" }}
      </h2>

      <h3>
        {{ city.state?.replaceAll("-", " ") ?? "" }}
      </h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(city.weather?.current_weather?.temperature) ?? "--" }}
        {{ city.weather?.current_weather_units?.temperature ?? "" }}
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(city.weather?.daily?.temperature_2m_max[0]) ?? "--" }}
          {{ city.weather?.current_weather_units?.temperature ?? "" }}
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(city.weather?.daily?.temperature_2m_min[0]) ?? "--" }}
          {{ city.weather?.current_weather_units?.temperature ?? "" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => ({}),
  },
});
</script>
