import React from 'react';
import { Mail } from 'lucide-react';

export const LEGAL_ROUTES = [
  { path: '/terms', key: 'terms', shortLabel: '平台通用服務條款', title: 'GYMspot 平台通用服務條款' },
  { path: '/privacy', key: 'privacy', shortLabel: '隱私權政策', title: 'GYMspot 隱私權政策' },
  { path: '/booking-terms', key: 'booking-terms', shortLabel: '場館預約與交易條款', title: 'GYMspot 平台場館預約與交易服務條款' },
  { path: '/refund-policy', key: 'refund-policy', shortLabel: '退款或取消預約政策', title: 'GYMspot 退款或取消預約政策' },
  { path: '/coach-terms', key: 'coach-terms', shortLabel: '自由教練服務條款', title: 'GYMspot 自由教練服務條款' },
  { path: '/anti-fraud', key: 'anti-fraud', shortLabel: '防詐騙宣導', title: '防詐騙宣導' }
];

export function isLegalRoute(pathname = '') {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return LEGAL_ROUTES.some((r) => r.path === clean);
}

export function LegalFooter({ onNavigateHome, onNavigate }) {
  const linkBtnStyle = {
    background: 'transparent',
    border: 'none',
    padding: 0,
    color: '#94a3b8',
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    fontSize: '12.5px',
    textAlign: 'left',
    lineHeight: 1.5
  };

  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      background: '#04060a',
      borderTop: '1px solid #1e293b',
      padding: '28px 32px',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1160px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '32px'
      }}>
        {/* 1. Left Column: Brand & Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div
            onClick={onNavigateHome}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <img src="/brand-icon-transparent.png" alt="肌動組" style={{ height: '30px', width: 'auto' }} />
            <span style={{ fontSize: '15px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            全台自由教練與優質場租健身房媒合平台
          </div>
          <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>
            © 2026 肌動組 GYMspot All Rights Reserved.
          </div>
        </div>

        {/* 2. Middle Column A: 平台政策（垂直疊放） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
            條款與政策
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/terms')}
            style={linkBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
          >
            平台通用服務條款
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/privacy')}
            style={linkBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
          >
            隱私權政策
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/refund-policy')}
            style={linkBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
          >
            退款或取消預約政策
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/anti-fraud')}
            style={{ ...linkBtnStyle, color: '#b4ff04', fontWeight: 700 }}
          >
            防詐騙宣導
          </button>
        </div>

        {/* 3. Middle Column B: 專項服務條款（垂直疊放） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
            專項服務規範
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/booking-terms')}
            style={linkBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
          >
            場館預約與交易服務條款
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/coach-terms')}
            style={linkBtnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
          >
            自由教練服務條款
          </button>
        </div>

        {/* 4. Right Column: Contact & Follow Us */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff' }}>
              聯絡我們
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#cbd5e1' }}>
              <Mail size={14} color="#b4ff04" /> official@gymspot.space
            </span>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              服務時間：週一至週日 10:00 - 18:00
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.03em' }}>
              Follow Us
            </span>
            <a
              href="https://www.instagram.com/gymspot_official?knvt=Njh3OHBiMnkxb2N5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram (@gymspot_official)"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#1e1e1e',
                border: '1px solid #333333',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.threads.com/@gymdpot_official?igshid=NTc4MTIwNjQ2YQ=="
              target="_blank"
              rel="noopener noreferrer"
              title="Threads (@gymdpot_official)"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#1e1e1e',
                border: '1px solid #333333',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '16px 0 24px',
  fontSize: '14px',
  border: '1px solid #d1d5db'
};

const thStyle = {
  background: '#f3f4f6',
  color: '#111827',
  fontWeight: 800,
  textAlign: 'left',
  padding: '10px 14px',
  border: '1px solid #d1d5db'
};

const tdStyle = {
  padding: '10px 14px',
  border: '1px solid #d1d5db',
  color: '#1f2937',
  verticalAlign: 'top'
};

const h2Style = {
  fontSize: '17.5px',
  fontWeight: 800,
  color: '#111827',
  margin: '28px 0 12px',
  paddingBottom: '6px',
  borderBottom: '1px solid #e5e7eb'
};

const introBoxStyle = {
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  padding: '16px 20px',
  marginBottom: '26px',
  fontSize: '14.5px',
  color: '#374151',
  lineHeight: 1.8
};

/**
 * 1. GYMspot 平台通用服務條款 V1.0 (/terms)
 */
