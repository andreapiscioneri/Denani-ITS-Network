<script setup lang="ts">
const router = useRouter()

// Forza lo scroll al top quando la rotta cambia o al caricamento iniziale
const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

router.afterEach(() => {
  scrollToTop()
})

onMounted(() => {
  scrollToTop()
})
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
