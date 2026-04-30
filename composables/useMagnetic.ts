/**
 * Composable: useMagnetic
 * Applica un effetto hover "magnetico" agli elementi forniti.
 */
export const useMagnetic = () => {
  const apply = (selector = '.btn, .price-cta, .quality-seal') => {
    if (typeof window === 'undefined') return

    document.querySelectorAll<HTMLElement>(selector).forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect()
        const x = e.clientX - r.left - r.width / 2
        const y = e.clientY - r.top - r.height / 2
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`
      }
      const onLeave = () => {
        btn.style.transform = ''
      }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseleave', onLeave)
    })
  }

  return { apply }
}
