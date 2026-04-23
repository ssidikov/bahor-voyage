'use client';

type PdfExportButtonProps = {
  data: Record<string, string | number>[];
  filename: string;
  label: string;
};

export default function PdfExportButton({ label }: PdfExportButtonProps) {
  const handleExport = () => {
    // Add a class to body to hide non-table elements during print
    document.body.classList.add('printing-table');
    window.print();
    document.body.classList.remove('printing-table');
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
