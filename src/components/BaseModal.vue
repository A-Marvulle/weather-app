<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-if="modalActive"
        class="absolute w-full bg-black/30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="bg-white self-start mt-32 max-w-3xl w-full max-h-[60vh] sm:max-h-none flex flex-col"
          >
            <div class="p-4 overflow-y-auto">
              <slot />
            </div>

            <div class="p-4 bg-white">
              <button
                class="text-white bg-weather-primary transition-colors duration-300 hover:bg-weather-primary/70 py-2 px-6 cursor-pointer"
                @click="$emit('close-modal')"
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);

defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
