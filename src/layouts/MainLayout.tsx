// src/layouts/MainLayout.tsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/sidebar'; // Corrigido o caminho
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing } from '../designSystem'; // Importando spacing

export const MainLayout: React.FC = () => {
  const { colors } = useTheme();
  const location = useLocation();

  // Função para extrair o nome da página da rota
  const getPageTitle = (pathname: string) => {
    const name = pathname.split('/').pop() || 'Dashboard';
    // Converte de "gestaoAlunos" para "Gestão de Alunos"
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    // O background do div principal foi removido, pois o body já tem a cor certa
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{
        width: "100%",
        backgroundColor: colors.header,
        padding: spacing.lg,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        borderBottom: `1px solid ${colors.alternateRow}`
      }}>
        <h1 style={{ fontSize: fontSizes.title, color: colors.textDark, margin: 0 }}>
          {getPageTitle(location.pathname)}
        </h1>
        <div style={{ fontSize: fontSizes.base, color: colors.textLight }}>
          Início / {getPageTitle(location.pathname)}
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", overflow: 'hidden' }}>
        <Sidebar />
        
        <main style={{ flex: 1, padding: spacing.lg, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};