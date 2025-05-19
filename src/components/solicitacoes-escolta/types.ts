
export interface EscoltaItem {
  id: number;
  cliente: string;
  solicitacao: string;
  dataInicioPrevisto: string;
  origem: string;
  destino: string;
  tratativas: string;
  operador: string;
  numeroEO: string;
  espelhamento: string;
}

// Sample data for solicitações de escolta
export const escoltasData: EscoltaItem[] = [
  {
    id: 1,
    cliente: "Empresa ABC",
    solicitacao: "Escolta de executivo",
    dataInicioPrevisto: "2023-06-01",
    origem: "São Paulo, SP",
    destino: "Campinas, SP",
    tratativas: "Em análise",
    operador: "João Silva",
    numeroEO: "EO-12345",
    espelhamento: "Sim"
  },
  {
    id: 2,
    cliente: "Corporação XYZ",
    solicitacao: "Transporte de valores",
    dataInicioPrevisto: "2023-06-02",
    origem: "Rio de Janeiro, RJ",
    destino: "Niterói, RJ",
    tratativas: "Aprovado",
    operador: "Maria Santos",
    numeroEO: "EO-67890",
    espelhamento: "Não"
  },
  {
    id: 3,
    cliente: "Indústrias LMN",
    solicitacao: "Escolta de carga",
    dataInicioPrevisto: "2023-06-03",
    origem: "Belo Horizonte, MG",
    destino: "Juiz de Fora, MG",
    tratativas: "Pendente",
    operador: "Carlos Oliveira",
    numeroEO: "EO-24680",
    espelhamento: "Sim"
  }
];
