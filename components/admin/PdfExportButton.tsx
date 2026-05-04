import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

type PdfExportButtonProps = {
  data: Record<string, string | number | null>[];
  filename: string;
  label: string;
};

export default function PdfExportButton({
  data,
  filename,
  label,
}: PdfExportButtonProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    const doc = new jsPDF({ orientation: 'landscape' });

    // Title
    doc.setFontSize(18);
    doc.text('Liste des Réservations — Bahor Voyage', 14, 15);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Exporté le : ${new Date().toLocaleString('fr-FR')}`, 14, 22);

    // Prepare table data
    const columns = Object.keys(data[0] || {});
    const rows = data.map((item) => columns.map((col) => item[col] || ''));

    autoTable(doc, {
      startY: 30,
      head: [columns],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [0, 102, 102] }, // Primary color
      styles: { fontSize: 8 },
      margin: { top: 30 },
    });

    doc.save(filename);
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-xl hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {label}
    </button>
  );
}
