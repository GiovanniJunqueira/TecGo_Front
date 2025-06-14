// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing, borders } from '../designSystem';

const modules = [
  { label: "Dashboard", path: "/inicio", icon: "📊" },
  { label: "Gestão de Alunos", path: "/gestaoAlunos", icon: "👥" },
  { label: "Controle de Pagamentos", path: "/gestaoPagamentos", icon: "✅" },
  { label: "Histórico de Partidas", path: "/partidas", icon: "🗓" },
  { label: "Escalação", path: "/escalacao", icon: "⚽" },
  { label: "Gestão de Funcionários", path: "#", icon: "👨‍💼" }, 
];

export const Sidebar: React.FC = () => {
  const { theme, setTheme, colors } = useTheme(); 
  const location = useLocation();

  return (
    <aside style={{
      width: "250px",
      backgroundColor: colors.bluePrimary,
      padding: spacing.lg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
      borderRight: `1px solid ${theme === 'light' ? '#E5E7EB' : '#374151'}`
    }}>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
        {modules.map((modulo) => {
          const isActive = location.pathname === modulo.path;
          return (
            <Link to={modulo.path} key={modulo.label} style={{ textDecoration: 'none' }}>
              <button 
                style={{
                  width: "100%",
                  backgroundColor: isActive ? colors.primaryLight : colors.white,
                  color: isActive ? '#FFFFFF' : colors.textDark,
                  border: "none",
                  fontSize: fontSizes.base,
                  textAlign: "left",
                  padding: spacing.md,
                  borderRadius: borders.radius,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.sm,
                  cursor: "pointer",
                  transition: 'background-color 0.2s, color 0.2s',
                }}
              >
                <span>{modulo.icon}</span>
                <span>{modulo.label}</span>
              </button>
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
        <div style={{
            display: "flex",
            border: `1px solid #FFFFFF`,
            borderRadius: borders.radius,
            overflow: "hidden",
            backgroundColor: 'rgba(0,0,0,0.2)'
        }}>
          <button 
            onClick={() => setTheme('light')} 
            style={{
              flex: 1, padding: spacing.sm,
              backgroundColor: theme === "light" ? colors.white : "transparent",
              color: theme === "light" ? colors.primary : colors.white,
              border: "none", cursor: "pointer", fontSize: fontSizes.base,
              transition: "background-color 0.2s, color 0.2s",
              fontWeight: theme === 'light' ? 'bold' : 'normal',
            }}
          >
            Claro
          </button>
          <button 
            onClick={() => setTheme('dark')} 
            style={{
              flex: 1, padding: spacing.sm,
              backgroundColor: theme === "dark" ? colors.white : "transparent",
              color: theme === "dark" ? colors.primary : colors.white,
              border: "none", cursor: "pointer", fontSize: fontSizes.base,
              transition: "background-color 0.2s, color 0.2s",
              fontWeight: theme === 'dark' ? 'bold' : 'normal',
            }}
          >
            Escuro
          </button>
        </div>
        <button style={{
            backgroundColor: colors.error, border: "none", borderRadius: borders.radius,
            color: '#FFFFFF', padding: spacing.sm, cursor: "pointer",
            fontSize: fontSizes.base, fontWeight: 'bold'
        }}>
          Sair
        </button>
      </div>
    </aside>
  );
};