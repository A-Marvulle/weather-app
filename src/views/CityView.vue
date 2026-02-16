<template>
  <div>
    <Transition name="fade" mode="out-in">
    <Suspense>
        <AsyncCityView />
        <template #fallback>
          <CityViewSkeleton />
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>

