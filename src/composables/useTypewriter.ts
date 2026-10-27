import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable que simula o efeito de uma máquina de escrever (dactilografia).
 * 
 * @param words - Lista de palavras que serão exibidas em ciclo.
 * @param typeSpeed - Velocidade ao digitar cada letra (ms).
 * @param deleteSpeed - Velocidade ao apagar cada letra (ms).
 * @param delayBetweenWords - Tempo de pausa quando a palavra está completa (ms).
 */
export function useTypewriter(
  words: string[],
  typeSpeed: number = 100,
  deleteSpeed: number = 50,
  delayBetweenWords: number = 2000
) {
  // Estado reativo que guarda o texto atualmente visível no ecrã
  const displayText = ref('')
  
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const type = () => {
    // Garante que o índice gira em ciclo pelas palavras disponíveis
    const currentWord = words[wordIndex % words.length]

    if (isDeleting) {
      displayText.value = currentWord.substring(0, charIndex - 1)
      charIndex--
    } else {
      displayText.value = currentWord.substring(0, charIndex + 1)
      charIndex++
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed

    // Se concluiu a palavra atual
    if (!isDeleting && charIndex === currentWord.length) {
      speed = delayBetweenWords
      isDeleting = true
    } 
    // Se terminou de apagar a palavra atual
    else if (isDeleting && charIndex === 0) {
      isDeleting = false
      wordIndex++
      speed = 500
    }

    timeoutId = setTimeout(type, speed)
  }

  onMounted(() => {
    if (words.length > 0) {
      type()
    }
  })

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })

  return displayText
}