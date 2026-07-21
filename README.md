# Site Meu Perfil

Site de perfil/portfólio pessoal de **Abner Salatiel de Oliveira**, estudante de Sistemas para Internet (SI). Construído do zero com HTML, CSS e JavaScript puros, com um visual futurista e totalmente responsivo (desktop, tablet e smartphone).

🔗 **Acesse o site publicado:** https://frostbr00.github.io/site_meu_perfil/

## Conteúdo do site

- **Hero** com efeito glitch no título e chamada para ação
- **Sobre**: nome, data de nascimento, país, curso e uma **biografia completa** (formação, objetivo profissional e hobbies), com link destacado para o perfil da Steam
- **Hobbies**: jogar videogame, academia, andar de carro
- **Interesses**: SUVs, rally, jogos de FPS, programação
- **Galeria** de fotos responsiva com lightbox (clique para ampliar)
- **Vídeos**: dois clipes (WRC Generations e CS2) com player HTML5 nativo, controles e adaptação automática de tamanho
- **Contato**: botões para Instagram e Steam, ambos abrindo em nova guia

## Correções e melhorias (última atualização)

- **Vídeos corrigidos para reprodução em todos os navegadores modernos.** Os arquivos originais foram recodificados
  com `yuvj420p` (faixa de cor *full range*), um formato que o Safari/iOS costuma recusar a decodificar, e o clipe do
  CS2 carregava uma trilha extra de timecode (`tmcd`) herdada do `.mov` original, o que podia confundir alguns
  decodificadores. Ambos os vídeos foram recomprimidos com `yuv420p` em faixa de cor limitada (*tv range*, padrão
  para vídeo web), sem faixas de dados extras, mantendo controles nativos e responsividade total.
- **Biografia adicionada** na seção "Sobre", com o link do perfil da Steam em destaque (botão com ícone), além de
  um segundo botão de Steam na seção de contato ao lado do Instagram.
- Verificação de imagens, vídeos e links (âncoras internas e externos) sem 404 ou recursos quebrados.
- **Vídeos renomeados para `wrc-rally-v3.mp4` e `cs2-fps-v3.mp4`.** O GitHub Pages (CDN Fastly) anuncia suporte a
  `Range` requests mas nem sempre os respeita (retorna o arquivo inteiro com `200` em vez de `206 Partial Content`),
  e navegadores que já tinham armazenado em cache o arquivo antigo quebrado sob a mesma URL podiam continuar
  reproduzindo bytes antigos ou corrompidos mesmo após a correção do codec. Trocar o nome do arquivo força todo
  visitante a baixar a versão corrigida do zero. **Sempre que o conteúdo de um vídeo for atualizado no futuro, use
  um novo nome de arquivo** (ex.: `-v4`) em vez de sobrescrever o mesmo caminho, para evitar esse problema de cache.
- **Importante sobre o pipeline de vídeo:** o site nunca usa diretamente os arquivos brutos de captura. Vídeos de
  jogo costumam sair em **HEVC/H.265** (não suportado nativamente pela maioria dos navegadores) ou em contêineres
  como **MKV/MOV** (o `<video>` do HTML5 não reproduz `.mkv` em nenhum navegador principal, independente do codec
  interno). Por isso todo vídeo publicado passa por uma recompressão para **H.264 + AAC dentro de um `.mp4`**,
  com `pix_fmt yuv420p` em faixa de cor limitada (*tv range*) e sem faixas de dados extras — o único formato com
  suporte garantido em Chrome, Firefox, Edge e Safari/iOS. Renomear ou converter os arquivos originais na pasta de
  origem não altera o site publicado; é sempre necessário recomprimir e reenviar os arquivos em `assets/video/`.
- **Vídeos servidos via jsDelivr, não direto pelo GitHub Pages.** Mesmo com o codec correto, o CDN do GitHub Pages
  (Fastly) anuncia suporte a `Range` requests mas nem sempre os honra (responde `200` com o arquivo inteiro em vez
  de `206 Partial Content`). Isso é tolerado pelo Chrome, mas faz o **Firefox** (e outros navegadores mais estritos)
  ficar girando o carregamento pra sempre, porque o player espera respostas parciais reais para controlar o buffer.
  A solução foi apontar as tags `<source>` dos vídeos para o **jsDelivr** (`cdn.jsdelivr.net/gh/...`), uma CDN
  gratuita que espelha qualquer repositório público do GitHub e responde corretamente a `Range` requests
  (`206 Partial Content` confirmado). Os arquivos continuam vivendo em `assets/video/` no repositório — é de lá que
  o jsDelivr busca o conteúdo —, mas o HTML referencia a URL do CDN em vez do caminho relativo. O jsDelivr tem um
  limite de 20 MB por arquivo, por isso o vídeo do WRC foi comprimido um pouco mais (`wrc-rally-v4.mp4`, ~14,5 MB)
  para caber no limite.
- **Vídeos recodificados em H.264 perfil Baseline (`wrc-rally-v5.mp4` / `cs2-fps-v4.mp4`).** Mesmo com CDN e cache
  corretos, um usuário relatou que o vídeo carregava dados (confirmado pela aba Rede do Firefox, com respostas
  `206 Partial Content` reais) mas nunca desenhava um quadro — tela preta ou apenas a imagem estática do poster,
  sem avançar. Isso é o padrão de uma **falha de decodificação por hardware** no navegador (GPU/driver específico),
  não um problema de rede ou de servidor. O perfil "High" usado antes tem recursos (B-frames, CABAC, transformada
  8x8) que alguns decodificadores por hardware lidam mal; o perfil **Baseline** (`profile:v baseline`, sem B-frames,
  sem CABAC) é o mais simples e universalmente suportado do H.264, usado historicamente até em celulares antigos.
  Isso reduz um pouco a eficiência de compressão (arquivos maiores para a mesma qualidade), mas elimina praticamente
  qualquer risco de incompatibilidade de decodificador.

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
        ├── wrc-rally-v5.mp4  # Clipe jogando WRC Generations (H.264 Baseline, servido via jsDelivr)
        └── cs2-fps-v4.mp4    # Clipe jogando CS2 (H.264 Baseline, servido via jsDelivr)
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
