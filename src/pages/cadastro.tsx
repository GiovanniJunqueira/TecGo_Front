import React, { useState } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing, borders } from '../designSystem';

interface TitularData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
}

const StudentRegistration = () => {
  // Lista de titulares cadastrados
  const [titulares, setTitulares] = useState<TitularData[]>([]);
  
  // Controle para exibir/ocultar o formulário de cadastro/edição de titular
  const [showTitularForm, setShowTitularForm] = useState(false);
  
  // Se o formulário estiver em modo de edição, esse índice indicará qual titular está sendo editado;
  // se for null, significa que um novo titular está sendo adicionado
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Estado temporário que armazena os dados do titular enquanto o usuário os preenche ou edita
  const [currentTitular, setCurrentTitular] = useState<TitularData>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  // Atualiza os dados do titular conforme o usuário digita
  const handleTitularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCurrentTitular((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Ao confirmar, se estiver editando, atualiza os dados no array; se estiver adicionando, insere um novo titular
  const confirmTitular = () => {
    if (editingIndex !== null) {
      const updatedTitulares = [...titulares];
      updatedTitulares[editingIndex] = currentTitular;
      setTitulares(updatedTitulares);
    } else {
      setTitulares((prev) => [...prev, currentTitular]);
    }
    // Limpa o formulário e esconde a seção de titular
    setCurrentTitular({ nome: "", cpf: "", email: "", telefone: "", endereco: "" });
    setEditingIndex(null);
    setShowTitularForm(false);
  };

  // Abre o formulário para inserir um novo titular
  const openNewTitularForm = () => {
    setEditingIndex(null);
    setCurrentTitular({ nome: "", cpf: "", email: "", telefone: "", endereco: "" });
    setShowTitularForm(true);
  };

  // Caso o usuário clique em um titular já cadastrado, abre o formulário em modo de edição
  const editTitular = (index: number) => {
    setEditingIndex(index);
    setCurrentTitular(titulares[index]);
    setShowTitularForm(true);
  };

  // Cancela o preenchimento/edição do titular e oculta o formulário
  const cancelTitularForm = () => {
    setCurrentTitular({ nome: "", cpf: "", email: "", telefone: "", endereco: "" });
    setEditingIndex(null);
    setShowTitularForm(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: colors.background,
        padding: spacing.md,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: colors.white,
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
            color: colors.primary,
            textAlign: "center",
            marginBottom: spacing.lg,
          }}
        >
          Cadastro de Aluno
        </h1>

        <form style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          {/* Campos do Aluno */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="alunoNome"
              style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
            >
              Nome
            </label>
            <input
              id="alunoNome"
              type="text"
              placeholder="Digite o nome do aluno"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.textLight}`, fontSize: fontSizes.base }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="alunoCpf"
              style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
            >
              CPF
            </label>
            <input
              id="alunoCpf"
              type="text"
              placeholder="Digite o CPF do aluno"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.textLight}`, fontSize: fontSizes.base }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="nascimento"
              style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
            >
              Data de Nascimento
            </label>
            <input
              id="nascimento"
              type="date"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.textLight}`, fontSize: fontSizes.base }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="posicao"
              style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
            >
              Posição
            </label>
            <input
              id="posicao"
              type="text"
              placeholder="Digite a posição do aluno"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.textLight}`, fontSize: fontSizes.base }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="rg"
              style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
            >
              RG
            </label>
            <input
              id="rg"
              type="text"
              placeholder="Digite o RG do aluno"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.textLight}`, fontSize: fontSizes.base }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="tipoSanguineo"
              style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
            >
              Tipo Sanguíneo
            </label>
            <input
              id="tipoSanguineo"
              type="text"
              placeholder="Digite o tipo sanguíneo"
              style={{ padding: spacing.sm, borderRadius: borders.radius, border: `1px solid ${colors.textLight}`, fontSize: fontSizes.base }}
            />
          </div>

          {/* Seção de Titulares */}
          <div>
            <h2 style={{ fontSize: fontSizes.lg, color: colors.primary, marginBottom: spacing.sm }}>
              Dados do Responsável
            </h2>
            
            {/* Listagem dos titulares já adicionados */}
            {titulares.map((tit, index) => (
              <div
                key={index}
                style={{
                  marginBottom: spacing.sm,
                  padding: spacing.sm,
                  border: `1px solid ${colors.textLight}`,
                  borderRadius: borders.radius,
                  cursor: "pointer",
                }}
                onClick={() => editTitular(index)}
              >
                <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                  Nome: {tit.nome || "Sem nome"}
                </p>
                <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                  CPF: {tit.cpf || "Sem CPF"}
                </p>
              </div>
            ))}

            {/* Botão para exibir o formulário de adição (ou para adicionar mais titular) */}
            {!showTitularForm && (
              <button
                type="button"
                onClick={openNewTitularForm}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  padding: spacing.sm,
                  borderRadius: borders.radius,
                  fontSize: fontSizes.base,
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease-in-out",
                  marginBottom: spacing.md,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.primaryLight)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = colors.primary)
                }
              >
                Adicionar {titulares.length > 0 ? "mais " : ""}Titular
              </button>
            )}

            {/* Formulário de cadastro/edição do titular */}
            {showTitularForm && (
              <div
                style={{
                  marginTop: spacing.md,
                  padding: spacing.md,
                  border: `1px solid ${colors.textLight}`,
                  borderRadius: borders.radius,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="nome"
                      style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
                    >
                      Nome
                    </label>
                    <input
                      id="nome"
                      type="text"
                      placeholder="Digite o nome do titular"
                      value={currentTitular.nome}
                      onChange={handleTitularChange}
                      style={{
                        padding: spacing.sm,
                        borderRadius: borders.radius,
                        border: `1px solid ${colors.textLight}`,
                        fontSize: fontSizes.base,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="cpf"
                      style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
                    >
                      CPF
                    </label>
                    <input
                      id="cpf"
                      type="text"
                      placeholder="Digite o CPF do titular"
                      value={currentTitular.cpf}
                      onChange={handleTitularChange}
                      style={{
                        padding: spacing.sm,
                        borderRadius: borders.radius,
                        border: `1px solid ${colors.textLight}`,
                        fontSize: fontSizes.base,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="email"
                      style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Digite o email do titular"
                      value={currentTitular.email}
                      onChange={handleTitularChange}
                      style={{
                        padding: spacing.sm,
                        borderRadius: borders.radius,
                        border: `1px solid ${colors.textLight}`,
                        fontSize: fontSizes.base,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="telefone"
                      style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
                    >
                      Telefone
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      placeholder="Digite o telefone do titular"
                      value={currentTitular.telefone}
                      onChange={handleTitularChange}
                      style={{
                        padding: spacing.sm,
                        borderRadius: borders.radius,
                        border: `1px solid ${colors.textLight}`,
                        fontSize: fontSizes.base,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="endereco"
                      style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.xs }}
                    >
                      Endereço
                    </label>
                    <input
                      id="endereco"
                      type="text"
                      placeholder="Digite o endereço do titular"
                      value={currentTitular.endereco}
                      onChange={handleTitularChange}
                      style={{
                        padding: spacing.sm,
                        borderRadius: borders.radius,
                        border: `1px solid ${colors.textLight}`,
                        fontSize: fontSizes.base,
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: spacing.sm, marginTop: spacing.sm }}>
                  <button
                    type="button"
                    onClick={confirmTitular}
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                      padding: spacing.sm,
                      borderRadius: borders.radius,
                      fontSize: fontSizes.base,
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.primaryLight)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
                  >
                    Confirmar Titular
                  </button>
                  <button
                    type="button"
                    onClick={cancelTitularForm}
                    style={{
                      backgroundColor: colors.error,
                      color: colors.white,
                      padding: spacing.sm,
                      borderRadius: borders.radius,
                      fontSize: fontSizes.base,
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease-in-out",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e3342f")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.error)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Botão de envio final (submetendo os dados do aluno – e, futuramente, dos titulares) */}
          <button
            type="submit"
            style={{
              marginTop: spacing.sm,
              backgroundColor: colors.primary,
              color: colors.white,
              padding: spacing.sm,
              borderRadius: borders.radius,
              fontSize: fontSizes.base,
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.primaryLight)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.primary)}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
