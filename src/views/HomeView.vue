<template>
  <main class="container mx-auto text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        name="search"
        id="search"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] transition-all duration-300"
      />
      <ul
        v-if="searchQuery.trim() !== ''"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 mt-2"
      >
        <li v-if="searchError">Sorry something went wrong, try again later.</li>

        <li v-else-if="searchResult.length === 0">
          No results, try something else.
        </li>

        <template v-else>
          <li
            v-for="result in searchResult"
            :key="result.id"
            class="py-2 cursor-pointer hover:bg-weather-primary px-2"
            @click="previewCity(result)"
          >
            {{ result.name }}, {{ result.admin1 }} - {{ result.country }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";

const searchQuery = ref("");
const queryTimeOut = ref(null);
const searchResult = ref([]);
const searchError = ref(null);
const router = useRouter();

const previewCity = (city) => {
  router.push({
    name: "cityView",
    params: {
      state:
        city.admin1?.replaceAll(" ", "-") ?? city.country.replaceAll(" ", "-"),
      city: city.name.replaceAll(" ", "-"),
    },
    query: {
      lat: city.latitude,
      lng: city.longitude,
      preview: true,
    },
  });

  searchQuery.value = "";
  searchResult.value = [];
};

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value);

  queryTimeOut.value = setTimeout(async () => {
    searchError.value = false;

    if (searchQuery.value.trim() !== "") {
      try {
        const result = await axios.get(
          "https://geocoding-api.open-meteo.com/v1/search",
          {
            params: {
              name: searchQuery.value,
              count: 5,
              language: "en",
              format: "json",
            },
          },
        );

        searchResult.value = result.data.results || [];
      } catch (error) {
        searchError.value = true;
        searchResult.value = [];
      }

      return;
    }

    searchResult.value = [];
  }, 300);
};
</script>
