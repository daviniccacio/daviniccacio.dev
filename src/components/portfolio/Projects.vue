<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Github, Images } from 'lucide-vue-next'
import SectionLabel from '../ui/SectionLabel.vue'
import MediaModal, { type MediaItem } from './MediaModal.vue'

// Imagens e mídias temporárias usando placeholders para não travar a compilação do Vite
const pomodoroImg = 'https://placehold.co/1280x800/18181b/3f3f46?text=PomodoroApp'
const hordaImg = 'https://placehold.co/1280x800/18181b/3f3f46?text=Horda+Crossfit'
const financePlusImg = 'https://placehold.co/1280x800/18181b/3f3f46?text=FinancePlus+1'
const financePlusImg2 = 'https://placehold.co/1280x800/18181b/3f3f46?text=FinancePlus+2'
const financePlusImg3 = 'https://placehold.co/1280x800/18181b/3f3f46?text=FinancePlus+3'
const treinopesadoAppImg = 'https://placehold.co/1280x800/18181b/3f3f46?text=Treino+Pesado+App'

interface Project {
  title: string
  image: string
  description: string
  tags: string[]
  links: { label: string; href: string; icon: any }[]
  media: MediaItem[]
}

const projects: Project[] = [
  {
    title: "PomodoroApp",
    image: pomodoroImg,
    description: "App desktop de produtividade baseado na técnica Pomodoro, com timers configuráveis e interface minimalista.",
    tags: ["Electron", "JavaScript", "Tailwind CSS"],
    links: [{ label: "Ver Projeto", href: "https://github.com/daviniccacio/PomodoroApp", icon: Github }],
    media: [{ type: "image", src: pomodoroImg }],
  },
  {
    title: "Horda Crossfit",
    image: hordaImg,
    description: "Landing page institucional responsiva para academia, com planos, modalidades e grade de horários.",
    tags: ["HTML5", "Tailwind CSS", "JavaScript"],
    links: [{ label: "Ver site", href: "https://horda-cross-website.vercel.app", icon: ArrowUpRight }],
    media: [{ type: "image", src: hordaImg }],
  },
  {
    title: "FinancePlus",
    image: financePlusImg,
    description: "Um sistema web completo, moderno e responsivo para controle e planejamento financeiro pessoal ou empresarial.",
    tags: ["React", "Tailwind CSS", "Vite"],
    links: [{ label: "Ver Projeto", href: "https://github.com/daviniccacio/FinancePlus", icon: Github }],
    media: [
      { type: "image", src: financePlusImg },
      { type: "image", src: financePlusImg2 },
      { type: "image", src: financePlusImg3 }
    ],
  },
  {
    title: "Treino Pesado App",
    image: treinopesadoAppImg,
    description: "Aplicativo Mobile com intuito de visualização e demonstração de exercícios físicos e também criação de treinos para alunos.",
    tags: ["React Native", "Nativewind", "TypeScript"],
    links: [{ label: "Ver Projeto", href: "https://github.com/daviniccacio/TreinoPesadoApp", icon: Github }],
    media: [{ type: "image", src: treinopesadoAppImg }],
  },
]

// Estado do projeto selecionado para exibir no modal de mídia
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
      <article
        v-for="(p, i) in projects"
        :key="p.title"
        data-reveal
        class="reveal group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
        :style="{ transitionDelay: `${i * 80}ms` }"
      >
        <div class="overflow-hidden border-b border-border object-contain">
          <img
            :src="p.image"
            :alt="`Prévia do projeto ${p.title}`"
            loading="lazy"
            width="1280"
            height="800"
            class="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <div class="flex flex-1 flex-col p-6">
          <h3 class="font-display text-xl font-semibold">{{ p.title }}</h3>
          <p class="mt-3 flex-1 text-sm text-muted-foreground">{{ p.description }}</p>
          
          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="t in p.tags"
              :key="t"
              class="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {{ t }}
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap items-center gap-4">
            <a
              v-for="link in p.links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              <component :is="link.icon" class="size-4" />
              {{ link.label }}
            </a>
            
            <button
              class="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              @click="activeIndex = i"
            >
              <Images class="size-4" />
              Ver mídia
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal Reutilizável de Mídia -->
    <MediaModal
      :is-open="activeProject !== null"
      :title="activeProject?.title ?? ''"
      :media="activeProject?.media ?? []"
      @close="activeIndex = null"
    />
  </section>
</template>