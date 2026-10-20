// 地理空間計算工具

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
