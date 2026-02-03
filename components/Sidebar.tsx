
import React from 'react';
import { JURISDICTIONS } from '../constants';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  selectedJurisdiction: string | null;
  onSelectOverview: () => void;
  onSelectJurisdiction: (name: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  selectedJurisdiction, 
  onSelectOverview, 
  onSelectJurisdiction,
  isCollapsed,
  setIsCollapsed
}) => {
  return (
    <aside className={`flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shrink-0 z-40 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'}`}>
      {/* Brand Section */}
      <div className={`p-6 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 shrink-0">
          <span className="material-symbols-outlined text-2xl">gavel</span>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col animate-in fade-in duration-300">
            <h1 className="text-slate-900 dark:text-white text-base font-black leading-tight tracking-tight">Legal KMS</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Portals</p>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className={`flex-1 px-4 py-2 flex flex-col gap-2 overflow-y-auto custom-scrollbar ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-4 mt-2 ${isCollapsed ? 'hidden' : ''}`}>Main Menu</div>
        <button 
          onClick={onSelectOverview}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
            currentView === 'overview' 
            ? 'bg-primary text-white shadow-xl shadow-primary/25' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          } ${isCollapsed ? 'justify-center' : ''}`}
        >
          <span className="material-symbols-outlined text-2xl">grid_view</span>
          {!isCollapsed && <span className="text-sm font-black">Dashboard</span>}
        </button>
        
        <div className={`text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-4 mt-4 ${isCollapsed ? 'hidden' : ''}`}>Jurisdictions</div>
        {JURISDICTIONS.map((j) => (
          <button 
            key={j} 
            onClick={() => onSelectJurisdiction(j)}
            title={isCollapsed ? j : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
              currentView === 'jurisdiction' && selectedJurisdiction === j
              ? 'bg-primary/10 text-primary'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <span className={`material-symbols-outlined text-2xl ${
              currentView === 'jurisdiction' && selectedJurisdiction === j ? 'text-primary' : 'text-slate-400'
            }`}>
              {j === 'Vietnam' ? 'flag' : j === 'Singapore' ? 'account_balance' : 'public'}
            </span>
            {!isCollapsed && <span className="text-sm font-bold">{j}</span>}
          </button>
        ))}
      </nav>

      {/* Footer & Toggle */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all group"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
            {isCollapsed ? 'side_navigation' : 'keyboard_double_arrow_left'}
          </span>
          {!isCollapsed && <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Collapse</span>}
        </button>
        
        {!isCollapsed && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-md" style={{ backgroundImage: "url('https://picsum.photos/id/64/100/100')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black dark:text-white truncate">Sarah Jenkins</span>
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Partner</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
