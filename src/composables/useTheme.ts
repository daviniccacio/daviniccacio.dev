import { ref, onMounted } from 'vue'

export type ThemeMode = 'normal' | 'monochrome'

const currentTheme = ref<ThemeMode>('monochrome')

export function useTheme() {
  // Aplica o tema diretamente no atributo [data-theme] do HTML
  const setTheme = (theme: ThemeMode) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }

  // Alterna o tema com o efeito circular expansivo
  const toggleTheme = (event?: MouseEvent) => {
    const nextTheme: ThemeMode = currentTheme.value === 'normal' ? 'monochrome' : 'normal'

    // Se o navegador não suportar View Transitions ou não houver evento de clique, altera diretamente
    if (!document.startViewTransition || !event) {
      setTheme(nextTheme)
      return;
    }

    // Pega as coordenadas X e Y do clique no botão
    const x = event.clientX
    const y = event.clientY

    // Calcula a distância até o canto mais distante da tela para cobri-la inteira
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // Inicia a transição de visualização nativa
    const transition = document.startViewTransition(() => {
      setTheme(nextTheme)
    })

    // Assim que a transição estiver pronta, executa a animação do círculo expansivo
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ]

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 752,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      )
    })
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeMode | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme('monochrome')
    }
  })

  return {
    currentTheme,
    toggleTheme,
    setTheme
  }
}