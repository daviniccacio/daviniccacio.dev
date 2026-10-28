<script setup lang="ts">
// Componentes principais de layout
import Nav from './components/portfolio/Nav.vue'
import Hero from './components/portfolio/Hero.vue'
import About from './components/portfolio/About.vue'
import Timeline from './components/portfolio/Timeline.vue'
import Projects from './components/portfolio/Projects.vue'
import Contact from './components/portfolio/Contact.vue'

// Componentes de usabilidade global
import ScrollProgress from './components/ui/ScrollProgress.vue'
import BackToTop from './components/ui/BackToTop.vue'

// Composables reativos
import { useReveal } from './composables/useReveal'
import { useLenis } from './composables/useLenis'

// Inicializa o scroll suave com Lenis
useLenis()

// Inicializa a animação de revelação de elementos ao rolar
useReveal()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
    <!-- Barra de progresso de leitura no topo -->
    <ScrollProgress />

    <!-- Barra de Navegação -->
    <Nav />

    <!-- Conteúdo Principal -->
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
    </main>

    <!-- Botão flutuante para voltar ao topo -->
    <BackToTop />
  </div>
</template>