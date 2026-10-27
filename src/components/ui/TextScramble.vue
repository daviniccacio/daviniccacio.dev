<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  text: string
  duration?: number
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1500,
  speed: 40
})

const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
const displayText = ref('')
let intervalId: ReturnType<typeof setInterval> | null = null

const scramble = () => {
  const targetText = props.text
  const length = targetText.length
  let iteration = 0
  const maxIterations = props.duration / props.speed

  if (intervalId) clearInterval(intervalId)

  intervalId = setInterval(() => {
    displayText.value = targetText
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' '
        if (index < (iteration / maxIterations) * length) {
          return targetText[index]
        }
        return charset[Math.floor(Math.random() * charset.length)]
      })
      .join('')

    iteration++

    if (iteration >= maxIterations) {
      displayText.value = targetText
      if (intervalId) clearInterval(intervalId)
    }
  }, props.speed)
}

onMounted(() => {
  scramble()
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <span>{{ displayText }}</span>
</template>