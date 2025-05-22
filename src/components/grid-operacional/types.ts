export interface GridOperacionalItem {
    cod: string;
    dataSolicitacao: string;
    mtsOs: string;
    cliente: string;
    placaAuto: string;
    parceiro: string;
    agente1: string;
    agente2: string;
    vtr: string;
    origem: string;
    destino: string;
    dataMissao: string;
    horaMissao: string;
    horaEquipe: string;
    horaInicioReal: string;
    kmInicio: number;
    dataFimMissao: string;
    kmFinal: number;
    horaFinal: string;
    status: string;
    totalHoraMissao: string;
    kmTotal: number;
  }
  
  // Dados de exemplo para o Grid Operacional
  export const gridOperacionalData: GridOperacionalItem[] = [
    {
      cod: "001",
      dataSolicitacao: "2023-06-01",
      mtsOs: "MTS-12345",
      cliente: "Empresa ABC",
      placaAuto: "ABC1234",
      parceiro: "Segurança Total",
      agente1: "João Silva",
      agente2: "Maria Oliveira",
      vtr: "VTR-001",
      origem: "São Paulo, SP",
      destino: "Campinas, SP",
      dataMissao: "2023-06-02",
      horaMissao: "08:00",
      horaEquipe: "07:30",
      horaInicioReal: "07:45",
      kmInicio: 50000,
      dataFimMissao: "2023-06-02",
      kmFinal: 50150,
      horaFinal: "14:30",
      status: "Concluído",
      totalHoraMissao: "6:45",
      kmTotal: 150
    },
    {
      cod: "002",
      dataSolicitacao: "2023-06-03",
      mtsOs: "MTS-67890",
      cliente: "Corporação XYZ",
      placaAuto: "XYZ5678",
      parceiro: "Guarda Elite",
      agente1: "Carlos Santos",
      agente2: "Ana Lima",
      vtr: "VTR-002",
      origem: "Rio de Janeiro, RJ",
      destino: "Niterói, RJ",
      dataMissao: "2023-06-04",
      horaMissao: "09:00",
      horaEquipe: "08:30",
      horaInicioReal: "08:40",
      kmInicio: 45000,
      dataFimMissao: "2023-06-04",
      kmFinal: 45080,
      horaFinal: "12:15",
      status: "Concluído",
      totalHoraMissao: "3:35",
      kmTotal: 80
    },
    {
      cod: "003",
      dataSolicitacao: "2023-06-05",
      mtsOs: "MTS-13579",
      cliente: "Indústrias LMN",
      placaAuto: "LMN9012",
      parceiro: "Segurança Máxima",
      agente1: "Roberto Pereira",
      agente2: "Fernanda Costa",
      vtr: "VTR-003",
      origem: "Belo Horizonte, MG",
      destino: "Contagem, MG",
      dataMissao: "2023-06-06",
      horaMissao: "10:00",
      horaEquipe: "09:30",
      horaInicioReal: "09:45",
      kmInicio: 30000,
      dataFimMissao: "2023-06-06",
      kmFinal: 30060,
      horaFinal: "13:00",
      status: "Concluído",
      totalHoraMissao: "3:15",
      kmTotal: 60
    }
  ];