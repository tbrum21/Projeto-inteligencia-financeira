import { ArrowUpRight, Bell, ChevronDown, CircleHelp, FileUp, Gauge, LayoutDashboard, LineChart, ListFilter, Plus, Search, Settings, Sparkles, WalletCards } from "lucide-react";

const navigation = [
  { label: "Visão geral", icon: LayoutDashboard, active: true },
  { label: "Carteira", icon: WalletCards },
  { label: "Operações", icon: LineChart },
  { label: "Radar", icon: Sparkles },
];

function Metric({ label, detail }: { label: string; detail: string }) {
  return <article className="metric"><p>{label}</p><strong>—</strong><span>{detail}</span></article>;
}

export default function DashboardPage() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/dashboard">orbe<span>.</span></a>
        <nav><p className="nav-label">CARTEIRA</p>{navigation.map(({ label, icon: Icon, active }) => <a href="#" key={label} className={`nav-item ${active ? "nav-active" : ""}`}><Icon size={17} />{label}</a>)}<p className="nav-label nav-spaced">ORGANIZAÇÃO</p><a href="#" className="nav-item"><ListFilter size={17} />Watchlist</a><a href="#" className="nav-item"><Bell size={17} />Alertas</a></nav>
        <div className="sidebar-bottom"><a href="#" className="nav-item"><Settings size={17} />Configurações</a><a href="#" className="account"><span>TS</span><div><b>Thayrony</b><small>Perfil pessoal</small></div><ChevronDown size={14} /></a></div>
      </aside>
      <section className="workspace">
        <header className="topbar"><div className="crumb"><span>Carteira</span><i>/</i><b>Visão geral</b></div><div className="topbar-actions"><button className="icon-button" aria-label="Buscar"><Search size={18} /></button><button className="icon-button" aria-label="Ajuda"><CircleHelp size={18} /></button></div></header>
        <div className="content">
          <section className="welcome-row"><div><p className="eyebrow">TERÇA-FEIRA, 27 DE OUTUBRO</p><h1>Bom dia, Thayrony.</h1><p className="subtitle">Uma visão calma da sua vida financeira.</p></div><a href="#importar" className="primary-action"><FileUp size={17} />Importar extrato</a></section>
          <section className="hero-card"><div className="hero-copy"><p className="eyebrow">PATRIMÔNIO CONSOLIDADO</p><div className="hero-value">R$ <span>—</span></div><p className="muted">Conecte sua fonte de dados para ver o patrimônio.</p></div><div className="hero-visual"><div className="graph-line" /><div className="graph-fade" /><span>Histórico indisponível</span></div></section>
          <section className="metrics-grid"><Metric label="Valor investido" detail="Custo de aquisição" /><Metric label="Resultado total" detail="Realizado + não realizado" /><Metric label="Proventos" detail="Desde o início" /><Metric label="Rentabilidade" detail="TWR / XIRR quando disponível" /></section>
          <section className="two-column"><article className="panel"><div className="panel-heading"><div><p className="eyebrow">ALOCAÇÃO</p><h2>Composição da carteira</h2></div><button className="quiet-button">Por classe <ChevronDown size={14} /></button></div><div className="allocation-empty"><div className="empty-ring"><span>—</span></div><div><b>Nenhuma posição conciliada</b><p>A distribuição aparecerá após a confirmação das operações importadas.</p></div></div></article><article className="panel"><div className="panel-heading"><div><p className="eyebrow">INTELIGÊNCIA</p><h2>Radar de acompanhamento</h2></div><Gauge size={19} className="panel-icon" /></div><div className="insight-empty"><Sparkles size={20} /><b>O radar começa com sua carteira</b><p>Após identificar os ativos, o Orbe reúne fatos relevantes e sinaliza o que merece investigação.</p><a href="#importar">Preparar radar <ArrowUpRight size={14} /></a></div></article></section>
          <section id="importar" className="import-callout"><div className="import-symbol"><Plus size={20} /></div><div><b>Comece pela sua nota de corretagem</b><p>Envie um PDF ou planilha da XP. Você revisa cada operação antes de qualquer registro na carteira.</p></div><button className="secondary-action">Selecionar arquivo</button></section>
        </div>
      </section>
    </main>
  );
}
