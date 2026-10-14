import React from 'react';
import type { LeadStatus } from '../../types';

interface BadgeProps {
  status: LeadStatus | string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const styles: Record<string, { bg: string; text: string; border: string; label: string }> = {
    new: {
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-800/60',
      label: 'New Lead',
    },
    contacted: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-800 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-800/60',
      label: 'Contacted',
    },
    qualified: {
      bg: 'bg-purple-50 dark:bg-purple-950/60',
      text: 'text-purple-800 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-800/60',
      label: 'Qualified',
    },
    closed: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      label: 'Closed / Won',
    },
  };

  const current = styles[status] || {
    bg: 'bg-gray-100 dark:bg-white/10',
    text: 'text-gray-700 dark:text-gray-200',
    border: 'border-gray-200 dark:border-white/10',
    label: status,
  };

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${current.text} ${current.border} ${sizeClass}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 shrink-0 opacity-80" />
      {current.label}
    </span>
  );
};
