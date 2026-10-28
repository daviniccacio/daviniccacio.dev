<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Palette } from 'lucide-vue-next'
import { useTheme } from '../../composables/useTheme'

// Importa a lógica de alternância de tema
const { currentTheme, toggleTheme } = useTheme()

// Mapeamento dos links de navegação da página
const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

// Estados reativos do componente
const scrolled = ref(false)
const open = ref(false)
const activeSection = ref('')

let observer: IntersectionObserver | null = null

// Monitora a rolagem vertical para aplicar o efeito de vidro na barra
const onScroll = () => {
  const isTop = window.scrollY < 100
  scrolled.value = window.scrollY > 24

  if (isTop) {
    activeSection.value = '#top'
  }
}

// Configura os ouvintes de evento e o observador de interseção
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const allTargets = ['#top', ...links.map((l) => l.href)]
  const sectionElements = allTargets
    .map((id) => document.querySelector(id))
    .filter((el): el is HTMLElement => el !== null)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = `#${entry.target.id}`
        }
      })
    },
    {
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    }
  )

  sectionElements.forEach((el) => observer?.observe(el))
})

// Desconecta os ouvintes ao desmontar o componente
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (observer) observer.disconnect()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="
      scrolled
        ? 'border-b border-border bg-background/80 backdrop-blur-xl backdrop-saturate-180'
        : 'bg-transparent'
    "
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
      <!-- Marca Principal -->
      <a href="#top" class="font-display text-base font-bold tracking-tight transition-transform hover:scale-105">
        daviniccacio<span class="text-accent">.</span>dev
      </a>

      <!-- Menu Desktop -->
      <ul class="hidden items-center gap-10 md:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="text-sm transition-all duration-300"
            :class="
              activeSection === link.href
                ? 'text-accent font-medium [text-shadow:0_0_12px_var(--accent-glow)]'
                : 'text-muted-foreground hover:text-foreground'
            "
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Ações do Cabeçalho Desktop -->
      <div class="hidden items-center gap-5 md:flex">
        <!-- Botão de Tema Animado (Giro + Escala + Transição de Ícone) -->
        <button
          type="button"
          @click="toggleTheme($event)"
          class="group relative flex size-9 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:border-accent hover:text-accent hover:scale-110 hover:shadow-[0_0_15px_var(--accent-glow)] active:scale-90"
          :title="currentTheme === 'normal' ? 'Mudar para Tema Monocromático' : 'Mudar para Tema Padrão'"
          :aria-label="currentTheme === 'normal' ? 'Mudar para Tema Monocromático' : 'Mudar para Tema Padrão'"
        >
          <!-- Animação do Ícone com Vue Transition -->
          <Transition name="icon-spin" mode="out-in">
            <Palette v-if="currentTheme === 'normal'" key="sparkles" class="size-4 text-accent transition-transform duration-500 group-hover:rotate-180" />
            <Palette v-else key="palette" class="size-4 transition-transform duration-500 group-hover:rotate-180" />
          </Transition>
        </button>

        <a
          href="#contato"
          class="rounded-full border border-accent/40 px-5 py-2 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-[0_0_20px_var(--accent-glow)]"
        >
          Falar comigo
        </a>
      </div>

      <!-- Botão Menu Mobile + Ícone de Tema Mobile -->
      <div class="flex items-center gap-3 md:hidden">
        <button
          type="button"
          @click="toggleTheme($event)"
          class="group flex size-9 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all active:scale-90"
          :aria-label="currentTheme === 'normal' ? 'Mudar para Tema Monocromático' : 'Mudar para Tema Padrão'"
        >
          <Transition name="icon-spin" mode="out-in">
            <Palette v-if="currentTheme === 'normal'" key="sparkles-mobile" class="size-4 text-accent" />
            <Palette v-else key="palette-mobile" class="size-4" />
          </Transition>
        </button>

        <button
          type="button"
          aria-label="Abrir menu"
          class="p-1 text-foreground"
          @click="open = !open"
        >
          <X v-if="open" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </div>
    </nav>

    <!-- Drawer do Menu Mobile -->
    <ul
      v-if="open"
      class="flex flex-col gap-2 border-t border-border bg-background/95 px-6 py-5 backdrop-blur-xl md:hidden"
    >
      <li v-for="link in links" :key="link.href">
        <a
          :href="link.href"
          class="block py-2.5 text-base transition-colors"
          :class="
            activeSection === link.href
              ? 'text-accent font-medium [text-shadow:0_0_12px_var(--accent-glow)]'
              : 'text-muted-foreground hover:text-accent'
          "
          @click="open = false"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </header>
</template>

<style scoped>
/* Transição personalizada do ícone Vue */
.icon-spin-enter-active,
.icon-spin-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.icon-spin-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.icon-spin-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>