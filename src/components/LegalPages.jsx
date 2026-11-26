import React from 'react';
import { Mail } from 'lucide-react';

function LegalFooter({ onNavigateHome, onNavigateTerms, onNavigateAntiFraud }) {
  return (
    <footer style={{
      background: '#04060a',
      borderTop: '1px solid #1e293b',
      padding: '22px 32px',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {/* Left: Brand & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div
            onClick={onNavigateHome}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <img src="/brand-icon-transparent.png" alt="肌動組" style={{ height: '28px', width: 'auto' }} />
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</span>
          </div>
          <span style={{ color: '#334155' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onNavigateTerms}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: '#94a3b8',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '12px'
              }}
            >
              服務條款與隱私權協議
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={onNavigateAntiFraud}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: '#b4ff04',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              防詐騙宣導
            </button>
            <span>·</span>
            <span>© 2026 肌動組 GYMspot All Rights Reserved.</span>
          </div>
        </div>

        {/* Right: Email & Follow Us */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#cbd5e1' }}>
            <Mail size={14} color="#b4ff04" /> 客服與聯絡信箱：official@gymspot.space
          </span>

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

/**
 * 1. 防詐騙宣導獨立頁面 (/anti-fraud) — 白底黑字正式排版
 */
export function AntiFraudPage({ onNavigateHome, onNavigateTerms, onNavigateAntiFraud }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#111827' }}>
      <main style={{
        flex: 1,
        maxWidth: '820px',
        width: '100%',
        margin: '0 auto',
        padding: '56px 24px 72px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, "Noto Sans TC", sans-serif',
        fontSize: '15px',
        lineHeight: 1.9,
        color: '#1f2937'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '26px',
          fontWeight: 900,
          color: '#111827',
          margin: '0 0 36px',
          letterSpacing: '0.02em'
        }}>
          防詐騙宣導
        </h1>

        <p style={{ fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>
          親愛的顧客與教練夥伴您好
        </p>

        <p style={{ margin: '0 0 20px' }}>
          近期網路詐騙手法多元、日益盛行，為守護您的個資與財產安全，敬請配合以下事項，請留意：
        </p>

        <p style={{
          margin: '0 0 20px',
          color: '#dc2626',
          fontWeight: 700
        }}>
          肌動組 GYMspot 不會以任何名義、理由透過 Email、簡訊、電話 向您索取或要求變更金融帳戶、信用卡付款等相關資訊，也不會透過前述方式要求您至銀行臨櫃或操作 ATM。
        </p>

        <ul style={{
          margin: '0 0 32px',
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          color: '#1f2937'
        }}>
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

        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '24px'
        }}>
          <h2 style={{
            fontSize: '17px',
            fontWeight: 800,
            color: '#111827',
            margin: '0 0 12px'
          }}>
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
            <div>客服服務時間：週一至週五 10:00-18:00</div>
            <div>
              官方 Instagram：{' '}
              <a
                href="https://www.instagram.com/gymspot_official?knvt=Njh3OHBiMnkxb2N5&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563eb', textDecoration: 'underline' }}
              >
                @gymspot_official
              </a>
            </div>
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
      </main>

      <LegalFooter
        onNavigateHome={onNavigateHome}
        onNavigateTerms={onNavigateTerms}
        onNavigateAntiFraud={onNavigateAntiFraud}
      />
    </div>
  );
}

/**
 * 2. 服務條款與隱私權協議獨立頁面 (/terms) — 白底黑字正式排版
 */
export function TermsPage({ onNavigateHome, onNavigateTerms, onNavigateAntiFraud }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', color: '#111827' }}>
      <main style={{
        flex: 1,
        maxWidth: '820px',
        width: '100%',
        margin: '0 auto',
        padding: '56px 24px 72px',
        boxSizing: 'border-box',
        fontFamily: 'system-ui, -apple-system, "Noto Sans TC", sans-serif',
        fontSize: '15px',
        lineHeight: 1.85,
        color: '#1f2937'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '26px',
          fontWeight: 900,
          color: '#111827',
          margin: '0 0 12px',
          letterSpacing: '0.02em'
        }}>
          使用者服務條款暨個人資料隱私保障協議
        </h1>
        <div style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginBottom: '36px' }}>
          肌動組 GYMspot 運動空間媒合平台（https://www.gymspot.space）
        </div>

        <div style={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '28px',
          fontSize: '14px',
          color: '#374151'
        }}>
          <div style={{ fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
            【肌動組 GYMspot 營運方重要法定權益與使用前提】
          </div>
          歡迎使用「肌動組 GYMspot」（下稱「本平台」）。本協議為您（包含自由教練、健身房/工作室經營業者及一般使用者）與本平台營運團隊間具備完全法律效力之合約。當您點擊「註冊」、「登入」、「購買媒合方案」、「時段預約」或繼續使用本平台服務時，即視為您已完整審閱、充分理解並無保留同意遵守本條款全部內容。
        </div>

        {/* Section 1 */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第一條：平台定位、服務性質與第三方免責界線
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>技術與資訊媒合中介定位：</strong>本平台係基於地理定位演算法與資料庫技術，提供全台場租健身房價格查詢、設備規格檢視及「場地時段線上排程鎖定」之純技術服務工具。<strong>本平台絕非健身房場地之租賃出租人、二房東，亦非自由教練之雇主、代理人或教練與學員體適能課程承攬之當事人。</strong>
            </li>
            <li>
              <strong>交易不介入與抽成原則：</strong>除本協議明定之「時段預約技術服務費（鎖位金）」外，本平台不經手、不代收亦不抽成自由教練向學員收取之任何私人授課費用。場租費用之收取、發票開立與教學私約，均由授課教練與合作場館雙方直接依法律與民法租賃規定履行。
            </li>
            <li>
              <strong>場館即時數據免責：</strong>本平台各場館之價格、營業時間、合格保險及器材標籤，均來自公開蒐集或合作方自主申報登記。平台盡合理審查查核之義務，惟無法對場館現場臨時休館、設備臨時故障或突發性政策變動負即時擔保之法律責任，教練帶課前應以現場實際狀態為準。
            </li>
          </ol>
        </section>

        {/* Section 2 */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第二條：時程表即時預約、場館時段媒合服務費與爽約防制規範
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>預約媒合費之法律性質：</strong>自由教練使用本平台預約系統預約指定場館之特定授課時段時，平台將自教練已購之媒合方案中扣抵對應媒合額度（每次預約時段扣抵 1 次額度，約當 NT$ 25 ~ 30 元等值服務）。<strong>該筆費用性質為「平台系統排程演算與場館時段預約媒合之數位技術手續費」，一經系統確認預約完成即視為平台技術服務交付完畢。</strong>
            </li>
            <li>
              <strong>不予退費與爽約罰則：</strong>除因場館發生重大火警、天災停電等不可抗力致無法營業外，<strong>凡因教練個人排程、學員請假、遲到、忘記或個人疏忽而未到場使用者，該筆預約手續費概不退還。</strong>教練若有連續無故爽約、惡意佔位阻礙他人使用之情事，本平台得逕行暫停或終止該帳號使用權，無須事先通知。
            </li>
            <li>
              <strong>禁止機器人搶位：</strong>用戶嚴禁使用外掛、自動化腳本或非法逆向工程干擾搶佔熱門時段。違反者除終止帳號服務權利外，本平台將依刑法妨害電腦使用罪及民法侵權行為追究其一切損害賠償責任。
            </li>
          </ol>
        </section>

        {/* Section 3 */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第三條：線上預約媒合服務收費、7日猶豫期退款機制與消費者權益保障
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>服務項目與計價幣別：</strong>本平台提供自由教練與優質健身場館之時程排程與場位媒合服務，所有收費方案皆以<strong>新台幣 (NTD / TWD)</strong> 標示並計費，支援各大銀行信用卡線上即時刷卡一次付清（支援 Visa / MasterCard / JCB）。
            </li>
            <li>
              <strong>數位服務即時交付：</strong>用戶於本網站完成線上刷卡授權成功後，系統演算將立即開通該方案對應之場位排程媒合次數權限。
            </li>
            <li>
              <strong>消費者 7 日猶豫期退款政策：</strong>
              依據消費者保護法第十九條規定，用戶自線上完成付款之次日起算<strong>七日內</strong>，若所購買之預約媒合方案<strong>完全未使用任何場館預約媒合服務</strong>，得隨時透過本平台官方客服管道申請全額退款。經系統核對無誤後，將於 3 至 7 個工作日內依原信用卡金流管道辦理全額退刷退款，絕不無故扣收解約違約金。
            </li>
            <li>
              <strong>客戶服務與爭議申訴聯絡管道：</strong>
              <ul style={{ margin: '6px 0', paddingLeft: '20px' }}>
                <li>營運品牌：肌動組 GYMspot 運動空間媒合平台</li>
                <li>客服專用信箱：<strong>official@gymspot.space</strong></li>
                <li>客服服務時間：週一至週五 10:00 - 18:00（國定假日除外，其餘時間可透過信箱留言）</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Section 4 */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第四條：運動安全自主、意外傷害與法律責任極限完全排除
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
        </section>

        {/* Section 5 */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第五條：專業證照真實性聲明與冒用違約金
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>證照真實性保證：</strong>自由教練於個人檔案或預約單上所填載、上傳之國際體適能證照（如 ACE、NSCA、NASM、ACSM）、急救證照（CPR+AED）及經歷簡介，保證百分百為本人真實合法取得且在有效期限內。
            </li>
            <li>
              <strong>偽造證照之懲罰性違約金：</strong>若經合作場館、學員檢舉或平台查獲有偽造、變造、盜用他人證照或虛構資歷之情事，本平台除立即永久停權並配合司法調查外，違規用戶應無條件支付本平台新台幣<strong>拾萬元整（NT$ 100,000）</strong>之商譽損害懲罰性違約金。
            </li>
          </ol>
        </section>

        {/* Section 6 */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第六條：個人資料保護法（PDPA）告知事項與雲端安全架構
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>蒐集目的與類別：</strong>本平台依據中華民國《個人資料保護法》規定，於提供場租媒合、時段排程驗證、客服聯繫及系統安全審計之特定目的範圍內，蒐集並處理您的姓名/暱稱、聯絡電話、電子郵件、GPS 模糊定位座標、專業證照影像及交易紀錄。
            </li>
            <li>
              <strong>第三方隔離與加密儲存：</strong>您的個人資料儲存於具備列級安全性（Row Level Security, RLS）與 SSL/TLS 全程傳輸加密之雲端資料庫，除配合司法檢調機關依法調閱，或於您送出預約時向該指定特約場館揭露必要核驗資訊外，絕不任意出售、出租或洩漏予無關之第三人。
            </li>
            <li>
              <strong>當事人權利行使：</strong>您得依個資法第三條規定，隨時透過官方客服信箱（official@gymspot.space）向本平台請求查詢、閱覽、製給複製本、補充更正、停止蒐集處理利用或請求刪除您的帳號與個人資料。
            </li>
          </ol>
        </section>

        {/* Section 7 */}
        <section>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: '0 0 10px' }}>
            第七條：智慧財產權保護、準據法與管轄法院
          </h2>
          <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>智慧財產權歸屬：</strong>本平台所有軟體架構、使用者介面排版、品牌標誌（肌動組 GYMspot）、地圖標籤圖示、視覺設計與場館資料庫彙編著作，均為本平台開發營運方之智慧財產。非經書面同意，不得進行轉載、鏡像爬蟲抓取、逆向工程或商品化利用。
            </li>
            <li>
              <strong>條款修訂權限：</strong>本平台保留隨時因應法規變動或業務演進修正本合約條款之權利。修正後之條文自本平台公告日起生效，繼續使用服務即視為同意更新之合約內容。
            </li>
            <li>
              <strong>準據法與第一審管轄法院：</strong>本協議之解釋、履行及因本平台服務所引起之任何法律爭議，均以<strong>中華民國法律</strong>為準據法。雙方同意以<strong>臺灣臺北地方法院</strong>為第一審專屬管轄法院。
            </li>
          </ol>
        </section>
      </main>

      <LegalFooter
        onNavigateHome={onNavigateHome}
        onNavigateTerms={onNavigateTerms}
        onNavigateAntiFraud={onNavigateAntiFraud}
      />
    </div>
  );
}

