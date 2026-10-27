<script setup lang="ts">
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-vue-next'
import SectionLabel from '../ui/SectionLabel.vue'
import { useTypewriter } from '../../composables/useTypewriter'

// Ativa o efeito de dactilografia para os símbolos de pontuação
const typed = useTypewriter(["?", "!"])

const actions = [
  { label: "WhatsApp", href: "https://wa.me/5598985597868", Icon: MessageCircle, primary: true },
  { label: "Email", href: "mailto:daviniccacio@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daviniccacio", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/daviniccacio", Icon: Github },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <section
    id="contato"
    class="grain mesh-hero relative overflow-hidden border-t border-border"
  >
    <div class="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <div data-reveal class="reveal">
        <SectionLabel>Contato</SectionLabel>
        
        <h2 class="text-glow text-[clamp(2.5rem,9vw,6rem)] leading-[0.9] font-bold">
          Vamos
          <br />
          conversar{{ typed }}
        </h2>
        
        <p class="mt-6 max-w-md text-muted-foreground">
          Aberto a oportunidades e freelas de front-end. Escolha o canal que preferir — respondo
          rápido.
        </p>
      </div>

      <!-- Botões de Ação Dinâmicos -->
      <div data-reveal class="reveal mt-12 flex flex-wrap gap-3">
        <a
          v-for="action in actions"
          :key="action.label"
          :href="action.href"
          target="_blank"
          rel="noreferrer"
          :class="
            action.primary
              ? 'inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-[0_0_40px_var(--accent-glow)] transition-transform hover:-translate-y-0.5'
              : 'inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent'
          "
        >
          <!-- <component :is="..." /> renderiza o componente de ícone do Lucide passado no objeto -->
          <component :is="action.Icon" class="size-4" />
          {{ action.label }}
        </a>
      </div>
    </div>

    <!-- Rodapé -->
    <footer class="border-t border-border">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {{ currentYear }} Davi Nicacio de Oliveira Cunha. Todos os direitos reservados.
        </p>
        <p class="font-mono">São Luís · MA · Brasil</p>
      </div>
    </footer>
  </section>
</template>