/**
 * Composable: useReveal
 * Aggiunge un IntersectionObserver per animazioni scroll-triggered.
 * Aggiunge la classe `.in` agli elementi `[data-reveal]` o `[data-reveal-stagger]`.
 */
export const useReveal = () => {
  const init = () => {
    if (typeof window === 'undefined') return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    document.querySelectorAll('[data-reveal], [data-reveal-stagger]').forEach((el) => {
      if (el.hasAttribute('data-reveal-stagger')) el.classList.add('reveal-stagger')
      else el.classList.add('reveal')
      io.observe(el)
    })

    return () => io.disconnect()
  }

  return { init }
}
