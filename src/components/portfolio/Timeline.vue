<script setup lang="ts">
import SectionLabel from '../ui/SectionLabel.vue'

// Lista de histórico profissional
const jobs = [
  {
    role: "Assistente de TI",
    company: "FR Negócios",
    period: "Fev/2026 — Atual",
    current: true,
    bullets: [
      "Desenvolvimento e manutenção de interfaces web responsivas para sistemas internos",
      "Scripts de automação em PowerShell e Batch",
      "Suporte à infraestrutura de TI: rede, servidores e estações de trabalho",
    ],
  },
  {
    role: "Dev Front-End",
    company: "Portal Web de Ciência da Computação",
    period: "Mai/2025 — Set/2025",
    current: false,
    bullets: [
      "Site institucional do curso construído com HTML5, Tailwind CSS e JavaScript",
      "Layout responsivo e conteúdo organizado por seções",
    ],
  },
  {
    role: "Dev Front-End Voluntário",
    company: "App de Gestão de Academia",
    period: "Set/2024 — Nov/2024",
    current: false,
    bullets: [
      "Front-end de aplicativo de gestão operacional",
      "Componentização e padronização visual das telas",
    ],
  },
]
</script>

<template>
  <section id="experiencia" class="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
    <div data-reveal class="reveal">
      <SectionLabel>Experiência</SectionLabel>
      <h2 class="max-w-lg text-4xl font-bold sm:text-5xl">Onde eu já tive colaboração.</h2>
    </div>

    <ol class="mt-16 border-l border-border">
      <li
        v-for="(job, i) in jobs"
        :key="job.company"
        data-reveal
        class="reveal relative pb-14 pl-8 last:pb-0 sm:pl-12"
        :style="{ transitionDelay: `${i * 90}ms` }"
      >
        <!-- Indicador circular na linha do tempo -->
        <span
          class="absolute top-1.5 -left-1.25 size-2.5 rounded-full"
          :class="
            job.current
              ? 'bg-accent shadow-[0_0_18px_var(--accent-glow)]'
              : 'bg-border'
          "
        />
        <p class="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {{ job.period }}
        </p>
        <h3 class="mt-2 text-2xl font-semibold">{{ job.role }}</h3>
        <p class="text-accent">{{ job.company }}</p>
        
        <ul class="mt-4 space-y-2">
          <li
            v-for="bullet in job.bullets"
            :key="bullet"
            class="flex gap-3 text-sm text-muted-foreground"
          >
            <span class="mt-2 size-1 shrink-0 rounded-full bg-accent/60" />
            {{ bullet }}
          </li>
        </ul>
      </li>
    </ol>
  </section>
</template>