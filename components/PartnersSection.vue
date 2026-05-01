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
  padding: clamp(32px, 5vw, 56px) 0;
  overflow: hidden;
}
.partners-inner { max-width: 1320px; margin: 0 auto; padding: 0 clamp(20px, 4vw, 48px); }
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
  width: 160px;
  height: 64px;
  padding: 8px 16px;
  box-sizing: border-box;
  opacity: 0.75;
  transition: opacity 0.3s ease;
}
.logo-item--dark { background: var(--black); border-radius: 8px; }
.logo-item:hover { opacity: 1; }
.logo-item img { width: 100%; height: 100%; object-fit: contain; display: block; }

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

@media (max-width: 760px) {
  .partners-logos { gap: 40px; animation-duration: 28s; }
  .logo-item { width: 130px; height: 52px; }
}
@media (max-width: 480px) {
  .logo-item { width: 110px; height: 44px; padding: 6px 10px; }
  .partners-logos { gap: 24px; animation-duration: 22s; }
  .logo-text { font-size: 1.1rem; }
}
</style>
