import { onMounted, onUnmounted } from 'vue'

/**
 * Composable que observa elementos com o atributo [data-reveal]
 * e alterna a classe '.revealed' sempre que eles entram ou saem da tela.
 */
export function useReveal() {
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    // 1. Seleciona todos os elementos marcados com [data-reveal] no HTML
    const targets = document.querySelectorAll('[data-reveal]')

    // 2. Inicializa a API IntersectionObserver do navegador
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quando o elemento ENTRA na área visível: ativa a animação
            entry.target.classList.add('revealed')
          } else {
            // Quando o elemento SAI da área visível: reseta para poder animar novamente
            entry.target.classList.remove('revealed')
          }
        })
      },
      {
        // threshold: 0.15 significa que 15% do elemento precisa estar visível na tela
        threshold: 0.15,
        // rootMargin: cria uma margem virtual de 50px no fundo da tela para acionar a transição suavemente
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // 3. Registra cada elemento selecionado no observador
    targets.forEach((el) => observer?.observe(el))
  }

  // Executa o observador assim que o componente for montado no DOM
  onMounted(() => {
    initObserver()
  })

  // Desconecta todo o observador ao desmontar o componente para economizar memória
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}