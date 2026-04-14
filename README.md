# PowerPointer

Apresentações interativas feitas em React — com navegação por teclado, desenho sobre slides e temas visuais.

## Funcionalidades

- **Navegação** — `← →`, `Espaço`, `Enter`, `Backspace`, `Home`, `End`
- **Desenho** — pressione `D` para ativar, `Z` para desfazer, `C` para limpar
- **Paleta de cores e espessura** na barra de controles
- **4 temas globais** — Midnight, Daylight, Ocean, Ember
- **Componentes de layout** — colunas, caixas de destaque, tags, cards de comparação, cards de preço
- **Animações** de transição entre slides

## Início rápido

```bash
git clone git@github.com:jotavebvc/PowerPointer.git
cd PowerPointer
npm install
npm run dev
```

## Criando seus slides

O conteúdo dos slides é separado do código-fonte. Isso permite que você use o PowerPointer publicamente como engine e mantenha o conteúdo da sua apresentação privado.

```bash
cp -r src/content.example src/content
```

Edite `src/content/slides.jsx` com seus slides. A pasta `src/content/` está no `.gitignore` — **seu conteúdo nunca será publicado**.

Se `src/content/` não existir, o app carrega automaticamente os slides de exemplo de `src/content.example/`.

### Estrutura de um arquivo de slides

```jsx
import Slide from '../components/Slide'

export default [
  <Slide key="capa">
    <h1>Título</h1>
    <p>Subtítulo</p>
  </Slide>,

  <Slide key="slide-2">
    <h2>Segundo slide</h2>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </Slide>,
]
```

### Classes CSS disponíveis

| Classe | Uso |
|---|---|
| `.columns` | Colunas lado a lado |
| `.highlight-box` | Caixa de destaque |
| `.tag-group` + `.tag` | Grupo de tags |
| `.competitor-cards` + `.competitor-card` | Cards de comparação |
| `.pricing-cards` + `.pricing-card` | Cards de preços |
| `.featured` | Destaque em pricing card |
| `.subtitle` | Subtítulo estilizado |
| `.small` | Texto menor |
| `.big-number` | Número grande em destaque |

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

## Stack

- React 19
- Vite 8

## Licença

MIT
