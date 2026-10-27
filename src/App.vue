<script setup lang="ts">
// Importação de todos os componentes da interface
import Nav from './components/portfolio/Nav.vue'
import Hero from './components/portfolio/Hero.vue'
import About from './components/portfolio/About.vue'
import Timeline from './components/portfolio/Timeline.vue'
import Projects from './components/portfolio/Projects.vue'
import Contact from './components/portfolio/Contact.vue'

// Importação do composable para as animações de scroll
import { useReveal } from './composables/useReveal'

// Ativa a animação de revelação dos elementos ao rolar a página
useReveal()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
    <!-- Barra de Navegação Fixa -->
    <Nav />

    <!-- Conteúdo Principal do Portfólio -->
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Contact />
    </main>
  </div>
</template>