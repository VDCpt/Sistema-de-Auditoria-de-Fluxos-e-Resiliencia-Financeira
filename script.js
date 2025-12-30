/**
 * VDC - Protocolo de Análise e Resiliência Financeira
 * Engine de Processamento de 12 Pontos de Dados
 */

function calcularFluxos() {
    const bruto = parseFloat(document.getElementById('p9').value) || 0;
    const taxas = parseFloat(document.getElementById('p10').value) || 0;
    
    // Cálculo de IVA (23%)
    const valorIva = (bruto * 0.23).toFixed(2);
    document.getElementById('p11').value = valorIva;

    // Cálculo da Margem Real
    const margem = (bruto - taxas - parseFloat(valorIva)).toFixed(2);
    const percMargem = bruto > 0 ? (margem / bruto) * 100 : 0;
    
    const marginDisplay = document.getElementById('margemFinal');
    const marginBox = document.getElementById('marginBox');
    const riskText = document.getElementById('riskText');

    marginDisplay.innerText = `${margem} €`;

    // Protocolo de Antecipação de Riscos
    if (percMargem < 15 && bruto > 0) {
        marginBox.classList.add('risk-alert');
        marginDisplay.classList.add('text-danger');
        riskText.innerHTML = `⚠️ <strong>ALERTA DE RESILIÊNCIA:</strong> Margem de ${percMargem.toFixed(1)}% abaixo do limiar de segurança.`;
    } else {
        marginBox.classList.remove('risk-alert');
        marginDisplay.classList.remove('text-danger');
        riskText.innerHTML = bruto > 0 ? `✅ Operação dentro dos parâmetros de resiliência (${percMargem.toFixed(1)}%).` : "";
    }
}

function gerarRelatorioForense() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Captura e Conversão em Informação Acionável
    const d = {
        p1: document.getElementById('p1').value,
        p3: document.getElementById('p3').value,
        p5: document.getElementById('p5').value,
        p9: document.getElementById('p9').value,
        p10: document.getElementById('p10').value,
        p11: document.getElementById('p11').value,
        margem: document.getElementById('margemFinal').innerText,
        p12: document.getElementById('p12').value
    };

    // Header VDC
    doc.setFillColor(0, 45, 114);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("ANÁLISE E RESILIÊNCIA FINANCEIRA", 15, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`ID DE AUDITORIA: VDC-PROTOCOL-${Date.now()}`, 15, 30);

    // Tabela de Prova Técnica
    const tableData = [
        ["Ponto de Auditoria", "Valor Processado"],
        ["Data da Operação", d.p1],
        ["Ref. Transação / ID", d.p3],
        ["Entidade", d.p5],
        ["Montante Bruto", `${d.p9} EUR`],
        ["Taxas e Comissões", `${d.p10} EUR`],
        ["IVA Identificado (23%)", `${d.p11} EUR`],
        ["MARGEM REAL LÍQUIDA", d.margem],
        ["Saldo Final Resultante", `${d.p12} EUR`]
    ];

    doc.autoTable({
        startY: 50,
        head: [tableData[0]],
        body: tableData.slice(1),
        theme: 'striped',
        headStyles: { fillColor: [0, 45, 114] },
        styles: { fontSize: 10 }
    });

    // Protocolo de Integridade Digital
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("PARECER TÉCNICO DE CONFERÊNCIA:", 15, finalY);
    doc.setFont("helvetica", "normal");
    doc.text("Os fluxos processados garantem a transparência da operação digital.", 15, finalY + 8);
    doc.text("Este documento constitui prova legal para suporte administrativo.", 15, finalY + 16);

    // Guardar Documento
    doc.save(`VDC_Resiliencia_${d.p3}.pdf`);
}
