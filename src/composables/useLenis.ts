import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

/**
 * Composable para inicializar o scroll suave aveludado do Lenis
 */
export function useLenis() {
  let lenisInstance: Lenis | null = null
  let rafId: number | null = null

  onMounted(() => {
    // Inicializa o Lenis com configurações equilibradas
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Loop de animação contínua (requestAnimationFrame)
    function raf(time: number) {
      lenisInstance?.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
    lenisInstance?.destroy()
  })

  return {
    lenis: lenisInstance
  }
}