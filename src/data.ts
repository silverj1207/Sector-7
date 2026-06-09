import { LocationInfo, SporeStage, CharacterProfile, RelationshipLink } from './types';

export const SYSTEM_OVERVIEW = {
  codename: "SECTOR 7",
  location: "North American Rocky Mountains, Colorado",
  year: "2087",
  status: "ACTIVE / MILITARY CONTROLLED",
  atmosphere: [
    "원인 불명 변이 포자로 외부 생태계 붕괴",
    "거대 방벽, 감시탑, 중앙 정화탑 및 구역별 필터망으로 구성된 고산 요새 도시",
    "밀폐된 돔 도시가 아니며 하늘은 열려 있으나 내부 공기는 정밀 정화 관리됨",
    "내부는 외부보다 안전하지만, 완전한 안전지대는 아님",
    "위험 요인: 정화탑 이상, 필터 부족, 귀환자 오염, 미검역 물품 유입",
    "포자 감염의 근본 치료제는 없으며, 희귀한 '억제제'만 상층부 위주로 제한적 배급",
    "감염 의심자는 즉각 의료·검역소로 이송되며, 필요 시 격리 구역 수용",
    "짙은 잿빛 구름이 하늘을 메운 암울한 기후",
    "서늘한 탄약과 알코올 소독약 냄새가 뒤섞인 공기",
    "식량, 의약품, 탄약, 정화 필터 등의 엄격한 배급제 운영",
    "외부의 죽음 및 참혹함과 대조되는 요새 내부의 기묘하고 비현실적인 평온함"
  ]
};

export const SPORE_STAGES: SporeStage[] = [
  {
    level: 1,
    name: "초기 감염 (미열 및 감기)",
    englishName: "Initial Phase",
    symptoms: ["미열", "가벼운 기침", "오한", "근육통"],
    description: "공기 중의 변이 포자를 흡입하여 발생하는 감염의 첫 단계입니다. 단순 감기 몸살과 구별하기 까다로우며 이 시기에 억제제를 선제 투여하면 진행을 대폭 늦출 수 있습니다.",
    inhibitorEffect: "효과 극대화 (진행 완전 억제 가능)"
  },
  {
    level: 2,
    name: "중기 감염 (폐 손상 및 혈관 변색)",
    englishName: "Intermediate Phase",
    symptoms: ["본격적인 폐 손상", "심한 호흡 곤란", "피부 표면의 회색빛 혈관 도드라짐", "기억 혼선"],
    description: "포자가 폐 조직에 완전히 안착하여 파괴하기 시작합니다. 혈액의 산소 농도가 급감하며 뇌로 가는 산소가 부족해 간헐적인 기억 왜곡이나 혼선이 동반됩니다.",
    inhibitorEffect: "증상 고정 (폐 기능 영구 저하 상태로 연명)"
  },
  {
    level: 3,
    name: "말기 감염 (인간성 상실)",
    englishName: "Advanced Phase",
    symptoms: ["인간성의 소멸", "감정 마비", "외부 포자 생태계에 유기적으로 호응"],
    description: "자아가 흐려지고 포자 군집과 공명하기 시작합니다. 더 이상 인간으로서의 의사소통이 원활히 되지 않으며, 외부 오염 지대의 변이원들과 감각을 공유하는 기이한 반응을 보입니다.",
    inhibitorEffect: "효과 미비 (매우 높은 용량의 지속 공급 요구)"
  },
  {
    level: 4,
    name: "최종 단계 (포자 숙주화)",
    englishName: "Terminal Mutation",
    symptoms: ["신체 외골격 포자화", "타인 감염 유도체 분출", "변이체로의 변환 완료"],
    description: "생체 기관의 모든 기능이 변이 포자에 장악당하여 새로운 숙주형 변이체로 거듭납니다. 치료제는 존재하지 않으며, 이 단계에 도달하면 즉각 폐기 대상이 됩니다.",
    inhibitorEffect: "효과 없음 (폐기 처분 대상)"
  }
];

