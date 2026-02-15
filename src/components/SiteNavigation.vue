<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container mx-auto flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <font-awesome-icon icon="fa-regular fa-sun" />

          <h1 class="text-2xl my-0">The Local Weather</h1>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <p class="hover:text-weather-secondary duration-150 cursor-pointer">
          <font-awesome-icon
            icon="fa-solid fa-circle-info"
            @click="toogleModal"
          />
        </p>
        <p class="hover:text-weather-secondary duration-150 cursor-pointer">
          <font-awesome-icon
            icon="fa-solid fa-circle-plus"
            @click="addCity"
            v-if="route.query.preview"
          />
        </p>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toogleModal">
        <div class="text-black">
          <h2 class="text-2xl mb-1">About:</h2>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { uid } from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";

const modalActive = ref(null);
const toogleModal = () => {
  modalActive.value = !modalActive.value;
};

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObject = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.push(locationObject);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));
  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObject.id;
  router.replace({ query });
};
</script>