export function GeneralTermsContent({ onNavigate }) {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 8px' }}>
        GYMspot 平台通用服務條款
      </h1>
      <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#4b5563', fontWeight: 700, marginBottom: '28px' }}>
        版本：V1.0
      </div>

      <div style={introBoxStyle}>
        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
          【肌動組 GYMspot 營運方重要法定權益與使用前提】
        </div>
        歡迎使用「肌動組 GYMspot」（下稱「本平台」）。本服務條款（下稱「本條款」）為您（包含自由教練、健身房／工作室經營業者及一般瀏覽使用者）與本平台營運團隊間具備完全法律效力之契約。當您點擊「註冊」、「登入」、「購買媒合方案」、「時段預約」或繼續使用本平台服務時，即視為您已完整審閱、充分理解並無保留同意遵守本條款全部內容，以及本平台另行公告之
        <button type="button" onClick={() => onNavigate?.('/privacy')} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit', fontWeight: 700 }}>《隱私權政策》</button>
        與各項專項規範。
      </div>

      <h2 style={h2Style}>第一條：平台定位、服務性質與第三方免責界線</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>技術與資訊媒合中介定位：</strong>本平台係基於地理定位演算法與資料庫技術，提供全台場租健身房價格查詢、設備規格檢視及「場地時段線上排程鎖定」之純技術服務工具。<strong>本平台絕非健身房場地之租賃出租人、二房東，亦非自由教練之雇主、代理人或教練與學員體適能課程承攬之當事人。</strong>
        </li>
        <li>
          <strong>交易不介入與抽成原則：</strong>除本條款明定之「時段預約技術服務費（鎖位金）」外，本平台不經手、不代收亦不抽成自由教練向學員收取之任何私人授課費用。場租費用之收取、發票開立與教學私約，均由授課教練與合作場館雙方直接依相關法令與民法租賃規定履行。
        </li>
        <li>
          <strong>場館即時數據免責：</strong>本平台各場館之價格、營業時間、合格保險及器材標籤，均來自公開蒐集或合作方自主申報登記。平台盡合理審查查核之義務，惟無法對場館現場臨時休館、設備臨時故障或突發性政策變動負即時擔保之法律責任，教練帶課前應以現場實際狀態為準。
        </li>
      </ol>

      <h2 style={h2Style}>第二條：時程表即時預約、場館時段媒合服務費與未依約到場（No-show）防制規範</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>預約媒合費之法律性質：</strong>自由教練使用本平台預約系統預約指定場館之特定授課時段時，平台將自教練已購之媒合方案中扣抵對應媒合額度（每次預約時段扣抵 1 次額度，約當 NT$ 25 至 30 元等值服務）。<strong>該筆費用性質為「平台系統排程演算與場館時段預約媒合之數位技術手續費」，一經系統確認預約完成即視為平台技術服務交付完畢。</strong>
        </li>
        <li>
          <strong>不予退費、場館疏失退額度與未依約到場罰則：</strong>除因場館發生重大火警、天災停電等不可抗力，<strong>或因合作場館方之過失（如現場臨時未開門、內部雙重排課等可歸責於場館之事由）致無法提供場地者，平台經查證屬實後將退還該次扣抵之媒合額度外</strong>，凡因教練個人排程異動、學員請假、遲到、忘記或個人疏忽而未到場使用者，該筆預約手續費概不退還。教練若有連續無故未依約到場（No-show）、惡意佔位阻礙他人使用之情事，本平台得逕行暫停或終止該帳號使用權，無須事先通知。
        </li>
        <li>
          <strong>禁止機器人搶位：</strong>用戶嚴禁使用外掛、自動化腳本或非法逆向工程干擾搶佔熱門時段。違反者除終止帳號服務權利外，本平台將依刑法妨害電腦使用罪及民法侵權行為追究其一切損害賠償責任。
        </li>
      </ol>

      <h2 style={h2Style}>第三條：線上預約媒合服務收費、7日猶豫期退款機制與消費者權益保障</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>服務項目與計價幣別：</strong>本平台提供自由教練與優質健身場館之時程排程與場位媒合服務，所有收費方案皆以<strong>新台幣 (NTD / TWD)</strong> 標示並計費，支援信用卡一次付清及平台結帳頁面實際提供之第三方支付工具。
        </li>
        <li>
          <strong>數位服務即時交付：</strong>用戶於本網站完成線上付款授權成功後，系統演算將立即開通該方案對應之場位排程媒合次數權限。
        </li>
        <li>
          <strong>消費者 7 日猶豫期退款政策：</strong>依據消費者保護法第十九條規定，用戶自線上完成付款之次日起算<strong>七日內</strong>，若所購買之預約媒合方案<strong>完全未使用任何場館預約媒合服務</strong>，得隨時透過本平台官方客服管道申請全額退款。經系統核對無誤後，將於 3 至 7 個工作日內依原金流管道辦理全額退款，絕不無故扣收解約違約金。
        </li>
        <li>
          <strong>客戶服務與爭議申訴聯絡管道：</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
            <li>營運品牌：肌動組 GYMspot 運動空間媒合平台</li>
            <li>客服專用信箱：<strong>official@gymspot.space</strong></li>
            <li>客服服務時間：週一至週日 10:00 - 18:00</li>
          </ul>
        </li>
      </ol>

      <h2 style={h2Style}>第四條：運動安全自主、意外傷害與法律責任極限完全排除</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>運動風險自我承擔：</strong>肌力體能訓練具有潛在之肉體疲勞、肌肉拉傷、骨折甚至突發心血管意外之生理風險。自由教練於現場指導時，應善盡專業注意義務，課前詳細評估學員身體狀態與訓練強度。
        </li>
        <li>
          <strong>人身傷害完全免責：</strong>教練與學員於場館內所發生之任何體傷、病變、突發猝死、爭執毆打、性騷擾或財物失竊等糾紛，<strong>純屬當事人間與場館管理之法律關係，本平台營運方不負任何形式之民事賠償、連帶清償或刑事責任。</strong>
        </li>
        <li>
          <strong>賠償金額最高上限：</strong>在適用法律允許之最大極限內，若因本平台系統嚴重故障或爭端致用戶遭受實質可歸責損害，本平台就單一用戶所承擔之全部累計民事賠償責任上限，<strong>以該用戶於事件發生前三十天內實際向本平台支付之系統手續費用總額為絕對最高上限。</strong>
        </li>
      </ol>

      <h2 style={h2Style}>第五條：用戶資料真實性聲明與平台無審查保證免責</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>資訊自主揭露與平台無審查義務：</strong>自由教練於個人檔案或預約資訊中所填載、上傳之體適能證照（如 ACE、NSCA、NASM、ACSM）、急救證照（CPR+AED）及經歷簡介，均由用戶自行提供與揭露，<strong>並應自行保證其真實性、合法性與有效性。本平台僅提供資訊展示介面，不對該等證照與資歷之真偽及教練之實際教學能力負實質審查或保證責任</strong>；合作場館與學員於實際合作或上課前，應自行向教練核對相關證件正本。
        </li>
        <li>
          <strong>資料不實之處置與損害追償：</strong>若經合作場館、學員檢舉或平台發現用戶有填載不實、偽造、變造或盜用他人證照之情事，<strong>本平台得不經通知立即移除相關資訊、暫停或永久終止其帳號使用權</strong>，並視情節配合司法機關調查。若因用戶資料不實致本平台遭受合作場館或任何第三方求償、訴訟或行政裁罰者，<strong>該違規用戶應對本平台負全部損害賠償責任（包含但不限於訴訟費用、合理律師費及和解金額）。</strong>
        </li>
      </ol>

      <h2 style={h2Style}>第六條：智慧財產權保護、準據法與管轄法院</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>智慧財產權歸屬：</strong>本平台所有軟體架構、使用者介面排版、品牌標誌（肌動組 GYMspot）、地圖標籤圖示、視覺設計與場館資料庫彙編著作，均為本平台開發營運方之智慧財產。非經書面同意，不得進行轉載、鏡像爬蟲抓取、逆向工程或商品化利用。
        </li>
        <li>
          <strong>條款修訂權限：</strong>本平台保留隨時因應法規變動或業務演進修正本條款之權利。修正後之條文自本平台公告日起生效，繼續使用服務即視為同意更新之合約內容。
        </li>
        <li>
          <strong>準據法與第一審管轄法院：</strong>本條款之解釋、履行及因本平台服務所引起之任何法律爭議，均以<strong>中華民國法律</strong>為準據法。除法律另有專屬管轄或消費者保護法第四十七條之規定外，雙方同意以<strong>臺灣桃園地方法院</strong>為第一審管轄法院。
        </li>
      </ol>
    </>
  );
}

/**
 * 2. GYMspot 隱私權政策 V1.0 (/privacy)
 */
