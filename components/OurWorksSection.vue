<script setup lang="ts">
interface Video {
  title: string
  url: string
  type: 'youtube' | 'instagram'
  id: string
}

const videos: Video[] = [
  {
    title: 'GBS Pills #2 — EY Italy',
    url: 'https://www.youtube.com/watch?v=jWGzpAft18w',
    type: 'youtube',
    id: 'jWGzpAft18w'
  },
  {
    title: 'Isopren — Video Istituzionale',
    url: 'https://www.youtube.com/watch?v=1d6OwXXh0uA',
    type: 'youtube',
    id: '1d6OwXXh0uA'
  },
  {
    title: 'Reel — denanisrl',
    url: 'https://www.instagram.com/p/DVtpVaYCXlP/',
    type: 'instagram',
    id: 'DVtpVaYCXlP'
  }
]
</script>

<template>
  <section class="our-works" id="lavori">
    <div class="container">
      <div class="section-head" data-reveal>
        <div class="eyebrow">Portfolio Denani</div>
        <h2>I nostri lavori.</h2>
        <p class="lead">
          Una selezione dei progetti video realizzati da <strong>DENANI S.R.L</strong> — dal video istituzionale ai contenuti social dinamici.
          La stessa metodologia produttiva applicata alle landing del Network ITS.
        </p>
      </div>

      <div class="videos-grid" data-reveal-stagger>
        <article v-for="video in videos" :key="video.id" class="video-card">
          <div v-if="video.type === 'youtube'" class="video-embed">
            <iframe
              :src="`https://www.youtube.com/embed/${video.id}`"
              :title="video.title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <a v-else :href="video.url" target="_blank" rel="noopener noreferrer" class="ig-preview">
            <div class="ig-play">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5.14v14l11-7-11-7z" fill="white"/>
              </svg>
            </div>
            <div class="ig-label">Guarda su Instagram</div>
          </a>

          <div class="video-info">
            <div class="platform-icon">
              <template v-if="video.type === 'youtube'">
                <svg class="yt-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
                </svg>
              </template>
              <template v-else>
                <svg class="ig-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="url(#ig-grad)"/>
                  <defs>
                    <linearGradient id="ig-grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stop-color="#f09433"/>
                      <stop offset="25%" stop-color="#e6683c"/>
                      <stop offset="50%" stop-color="#dc2743"/>
                      <stop offset="75%" stop-color="#cc2366"/>
                      <stop offset="100%" stop-color="#bc1888"/>
                    </linearGradient>
                  </defs>
                </svg>
              </template>
            </div>
            <div class="video-title">{{ video.title }}</div>
            <a :href="video.url" target="_blank" rel="noopener noreferrer" class="video-link">
              Clicca qui per guardare il video
              <span class="arrow">↗</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.our-works { background: var(--white); padding-bottom: 120px; }

.videos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1320px;
  margin: 0 auto;
}

.video-card {
  background: var(--white);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.5s var(--ease);
}
.video-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

.video-embed { position: relative; width: 100%; aspect-ratio: 16 / 9; background: var(--navy-deep); }
.video-embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

.ig-preview {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%);
  text-decoration: none;
  transition: opacity 0.3s;
}
.ig-preview:hover { opacity: 0.88; }
.ig-play {
  width: 56px; height: 56px;
  background: rgba(255,255,255,0.2);
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(8px);
}
.ig-play svg { width: 22px; height: 22px; margin-left: 3px; }
.ig-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.video-info { padding: 20px 24px; }
.platform-icon { margin-bottom: 8px; }
.yt-icon, .ig-icon { width: 20px; height: 20px; display: block; }

.video-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--navy-deep);
  margin-bottom: 10px;
}
.video-link {
  display: inline-flex;
  align-items: center; gap: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--navy-deep);
  text-decoration: none;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 100px;
  transition: all 0.3s var(--ease);
  letter-spacing: 0.02em;
}
.video-link:hover {
  background: var(--navy-deep);
  color: var(--white);
  border-color: var(--navy-deep);
  gap: 10px;
}
.video-link .arrow { font-size: 0.75rem; transition: transform 0.3s var(--ease); }
.video-link:hover .arrow { transform: translate(2px, -2px); }

@media (max-width: 980px) {
  .videos-grid { grid-template-columns: 1fr; max-width: 560px; }
}
@media (max-width: 600px) {
  .videos-grid { gap: 16px; }
}
</style>
