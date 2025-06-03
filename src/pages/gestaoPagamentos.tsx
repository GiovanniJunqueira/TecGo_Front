import React, { useState } from "react";
import { colors, fontSizes, spacing, borders } from "../designSystem";

// Atualize seu design system definindo essa variável, por exemplo:
// colors.alternateRow = "#F0F0F0"; // cor de fundo intercalada
const modules = [
  { label: "Gestão de alunos", bg: "#FFFFFF", icon: "👥" },
  { label: "Controle de pagamentos", bg: "#FFFFFF", icon: "✅" },
  { label: "Histórico de partidas", bg: "#FFFFFF", icon: "🗓" },
  { label: "Gestão de funcionários", bg: "#FFFFFF", icon: "👨‍💼" },
  { label: "Dashboard", bg: "#FFFFFF", icon: "📊" },
  { label: "Escalação", bg: "#FFFFFF", icon: "⚽" },
];

const dummyPayments = [
  { aluno: "João da Silva", status: "Pago", data: "01/06/2025", valor: "R$ 100,00" },
  { aluno: "Maria Oliveira", status: "Pendente", data: "05/06/2025", valor: "R$ 90,00" },
  { aluno: "Carlos Eduardo", status: "Pago", data: "10/06/2025", valor: "R$ 120,00" },
  { aluno: "Ana Paula", status: "Pendente", data: "12/06/2025", valor: "R$ 110,00" },
  { aluno: "Marcos Vinicius", status: "Pago", data: "15/06/2025", valor: "R$ 130,00" },
  { aluno: "Fernanda Lima", status: "Pendente", data: "18/06/2025", valor: "R$ 95,00" },
  { aluno: "Rafael Souza", status: "Pago", data: "20/06/2025", valor: "R$ 105,00" },
  { aluno: "Isabela Costa", status: "Pago", data: "22/06/2025", valor: "R$ 115,00" },
  { aluno: "Bruno Martins", status: "Pendente", data: "25/06/2025", valor: "R$ 100,00" },
  { aluno: "Larissa Gomes", status: "Pago", data: "27/06/2025", valor: "R$ 120,00" },
];

