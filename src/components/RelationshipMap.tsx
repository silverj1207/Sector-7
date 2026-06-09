import React from 'react';
import { PEOPLE } from '../data';
import { Users, Shield, Compass } from 'lucide-react';

export const RelationshipMap: React.FC = () => {
  return (
    <div id="relationship-board-root" className="space-y-6">
      {/* CHARACTERS SECTION */}
      <section id="characters-section">
        <h4 className="text-sm font-bold text-zinc-300 mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-emerald-500" /> 핵심 인물 (Main Personnel)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PEOPLE.filter(char => char.isMain || char.id === 'coco').map((char) => (
            <div
              key={char.id}
              className={`p-5 rounded-xl border ${char.isMain || char.id === 'coco' ? 'bg-gradient-to-br from-green-950/10 to-zinc-950 border-zinc-800' : 'bg-zinc-950/40 border-zinc-900'} relative overflow-hidden shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[11px] md:text-xs font-mono tracking-wider font-bold px-1.5 py-0.5 rounded ${char.isMain || char.id === 'coco' ? 'text-green-400 bg-green-950/80 border border-green-900/30' : 'text-zinc-400 bg-zinc-900/80 border border-zinc-800'}`}>
                    {char.id === 'coco' ? '반려묘' : 'PERSONNEL'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className={`text-xl font-black ${char.isMain ? 'text-zinc-100' : 'text-zinc-200'}`}>{char.name}</h4>
                  <div className="text-xs font-bold text-amber-500/90">{char.title}</div>
                  <div className="text-[11px] md:text-xs text-zinc-400 font-mono leading-relaxed mt-1 block">
                    {char.role}
                  </div>
                </div>
              </div>
              
              {char.id !== 'coco' && (
                <div className="grid grid-cols-3 gap-2 mt-5 pt-3 border-t border-zinc-900/60 text-sm font-mono bg-zinc-950/50 p-3 rounded-lg text-center">
                  <div>
                    <span className="text-[11px] md:text-xs text-zinc-500 block uppercase">나이</span>
                    <span className="text-zinc-200 font-bold">{char.age}세</span>
                  </div>
                  <div>
                    <span className="text-[11px] md:text-xs text-zinc-500 block uppercase">MBTI</span>
                    <span className="text-zinc-200 font-bold">{char.mbti}</span>
                  </div>
                  <div>
                    <span className="text-[11px] md:text-xs text-zinc-500 block uppercase">혈액형</span>
                    <span className="text-zinc-200 font-bold truncate block">{char.bloodType}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h4 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-zinc-500" /> 요새 및 외부 지역 관련 인물 (Additional Figures)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PEOPLE.filter(char => !char.isMain && char.id !== 'coco').map((char) => (
            <div
              key={char.id}
              className="p-5 rounded-xl border bg-zinc-950/40 border-zinc-900 relative overflow-hidden flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] md:text-xs font-mono tracking-wider font-bold px-1.5 py-0.5 rounded text-zinc-400 bg-zinc-900/80 border border-zinc-800">
                    PERSONNEL
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-black text-zinc-300">{char.name}</h4>
                  <div className="text-xs font-bold text-amber-500/90">{char.title}</div>
                  <div className="text-[11px] md:text-xs text-zinc-500 font-mono leading-relaxed mt-1 block">
                    {char.role}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-5 pt-3 border-t border-zinc-900/60 text-sm font-mono bg-zinc-950/50 p-3 rounded-lg text-center">
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">나이</span>
                  <span className="text-xs text-zinc-300 font-bold">{char.age}세</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">MBTI</span>
                  <span className="text-xs text-zinc-300 font-bold">{char.mbti}</span>
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 block uppercase">혈액형</span>
                  <span className="text-xs text-zinc-300 font-bold truncate block">{char.bloodType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
