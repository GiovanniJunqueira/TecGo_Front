import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing, borders } from '../designSystem';

// --- DEFINIÇÃO DE TIPOS E INTERFACES (sem alterações) ---
interface Unidade {
  id: number;
  nome: string;
}
interface Jogador {
  id: number;
  nome: string;
}
interface EventoPartida {
  tipo: 'Gol' | 'Cartão Amarelo' | 'Cartão Vermelho';
  minuto: number;
  jogador: Jogador;
}
interface Partida {
  id: number;
  data: string;
  unidadeId: number;
  categoria: 'sub11' | 'sub13' | 'sub15';
  tipo: 'Campeonato' | 'Amistoso';
  adversario: string;
  local: 'Casa' | 'Fora';
  golsPro: number;
  golsContra: number;
  escalacao: Jogador[];
  eventos: EventoPartida[];
}
interface Filtros {
  unidadeId: number | 'todas';
  tipo: 'todos' | 'Campeonato' | 'Amistoso';
  categoria: 'todas' | 'sub11' | 'sub13' | 'sub15';
  busca: string;
}
interface Estatisticas {
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  saldoGols: number;
}

// --- MOCKS E FUNÇÕES DE API (sem alterações) ---
const mockUnidades: Unidade[] = [{ id: 1, nome: "Unidade Centro" }, { id: 2, nome: "Unidade Zona Sul" }];
const mockJogadores: Jogador[] = [
    { id: 101, nome: "Lucas Silva" }, { id: 102, nome: "Pedro Alves" },
    { id: 201, nome: "Rafael Gomes" }, { id: 202, nome: "Vinicius Melo" },
    { id: 301, nome: "Victor Hugo" }, { id: 302, nome: "Renan Castro" },
];
const mockPartidas: Partida[] = [
  { id: 1, data: "10/05/2025", unidadeId: 1, categoria: 'sub15', tipo: 'Campeonato', adversario: 'EC Esperança', local: 'Casa', golsPro: 3, golsContra: 1, escalacao: [mockJogadores[4], mockJogadores[5]], eventos: [ { tipo: 'Gol', minuto: 22, jogador: mockJogadores[4] }, { tipo: 'Gol', minuto: 45, jogador: mockJogadores[5] }, { tipo: 'Gol', minuto: 78, jogador: mockJogadores[4] }, ] },
  { id: 2, data: "12/05/2025", unidadeId: 2, categoria: 'sub13', tipo: 'Amistoso', adversario: 'Unidos da Vila', local: 'Fora', golsPro: 2, golsContra: 2, escalacao: [mockJogadores[2], mockJogadores[3]], eventos: [ { tipo: 'Gol', minuto: 15, jogador: mockJogadores[2] }, { tipo: 'Gol', minuto: 60, jogador: mockJogadores[2] }, ] },
  { id: 3, data: "18/05/2025", unidadeId: 1, categoria: 'sub15', tipo: 'Campeonato', adversario: 'Rio Claro FC', local: 'Fora', golsPro: 0, golsContra: 1, escalacao: [mockJogadores[4], mockJogadores[5]], eventos: [] },
];
const fetchPartidas = async (filtros: Filtros, pagina: number, itensPorPagina: number): Promise<{ partidas: Partida[], total: number }> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  const partidasFiltradas = mockPartidas.filter(p => {
    const passaUnidade = filtros.unidadeId === 'todas' || p.unidadeId === filtros.unidadeId;
    const passaTipo = filtros.tipo === 'todos' || p.tipo === filtros.tipo;
    const passaCategoria = filtros.categoria === 'todas' || p.categoria === filtros.categoria;
    const passaBusca = !filtros.busca || p.adversario.toLowerCase().includes(filtros.busca.toLowerCase());
    return passaUnidade && passaTipo && passaCategoria && passaBusca;
  });
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  return { partidas: partidasFiltradas.slice(inicio, fim), total: partidasFiltradas.length };
};

