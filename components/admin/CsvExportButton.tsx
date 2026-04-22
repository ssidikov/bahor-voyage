'use client';

type CsvRow = Record<string, string | number | null | undefined>;

interface CsvExportButtonProps {
  data: CsvRow[];
  filename: string;
  label?: string;
}

function escapeCsv(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function CsvExportButton({
  data,
  filename,
  label = 'Exporter CSV',
}: CsvExportButtonProps) {
  const handleExport = () => {
    if (!data.length) return;
    const first = data[0];
    if (!first) return;

    const headers = Object.keys(first);
    const rows = data.map((row) =>
      headers.map((h) => escapeCsv(row[h])).join(','),
    );
    const csv = [headers.join(','), ...rows].join('\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!data.length}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-border-soft text-charcoal-600 text-sm font-medium rounded-xl hover:bg-sand-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2v8m0 0L5.5 7.5M8 10l2.5-2.5M3 14h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </button>
  );
}
