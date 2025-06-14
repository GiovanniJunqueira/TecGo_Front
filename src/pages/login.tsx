import React from "react";
import { useTheme } from '../contexts/ThemeContext'; // 1. Importar o hook
import { fontSizes, spacing, borders } from "../designSystem"; // 'colors' removido daqui

const Login = () => {
  // 2. Pegar as cores do contexto
  const { colors } = useTheme();

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
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: fontSizes.title,
            color: colors.textDark, // Corrigido para usar a cor de texto do tema
            textAlign: "center",
            marginBottom: spacing.lg,
          }}
        >
          Login
        </h1>

        <form style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="email"
              style={{
                fontSize: fontSizes.base,
                color: colors.textDark,
                marginBottom: spacing.xs,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              style={{
                padding: spacing.sm,
                borderRadius: borders.radius,
                border: `1px solid ${colors.alternateRow}`, // Usando cor do tema
                backgroundColor: colors.background, // Usando cor do tema
                color: colors.textDark, // Usando cor do tema
                fontSize: fontSizes.base,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor="password"
              style={{
                fontSize: fontSizes.base,
                color: colors.textDark,
                marginBottom: spacing.xs,
              }}
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              style={{
                padding: spacing.sm,
                borderRadius: borders.radius,
                border: `1px solid ${colors.alternateRow}`, // Usando cor do tema
                backgroundColor: colors.background, // Usando cor do tema
                color: colors.textDark, // Usando cor do tema
                fontSize: fontSizes.base,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: spacing.sm,
              backgroundColor: colors.primaryLight, // Usando a cor mais vibrante
              color: colors.white,
              padding: spacing.md, // Aumentando padding
              borderRadius: borders.radius,
              fontSize: fontSizes.base,
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;