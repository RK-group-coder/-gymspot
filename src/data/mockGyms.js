// 台灣自由教練場租健身房精選資料 (台北市、新北市、台中市、高雄市)
export const INITIAL_GYMS = [
  {
    id: "gym-tp-01",
    name: "IronHub 鐵館體能空間 (大安旗艦館)",
    brand: "IronHub Fitness",
    city: "台北市",
    district: "大安區",
    address: "台北市大安區忠孝東路四段 181 巷 35 號 B1",
    nearMrt: "捷運忠孝敦化站 2 號出口步行 3 分鐘",
    lat: 25.0428,
    lng: 121.5512,
    rating: 4.9,
    reviewCount: 142,
    phone: "02-2775-8899",
    lineId: "@ironhub_daan",
    igHandle: "ironhub.tw",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 180,
      peakPerHour: 250,
      studentCleanFee: 0,
      cleanFeeDesc: "免人頭清潔費，陪練學員免額外收費",
      packageDeals: [
        { hours: 10, price: 1700, note: "現省 $100" },
        { hours: 30, price: 4800, note: "每小時僅 $160" },
        { hours: 50, price: 7500, note: "教練最愛超值包" }
      ],
      peakHoursRange: "平日 18:00 - 22:00 / 週末 13:00 - 19:00",
      offPeakHoursRange: "平日 08:00 - 18:00 & 22:00 後",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 6,
      turfZone: true,
      turfLength: "15米田徑草皮 + 雪橇車",
      eleikoPlates: true,
      dumbbellsMaxKg: 60,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["深蹲架充足", "專業草皮雪橇", "免學員費", "Eleiko賽事級槓鈴", "淋浴完備"],
    requirements: {
      certRequired: "需出示四大國際證照 (ACE / NSCA / NASM / ACSM) 之一",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "場館已投保 3,000 萬公共意外責任險",
      cancellationPolicy: "上課前 6 小時於系統一鍵取消，免扣點數"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "營利事業登記證、消防合格證明書、公共意外責任險保單"
  },
  {
    id: "gym-tp-02",
    name: "Pulse 勁能運動工作室 (信義店)",
    brand: "Pulse Movement Lab",
    city: "台北市",
    district: "信義區",
    address: "台北市信義區松德路 65 號 2 樓",
    nearMrt: "捷運永春站 4 號出口步行 5 分鐘",
    lat: 25.0385,
    lng: 121.5741,
    rating: 4.8,
    reviewCount: 98,
    phone: "02-2729-1122",
    lineId: "@pulse_xinyi",
    igHandle: "pulse_taipei",
    coverImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 150,
      peakPerHour: 220,
      studentCleanFee: 50,
      cleanFeeDesc: "每位學生酌收 50 元/次 衛浴清潔與毛巾費",
      packageDeals: [
        { hours: 10, price: 1400, note: "每小時 $140" },
        { hours: 20, price: 2600, note: "加贈 1 小時" }
      ],
      peakHoursRange: "平日 18:30 - 21:30",
      offPeakHoursRange: "其餘營業時間全時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 4,
      turfZone: true,
      turfLength: "10米功能性地墊",
      eleikoPlates: false,
      dumbbellsMaxKg: 50,
      privateRoom: false,
      showerAvailable: true,
      freeWater: true,
      freeParking: true
    },
    tags: ["CP值極高", "免費停車位", "深蹲架4座", "有草皮區", "淋浴完備"],
    requirements: {
      certRequired: "具備合格體適能指導員證書",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共意外險",
      cancellationPolicy: "前 12 小時取消免責"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "立案營業登記、建築物公共安全自主檢查證明"
  },
  {
    id: "gym-tp-03",
    name: "Apex 頂尖專屬私教訓練所 (中山館)",
    brand: "Apex Athletic",
    city: "台北市",
    district: "中山區",
    address: "台北市中山區南京東路二段 101 號 4 樓",
    nearMrt: "捷運松江南京站 1 號出口步行 2 分鐘",
    lat: 25.0519,
    lng: 121.5332,
    rating: 4.7,
    reviewCount: 76,
    phone: "02-2567-0099",
    lineId: "@apex_fit",
    igHandle: "apex_athletic",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 200,
      peakPerHour: 280,
      studentCleanFee: 0,
      cleanFeeDesc: "VIP 頂級環境，免學員費，含高級氣泡水供應",
      packageDeals: [
        { hours: 10, price: 1900, note: "每小時 $190" },
        { hours: 30, price: 5400, note: "每小時 $180" }
      ],
      peakHoursRange: "平日 17:30 - 21:30",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 5,
      turfZone: false,
      turfLength: "無草皮區",
      eleikoPlates: true,
      dumbbellsMaxKg: 50,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["高質感私密裝潢", "獨立VIP包廂", "南京松江蛋黃區", "提供高級衛浴用品"],
    requirements: {
      certRequired: "需出示國際認證與有效 CPR 證書",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共意外險",
      cancellationPolicy: "開課前 8 小時可自由調整"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "臺北市政府營業設立許可、責任保險單"
  },
  {
    id: "gym-tp-04",
    name: "ForceLab 原力肌能所 (松山小巨蛋館)",
    brand: "ForceLab",
    city: "台北市",
    district: "松山區",
    address: "台北市松山區八德路三段 12 號 2 樓",
    nearMrt: "捷運台北小巨蛋站 2 號出口步行 4 分鐘",
    lat: 25.0489,
    lng: 121.5540,
    rating: 4.8,
    reviewCount: 89,
    phone: "02-2578-6622",
    lineId: "@forcelab_songshan",
    igHandle: "forcelab_tw",
    coverImage: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 170,
      peakPerHour: 240,
      studentCleanFee: 0,
      cleanFeeDesc: "免收學生清潔費，器械齊全",
      packageDeals: [
        { hours: 10, price: 1600, note: "每小時 $160" },
        { hours: 25, price: 3750, note: "每小時 $150" }
      ],
      peakHoursRange: "平日 18:00 - 22:00",
      offPeakHoursRange: "平日 09:00 - 18:00",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 5,
      turfZone: true,
      turfLength: "12米多功能草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 55,
      privateRoom: false,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["小巨蛋商圈", "5座深蹲架", "免收學員清潔費", "賽事槓片"],
    requirements: {
      certRequired: "國際四大認證或國家體育署證照",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共意外險",
      cancellationPolicy: "課前 6 小時可免責改期"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "立案核准營業證明、公共安全合格"
  },
  {
    id: "gym-tp-05",
    name: "Titan 泰坦重訓運動空間 (大安森林店)",
    brand: "Titan Training",
    city: "台北市",
    district: "大安區",
    address: "台北市大安區信義路三段 147 號 B1",
    nearMrt: "捷運大安森林公園站 1 號出口步行 2 分鐘",
    lat: 25.0335,
    lng: 121.5360,
    rating: 4.9,
    reviewCount: 165,
    phone: "02-2708-3355",
    lineId: "@titan_daan",
    igHandle: "titan_strength",
    coverImage: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 190,
      peakPerHour: 260,
      studentCleanFee: 0,
      cleanFeeDesc: "尊榮場地，學生全免清潔費",
      packageDeals: [
        { hours: 20, price: 3600, note: "每小時 $180" },
        { hours: 50, price: 8500, note: "每小時 $170" }
      ],
      peakHoursRange: "平日 18:00 - 22:00",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 7,
      turfZone: true,
      turfLength: "15米耐磨田徑草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 65,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["大安森林公園站", "7座深蹲架", "大啞鈴到65KG", "免學員費", "獨立空間"],
    requirements: {
      certRequired: "具國際合格教練證",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "3,000萬意外責任險",
      cancellationPolicy: "24 小時前自由取消"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "立案營業登記、建築安全認證"
  },
  {
    id: "gym-tp-06",
    name: "NeoFit 紐約客體適能基地 (民生中山館)",
    brand: "NeoFit Studio",
    city: "台北市",
    district: "中山區",
    address: "台北市中山區民生東路二段 140 號 3 樓",
    nearMrt: "捷運行天宮站 1 號出口步行 3 分鐘",
    lat: 25.0582,
    lng: 121.5315,
    rating: 4.8,
    reviewCount: 82,
    phone: "02-2521-8811",
    lineId: "@neofit_zhongshan",
    igHandle: "neofit_taipei",
    coverImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 160,
      peakPerHour: 230,
      studentCleanFee: 0,
      cleanFeeDesc: "免學員費，附設高解析體脂分析儀借用",
      packageDeals: [
        { hours: 10, price: 1500, note: "每小時 $150" },
        { hours: 30, price: 4200, note: "每小時 $140" }
      ],
      peakHoursRange: "平日 18:00 - 21:30",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 4,
      turfZone: false,
      turfLength: "無草皮區",
      eleikoPlates: false,
      dumbbellsMaxKg: 45,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["行天宮捷運旁", "舒適採光", "免學員費", "附InBody量測"],
    requirements: {
      certRequired: "體適能或專項指導認證",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共安全意外險",
      cancellationPolicy: "課前 8 小時可取消"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "台北市合格設立許可"
  },
  {
    id: "gym-ntp-01",
    name: "FlexSpace 自由練體能中心 (板橋旗艦)",
    brand: "FlexSpace",
    city: "新北市",
    district: "板橋區",
    address: "新北市板橋區縣民大道二段 68 號 3 樓",
    nearMrt: "捷運板橋站 / 高鐵板橋站步行 3 分鐘",
    lat: 25.0135,
    lng: 121.4645,
    rating: 4.9,
    reviewCount: 210,
    phone: "02-8951-3344",
    lineId: "@flexspace_pc",
    igHandle: "flexspace.tw",
    coverImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 160,
      peakPerHour: 240,
      studentCleanFee: 0,
      cleanFeeDesc: "免收學員人頭清潔費",
      packageDeals: [
        { hours: 20, price: 3000, note: "每小時僅 $150" },
        { hours: 50, price: 7000, note: "贈送專屬置物櫃一個月" }
      ],
      peakHoursRange: "平日 18:00 - 22:00",
      offPeakHoursRange: "平日 07:00 - 18:00 & 週末全日",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 8,
      turfZone: true,
      turfLength: "20米高密度耐磨草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 65,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["深蹲架8座極充足", "板橋三鐵共構", "賽事級器材", "免學員費", "獨立VIP室"],
    requirements: {
      certRequired: "四大國際證照或國內合格甲級證書",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "3,000 萬公共責任險",
      cancellationPolicy: "24小時前取消退全額"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "合法公司設立登記、消防安檢審定書"
  },
  {
    id: "gym-ntp-02",
    name: "Elevate 頂峰私教運動所 (板橋新埔館)",
    brand: "Elevate Fitness",
    city: "新北市",
    district: "板橋區",
    address: "新北市板橋區文化路二段 182 巷 3 號 2 樓",
    nearMrt: "捷運新埔站 4 號出口步行 1 分鐘",
    lat: 25.0222,
    lng: 121.4688,
    rating: 4.8,
    reviewCount: 94,
    phone: "02-2250-9988",
    lineId: "@elevate_xinpu",
    igHandle: "elevate_pc",
    coverImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 150,
      peakPerHour: 220,
      studentCleanFee: 0,
      cleanFeeDesc: "免人頭費，附設男女乾濕分離衛浴",
      packageDeals: [
        { hours: 10, price: 1400, note: "每小時 $140" },
        { hours: 30, price: 3900, note: "每小時 $130 超划算" }
      ],
      peakHoursRange: "平日 18:00 - 22:00",
      offPeakHoursRange: "平日 08:00 - 18:00",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 5,
      turfZone: true,
      turfLength: "10米功能草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 50,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: false
    },
    tags: ["新埔站1分鐘", "5座深蹲架", "免學員費", "乾濕分離淋浴"],
    requirements: {
      certRequired: "四大國際證照之一或國內合格證書",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共意外險",
      cancellationPolicy: "開課前 12 小時可免費取消"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "新北市政府登記核可、安全合格證明"
  },
  {
    id: "gym-ntp-03",
    name: "CorePower 核心體能工坊 (中和南勢角館)",
    brand: "CorePower Studio",
    city: "新北市",
    district: "中和區",
    address: "新北市中和區捷運路 8 號 2 樓",
    nearMrt: "捷運南勢角站 4 號出口共構步行 1 分鐘",
    lat: 24.9902,
    lng: 121.5097,
    rating: 4.7,
    reviewCount: 88,
    phone: "02-2940-5566",
    lineId: "@corepower_zhonghe",
    igHandle: "corepower_tw",
    coverImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 140,
      peakPerHour: 200,
      studentCleanFee: 30,
      cleanFeeDesc: "每位學生酌收 30 元毛巾與衛浴清潔費",
      packageDeals: [
        { hours: 10, price: 1300, note: "每小時僅 $130" },
        { hours: 20, price: 2400, note: "每小時僅 $120" }
      ],
      peakHoursRange: "平日 18:30 - 21:30",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 4,
      turfZone: true,
      turfLength: "8米草皮區",
      eleikoPlates: false,
      dumbbellsMaxKg: 45,
      privateRoom: false,
      showerAvailable: true,
      freeWater: true,
      freeParking: true
    },
    tags: ["捷運南勢角站直通", "超高CP值", "深蹲架4座", "機車好停"],
    requirements: {
      certRequired: "具體適能教練證書",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共安全責任險",
      cancellationPolicy: "上課前 6 小時可改期"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "立案核准營業證件"
  },
  {
    id: "gym-tc-01",
    name: "Formosa 力量工廠 (台中勤美館)",
    brand: "Formosa Strength",
    city: "台中市",
    district: "西區",
    address: "台中市西區公益路 155 號 B1",
    nearMrt: "勤美誠品綠園道旁，公車站市民廣場站",
    lat: 24.1508,
    lng: 120.6635,
    rating: 4.9,
    reviewCount: 188,
    phone: "04-2301-5588",
    lineId: "@formosa_strength",
    igHandle: "formosa_power",
    coverImage: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 140,
      peakPerHour: 200,
      studentCleanFee: 0,
      cleanFeeDesc: "無人頭費，附設放鬆筋膜槍租借",
      packageDeals: [
        { hours: 15, price: 1950, note: "每小時 $130 超殺" },
        { hours: 40, price: 4800, note: "每小時僅 $120" }
      ],
      peakHoursRange: "平日 18:00 - 21:30",
      offPeakHoursRange: "平日 09:00 - 18:00 全日",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 7,
      turfZone: true,
      turfLength: "12米衝刺草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 70,
      privateRoom: false,
      showerAvailable: true,
      freeWater: true,
      freeParking: true
    },
    tags: ["台中超低價場租", "7座深蹲架", "大啞鈴到70KG", "勤美精華區", "免費停車"],
    requirements: {
      certRequired: "各類合格體適能或專項教練證",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "完備公共意外險",
      cancellationPolicy: "2 小時前取消皆可"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "台中市政府商業營登、消防合格"
  },
  {
    id: "gym-tc-02",
    name: "Taichung Elite 菁英重訓中心 (七期西屯館)",
    brand: "Elite Athletic",
    city: "台中市",
    district: "西屯區",
    address: "台中市西屯區市政路 386 號 2 樓",
    nearMrt: "台中捷運水安宮站步行 8 分鐘 / 鄰近秋紅谷",
    lat: 24.1610,
    lng: 120.6420,
    rating: 4.8,
    reviewCount: 130,
    phone: "04-2255-7766",
    lineId: "@elite_taichung",
    igHandle: "elite_tc_fit",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 160,
      peakPerHour: 230,
      studentCleanFee: 0,
      cleanFeeDesc: "七期豪宅聚落頂級場館，免學員費",
      packageDeals: [
        { hours: 10, price: 1500, note: "每小時 $150" },
        { hours: 30, price: 4200, note: "每小時 $140" }
      ],
      peakHoursRange: "平日 18:00 - 22:00",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 6,
      turfZone: true,
      turfLength: "15米高級功能性草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 60,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: true
    },
    tags: ["七期核心商圈", "6座深蹲架", "免費專屬車位", "免學員費", "高隱私"],
    requirements: {
      certRequired: "出示專業國際認證",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共意外責任險",
      cancellationPolicy: "前 12 小時取消免收費"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "台中市政府合法設立登記"
  },
  {
    id: "gym-kh-01",
    name: "SouthPort 南方體能基地 (高雄巨蛋店)",
    brand: "SouthPort Performance",
    city: "高雄市",
    district: "左營區",
    address: "高雄市左營區博愛二路 777 號周邊",
    nearMrt: "捷運巨蛋站 2 號出口步行 4 分鐘",
    lat: 22.6698,
    lng: 120.3023,
    rating: 4.8,
    reviewCount: 115,
    phone: "07-558-9900",
    lineId: "@southport_kh",
    igHandle: "southport_fitness",
    coverImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 130,
      peakPerHour: 180,
      studentCleanFee: 0,
      cleanFeeDesc: "免人頭費，提供冷氣全開大空間",
      packageDeals: [
        { hours: 20, price: 2400, note: "每小時 $120" },
        { hours: 50, price: 5500, note: "每小時 $110 頂級實惠" }
      ],
      peakHoursRange: "平日 18:30 - 21:30",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 6,
      turfZone: true,
      turfLength: "18米長草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 55,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: true
    },
    tags: ["南台灣首選", "捷運巨蛋站", "離峰130超低價", "長草皮衝刺", "附機車位"],
    requirements: {
      certRequired: "各大教練認證檢定",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "含公共意外險",
      cancellationPolicy: "4 小時前可彈性延期"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "高雄市政府登記核准、保險證明書"
  },
  {
    id: "gym-kh-02",
    name: "HarborFit 港都自由訓練所 (鼓山美術館館)",
    brand: "HarborFit",
    city: "高雄市",
    district: "鼓山區",
    address: "高雄市鼓山區美術東二路 132 號 2 樓",
    nearMrt: "台鐵/輕軌美術館站步行 5 分鐘",
    lat: 22.6580,
    lng: 120.2915,
    rating: 4.9,
    reviewCount: 96,
    phone: "07-553-6688",
    lineId: "@harborfit_gushan",
    igHandle: "harborfit_kh",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=900&auto=format&fit=crop",
    pricing: {
      offPeakPerHour: 140,
      peakPerHour: 190,
      studentCleanFee: 0,
      cleanFeeDesc: "美術館特區高質感，免收學員清潔費",
      packageDeals: [
        { hours: 10, price: 1350, note: "每小時 $135" },
        { hours: 30, price: 3600, note: "每小時僅 $120" }
      ],
      peakHoursRange: "平日 18:00 - 21:30",
      offPeakHoursRange: "其餘時段",
      minRentalMinutes: 60
    },
    equipment: {
      squatRacksCount: 5,
      turfZone: true,
      turfLength: "12米功能草皮",
      eleikoPlates: true,
      dumbbellsMaxKg: 60,
      privateRoom: true,
      showerAvailable: true,
      freeWater: true,
      freeParking: true
    },
    tags: ["鼓山美術館站", "高質感採光", "深蹲架5座", "免學員費", "周邊好停車"],
    requirements: {
      certRequired: "國內外合格教練執照",
      cprRequired: true,
      indoorShoesOnly: true,
      insuranceIncluded: "公共意外險完備",
      cancellationPolicy: "開課前 8 小時可取消"
    },
    isVerified: true,
    isFeatured: false,
    verifiedDoc: "高雄市政府營業設立合格書"
  }
];

// 預設快速定位點 (自由教練常駐地點切換)
export const PRESET_LOCATIONS = [
  { id: "loc-tp-daan", name: "台北大安 (忠孝復興)", lat: 25.0416, lng: 121.5438, city: "台北市" },
  { id: "loc-tp-xinyi", name: "台北信義 (市政府/101)", lat: 25.0339, lng: 121.5645, city: "台北市" },
  { id: "loc-ntp-banqiao", name: "新北板橋 (板橋車站)", lat: 25.0136, lng: 121.4627, city: "新北市" },
  { id: "loc-tc-west", name: "台中勤美 (綠園道商圈)", lat: 24.1500, lng: 120.6630, city: "台中市" },
  { id: "loc-kh-arena", name: "高雄左營 (巨蛋商圈)", lat: 22.6690, lng: 120.3030, city: "高雄市" }
];
