
import React, { useMemo, useEffect } from 'react';
import { KnowledgeEntry } from '../types';
import { RECENT_KNOWLEDGE } from '../constants';

interface TopicViewProps {
  article: KnowledgeEntry;
  onBack: () => void;
  onSelectTopic: (topic: KnowledgeEntry) => void;
}

const TopicView: React.FC<TopicViewProps> = ({ article, onBack, onSelectTopic }) => {
  // Extract headings for TOC
  const headings = useMemo(() => {
    if (!article.content) return [];
    const matches = article.content.match(/^##\s+(.*)/gm);
    return matches?.map(m => m.replace('## ', '')) || [];
  }, [article.content]);

  // Auto-scroll to top when article changes
  useEffect(() => {
    const mainContent = document.getElementById('article-scroll-container');
    if (mainContent) mainContent.scrollTop = 0;
  }, [article.id]);

  return (
    <div className="absolute inset-0 flex flex-col bg-white dark:bg-background-dark animate-in fade-in duration-300">
      {/* Top Action Bar */}
      <div className="h-16 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl z-30">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back
          </button>
          <div className="h-6 w-px bg-slate-200 dark:border-slate-800" />
          <nav className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="hover:text-primary cursor-pointer">KMS</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary cursor-pointer">{article.jurisdiction}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">{article.category}</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-primary transition-all rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined text-[22px]">star</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export PDF
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* TOC Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 hidden lg:flex flex-col p-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-6">Briefing Outline</h3>
              <ul className="space-y-4">
                {headings.map((heading, idx) => (
                  <li key={idx}>
                    <a 
                      href={`#section-${idx}`} 
                      className="text-[13px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-all flex items-center gap-3 group"
                    >
                      <span className="size-1 rounded-full bg-slate-300 group-hover:bg-primary transition-all shrink-0" />
                      <span className="truncate">{heading}</span>
                    </a>
                  </li>
                ))}
                <li className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <a href="#qa-section" className="text-[13px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-all flex items-center gap-3">
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                    Expert Q&A
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <main 
          id="article-scroll-container"
          className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 scroll-smooth custom-scrollbar"
        >
          <div className="max-w-3xl mx-auto px-10 lg:px-16 py-12 space-y-12">
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={article.avatarUrl} className="size-16 rounded-2xl border-2 border-white dark:border-slate-800 shadow-xl" alt={article.author} />
                    <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[12px] font-black">check</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold dark:text-white leading-tight">{article.author}</span>
                    <span className="text-sm text-slate-500 font-medium">{article.authorRole}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Modified</span>
                  <p className="text-base font-bold dark:text-white">{article.timestamp}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg tracking-wider">
                    {article.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase rounded-lg tracking-wider">
                    {article.jurisdiction}
                  </span>
                  <div className="size-1 rounded-full bg-slate-300" />
                  <span className="text-xs text-slate-400 font-medium">{article.readTime} read</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  {article.title}
                </h1>
              </div>
            </div>

            <article className="prose prose-slate dark:prose-invert max-w-none">
              <div className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-medium space-y-12">
                {article.content?.split('## ').map((section, idx) => {
                  if (idx === 0) return <p key={idx} className="text-xl font-semibold leading-relaxed text-slate-500 italic border-l-4 border-primary/20 pl-6 mb-12">{section}</p>;
                  const [title, ...content] = section.split('\n');
                  return (
                    <div key={idx} id={`section-${idx-1}`} className="pt-4">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                        <span className="text-primary text-sm font-black opacity-30">{String(idx).padStart(2, '0')}</span>
                        {title}
                      </h2>
                      <div className="whitespace-pre-wrap pl-8 border-l border-slate-100 dark:border-slate-800">
                        {content.join('\n')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Q&A section */}
            <section id="qa-section" className="space-y-8 pt-12 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-bold dark:text-white flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">forum</span>
                Regional Q&A
              </h3>
              <div className="space-y-6">
                {article.communityQA?.map((qa, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
                        {qa.user.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{qa.user}</span>
                      <span className="text-[10px] font-medium text-slate-400 ml-auto">{qa.timestamp}</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white italic mb-8">
                      "{qa.question}"
                    </p>
                    {qa.answer && (
                      <div className="pl-6 border-l-2 border-primary/20 relative">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2">Council Briefing</span>
                        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {qa.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        {/* Attachment Sidebar */}
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10 hidden xl:flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] dark:text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">folder_zip</span>
              Vault Assets
            </h3>
          </div>
          <div className="flex-1 p-8 space-y-6">
            {article.attachments?.map((file, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    <span className="material-symbols-outlined text-2xl">{file.type === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors leading-tight">{file.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold mt-1">{file.size}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-slate-900 dark:bg-primary/20 rounded-3xl p-8 text-white space-y-6 shadow-2xl">
              <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">contact_support</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold uppercase tracking-wider">Expert Advice</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need direct application of this advice for a specific client mandate? Schedule a briefing.
                </p>
              </div>
              <button className="w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                Request Call
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TopicView;
