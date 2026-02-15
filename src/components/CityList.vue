<template>
  <div>
    <div v-for="(city, index) in savedCities" :key="city.id || index">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0">
      No locations added. To start tracking a location, search in the field
      above.
    </p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);

const getCities = async () => {
  const saved = localStorage.getItem("savedCities");
  if (!saved) return;

  savedCities.value = JSON.parse(saved);

  const requests = savedCities.value.map((city) =>
    axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: city.coords.lat,
        longitude: city.coords.lng,
        current_weather: true,
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
      },
    })
  );

  const responses = await Promise.all(requests);

  await new Promise((res) => setTimeout(res, 1000));

  responses.forEach((res, index) => {
    savedCities.value[index].weather = res.data;
  });
};

await getCities();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