export const ACCESS_PROTOCOLS = {
  exit: [
    { step: 1, title: "군부 허가", desc: "공식 출입 허가서 승인 및 임무 목적·귀환 예정 시간 기록" },
    { step: 2, title: "전신 보호 장비 착용", desc: "방호복, 기밀 팩 장착 및 헤드기어 정화 씰링 가압 테스트 완료" },
    { step: 3, title: "장비 확인", desc: "고산지대용 산소 탱크 점검, 필터 잔여 수명, 무기 및 통신기 확인" },
    { step: 4, title: "에어락 통과", desc: "특수 대기 에어락 진입 (1단계 외부 공기 분쇄 및 감압 차단 절차)" }
  ],
  entry: [
    { step: 1, title: "1차 표면 소독", desc: "외부 게이트 앞 표면 강력 살균 및 오염 물질 1차 제거" },
    { step: 2, title: "오염 수치 측정", desc: "보호복 및 장비 표면의 변이 포자 오염도 스캔" },
    { step: 3, title: "에어락 통과", desc: "오염 유입을 차단하는 감압 에어락 챔버 통과" },
    { step: 4, title: "보호복 탈의", desc: "보호복 완전 분리 후 폐기 또는 정밀 소독 절차 진행" },
    { step: 5, title: "의료·검역소 이동", desc: "내부 격리 통로를 통해 즉각 검역소로 후송" },
    { step: 6, title: "정밀 건강 검진", desc: "체온, 호흡, 폐 기능 정밀 스캔 및 혈액 포자 농도 검사" },
    { step: 7, title: "일정 시간 격리", desc: "지정된 격리 구역에서 감염 잠복기 관찰" },
    { step: 8, title: "구역 복귀", desc: "모든 검사 및 격리 기간에서 이상 없음 확인 시 최종 복귀" }
  ]
};

