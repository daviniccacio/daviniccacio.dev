import { onMounted, onUnmounted } from 'vue'

/**
 * Composable que observa elementos com o atributo [data-reveal]
 * e adiciona a classe '.revealed' quando entram no campo de visão (viewport).
 */
export function useReveal() {
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    // Seleciona todos os elementos marcados no HTML
    const targets = document.querySelectorAll('[data-reveal]')

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Adiciona a classe de animação quando o elemento fica visível
            entry.target.classList.add('revealed')
            // Opcional: para de observar após revelar uma vez
            observer?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    targets.forEach((el) => observer?.observe(el))
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}