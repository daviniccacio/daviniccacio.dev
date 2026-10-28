<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const updateProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <!-- Barra de progresso fixa no topo superior da tela -->
  <div class="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
    <div
      class="h-full bg-accent transition-all duration-150 ease-out shadow-[0_0_10px_var(--accent-glow)]"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>