import React, { useState } from "react";
import { colors, fontSizes, spacing, borders } from "../designSystem";


const modules = [
  { label: "Gestão de alunos", bg: "#FFFFFF", icon: "👥" },
  { label: "Controle de pagamentos", bg: "#FFFFFF", icon: "✅" },
  { label: "Histórico de partidas", bg: "#FFFFFF", icon: "🗓" },
  { label: "Gestão de funcionários", bg: "#FFFFFF", icon: "👨‍💼" },
  { label: "Dashboard", bg: "#FFFFFF", icon: "📊" },
  { label: "Escalação", bg: "#FFFFFF", icon: "⚽" },
];

const Dashboard = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleThemeChange = (mode: "light" | "dark") => {
    setTheme(mode);
    // Aqui você pode incluir lógica adicional para alterar o tema globalmente
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden", // Garante que não haverá scroll horizontal indesejado
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
        <h1 style={{ fontSize: fontSizes.title, color: colors.textDark }}>
          Sistema de Gerenciamento
        </h1>
        <div style={{ fontSize: fontSizes.base, color: colors.textDark }}>
          Início / Pages / Dashboard
        </div>
      </header>

      {/* Conteúdo Principal: Sidebar e Main */}
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
          {/* Bloco de módulos, onde cada botão possui fundo específico */}
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

          {/* Controle de Tema e Logout */}
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            {/* Seletor de tema com controle segmentado */}
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
                  color: theme === "light" ? colors.white : colors.white,
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
                  color: theme === "dark" ? colors.white : colors.white,
                  border: "none",
                  cursor: "pointer",
                  fontSize: fontSizes.base,
                  transition: "background 0.2s",
                }}
              >
                Escuro
              </button>
            </div>
            {/* Botão de Logout */}
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

        {/* Área Principal do Dashboard */}
        <main
          style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: spacing.lg,
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <h2
            style={{
              fontSize: fontSizes.title,
              color: colors.textDark,
              marginBottom: spacing.sm,
            }}
          >
            Dashboard
          </h2>

          {/* Cards das Unidades dispostos lado a lado */}
          <div
            style={{
              display: "flex",
              gap: spacing.lg,
              justifyContent: "center",
            }}
          >
            {/* Unidade 1 */}
            <div
              style={{
                flex: 1,
                maxWidth: "400px",
                backgroundColor: colors.white,
                padding: spacing.lg,
                borderRadius: borders.radius,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: `1px solid ${colors.textLight}`,
              }}
            >
              <h3
                style={{
                  fontSize: fontSizes.lg,
                  color: colors.primary,
                  marginBottom: spacing.sm,
                }}
              >
                Unidade 1
              </h3>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Quantidade de Alunos: <strong>120</strong>
              </p>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Próximo Jogo: <strong>25/12/2025</strong>
              </p>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Alunos Pagos: <strong>100</strong>
              </p>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Alunos Não Pagos: <strong>20</strong>
              </p>
            </div>

            {/* Unidade 2 */}
            <div
              style={{
                flex: 1,
                maxWidth: "400px",
                backgroundColor: colors.white,
                padding: spacing.lg,
                borderRadius: borders.radius,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: `1px solid ${colors.textLight}`,
              }}
            >
              <h3
                style={{
                  fontSize: fontSizes.lg,
                  color: colors.primary,
                  marginBottom: spacing.sm,
                }}
              >
                Unidade 2
              </h3>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Quantidade de Alunos: <strong>80</strong>
              </p>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Próximo Jogo: <strong>28/12/2025</strong>
              </p>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Alunos Pagos: <strong>65</strong>
              </p>
              <p style={{ fontSize: fontSizes.base, color: colors.textDark }}>
                Alunos Não Pagos: <strong>15</strong>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
