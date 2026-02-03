
import React, { useState } from 'react';
import { RECENT_KNOWLEDGE, CATEGORIES } from '../constants';
import { KnowledgeEntry } from '../types';

interface JurisdictionViewProps {
  name: string;
  onSelectTopic: (topic: KnowledgeEntry) => void;
}

const JurisdictionView: React.FC<JurisdictionViewProps> = ({ name, onSelectTopic }) => {
  const [filter, setFilter] = useState('All');
  
  const filteredDocs = RECENT_KNOWLEDGE.filter(doc => 
    doc.jurisdiction === name && (filter === 'All' || doc.category === filter)
  );

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-200 dark:border-slate-700">
            {name === 'Vietnam' ? '🇻🇳' : name === 'Singapore' ? '🇸🇬' : '🇹🇭'}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black tracking-tight dark:text-white">{name}</h1>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Active Market</span>
            </div>
            <p className="text-[#4c669a] text-sm">Legal Knowledge Repository & Compliance Tracker</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase text-[#4c669a] tracking-widest">Total Articles</p>
            <p className="text-xl font-bold dark:text-white">452</p>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase text-[#4c669a] tracking-widest">Active Lawyers</p>
            <p className="text-xl font-bold dark:text-white">24</p>
          </div>
          <div className="h-10 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase text-[#4c669a] tracking-widest">Updates (MTD)</p>
            <p className="text-xl font-bold dark:text-white">+18</p>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <span className="material-symbols-outlined text-slate-400 mr-2">filter_list</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              filter === cat 
              ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' 
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase text-[#4c669a] tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">description</span>
            Knowledge Assets ({filteredDocs.length})
          </h2>
          
          {filteredDocs.length > 0 ? (
            filteredDocs.map(doc => (
              <div 
                key={doc.id} 
                onClick={() => onSelectTopic(doc)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-primary text-[10px] font-black uppercase rounded tracking-tighter">
                    {doc.category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-[#4c669a]">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {doc.timestamp} • {doc.readTime}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={doc.avatarUrl} className="size-8 rounded-full border border-slate-200" alt={doc.author} />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold dark:text-white">{doc.author}</span>
                      <span className="text-[10px] text-[#4c669a]">{doc.authorRole}</span>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    View Details
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-20 text-center">
              <span className="material-symbols-outlined text-slate-300 text-6xl mb-4">search_off</span>
              <p className="text-slate-500 font-medium">No documents found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Right Sidebar - Experts & Tools */}
        <div className="space-y-8">
          {/* Market Experts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold dark:text-white">Market Experts</h3>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">verified</span>
            </div>
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                  <img src={`https://picsum.photos/id/${100+i}/40/40`} className="size-10 rounded-full border border-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold dark:text-white">Expert Name {i}</span>
                    <span className="text-[10px] text-[#4c669a]">Local Associate • 12+ Articles</span>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors mt-2">
                Contact Legal Team
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">offline_bolt</span>
              Regulatory Monitor
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              New Decree draft for {name} data privacy is currently under public consultation until Oct 15.
            </p>
            <button className="text-xs font-black uppercase text-primary tracking-widest flex items-center gap-1 hover:underline">
              Read Briefing
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionView;
