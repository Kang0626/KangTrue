'use client';

import React from 'react';
import { X, Code, Layers, FileCode } from 'lucide-react';

interface NodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code?: string;
  description?: string;
}

export const NodeModal: React.FC<NodeModalProps> = ({
  isOpen,
  onClose,
  title,
  code,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-[#0085ca]" />
            <h3 className="text-base font-semibold text-white font-mono">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {description && (
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{description}</p>
          )}

          {code && (
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 text-xs text-slate-400 font-mono">
                <span>Houdini VEX / Python hou API</span>
                <span className="text-[#0085ca]">Production Verified</span>
              </div>
              <pre className="text-xs font-mono text-sky-200 overflow-x-auto leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-3 border-t border-slate-800 bg-slate-900/40">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono rounded bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
