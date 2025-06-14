import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext'; // Corrigido: Pega o tema do contexto
import { fontSizes, spacing, borders } from '../designSystem';
import campoDeFutebol from "../assets/campo-futebol.png"; // Verifique se o nome do arquivo é este mesmo

// --- Interfaces e Tipos (sem alterações) ---
interface Unidade {
  id: number;
  nome: string;
}
interface Jogo {
  id: number;
  data: string;
  hora: string;
  adversario: string;
}
interface Jogador {
  id: number;
  nome: string;
}
type Escalacao = {
  [posicao: string]: Jogador;
};
type Categoria = 'sub11' | 'sub13' | 'sub15';

// --- Mocks e Funções de API (sem alterações) ---
const mockUnidades: Unidade[] = [
  { id: 1, nome: "Unidade Centro" },
  { id: 2, nome: "Unidade Zona Sul" },
];
const mockJogosPorUnidade: { [unidadeId: number]: Jogo[] } = {
  1: [
    { id: 101, data: "15/07/2025", hora: "10:00", adversario: "EC Esperança" },
    { id: 102, data: "22/07/2025", hora: "14:30", adversario: "AA Ponte Firme" },
  ],
  2: [
    { id: 201, data: "29/07/2025", hora: "09:00", adversario: "Rio Claro FC" },
    { id: 202, data: "05/08/2025", hora: "11:00", adversario: "Unidos da Vila" },
  ],
};
const mockEscalacoes: { [jogoId: number]: { [cat in Categoria]?: Escalacao } } = {
  101: {
    sub11: { GK: { id: 101, nome: "Lucas Silva" }, DF: { id: 102, nome: "Pedro Alves" } },
    sub13: { GK: { id: 201, nome: "Rafael Gomes" }, ZAG1: { id: 202, nome: "Vinicius Melo" } },
    sub15: { GK: { id: 301, nome: "Victor Hugo" }, ZAG_E: { id: 302, nome: "Renan Castro" } },
  },
};
const fetchJogosPorUnidade = async (unidadeId: number): Promise<Jogo[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockJogosPorUnidade[unidadeId] || [];
};
const fetchEscalacao = async (jogoId: number, categoria: Categoria): Promise<Escalacao> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockEscalacoes[jogoId]?.[categoria] || {};
};

