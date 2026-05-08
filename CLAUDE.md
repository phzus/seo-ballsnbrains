# Balls & Brains — SEO Landing Page

## Docs vivos — regra principal

**Claude mantém `docs/` atualizada automaticamente conforme o projeto evolui. Pedro não precisa pedir.**

Quando atualizar:
- **Decisão técnica ou de design relevante** → criar ADR numerado em [docs/adr/](docs/adr/) seguindo o formato dos existentes.
- **Bloco de trabalho significativo concluído** → adicionar entrada datada `YYYY-MM-DD` no **topo** do log em [docs/PROGRESSO.md](docs/PROGRESSO.md).
- **Dúvida ou pendência sem resposta** → registrar em [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md).
- **Mudança no design (tokens, componentes, assets)** → atualizar [docs/DESIGN.md](docs/DESIGN.md).
- **Mudança no escopo ou componentes** → atualizar [docs/PROJETO.md](docs/PROJETO.md).

**Se Claude concluir um trabalho significativo e não atualizar docs/, é bug.**

---

## O que é este projeto

Landing page de vendas (SEO/advertorial) do produto **Balls & Brains** — Testosterone Mushroom Coffee. O código já existia com um design anterior; a tarefa atual é **implementar o redesign** criado pelo designer Lucas Tenório.

**Repo:** https://github.com/ogruposix/seo-ballsnbrains
**Branch de trabalho:** `seo-balls-and-brains-homepage-01-v2`
**CTA link:** `https://ballsnbrains.com/shp/tmc-adv/08/p2-v2/`
**Suporte:** `support@ballsnbrains.com`

## Stack

- React 19 + Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Single-page app sem roteamento
- Assets: webp (imagens), mp4 (vídeos), svg (logo)

## Comandos

```bash
npm install   # instalar dependências
npm run dev   # dev server (Vite)
npm run build # build de produção (vite build && node afterBuild)
```

## Design atual (pré-redesign)

| Token | Valor | Uso |
|-------|-------|-----|
| Background principal | `#070707` | Fundo da página |
| Background footer | `#0a0a0a` | Footer |
| Accent/Gold | `#dca331` | CTAs, ícones, destaque |
| Border escura | `#1a1a1a` | Divisores |
| Texto base | `white` + opacidade | `white/70`, `/65`, `/60`, `/55`, `/50`, `/25` |

Após receber o design do Lucas, tokens novos vão para [docs/DESIGN.md](docs/DESIGN.md).

## Estrutura de componentes

Componentes **montados** em `App.jsx` (ordem na página):
1. `Navbar`
2. `HeroSection`
3. `IngredientsSection`
4. `HowToMake`
5. `SocialProof`
6. `Comparison`
7. `Reviews`
8. `Guarantee`
9. `FAQ`
10. `Footer`

Componentes **existentes mas não montados** (podem entrar no redesign):
- `AlertBanner`
- `ArticleSection`
- `ProductSidebar`
- `StickyFooterCTA`

## Estado atual (atualizar a cada sessão significativa)

**Fase:** Implementação do redesign — pronto para começar componente a componente
**Último trabalho:** Setup completo de assets e ambiente (2026-05-05)

### Assets prontos em `src/assets/`
- `fonts/` — Satoshi (10x woff2: Black, Bold, Medium, Regular, Light + itálicas) + Helvetica Now Display (8x woff2)
- `icons/` — benefit-01~07, Star, check, check-compartive, x-compartive, play-button, vs-stamp, 100%-SATISFACTION-GUARANTEE-STAMP
- `images/` — Hero.webp, img-benefit-1/2.webp, img-results-day7/30/90.webp, img-ballsnbrains-comparative.webp, img-others-comparative.webp
- `ingredients/` — img-card-01~12.webp (nome do ingrediente + dose em cada card)
- `utils/` — footer-logo.svg, logo-font-black.svg, logo-font-light.svg, guarantee-stamp.webp
- `videos/` — video-05.mp4, video-06.mp4

### Fontes
- **Satoshi** — fonte primária (headings, destaques). OTFs em `Satoshi Font/` na raiz, woff2 em `src/assets/fonts/`
- **Helvetica Now Display** — fonte secundária (body, UI)
- ⚠️ NOME CORRETO É **SATOSHI** (não "Satori" — erro de sessões anteriores)

### Figma
- Arquivo: `LY1nxYcDBeomP0jGv66tmG`, node principal `1-10`
- Token em `~/.claude/mcp.json` (pode expirar — se der 403, pedir novo token ao Pedro)
- MCP configurado via stdio (`@figma/figma-developer-mcp`), disponível no CLI mas não no VSCode extension
- Acesso alternativo: API REST com o token via curl

### AlertBanner
- Texto fixo (não muda): confirmar copy exato via Figma na implementação
- Será montado em `App.jsx` acima do `Navbar`

## Regras de desenvolvimento

- Tailwind utility classes — sem CSS custom a menos que necessário
- Imagens: usar assets existentes em `src/assets/` ou solicitar novos ao Lucas
- Responsivo: mobile-first (375px → 768px → 1440px)
- Sem comentários óbvios no código
- Não alterar o link de CTA sem alinhamento explícito
- Sempre registrar decisões, fontes e erros corrigidos nas docs — informações críticas NÃO podem se perder entre sessões

## MCP Servers

### Figma MCP

- Configurado via `~/.claude/mcp.json` (stdio, `@figma/figma-developer-mcp`)
- Disponível no Claude Code CLI mas não na extensão VSCode (usar API REST como fallback)
- IMPORTANTE: Se o Figma MCP retornar uma URL localhost para imagem ou SVG, usar essa fonte diretamente
- IMPORTANTE: NÃO importar pacotes de ícones externos — todos os assets devem vir do payload do Figma
- IMPORTANTE: NÃO usar placeholders se uma fonte localhost for fornecida

## Stakeholders

| Pessoa | Papel |
|--------|-------|
| Pedro Moraes | Desenvolvedor |
| Lucas Tenório | Designer / responsável pelo projeto com o cliente |