export function PrivacyPolicyContent() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 8px' }}>
        GYMspot 隱私權政策
      </h1>
      <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#4b5563', fontWeight: 700, marginBottom: '28px' }}>
        版本：V1.0
      </div>

      <div style={introBoxStyle}>
        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
          【個人資料保護與隱私安全承諾】
        </div>
        「肌動組 GYMspot」（下稱「本平台」）由本平台營運團隊維護與營運。我們極為重視您的個人資料安全與隱私權益，並嚴格遵循中華民國《個人資料保護法》（下稱「個資法」）及相關法令規定。本《隱私權政策》（下稱「本政策」）旨在向您清楚說明，當您造訪本平台網站、使用地理定位查詢、註冊帳號、申請合作場館、購買媒合方案或進行時段預約時，本平台如何蒐集、處理、利用及保護您的個人資料。當您開始或繼續使用本平台服務，即表示您已充分閱讀、理解並同意本政策之全部內容。
      </div>

      <h2 style={h2Style}>第一條：個人資料蒐集之特定目的與法定類別</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>蒐集之特定目的：</strong>
          <div>本平台僅於提供運動空間資訊媒合、教練與場館帳號驗證、時段預約排程與通知、線上金流交易核對、客戶服務與爭議處理、系統資安維護及平台服務品質優化等特定目的範圍內，蒐集並處理您的個人資料。</div>
        </li>
        <li>
          <strong>蒐集之資料類別：</strong>
          <div>依您使用之身分（一般瀏覽者、自由教練或合作場館業者）與操作功能，本平台可能蒐集以下類別之資料：</div>
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>識別類資料：</strong>姓名或公開顯示暱稱、電子郵件信箱、聯絡電話，以及透過 Google 帳號快速登入（Google OAuth 授權）取得之基本識別資訊（包含您的 Google 帳戶顯示名稱、電子郵件地址、個人頭像網址及帳號唯一識別碼）。<strong>本平台僅取得上述基本登入驗證資訊，絕不會存取您的 Google 帳號密碼、郵件內容、行事曆或雲端硬碟等其他私人資料</strong>；若為合作場館業者，另包含場館聯絡人資訊與營業聯絡方式。
            </li>
            <li>
              <strong>專業與場館資訊類：</strong>自由教練自行填載或上傳之體適能證照影像、急救證照資訊、教學經歷簡介與頭像；合作場館提供之場地照片、空間規格、營業時間與收費標準。
            </li>
            <li>
              <strong>地理定位資訊：</strong>當您授權開啟定位功能以搜尋鄰近場租健身房時，本平台將即時讀取您的裝置經緯度座標（GPS 定位資訊），<strong>該定位數據僅用於即時計算與場館之距離排序，本平台不會在伺服器端長期留存或追蹤您的歷史移動軌跡。</strong>
            </li>
            <li>
              <strong>交易與預約紀錄類：</strong>媒合方案購買紀錄、額度扣抵與剩餘明細、場館預約時段紀錄、客服申訴往來紀錄。<strong>本平台絕不儲存您的完整信用卡卡號、安全碼（CVV）或網路銀行密碼</strong>，所有線上付款資料均由合規之第三方金流服務商透過加密通道直接處理。
            </li>
            <li>
              <strong>系統連線與設備紀錄：</strong>IP 位址、瀏覽器類型、作業系統版本、裝置識別資訊、造訪時間及頁面瀏覽操作日誌（用於資安防護、異常流量偵測與防止機器人惡意搶位）。
            </li>
          </ul>
        </li>
      </ol>

      <h2 style={h2Style}>第二條：個人資料利用之期間、地區、對象及方式</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>利用期間：</strong>自您註冊成為本平台會員或開始使用相關服務之日起，至您主動請求刪除帳號、終止服務，或本平台停止營運之日止；惟依稅法、商業會計法或其他法令規定須保存之交易與帳務紀錄，將依法定保存年限留存。
        </li>
        <li>
          <strong>利用地區：</strong>中華民國（臺灣）境內，以及本平台所使用之雲端基礎設施、郵件發送與數據分析服務伺服器所在之合法合規地區。
        </li>
        <li>
          <strong>利用對象：</strong>除本平台營運團隊外，僅於達成服務目的之必要範圍內提供予下列對象：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>預約媒合之相對人：</strong>當自由教練送出特定場館之時段預約申請時，本平台會將該教練之姓名／暱稱、聯絡方式及預約時段等必要核驗資訊，揭露予該指定合作場館以利現場核對入場；合作場館之公開聯絡與地址資訊亦會揭露予預約之教練。</li>
            <li><strong>協力服務供應商：</strong>包含受本平台委託提供雲端主機託管、線上金流支付清算、系統預約與驗證通知信發送（Email 通知服務）及網站流量統計分析之第三方技術服務商。本平台均要求該等協力廠商嚴格遵守保密義務與資安標準。</li>
            <li><strong>依法有權機關：</strong>配合司法機關、檢調單位或主管機關依法定程序提出之調閱或調查要求。</li>
          </ul>
        </li>
        <li>
          <strong>利用方式：</strong>以自動化機器（如系統資料庫運算、自動發信排程）或其他非自動化之合理安全方式進行蒐集、處理與利用。
        </li>
      </ol>

      <h2 style={h2Style}>第三條：資料安全防護措施與第三方網站連結</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>技術與管理安全防護：</strong>本平台採用全程 SSL／TLS 傳輸加密協定保護資料傳輸安全，並於雲端資料庫實施嚴格的存取權限隔離控管、防火牆防護及定期安全備份機制，防止個人資料遭未經授權之存取、竄改、洩漏或毀損。
        </li>
        <li>
          <strong>帳號保管責任：</strong>本平台主要支援透過 Google 帳號進行第三方安全驗證登入，並輔以電子郵件一次性驗證碼機制，<strong>本平台不會經手或儲存您的任何登入密碼或 Google 帳號密碼</strong>。請妥善保管您所綁定之 Google 帳號授權權限、電子郵件信箱與個人裝置安全，切勿將一次性驗證碼或帳號提供予第三人使用。若發現帳號有遭盜用之虞，請立即透過官方客服信箱通知本平台處理。
        </li>
        <li>
          <strong>外部第三方網站連結：</strong>本平台頁面可能包含合作場館之官方網站、社群媒體或第三方金流頁面連結。當您點擊離開本平台進入外部網站時，該網站之個人資料保護適用其各自之隱私權政策，本平台不負連帶責任。
        </li>
      </ol>

      <h2 style={h2Style}>第四條：Cookie 與網站分析技術之使用</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>使用目的：</strong>為維持您的登入狀態、記憶地圖篩選偏好、提升系統操作流暢度，並分析整體網站流量與使用趨勢以優化服務體驗，本平台會在您的瀏覽器中寫入並讀取 Cookie 或同類本地端儲存技術（如 Local Storage），並可能搭配使用網站流量分析工具（如 Google Analytics）。
        </li>
        <li>
          <strong>管理與拒絕方式：</strong>您可隨時透過瀏覽器之隱私權設定限制或停用 Cookie 功能；惟若完全停用必要性 Cookie，可能導致無法正常維持登入狀態或影響時段預約系統之運作。
        </li>
      </ol>

      <h2 style={h2Style}>第五條：個資當事人法定權利與行使方式</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>您的法定權利：</strong>依據中華民國《個人資料保護法》第三條規定，您就本平台所保有之個人資料，得隨時行使下列權利：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
            <li>查詢或請求閱覽。</li>
            <li>請求製給複製本。</li>
            <li>請求補充或更正。</li>
            <li>請求停止蒐集、處理或利用。</li>
            <li>請求刪除（含申請註銷帳號及移除個人資料）。</li>
          </ul>
        </li>
        <li>
          <strong>行使方式與處理時效：</strong>如您欲行使上述權利，請透過本平台官方客服信箱（<strong>official@gymspot.space</strong>）提出申請。為保障您的帳號安全，本平台將於核對申請人身分無誤後，依法定期限儘速完成處理並回覆（依個資法規定，查詢或製給複製本之請求，本平台得酌收必要成本費用）。
        </li>
        <li>
          <strong>未成年人保護：</strong>本平台主要服務對象為成年之自由教練、場館經營業者及具備完全行為能力之使用者。若您未滿十八歲，應於法定代理人閱讀、理解並同意本政策後，方得使用本平台服務。
        </li>
      </ol>

      <h2 style={h2Style}>第六條：隱私權政策之修訂與聯絡管道</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>政策修訂與公告：</strong>本平台保留因應法令修正、技術演進或營運需求隨時修訂本政策之權利。修訂後之條文將公告於本平台網站顯著位置並更新版本日期，不另行個別通知；若您於政策修訂後繼續使用本平台服務，即視為您已同意接受修訂後之內容。
        </li>
        <li>
          <strong>隱私權諮詢與客服聯絡管道：</strong>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>項目</th>
                <th style={thStyle}>詳細資訊</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 700 }}>營運品牌</td>
                <td style={tdStyle}>肌動組 GYMspot 運動空間媒合平台</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 700 }}>客服專用信箱</td>
                <td style={tdStyle}>official@gymspot.space</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 700 }}>客服服務時間</td>
                <td style={tdStyle}>週一至週日 10:00 - 18:00</td>
              </tr>
            </tbody>
          </table>
        </li>
      </ol>
    </>
  );
}

/**
 * 3. GYMspot 平台場館預約與交易服務條款 V1.0 (/booking-terms)
 */
