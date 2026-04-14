/**
 * ===================================================
 *  PowerPointer — Exemplo de slides
 * ===================================================
 *
 *  Este arquivo demonstra como criar seu conteúdo.
 *  Copie a pasta "content.example" como "content" e
 *  edite livremente — o diretório "content/" é privado
 *  e não será versionado pelo Git.
 *
 *    cp -r src/content.example src/content
 *
 *  Depois edite src/content/slides.jsx com seus slides.
 * ===================================================
 */

import Slide from '../components/Slide'

export default [
  <Slide key="intro">
    <h1>PowerPointer By <a href="https://jaodev.work" target="_blank" rel="noopener noreferrer">JãoDev</a></h1>
    <p>Uma apresentação interativa feita em React.</p>
    <p>Use <code>← →</code> ou <code>Espaço</code> para navegar.</p>
    <p>Pressione <code>D</code> para desenhar sobre os slides.</p>
  </Slide>,

  <Slide key="como-usar">
    <h2>Como usar</h2>
    <ol>
      <li>Copie <code>src/content.example</code> para <code>src/content</code></li>
      <li>Edite <code>src/content/slides.jsx</code> com seus slides</li>
      <li>O conteúdo de <code>src/content/</code> é privado (gitignored)</li>
    </ol>
    <div className="highlight-box">
      <p>Seu conteúdo <strong>nunca será publicado</strong> no repositório.</p>
    </div>
  </Slide>,

  <Slide key="componentes">
    <h2>Componentes disponíveis</h2>
    <div className="columns">
      <div>
        <h3>Layout</h3>
        <ul>
          <li><code>.columns</code> — colunas lado a lado</li>
          <li><code>.highlight-box</code> — caixa de destaque</li>
          <li><code>.tag-group</code> — grupo de tags</li>
        </ul>
      </div>
      <div>
        <h3>Cards</h3>
        <ul>
          <li><code>.competitor-cards</code></li>
          <li><code>.pricing-cards</code></li>
          <li><code>.featured</code> — destaque</li>
        </ul>
      </div>
    </div>
  </Slide>,

  <Slide key="temas">
    <h2>Temas</h2>
    <p>Use o seletor de temas na barra de controles:</p>
    <div className="tag-group">
      <span className="tag">🌙 Midnight</span>
      <span className="tag">☀️ Daylight</span>
      <span className="tag">🌊 Ocean</span>
      <span className="tag">🔥 Ember</span>
    </div>
    <p className="small">Cada tema altera cores, tipografia e estilos dos componentes.</p>
  </Slide>,

  <Slide key="fim">
    <h1>Boas apresentações!</h1>
    <p className="subtitle">Edite seus slides em <code>src/content/slides.jsx</code></p>
  </Slide>,
]
