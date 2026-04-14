# PowerPointer

Apresentações interativas feitas em React — com navegação por teclado, desenho sobre slides, temas visuais e **rotas de slides** (branching interativo).

## Funcionalidades

- **Navegação** — `← →`, `Espaço`, `Enter`, `Backspace`, `Home`, `End`
- **Desenho** — pressione `D` para ativar, `Z` para desfazer, `C` para limpar
- **Paleta de cores e espessura** na barra de controles
- **4 temas globais** — Midnight, Daylight, Ocean, Ember (troque com `N` / `M` ou pelo seletor)
- **Rotas de slides (branching)** — crie caminhos alternativos que dependem de uma escolha do público
- **Componentes de layout** — colunas, caixas de destaque, tags, cards de comparação, cards de preço
- **Animações** de transição entre slides
- **Conteúdo privado** — seu conteúdo é separado da engine e nunca é publicado
- **Exportar HTML** — gere um único arquivo `.html` autocontido para compartilhar sem servidor

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

### Rotas de slides (Branching)

O `BranchSlide` permite criar pontos de decisão que dividem a apresentação em caminhos completamente diferentes. A navegação é bloqueada até o público fazer uma escolha.

```jsx
import Slide from '../components/Slide'
import BranchSlide from '../components/BranchSlide'

export default [
  <Slide key="intro">
    <h1>Minha apresentação</h1>
  </Slide>,

  <BranchSlide
    key="decisao"
    question="Aceitar a proposta?"
    options={[
      { value: 'sim', icon: '✅', label: 'SIM', description: 'Vamos em frente' },
      { value: 'nao', icon: '❌', label: 'NÃO', description: 'Outra abordagem' },
    ]}
    branch={{
      sim: [
        <Slide key="sim-1"><h2>Ótimo! Próximos passos...</h2></Slide>,
        <Slide key="sim-2"><h2>Obrigado!</h2></Slide>,
      ],
      nao: [
        <Slide key="nao-1"><h2>Sem problemas, plano B...</h2></Slide>,
        <Slide key="nao-2"><h2>Obrigado!</h2></Slide>,
      ],
    }}
  />,
]
```

Cada caminho é uma lista independente de slides. Ao escolher uma opção, o restante da apresentação é substituído pelo caminho selecionado. O público pode voltar e mudar a escolha a qualquer momento.

### Atalhos de teclado

| Tecla | Ação |
|---|---|
| `← →` / `Espaço` / `Enter` | Navegar entre slides |
| `Home` / `End` | Ir ao início / fim |
| `D` | Ativar/desativar desenho |
| `Z` | Desfazer último traço |
| `C` | Limpar desenho do slide |
| `N` | Tema anterior |
| `M` | Próximo tema |

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

## Exportar como HTML

Gere um único arquivo `.html` autocontido com toda a apresentação embutida (JS, CSS, imagens). Pode ser aberto diretamente em qualquer navegador, sem servidor.

```bash
npm run export
```

O arquivo será gerado em `export/index.html`. Envie por email, pendrive, Google Drive — funciona em qualquer lugar.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run export` | Exportar HTML autocontido |
| `npm run preview` | Preview do build |

## Stack

- React 19
- Vite 8

## Licença

MIT