export function BookingTermsContent({ onNavigate }) {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 8px' }}>
        GYMspot 平台場館預約與交易服務條款
      </h1>
      <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#4b5563', fontWeight: 700, marginBottom: '28px' }}>
        版本：V1.0
      </div>

      <div style={introBoxStyle}>
        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
          【場館預約排程與數位技術交易前提】
        </div>
        本《平台場館預約與交易服務條款》（下稱「本條款」）係《肌動組 GYMspot 平台通用服務條款》之特別增補協議，專就自由教練（下稱「教練」或「用戶」）於「肌動組 GYMspot」（下稱「本平台」）購買時段預約媒合方案、線上支付數位技術服務費，以及透過本平台向合作健身場館（下稱「合作場館」）發起時段預約之交易流程與權責關係所訂定。當您於本平台點擊「購買方案」、「前往結帳」或「送出時段預約」時，即表示您已完整審閱並同意遵守本條款之全部內容，以及本平台另行公告之
        <button type="button" onClick={() => onNavigate?.('/refund-policy')} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', fontSize: 'inherit', fontWeight: 700 }}>《GYMspot 退款或取消預約政策》</button>
        與各項交易規則。
      </div>

      <h2 style={h2Style}>第一條：交易性質定位與雙方契約關係</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>純技術媒合與系統排程服務：</strong>本平台所提供之收費服務，僅限於「線上時程排程演算、場位即時狀態查詢及預約資訊傳遞」之數位技術服務（即預約媒合額度）。<strong>本平台絕非場地出租人、二房東，亦非場館租賃契約或教練與學員間私人教學契約之當事人。</strong>
        </li>
        <li>
          <strong>場租與授課費用獨立結算：</strong>用戶支付予本平台之款項僅為「平台預約媒合技術服務費」。合作場館之實際場地租賃費用（如單次入場費、鐘點場租費）、開立發票或收據事宜，以及教練向學員收取之授課費用，均由教練、合作場館與學員三方依現場規定與相關法令自行結算，本平台概不經手、不代收亦不抽取任何佣金。
        </li>
      </ol>

      <h2 style={h2Style}>第二條：預約媒合方案計價、線上支付與電子憑證</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>計價幣別與方案內容：</strong>本平台所有預約媒合方案均以<strong>新台幣（NTD / TWD）</strong>計價並結算（每次成功預約單一場館時段扣抵 1 次媒合額度，約當新台幣 25 至 30 元等值技術服務）。各方案之實際價格、包含額度次數及有效使用期限（如有），均以結帳頁面當下公告之方案說明為準。
        </li>
        <li>
          <strong>線上金流支付方式：</strong>用戶購買媒合方案時，可透過本平台串接之合規第三方支付金流（支援信用卡一次付清及結帳頁面實際提供之多元支付工具）進行線上即時付款。
        </li>
        <li>
          <strong>數位服務即時交付與入帳：</strong>用戶完成線上付款授權並經金流系統回傳交易成功後，本平台系統將自動且即時將對應之「預約媒合額度」匯入您的會員帳戶中，自額度入帳時起即視為平台數位技術服務已開始交付。
        </li>
        <li>
          <strong>交易憑證與稅務開立：</strong>用戶完成線上付款後，本平台將依中華民國稅法規定開立電子發票或合法交易憑證，並寄送至您綁定之電子郵件信箱。
        </li>
      </ol>

      <h2 style={h2Style}>第三條：場館時段預約申請、審核確認與正式扣點機制</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>預約時間限制與點數暫時凍結（預扣）：</strong>教練預約場館時段，最晚必須於預計授課時段開始前 2 小時送出預約申請；送出申請時，系統將暫時凍結（預扣）帳戶內對應之「預約媒合額度（每次 1 點／次）」，並透過系統自動化通知信（Email）或平台訊息傳送予該合作場館。
        </li>
        <li>
          <strong>場館人工審核與「同意預約方正式扣點」原則：</strong>本平台全面採行「合作場館人工審核確認制」，合作場館須於接收預約通知後 1 小時內完成審核回覆：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>場館同意（核准）預約：</strong>唯有在合作場館點擊確認並同意該筆預約時，預約方正式成立，系統亦於此時將預扣點數轉為<strong>正式扣抵</strong>。</li>
            <li><strong>未獲同意前之取消、婉拒或逾時返還：</strong>在合作場館正式同意預約前，無論係<strong>教練自行取消該筆待審核申請、合作場館因滿額或排程因素婉拒，或合作場館超過 1 小時未予回覆致系統自動取消失效</strong>，該筆預約均未成立，系統將立即解除點數凍結並全額返還至教練帳戶。</li>
          </ul>
        </li>
        <li>
          <strong>現場核驗義務：</strong>預約正式成立後，教練前往合作場館帶課時，應主動出示本平台之預約確認畫面或核驗資訊，並遵守該合作場館之門禁管理、器材使用及安全規範。
        </li>
      </ol>

      <h2 style={h2Style}>第四條：異常排程、禁止不當佔位與系統交易安全</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>禁止惡意佔位與轉讓：</strong>教練帳戶內之預約媒合額度及已成立之場館時段預約，僅限註冊教練本人帶課使用，嚴禁私下轉售、轉讓他人使用，或無故大量預約後頻繁取消以惡意佔用合作場館熱門時段。
        </li>
        <li>
          <strong>禁止自動化腳本干擾交易：</strong>用戶不得使用任何爬蟲程式、外掛軟體、自動化搶位腳本或利用系統漏洞進行異常下單與預約。若經系統偵測屬實，本平台得立即凍結該帳號及剩餘額度、取消異常預約時段，並保留追究相關民刑事法律責任之權利。
        </li>
      </ol>

      <h2 style={h2Style}>第五條：取消預約、未依約到場處理與退款機制銜接</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>退費與額度返還規則：</strong>關於媒合方案購買後之「消費者 7 日猶豫期全額退刷條件」、已成立預約之取消時限、教練個人原因取消或未依約到場（No-show）不退還額度原則，以及因天災不可抗力或合作場館方過失（如未開門、雙重排課）致無法使用場地時之額度退還機制，<strong>悉依本平台《GYMspot 退款或取消預約政策》之規定辦理。</strong>
        </li>
        <li>
          <strong>交易爭議與客服處理管道：</strong>若用戶對線上刷卡扣款金額、額度入帳異常或預約狀態有疑義，請保留交易編號並透過以下官方管道聯繫客服查核：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
            <li><strong>營運品牌：</strong>肌動組 GYMspot 運動空間媒合平台</li>
            <li><strong>客服專用信箱：</strong>official@gymspot.space</li>
            <li><strong>客服服務時間：</strong>週一至週日 10:00 - 18:00</li>
          </ul>
        </li>
      </ol>

      <h2 style={h2Style}>第六條：條款效力、修訂與管轄法院</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>條款適用順序：</strong>本條款未盡事宜，悉依《肌動組 GYMspot 平台通用服務條款》及中華民國相關法令補充之；若本條款與通用服務條款就場館預約及線上交易事項有不同規定者，優先適用本條款。
        </li>
        <li>
          <strong>條款修訂與準據法：</strong>本平台保留因應業務發展與法規調整修訂本條款之權利。因本條款所生之任何爭議，均以<strong>中華民國法律</strong>為準據法，並除法律另有專屬管轄或消費者保護法第四十七條規定外，以<strong>臺灣桃園地方法院</strong>為第一審管轄法院。
        </li>
      </ol>
    </>
  );
}

/**
 * 4. GYMspot 退款或取消預約政策 V1.0 (/refund-policy)
 */
