// src/utils/certUtils.js
// 輔助函式：產生逼真、清晰的專業證照 SVG 圖檔（供範例與展示使用）

export const generateSampleCertSvg = (title, certCode, recipient = '林峻 (Alex Lin)', date = '2025/11/15') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0b111e"/>
        <stop offset="50%" stop-color="#152033"/>
        <stop offset="100%" stop-color="#080d16"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="50%" stop-color="#eab308"/>
        <stop offset="100%" stop-color="#ca8a04"/>
      </linearGradient>
      <linearGradient id="greenAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981"/>
        <stop offset="100%" stop-color="#b4ff04"/>
      </linearGradient>
    </defs>

    <!-- Outer Frame -->
    <rect width="800" height="560" fill="url(#bg)"/>
    <rect x="24" y="24" width="752" height="512" fill="none" stroke="url(#gold)" stroke-width="3" rx="16"/>
    <rect x="36" y="36" width="728" height="488" fill="none" stroke="rgba(234, 179, 8, 0.4)" stroke-width="1.5" stroke-dasharray="6,4" rx="12"/>

    <!-- Decorative Corner Ornaments -->
    <path d="M 40 70 L 70 40 M 40 85 L 85 40 M 760 70 L 730 40 M 760 85 L 715 40 M 40 490 L 70 520 M 40 475 L 85 520 M 760 490 L 730 520 M 760 475 L 715 520" stroke="url(#gold)" stroke-width="1.5"/>

    <!-- Header Text -->
    <text x="400" y="85" font-family="'Helvetica Neue', Arial, sans-serif" font-size="13" fill="#eab308" text-anchor="middle" font-weight="bold" letter-spacing="4">PROFESSIONAL FITNESS CREDENTIAL</text>
    <text x="400" y="125" font-family="'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="26" fill="#f8fafc" text-anchor="middle" font-weight="900" letter-spacing="1.5">專業體適能指導合格證照證明</text>
    <line x1="260" y1="145" x2="540" y2="145" stroke="url(#greenAccent)" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Recipient Info -->
    <text x="400" y="190" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle" letter-spacing="2">THIS IS TO CERTIFY THAT</text>
    <text x="400" y="235" font-family="'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="30" fill="#b4ff04" text-anchor="middle" font-weight="900" letter-spacing="2">${recipient}</text>
    <text x="400" y="275" font-family="'Helvetica Neue', Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle" letter-spacing="1">HAS MET ALL RIGOROUS CRITERIA AND DEMONSTRATED COMPETENCY IN</text>

    <!-- Certificate Title Box -->
    <rect x="70" y="295" width="660" height="66" fill="rgba(180, 255, 4, 0.08)" rx="10" stroke="rgba(180, 255, 4, 0.35)" stroke-width="1.2"/>
    <text x="400" y="337" font-family="'PingFang TC', 'Microsoft JhengHei', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle" font-weight="800">${title}</text>

    <!-- Certificate Details -->
    <g transform="translate(70, 395)">
      <rect width="470" height="95" fill="rgba(15, 23, 42, 0.75)" rx="8" stroke="#1e293b" stroke-width="1"/>
      <text x="20" y="32" font-family="sans-serif" font-size="11" fill="#64748b" font-weight="bold">證照編號 LICENSE NO.</text>
      <text x="20" y="55" font-family="'Courier New', monospace" font-size="15" fill="#f8fafc" font-weight="bold" letter-spacing="1">${certCode}</text>
      <text x="20" y="80" font-family="sans-serif" font-size="11" fill="#10b981" font-weight="bold">檢核狀態：教練本人自主檢附真品證明 · 有效期至 ${date}</text>
    </g>

    <!-- Official Seal -->
    <g transform="translate(640, 442)">
      <circle cx="0" cy="0" r="46" fill="#0d1424" stroke="url(#gold)" stroke-width="3"/>
      <circle cx="0" cy="0" r="39" fill="rgba(234, 179, 8, 0.12)" stroke="rgba(234, 179, 8, 0.5)" stroke-width="1" stroke-dasharray="4,2"/>
      <text x="0" y="-8" font-family="sans-serif" font-size="10" fill="#fef08a" text-anchor="middle" font-weight="900" letter-spacing="2">VERIFIED</text>
      <text x="0" y="8" font-family="sans-serif" font-size="13" fill="#eab308" text-anchor="middle" font-weight="900">CREDENTIAL</text>
      <text x="0" y="24" font-family="sans-serif" font-size="9" fill="#94a3b8" text-anchor="middle" font-weight="bold">ARCHIVE</text>
    </g>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

export const DEFAULT_COACH_CERTS = [
  {
    id: 'cert-cscs-1',
    name: 'NSCA - Certified Strength and Conditioning Specialist (CSCS)',
    code: 'CSCS-2023-8891',
    uploadDate: '2026/01/15',
    imageUrl: generateSampleCertSvg(
      'NSCA - Certified Strength and Conditioning Specialist (CSCS)',
      'CSCS-2023-8891',
      '林峻 (Alex Lin)',
      '2028/12/31'
    )
  },
  {
    id: 'cert-ace-2',
    name: 'ACE - Certified Personal Trainer (ACE-CPT)',
    code: 'ACE-CPT-44029',
    uploadDate: '2026/02/10',
    imageUrl: generateSampleCertSvg(
      'ACE - Certified Personal Trainer (ACE-CPT)',
      'ACE-CPT-44029',
      '林峻 (Alex Lin)',
      '2028/06/30'
    )
  },
  {
    id: 'cert-cpr-3',
    name: '中華民國紅十字會 CPR+AED 急救員認證',
    code: 'RC-CPR-2024-912',
    uploadDate: '2026/03/05',
    imageUrl: generateSampleCertSvg(
      '中華民國紅十字會 CPR+AED 急救員合格證',
      'RC-CPR-2024-912',
      '林峻 (Alex Lin)',
      '2027/05/20'
    )
  },
  {
    id: 'cert-fms-4',
    name: 'FMS 功能性動作篩檢 Lv.1 & Lv.2',
    code: 'FMS-PRO-8812',
    uploadDate: '2026/04/18',
    imageUrl: generateSampleCertSvg(
      'FMS 功能性動作篩檢 Functional Movement Screen Lv.1 & Lv.2',
      'FMS-PRO-8812',
      '林峻 (Alex Lin)',
      '2029/04/18'
    )
  }
];

export const getStoredCoachCerts = () => {
  try {
    const saved = localStorage.getItem('gymspot_coach_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.certifications)) {
        // If stored as strings (from older versions), upgrade to objects with sample images
        return parsed.certifications.map((item, index) => {
          if (typeof item === 'string') {
            return {
              id: `cert-upgraded-${index}`,
              name: item,
              code: `LIC-${2024 + index}-00${index + 1}`,
              uploadDate: '已檢附',
              imageUrl: generateSampleCertSvg(item, `LIC-${2024 + index}-00${index + 1}`, '林峻 (Alex Lin)')
            };
          }
          return item;
        });
      }
    }
  } catch (e) {
    // ignore
  }
  return DEFAULT_COACH_CERTS;
};