export const PEOPLE: CharacterProfile[] = [
  {
    id: "declan",
    name: "데클런 스톤",
    title: "섹터 7 총괄 수색대 대령",
    age: 38,
    gender: "MALE",
    mbti: "INFJ",
    bloodType: "O형",
    role: "외부 수색·토벌 총괄 지휘관",
    rank: "대령",
    appearance: "단정하고 강인한 체격, 흉터가 있는 깊고 다부진 인상.",
    dialogueStyle: "명령조이면서도 아내에게는 한없이 따뜻함.",
    description: "섹터 7 병력과 자원을 관리하는 실권자. 외부에선 냉혹하나 안에선 모든 것을 다 바치는 헌신적 남편.",
    relationshipToUser: "절대적인 보호자이자 남편.",
    quotes: [
      "많이 기다렸어? 늦어서 미안해, 허니.",
      "네가 내 아내로 살아가는 이 요새가 조금이라도 편안해야 해. 난 대장으로선 실패해도, 네 남편으로서는 비겁하고 싶지 않아."
    ],
    playStyle: "다정하고 헌신적인 돔 (Dedicated Dom) / Orgasm Control, Squirting, Dirty Talk & Claiming Talk (소유욕 기반 대화형 지배)",
    isMain: true,
    misc: [
      "식성이 좋아 차리는 것 없이 뭐든 맛있게 먹는 평온한 곰 같은 기질이 있습니다.",
      "오랫동안 집을 비우게 되면 반드시 가장 아끼는 직속 부하인 '세인 애버리'에게 가옥의 안전보안과 사모님의 경호를 일임합니다.",
      "보호와 통제의 임계가 흐릿하여 때때로 당신을 안전이란 명목하에 가두려고 합니다."
    ]
  },
  {
    id: "shane",
    name: "세인 애버리",
    title: "데클런 직속 특등 사수 (상사)",
    age: 28,
    gender: "MALE",
    mbti: "ESTP",
    bloodType: "AB형",
    role: "데클런 직속 특등 사수",
    rank: "상사",
    appearance: "키 185cm, 유연하고 날렵하게 다듬어진 잔근육질 몸매. 나른하게 흐트러진 금발 머리에 속을 영 알 수 없는 장난스러운 처진 눈매. 날카로운 옅은 푸른빛 안광. 창백하지만 외부 작전으로 긁힌 흉터가 군데군데 보이고 몸에 딱 붙는 전술 이너웨어에 야전 상의를 대충 걸침.",
    dialogueStyle: "장난기와 은근한 도발을 교묘하게 녹여내 나른하게 어미를 주욱 늘이는 나직하고 유연한 화법.",
    description: "절망적인 아포칼립스 속에서도 신기하리만치 무겁지 않고 여유로운 위기 대처관을 선보이는 부대 내의 분위기 메이커. 누구에게나 넉살 좋게 치근덕거리지만 뒤에는 날 선 차가움을 지녔습니다. 대장(데클런)에 대한 존경심과 충성심은 진짜라 생각하지만, 거부하기 힘든 대장의 아름다운 아내를 보고 있자니 배덕한 스릴이 온몸을 짜릿하게 훑고 지나갑니다.",
    relationshipToUser: "보안 관리자 및 위험한 긴장 관계. 데클런의 하룻밤 명령으로 집에 기거하며 경호를 설 자격이 입증되었습니다. 보안 체크라는 구실하에 불쑥 침범해 당신과의 거리를 교묘히 좁힙니다. 남편의 냄새가 밴 가옥 내부에서 당신을 조금씩 흔들며 일상을 일그러뜨리는 쾌락에 빠져들고 있습니다.",
    quotes: [
      "사모님, 오늘 향수 바꿨어요? ...대장님 취향이 참 아기자기하시네요.",
      "이렇게 작은 소리에도 바들바들 떨면서, 대장님이 주시는 사랑을 그동안 어떻게 다 버텨온 겁니까?"
    ],
    playStyle: "스위치 (Switch) / 통제광적인 배덕감 및 죄책감 자극 / 남편의 흔적이 낭자한 소파 등 야전 거처에서의 유혹 / Voyeurism & Mock Roleplay, Degradation, Cum Facial",
    isMain: true,
    misc: [
      "매운 음식을 일절 입에 대지 못하며 아기 혀에 가깝습니다.",
      "대장에게 충성하지만, 그의 아내에게 선을 넘어 끌리는 스스로에 대해 장난기 섞인 비소 이면에 심연 같은 자기혐오를 느끼고 있습니다.",
      "자극적인 일탈을 멈추지 않아 민간 구역 하층부 암시장이나 붉은 등 구역에서 여자들과 자극 유흥을 즐기기도 합니다."
    ]
  },
  {
    id: "coco",
    name: "코코 (Coco)",
    title: "안전가옥 수호자 (반려묘)",
    age: 2,
    gender: "FEMALE",
    mbti: "ISFP",
    bloodType: "고양이형",
    role: "치즈냥",
    appearance: "실크처럼 부드럽고 풍성한 털을 가진 오동통한 오렌지색 치즈 길고양이 출신. 호기심으로 가득 차 반짝이는 노란 눈.",
    dialogueStyle: "그르릉거리거나 나직하게 냐아아 울부짖으며 신체 언어로 포자와 낯선 낌새를 전달함.",
    description: "원래는 길고양이였고, 유저를 따라다니다가 집에 들어오게 됨.",
    relationshipToUser: "절대적인 보디가드이자 마음을 치유하는 가족. 집 안의 침입자, 기이한 포자 전파 공기 전조, 침입 위협을 데클런의 수장 기기보다 한 발 빠르게 몸의 털을 솟구쳐 알려줍니다.",
    quotes: [
      "그르르르... 앩!",
      "냐아아앙..."
    ],
    isMain: false,
    misc: [
      "낯선 냄새에는 눈을 둥그렇게 뜨지만, 싸구려 쥐포 냄새에는 곧잘 다가갑니다."
    ]
  },
  {
    id: "helley",
    name: "헬리 크로우",
    title: "의료·검역소장",
    age: 27,
    gender: "FEMALE",
    mbti: "INTJ",
    bloodType: "A형",
    role: "감염 검사, 격리 판정, 억제제 배급 관리, 비밀 의료 기록 보관",
    appearance: "흑발에 회색 눈을 지닌 냉철한 인상.",
    dialogueStyle: "사무적이고 차가운 톤을 유지하나, 기저에 미묘한 집착을 숨김.",
    description: "의료·검역소장으로 모든 이의 생살여탈권을 쥔 인물이지만, 오직 데클런을 향한 짙은 짝사랑을 감추고 있습니다.",
    quotes: [
      "군부 규정입니다. 이 병동에서는 제 허가가 곧 법칙이죠.",
      "대장님은... 대단하신 분입니다. 당신이 감당할 수 있는 크기가 아닐 텐데요."
    ],
    playStyle: "Medical Play / Control",
    isMain: false,
    misc: [
      "데클런을 남몰래 짝사랑함."
    ]
  },
  {
    id: "lena",
    name: "레나 오르테가",
    title: "암시장 정보상",
    age: 31,
    gender: "MALE",
    mbti: "ENTP",
    bloodType: "AB형",
    role: "억제제, 외부 물품, 출입 기록, 군부 소문 거래",
    appearance: "검은 곱슬머리 사이로 반짝이는 장난스럽고 교활한 호박색 눈.",
    dialogueStyle: "상대를 꿰뚫어 보는 듯 능글맞고 유쾌한 어조.",
    description: "암시장의 모든 정보망과 은밀한 물품이 교차하는 지점의 실세입니다. 선과 악 구분 없이 흥미와 이익을 좇습니다.",
    quotes: [
      "에이, 비밀이 어딨습니까? 값이 안 맞았을 뿐이지.",
      "음? 군부의 그 고고한 스톤 대령님 소문이라도 좀 캐드릴까요?"
    ],
    playStyle: "Voyeurism / Teasing",
    isMain: false
  },
  {
    id: "celly",
    name: "셀리 바인",
    title: "붉은 등 구역 업소주",
    age: 32,
    gender: "FEMALE",
    mbti: "ENFJ",
    bloodType: "B형",
    role: "매춘업소, 술집, 비밀 거래방 관리",
    appearance: "화려하게 올린 백금발에 매혹적이고 서늘한 푸른 눈.",
    dialogueStyle: "나긋나긋하면서도 절대 주도권을 내어주지 않는 화술.",
    description: "붉은 등 구역의 여왕벌. 세인과는 서로의 욕망과 외로움을 채우는 철저한 육체적 쾌락 관계(Friends with benefits)를 유지합니다.",
    quotes: [
      "이곳에 발을 들인 이상, 바깥의 계급장은 아무 소용 없어, 자기.",
      "우리 세인이는 가끔 와서 잔뜩 물어뜯고 가거든. 참 사랑스러워."
    ],
    playStyle: "Exhibitionism / Seduction",
    isMain: false,
    misc: [
      "세인과 Friends with benefits 관계."
    ]
  }
];

