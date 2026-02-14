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
        v-if="searchResult && searchResult.length"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 mt-2"
      >
        <li
          v-for="result in searchResult"
          :key="result.id"
          class="py-2 cursor-pointer hover:bg-weather-primary px-2"
        >
          {{ result.name }}, {{ result.admin1 }} - {{ result.country }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const searchQuery = ref("");
const queryTimeOut = ref(null);
const searchResult = ref([]);

const getSearchResults = () => {
  clearTimeout(queryTimeOut.value);

  queryTimeOut.value = setTimeout(async () => {
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
          }
        );

        searchResult.value = result.data.results || [];
      } catch (error) {
        console.error("Fail to search city:", error);
      }
      return;
    }

    searchResult.value = [];
  }, 300);
};
</script>
