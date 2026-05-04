import type { ReactNode } from 'react';

type StatsCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export default function StatsCard({
  label,
  value,
  icon,
  description,
  trend,
  className = '',
}: StatsCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl glass-panel frozen-border ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-charcoal-500">{label}</p>
          <h3 className="mt-1 text-3xl font-serif text-charcoal-800">
            {value}
          </h3>
          {description && (
            <p className="mt-1 text-xs text-charcoal-400">{description}</p>
          )}
        </div>
        <div className="rounded-xl bg-primary-50 p-2.5 text-primary-600">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className={`flex items-center text-xs font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <svg
              className={`h-3 w-3 ${trend.isPositive ? '' : 'rotate-180'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            {trend.value}%
          </span>
          <span className="text-xs text-charcoal-400">vs mois dernier</span>
        </div>
      )}
    </div>
  );
}
