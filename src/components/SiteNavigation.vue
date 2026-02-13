<template>
  <header class="stick top bg-weather-primary shadow-lg">
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
            <font-awesome-icon icon="fa-solid fa-circle-info" />
        </p>
        <p class="hover:text-weather-secondary duration-150 cursor-pointer">
            <font-awesome-icon icon="fa-solid fa-circle-plus" />
        </p>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
