<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const showButton = ref(false)

const checkScroll = () => {
  showButton.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition name="fade-slide">
    <button
      v-if="showButton"
      type="button"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full border border-border bg-surface/80 text-foreground backdrop-blur-md shadow-xl transition-all hover:border-accent hover:text-accent hover:scale-110 active:scale-95"
      aria-label="Voltar ao topo"
    >
      <ArrowUp class="size-5" />
    </button>
  </Transition>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>