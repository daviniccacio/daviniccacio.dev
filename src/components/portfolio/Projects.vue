<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Github, Images } from 'lucide-vue-next'
import SectionLabel from '../ui/SectionLabel.vue'
import MediaModal, { type MediaItem } from './MediaModal.vue'

// Definição das categorias aceites
type Category = 'todos' | 'web' | 'mobile' | 'desktop'

// Estrutura de dados do projeto
interface Project {
  title: string
  image: string
  description: string
  category: Category
  tags: string[]
  links: { label: string; href: string; icon: any }[]
  media: MediaItem[]
}

const selectedCategory = ref<Category>('todos')

const categories: { label: string; value: Category }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Desktop', value: 'desktop' },
]

// Lista de trabalhos desenvolvidos
const projects: Project[] = [
  {
    title: "PomodoroApp",
    image: "/projects/pomodoro/pomodoroapp.png",
    description: "App desktop de produtividade baseado na técnica Pomodoro, com timers configuráveis e interface minimalista.",
    category: "desktop",
    tags: ["Electron", "JavaScript", "Tailwind CSS"],
    links: [
      { label: "Ver Projeto", href: "https://github.com/daviniccacio/PomodoroApp", icon: Github }
    ],
    media: [
      { type: "image", src: "/projects/pomodoro/pomodoroapp.png", alt: "Tela principal do PomodoroApp" },
    ],
  },
  {
    title: "Horda Crossfit",
    image: "/projects/hordacross/sitehordacross.png",
    description: "Landing page institucional responsiva para um centro de treinamento crossfit, com planos, modalidades e grade de horários.",
    category: "web",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    links: [
      { label: "Ver site", href: "https://horda-cross-website.vercel.app", icon: ArrowUpRight }
    ],
    media: [
      { type: "image", src: "/projects/hordacross/sitehordacross.png", alt: "Página inicial do site Horda Crossfit" }
    ],
  },
  {
    title: "Kashio",
    image: "/projects/kashio/kashio.png",
    description: "Um sistema web completo, moderno e responsivo para controle e planejamento financeiro pessoal ou empresarial.",
    category: "web",
    tags: ["React", "Tailwind CSS", "Vite"],
    links: [
      { label: "Ver Projeto", href: "https://github.com/daviniccacio/Kashio", icon: Github }
    ],
    media: [
      { type: "image", src: "/projects/kashio/kashio.png", alt: "Página inicial do Kashio" },
      { type: "image", src: "/projects/kashio/kashio1.png", alt: "Gráficos e relatórios de fluxo de caixa" },
      { type: "image", src: "/projects/kashio/kashio2.png", alt: "Lançamento de despesas e receitas" }
    ],
  },
  {
    title: "Treino Pesado App",
    image: "/projects/treinopesadoapp/apptreinopesado.png",
    description: "Aplicativo Mobile com intuito de visualização e demonstração de exercícios físicos e também criação de treinos para alunos.",
    category: "mobile",
    tags: ["React Native", "Nativewind", "TypeScript"],
    links: [
      { label: "Ver Projeto", href: "https://github.com/daviniccacio/TreinoPesadoApp", icon: Github },
      { label: "Ver Aplicativo", href: "https://play.google.com/store/apps/details?id=com.daviniccacio.treinopesado", icon: ArrowUpRight }
    ],
    media: [
      { type: "video", src: "/projects/treinopesadoapp/TreinoPesadoAppVideo.mp4", alt: "Demonstração em vídeo da execução do treino" },
      { type: "image", src: "/projects/treinopesadoapp/apptreinopesado.png", alt: "Listagem de treinos no app mobile" }
    ],
  },
  {
    title: "Website Treino Pesado Academia",
    image: "/projects/sitetreinopesadoacademia/sitetreinopesadoacademia.png",
    description: "Website institucional responsivo para uma academia de musculação, com informações sobre planos, horários e modalidades.",
    category: "web",
    tags: ["Vue", "Tailwind CSS", "Vite"],
    links: [
      { label: "Ver Site", href: "https://treinopesadoacademia.com.br", icon: ArrowUpRight },
    ],
    media: [
      { type: "image", src: "/projects/sitetreinopesadoacademia/sitetreinopesadoacademia.png", alt: "Listagem de treinos no site" }
    ],
  },
]

// Filtro computado dinâmico por categoria
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'todos') return projects
  return projects.filter((p) => p.category === selectedCategory.value)
})

// Estado da galeria de mídia no modal
const activeIndex = ref<number | null>(null)
const activeProject = computed(() => (activeIndex.value !== null ? filteredProjects.value[activeIndex.value] : null))
</script>

<template>
  <section id="projetos" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
    <!-- Cabeçalho da Secção + Filtros -->
    <div data-reveal class="reveal flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <SectionLabel>Projetos</SectionLabel>
        <h2 class="max-w-lg text-4xl font-bold sm:text-5xl">Trabalhos selecionados.</h2>
      </div>

      <!-- Abas do Filtro de Categorias -->
      <div class="flex flex-wrap gap-2 rounded-2xl border border-border bg-surface/40 p-1.5 backdrop-blur-sm">
        <button
          v-for="cat in categories"
          :key="cat.value"
          type="button"
          @click="selectedCategory = cat.value"
          class="rounded-xl px-4 py-2 font-display text-xs font-medium tracking-wide transition-all cursor-pointer"
          :class="
            selectedCategory === cat.value
              ? 'bg-accent text-accent-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground'
          "
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Lista de Cartões de Projetos -->
    <div class="mt-12 flex flex-wrap gap-6">
      <article
        v-for="(p, i) in filteredProjects"
        :key="p.title"
        data-reveal
        class="reveal group flex flex-col flex-1 min-w-75 sm:min-w-[320px] lg:max-w-[calc(50%-12px)] overflow-hidden rounded-3xl border border-border bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
        :style="{ transitionDelay: `${i * 60}ms` }"
      >
        <!-- Capa do Projeto -->
        <div class="overflow-hidden border-b border-border object-contain relative">
          <img
            :src="p.image"
            :alt="`Prévia do projeto ${p.title}`"
            loading="lazy"
            width="1280"
            height="800"
            class="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <!-- Conteúdo do Cartão -->
        <div class="flex flex-1 flex-col p-6">
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-display text-xl font-semibold">{{ p.title }}</h3>
            
            <!-- Badge de Categoria Redesenhar (Space Grotesk + Uppercase + Glow) -->
            <span class="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-display text-[10px] font-bold tracking-wider uppercase text-accent">
              {{ p.category }}
            </span>
          </div>

          <p class="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">{{ p.description }}</p>

          <!-- Tags de Tecnologia Redesenhar (Inter + Font-Sans + Padding Aprimorado) -->
          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="t in p.tags"
              :key="t"
              class="rounded-full border border-border/80 bg-surface/80 px-3 py-1 font-sans text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
            >
              {{ t }}
            </li>
          </ul>

          <!-- Links e Botão de Galeria -->
          <div class="mt-6 flex flex-wrap items-center gap-4">
            <a
              v-for="link in p.links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-accent transition-opacity hover:opacity-80"
            >
              <component :is="link.icon" class="size-4" />
              {{ link.label }}
            </a>

            <button
              class="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              @click="activeIndex = i"
              aria-label="Ver galeria de mídias do projeto"
              
            >
              <Images class="size-4" />
              Ver galeria ({{ p.media.length }})
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal de Mídias -->
    <MediaModal
      :is-open="activeProject !== null"
      :title="activeProject?.title ?? ''"
      :media="activeProject?.media ?? []"
      @close="activeIndex = null"
    />
  </section>
</template>