// --- COMPONENTE PRINCIPAL ---
const HistoricoPartidas: React.FC = () => {
  const { colors } = useTheme(); 
  
  // O estado de tema local foi REMOVIDO
  const [filtros, setFiltros] = useState<Filtros>({ unidadeId: 'todas', tipo: 'todos', categoria: 'todas', busca: '' });
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(1);
  const [totalPartidas, setTotalPartidas] = useState<number>(0);
  const [partidaSelecionada, setPartidaSelecionada] = useState<Partida | null>(null);

  const ITENS_POR_PAGINA = 5;

  useEffect(() => {
    const carregarPartidas = async () => {
      setIsLoading(true);
      const { partidas, total } = await fetchPartidas(filtros, pagina, ITENS_POR_PAGINA);
      setPartidas(partidas);
      setTotalPartidas(total);
      setIsLoading(false);
    };
    carregarPartidas();
  }, [filtros, pagina]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({ ...prev, [name]: name === 'unidadeId' && value !== 'todas' ? Number(value) : value }));
    setPagina(1);
  };

  const estatisticas = useMemo((): Estatisticas => {
    const partidasFiltradas = mockPartidas.filter(p => {
        const passaUnidade = filtros.unidadeId === 'todas' || p.unidadeId === filtros.unidadeId;
        const passaTipo = filtros.tipo === 'todos' || p.tipo === filtros.tipo;
        const passaCategoria = filtros.categoria === 'todas' || p.categoria === filtros.categoria;
        const passaBusca = !filtros.busca || p.adversario.toLowerCase().includes(filtros.busca.toLowerCase());
        return passaUnidade && passaTipo && passaCategoria && passaBusca;
    });
    return partidasFiltradas.reduce((acc, p) => {
        acc.jogos += 1;
        acc.golsPro += p.golsPro;
        acc.golsContra += p.golsContra;
        if (p.golsPro > p.golsContra) acc.vitorias += 1;
        else if (p.golsPro < p.golsContra) acc.derrotas += 1;
        else acc.empates += 1;
        acc.saldoGols = acc.golsPro - acc.golsContra;
        return acc;
    }, { jogos: 0, vitorias: 0, empates: 0, derrotas: 0, golsPro: 0, golsContra: 0, saldoGols: 0 });
  }, [filtros]);

  const getResultadoStyle = (p: Partida): React.CSSProperties => {
    if (p.golsPro > p.golsContra) return { borderLeft: `5px solid ${colors.success}` };
    if (p.golsPro < p.golsContra) return { borderLeft: `5px solid ${colors.error}` };
    return { borderLeft: `5px solid ${colors.textLight}` };
  };

  const baseInputStyle: React.CSSProperties = {
    padding: spacing.sm,
    border: `1px solid ${colors.alternateRow}`,
    borderRadius: borders.radius,
    fontSize: fontSizes.base,
    backgroundColor: colors.white,
    color: colors.textDark,
  };

  return (
    // O JSX agora retorna um Fragment <> com apenas o conteúdo da página
    <>
      <h2 style={{ fontSize: fontSizes.title, color: colors.textDark, marginBottom: spacing.lg, marginTop: 0 }}>Histórico de Partidas</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: spacing.md, marginBottom: spacing.xl }}>
          <StatCard label="Jogos" value={estatisticas.jogos} colors={colors} />
          <StatCard label="Vitórias" value={estatisticas.vitorias} colors={colors} />
          <StatCard label="Empates" value={estatisticas.empates} colors={colors} />
          <StatCard label="Derrotas" value={estatisticas.derrotas} colors={colors} />
          <StatCard label="Gols Pró" value={estatisticas.golsPro} colors={colors} />
          <StatCard label="Gols Contra" value={estatisticas.golsContra} colors={colors} />
          <StatCard label="Saldo" value={estatisticas.saldoGols} colors={colors} />
      </div>

      <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.lg, flexWrap: 'wrap', alignItems: 'center' }}>
          <select name="unidadeId" onChange={handleFilterChange} style={baseInputStyle}>
              <option value="todas">Todas Unidades</option>
              {mockUnidades.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
          </select>
          <select name="tipo" onChange={handleFilterChange} style={baseInputStyle}>
              <option value="todos">Todos Tipos</option>
              <option value="Campeonato">Campeonato</option>
              <option value="Amistoso">Amistoso</option>
          </select>
          <select name="categoria" onChange={handleFilterChange} style={baseInputStyle}>
              <option value="todas">Todas Categorias</option>
              <option value="sub11">Sub-11</option>
              <option value="sub13">Sub-13</option>
              <option value="sub15">Sub-15</option>
          </select>
          <input type="text" name="busca" placeholder="Buscar por adversário..." onChange={handleFilterChange} style={{ ...baseInputStyle, flex: 1, minWidth: '200px' }} />
      </div>

      {isLoading ? <p style={{color: colors.textDark}}>Carregando...</p> : (
          partidas.length > 0 ? partidas.map(p => (
              <div key={p.id} onClick={() => setPartidaSelecionada(p)} style={{ backgroundColor: colors.white, marginBottom: spacing.md, padding: spacing.md, borderRadius: borders.radius, cursor: 'pointer', ...getResultadoStyle(p) }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                          <strong style={{ fontSize: fontSizes.lg, color: colors.textDark }}>{p.adversario}</strong>
                          <span style={{ marginLeft: spacing.md, backgroundColor: colors.primaryLight, color: colors.white, padding: '2px 8px', borderRadius: '12px', fontSize: fontSizes.sm }}>{p.tipo}</span>
                      </div>
                      <strong style={{ fontSize: fontSizes.xl, color: colors.textDark }}>{p.golsPro} x {p.golsContra}</strong>
                  </div>
                  <p style={{ color: colors.textLight, marginTop: spacing.sm, marginBottom: 0 }}>{p.data} - {p.local}</p>
              </div>
          )) : <p style={{color: colors.textLight}}>Nenhuma partida encontrada com os filtros selecionados.</p>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: spacing.lg }}>
          <button style={{...baseInputStyle, cursor: 'pointer'}} disabled={pagina <= 1} onClick={() => setPagina(p => p - 1)}>Anterior</button>
          <span style={{ margin: `0 ${spacing.md}`, color: colors.textDark }}>Página {pagina}</span>
          <button style={{...baseInputStyle, cursor: 'pointer'}} disabled={pagina * ITENS_POR_PAGINA >= totalPartidas} onClick={() => setPagina(p => p + 1)}>Próxima</button>
      </div>
      
      {partidaSelecionada && <PartidaDetailsModal partida={partidaSelecionada} onClose={() => setPartidaSelecionada(null)} colors={colors} />}
    </>
  );
};

