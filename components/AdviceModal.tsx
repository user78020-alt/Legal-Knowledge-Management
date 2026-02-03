
import React, { useState } from 'react';
import { generateLegalDraft } from '../services/geminiService';
import { GenerationResult } from '../types';

interface AdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdviceModal: React.FC<AdviceModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const data = await generateLegalDraft(input);
      setResult(data);
    } catch (err) {
      alert("Failed to generate draft. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-primary text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">auto_awesome</span>
            AI Legal Draft Assistant
          </h2>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Describe the situation or notes</label>
            <textarea
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-primary focus:border-primary min-h-[120px]"
              placeholder="e.g., Update on new labor law changes in Vietnam regarding overtime pay..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {!result && (
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                  Generating draft...
                </>
              ) : (
                'Generate KMS Article Draft'
              )}
            </button>
          )}

          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-lg text-primary mb-2">{result.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{result.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white dark:bg-slate-700 text-[10px] font-bold uppercase rounded border border-slate-200 dark:border-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="flex-1 py-3 text-sm font-bold border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Edit Input
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-blue-700"
                >
                  Save to KMS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdviceModal;
