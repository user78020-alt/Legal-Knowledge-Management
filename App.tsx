
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AdviceModal from './components/AdviceModal';
import JurisdictionView from './components/JurisdictionView';
import TopicView from './components/TopicView';
import { STATS, MATRIX_DATA, RECENT_KNOWLEDGE, JURISDICTIONS, CATEGORIES } from './constants.tsx';
import { ViewType, KnowledgeEntry } from './types';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeEntry | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterArea, setFilterArea] = useState('All');

  const getArticleColor = (count: number) => {
    if (count > 100) return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
    if (count > 20) return "bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-500";
    if (count > 5) return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
    return "bg-slate-100 dark:bg-slate-800 text-slate-500";
  };

  const handleSelectOverview = () => {
    setCurrentView('overview');
    setSelectedJurisdiction(null);
    setSelectedTopic(null);
  };

  const handleSelectJurisdiction = (name: string) => {
    setCurrentView('jurisdiction');
    setSelectedJurisdiction(name);
    setSelectedTopic(null);
  };

  const handleSelectTopic = (topic: KnowledgeEntry) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
  };

  // Logic lọc dữ liệu Dashboard dựa trên các tiêu chí: Topic (title), User (author), Country, Area
  const filteredKnowledge = useMemo(() => {
    return RECENT_KNOWLEDGE.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = filterCountry === 'All' || item.jurisdiction === filterCountry;
      const matchesArea = filterArea === 'All' || item.category === filterArea;
      return matchesSearch && matchesCountry && matchesArea;
    });
  }, [searchQuery, filterCountry, filterArea]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center items-center lg:p-6 transition-colors duration-300">
      {/* Boxed Layout Container */}
      <div className="w-full max-w-[1280px] h-screen lg:h-[calc(100vh-3rem)] bg-white dark:bg-background-dark shadow-2xl flex overflow-hidden lg:rounded-3xl border border-slate-200 dark:border-slate-800">
        
        <Sidebar 
          currentView={currentView}
          selectedJurisdiction={selectedJurisdiction}
          onSelectOverview={handleSelectOverview}
          onSelectJurisdiction={handleSelectJurisdiction}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header onNewAdvice={() => setIsModalOpen(true)} />
          
          <div className="flex-1 overflow-hidden relative min-h-0">
            {currentView === 'overview' && (
              <div className="h-full overflow-y-auto custom-scrollbar p-10 space-y-12 animate-in fade-in slide-in-from-left-2 duration-500">
                
                {/* Unified Search & Filters Header */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 space-y-6">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight dark:text-white">Knowledge Hub</h1>
                    <p className="text-slate-500 text-base font-medium">Search for advice by topic, country, area or contributor.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6 relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                      <input 
                        type="text" 
                        placeholder="Search topics or users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-base focus:ring-primary focus:border-primary shadow-sm"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <select 
                        value={filterCountry}
                        onChange={(e) => setFilterCountry(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-primary appearance-none cursor-pointer"
                      >
                        <option value="All">All Countries</option>
                        {JURISDICTIONS.map(j => <option key={j} value={j}>{j}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <select 
                        value={filterArea}
                        onChange={(e) => setFilterArea(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold focus:ring-primary appearance-none cursor-pointer"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c === 'All' ? 'All Areas' : c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-3 hover:shadow-lg transition-all group">
                      <div className="flex items-center justify-between">
                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        <span className={`material-symbols-outlined text-2xl ${stat.icon === 'history_edu' ? 'text-amber-500' : 'text-primary'}`}>
                          {stat.icon}
                        </span>
                      </div>
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-black dark:text-white leading-none">{stat.value}</p>
                        <p className={`${stat.trendColor} text-xs font-black mb-1`}>{stat.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Jurisdiction Matrix */}
                  <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col">
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <h2 className="text-lg font-black dark:text-white uppercase tracking-wider">Jurisdiction Matrix</h2>
                      <button className="text-xs font-black text-primary hover:underline uppercase tracking-widest">Full Analytics</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800/30">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 border-b border-slate-100 dark:border-slate-800">Practice Area</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 border-b border-slate-100 dark:border-slate-800 text-center">VN</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 border-b border-slate-100 dark:border-slate-800 text-center">SG</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 border-b border-slate-100 dark:border-slate-800 text-center">TH</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {MATRIX_DATA.map((row) => (
                            <tr key={row.area} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                              <td className="px-6 py-5 font-bold text-sm text-slate-800 dark:text-slate-300">{row.area}</td>
                              <td className="px-6 py-5 text-center">
                                <button onClick={() => handleSelectJurisdiction('Vietnam')} className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${getArticleColor(row.vietnam)}`}>
                                  {row.vietnam}
                                </button>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <button onClick={() => handleSelectJurisdiction('Singapore')} className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${getArticleColor(row.singapore)}`}>
                                  {row.singapore}
                                </button>
                              </td>
                              <td className="px-6 py-5 text-center">
                                <button onClick={() => handleSelectJurisdiction('Thailand')} className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${getArticleColor(row.thailand)}`}>
                                  {row.thailand}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Filtered Feed */}
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shadow-sm max-h-[700px]">
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
                      <h2 className="text-lg font-black dark:text-white uppercase tracking-wider">Search Results</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredKnowledge.map((entry) => (
                          <div 
                            key={entry.id} 
                            onClick={() => handleSelectTopic(entry)}
                            className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group"
                          >
                            <span className="text-[9px] font-black uppercase text-primary tracking-[0.2em] mb-1 block">{entry.jurisdiction} • {entry.category}</span>
                            <h3 className="font-bold text-sm mb-4 group-hover:text-primary transition-colors leading-tight dark:text-slate-200">
                              {entry.title}
                            </h3>
                            <div className="flex items-center gap-3">
                              <img src={entry.avatarUrl} className="size-8 rounded-full border border-white dark:border-slate-800 shadow-sm" alt={entry.author} />
                              <div className="flex flex-col">
                                <span className="text-xs font-black dark:text-white">{entry.author}</span>
                                <span className="text-[10px] text-slate-500 font-medium">{entry.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredKnowledge.length === 0 && (
                          <div className="p-12 text-center text-slate-400 text-sm font-bold italic">No results found matching your filters.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'jurisdiction' && selectedJurisdiction && (
              <JurisdictionView 
                name={selectedJurisdiction} 
                onSelectTopic={handleSelectTopic}
              />
            )}

            {currentView === 'topic' && selectedTopic && (
              <TopicView 
                article={selectedTopic} 
                onBack={() => selectedJurisdiction ? setCurrentView('jurisdiction') : handleSelectOverview()}
                onSelectTopic={handleSelectTopic}
              />
            )}
          </div>
        </main>
      </div>

      <AdviceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;