// --- COMPONENTES AUXILIARES ---
// Passando 'colors' como prop para que eles também sejam dinâmicos
const StatCard: React.FC<{ label: string; value: number | string, colors: any }> = ({ label, value, colors }) => (
    <div style={{ backgroundColor: colors.white, padding: spacing.md, borderRadius: borders.radius, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: fontSizes.xl, fontWeight: 'bold', color: colors.primary }}>{value}</div>
        <div style={{ fontSize: fontSizes.sm, color: colors.textLight }}>{label}</div>
    </div>
);

const PartidaDetailsModal: React.FC<{ partida: Partida, onClose: () => void, colors: any }> = ({ partida, onClose, colors }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
        <div style={{ backgroundColor: colors.white, width: '90%', maxWidth: '600px', padding: spacing.xl, borderRadius: borders.radius, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: spacing.md, right: spacing.md, background: 'none', border: 'none', fontSize: fontSizes.xl, cursor: 'pointer', color: colors.textDark }}>&times;</button>
            <h3 style={{ textAlign: 'center', fontSize: fontSizes.xl, color: colors.textDark, marginTop: 0 }}>Detalhes da Partida</h3>
            <div style={{ textAlign: 'center', margin: `${spacing.lg} 0`, color: colors.textDark }}>
                <span style={{ fontSize: fontSizes.lg }}>Nossa Escola</span>
                <span style={{ fontSize: fontSizes.xxl || '2.5rem', margin: `0 ${spacing.lg}`, fontWeight: 'bold' }}>{partida.golsPro} x {partida.golsContra}</span>
                <span style={{ fontSize: fontSizes.lg }}>{partida.adversario}</span>
            </div>
            <p style={{ textAlign: 'center', color: colors.textLight, marginBottom: spacing.lg, borderBottom: `1px solid ${colors.alternateRow}`, paddingBottom: spacing.lg }}>{partida.data} - {partida.local} - {partida.tipo} ({partida.categoria.toUpperCase()})</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg, color: colors.textDark }}>
                <div>
                    <strong>Gols:</strong>
                    {partida.eventos.filter(e => e.tipo === 'Gol').length > 0 ? (
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>{partida.eventos.filter(e => e.tipo === 'Gol').map((e, i) => <li key={i}>⚽ {e.jogador.nome} ({e.minuto}')</li>)}</ul>
                    ) : <p style={{color: colors.textLight}}>Nenhum</p>}
                </div>
                <div>
                    <strong>Escalação Inicial:</strong>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>{partida.escalacao.map(j => <li key={j.id}>👕 {j.nome}</li>)}</ul>
                </div>
            </div>
        </div>
    </div>
);

export default HistoricoPartidas;