<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-vue-next'

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

// Estado reativo do índice da imagem/vídeo atual
const index = ref(0)

// Propriedades computadas
const hasMedia = computed(() => props.media.length > 0)
const current = computed(() => (hasMedia.value ? props.media[index.value] : null))

// Funções de navegação
const goPrev = () => {
  if (!hasMedia.value) return
  index.value = index.value === 0 ? props.media.length - 1 : index.value - 1
}

const goNext = () => {
  if (!hasMedia.value) return
  index.value = index.value === props.media.length - 1 ? 0 : index.value + 1
}

// Gestão de atalhos de teclado (Esc, Setas)
const handleKeyDown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') goNext()
  if (e.key === 'ArrowLeft') goPrev()
}

// Observa mudanças na abertura do modal para reiniciar o índice
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) index.value = 0
  }
)

// Registo e remoção de listeners do ciclo de vida
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div class="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-zinc-900 p-6 text-white shadow-2xl border border-zinc-800">
        <!-- Cabeçalho -->
        <div class="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 class="text-xl font-semibold">{{ title }}</h3>
          <button
            class="rounded-lg p-1 hover:bg-zinc-800 transition-colors"
            @click="emit('close')"
          >
            <X class="h-6 w-6" />
          </button>
        </div>

        <!-- Área Principal de Mídia -->
        <div class="relative flex flex-1 items-center justify-center overflow-hidden min-h-75">
          <template v-if="current">
            <img
              v-if="current.type === 'image'"
              :src="current.src"
              :alt="current.alt || title"
              class="max-h-[70vh] w-auto rounded-lg object-contain"
            />
            <video
              v-else-if="current.type === 'video'"
              :src="current.src"
              controls
              class="max-h-[70vh] w-full rounded-lg"
            />
          </template>

          <div v-else class="flex flex-col items-center text-zinc-500">
            <ImageOff class="h-12 w-12 mb-2" />
            <p>Nenhuma mídia disponível</p>
          </div>

          <!-- Botões de Navegação -->
          <template v-if="hasMedia && media.length > 1">
            <button
              class="absolute left-2 rounded-full bg-black/50 p-2 hover:bg-black/80 transition-colors"
              @click="goPrev"
            >
              <ChevronLeft class="h-6 w-6" />
            </button>
            <button
              class="absolute right-2 rounded-full bg-black/50 p-2 hover:bg-black/80 transition-colors"
              @click="goNext"
            >
              <ChevronRight class="h-6 w-6" />
            </button>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>