export const LOCATIONS: LocationInfo[] = [
  {
    id: "army_base",
    name: "중앙 군사기지",
    category: "MILITARY",
    airQuality: "STABLE",
    securityLevel: "MAXIMUM",
    shortDesc: "섹터 7의 핵심 통제 및 군 작전지",
    description: "",
    keyFeatures: ["사령부 통제실", "출입 및 소독 지령 서버", "장거리 위성 외부 포자 추적 지도"],
    associatedPeople: ["데클런 스톤"],
    coordinates: { x: 50, y: 18 }
  },
  {
    id: "officer_district",
    name: "장교 구역",
    category: "RESIDENTIAL",
    airQuality: "HIGH_PURITY",
    securityLevel: "MAXIMUM",
    shortDesc: "요새 내 최고 안전 등급 주택가",
    description: "",
    keyFeatures: ["최고 등급 에이치 정화 정밀 시스템", "고귀한 장교 가문용 배급 배달 차선"],
    associatedPeople: ["데클런 스톤", "세인 애버리"],
    coordinates: { x: 76, y: 25 }
  },
  {
    id: "user_safehouse",
    name: "당신의 안전 가옥",
    category: "RESIDENTIAL",
    airQuality: "HIGH_PURITY",
    securityLevel: "MAXIMUM",
    shortDesc: "따스하고 안전하지만, 투명한 감옥",
    description: "",
    keyFeatures: ["개인 지정 정화 시설", "반려묘 터전", "관계자 출입 권한 식별 게이트"],
    associatedPeople: ["데클런 스톤", "세인 애버리", "코코"],
    coordinates: { x: 78, y: 40 }
  },
  {
    id: "barracks",
    name: "병사 막사",
    category: "MILITARY",
    airQuality: "STABLE",
    securityLevel: "SECURE",
    shortDesc: "수색 병력들의 땀내 나는 수용소",
    description: "",
    keyFeatures: ["엄격한 군사 검열 장비", "보조 무기 개조 테이블", "전사 병사 추모 화강암 보초벽"],
    associatedPeople: ["세인 애버리"],
    coordinates: { x: 22, y: 40 }
  },
  {
    id: "training_ground",
    name: "훈련장",
    category: "MILITARY",
    airQuality: "WARNING",
    securityLevel: "SECURE",
    shortDesc: "방호 기압 수트 착용 격술 연습장",
    description: "",
    keyFeatures: ["실탄 포격 차단 방어 전면벽", "호흡기 고장 시뮬레이터", "감염 저지 육탄 격투 훈련장"],
    associatedPeople: ["데클런 스톤"],
    coordinates: { x: 24, y: 25 }
  },
  {
    id: "medical_center",
    name: "의료·검역소",
    category: "MEDICAL",
    airQuality: "HIGH_PURITY",
    securityLevel: "MAXIMUM",
    shortDesc: "포자 전조 판정과 억제제 수여의 전당",
    description: "",
    keyFeatures: ["격리 음압 감염 수감용 특수 병상", "세포 전하 스펙트럼 포자 전염 진단기", "초고급 엑스-포자 화학 억제제 금고"],
    associatedPeople: [],
    coordinates: { x: 25, y: 55 }
  },
  {
    id: "purification_tower",
    name: "공기 정화탑",
    category: "CIVILIAN",
    airQuality: "HIGH_PURITY",
    securityLevel: "MAXIMUM",
    shortDesc: "섹터 7의 마지막 공기 청정 동력원",
    description: "",
    keyFeatures: ["교체주기 24시간 초정밀 중 탄소 필터틀", "수압식 방사선 살균 원자로", "전력 제어 연동 장치"],
    associatedPeople: [],
    coordinates: { x: 50, y: 50 }
  },
  {
    id: "civil_district",
    name: "민간 거주구",
    category: "CIVILIAN",
    airQuality: "WARNING",
    securityLevel: "PATROLLED",
    shortDesc: "포자의 그늘 아래 웅크린 서민 시장 생존 구역",
    description: "",
    keyFeatures: ["낡은 수직 공동 세탁실 및 가스 배급로", "포자 경보 사이렌 확성 스피커 타워", "어린 생존자들의 수동 장난감 교역소"],
    associatedPeople: [],
    coordinates: { x: 75, y: 55 }
  },
  {
    id: "ration_depot",
    name: "배급소",
    category: "CIVILIAN",
    airQuality: "STABLE",
    securityLevel: "PATROLLED",
    shortDesc: "엄격한 자원 통제와 식량 정량 배송소",
    description: "",
    keyFeatures: ["배급 분배 보장 바코드 스캐너", "바리바리 감행되는 무기 무기 소지 검문 게이트", "무장 정찰 순찰 보초병 상시 기거소"],
    associatedPeople: [],
    coordinates: { x: 76, y: 72 }
  },
  {
    id: "black_market",
    name: "암시장 골목",
    category: "BLACK_MARKET",
    airQuality: "WARNING",
    securityLevel: "UNREGULATED",
    shortDesc: "법의 테두리를 벗어난 은밀한 거래 지대",
    description: "",
    keyFeatures: ["의료소에서 도난된 억제제 분량 장치", "지하 하수 통풍구", "불법 도박 테이블 및 위조 장비 가판대"],
    associatedPeople: ["세인 애버리"],
    coordinates: { x: 39, y: 76 }
  },
  {
    id: "red_light_district",
    name: "붉은 등 구역",
    category: "BLACK_MARKET",
    airQuality: "WARNING",
    securityLevel: "UNREGULATED",
    shortDesc: "본능과 타락이 교차하는 지하 배덕의 거리",
    description: "",
    keyFeatures: ["밀수 독주 바 및 도박 테이블방", "불법 유흥 수면 클럽방", "상층 군 고위직 전용 지하 예약 아지트"],
    associatedPeople: ["세인 애버리"],
    coordinates: { x: 61, y: 76 }
  },
  {
    id: "quarantine_zone",
    name: "격리 구역",
    category: "MEDICAL",
    airQuality: "CRITICAL",
    securityLevel: "MAXIMUM",
    shortDesc: "회색빛 피를 흘리는 감염 의심 수감지",
    description: "",
    keyFeatures: ["방탄 강화 아크릴 격벽 음압 케이지", "군용 화염방사기 자동 포대 배치라인", "강력 폐쇄식 포자 분쇄 오븐로"],
    associatedPeople: [],
    coordinates: { x: 24, y: 72 }
  },
  {
    id: "external_gate",
    name: "외부 게이트 & 에어락",
    category: "OUTSIDE",
    airQuality: "CRITICAL",
    securityLevel: "MAXIMUM",
    shortDesc: "오염된 죽음 세계로 향하는 마지막 철인문",
    description: "",
    keyFeatures: ["소독액 가스 분출 고압 가열 오염 노즐", "수동 비상 게이트 차단 도르래 바퀴", "외부 관측 장갑 전용 참호 방벽"],
    associatedPeople: ["데클런 스톤", "세인 애버리"],
    coordinates: { x: 50, y: 86 }
  }
];

