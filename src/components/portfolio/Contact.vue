<script setup lang="ts">
import { ref } from 'vue'
import { Github, Linkedin, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-vue-next'
import SectionLabel from '../ui/SectionLabel.vue'
import { useTypewriter } from '../../composables/useTypewriter'

const typed = useTypewriter(["?", "!"])

const actions = [
  { label: "WhatsApp", href: "https://wa.me/5598985597868", Icon: MessageCircle, primary: true },
  { label: "Email", href: "mailto:daviniccacio@gmail.com", Icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daviniccacio", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/daviniccacio", Icon: Github },
]

// Estado do formulário de contato
const form = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const isSent = ref(false)

const handleSubmit = () => {
  if (!form.value.name || !form.value.email || !form.value.message) return

  isSubmitting.value = true

  // Simulação de envio com retorno positivo (Pronto para conectar ao Web3Forms/Formspree)
  setTimeout(() => {
    isSubmitting.value = false
    isSent.value = true
    form.value = { name: '', email: '', message: '' }

    setTimeout(() => {
      isSent.value = false
    }, 5000)
  }, 1000)
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <section
    id="contato"
    class="grain mesh-hero relative overflow-hidden border-t border-border"
  >
    <div class="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
      <div class="grid gap-14 lg:grid-cols-2">
        <!-- Coluna Esquerda: Texto de Chamada -->
        <div data-reveal class="reveal">
          <SectionLabel>Contato</SectionLabel>
          <h2 class="text-glow text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] font-bold">
            Vamos
            <br />
            conversar{{ typed }}
          </h2>
          <p class="mt-6 max-w-md text-muted-foreground">
            Aberto a oportunidades e freelas de front-end. Preencha o formulário ou escolha um canal rápido.
          </p>

          <div class="mt-10 flex flex-wrap gap-3">
            <a
              v-for="action in actions"
              :key="action.label"
              :href="action.href"
              target="_blank"
              rel="noreferrer"
              :class="
                action.primary
                  ? 'inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-accent-foreground shadow-[0_0_30px_var(--accent-glow)] transition-transform hover:-translate-y-0.5'
                  : 'inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent'
              "
            >
              <component :is="action.Icon" class="size-4" />
              {{ action.label }}
            </a>
          </div>
        </div>

        <!-- Coluna Direita: Formulário de Mensagem -->
        <div data-reveal class="reveal rounded-3xl border border-border bg-surface/50 p-8 backdrop-blur-md">
          <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
            <div>
              <label for="name" class="block font-mono text-xs text-muted-foreground uppercase">Nome</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Seu nome"
                class="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label for="email" class="block font-mono text-xs text-muted-foreground uppercase">E-mail</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                class="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>

            <div>
              <label for="message" class="block font-mono text-xs text-muted-foreground uppercase">Mensagem</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="4"
                placeholder="Como posso te ajudar?"
                class="mt-2 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:opacity-90 disabled:opacity-50"
            >
              <template v-if="isSubmitting">
                <span>Enviando...</span>
              </template>
              <template v-else-if="isSent">
                <CheckCircle2 class="size-4" />
                <span>Mensagem Enviada!</span>
              </template>
              <template v-else>
                <Send class="size-4" />
                <span>Enviar Mensagem</span>
              </template>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Rodapé -->
    <footer class="border-t border-border">
      <div class="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {{ currentYear }} Davi Nicacio de Oliveira Cunha. Todos os direitos reservados.</p>
        <p class="font-mono">São Luís · MA · Brasil</p>
      </div>
    </footer>
  </section>
</template>