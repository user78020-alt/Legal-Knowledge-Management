
import React from 'react';

interface HeaderProps {
  onNewAdvice: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewAdvice }) => {
  return (
    <header className="h-16 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Legal Intelligence & Knowledge Network</span>
      </div>
      <div className="flex items-center gap-6">
        <button 
          onClick={onNewAdvice}
          className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Draft Insight</span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
        <button className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
