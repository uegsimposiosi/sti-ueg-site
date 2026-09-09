/* Configuração do Tailwind (CDN Play) — tema, cores e sombras do site.
   Precisa ser carregado logo após o script do Tailwind e antes do <body>. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        /* Tokens alinhados com CSS vars do Design System v2 (styles.css :root) */
        'ueg-blue':   '#6d28d9',  /* violeta médio — nós de rede do banner       */
        'ueg-purple': '#a78bfa',  /* violeta suave — textos secundários           */
        'ueg-gold':   '#F26522',  /* laranja exato do circuito/chip do banner     */
        'dark-bg':    '#100828',  /* roxo-preto profundo                          */
        'dark-card':  '#1a0e38'   /* roxo escuro para superfícies                 */
      },
      boxShadow: {
        glow:       '0 0 0 1px rgba(242, 101, 34, 0.10), 0 8px 28px rgba(0, 0, 0, 0.40)',
        'glow-md':  '0 4px 18px rgba(242, 101, 34, 0.28)'
      }
    }
  }
}