export function RefundPolicyContent() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 8px' }}>
        GYMspot 退款或取消預約政策
      </h1>
      <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#4b5563', fontWeight: 700, marginBottom: '28px' }}>
        版本：V1.0
      </div>

      <div style={introBoxStyle}>
        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
          【交易退款與預約取消處理原則】
        </div>
        <p style={{ margin: '0 0 10px' }}>
          本《退款或取消預約政策》（下稱「本政策」）係《肌動組 GYMspot 平台通用服務條款》及《肌動組 GYMspot 平台場館預約與交易服務條款》之重要組成部分，專就用戶（自由教練）於「肌動組 GYMspot」（下稱「本平台」）購買預約媒合方案後之現金退刷退款條件，以及送出合作場館時段預約後之預約取消與媒合額度返還規則所訂定。
        </p>
        <p style={{ margin: 0 }}>
          本政策之訂定同時遵循第三方金流服務商（包含但不限於 PAYUNi、icash Pay 等金流代收轉付平台）之風險管理與交易審核規範。當您於本平台進行方案購買或時段預約時，即表示您已充分閱讀、理解並同意本政策之全部規定。本平台相關業務均由「肌動組 GYMspot 營運方 / 營運團隊」統籌營運維護。
        </p>
      </div>

      <h2 style={h2Style}>第一條：線上購買媒合方案之「7 日猶豫期」現金退刷政策</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>7 日內完全未使用之全額退款：</strong>
          <div>依據中華民國《消費者保護法》第十九條及《通訊交易解除權合理例外情事適用準則》規定，用戶自線上完成購買預約媒合方案付款之<strong>次日起算七日（日曆天）內</strong>，若該筆訂單所購買之預約媒合額度<strong>完全未使用（即未曾送出任何一筆場館時段預約申請，且額度保持 100% 完整）</strong>，得隨時透過本平台官方客服管道申請全額退費，本平台絕不無故扣收任何解約手續費或違約金。</div>
        </li>
        <li>
          <strong>不適用現金退費之例外情事（數位服務一經使用即交付）：</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>方案已開始使用：</strong>用戶於購買方案後，<strong>凡已使用至少 1 次（含）以上預約媒合額度</strong>，即代表該數位技術排程服務已開始履行並部分交付，恕不受理剩餘額度之折現或部分現金退款（惟剩餘額度仍可於有效期限內繼續用於預約合作場館）。</li>
            <li><strong>逾越 7 日猶豫期：</strong>線上付款完成之次日起算已超過七日者，即使方案額度尚未使用，亦不再受理現金退款申請。</li>
            <li><strong>違規停權帳號：</strong>若用戶因違反平台服務條款（如惡意佔位、使用外掛腳本或提供偽造證照）遭肌動組 GYMspot 營運團隊永久停權者，其帳戶內剩餘之未使用額度不予退費。</li>
          </ul>
        </li>
        <li>
          <strong>退刷作業流程與額度返還機制：</strong>
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>用戶符合全額退費條件並提出申請後，肌動組 GYMspot 營運團隊將於核對訂單與系統額度紀錄無誤後，於 <strong>3 至 7 個工作日內</strong>發起第三方金流服務商（PAYUNi / icash Pay）之退刷程序，依原線上支付管道辦理全額退款。</li>
            <li><strong>信用卡退刷：</strong>原刷卡金額將全額退回原發卡銀行，實際入帳或刷退折抵時間依各發卡銀行之結帳週期與作業進度為準。</li>
            <li><strong>電子支付（如 icash Pay）退刷：</strong>交易退款將透過金流系統退還至原扣款之電子支付帳戶或綁定銀行帳戶，實際額度返還與入帳時間依該電子支付機構之系統處理規範為準。</li>
          </ul>
        </li>
      </ol>

      <h2 style={h2Style}>第二條：單次場館時段預約之取消與「媒合額度（點數）」返還規則</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>「場館同意預約」方正式扣點與服務交付原則：</strong>教練最晚須於預計授課前 2 小時送出預約申請。申請送出時系統僅暫時凍結（預扣）1 點媒合額度，<strong>唯有在合作場館於人工審核確認同意預約時，系統方正式扣點並視為該次數位技術媒合服務交付完畢</strong>；預約正式成立後，該次扣抵點數概不退還現金。
        </li>
        <li>
          <strong>全額返還媒合點數之情形（未正式扣點或非可歸責於教練事由）：</strong>凡符合下列任一情形者，系統將自動解除凍結或於查證屬實後 <strong>1 至 3 個工作日內</strong>全額返還該次媒合點數至教練帳戶（不退現金）：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li><strong>場館同意預約前之取消、婉拒或逾時未回覆：</strong>在合作場館尚未確認同意該筆預約前，無論係<strong>教練自行取消該筆待審核申請、合作場館婉拒預約，或合作場館超過 1 小時審核時限未予回覆致系統自動取消失效</strong>，系統均未正式扣點，並將即時解除凍結全額返還點數。</li>
            <li><strong>合作場館方之過失：</strong>場館同意預約成立後，因合作場館方疏失（包含但不限於場館現場臨時未開門、內部雙重排課 Double Booking、未事先公告之臨時公休或主要訓練設施全面故障）致教練無法帶課者（教練請於原定預約時段起 24 小時內拍照或留存紀錄回報官方客服）。</li>
            <li><strong>天災與不可抗力因素：</strong>場館同意預約成立後，發生經政府機關發布停班停課之颱風、地震、重大火警、區域性無預警停電等不可抗力事件，致場館無法正常營業者。</li>
          </ul>
        </li>
        <li>
          <strong>不予返還媒合點數之情形（場館已同意成立且歸責於教練或學員事由）：</strong>合作場館確認同意預約、預約正式成立並完成扣點後，凡因下列事由導致未能實際前往場館授課者，該次已扣抵之媒合點數<strong>概不返還</strong>：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>教練個人行程變更、忘記時間、遲到或臨時主動取消已成立之預約。</li>
            <li>教練之私人授課學員臨時請假、取消課程或未依約到場（No-show）。</li>
            <li>教練未依約攜帶必要證件或未遵守合作場館現場規範致遭場館拒絕入場。</li>
          </ul>
        </li>
      </ol>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>交易與預約類型</th>
              <th style={thStyle}>情境條件</th>
              <th style={thStyle}>處理方式</th>
              <th style={thStyle}>金流 / 額度返還管道</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>購買方案（7日內）</td>
              <td style={tdStyle}>未使用任何額度 (100% 完整)</td>
              <td style={tdStyle}>全額現金退款 (退刷)</td>
              <td style={tdStyle}>原信用卡 / icash Pay 管道退刷</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>購買方案（7日內）</td>
              <td style={tdStyle}>已使用 1 次 (含) 以上額度</td>
              <td style={tdStyle}>恕不退費，可繼續使用</td>
              <td style={tdStyle}>不適用</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>購買方案（超過7日）</td>
              <td style={tdStyle}>無論是否使用額度</td>
              <td style={tdStyle}>恕不退費，可繼續使用</td>
              <td style={tdStyle}>不適用</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>預約待審核階段（場館尚未同意）</td>
              <td style={tdStyle}>教練自行取消申請、場館婉拒或逾 1 小時未回覆</td>
              <td style={tdStyle}>未正式扣點，全額返還點數</td>
              <td style={tdStyle}>即時解除凍結並返還至平台帳戶</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>預約已成立（場館已同意扣點）</td>
              <td style={tdStyle}>教練個人因素取消、學員請假、未依約到場（No-show）</td>
              <td style={tdStyle}>扣抵額度概不返還</td>
              <td style={tdStyle}>不適用</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 700 }}>預約已成立（場館已同意扣點）</td>
              <td style={tdStyle}>合作場館過失（未開門／雙重排課）、天災不可抗力</td>
              <td style={tdStyle}>全額返還預約點數</td>
              <td style={tdStyle}>返還至平台帳戶額度 (不退現)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>第三條：合作場館現場「場地租賃費」之退費聲明</h2>
      <p style={{ margin: 0 }}>
        本平台僅負責收取「平台預約媒合技術服務費（額度）」，並不經手或代收任何合作場館之現場場租費用。若教練已另行向合作場館支付單次入場費、鐘點場租或儲值金，該筆場租費用之取消時限、改期或退費規則，<strong>悉依該合作場館各自公告之營業規範辦理，並由教練與合作場館直接協商結算</strong>，肌動組 GYMspot 營運團隊不介入亦不負代為退款或連帶賠償之責任。
      </p>

      <h2 style={h2Style}>第四條：退款及額度返還申請管道</h2>
      <p style={{ margin: '0 0 10px' }}>
        若您符合本政策規定之「7 日內未使用全額現金退刷」或「場館疏失／不可抗力之額度返還」條件，請提供您的註冊電子郵件信箱、訂單編號或預約編號及相關佐證資訊（如現場照片或通訊紀錄），透過以下官方管道聯繫肌動組 GYMspot 營運團隊辦理：
      </p>
      <ul style={{ margin: 0, paddingLeft: '22px' }}>
        <li><strong>營運品牌：</strong>肌動組 GYMspot 運動空間媒合平台</li>
        <li><strong>客服專用信箱：</strong>official@gymspot.space</li>
        <li><strong>客服服務時間：</strong>週一至週日 10:00 - 18:00</li>
      </ul>

      <h2 style={h2Style}>第五條：政策修訂與準據法</h2>
      <p style={{ margin: 0 }}>
        肌動組 GYMspot 營運團隊保留因應業務營運、金流合作方風險控管或相關法令變更時修訂本政策之權利，修訂後之最新內容將公告於本平台網站並自公告日起即時生效。本政策之解釋與適用均以<strong>中華民國法律</strong>為準據法；如有爭議，除法律另有專屬管轄或消費者保護法第四十七條規定外，雙方同意以<strong>臺灣桃園地方法院</strong>為第一審管轄法院。
      </p>
    </>
  );
}

