import React from "react";
import { colors, fontSizes, spacing, borders } from "../designSystem";

const Login = () => {
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
          maxWidth: "400px",
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
                border: `1px solid ${colors.textLight}`,
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
                border: `1px solid ${colors.textLight}`,
                fontSize: fontSizes.base,
              }}
            />
          </div>

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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
