/* Configuração do Tailwind (CDN Play) — tema, cores e sombras do site.
   Precisa ser carregado logo após o script do Tailwind e antes do <body>. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        'ueg-blue': '#1D2362',
        'ueg-gold': '#FFFFFF',
        'dark-bg': '#292E63',
        'dark-card': '#121a2a'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.35)'
      }
    }
  }
}
