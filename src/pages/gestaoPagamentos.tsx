import React, { useState, useMemo } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { fontSizes, spacing, borders } from '../designSystem';

// --- Interfaces e Tipos ---
interface Pagamento {
  aluno: string;
  matricula: string;
  responsavel: string;
  status: 'Pago' | 'Pendente';
  data: string;
  valor: string;
}

// --- Mocks ---
const dummyPayments: Pagamento[] = [
  { aluno: "João da Silva", matricula: "2025001", responsavel: "Carlos Silva", status: "Pago", data: "01/06/2025", valor: "R$ 100,00" },
  { aluno: "Maria Oliveira", matricula: "2025002", responsavel: "Luiz Oliveira", status: "Pendente", data: "05/06/2025", valor: "R$ 90,00" },
  { aluno: "Carlos Eduardo", matricula: "2025003", responsavel: "Pedro Eduardo", status: "Pago", data: "10/06/2025", valor: "R$ 120,00" },
  { aluno: "Ana Paula", matricula: "2025004", responsavel: "Julia Paula", status: "Pendente", data: "12/06/2025", valor: "R$ 110,00" },
  { aluno: "Marcos Vinicius", matricula: "2025005", responsavel: "Ricardo Vinicius", status: "Pago", data: "15/06/2025", valor: "R$ 130,00" },
  { aluno: "Fernanda Lima", matricula: "2025006", responsavel: "Tatiana Lima", status: "Pendente", data: "18/06/2025", valor: "R$ 95,00" },
  { aluno: "Rafael Souza", matricula: "2025007", responsavel: "Fabiana Souza", status: "Pago", data: "20/06/2025", valor: "R$ 105,00" },
  { aluno: "Isabela Costa", matricula: "2025008", responsavel: "Antonio Costa", status: "Pago", data: "22/06/2025", valor: "R$ 115,00" },
  { aluno: "Bruno Martins", matricula: "2025009", responsavel: "Veronica Martins", status: "Pendente", data: "25/06/2025", valor: "R$ 100,00" },
  { aluno: "Larissa Gomes", matricula: "2025010", responsavel: "Renato Gomes", status: "Pago", data: "27/06/2025", valor: "R$ 120,00" },
];


// --- COMPONENTE ---
const GestaoPagamentos: React.FC = () => {
  // Pega as cores dinâmicas do contexto
  const { colors } = useTheme(); 

  // Estado para os filtros funcionarem
  const [filtroBusca, setFiltroBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  // Lógica de filtragem dos pagamentos
  const pagamentosFiltrados = useMemo(() => {
    return dummyPayments.filter(pagamento => {
      const busca = filtroBusca.toLowerCase();
      const correspondeBusca = busca === '' || 
                             pagamento.aluno.toLowerCase().includes(busca) ||
                             pagamento.responsavel.toLowerCase().includes(busca);
      
      const correspondeStatus = filtroStatus === '' || pagamento.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [filtroBusca, filtroStatus]);

  // Estilos base para reutilização
  const inputBaseStyle: React.CSSProperties = {
    padding: spacing.sm,
    border: `1px solid ${colors.alternateRow}`,
    borderRadius: borders.radius,
    fontSize: fontSizes.base,
    backgroundColor: colors.white,
    color: colors.textDark,
  };

  const thStyle: React.CSSProperties = {
    padding: spacing.md,
    borderBottom: `2px solid ${colors.alternateRow}`,
    textAlign: "left",
    fontSize: fontSizes.base,
    color: colors.textDark,
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    padding: spacing.md,
    borderBottom: `1px solid ${colors.alternateRow}`,
    fontSize: fontSizes.base,
    color: colors.textDark,
  };


  // O JSX de retorno agora é apenas o conteúdo da página
  return (
    <>
      <h2 style={{ fontSize: fontSizes.title, color: colors.textDark, marginBottom: spacing.sm, marginTop: 0 }}>
        Gestão de Pagamentos
      </h2>
      <p style={{ fontSize: fontSizes.base, color: colors.textLight, marginBottom: spacing.lg }}>
        Controle e analise os pagamentos dos alunos.
      </p>

      {/* Filtros */}
      <div style={{ display: "flex", gap: spacing.md, marginBottom: spacing.lg, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Pesquisar aluno ou responsável..."
          value={filtroBusca}
          onChange={(e) => setFiltroBusca(e.target.value)}
          style={{ ...inputBaseStyle, flex: "1 1 250px" }}
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={inputBaseStyle}
        >
          <option value="">Status: Todos</option>
          <option value="Pago">Pago</option>
          <option value="Pendente">Pendente</option>
        </select>
        <input type="month" style={inputBaseStyle} />
      </div>

      {/* Tabela de Pagamentos */}
      <div style={{ overflowX: 'auto', backgroundColor: colors.white, borderRadius: borders.radius }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Aluno</th>
              <th style={thStyle}>Matrícula</th>
              <th style={{...thStyle, minWidth: '150px'}}>Responsável</th>
              <th style={thStyle}>Status</th>
              <th style={{...thStyle, minWidth: '150px'}}>Data de Pagamento</th>
              <th style={thStyle}>Valor</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pagamentosFiltrados.map((pay, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'transparent' : colors.alternateRow }}>
                <td style={tdStyle}>{pay.aluno}</td>
                <td style={tdStyle}>{pay.matricula}</td>
                <td style={tdStyle}>{pay.responsavel}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: `${spacing.xs} ${spacing.sm}`,
                    borderRadius: borders.radius,
                    fontSize: fontSizes.sm,
                    fontWeight: 'bold',
                    color: colors.white,
                    backgroundColor: pay.status === 'Pago' ? colors.success : colors.error,
                  }}>
                    {pay.status}
                  </span>
                </td>
                <td style={tdStyle}>{pay.data}</td>
                <td style={tdStyle}>{pay.valor}</td>
                <td style={tdStyle}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', marginRight: spacing.sm }}>✏️</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pagamentosFiltrados.length === 0 && (
          <p style={{ textAlign: 'center', padding: spacing.lg, color: colors.textLight }}>Nenhum pagamento encontrado.</p>
        )}
      </div>
    </>
  );
};

// Renomeei o componente para bater com a rota
export default GestaoPagamentos;