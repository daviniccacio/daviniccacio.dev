<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Github, Images } from 'lucide-vue-next'
import SectionLabel from '../ui/SectionLabel.vue'
import MediaModal, { type MediaItem } from './MediaModal.vue'

// Interface de tipagem do projeto
interface Project {
  title: string
  image: string
  description: string
  tags: string[]
  links: { label: string; href: string; icon: any }[]
  media: MediaItem[]
}

// Lista de projetos utilizando as mídias da pasta public/projects/
const projects: Project[] = [
  {
    title: "PomodoroApp",
    image: "/projects/pomodoro/pomodoroapp.png",
    description: "App desktop de produtividade baseado na técnica Pomodoro, com timers configuráveis e interface minimalista.",
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
    image: "/projects/hordacross/sitehordacross.png ",
    description: "Landing page institucional responsiva para um centro de treinamento crossfit, com planos, modalidades e grade de horários.",
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
    tags: ["Vue", "Tailwind CSS", "Vite"],
    links: [
      { label: "Ver Site", href: "https://treinopesadoacademia.com.br", icon: ArrowUpRight },
    ],
    media: [
      { type: "image", src: "/projects/sitetreinopesadoacademia/sitetreinopesadoacademia.png", alt: "Listagem de treinos no site" }
    ],
  },
]

// Controle do estado reativo do modal de galeria
const activeIndex = ref<number | null>(null)
const activeProject = computed(() => (activeIndex.value !== null ? projects[activeIndex.value] : null))
</script>

<template>
  <section id="projetos" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
    <div data-reveal class="reveal">
      <SectionLabel>Projetos</SectionLabel>
      <h2 class="max-w-lg text-4xl font-bold sm:text-5xl">Trabalhos selecionados.</h2>
    </div>

    <div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="(p, i) in projects" :key="p.title" data-reveal
        class="reveal group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
        :style="{ transitionDelay: `${i * 80}ms` }">
        <!-- Capa do Projeto -->
        <div class="overflow-hidden border-b border-border object-contain">
          <img :src="p.image" :alt="`Prévia do projeto ${p.title}`" loading="lazy" width="1280" height="800"
            class="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>

        <!-- Conteúdo do Cartão -->
        <div class="flex flex-1 flex-col p-6">
          <h3 class="font-display text-xl font-semibold">{{ p.title }}</h3>
          <p class="mt-3 flex-1 text-sm text-muted-foreground">{{ p.description }}</p>

          <!-- Tags de Tecnologia -->
          <ul class="mt-5 flex flex-wrap gap-2">
            <li v-for="t in p.tags" :key="t"
              class="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
              {{ t }}
            </li>
          </ul>

          <!-- Links e Botão de Galeria -->
          <div class="mt-6 flex flex-wrap items-center gap-4">
            <a v-for="link in p.links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80">
              <component :is="link.icon" class="size-4" />
              {{ link.label }}
            </a>

            <button
              class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              @click="activeIndex = i">
              <Images class="size-4" />
              Ver galeria ({{ p.media.length }})
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal Reutilizável de Mídia -->
    <MediaModal :is-open="activeProject !== null" :title="activeProject?.title ?? ''"
      :media="activeProject?.media ?? []" @close="activeIndex = null" />
  </section>
</template>