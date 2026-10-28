import { onMounted, onUnmounted } from 'vue'

/**
 * Composable de Animação de Revelação ao Rolar a Página.
 * Utiliza IntersectionObserver + MutationObserver para detectar elementos dinâmicos (como filtros).
 */
export function useReveal() {
  let observer: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null

  // Função que registra todos os elementos [data-reveal] no IntersectionObserver
  const observeElements = () => {
    const targets = document.querySelectorAll('[data-reveal]')
    targets.forEach((el) => observer?.observe(el))
  }

  const initObserver = () => {
    // 1. Configura o observador de visibilidade na tela
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          } else {
            entry.target.classList.remove('revealed')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    // Observa os elementos iniciais da página
    observeElements()

    // 2. Configura o MutationObserver para re-observar quando o Vue filtrar/alterar a lista no DOM
    mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    observer?.disconnect()
    mutationObserver?.disconnect()
  })
}