/**
 * 5. GYMspot 自由教練服務條款 V1.0 (/coach-terms)
 */
export function CoachTermsContent() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 8px' }}>
        GYMspot 自由教練服務條款
      </h1>
      <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#4b5563', fontWeight: 700, marginBottom: '28px' }}>
        版本：V1.0
      </div>

      <div style={introBoxStyle}>
        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
          【自由教練身分定位與使用前提】
        </div>
        本《自由教練服務條款》（下稱「本條款」）係《肌動組 GYMspot 平台通用服務條款》之特別增補協議，專就以自由教練（下稱「教練」或「您」）身分註冊並使用「肌動組 GYMspot」（下稱「本平台」）進行場地資訊查詢、購買預約媒合方案及申請合作場館授課時段之權利義務所訂定。當您於本平台註冊教練帳號、完善個人專業檔案或送出任何場館時段預約申請時，即視為您已完整審閱、充分理解並同意遵守本條款，以及本平台公告之《平台通用服務條款》、《隱私權政策》、《平台場館預約與交易服務條款》及《退款或取消預約政策》之全部規定。
      </div>

      <h2 style={h2Style}>第一條：非僱傭、非承攬與獨立執業關係聲明</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>純技術工具使用關係：</strong>本平台僅提供地理位置查詢、場館規格檢視及時段預約排程之數位技術服務。<strong>教練與肌動組 GYMspot 營運團隊之間不存在任何僱傭、委任、代理、合夥或課程承攬關係</strong>，教練非本平台之員工或履行輔助人，亦不得對外以本平台官方代表或授權講師名義招攬業務。
        </li>
        <li>
          <strong>私人授課獨立結算：</strong>教練向其學員招攬課程、訂定授課費用、安排教學內容及開立稅務憑證，均屬教練與學員間之獨立法律關係。除教練向本平台購買預約媒合額度之數位技術服務費外，<strong>本平台不經手、不代收亦不抽取教練私人授課費用之任何佣金</strong>。
        </li>
        <li>
          <strong>場地租賃獨立履行：</strong>預約正式成立後，教練應依該合作場館之收費標準於現場直接繳納場租或入場費用，場地租賃關係直接存在於教練與合作場館之間。
        </li>
      </ol>

      <h2 style={h2Style}>第二條：教練帳號註冊、資料真實性與無審查保證聲明</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>資訊自主揭露與真實性保證：</strong>教練於個人檔案或預約資訊中所填載、上傳之姓名／暱稱、聯絡方式、體適能專業證照（如 ACE、NSCA、NASM、ACSM 等）、急救證照（CPR+AED）及教學經歷簡介，均由教練自行提供並應保證其百分百真實、合法且在有效期限內。
        </li>
        <li>
          <strong>平台無實質審查義務：</strong><strong>本平台僅提供資訊展示與傳遞介面，不對教練所填載證照、資歷之真偽及實際教學專業能力負實質審查或保證責任</strong>；合作場館與學員於實際合作或上課前，得要求教練出示相關證件正本以供核對。
        </li>
        <li>
          <strong>資料不實之停權與追償責任：</strong>若經合作場館、學員檢舉或平台發現教練有填載不實、偽造、變造或盜用他人證照及身分之情事，<strong>本平台得不經通知立即移除相關資訊並永久停權</strong>，並視情節配合司法機關調查。若因教練資料不實致本平台遭受合作場館或任何第三方求償、訴訟或行政裁罰者，<strong>該違規教練應對本平台負全部損害賠償責任（包含但不限於訴訟費用、合理律師費及和解金額）</strong>。
        </li>
      </ol>

      <h2 style={h2Style}>第三條：時段預約申請、場館人工審核與正式扣點規範</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>預約時間限制與額度預扣：</strong>教練申請預約合作場館時段，<strong>最晚必須於預計授課時段開始前 2 小時送出預約申請</strong>。送出申請時，系統將暫時凍結（預扣）帳戶內 1 點媒合額度，並發送預約通知予該合作場館。
        </li>
        <li>
          <strong>場館 1 小時人工審核與正式扣點：</strong>本平台全面採行「合作場館人工審核確認制」，合作場館須於接收預約通知後 <strong>1 小時內</strong>完成審核回覆。<strong>唯有在合作場館點擊確認並同意該筆預約時，預約方正式成立，系統亦於此時將預扣點數轉為正式扣抵</strong>；在場館同意預約前，無論係教練自行取消待審核申請、場館婉拒或超過 1 小時未回覆致系統自動取消失效，系統均未正式扣點，並將即時解除凍結全額返還點數。
        </li>
        <li>
          <strong>遵守場館規章與準時履約：</strong>預約正式成立後，教練應準時前往合作場館報到，主動出示本平台預約確認畫面配合現場核驗，並嚴格遵守該合作場館之門禁管理、器材歸位、衛生清潔及安全規範。
        </li>
      </ol>

      <h2 style={h2Style}>第四條：未依約到場防制與違規帳號處置</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>已成立預約之未依約到場處理：</strong>合作場館確認同意預約並完成正式扣點後，若因教練個人行程變更、忘記時間、遲到、臨時主動取消，或因教練之學員請假、未依約到場致未能實際前往授課者，該次已扣抵之媒合點數<strong>概不返還</strong>（詳細退費與額度返還規則悉依《GYMspot 退款或取消預約政策》辦理）。
        </li>
        <li>
          <strong>惡意佔位與頻繁未依約到場罰則：</strong>教練不得無故大量申請預約後頻繁取消、私下轉售或轉讓已成立之預約時段予他人，亦不得於預約正式成立後連續無故未依約到場（No-show）或現場拒繳合作場館場租費用。經合作場館回報或系統查證屬實者，肌動組 GYMspot 營運團隊得視情節輕重採取警告、限制預約權限、凍結帳戶或永久終止帳號使用權等處置。
        </li>
      </ol>

      <h2 style={h2Style}>第五條：指導安全注意義務與教學意外完全免責</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>專業安全評估義務：</strong>教練於合作場館內進行一對一或團體體適能指導時，應本於運動科學與專業倫理善盡注意義務，課前充分評估學員身體健康狀況、既往傷病史並確認器材使用安全，嚴禁超出學員生理負荷之不當訓練指導。
        </li>
        <li>
          <strong>教學與場館意外免責：</strong>教練與學員於合作場館內所發生之任何運動傷害、肌肉拉傷、骨折、突發心血管病變、器材操作意外、財務糾紛、肢體衝突或性騷擾等情事，<strong>純屬教練、學員與合作場館當事人間之法律關係，肌動組 GYMspot 營運團隊不負任何形式之民事賠償、連帶清償或刑事責任</strong>。若因教練之故意或過失致合作場館設施損壞或第三人受有損害，應由教練自行承擔全部賠償責任。
        </li>
      </ol>

      <h2 style={h2Style}>第六條：聯絡管道、條款修訂與準據法</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>客服與爭議諮詢管道：</strong>若教練於使用本平台過程中遇有系統操作問題、場館現場狀況回報（如場館未開門或雙重排課等情事）或條款諮詢，請透過以下官方管道聯繫：
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>項目</th>
                <th style={thStyle}>內容描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 700 }}>營運品牌</td>
                <td style={tdStyle}>肌動組 GYMspot 運動空間媒合平台</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 700 }}>客服專用信箱</td>
                <td style={tdStyle}>official@gymspot.space</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: 700 }}>客服服務時間</td>
                <td style={tdStyle}>週一至週日 10:00 - 18:00</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          <strong>條款適用順序與管轄法院：</strong>本條款未盡事宜，悉依《肌動組 GYMspot 平台通用服務條款》及中華民國相關法令補充之。肌動組 GYMspot 營運團隊保留因應業務發展與法規調整修訂本條款之權利。因本條款所生之任何爭議，均以<strong>中華民國法律</strong>為準據法，並除法律另有專屬管轄或消費者保護法第四十七條規定外，以<strong>臺灣桃園地方法院</strong>為第一審管轄法院。
        </li>
      </ol>
    </>
  );
}

