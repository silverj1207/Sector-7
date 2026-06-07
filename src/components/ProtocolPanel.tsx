import React, { useState } from 'react';
import { SPORE_STAGES, ACCESS_PROTOCOLS } from '../data';
import { Shield, AlertTriangle, CheckSquare, FileText, Send, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ProtocolPanel: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [checkedProtocols, setCheckedProtocols] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'CLEARED' | 'WARNING' | 'QUARANTINE';
    message: string;
    stage?: number;
  } | null>(null);

  const allProtocols = [
    ...ACCESS_PROTOCOLS.exit.map(p => `[외출] ${p.title}`),
    ...ACCESS_PROTOCOLS.entry.map(p => `[복귀] ${p.title}`)
  ];

  const allSymptoms = [
    "미열 (피부 미온성)", "가벼운 기침 발생", "돌발 오한 기절", "관통성 근육 몸살",
    "폐 통증 (흉막 마찰)", "심한 산소 결핍", "얼굴 및 목 회갈색 혈관", "기억의 순간적 혼선",
    "이질적 감정 소멸", "오염구역 생태계 공명", "피부 외골격 포자화", "타인 포자 감염 유출"
  ];

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleProtocolToggle = (protocol: string) => {
    if (checkedProtocols.includes(protocol)) {
      setCheckedProtocols(checkedProtocols.filter(p => p !== protocol));
    } else {
      setCheckedProtocols([...checkedProtocols, protocol]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      const hasStage4 = selectedSymptoms.some(s => s.includes('변이체') || s.includes('외골격') || s.includes('유출'));
      const hasStage3 = selectedSymptoms.some(s => s.includes('감정 소멸') || s.includes('공명'));
      const hasStage2 = selectedSymptoms.some(s => s.includes('폐') || s.includes('산소') || s.includes('혈관') || s.includes('기억'));
      const hasStage1 = selectedSymptoms.some(s => s.includes('미열') || s.includes('기침') || s.includes('오한') || s.includes('근육통'));
      const maxStageScore = hasStage4 ? 4 : hasStage3 ? 3 : hasStage2 ? 2 : hasStage1 ? 1 : 0;

      const missedProtocols = allProtocols.length - checkedProtocols.length;

      if (maxStageScore >= 3 || hasStage4) {
        setSubmissionResult({
          status: 'QUARANTINE',
          message: '심각한 포자 변이가 의심됩니다. 현 위치에서 대기하십시오. 무장 병력과 음압 의료진이 파견됩니다.',
          stage: maxStageScore
        });
      } else if (maxStageScore >= 1 || missedProtocols > 0) {
        setSubmissionResult({
          status: 'WARNING',
          message: `경미한 감염 증상이 있거나 방역 수칙 이행이 누락되었습니다. 지정된 의료 센터에서 ${missedProtocols > 0 ? '재점검' : '경보 처방'}을 받으십시오.`,
          stage: maxStageScore
        });
      } else {
        setSubmissionResult({
          status: 'CLEARED',
          message: '특이 사항 없음. 방역 수칙을 정상적으로 이행했습니다. 일상 복귀를 허가합니다.',
          stage: 0
        });
      }
    }, 1500);
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setCheckedProtocols([]);
    setSubmissionResult(null);
  };

  if (submissionResult) {
    return (
      <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-8 max-w-2xl mx-auto flex flex-col items-center justify-center text-center space-y-6">
        {submissionResult.status === 'CLEARED' ? (
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-2" />
        ) : submissionResult.status === 'WARNING' ? (
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-2" />
        ) : (
          <div className="relative">
            <Lock className="h-16 w-16 text-rose-500 mb-2 animate-pulse" />
            <Shield className="h-8 w-8 text-rose-400 absolute -bottom-2 -right-2" />
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-zinc-100 font-mono tracking-wider mb-2">
            요새 사령부 판정 결과
          </h2>
          <div className={`text-lg font-black tracking-widest ${
            submissionResult.status === 'CLEARED' ? 'text-emerald-400' :
            submissionResult.status === 'WARNING' ? 'text-amber-400' : 'text-rose-500'
          }`}>
            {submissionResult.status === 'CLEARED' ? 'CLEARANCE GRANTED' :
             submissionResult.status === 'WARNING' ? 'CAUTION ADVISED' : 'QUARANTINE WARRANT ISSUED'}
          </div>
        </div>

        <p className="text-zinc-300 leading-relaxed max-w-md">
          {submissionResult.message}
        </p>

        {submissionResult.stage !== undefined && submissionResult.stage > 0 && (
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-sm font-mono text-zinc-400">
            추정 감염 단계: <strong className={submissionResult.stage >= 3 ? "text-rose-400" : "text-amber-400"}>STAGE {submissionResult.stage}</strong>
          </div>
        )}

        <button 
          onClick={handleReset}
          className="mt-6 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded font-bold transition-colors border border-zinc-700"
        >
          새 보고서 작성
        </button>
      </div>
    );
  }

  return (
    <div id="protocol-tab-panel" className="max-w-3xl mx-auto">
      
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-md shadow-lg shadow-black/50">
        
        {/* Form Header */}
        <div className="border-b border-zinc-800 bg-zinc-950 p-6 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-repeat bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
          <Shield className="h-10 w-10 text-zinc-700" />
          <div>
            <h2 className="text-lg md:text-xl font-black text-zinc-100 tracking-widest font-mono">
              국가 보안 검사 및 감염 자가진단서
            </h2>
            <p className="text-xs text-zinc-500 tracking-widest uppercase mt-1">
              Sector 7 Command • Department of Health and Safety
            </p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Section 1: Protocols */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-200 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-500" />
              제 1항. 방역 수칙 이행 서약서
            </h3>
            <p className="text-xs text-zinc-400 mb-4">본인은 외출 및 요새 복귀 간 아래의 지정된 검역 절차를 모두 성실하게 이행하였음을 확인합니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allProtocols.map((protocol) => {
                const isChecked = checkedProtocols.includes(protocol);
                return (
                  <button
                    key={protocol}
                    onClick={() => handleProtocolToggle(protocol)}
                    className={`px-3 py-2.5 rounded text-left text-xs border flex items-start gap-2.5 transition-all ${
                      isChecked 
                        ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50' 
                        : 'bg-zinc-950/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <CheckSquare className={`h-4 w-4 shrink-0 mt-0.5 ${isChecked ? 'text-emerald-500' : 'text-zinc-700'}`} />
                    <span className="leading-relaxed leading-tight">{protocol}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 2: Symptoms */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-200 border-b border-zinc-800 pb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              제 2항. 감염 자가진단 보고서
            </h3>
            <p className="text-xs text-zinc-400 mb-4">최근 24시간 이내에 본인에게 발현된 모든 증상을 투명하게 체크하십시오. 은폐 시 군법에 회부됩니다.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-2">
              {allSymptoms.map((sym) => {
                const isChecked = selectedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    onClick={() => handleSymptomToggle(sym)}
                    className={`px-3 py-2 rounded text-left text-xs border flex items-center gap-2 transition-all ${
                      isChecked 
                        ? 'bg-rose-950/20 text-rose-400 border-rose-900/50' 
                        : 'bg-zinc-950/50 text-zinc-400 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <CheckSquare className={`h-4 w-4 shrink-0 ${isChecked ? 'text-rose-500' : 'text-zinc-700'}`} />
                    <span className="truncate">{sym}</span>
                  </button>
                );
              })}
            </div>
          </section>

        </div>

        {/* Action Bottom */}
        <div className="bg-zinc-950 border-t border-zinc-800 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#a1a1aa] text-[11px] max-w-sm leading-relaxed text-center sm:text-left">
            위 항목들을 거짓 없이 작성하여 국가 안보 당국과 요새 사령부에 전송합니다.
          </p>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-black tracking-widest rounded transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
                처리 중...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                당국에 제출하기 [보고서 송신]
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
