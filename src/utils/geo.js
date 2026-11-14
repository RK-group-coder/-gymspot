// 地理空間計算工具

export const TAIWAN_DISTRICTS = {
  '台北市': ['大安區', '信義區', '中山區', '中正區', '松山區', '內湖區', '士林區', '北投區', '南港區', '文山區', '萬華區', '大同區'],
  '新北市': ['板橋區', '中和區', '新莊區', '三重區', '永和區', '土城區', '汐止區', '新店區', '蘆洲區', '淡水區', '樹林區', '林口區', '三峽區', '五股區', '鶯歌區', '泰山區', '八里區', '瑞芳區', '深坑區', '三芝區', '萬里區', '金山區', '貢寮區', '石門區', '雙溪區', '石碇區', '坪林區', '平溪區', '烏來區'],
  '基隆市': ['仁愛區', '信義區', '中正區', '中山區', '安樂區', '暖暖區', '七堵區'],
  '桃園市': ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區', '蘆竹區', '大溪區', '龜山區', '大園區', '觀音區', '新屋區', '龍潭區', '復興區'],
  '新竹市': ['東區', '北區', '香山區'],
  '新竹縣': ['竹北市', '竹東鎮', '新埔鎮', '關西鎮', '湖口鄉', '新豐鄉', '芎林鄉', '橫山鄉', '北埔鄉', '寶山鄉', '峨眉鄉', '尖石鄉', '五峰鄉'],
  '苗栗縣': ['苗栗市', '頭份市', '竹南鎮', '後龍鎮', '通霄鎮', '苑裡鎮', '卓蘭鎮', '造橋鄉', '西湖鄉', '頭屋鄉', '公館鄉', '銅鑼鄉', '三義鄉', '大湖鄉', '獅潭鄉', '三灣鄉', '南庄鄉', '泰安鄉'],
  '台中市': ['西屯區', '北屯區', '南屯區', '北區', '西區', '中區', '東區', '南區', '豐原區', '大里區', '太平區', '清水區', '沙鹿區', '大甲區', '東勢區', '烏日區', '神岡區', '大雅區', '潭子區', '后里區', '霧峰區', '梧棲區', '龍井區', '大肚區', '外埔區', '大安區', '石岡區', '新社區', '和平區'],
  '彰化縣': ['彰化市', '員林市', '和美鎮', '鹿港鎮', '溪湖鎮', '二林鎮', '田中鎮', '北斗鎮', '花壇鄉', '芬園鄉', '大村鄉', '永靖鄉', '伸港鄉', '線西鄉', '福興鄉', '秀水鄉', '埔心鄉', '埔鹽鄉', '大城鄉', '芳苑鄉', '竹塘鄉', '社頭鄉', '二水鄉', '田尾鄉', '埤頭鄉', '溪州鄉'],
  '南投縣': ['南投市', '埔里鎮', '草屯鎮', '竹山鎮', '集集鎮', '名間鄉', '鹿谷鄉', '中寮鄉', '魚池鄉', '國姓鄉', '水里鄉', '信義鄉', '仁愛鄉'],
  '雲林縣': ['斗六市', '斗南鎮', '虎尾鎮', '西螺鎮', '土庫鎮', '北港鎮', '古坑鄉', '大埤鄉', '莿桐鄉', '林內鄉', '二崙鄉', '崙背鄉', '麥寮鄉', '東勢鄉', '褒忠鄉', '台西鄉', '元長鄉', '四湖鄉', '口湖鄉', '水林鄉'],
  '嘉義市': ['西區', '東區'],
  '嘉義縣': ['太保市', '朴子市', '布袋鎮', '大林鎮', '民雄鄉', '溪口鄉', '新港鄉', '六腳鄉', '東石鄉', '義竹鄉', '鹿草鄉', '水上鄉', '中埔鄉', '竹崎鄉', '梅山鄉', '番路鄉', '大埔鄉', '阿里山鄉'],
  '台南市': ['東區', '北區', '中西區', '安平區', '安南區', '永康區', '南區', '新營區', '善化區', '新市區', '歸仁區', '仁德區', '麻豆區', '佳里區', '白河區', '柳營區', '後壁區', '東山區', '下營區', '六甲區', '官田區', '大內區', '西港區', '七股區', '將軍區', '北門區', '學甲區', '鹽水區', '安定區', '山上區', '玉井區', '楠西區', '南化區', '左鎮區', '關廟區', '龍崎區'],
  '高雄市': ['左營區', '三民區', '鼓山區', '苓雅區', '前鎮區', '新興區', '前金區', '楠梓區', '小港區', '鳳山區', '鹽埕區', '旗津區', '仁武區', '大社區', '岡山區', '路竹區', '阿蓮區', '田寮區', '燕巢區', '橋頭區', '梓官區', '彌陀區', '永安區', '湖內區', '大寮區', '林園區', '鳥松區', '大樹區', '旗山區', '美濃區', '六龜區', '內門區', '杉林區', '甲仙區', '桃源區', '那瑪夏區', '茂林區', '茄萣區'],
  '屏東縣': ['屏東市', '潮州鎮', '東港鎮', '恆春鎮', '萬丹鄉', '長治鄉', '麟洛鄉', '九如鄉', '里港鄉', '鹽埔鄉', '高樹鄉', '萬巒鄉', '內埔鄉', '竹田鄉', '新埤鄉', '枋寮鄉', '新園鄉', '崁頂鄉', '林邊鄉', '南州鄉', '佳冬鄉', '琉球鄉', '車城鄉', '滿州鄉', '枋山鄉', '三地門鄉', '霧臺鄉', '瑪家鄉', '泰武鄉', '來義鄉', '春日鄉', '獅子鄉', '牡丹鄉'],
  '宜蘭縣': ['宜蘭市', '羅東鎮', '蘇澳鎮', '頭城鎮', '礁溪鄉', '壯圍鄉', '員山鄉', '冬山鄉', '五結鄉', '三星鄉', '大同鄉', '南澳鄉'],
  '花蓮縣': ['花蓮市', '吉安鄉', '新城鄉', '玉里鎮', '鳳林鎮', '壽豐鄉', '光復鄉', '豐濱鄉', '瑞穗鄉', '富里鄉', '秀林鄉', '萬榮鄉', '卓溪鄉'],
  '台東縣': ['台東市', '成功鎮', '關山鎮', '卑南鄉', '大武鄉', '太麻里鄉', '東河鄉', '長濱鄉', '鹿野鄉', '池上鄉', '綠島鄉', '延平鄉', '海端鄉', '達仁鄉', '金峰鄉', '蘭嶼鄉'],
  '澎湖縣': ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
  '金門縣': ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
  '連江縣': ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉']
};

