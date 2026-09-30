import React, { useState, useRef } from 'react';
import { X, Upload, Download, RefreshCw, CheckCircle, AlertCircle, FileJson, Search } from 'lucide-react';
import { MarketSkill } from '../types/skills';

interface MarketDataManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketSkills: MarketSkill[];
  onUpdateMarketSkills: (newSkills: MarketSkill[]) => void;
  onResetToDefault: () => void;
}

export const MarketDataManagerModal: React.FC<MarketDataManagerModalProps> = ({
  isOpen,
  onClose,
  marketSkills,
  onUpdateMarketSkills,
  onResetToDefault,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filtered = marketSkills.filter(
    (s) =>
      s.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);

        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error('JSON must be a non-empty array of skill objects.');
        }

        const validSkills: MarketSkill[] = [];
        for (let i = 0; i < parsed.length; i++) {
          const item = parsed[i];
          if (!item.skill || typeof item.skill !== 'string') {
            throw new Error(`Item at index ${i} is missing valid "skill" string.`);
          }
          validSkills.push({
            skill: item.skill.toLowerCase().trim(),
            count: typeof item.count === 'number' ? item.count : 1000,
            demand_pct: typeof item.demand_pct === 'number' ? item.demand_pct : parseFloat(item.demand_pct) || 5.0,
            category: item.category || 'General',
          });
        }

        onUpdateMarketSkills(validSkills);
        setSuccessMsg(`Successfully imported ${validSkills.length} market skills from "${file.name}"!`);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (err: any) {
        setErrorMsg(err.message || 'Invalid JSON file. Please ensure it follows the Kaggle dataset structure.');
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read the uploaded file.');
    };
    reader.readAsText(file);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(marketSkills, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skill_demand_${marketSkills.length}_skills.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">
              Market Benchmark Dataset
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileJson className="w-4 h-4 text-blue-600" />
              Kaggle Job Postings & Skills Demand ({marketSkills.length} active)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-850/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="market-json-upload"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-slate-950 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 transition shadow-2xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Custom JSON
            </button>

            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>

            <button
              onClick={() => {
                onResetToDefault();
                setSuccessMsg('Reset to built-in Kaggle 42 Data Science skills.');
                setErrorMsg(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Default
            </button>
          </div>

          <div className="relative w-48 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search market skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
            />
          </div>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="mx-6 mt-3 p-3 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-3 p-3 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Skills list table */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Skill</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Demand %</th>
                  <th className="py-2.5 px-3 text-right">Job Postings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((item, idx) => (
                  <tr key={`${item.skill}-${idx}`} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
                    <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900 dark:text-white capitalize">
                      {item.skill}
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold text-slate-900 dark:text-slate-100">
                      {item.demand_pct}%
                    </td>
                    <td className="py-2 px-3 text-right text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {item.count ? item.count.toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <span>Showing {filtered.length} of {marketSkills.length} skills</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 font-medium rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
