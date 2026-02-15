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
import { ref, onMounted } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);

const getCities = async () => {
  const saved = localStorage.getItem("savedCities");
  if (saved) {
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
      }),
    );

    try {
      const responses = await Promise.all(requests);
      responses.forEach((res, index) => {
        savedCities.value[index].weather = res.data;
      });
    } catch (err) {
      console.error("Erro ao buscar o clima:", err);
    }
  }
};
onMounted(() => {
  getCities();
});

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      state: city.state,
      city: city.city,
    },
    query: {
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
