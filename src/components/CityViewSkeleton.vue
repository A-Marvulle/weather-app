<template>
  <div class="flex flex-col flex-1 items-center text-white">
    <AnimatedPlaceholder class="w-full h-12 mb-4" />

    <div class="flex flex-col items-center py-12 text-center w-full">
      <AnimatedPlaceholder class="h-10 w-48 mb-4" />
      <AnimatedPlaceholder class="h-5 w-72 mb-12" />
      <AnimatedPlaceholder class="h-24 w-40 mb-8" />
    </div>

    <div
      class="flex flex-col lg:flex-row justify-between items-center w-100 mb-6 gap-8 lg:gap-0"
    >
      <AnimatedPlaceholder class="h-8 w-16" />
      
      <div class="flex flex-col items-center gap-4">
        <AnimatedPlaceholder class="h-16 w-16 rounded-full" />
        <AnimatedPlaceholder class="h-6 w-32" />
      </div>

      <AnimatedPlaceholder class="h-8 w-16" />
    </div>

    <div class="w-full border border-white/10 my-4"></div>

    <div class="max-w-5xl w-full py-12">
      <div class="mx-8 text-center">
        <AnimatedPlaceholder class="h-6 w-40 mx-auto mb-8" /> 

        <div class="flex gap-10 overflow-x-hidden py-5">
          <div
            v-for="i in 8"
            :key="i"
            class="flex flex-col gap-4 items-center"
          >
            <AnimatedPlaceholder class="h-4 w-12" />
            <AnimatedPlaceholder class="h-8 w-8 rounded-full" />
            <AnimatedPlaceholder class="h-4 w-10" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full border border-white/10 my-4"></div>

    <div class="max-w-5xl w-full py-12">
      <div class="mx-8 text-center">
        <AnimatedPlaceholder class="h-6 w-48 mx-auto mb-8" />

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 w-full"
        >
          <div
            v-for="i in 7"
            :key="i"
            class="flex flex-col items-center bg-black/10 p-4 rounded gap-4"
          >
            <AnimatedPlaceholder class="h-12 w-12 rounded-full" /> 
            <AnimatedPlaceholder class="h-4 w-24" />
            <AnimatedPlaceholder class="h-4 w-16" />
            <AnimatedPlaceholder class="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 py-12">
      <AnimatedPlaceholder class="h-6 w-32" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>
