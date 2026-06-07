import React, { useState } from 'react';
import { LocationInfo, AirQuality, SecurityLevel } from '../types';
import { LOCATIONS } from '../data';
import { MapPin, Search, Compass, ChevronRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapGridProps {
  onSelectLocation: (loc: LocationInfo) => void;
  selectedLocation: LocationInfo | null;
}

const LOCATION_NUMBERS: Record<string, number> = {
  army_base: 1,
  officer_district: 2,
  user_safehouse: 3,
  barracks: 4,
  training_ground: 5,
  medical_center: 6,
  purification_tower: 7,
  civil_district: 8,
  ration_depot: 9,
  black_market: 10,
  red_light_district: 11,
  quarantine_zone: 12,
  external_gate: 13
};

const CATEGORY_LABELS: Record<string, string> = {
  MILITARY: '군사 전술 지대',
  RESIDENTIAL: '거주/안전 구역',
  SYSTEM: '시스템 정화 필터',
  CIVIL: '민간 거구역 및 배급',
  UNDERWORLD: '음지 암거래소',
  OUTSIDE: '외곽 방벽 게이트'
};

export const MapGrid: React.FC<MapGridProps> = ({ onSelectLocation, selectedLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);

  const getAirColorMark = (air: AirQuality) => {
    switch (air) {
      case 'HIGH_PURITY': return 'bg-emerald-500 text-emerald-100';
      case 'STABLE': return 'bg-cyan-500 text-cyan-100';
      case 'WARNING': return 'bg-amber-500 text-amber-950 font-bold';
      case 'CRITICAL': return 'bg-rose-500 text-rose-150 font-bold';
    }
  };

  const getAirQualityText = (air: AirQuality) => {
    switch (air) {
      case 'HIGH_PURITY': return '1등급 고순도 청정 대기';
      case 'STABLE': return '2등급 보전 안정 대기';
      case 'WARNING': return '3등급 포자 경고 대기';
      case 'CRITICAL': return '4등급 포자 위험 초과 대기';
    }
  };

  const getSecurityLabel = (sec: SecurityLevel) => {
    switch (sec) {
      case 'MAXIMUM': return '삼엄한 철제 봉쇄';
      case 'SECURE': return '정밀 감시 및 치안';
      case 'PATROLLED': return '상시 무장 정찰 배회';
      case 'UNREGULATED': return '무규칙 자치 지대';
      case 'HOSTILE': return '극심한 적대 위협 전방';
    }
  };

  // Plain flat filtered locations
  const filteredLocations = LOCATIONS.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div id="sector7-tactical-map-deck" className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 bg-zinc-900/45 border border-zinc-800/80 rounded-xl p-4 md:p-6 backdrop-blur-md">
      
      {/* 1. LEFT SIDEBAR: Simplified flat directory list */}
      <section id="directory-sidebar-column" className="lg:col-span-5 flex flex-col justify-between space-y-5 order-2 lg:order-1">
        <div className="space-y-3 md:space-y-4">
          <div className="pb-3 border-b border-zinc-800">
            <h3 className="text-base font-bold text-green-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              구역 리스트 ({filteredLocations.length}개 위치)
            </h3>
            <p className="text-[11px] md:text-xs text-zinc-400 leading-normal mt-1.5">
              요새 각 거점의 보안 수칙, 주둔 인원 및 공기 안전 지표를 확인하시려면 목록을 터치하십시오.
            </p>
          </div>

          {/* Quick Clear Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="구역 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/90 border border-zinc-800 rounded-lg px-9 py-2 md:py-2.5 text-xs text-zinc-300 focus:outline-none focus:border-green-500/50 placeholder-zinc-650 transition-all font-sans"
            />
          </div>

          {/* Flat Scrollable List */}
          <div className="space-y-1.5 max-h-[220px] lg:max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              const isHovered = hoveredLocationId === loc.id;
              const numID = LOCATION_NUMBERS[loc.id] || 0;

              return (
                <button
                  key={loc.id}
                  onClick={() => onSelectLocation(loc)}
                  onMouseEnter={() => setHoveredLocationId(loc.id)}
                  onMouseLeave={() => setHoveredLocationId(null)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'bg-green-950/20 border-green-500 text-zinc-100' 
                      : isHovered 
                        ? 'bg-zinc-850/60 border-zinc-700 text-zinc-200' 
                        : 'bg-zinc-950/40 border-zinc-850 text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span className="font-mono text-xs md:text-sm text-green-500/80 font-bold shrink-0 w-6">
                      [{numID}]
                    </span>
                    <div className="truncate">
                      <span className="font-medium font-sans text-xs md:text-sm text-zinc-200 block md:inline-block">
                        {loc.name}
                      </span>
                      <span className="text-[11px] md:text-xs text-zinc-500 md:ml-2 font-mono block md:inline-block">
                        {CATEGORY_LABELS[loc.category] || loc.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] md:text-xs ${
                      loc.airQuality === 'HIGH_PURITY' ? 'bg-emerald-950/70 text-emerald-400' :
                      loc.airQuality === 'STABLE' ? 'bg-cyan-950/70 text-cyan-400' :
                      loc.airQuality === 'WARNING' ? 'bg-amber-950/70 text-amber-400' : 'bg-rose-950/70 text-rose-400'
                    }`}>
                      {loc.airQuality}
                    </span>
                    <ChevronRight className={`h-3.5 w-3.5 text-zinc-600 transition-transform ${isSelected ? 'translate-x-[2px] text-green-400' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Zone Brief Info */}
        <div id="intel-dossier" className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 min-h-[170px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedLocation ? (
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] md:text-xs font-mono text-green-450 tracking-wider">
                      SECTOR_7 / 구역 코드 {LOCATION_NUMBERS[selectedLocation.id] || 0}
                    </span>
                    <h4 className="font-sans font-black text-sm md:text-base text-zinc-100 mt-0.5">
                      {selectedLocation.name}
                    </h4>
                  </div>
                  <span className="text-[11px] md:text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {getSecurityLabel(selectedLocation.securityLevel)}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-zinc-200 leading-relaxed font-sans">
                  {selectedLocation.description}
                </p>

                <div className="space-y-1">
                  <span className="text-[11px] md:text-xs text-zinc-400 block font-mono">주요 검열 설비 및 수칙</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedLocation.keyFeatures.map((feat, idx) => (
                      <span key={idx} className="text-[11px] md:text-xs font-sans px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-850">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-6 space-y-1.5 text-zinc-600">
                <MapPin className="h-6 w-6 text-zinc-700 animate-bounce" />
                <p className="text-xs font-mono">가이드 맵이나 목록에서 구역 장소를 선택해 주십시오.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 2. RIGHT GRAPHIC HUD PANEL: Beautifully simplified geometric map layout */}
      <section id="interactive-radar-hud" className="lg:col-span-7 flex flex-col justify-center space-y-4 order-1 lg:order-2">
        
        {/* Easy-to-read Simplified Legend box (Moved Outside) */}
        <div className="flex justify-end">
          <div className="bg-zinc-900/40 border border-zinc-800/60 px-3 py-2 rounded-lg flex flex-wrap items-center gap-3 select-none">
            <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wide border-r border-zinc-700/50 pr-3">공기 안정도 범례</span>
            <div className="flex items-center gap-3 text-[11px] font-sans font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />고순도</span>
              <span className="flex items-center gap-1.5 text-cyan-400"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />안정기</span>
              <span className="flex items-center gap-1.5 text-amber-400"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" />경고기</span>
              <span className="flex items-center gap-1.5 text-rose-400"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" />안전초과</span>
            </div>
          </div>
        </div>

        {/* Dynamic Map Visual Canvas */}
        <div className="relative bg-zinc-950 rounded-xl border border-zinc-800/90 overflow-hidden aspect-square md:aspect-[4/3] w-full flex items-center justify-center p-4 md:p-6 shadow-inner">
          
          {/* Subtle clean grid layout overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

          {/* Clean compass label overlay */}
          <div className="absolute left-4 top-4 font-mono text-[9.5px] text-zinc-500 pointer-events-none space-y-0.5 select-none z-20">
            <div className="flex items-center gap-1.5 text-zinc-400 font-bold">
              <Compass className="h-3.5 w-3.5 animate-[spin_10s_linear_infinite]" />
              <span>SECTOR 7 TACTICAL HUD MAP</span>
            </div>
            <div>STATUS: ONLINE RECONNAISSANCE</div>
          </div>

          {/* Simple Radial Alignment circles */}
          <div className="absolute w-[90%] md:w-[360px] aspect-square rounded-full border border-zinc-900 pointer-events-none flex items-center justify-center">
            <div className="w-[75%] h-[75%] rounded-full border border-zinc-900/60 flex items-center justify-center">
              <div className="w-[60%] h-[60%] rounded-full border border-dashed border-zinc-900 flex items-center justify-center">
                <div className="w-[30%] h-[30%] rounded-full border border-zinc-900/30" />
              </div>
            </div>

            <div className="absolute w-full h-px bg-zinc-900/40" />
            <div className="absolute h-full w-px bg-zinc-900/40" />

            <span className="absolute top-2 text-[9px] font-mono text-zinc-700 tracking-widest uppercase">N</span>
            <span className="absolute bottom-2 text-[9px] font-mono text-zinc-700 tracking-widest uppercase">S</span>
          </div>

          {/* Locations pins with clean labels */}
          <div id="tactical-map-viewport" className="absolute inset-0 w-full h-full">
            {filteredLocations.map((loc) => {
              const numID = LOCATION_NUMBERS[loc.id] || 0;
              const isSelected = selectedLocation?.id === loc.id;
              const isHovered = hoveredLocationId === loc.id;
              
              const pulseColor = getAirColorMark(loc.airQuality);
              const customCoords = loc.coordinates;

              return (
                <button
                  key={loc.id}
                  onClick={() => onSelectLocation(loc)}
                  onMouseEnter={() => setHoveredLocationId(loc.id)}
                  onMouseLeave={() => setHoveredLocationId(null)}
                  style={{ left: `${customCoords.x}%`, top: `${customCoords.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 p-2.5 flex flex-col items-center cursor-pointer transition-transform duration-200"
                >
                  {/* Gentle shadow pulse under click */}
                  <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-0 duration-300 transition-all ${
                    isSelected || isHovered ? 'opacity-30 scale-125 animate-ping bg-green-500' : ''
                  }`} />
                  
                  {/* Pin Circle */}
                  <div className={`relative h-6.5 w-6.5 rounded-full border transition-all flex items-center justify-center ${
                    isSelected 
                      ? 'border-green-400 bg-zinc-950 ring-4 ring-green-900/45 scale-110'
                      : isHovered 
                        ? 'border-zinc-350 bg-zinc-900 scale-105' 
                        : 'border-zinc-800 bg-zinc-950/90'
                  }`}>
                    {/* Inner core colored circle showing air states */}
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      loc.airQuality === 'HIGH_PURITY' ? 'bg-emerald-500' : 
                      loc.airQuality === 'STABLE' ? 'bg-cyan-500' : 
                      loc.airQuality === 'WARNING' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                  </div>

                  {/* Clean readable floating names */}
                  <span className={`absolute -bottom-5 whitespace-nowrap bg-zinc-950/95 border text-[11px] md:text-xs font-medium font-sans px-1.5 py-0.2 rounded transition-all pointer-events-none ${
                    isSelected 
                      ? 'border-green-500 text-green-400 font-bold z-20 opacity-100 scale-100' 
                      : isHovered 
                        ? 'border-zinc-500 text-zinc-100 z-10 opacity-100 scale-100' 
                        : 'border-zinc-900 text-zinc-500 opacity-70 group-hover:opacity-100'
                  }`}>
                    {numID}. {loc.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
