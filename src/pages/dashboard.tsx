import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext'; 
import { fontSizes, spacing, borders } from '../designSystem'; 

// --- Interfaces e Tipos (sem alterações) ---
interface DashboardData {
  kpis: {
    totalAlunos: number;
    alunosAtivos: number;
    mensalidadesPendentes: number;
  };
  proximosEventos: Array<{
    id: number;
    tipo: 'Jogo' | 'Treino';
    data: Date;
    descricao: string;
    local: string;
  }>;
  alunosPorCategoria: Array<{
    categoria: string;
    quantidade: number;
  }>;
}

// --- API Mock e Fetch (sem alterações) ---
const mockDashboardData: { [key: string]: DashboardData } = {
  geral: { kpis: { totalAlunos: 205, alunosAtivos: 190, mensalidadesPendentes: 25 }, proximosEventos: [ { id: 1, tipo: 'Jogo', data: new Date('2025-06-15T10:00:00'), descricao: 'Sub-15 vs EC Esperança', local: 'Unidade Centro' }, { id: 2, tipo: 'Treino', data: new Date('2025-06-16T16:00:00'), descricao: 'Sub-11 - Treino Físico', local: 'Unidade Centro' }, { id: 3, tipo: 'Treino', data: new Date('2025-06-17T09:00:00'), descricao: 'Sub-13 - Treino Tático', local: 'Unidade Sul' }, ], alunosPorCategoria: [ { categoria: 'Sub-9', quantidade: 40 }, { categoria: 'Sub-11', quantidade: 60 }, { categoria: 'Sub-13', quantidade: 55 }, { categoria: 'Sub-15', quantidade: 50 }, ], },
  '1': { kpis: { totalAlunos: 125, alunosAtivos: 118, mensalidadesPendentes: 15 }, proximosEventos: [ { id: 1, tipo: 'Jogo', data: new Date('2025-06-15T10:00:00'), descricao: 'Sub-15 vs EC Esperança', local: 'Campo Principal' }, { id: 2, tipo: 'Treino', data: new Date('2025-06-16T16:00:00'), descricao: 'Sub-11 - Treino Físico', local: 'Unidade Centro' }, ], alunosPorCategoria: [ { categoria: 'Sub-9', quantidade: 25 }, { categoria: 'Sub-11', quantidade: 35 }, { categoria: 'Sub-13', quantidade: 30 }, { categoria: 'Sub-15', quantidade: 28 }, ], },
  '2': { kpis: { totalAlunos: 80, alunosAtivos: 72, mensalidadesPendentes: 10 }, proximosEventos: [ { id: 3, tipo: 'Treino', data: new Date('2025-06-17T09:00:00'), descricao: 'Sub-13 - Treino Tático', local: 'Unidade Sul' }, ], alunosPorCategoria: [ { categoria: 'Sub-9', quantidade: 15 }, { categoria: 'Sub-11', quantidade: 25 }, { categoria: 'Sub-13', quantidade: 25 }, { categoria: 'Sub-15', quantidade: 22 }, ], },
};
const fetchDashboardData = async (unitId: 'geral' | number): Promise<DashboardData> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockDashboardData[unitId] || mockDashboardData.geral;
};


// --- Componentes Auxiliares Corrigidos ---