const PaymentsManagement = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleThemeChange = (mode: "light" | "dark") => {
    setTheme(mode);
    // Lógica para alterar o tema global pode ser adicionada aqui.
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden", // Evita scroll horizontal indesejado
      }}
    >
      {/* Header */}
      <header
        style={{
          width: "100%",
          backgroundColor: colors.header,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: spacing.lg,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: fontSizes.title, color: colors.primary }}>
          Sistema de Gerenciamento
        </h1>
        <div style={{ fontSize: fontSizes.base, color: colors.textLight }}>
          Início / Pages / Gestão de Pagamentos
        </div>
      </header>

      {/* Conteúdo Principal: Sidebar e Área Central */}
      <div style={{ flex: 1, display: "flex", boxSizing: "border-box" }}>
        {/* Sidebar */}
        <aside
          style={{
            width: "250px",
            backgroundColor: colors.bluePrimary,
            color: colors.white,
            padding: spacing.lg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          {/* Bloco de módulos – cada botão possui seu fundo específico */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing.sm,
            }}
          >
            {modules.map((modulo) => (
              <button
                key={modulo.label}
                style={{
                  width: "100%",
                  backgroundColor: modulo.bg,
                  border: "none",
                  color: colors.textDark,
                  fontSize: fontSizes.base,
                  textAlign: "left" as const,
                  padding: spacing.md,
                  borderRadius: borders.radius,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.sm,
                  cursor: "pointer",
                }}
              >
                <span>{modulo.icon}</span>
                <span>{modulo.label}</span>
              </button>
            ))}
          </div>

          {/* Seletor de Tema e Botão de Logout */}
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            {/* Controle segmentado para troca de tema */}
            <div
              style={{
                display: "flex",
                border: `1px solid ${colors.white}`,
                borderRadius: borders.radius,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => handleThemeChange("light")}
                style={{
                  flex: 1,
                  padding: spacing.sm,
                  backgroundColor: theme === "light" ? colors.primaryLight : "transparent",
                  color: colors.white,
                  border: "none",
                  cursor: "pointer",
                  fontSize: fontSizes.base,
                  transition: "background 0.2s",
                }}
              >
                Claro
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                style={{
                  flex: 1,
                  padding: spacing.sm,
                  backgroundColor: theme === "dark" ? colors.primaryLight : "transparent",
                  color: colors.white,
                  border: "none",
                  cursor: "pointer",
                  fontSize: fontSizes.base,
                  transition: "background 0.2s",
                }}
              >
                Escuro
              </button>
            </div>
            <button
              style={{
                backgroundColor: colors.error,
                border: "none",
                borderRadius: borders.radius,
                color: colors.white,
                padding: spacing.sm,
                cursor: "pointer",
                fontSize: fontSizes.base,
              }}
            >
              Sair
            </button>
          </div>
        </aside>

        {/* Área Central: Conteúdo do módulo de Gestão de Pagamentos */}
        <main
          style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: spacing.lg,
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <h2 style={{ fontSize: fontSizes.title, color: colors.textDark, marginBottom: spacing.sm }}>
            Gestão de Pagamentos
          </h2>
          <p style={{ fontSize: fontSizes.base, color: colors.textDark, marginBottom: spacing.sm }}>
            Controle e analise os pagamentos dos alunos.
          </p>

          {/* Filtros */}
          <div style={{ display: "flex", gap: spacing.md, marginBottom: spacing.lg, flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Pesquisar aluno..."
              style={{
                padding: spacing.sm,
                border: `1px solid ${colors.textLight}`,
                borderRadius: borders.radius,
                fontSize: fontSizes.base,
                flex: "1 1 200px",
              }}
            />
            <select
              style={{
                padding: spacing.sm,
                border: `1px solid ${colors.textLight}`,
                borderRadius: borders.radius,
                fontSize: fontSizes.base,
              }}
            >
              <option value="">Status: Todos</option>
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
            </select>
            {/* Alteramos o input para filtrar mês */}
            <input
              type="month"
              style={{
                padding: spacing.sm,
                border: `1px solid ${colors.textLight}`,
                borderRadius: borders.radius,
                fontSize: fontSizes.base,
              }}
            />
          </div>

          {/* Tabela de Pagamentos com linhas intercaladas */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: spacing.sm,
                    borderBottom: `2px solid ${colors.textLight}`,
                    textAlign: "left",
                    fontSize: fontSizes.base,
                    color: colors.textDark,
                  }}
                >
                  Aluno
                </th>
                <th
                  style={{
                    padding: spacing.sm,
                    borderBottom: `2px solid ${colors.textLight}`,
                    textAlign: "left",
                    fontSize: fontSizes.base,
                    color: colors.textDark,
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: spacing.sm,
                    borderBottom: `2px solid ${colors.textLight}`,
                    textAlign: "left",
                    fontSize: fontSizes.base,
                    color: colors.textDark,
                  }}
                >
                  Data de Pagamento
                </th>
                <th
                  style={{
                    padding: spacing.sm,
                    borderBottom: `2px solid ${colors.textLight}`,
                    textAlign: "left",
                    fontSize: fontSizes.base,
                    color: colors.textDark,
                  }}
                >
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyPayments.map((pay, i) => (
                <tr
                  key={i}
                  style={{
                    backgroundColor: i % 2 === 0 ? colors.white : colors.alternateRow,
                  }}
                >
                  <td
                    style={{
                      padding: spacing.sm,
                      borderBottom: `1px solid ${colors.textLight}`,
                      fontSize: fontSizes.base,
                      color: colors.textDark,
                    }}
                  >
                    {pay.aluno}
                  </td>
                  <td
                    style={{
                      padding: spacing.sm,
                      borderBottom: `1px solid ${colors.textLight}`,
                      fontSize: fontSizes.base,
                      color: colors.textDark,
                    }}
                  >
                    {pay.status}
                  </td>
                  <td
                    style={{
                      padding: spacing.sm,
                      borderBottom: `1px solid ${colors.textLight}`,
                      fontSize: fontSizes.base,
                      color: colors.textDark,
                    }}
                  >
                    {pay.data}
                  </td>
                  <td
                    style={{
                      padding: spacing.sm,
                      borderBottom: `1px solid ${colors.textLight}`,
                      fontSize: fontSizes.base,
                      color: colors.textDark,
                    }}
                  >
                    {pay.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default PaymentsManagement;
