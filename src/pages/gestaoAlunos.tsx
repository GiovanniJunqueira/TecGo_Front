import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing, borders } from '../designSystem';

// --- Interfaces e Tipos ---
interface Aluno {
  nome: string;
  matricula: string;
  turma: string;
  nascimento: string;
  posicao: string;
  responsavel: string;
}

// --- Mocks ---
const mockUsers: Aluno[] = [
  { nome: "João da Silva", matricula: "2025001", turma: "A", nascimento: "2010", posicao: "Goleiro", responsavel: "Carlos Silva" },
  { nome: "Maria Oliveira", matricula: "2025002", turma: "B", nascimento: "2012", posicao: "Atacante", responsavel: "Luiz Oliveira" },
  { nome: "Carlos Eduardo", matricula: "2025003", turma: "A", nascimento: "2011", posicao: "Zagueiro", responsavel: "Pedro Eduardo" },
  { nome: "Ana Paula", matricula: "2025004", turma: "C", nascimento: "2013", posicao: "Meia", responsavel: "Julia Paula" },
  { nome: "Marcos Vinicius", matricula: "2025005", turma: "B", nascimento: "2010", posicao: "Lateral", responsavel: "Ricardo Vinicius" },
];

// --- COMPONENTE ---
const GestaoAlunos: React.FC = () => {
  // Pega as cores dinâmicas do contexto global
  const { colors } = useTheme(); 

  // O estado e a lógica da página permanecem os mesmos
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    turma: "",
    nascimento: "",
    posicao: "",
    nome: "",
  });

  const handleUnitSelection = (unit: string) => {
    setSelectedUnit(unit);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  // Estilo base para os inputs e selects, para evitar repetição
  const inputBaseStyle: React.CSSProperties = {
    padding: spacing.sm,
    border: `1px solid ${colors.textLight}`,
    borderRadius: borders.radius,
    fontSize: fontSizes.base,
    backgroundColor: colors.white,
    color: colors.textDark,
  };


  // O JSX de retorno agora é apenas o conteúdo que ficava dentro do <main>
  return (
    <>
      <h2 style={{ fontSize: fontSizes.title, color: colors.textDark, marginBottom: spacing.lg, marginTop: 0 }}>
        Gestão de Alunos
      </h2>

      {/* Seletor de Unidade */}
      <div style={{ display: "flex", gap: spacing.md, marginBottom: spacing.lg }}>
        <button onClick={() => handleUnitSelection("Escola 1")} style={{ padding: spacing.md, borderRadius: borders.radius, backgroundColor: selectedUnit === "Escola 1" ? colors.primaryLight : colors.white, border: `1px solid ${selectedUnit === "Escola 1" ? colors.primary : colors.textLight}`, color: selectedUnit === "Escola 1" ? colors.white : colors.textDark, cursor: "pointer", fontSize: fontSizes.base }}>Escola 1</button>
        <button onClick={() => handleUnitSelection("Escola 2")} style={{ padding: spacing.md, borderRadius: borders.radius, backgroundColor: selectedUnit === "Escola 2" ? colors.primaryLight : colors.white, border: `1px solid ${selectedUnit === "Escola 2" ? colors.primary : colors.textLight}`, color: selectedUnit === "Escola 2" ? colors.white : colors.textDark, cursor: "pointer", fontSize: fontSizes.base }}>Escola 2</button>
      </div>

      {/* Filtros */}
      {selectedUnit && (
        <div style={{ display: "flex", gap: spacing.md, marginBottom: spacing.lg, flexWrap: "wrap" }}>
          <select name="turma" onChange={handleFilterChange} style={inputBaseStyle}>
            <option value="">Turma</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <input type="number" name="nascimento" placeholder="Ano de Nascimento" onChange={handleFilterChange} style={inputBaseStyle} />
          <select name="posicao" onChange={handleFilterChange} style={inputBaseStyle}>
            <option value="">Posição</option>
            <option value="Goleiro">Goleiro</option>
            <option value="Zagueiro">Zagueiro</option>
            <option value="Meia">Meia</option>
            <option value="Atacante">Atacante</option>
          </select>
          <input type="text" name="nome" placeholder="Nome ou Nome do Responsável" onChange={handleFilterChange} style={{...inputBaseStyle, flex: "1 1 200px" }} />
        </div>
      )}

      {/* Lista de usuários mockados */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {mockUsers.map((user, index) => (
          <li key={index} style={{ padding: spacing.md, backgroundColor: index % 2 === 0 ? colors.white : colors.alternateRow, borderRadius: borders.radius, marginBottom: spacing.sm, color: colors.textDark }}>
            {user.nome} - {user.matricula} - {user.turma} - {user.nascimento} - {user.posicao} - {user.responsavel}
          </li>
        ))}
      </ul>
    </>
  );
};

export default GestaoAlunos;