// MUDANÇA 1: Adicionamos 'colors' como uma propriedade que o StatCard recebe
const StatCard: React.FC<{ icon: string; label: string; value: string | number; color: string; colors: any; }> = ({ icon, label, value, color, colors }) => (
  <div style={{ backgroundColor: colors.white, display: 'flex', alignItems: 'center', padding: spacing.md, borderRadius: borders.radius, gap: spacing.md, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
    <div style={{ fontSize: '2rem', backgroundColor: color, color: colors.white, width: '60px', height: '60px', borderRadius: borders.radius, display: 'grid', placeItems: 'center' }}>{icon}</div>
    <div>
      <div style={{ fontSize: fontSizes.xl, fontWeight: 'bold', color: colors.textDark }}>{value}</div>
      <div style={{ fontSize: fontSizes.sm, color: colors.textLight }}>{label}</div>
    </div>
  </div>
);

// MUDANÇA 2: Adicionamos 'colors' como uma propriedade que o BarChart recebe
const BarChart: React.FC<{ data: { categoria: string, quantidade: number }[], colors: any; }> = ({ data, colors }) => {
  const maxQuantidade = Math.max(...data.map(item => item.quantidade), 0);
  return (
    <div style={{ backgroundColor: colors.white, padding: spacing.lg, borderRadius: borders.radius, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginTop: 0, color: colors.textDark, fontSize: fontSizes.lg }}>Alunos por Categoria</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '200px', borderLeft: `2px solid ${colors.alternateRow}`, borderBottom: `2px solid ${colors.alternateRow}`, paddingLeft: spacing.sm }}>
        {data.map(item => (
          <div key={item.categoria} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '40px', backgroundColor: colors.primary, height: `${maxQuantidade > 0 ? (item.quantidade / maxQuantidade) * 100 : 0}%`, borderRadius: `${borders.radius} ${borders.radius} 0 0`, transition: 'height 0.5s' }} title={`${item.categoria}: ${item.quantidade} alunos`}></div>
            <span style={{ fontSize: fontSizes.sm, marginTop: spacing.xs, color: colors.textDark }}>{item.categoria}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL ---
const DashBoard: React.FC = () => {
  const { colors } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<'geral' | number>('geral');
  const navigate = useNavigate(); // useNavigate não foi usado neste componente, mas pode ser útil

  useEffect(() => {
    setData(null);
    fetchDashboardData(selectedUnitId).then(setData);
  }, [selectedUnitId]);

  const mockUnidades = [{ id: 1, nome: "Unidade Centro" }, { id: 2, nome: "Unidade Zona Sul" }];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
        <h2 style={{ fontSize: fontSizes.title, color: colors.textDark, margin: 0 }}>Dashboard</h2>
        <div style={{ display: 'flex', gap: spacing.sm, backgroundColor: colors.white, padding: spacing.xs, borderRadius: borders.radius, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <button onClick={() => setSelectedUnitId('geral')} style={{ padding: spacing.sm, borderRadius: borders.radius, border: 'none', cursor: 'pointer', backgroundColor: selectedUnitId === 'geral' ? colors.primaryLight : 'transparent', color: selectedUnitId === 'geral' ? colors.white : colors.textDark }}>Geral</button>
          {mockUnidades.map(unidade => (
            <button key={unidade.id} onClick={() => setSelectedUnitId(unidade.id)} style={{ padding: spacing.sm, borderRadius: borders.radius, border: 'none', cursor: 'pointer', backgroundColor: selectedUnitId === unidade.id ? colors.primaryLight : 'transparent', color: selectedUnitId === unidade.id ? colors.white : colors.textDark }}>{unidade.nome}</button>
          ))}
        </div>
      </div>
      
      {!data ? (<p style={{color: colors.textDark}}>Carregando dados da unidade...</p>) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: spacing.lg, marginBottom: spacing.lg }}>
            {/* MUDANÇA 3: Passando a prop 'colors' para os componentes */}
            <StatCard icon="👥" label="Total de Alunos" value={data.kpis.totalAlunos} color="#5DADE2" colors={colors} />
            <StatCard icon="👍" label="Alunos Ativos" value={data.kpis.alunosAtivos} color="#58D68D" colors={colors} />
            <StatCard icon="💲" label="Mensalidades Pendentes" value={data.kpis.mensalidadesPendentes} color="#F5B041" colors={colors} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: spacing.lg, alignItems: 'flex-start' }}>
            <div style={{ backgroundColor: colors.white, padding: spacing.lg, borderRadius: borders.radius, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginTop: 0, color: colors.textDark, fontSize: fontSizes.lg }}>Próximos Eventos</h3>
              {data.proximosEventos.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {data.proximosEventos.map(evento => (
                    <li key={evento.id} style={{ display: 'flex', alignItems: 'center', gap: spacing.md, padding: `${spacing.sm} 0`, borderBottom: `1px solid ${colors.alternateRow}` }}>
                      <div style={{ fontSize: '1.5rem', color: colors.textDark }}>{evento.tipo === 'Jogo' ? '⚽' : '👟'}</div>
                      <div>
                        <strong style={{color: colors.textDark}}>{evento.descricao}</strong>
                        <div style={{ color: colors.textLight, fontSize: fontSizes.sm }}>
                          {evento.data.toLocaleDateString('pt-BR')} às {evento.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {evento.local}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p style={{color: colors.textLight}}>Nenhum evento futuro para esta unidade.</p>}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              {/* MUDANÇA 3: Passando a prop 'colors' para o componente */}
              <BarChart data={data.alunosPorCategoria} colors={colors} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashBoard;