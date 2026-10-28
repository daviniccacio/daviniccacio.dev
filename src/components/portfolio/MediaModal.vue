<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight, ImageOff, Play } from 'lucide-vue-next'

// Definindo os tipos aceitos para os itens da galeria
export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
}

interface MediaModalProps {
  isOpen: boolean
  title: string
  media?: MediaItem[]
}

const props = withDefaults(defineProps<MediaModalProps>(), {
  media: () => []
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Estado reativo do índice da mídia visualizada no momento
const index = ref(0)

const hasMedia = computed(() => props.media.length > 0)
const current = computed(() => (hasMedia.value ? props.media[index.value] : null))

// Funções para navegar entre mídias
const goPrev = () => {
  if (!hasMedia.value) return
  index.value = index.value === 0 ? props.media.length - 1 : index.value - 1
}

const goNext = () => {
  if (!hasMedia.value) return
  index.value = index.value === props.media.length - 1 ? 0 : index.value + 1
}

// Atalhos de teclado (Setas direcionais e tecla ESC)
const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') goNext()
  if (e.key === 'ArrowLeft') goPrev()
}

// Reseta a galeria para a primeira posição ao abrir um projeto
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) index.value = 0
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity"
      @click.self="emit('close')"
    >
      <div class="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
        <!-- Cabeçalho do Modal -->
        <div class="flex items-center justify-between border-b border-border px-6 py-4">
          <div class="flex items-center gap-2">
            <h3 class="font-display text-lg font-semibold">{{ title }}</h3>
            <span class="rounded-full bg-border/60 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
              {{ index + 1 }} / {{ media.length }}
            </span>
          </div>
          <button
            class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-border/60 hover:text-foreground"
            @click="emit('close')"
          >
            <X class="size-5" />
          </button>
        </div>

        <!-- Área de Exibição Principal de Mídia (Chaves Únicas Aplicadas) -->
        <div class="relative flex aspect-16/10 items-center justify-center bg-black/30 overflow-hidden">
          <template v-if="current">
            <!-- Chave única diferenciada para Imagem -->
            <img
              v-if="current.type === 'image'"
              :key="'img-' + current.src"
              :src="current.src"
              :alt="current.alt || title"
              class="h-full w-full object-contain"
            />
            <!-- Chave única diferenciada para Vídeo -->
            <video
              v-else-if="current.type === 'video'"
              :key="'vid-' + current.src"
              :src="current.src"
              controls
              autoplay
              loop
              class="h-full w-full object-contain"
            />
          </template>

          <div v-else class="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageOff class="size-10" />
            <p class="text-sm">Nenhuma mídia disponível para este projeto.</p>
          </div>

          <!-- Botões de Navegação -->
          <template v-if="hasMedia && media.length > 1">
            <button
              class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/90 hover:scale-110"
              @click="goPrev"
            >
              <ChevronLeft class="size-5" />
            </button>
            <button
              class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/90 hover:scale-110"
              @click="goNext"
            >
              <ChevronRight class="size-5" />
            </button>
          </template>
        </div>

        <!-- Barra de Miniaturas (Thumbnails) -->
        <div v-if="hasMedia && media.length > 1" class="flex items-center justify-center gap-2 border-t border-border bg-background/50 p-3 overflow-x-auto">
          <button
            v-for="(item, idx) in media"
            :key="idx"
            class="relative h-12 w-16 overflow-hidden rounded-lg border-2 transition-all shrink-0"
            :class="idx === index ? 'border-accent scale-105' : 'border-transparent opacity-50 hover:opacity-100'"
            @click="index = idx"
          >
            <img v-if="item.type === 'image'" :src="item.src" class="h-full w-full object-cover" />
            <div v-else class="flex h-full w-full items-center justify-center bg-zinc-800 text-white">
              <Play class="size-4 fill-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>