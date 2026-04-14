import Presentation from './components/Presentation'
import Slide from './components/Slide'

function App() {
  return (
    <Presentation>

      {/* ===== SLIDE 1 — Capa ===== */}
      <Slide>
        <h1>Taskly</h1>
        <p className="subtitle">Gestão de processos e rotinas operacionais via checklists inteligentes</p>
        <hr />
        <p className="small">Resumo Executivo — 2026</p>
      </Slide>

      {/* ===== SLIDE 2 — Missão ===== */}
      <Slide>
        <h2>Missão</h2>
        <div className="highlight-box">
          <p>
            Oferecer uma <strong>solução definitiva</strong> para a gestão de processos por meio de checklists,
            com foco em <strong>documentar, atribuir e auditar</strong> procedimentos — promovendo
            controle, transparência e eficiência em todos os níveis da organização.
          </p>
        </div>
        <div className="tag-group">
          <span className="tag">POP</span>
          <span className="tag">BPM</span>
          <span className="tag">PDCA</span>
          <span className="tag">Lean</span>
          <span className="tag">ISO 9001</span>
        </div>
      </Slide>

      {/* ===== SLIDE 3 — O Problema ===== */}
      <Slide>
        <h2>O Problema</h2>
        <p>A maioria das empresas no Brasil enfrenta dificuldades para:</p>
        <ul>
          <li>Garantir a execução correta de processos padronizados</li>
          <li>Acompanhar e comprovar a realização de tarefas operacionais</li>
          <li>Identificar falhas ou desvios em tempo hábil</li>
          <li>Ter controle sobre registros e evidências (fotos, local, horário)</li>
          <li>Implementar soluções simples sem alta dependência técnica</li>
        </ul>
      </Slide>

      {/* ===== SLIDE 4 — Soluções existentes ===== */}
      <Slide>
        <h2>E as soluções existentes?</h2>
        <div className="columns">
          <div>
            <h3>❌ Limitações</h3>
            <ul>
              <li>Focam apenas em cargos de gestão</li>
              <li>Exigem integração com sistemas legados</li>
              <li>São caras, engessadas ou complexas</li>
            </ul>
          </div>
          <div>
            <h3>✅ Taskly</h3>
            <ul>
              <li>Do operacional ao estratégico</li>
              <li>Funciona de forma independente</li>
              <li>Baixo custo e alta flexibilidade</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== SLIDE 5 — A Solução ===== */}
      <Slide>
        <h2>A Solução</h2>
        <p>
          Plataforma <strong>mobile-first</strong> com sincronização
          <strong> online e offline automática</strong>
        </p>
        <ul>
          <li>Criação, atribuição, execução e auditoria de rotinas via checklists</li>
          <li>Registro de fotos, horários, localizações e observações</li>
          <li>Histórico completo e rastreável por data, local e colaborador</li>
          <li>Periodicidade personalizada — diária, semanal, mensal ou datas específicas</li>
          <li>Versão web para gestores desde a V1</li>
        </ul>
      </Slide>

      {/* ===== SLIDE 6 — Stack Técnica ===== */}
      <Slide>
        <h2>Stack Técnica</h2>
        <div className="columns">
          <div>
            <h3>🖥 Web</h3>
            <ul>
              <li>React — Dashboard administrativo</li>
              <li>Landing page comercial</li>
            </ul>
          </div>
          <div>
            <h3>⚙️ Backend</h3>
            <ul>
              <li>Go + Chi — API HTTP</li>
              <li>PostgreSQL — Banco principal</li>
              <li>Migrations versionadas</li>
            </ul>
          </div>
          <div>
            <h3>📱 App</h3>
            <ul>
              <li>React Native + Expo</li>
              <li>Offline-first nativo</li>
              <li>Android + iOS</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== SLIDE 7 — Fluxo do Produto ===== */}
      <Slide>
        <h2>Fluxo Principal</h2>
        <ol>
          <li>Gestor cria ou ajusta tasklists e rotinas no painel web</li>
          <li>Backend persiste e distribui configurações</li>
          <li>App nativo consome tarefas designadas</li>
          <li>Colaborador executa checklist, anexa evidências e envia status</li>
          <li>Backend consolida progresso e devolve visibilidade ao dashboard</li>
        </ol>
      </Slide>

      {/* ===== SLIDE 8 — Diferenciais ===== */}
      <Slide>
        <h2>Diferenciais</h2>
        <ul>
          <li>Foco completo na execução de processos operacionais</li>
          <li>Alta modularidade e flexibilidade</li>
          <li>Funcional sem treinamento formal — tutoriais gratuitos no YouTube</li>
          <li>Interface intuitiva e personalizável</li>
          <li>Integração com câmera e GPS de forma leve e direta</li>
          <li>Funciona com ou sem internet — envio automático posterior</li>
          <li>Web + Mobile desde a V1</li>
        </ul>
      </Slide>

      {/* ===== SLIDE 9 — Público-Alvo ===== */}
      <Slide>
        <h2>Público-Alvo</h2>
        <p>Ideal para empresas de <strong>todos os portes</strong> nos setores:</p>
        <div className="tag-group">
          <span className="tag">Indústria</span>
          <span className="tag">Construção Civil</span>
          <span className="tag">Alimentício</span>
          <span className="tag">Logística</span>
          <span className="tag">Saúde</span>
          <span className="tag">Franquias</span>
          <span className="tag">Varejo</span>
          <span className="tag">Terceiro Setor</span>
        </div>
        <div className="highlight-box">
          <p>
            Compatível com <strong>POP, BPM, Lean, PDCA e ISO 9001</strong>.
            Expansão planejada para <strong>toda a América</strong>.
          </p>
        </div>
      </Slide>

      {/* ===== SLIDE 10 — Concorrência ===== */}
      <Slide>
        <h2>Concorrência</h2>
        <div className="competitor-cards">
          <div className="competitor-card">
            <h3>🔸 CheckBits</h3>
            <ul>
              <li>Forte presença institucional</li>
              <li>Curva de aprendizado alta</li>
              <li>Menos flexível para personalizações</li>
            </ul>
          </div>
          <div className="competitor-card">
            <h3>🔸 Checklist Fácil</h3>
            <ul>
              <li>Muito usado em franquias</li>
              <li>Interface densa, valores altos</li>
              <li>Requer consultoria para implantação</li>
            </ul>
          </div>
          <div className="competitor-card" style={{ borderColor: '#58a6ff' }}>
            <h3>🟢 Taskly</h3>
            <ul>
              <li>Modular e acessível</li>
              <li>Baixo custo, alta flexibilidade</li>
              <li>Web + Mobile, online e offline</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== SLIDE 11 — Modelo de Negócio ===== */}
      <Slide>
        <h2>Modelo de Negócio</h2>
        <p>SaaS com cobrança por <strong>usuário ativo</strong></p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Padrão</h3>
            <div className="price">R$ 10<span>/mês</span></div>
            <ul>
              <li>Acesso completo às rotinas</li>
              <li>Checklists ilimitados</li>
              <li>Dashboard web</li>
            </ul>
          </div>
          <div className="pricing-card featured">
            <h3>Plus</h3>
            <div className="price">R$ 12<span>/mês</span></div>
            <ul>
              <li>Tudo do Padrão</li>
              <li>Envio de imagens</li>
              <li>Geolocalização</li>
              <li>Recursos extras</li>
            </ul>
          </div>
        </div>
        <p className="small">Cobrança mensal ou anual com desconto • Receita recorrente e escalável</p>
      </Slide>

      {/* ===== SLIDE 12 — Validação ===== */}
      <Slide>
        <h2>Validação Estratégica</h2>
        <div className="highlight-box">
          <p>
            O fundador mantém <strong>relações comerciais diretas</strong> com empresas líderes
            no <strong>Ceará e Rio Grande do Norte</strong>, além de conexões com
            federações comerciais e industriais.
          </p>
        </div>
        <ul>
          <li>Empresas validadoras reais nas fases finais de implantação</li>
          <li>Forte presença online e investimento em tráfego pago</li>
          <li>Canal YouTube: <em>Taskly Empresarial</em> — tutoriais gratuitos</li>
        </ul>
      </Slide>

      {/* ===== SLIDE 13 — Investimento ===== */}
      <Slide>
        <h2>Investimento</h2>
        <div className="columns">
          <div>
            <h3>🔷 Fase Inicial</h3>
            <ul>
              <li>R$ 10 mil por 1% de participação</li>
              <li>Limite de até 50% para fase inicial</li>
              <li>Royalties a partir do 8º mês pós-V1</li>
            </ul>
          </div>
          <div>
            <h3>🔷 Fase 2</h3>
            <ul>
              <li>Até 15% adicionais após 1º ano da V1</li>
              <li>Aprovação pelo Board Executivo</li>
              <li>Foco em expansão orgânica</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* ===== SLIDE 14 — Uso do Investimento ===== */}
      <Slide>
        <h2>Uso do Investimento</h2>
        <ul>
          <li>Adição de até 6 colaboradores à equipe</li>
          <li>Finalização e testes do MVP</li>
          <li>Lançamento da V1 — Android, iOS e Web</li>
          <li>Infraestrutura backend escalável</li>
          <li>Marketing estratégico e parcerias institucionais</li>
          <li>Materiais audiovisuais e treinamentos</li>
          <li>Suporte jurídico e contábil</li>
        </ul>
      </Slide>

      {/* ===== SLIDE 15 — Objetivos ===== */}
      <Slide>
        <h2>Objetivos</h2>
        <ol>
          <li>Lançar a V1 em até <strong>4 meses e 29 dias</strong> após captação</li>
          <li>Alcançar lucratividade <strong>crescente e previsível</strong></li>
          <li>Criar rede de <strong>parcerias estratégicas</strong> com empresas validadoras</li>
          <li>Consolidar <strong>presença nacional</strong></li>
          <li>Iniciar planejamento de <strong>expansão para toda a América</strong></li>
          <li>Ser a <strong>referência em gestão de processos</strong> via checklists</li>
        </ol>
      </Slide>

      {/* ===== SLIDE 16 — Encerramento ===== */}
      <Slide>
        <h1>Taskly</h1>
        <p className="subtitle">
          A solução definitiva para gestão de processos e rotinas operacionais
        </p>
        <hr />
        <p>Obrigado.</p>
        <p className="small">Perguntas? Vamos conversar.</p>
      </Slide>

    </Presentation>
  )
}

export default App