export const TAIWAN_CITIES = Object.keys(TAIWAN_DISTRICTS);

/**
 * 計算兩點經緯度間的直線距離 (公里) - Haversine Formula
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // 地球半徑 (km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * 將距離轉化為友善顯示字串 (例如 "650 m" 或 "2.8 km")
 */
export function formatDistance(distanceKm) {
  if (distanceKm === undefined || distanceKm === null || isNaN(distanceKm)) return "--";
  if (distanceKm < 1) {
    const meters = Math.round(distanceKm * 1000);
    return `${meters} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * 產生 Google Maps 官方路徑規劃導航 URL
 */
export function buildGoogleMapsRouteUrl(destinationAddress, userLat, userLng) {
  const encodedDest = encodeURIComponent(destinationAddress);
  if (userLat && userLng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${encodedDest}&travelmode=transit`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodedDest}`;
}

/**
 * 產生 Google Maps 官方場館地標/商家資料頁面 URL (查看場館環境照片、評論、營業時間)
 */
export function buildGoogleMapsPlaceUrl(gymName, address) {
  const query = [gymName, address].filter(Boolean).join(' ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * 取得使用者目前 GPS 位置
 */
export function getCurrentPositionAsync() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("您的瀏覽器不支援 GPS 定位"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let msg = "無法取得位置";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "未取得定位權限，已切換為預設常用商圈";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "位置資訊不可用";
        } else if (error.code === error.TIMEOUT) {
          msg = "定位逾時";
        }
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
}
