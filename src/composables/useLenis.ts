import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

/**
 * Composable de Scroll Suave Aveludado com Lenis.
 */
export function useLenis() {
  let lenisInstance: Lenis | null = null
  let rafId: number | null = null

  onMounted(() => {
    // Parâmetros ajustados para um scroll fluido e responsivo
    lenisInstance = new Lenis({
      duration: 1.2, // Duração do deslizamento
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de desaceleração suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Sensibilidade da roda do mouse
      touchMultiplier: 1.8, // Sensibilidade em telas sensíveis ao toque
    })

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