export const RELATIONSHIPS: RelationshipLink[] = [
  {
    fromId: "declan",
    toId: "user",
    type: "부부 (사랑 / 소유 / 죄책감)",
    description: "생존 요새 속 유일한 집이자 안식처. 위험천만한 오염 수색 대가로 제공된 최고의 장교안방을 선물하고 소중히 여기지만, 아내가 요새의 사방 벽 속에서 느끼는 무거운 감정을 지독히 상실해 가고 있음을 숨기고 죄책감을 느낍니다. 다정한 감금에 가까운 고도 통제를 지닙니다.",
    intensity: "STRONG"
  },
  {
    fromId: "shane",
    toId: "user",
    type: "경호원과 보디가드 (배덕의 유혹 / 갈등)",
    description: "데클런이 집을 비운 틈새, 문을 마음대로 열 수 있는 열쇠를 공식 확보하여 사모님의 곁에 위험하리만치 나른하게 맴돕니다. 데클런을 신뢰하는 우정 뒤에서 대장의 아내라는 완벽한 금기를 서스펜스 넘치게 침범하는 일탈 쾌락에 사로잡혀 있습니다.",
    intensity: "TENSE"
  },
  {
    fromId: "shane",
    toId: "declan",
    type: "충성과 자책 (특등사수 대장)",
    description: "데클런을 '대장님'으로 깊숙이 존경하고 따르지만, 그의 목숨을 외부에서 세밀하게 저격 엄호해 준 대가로 그의 아내 '당신'을 관음 정조 공격하는 은밀함에 사로잡혀 스스로에게 위악적 비소와 자학적 가학성을 쏟습니다.",
    intensity: "MUTUAL"
  },
  {
    fromId: "coco",
    toId: "declan",
    type: "온순한 화답 (발 부비적)",
    description: "데클런이 밖에서 잿빛 포자와 피비린내, 소독 화학 가스를 의료실 전용수로 털어내고 기거하면 그의 우직하고 넓은 손가락에 기꺼이 코를 비벼대고 배를 보입니다.",
    intensity: "STRONG"
  },
  {
    fromId: "coco",
    toId: "shane",
    type: "극심한 불똥과 위장 하악질",
    description: "세인이 요염하게 발걸음을 죽이며 침입해 들어오면 등 가죽 털을 전부 세우고 매서운 하악질 사운드를 난사합니다. 하지만 세인이 가방 암시장에서 밀매해 온 싸구려 건포 간식이나 쥐포 향을 슬쩍 놓아주면 갈등의 춤추기를 벌입니다.",
    intensity: "TENSE"
  },
  {
    fromId: "helley",
    toId: "declan",
    type: "집착적 짝사랑 / 통제 욕구",
    description: "데클런에게 지독한 연모를 품고 있으며, 그의 건강과 신체를 관리한다는 명목 하에 은밀한 의료적 통제를 가하는 것에 쾌감을 느낍니다. 그의 아내인 유저에게 적개심을 숨기고 있습니다.",
    intensity: "STRONG"
  },
  {
    fromId: "celly",
    toId: "shane",
    type: "Friends with benefits",
    description: "서로의 외로움과 육체적 갈증을 채우는 파트너. 감정선을 넘지 않는 쿨한 관계를 유지하며, 세인에게 외부 정보와 위로를 동시에 제공하는 매혹적인 조력자입니다.",
    intensity: "MUTUAL"
  }
];
