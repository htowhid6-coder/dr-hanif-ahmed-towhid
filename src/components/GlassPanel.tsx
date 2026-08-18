import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`glass-panel p-6 md:p-10 rounded-2xl shadow-[0_30px_70px_rgba(18,36,31,0.12)] transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
