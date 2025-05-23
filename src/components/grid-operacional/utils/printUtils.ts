
import { GridOperacionalItem } from "../types";
import { toast } from "sonner";

export const printCompleteData = (dados: GridOperacionalItem[]) => {
  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #333; margin-bottom: 30px;">Relatório Completo - Grid Operacional</h1>
      <p style="text-align: center; margin-bottom: 30px;">Data: ${new Date().toLocaleDateString('pt-BR')}</p>
      
      ${dados.map(item => `
        <div style="border: 1px solid #ddd; margin-bottom: 20px; padding: 15px; border-radius: 5px; page-break-inside: avoid;">
          <h3 style="color: #333; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Código: ${item.cod}</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div><strong>Data Solicitação:</strong> ${item.dataSolicitacao}</div>
            <div><strong>MTS-OS:</strong> ${item.mtsOs}</div>
            <div><strong>Cliente:</strong> ${item.cliente}</div>
            <div><strong>Placa Auto:</strong> ${item.placaAuto}</div>
            <div><strong>Parceiro:</strong> ${item.parceiro}</div>
            <div><strong>Agente 1:</strong> ${item.agente1}</div>
            <div><strong>Agente 2:</strong> ${item.agente2}</div>
            <div><strong>VTR:</strong> ${item.vtr}</div>
            <div><strong>Origem:</strong> ${item.origem}</div>
            <div><strong>Destino:</strong> ${item.destino}</div>
            <div><strong>Data Início Missão:</strong> ${item.dataMissao}</div>
            <div><strong>Hora Missão:</strong> ${item.horaMissao}</div>
            <div><strong>Hora Equipe:</strong> ${item.horaEquipe}</div>
            <div><strong>Hora Início Real:</strong> ${item.horaInicioReal}</div>
            <div><strong>KM Início:</strong> ${item.kmInicio}</div>
            <div><strong>Data Fim Missão:</strong> ${item.dataFimMissao}</div>
            <div><strong>KM Final:</strong> ${item.kmFinal}</div>
            <div><strong>Hora Final:</strong> ${item.horaFinal}</div>
            <div><strong>Status:</strong> ${item.status}</div>
            <div><strong>Total Hora Missão:</strong> ${item.totalHoraMissao}</div>
            <div><strong>KM Total:</strong> ${item.kmTotal}</div>
          </div>
        </div>
      `).join('')}
      
      <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666;">
        Total de registros: ${dados.length}
      </div>
    </div>
  `;

  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  toast("Enviando relatório completo para impressão");
  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
};

export const printSpecificLine = (codigo: string, dados: GridOperacionalItem[]) => {
  const item = dados.find(d => d.cod === codigo);
  
  if (!item) {
    toast("Código não encontrado!");
    return;
  }

  const printContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="text-align: center; color: #333; margin-bottom: 30px;">Relatório Detalhado - Código: ${item.cod}</h1>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 800px; margin: 0 auto;">
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Código:</strong> ${item.cod}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Data Solicitação:</strong> ${item.dataSolicitacao}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>MTS-OS:</strong> ${item.mtsOs}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Cliente:</strong> ${item.cliente}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Placa Auto:</strong> ${item.placaAuto}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Parceiro:</strong> ${item.parceiro}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Agente 1:</strong> ${item.agente1}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Agente 2:</strong> ${item.agente2}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>VTR:</strong> ${item.vtr}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Origem:</strong> ${item.origem}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Destino:</strong> ${item.destino}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Data Início Missão:</strong> ${item.dataMissao}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hora Missão:</strong> ${item.horaMissao}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hora Equipe:</strong> ${item.horaEquipe}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hora Início Real:</strong> ${item.horaInicioReal}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>KM Início:</strong> ${item.kmInicio}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Data Fim Missão:</strong> ${item.dataFimMissao}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>KM Final:</strong> ${item.kmFinal}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Hora Final:</strong> ${item.horaFinal}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Status:</strong> ${item.status}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Total Hora Missão:</strong> ${item.totalHoraMissao}</div>
        <div style="padding: 10px; border-bottom: 1px solid #eee;"><strong>KM Total:</strong> ${item.kmTotal}</div>
      </div>
    </div>
  `;

  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
};
