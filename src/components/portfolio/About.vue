<script setup lang="ts">
// Importação de ícones para cada categoria da stack e formação
import { 
  Code2, 
  Layout, 
  Smartphone, 
  Database, 
  Wrench, 
  GraduationCap 
} from 'lucide-vue-next'
import SectionLabel from '../ui/SectionLabel.vue'

// Dados da stack de tecnologias mapeados com ícones correspondentes
const stack = [
  { group: "Linguagens", icon: Code2, items: ["JavaScript", "TypeScript"] },
  { group: "Front-End", icon: Layout, items: ["Vue.js", "React", "Tailwind CSS", "HTML5", "CSS3"] },
  { group: "Desktop & Mobile", icon: Smartphone, items: ["Tauri", "Electron", "React Native", "Expo"] },
  { group: "Back-End & DB", icon: Database, items: ["Node.js", "Supabase"] },
  { group: "Ferramentas", icon: Wrench, items: ["Git", "GitHub", "Figma", "pnpm", "npm"] },
]

// Histórico de formação acadêmica e técnica
const education = [
  {
    title: "Bacharelado em Ciência da Computação",
    place: "Centro Universitário Estácio São Luís",
    period: "Mar/2023 — Cursando",
  },
  {
    title: "Técnico em Montagem e Manutenção de Computadores",
    place: "IEMA",
    period: "2019",
  },
]
</script>

<template>
  <section id="sobre" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
    <div class="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
      
      <!-- Coluna Principal: Informações e Formação -->
      <div data-reveal class="reveal">
        <SectionLabel>Sobre</SectionLabel>
        
        <h2 class="text-4xl font-bold sm:text-5xl">
          Interfaces com
          <br />
          <span class="text-accent">propósito</span>.
        </h2>
        
        <p class="mt-6 text-muted-foreground">
          Sou desenvolvedor front-end focado em soluções para web, desktop e mobile. Gosto de
          transformar requisitos confusos em interfaces claras, rápidas e acessíveis — e de deixar
          o código legível para quem vem depois.
        </p>
        
        <p class="mt-4 text-muted-foreground">
          Além do front, atuo com infraestrutura de TI e automação (PowerShell/Batch, redes,
          servidores) — um diferencial que me ajuda a entender o sistema de ponta a ponta.
        </p>

        <!-- Badge de Status Profissional -->
        <div class="mt-8 inline-flex items-center gap-3 rounded-2xl border border-accent/25 bg-surface/60 px-4 py-3">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-2 animate-ping rounded-full bg-accent opacity-70" />
            <span class="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span class="text-sm">
            Assistente de TI @ FR Negócios
            <span class="text-muted-foreground"> — Fev/2026 – atual</span>
          </span>
        </div>

        <!-- Seção de Formação Acadêmica -->
        <div class="mt-10">
          <p class="inline-flex items-center gap-2 font-display text-sm font-semibold">
            <GraduationCap class="size-4 text-accent" />
            Formação
          </p>
          <ul class="mt-4 space-y-4">
            <li
              v-for="e in education"
              :key="e.title"
              class="border-l border-border pl-4"
            >
              <p class="text-sm font-medium">{{ e.title }}</p>
              <p class="text-sm text-muted-foreground">{{ e.place }}</p>
              <p class="font-mono text-xs text-muted-foreground">{{ e.period }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Coluna Secundária: Exibição da Stack de Tecnologias -->
      <div class="space-y-8">
        <div
          v-for="(s, i) in stack"
          :key="s.group"
          data-reveal
          class="reveal"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <!-- Cabeçalho do Grupo com Ícone Reativo -->
          <p class="mb-3 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <component :is="s.icon" class="size-4 text-accent" />
            {{ s.group }}
          </p>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in s.items"
              :key="item"
              class="rounded-xl border border-border bg-surface/50 px-3.5 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>