// --- COMPONENTE ---
const PaginaEscalacao: React.FC = () => {
  // A página pega as cores do tema global
  const { colors } = useTheme(); 

  // O estado local 'theme' foi REMOVIDO.
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedJogo, setSelectedJogo] = useState<Jogo | null>(null);
  const [showCategoriaModal, setShowCategoriaModal] = useState<boolean>(false);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [showEscalacaoModal, setShowEscalacaoModal] = useState<boolean>(false);
  const [escalacao, setEscalacao] = useState<Escalacao | null>(null);

  // Funções de handle (sem alterações na lógica)
  const handleUnitSelect = async (unidadeId: number): Promise<void> => {
    setSelectedUnit(unidadeId);
    setJogos([]);
    setIsLoading(true);
    const jogosDaUnidade = await fetchJogosPorUnidade(unidadeId);
    setJogos(jogosDaUnidade);
    setIsLoading(false);
  };
  const handleJogoClick = (jogo: Jogo): void => {
    setSelectedJogo(jogo);
    setShowCategoriaModal(true);
  };
  const handleCategoriaSelect = async (categoria: Categoria): Promise<void> => {
    if (!selectedJogo) return;
    setSelectedCategoria(categoria);
    setShowCategoriaModal(false);
    setIsLoading(true);
    const escalacaoDoJogo = await fetchEscalacao(selectedJogo.id, categoria);
    setEscalacao(escalacaoDoJogo);
    setShowEscalacaoModal(true);
    setIsLoading(false);
  };
  const closeModal = (): void => {
    setShowCategoriaModal(false);
    setShowEscalacaoModal(false);
    setSelectedJogo(null);
    setSelectedCategoria(null);
    setEscalacao(null);
  };

  // O JSX de retorno agora é APENAS o conteúdo da página
  return (
    <>
      <h2 style={{ fontSize: fontSizes.title, color: colors.textDark, marginBottom: spacing.sm, marginTop: 0 }}>Escalação de Jogos</h2>
      
      <div style={{ marginBottom: spacing.lg }}>
        <p style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.md }}>Primeiro, selecione a unidade:</p>
        <div style={{ display: "flex", gap: spacing.md }}>
          {mockUnidades.map(unidade => (
            <button key={unidade.id} onClick={() => handleUnitSelect(unidade.id)} style={{ padding: spacing.md, borderRadius: borders.radius, backgroundColor: selectedUnit === unidade.id ? colors.primaryLight : colors.white, border: `1px solid ${selectedUnit === unidade.id ? colors.primary : colors.textLight}`, cursor: "pointer", fontSize: fontSizes.base }}>
              {unidade.nome}
            </button>
          ))}
        </div>
      </div>
      
      {selectedUnit && (
        <div>
          <p style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.md }}>Agora, selecione um jogo para ver a escalação:</p>
          {isLoading ? (<p>Carregando jogos...</p>) : 
            (jogos.length === 0 ? (<p>Nenhum jogo encontrado para esta unidade.</p>) :
              (<div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
                {jogos.map((jogo) => (
                  <div key={jogo.id} onClick={() => handleJogoClick(jogo)} style={{ backgroundColor: colors.white, borderRadius: borders.radius, padding: spacing.md, border: `1px solid ${colors.textLight}`, cursor: "pointer", transition: 'border-color 0.2s' }}>
                    <strong style={{ fontSize: fontSizes.md, color: colors.textDark }}>{jogo.adversario}</strong>
                    <p style={{ fontSize: fontSizes.sm, color: colors.textLight }}>{jogo.data} - {jogo.hora}</p>
                  </div>
                ))}
              </div>)
            )
          }
        </div>
      )}

      {/* Os modais são parte da lógica desta página, então eles permanecem aqui */}
      {showCategoriaModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: colors.white, padding: spacing.lg, borderRadius: borders.radius, display: "flex", flexDirection: "column", gap: spacing.md, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: fontSizes.lg, color: colors.textDark, textAlign: 'center', marginTop: 0 }}>Selecione a Categoria</h3>
            <button style={{ padding: spacing.md, borderRadius: borders.radius, border: `1px solid ${colors.primary}`, backgroundColor: colors.primaryLight, color: colors.white, cursor: "pointer", fontSize: fontSizes.base }} onClick={() => handleCategoriaSelect("sub11")}>Sub-11</button>
            <button style={{ padding: spacing.md, borderRadius: borders.radius, border: `1px solid ${colors.primary}`, backgroundColor: colors.primaryLight, color: colors.white, cursor: "pointer", fontSize: fontSizes.base }} onClick={() => handleCategoriaSelect("sub13")}>Sub-13</button>
            <button style={{ padding: spacing.md, borderRadius: borders.radius, border: `1px solid ${colors.primary}`, backgroundColor: colors.primaryLight, color: colors.white, cursor: "pointer", fontSize: fontSizes.base }} onClick={() => handleCategoriaSelect("sub15")}>Sub-15</button>
            <button style={{ padding: spacing.sm, borderRadius: borders.radius, border: 'none', backgroundColor: colors.alternateRow, color: colors.textDark, cursor: "pointer", fontSize: fontSizes.base, marginTop: spacing.sm }} onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}

      {showEscalacaoModal && escalacao && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: spacing.md }}>
          <div style={{ backgroundColor: colors.white, padding: spacing.lg, borderRadius: borders.radius, width: '100%', maxWidth: "900px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ fontSize: fontSizes.lg, color: colors.textDark, marginBottom: spacing.md }}>Escalação - {selectedCategoria?.toUpperCase()}</h3>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", backgroundImage: `url(${campoDeFutebol})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
              {Object.entries(escalacao).map(([posicao, jogador]) => (
                <div key={posicao} style={getPlayerPositionStyle(posicao)}>
                  <div style={{ backgroundColor: colors.bluePrimary, color: colors.white, borderRadius: "50%", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{posicao}</div>
                  <span style={{ backgroundColor: colors.white, padding: '2px 4px', borderRadius: '4px', fontSize: fontSizes.sm, color: colors.textDark, marginTop: spacing.xs, textAlign: 'center' }}>{jogador.nome}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: spacing.lg, padding: spacing.md, borderRadius: borders.radius, border: `1px solid ${colors.primary}`, backgroundColor: colors.primaryLight, color: colors.white, cursor: "pointer", fontSize: fontSizes.base }} onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
};

// A função auxiliar de posicionamento permanece a mesma
const getPlayerPositionStyle = (posicao: string): React.CSSProperties => {
  const baseStyle: React.CSSProperties = { position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translate(-50%, -50%)' };
  const positions: { [key: string]: { top: string; left: string } } = {
    'GK': { top: '88%', left: '50%' },
    'ZAG1': { top: '70%', left: '35%' }, 'ZAG_E': { top: '70%', left: '35%' },
    'ZAG2': { top: '70%', left: '65%' }, 'ZAG_D': { top: '70%', left: '65%' },
    'DF': { top: '70%', left: '50%' },
    'VOL': { top: '55%', left: '50%' },
    'MEI': { top: '40%', left: '50%' }, 'MEI_C': { top: '40%', left: '50%' },
    'ATA': { top: '20%', left: '50%' }, 'ATA_C': { top: '20%', left: '50%' },
  };
  return { ...baseStyle, ...positions[posicao] };
}

export default PaginaEscalacao;