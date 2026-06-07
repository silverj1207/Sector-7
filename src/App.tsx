import { useState } from 'react';
import { SYSTEM_OVERVIEW, LOCATIONS } from './data';
import { LocationInfo } from './types';
import { MapGrid } from './components/MapGrid';
import { RelationshipMap } from './components/RelationshipMap';
import { ProtocolPanel } from './components/ProtocolPanel';
import { AudioPlayer } from './components/AudioPlayer';
import { Map, Users, ShieldCheck, Compass, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'relationships' | 'protocols'>('map');
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(LOCATIONS[0]);

  const selectLocationFromParent = (loc: LocationInfo) => {
    setSelectedLocation(loc);
  };

  return (
    <div id="core-app-container" className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-800/30">
      
      {/* Top Simple Notification bar */}
      <div className="bg-emerald-950/30 border-b border-emerald-900/30 py-2.5 px-4 text-center">
        <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-2">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>[알림] 대기 포자 농도 경고 단계 유지 중. 구역 출고 시 개인 필터 밀봉 장비를 필수 소지하십시오.</span>
        </p>
      </div>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 flex flex-col justify-between">
        
        {/* Simple & Clean Header */}
        <header id="console-header" className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800/85 pb-6 gap-4">
          <div className="space-y-1.5">
            <h1 className="font-display font-black text-2xl tracking-wider text-green-400 flex items-center gap-2">
              <Compass className="h-6 w-6 text-green-500 animate-[spin_12s_linear_infinite]" />
              {SYSTEM_OVERVIEW.codename} 통합 기밀 데이터베이스
            </h1>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-3xl">
              2087년 로키산맥 인근에 위치한 인류 요새 <strong className="text-zinc-200 font-semibold">'섹터 7'</strong>의 지도 정보, 인물 상호관계 및 감염 예방 행동 수칙을 제공하는 종합 안내판입니다.
            </p>
          </div>
          
          {/* Quick HUD Meter & Audio */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
            <AudioPlayer />
            <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2.5">
              <div className="text-left font-mono text-[11px] space-y-0.5">
                <span className="text-zinc-500 block">정화 여과 상태</span>
                <span className="text-emerald-400 font-black">● STABLE STATE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Clean Modern Navigation Tabs */}
        <div id="navigation-root" className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <button
            onClick={() => setActiveTab('map')}
            className={`py-3.5 px-4 rounded-lg text-xs font-bold tracking-wider font-display uppercase border transition-all flex items-center justify-center gap-2 ${
              activeTab === 'map'
                ? 'bg-zinc-900 text-green-400 border-green-500/50 shadow-md shadow-green-950/10'
                : 'bg-zinc-950/40 text-zinc-500 border-zinc-900 hover:text-zinc-300 hover:border-zinc-800'
            }`}
          >
            <Map className="h-4 w-4" />
            01. SECTOR 7 구역 지도
          </button>
          <button
            onClick={() => setActiveTab('relationships')}
            className={`py-3.5 px-4 rounded-lg text-xs font-bold tracking-wider font-display uppercase border transition-all flex items-center justify-center gap-2 ${
              activeTab === 'relationships'
                ? 'bg-zinc-900 text-green-400 border-green-500/50 shadow-md shadow-green-950/10'
                : 'bg-zinc-950/40 text-zinc-500 border-zinc-900 hover:text-zinc-300 hover:border-zinc-800'
            }`}
          >
            <Users className="h-4 w-4" />
            02. SECTOR 7 인물 관계도
          </button>
          <button
            onClick={() => setActiveTab('protocols')}
            className={`py-3.5 px-4 rounded-lg text-xs font-bold tracking-wider font-display uppercase border transition-all flex items-center justify-center gap-2 ${
              activeTab === 'protocols'
                ? 'bg-zinc-900 text-green-400 border-green-500/50 shadow-md shadow-green-950/10'
                : 'bg-zinc-950/40 text-zinc-500 border-zinc-900 hover:text-zinc-300 hover:border-zinc-800'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            03. 감염 자가진단 보고서
          </button>
        </div>

        {/* Tab Components Render View */}
        <div id="content-display-port" className="min-h-[500px]">
          {activeTab === 'map' && (
            <MapGrid 
              onSelectLocation={selectLocationFromParent} 
              selectedLocation={selectedLocation} 
            />
          )}

          {activeTab === 'relationships' && (
            <RelationshipMap />
          )}

          {activeTab === 'protocols' && (
            <ProtocolPanel />
          )}
        </div>

        {/* Simple elegant footer */}
        <footer className="text-center text-[11px] font-mono text-zinc-650 pt-8 border-t border-zinc-900/60">
          <p>© 2087 섹터 7 요새 민간정보국 코덱스 시스템</p>
        </footer>

      </div>
    </div>
  );
}
