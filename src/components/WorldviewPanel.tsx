import React from 'react';
import { BookOpen, ShieldAlert, Activity, ArrowRight, Settings, Globe } from 'lucide-react';
import { SYSTEM_OVERVIEW, SPORE_STAGES, ACCESS_PROTOCOLS } from '../data';

export const WorldviewPanel: React.FC = () => {
  return (
    <div id="worldview-board-root" className="space-y-6">
      
      {/* 1. Header & Description */}
      <div className="bg-zinc-900/45 border border-zinc-800 rounded-xl p-5 shadow-sm backdrop-blur-md">
        <h3 className="text-base font-black text-green-400 flex items-center gap-2">
          <Globe className="h-4.5 w-4.5 text-emerald-500" />
          세계관 및 배경 정보 (Worldview & Background)
        </h3>
        <p className="text-xs text-zinc-400 leading-normal mt-1">
          2087년 현재, 요새 도시 {SYSTEM_OVERVIEW.codename}에 얽힌 포자 생태계와 통제 시스템의 통합 개요입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Background Information */}
        <section className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/80 pb-2">
            <BookOpen className="h-4 w-4 text-green-500" />
            <h4 className="text-sm font-bold text-green-400">요새 전경 및 배경 (Background)</h4>
          </div>
          <ul className="space-y-2">
            {SYSTEM_OVERVIEW.atmosphere.map((item, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-600 mt-1.5" />
                <span className="text-xs text-zinc-300 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Spore Infection Stages */}
        <section className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/80 pb-2">
            <Activity className="h-4 w-4 text-red-500" />
            <h4 className="text-sm font-bold text-red-400">포자 감염 진행도 (Infection Stages)</h4>
          </div>
          <div className="space-y-3">
            {SPORE_STAGES.map((stage) => (
              <div key={stage.level} className="bg-zinc-900/30 border border-zinc-800/60 rounded-lg p-3">
                <h5 className="text-xs font-bold text-zinc-200 mb-1 flex items-center gap-2">
                  <span className="text-[10px] bg-red-950/50 text-red-400 px-1.5 py-0.5 rounded border border-red-900/30">STAGE {stage.level}</span>
                  {stage.name}
                </h5>
                <p className="text-[11px] text-zinc-400 mb-2 leading-relaxed">{stage.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {stage.symptoms.map((sym, idx) => (
                    <span key={idx} className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-sm">
                      {sym}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Entry/Exit Protocols */}
      <section className="bg-zinc-950/40 border border-zinc-900 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 border-b border-zinc-800/80 pb-2">
          <Settings className="h-4 w-4 text-amber-500" />
          <h4 className="text-sm font-bold text-amber-400">외부 출입 시스템 (Access & Quarantine Protocols)</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departure */}
          <div>
            <h5 className="text-xs font-bold text-zinc-200 mb-3 flex items-center gap-2 bg-zinc-900/50 px-2 py-1 rounded">
              <ArrowRight className="h-3 w-3 text-emerald-400" /> 나갈 때 (Departure)
            </h5>
            <ol className="space-y-3">
              {ACCESS_PROTOCOLS.exit.map((step) => (
                <li key={step.step} className="flex gap-3">
                  <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-400 mt-0.5">
                    {step.step}
                  </span>
                  <div>
                    <h6 className="text-xs font-bold text-zinc-300">{step.title}</h6>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Arrival */}
          <div>
            <h5 className="text-xs font-bold text-zinc-200 mb-3 flex items-center gap-2 bg-zinc-900/50 px-2 py-1 rounded">
              <ArrowRight className="h-3 w-3 text-amber-400" style={{ transform: 'rotate(180deg)' }} /> 들어올 때 (Arrival)
            </h5>
            <ol className="space-y-3">
              {ACCESS_PROTOCOLS.entry.map((step) => (
                <li key={step.step} className="flex gap-3">
                  <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-400 mt-0.5">
                    {step.step}
                  </span>
                  <div>
                    <h6 className="text-xs font-bold text-zinc-300">{step.title}</h6>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

    </div>
  );
};
