<script setup lang="ts">
import type { PartnerLogo } from '~/data/sectors'

const props = defineProps<{
  logos: PartnerLogo[]
}>()

// Duplicate for smooth marquee animation
const logosLoop = computed(() => [...props.logos, ...props.logos])
</script>

<template>
  <section class="partners-section">
    <div class="partners-inner">
      <div class="partners-track">
        <div class="partners-logos">
          <div
            v-for="(item, idx) in logosLoop"
            :key="idx"
            class="logo-item"
            :class="{ 'logo-item--dark': item.dark, 'logo-item--text': !item.src }"
            :aria-hidden="idx >= props.logos.length"
          >
            <img v-if="item.src" :src="item.src" :alt="idx < props.logos.length ? item.name : ''" />
            <span v-else class="logo-text">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  background: var(--white);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 48px 32px;
  overflow: hidden;
}
.partners-inner { max-width: 1320px; margin: 0 auto; }
.partners-track {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}
.partners-logos {
  display: flex;
  align-items: center;
  gap: 72px;
  width: max-content;
  animation: marquee 38s linear infinite;
}
.partners-logos:hover { animation-play-state: paused; }
.logo-item {
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  height: 52px;
  padding: 0 8px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}
.logo-item--dark { background: var(--black); border-radius: 8px; padding: 10px 18px; height: 52px; box-sizing: border-box; }
.logo-item:hover { opacity: 1; }
.logo-item img { height: 100%; width: auto; max-width: 180px; object-fit: contain; display: block; }

.logo-item--text { padding: 0 20px; }
.logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.625rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--navy-deep);
  white-space: nowrap;
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 600px) {
  .logo-item { height: 40px; }
  .partners-logos { gap: 48px; }
  .logo-text { font-size: 1.25rem; }
}
</style>
