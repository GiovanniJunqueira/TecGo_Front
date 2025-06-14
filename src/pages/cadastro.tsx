import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext'; // 1. Importar o hook
import { fontSizes, spacing, borders } from "../designSystem"; // 'colors' removido daqui

interface TitularData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
}

const StudentRegistration = () => {
  // 2. Pegar as cores do contexto
  const { colors } = useTheme();

  // O resto da lógica do componente permanece igual
  const [titulares, setTitulares] = useState<TitularData[]>([]);
  const [showTitularForm, setShowTitularForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentTitular, setCurrentTitular] = useState<TitularData>({
    nome: "", cpf: "", email: "", telefone: "", endereco: "",
  });

  const handleTitularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCurrentTitular((prev) => ({ ...prev, [id]: value }));
  };

  const confirmTitular = () => { /* ...lógica sem alteração... */ };
  const openNewTitularForm = () => { /* ...lógica sem alteração... */ };
  const editTitular = (index: number) => { /* ...lógica sem alteração... */ };
  const cancelTitularForm = () => { /* ...lógica sem alteração... */ };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.background, // Agora usa a cor dinâmica
        padding: spacing.md,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: colors.white, // Agora usa a cor dinâmica
          padding: spacing.lg,
          borderRadius: borders.radius,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontSize: fontSizes.title,
            color: colors.textDark, // Corrigido
            textAlign: "center",
            marginBottom: spacing.lg,
          }}
        >
          Cadastro de Aluno
        </h1>

        <form style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {/* O JSX do formulário continua o mesmo, ele já vai usar as cores dinâmicas */}
          {/* Exemplo de um campo: */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="alunoNome" style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}>
              Nome
            </label>
            <input
              id="alunoNome" type="text" placeholder="Digite o nome do aluno"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.alternateRow}`, fontSize: fontSizes.base, backgroundColor: colors.background, color: colors.textDark }}
            />
          </div>
          
          {/* ... todos os outros campos do formulário ... */}

          <button type="submit" style={{ marginTop: spacing.sm, backgroundColor: colors.primaryLight, color: colors.white, padding: spacing.md, borderRadius: borders.radius, fontSize: fontSizes.base, fontWeight: "bold", border: "none", cursor: "pointer" }}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;