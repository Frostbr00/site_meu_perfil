# Site Meu Perfil

Site de perfil/portfólio pessoal de **Abner Salatiel de Oliveira**, estudante de Sistemas para Internet (SI). Construído do zero com HTML, CSS e JavaScript puros, com um visual futurista e totalmente responsivo (desktop, tablet e smartphone).

🔗 **Acesse o site publicado:** https://frostbr00.github.io/site_meu_perfil/

## Conteúdo do site

- **Hero** com efeito glitch no título e chamada para ação
- **Sobre**: nome, data de nascimento, país e curso
- **Hobbies**: jogar videogame, academia, andar de carro
- **Interesses**: SUVs, rally, jogos de FPS, programação
- **Galeria** de fotos responsiva com lightbox (clique para ampliar)
- **Vídeos**: dois clipes (WRC Generations e CS2) com player HTML5 nativo, controles e adaptação automática de tamanho
- **Contato**: botão para o Instagram, abrindo em nova guia

## Tecnologias utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — layout construído inteiramente com **Flexbox**, variáveis CSS, animações (`@keyframes`) e media queries para responsividade
- **JavaScript puro (vanilla)** — menu mobile, lightbox da galeria e ano dinâmico no rodapé

Nenhum framework ou biblioteca externa foi utilizado (sem Bootstrap, Tailwind, React, Vue, jQuery, etc).

## Estrutura das pastas

```
site_meu_perfil/
├── index.html              # Página única do site
├── README.md
└── assets/
    ├── css/
    │   └── style.css       # Todo o estilo do site
    ├── js/
    │   └── main.js         # Interações (menu, lightbox, etc.)
    ├── img/
    │   ├── foto-perfil.jpg
    │   ├── foto-suv.jpg
    │   ├── foto-setup.jpg
    │   ├── foto-pc.jpg
    │   ├── poster-wrc.jpg  # Thumbnail do vídeo de rally
    │   └── poster-cs2.jpg  # Thumbnail do vídeo de FPS
    └── video/
        ├── wrc-rally.mp4   # Clipe jogando WRC Generations (comprimido para web)
        └── cs2-fps.mp4     # Clipe jogando CS2 (comprimido para web)
```

## Como executar localmente

Por ser um site 100% estático, basta abrir o `index.html` direto no navegador **ou** rodar um servidor local simples:

```bash
# usando Python
python -m http.server 8000

# ou usando a extensão Live Server do VS Code
```

Depois acesse `http://localhost:8000` no navegador.

## Publicação (GitHub Pages)

O site é publicado automaticamente a partir da branch `main` pelo GitHub Pages e fica disponível em:

👉 https://frostbr00.github.io/site_meu_perfil/
