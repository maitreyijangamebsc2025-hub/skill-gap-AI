import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, FileCode, ExternalLink, Info } from 'lucide-react';
import { EVALUATION_METRICS, MARKET_METADATA } from '../data/marketMetadata';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5 font-semibold">
              Evaluation & Reliability Framework
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Empirical Validation & Extraction Reliability
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {/* Unbenchmarked Status Banner */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/70 text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/70 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100">
                  Integrity Notice
                </span>
                <span className="font-bold text-xs">No Fabricated Validation Metrics</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Quantitative Precision, Recall, and F1 percentages are <strong>intentionally omitted</strong> because no standardized, independently human-annotated multi-institution ground-truth test set is bundled. Fabricating synthetic confusion matrix values or F1 numbers violates academic evaluation standards.
              </p>
            </div>
          </div>

          {/* Metric Status Grid (Explicitly labeled as Unbenchmarked) */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">
                Precision
              </span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-mono block py-1">
                Unbenchmarked
              </span>
              <span className="text-[10px] text-slate-400 block">
                Requires labeled test set
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">
                Recall
              </span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-mono block py-1">
                Unbenchmarked
              </span>
              <span className="text-[10px] text-slate-400 block">
                Requires labeled test set
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold block mb-0.5">
                F1 Score
              </span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 font-mono block py-1">
                Unbenchmarked
              </span>
              <span className="text-[10px] text-slate-400 block">
                Harmonic metric unverified
              </span>
            </div>
          </div>

          {/* Heuristic Rule-Based Matching Framework */}
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Rule-Based Heuristic Matching Hierarchy</span>
              <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Rule-Based Precision</span>
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono uppercase text-[10px] mr-2">Exact Match:</span>
                  <span>Direct canonical string equivalence (e.g. <code>python</code> &rarr; <code>python</code>). Depth 3–4.</span>
                </div>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-[10px]">99% Rule Conf.</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono uppercase text-[10px] mr-2">Synonym Dictionary:</span>
                  <span>Validated tool aliases (e.g. <code>k8s</code> &rarr; <code>kubernetes</code>, <code>sklearn</code> &rarr; <code>scikit-learn</code>).</span>
                </div>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-[10px]">96% Rule Conf.</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono uppercase text-[10px] mr-2">Parent / Child Concept:</span>
                  <span>Broad category to tool (e.g. <code>Deep Learning</code> &harr; <code>TensorFlow</code>, <code>AWS</code> &harr; <code>AWS S3</code>). Classified as Partial (Depth 2).</span>
                </div>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-[10px]">84% Rule Conf.</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-purple-600 dark:text-purple-400 font-mono uppercase text-[10px] mr-2">Related Technology:</span>
                  <span>Complementary architecture (e.g. <code>SQL</code> &harr; <code>Snowflake</code>). Classified as Partial (Depth 1).</span>
                </div>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-[10px]">72% Rule Conf.</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-rose-600 dark:text-rose-400 font-mono uppercase text-[10px] mr-2">Unmatched Gap:</span>
                  <span>No direct, synonym, or parent/child syllabus evidence detected. Classified as Gap (Depth 0).</span>
                </div>
                <span className="font-mono font-bold text-slate-600 dark:text-slate-300 text-[10px]">98% Rule Conf.</span>
              </div>
            </div>
          </div>

          {/* Methodological Transparency Notes */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">
              Handling Ambiguity & False Positive Mitigation
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 text-[11px] text-slate-600 dark:text-slate-400">
              <li>
                <strong>Broad Terms vs. Explicit Technologies:</strong> Generic expressions such as <em>"data pipelines"</em> or <em>"cloud computing concepts"</em> are mapped as <strong>PARTIAL (Theory, Depth 2)</strong> rather than full COVERED status unless a specific platform (e.g. AWS, Spark, Airflow) is explicitly identified.
              </li>
              <li>
                <strong>Parent / Child Disambiguation:</strong> A syllabus teaching <em>Deep Learning</em> does not automatically claim <em>TensorFlow</em>; it is classified as a Parent/Child relation with partial depth credit.
              </li>
              <li>
                <strong>Language vs. Engine:</strong> <em>SQL</em> (the standard query grammar) and <em>PostgreSQL</em> (an RDBMS implementation) are treated as distinct entities rather than synonymous exact matches.
              </li>
              <li>
                <strong>Hallucination Safeguard:</strong> The system extracts and displays literal course codes and module descriptions directly from the syllabus; evidence is never synthesized or fabricated.
              </li>
            </ul>
          </div>

          {/* Market Data Scope & Limitations */}
          <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300">
            <h5 className="font-bold flex items-center gap-1.5 mb-1 text-xs text-slate-900 dark:text-white">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Proxy Demand Scope & Academic Reality</span>
            </h5>
            <p>
              Job posting frequency serves as an informative empirical proxy for industry hiring demand trends, not an exhaustive inventory of the global employment market or foundational educational theory. University curricula legitimately emphasize timeless foundational mathematics, theoretical computer science, and academic breadth that may not appear in short-term job descriptions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition cursor-pointer"
          >
            Close Framework
          </button>
        </div>
      </div>
    </div>
  );
};
