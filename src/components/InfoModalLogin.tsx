'use client';

import React from 'react';

interface InfoModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModalLogin({ isOpen, onClose, title, content }: InfoModalLoginProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-white/15 rounded-3xl p-8 text-white shadow-2xl">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors cursor-pointer text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-black tracking-wider text-yellow-400 uppercase mb-4">
          {title}
        </h2>

        <p className="text-white/80 text-sm leading-relaxed mb-8">
          {content}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full bg-yellow-400 text-black font-black uppercase text-xs tracking-widest py-3.5 rounded-xl hover:bg-yellow-300 transition-colors cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}