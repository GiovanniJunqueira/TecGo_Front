import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing, borders } from "../designSystem";

// Interfaces para tipar os dados do formulário
interface ResponsavelData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
}

interface AlunoData {
    nome: string;
    cpf: string;
    nascimento: string;
    posicao: string;
    rg: string;
    tipoSanguineo: string;
}

// Componente para o formulário do responsável (lógica separada)
const FormularioResponsavel: React.FC<{
    onSave: (data: ResponsavelData) => void;
    onCancel: () => void;
    initialData: ResponsavelData;
    colors: any;
}> = ({ onSave, onCancel, initialData, colors }) => {
    
    const [responsavel, setResponsavel] = useState<ResponsavelData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResponsavel(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSave = () => {
        // Validação simples para garantir que o nome foi preenchido
        if (!responsavel.nome.trim()) {
            alert("O nome do responsável é obrigatório.");
            return;
        }
        onSave(responsavel);
    };

    const inputStyle: React.CSSProperties = { padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.alternateRow}`, fontSize: fontSizes.base, backgroundColor: colors.background, color: colors.textDark };

    return (
        <div style={{ marginTop: spacing.md, padding: spacing.md, border: `1px solid ${colors.alternateRow}`, borderRadius: borders.radius, backgroundColor: colors.background }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
                {/* Campos do formulário do responsável */}
                <input id="nome" type="text" placeholder="Nome do Responsável" value={responsavel.nome} onChange={handleChange} style={inputStyle} />
                <input id="cpf" type="text" placeholder="CPF do Responsável" value={responsavel.cpf} onChange={handleChange} style={inputStyle} />
                <input id="email" type="email" placeholder="Email do Responsável" value={responsavel.email} onChange={handleChange} style={inputStyle} />
                <input id="telefone" type="tel" placeholder="Telefone do Responsável" value={responsavel.telefone} onChange={handleChange} style={inputStyle} />
                <input id="endereco" type="text" placeholder="Endereço do Responsável" value={responsavel.endereco} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: spacing.sm, marginTop: spacing.md }}>
                <button type="button" onClick={handleSave} style={{ backgroundColor: colors.primary, color: colors.white, padding: spacing.sm, borderRadius: borders.radius, fontSize: fontSizes.base, border: "none", cursor: "pointer", flex: 1 }}>Confirmar Responsável</button>
                <button type="button" onClick={onCancel} style={{ backgroundColor: colors.error, color: colors.white, padding: spacing.sm, borderRadius: borders.radius, fontSize: fontSizes.base, border: "none", cursor: "pointer" }}>Cancelar</button>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL ---
const StudentRegistration: React.FC = () => {
  const { colors } = useTheme();

  // Estado para os dados do aluno
  const [aluno, setAluno] = useState<AlunoData>({ nome: "", cpf: "", nascimento: "", posicao: "", rg: "", tipoSanguineo: "" });
  
  // Lógica para os responsáveis
  const [responsaveis, setResponsaveis] = useState<ResponsavelData[]>([]);
  const [showResponsavelForm, setShowResponsavelForm] = useState(false);
  const [editingResponsavelIndex, setEditingResponsavelIndex] = useState<number | null>(null);

  const handleAlunoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAluno(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddNewResponsavel = () => {
    setEditingResponsavelIndex(null);
    setShowResponsavelForm(true);
  };

  const handleEditResponsavel = (index: number) => {
    setEditingResponsavelIndex(index);
    setShowResponsavelForm(true);
  };

  const handleSaveResponsavel = (data: ResponsavelData) => {
    if (editingResponsavelIndex !== null) {
      const updatedResponsaveis = [...responsaveis];
      updatedResponsaveis[editingResponsavelIndex] = data;
      setResponsaveis(updatedResponsaveis);
    } else {
      setResponsaveis(prev => [...prev, data]);
    }
    setShowResponsavelForm(false);
    setEditingResponsavelIndex(null);
  };

  const handleRemoveResponsavel = (indexToRemove: number) => {
    setResponsaveis(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aluno.nome.trim() || responsaveis.length === 0) {
        alert("O nome do aluno e pelo menos um responsável são obrigatórios.");
        return;
    }
    console.log("Dados Finais para Envio:", { aluno, responsaveis });
    alert("Aluno cadastrado com sucesso! (Verifique o console)");
  };

  const inputStyle: React.CSSProperties = { padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.alternateRow}`, fontSize: fontSizes.base, backgroundColor: colors.background, color: colors.textDark };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", minHeight: "100vh", padding: spacing.md, boxSizing: "border-box" }}>
      <div style={{ backgroundColor: colors.white, padding: spacing.lg, borderRadius: borders.radius, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "600px" }}>
        <h1 style={{ fontSize: fontSizes.title, color: colors.textDark, textAlign: "center", marginBottom: spacing.lg }}>
          Cadastro de Aluno
        </h1>

        <form onSubmit={handleFinalSubmit} style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {/* Campos do Aluno */}
          <input id="nome" type="text" placeholder="Nome do Aluno" value={aluno.nome} onChange={handleAlunoChange} style={inputStyle} />
          <input id="cpf" type="text" placeholder="CPF do Aluno" value={aluno.cpf} onChange={handleAlunoChange} style={inputStyle} />
          <input id="nascimento" type="date" placeholder="Data de Nascimento" value={aluno.nascimento} onChange={handleAlunoChange} style={inputStyle} />
          <input id="posicao" type="text" placeholder="Posição do Aluno" value={aluno.posicao} onChange={handleAlunoChange} style={inputStyle} />
          <input id="rg" type="text" placeholder="RG do Aluno" value={aluno.rg} onChange={handleAlunoChange} style={inputStyle} />
          <input id="tipoSanguineo" type="text" placeholder="Tipo Sanguíneo" value={aluno.tipoSanguineo} onChange={handleAlunoChange} style={inputStyle} />

          {/* Seção de Responsáveis */}
          <div>
            <h2 style={{ fontSize: fontSizes.lg, color: colors.textDark, marginBottom: spacing.sm, borderTop: `1px solid ${colors.alternateRow}`, paddingTop: spacing.md }}>
              Responsáveis
            </h2>
            {responsaveis.map((resp, index) => (
              <div key={index} style={{ marginBottom: spacing.sm, padding: spacing.sm, border: `1px solid ${colors.alternateRow}`, borderRadius: borders.radius, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ margin: 0, color: colors.textDark }}>{resp.nome} ({resp.cpf})</p>
                <div>
                  <button type="button" onClick={() => handleEditResponsavel(index)} style={{background: 'none', border: 'none', cursor: 'pointer', marginRight: spacing.sm}}>✏️</button>
                  <button type="button" onClick={() => handleRemoveResponsavel(index)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>🗑️</button>
                </div>
              </div>
            ))}

            {showResponsavelForm ? (
                <FormularioResponsavel 
                    onSave={handleSaveResponsavel}
                    onCancel={() => setShowResponsavelForm(false)}
                    initialData={editingResponsavelIndex !== null ? responsaveis[editingResponsavelIndex] : { nome: "", cpf: "", email: "", telefone: "", endereco: "" }}
                    colors={colors}
                />
            ) : (
              <button type="button" onClick={handleAddNewResponsavel} style={{ backgroundColor: colors.primaryLight, color: colors.white, padding: spacing.sm, borderRadius: borders.radius, fontSize: fontSizes.base, border: "none", cursor: "pointer", width: '100%' }}>
                + Adicionar Responsável
              </button>
            )}
          </div>

          <button type="submit" style={{ marginTop: spacing.sm, backgroundColor: colors.success, color: colors.white, padding: spacing.md, borderRadius: borders.radius, fontSize: fontSizes.lg, fontWeight: "bold", border: "none", cursor: "pointer" }}>
            Finalizar Cadastro do Aluno
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;