/**
 * 6. GYMspot 合作場館服務條款 V1.0 (/venue-terms 及 /partner 簽署條款)
 */
export function VenueTermsContent() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 8px' }}>
        GYMspot 合作場館服務條款
      </h1>
      <div style={{ textAlign: 'center', fontSize: '13.5px', color: '#4b5563', fontWeight: 700, marginBottom: '28px' }}>
        版本：V1.0
      </div>

      <div style={introBoxStyle}>
        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
          【合作場館上架合作與媒合定位前提】
        </div>
        本《合作場館服務條款》（下稱「本條款」）係《肌動組 GYMspot 平台通用服務條款》之特別增補協議，專就申請加入「肌動組 GYMspot」（下稱「本平台」）展示空間資訊並開放自由教練預約時段之健身房、運動工作室或運動空間經營業者（下稱「合作場館」或「貴場館」）與肌動組 GYMspot 營運團隊間之權利義務所訂定。當貴場館提交場館上架申請資料、啟用場館管理或審核功能，或開始透過本平台接收教練時段預約通知時，即視為貴場館已完整審閱、充分理解並同意遵守本條款，以及本平台公告之《平台通用服務條款》、《隱私權政策》、《平台場館預約與交易服務條款》及《退款或取消預約政策》之全部規定。
      </div>

      <h2 style={h2Style}>第一條：純媒合定位與獨立經營關係聲明</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>資訊展示與排程媒合定位：</strong>本平台僅提供地理位置地圖展示、場館規格資訊揭露及線上時段預約通知傳遞之數位技術服務。<strong>肌動組 GYMspot 營運團隊絕非貴場館之承租人、二房東、合夥人、代理人或共同經營者</strong>，貴場館之場地營運管理、門禁管制及現場空間使用規則均由貴場館獨立自主決定。
        </li>
        <li>
          <strong>場租獨立收取與零抽成原則：</strong>貴場館向進場授課之自由教練收取之單次入場費、鐘點場租費、儲值方案費用及相關發票或收據開立事宜，<strong>悉由貴場館於現場直接與自由教練結算並依稅法規定辦理</strong>，本平台概不經手、不代收亦不向貴場館抽取任何場租佣金。
        </li>
      </ol>

      <h2 style={h2Style}>第二條：申請人代表權限保證、場館資料真實性與安全合規</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>申請人代表權限保證與無權代理個人責任：</strong>提交場館進駐申請之自然人（操作人），保證其為貴場館之合法負責人、股東，或已取得貴場館合法負責人明確授權辦理本平台上架及預約審核業務之代表人。<strong>若填寫人未具備合法代表或授權資格，擅自冒用場館名義提交資料、接受預約或發布不實資訊者，該申請行為對真實場館不生效力，且填寫人應以「無權代理人」身分自負全部民、刑事法律責任（包含但不限於《刑法》偽造文書、妨害名譽、妨害信用罪及《民法》無權代理與侵權行為損害賠償）。</strong>本平台接獲真實場館權利人檢舉或發現冒名情事時，得不經通知立即下架該場館頁面並凍結申請人帳號；若因此致本平台遭受真實場館、教練或第三方求償、訴訟或行政裁罰者，<strong>填寫人個人應對肌動組 GYMspot 營運團隊負全部損害賠償責任（包含但不限於訴訟費用、合理律師費及和解金額）。</strong>
        </li>
        <li>
          <strong>上架資訊真實與即時更新義務：</strong>貴場館提供予本平台上架展示之場館名稱、營業地址、開放時段、場租收費標準、器材設備清單、空間照片及聯絡方式，保證均為真實、合法且具備完整著作權或合法授權之資料（並同意授權本平台於本網站及相關推廣頁面展示使用）。若貴場館之收費標準、營業時間或公休日期有所異動，應主動通知本平台或自行於後台更新，避免產生現場交易認知落差。
        </li>
        <li>
          <strong>合法營業與公共安全合規責任：</strong>貴場館保證其營業場所符合中華民國建築法規、消防安全檢查規定，並依法辦理相關營業登記及投保足額之公共意外責任險。若因貴場館違反法令規定、未依法投保或場地設施缺陷致遭主管機關裁罰或第三方求償者，均由貴場館自行承擔全部法律責任。
        </li>
      </ol>

      <h2 style={h2Style}>第三條：預約通知「建議 30 分鐘、最晚 1.5 小時內人工審核」與場地保留履約義務</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>人工審核確認機制與回覆時限：</strong>自由教練最晚將於預計授課時段開始前 2 小時透過本平台送出預約申請。本平台全面採行「合作場館人工審核確認制」，貴場館於接收到系統發送之預約通知（Email 和平台通知）後，<strong>建議於 30 分鐘內儘速完成核對並點擊確認「同意」或「婉拒」，最遲須於 1.5 小時（90 分鐘）內完成審核回覆</strong>；若貴場館超過 1.5 小時未予回覆，系統將自動判定該筆預約申請逾時失效並取消。
        </li>
        <li>
          <strong>同意預約後之場地保留義務與訂單鎖定：</strong><strong>貴場館一旦點擊確認「同意預約」，該筆預約即正式成立並鎖定（系統關閉教練線上取消功能），貴場館承諾於該指定時段保留場地空間供該預約教練進場授課。</strong>貴場館應確保預約時段內現場正常開放營業，不得發生臨時未開門、內部雙重排課（Double Booking）致無場地可用，或現場臨時片面調漲高於平台公告之場租價格等情事。
        </li>
        <li>
          <strong>場館疏失與頻繁逾時未審核之處置：</strong>若因貴場館同意預約後發生可歸責於場館方之疏失（如未開門、雙重排課或未公告臨時公休）致教練無法帶課，本平台經查證屬實後將返還該教練被扣抵之平台媒合點數；若貴場館經教練多次回報無故違約，<strong>或連續多次、頻繁超過 1.5 小時未審核預約通知致系統自動取消者，本平台得調整貴場館之搜尋排序權重、自動暫停貴場館之線上預約接單功能。</strong>
        </li>
      </ol>

      <h2 style={h2Style}>第四條：教練現場核驗權限與平台無實質審查免責</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>場館現場核對證件正本權利：</strong><strong>本平台對註冊教練所填載之體適能證照、急救證照及教學資歷僅提供資訊展示介面，不負實質審查或保證責任。</strong>自由教練於預約成立後前往貴場館報到時，貴場館有權要求教練出示本平台預約確認畫面、身分證明文件及相關專業證照正本進行核對，並要求教練簽署貴場館之現場入場切結書或遵守場館管理規章。
        </li>
        <li>
          <strong>教練違規與未依約到場回報機制：</strong>若預約成立後，該自由教練發生無故未依約到場、現場拒繳場租費用、冒用他人證照或嚴重違反貴場館安全與器材歸位規範之情事，貴場館得依現場規定拒絕其入場或終止當次場地租賃，並歡迎透過本平台客服管道回報異常紀錄，以利本平台依《自由教練服務條款》對該違規帳號進行停權處置。
        </li>
      </ol>

      <h2 style={h2Style}>第五條：場館內人身傷害、財物損失與法律責任完全排除</h2>
      <p style={{ margin: 0 }}>
        自由教練及其學員於貴場館內進行訓練、教學或活動期間所發生之任何運動傷害、突發疾病、器材損壞、財物失竊、肢體衝突、性騷擾或消費糾紛，<strong>純屬貴場館、自由教練與學員三方間之法律關係，肌動組 GYMspot 營運團隊不負任何形式之民事賠償、連帶清償或刑事責任。</strong>若因貴場館之故意、過失或違約行為致本平台遭受第三人求償、訴訟或行政裁罰者，貴場館應對本平台負全部損害賠償責任（包含但不限於訴訟費用、合理律師費及和解金額）。
      </p>

      <h2 style={h2Style}>第六條：聯絡管道、條款修訂與準據法</h2>
      <ol style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <li>
          <strong>合作場館專屬客服與支援管道：</strong>貴場館於使用本平台過程中，如有場館資料更新、審核通知設定調整或教練異常行為回報需求，請透過以下官方管道聯繫：
          <ul style={{ margin: '6px 0 0', paddingLeft: '20px' }}>
            <li><strong>營運品牌：</strong>肌動組 GYMspot 運動空間媒合平台</li>
            <li><strong>客服專用信箱：</strong>official@gymspot.space</li>
            <li><strong>客服服務時間：</strong>週一至週日 10:00 - 18:00</li>
          </ul>
        </li>
        <li>
          <strong>條款適用順序與管轄法院：</strong>本條款未盡事宜，悉依《肌動組 GYMspot 平台通用服務條款》及中華民國相關法令補充之。肌動組 GYMspot 營運團隊保留因應業務發展與法規調整修訂本條款之權利。因本條款所生之任何爭議，均以<strong>中華民國法律</strong>為準據法，並除法律另有專屬管轄規定外，雙方同意以<strong>臺灣桃園地方法院</strong>為第一審管轄法院。
        </li>
      </ol>
    </>
  );
}

/**
 * 7. GYMspot 防詐騙宣導 V1.0 (/anti-fraud)
 */
export function AntiFraudContent() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '26px', fontWeight: 900, color: '#111827', margin: '0 0 32px' }}>
        防詐騙宣導
      </h1>

      <p style={{ fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>
        親愛的顧客與教練夥伴您好
      </p>

      <p style={{ margin: '0 0 20px' }}>
        近期網路詐騙手法多元、日益盛行，為守護您的個資與財產安全，敬請配合以下事項，請留意：
      </p>

      <p style={{ margin: '0 0 20px', color: '#dc2626', fontWeight: 700 }}>
        肌動組 GYMspot 不會以任何名義、理由透過 Email、簡訊、電話 向您索取或要求變更金融帳戶、信用卡付款等相關資訊，也不會透過前述方式要求您至銀行臨櫃或操作 ATM。
      </p>

      <ul style={{ margin: '0 0 32px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '14px', color: '#1f2937' }}>
        <li>
          若收到內容異常的 Email，尤其涉及訂單異常、付款驗證、帳戶安全或要求提供個人資料等通知，請勿直接點擊信件內的連結，不認識的 LINE 好友邀請或簡訊，也請不要點選。
        </li>
        <li>
          如果您接到相關電話或簡訊，請提高警覺，切勿輕信不明來電指示，若有疑慮，敬請於第一時間聯繫 肌動組 GYMspot 或撥打警政署 165 反詐騙專線進行確認。
        </li>
        <li>
          當您接到來電顯示開頭為「+」、「+1」、「+2」、「+886」等不明來電，請務必提高警覺，更要提防對方竄改電話號碼或假裝成特定公司、銀行、司法機關的手法。
        </li>
        <li>
          常見詐騙手法如「重複下單」、「誤設分期付款」以取信消費者，再要求進行網路銀行或 ATM 操作流程；如果與銀行、信用卡帳務有關，請您直接致電給銀行或發卡機構，如果來電內容要求您操作相關帳戶、提供資料等，也請您直接拒絕，降低詐騙的風險。
        </li>
        <li>
          請您定期修改密碼、強化密碼強度（以大小寫英文、數字混合使用）、不要在公用電腦輸入帳號密碼，以提高資訊安全。
        </li>
      </ul>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 12px' }}>
          官方客服協助
        </h2>
        <p style={{ margin: '0 0 10px' }}>
          若您收到疑似詐騙的 Email，或對相關通知有任何疑慮，歡迎透過 肌動組 GYMspot 官方客服管道與我們聯繫，我們將協助確認及處理相關反應給系統平台。
        </p>
        <p style={{ margin: '0 0 10px' }}>
          我們重視每位消費者的資訊安全與購買權益，也將持續留意相關情況，並視需要提供後續提醒。
        </p>
        <p style={{ margin: '0 0 20px' }}>
          感謝您的理解與配合，請大家共同提高防詐意識，守護個人資訊及財產安全。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 700, color: '#111827' }}>
          <div>客服聯絡信箱：official@gymspot.space</div>
          <div>客服服務時間：週一至週日 10:00-18:00</div>
          <div>
            165全民防騙網：{' '}
            <a
              href="https://165.npa.gov.tw/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2563eb', textDecoration: 'underline' }}
            >
              https://165.npa.gov.tw/
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * 統一獨立白底黑字法務頁面容器（支援 7 大獨立網址與頂部快速切換列）
 */
export function LegalDocumentPage({ currentPath = '/terms', onNavigateHome, onNavigate }) {
  const cleanPath = (currentPath || '/terms').replace(/\/+$/, '') || '/terms';
  const activeRoute = LEGAL_ROUTES.find((r) => r.path === cleanPath) || LEGAL_ROUTES[0];

  const renderContent = () => {
    switch (activeRoute.key) {
      case 'privacy':
        return <PrivacyPolicyContent onNavigate={onNavigate} />;
      case 'booking-terms':
        return <BookingTermsContent onNavigate={onNavigate} />;
      case 'refund-policy':
        return <RefundPolicyContent onNavigate={onNavigate} />;
      case 'coach-terms':
        return <CoachTermsContent onNavigate={onNavigate} />;
      case 'venue-terms':
        return <VenueTermsContent onNavigate={onNavigate} />;
      case 'anti-fraud':
        return <AntiFraudContent onNavigate={onNavigate} />;
      case 'terms':
      default:
        return <GeneralTermsContent onNavigate={onNavigate} />;
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#111827' }}>
      {/* 7 大法務條款頂部切換導覽列 */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 20px'
      }}>
        <div style={{
          maxWidth: '980px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {LEGAL_ROUTES.map((item) => {
            const isActive = item.key === activeRoute.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.path)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600,
                  background: isActive ? '#111827' : '#ffffff',
                  color: isActive ? '#b4ff04' : '#374151',
                  border: isActive ? '1px solid #111827' : '1px solid #d1d5db',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* 白底黑字條款正文區 */}
      <main style={{
        flex: 1,
        maxWidth: '840px',
        width: '100%',
        margin: '0 auto',
        padding: '48px 24px 72px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, "Noto Sans TC", sans-serif',
        fontSize: '15px',
        lineHeight: 1.85,
        color: '#1f2937'
      }}>
        {renderContent()}
      </main>

      <LegalFooter
        onNavigateHome={onNavigateHome}
        onNavigate={onNavigate}
      />
    </div>
  );
}
