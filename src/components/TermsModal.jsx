import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ArrowDown } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const contentRef = useRef(null);

  // Reset scroll state when modal opens
  useEffect(() => {
    if (isOpen) {
      setHasScrolledToBottom(false);
    }
  }, [isOpen]);

  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    // When within 25px of the bottom, unlock the agree button
    if (scrollTop + clientHeight >= scrollHeight - 25) {
      setHasScrolledToBottom(true);
    }
  };

  const handleScrollToBottom = () => {
    if (!contentRef.current) return;
    contentRef.current.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth'
    });
    // Immediately set to true or let scroll handler trigger
    setTimeout(() => {
      setHasScrolledToBottom(true);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Modal Card (底色全黑) */}
      <div 
        id="terms-modal-card"
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          background: '#000000',
          border: '1px solid #222222',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)',
          overflow: 'hidden'
        }}
      >
        {/* Header (全黑純淨標題) */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1c1c1c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#000000'
        }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: '0.3px' }}>
              肌動組 GYMspot · 使用者服務條款暨個人資料隱私保障協議
            </h2>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '3px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#b4ff04', fontWeight: 700 }}>● 合約版本 V2.4</span>
              <span>·</span>
              <span>生效日期：2026 年 10 月 · 適用於全體教練、場館與使用者</span>
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="關閉協議"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Contract Legal Text Body (全黑背景) */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            padding: '24px 28px',
            overflowY: 'auto',
            fontSize: '12.5px',
            lineHeight: '1.85',
            color: '#cbd5e1',
            background: '#000000'
          }}
        >
          {/* Important Notice Callout Box */}
          <div style={{
            background: '#080808',
            border: '1px solid #222222',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '20px'
          }}>
            <div style={{ color: '#f8fafc', fontWeight: 900, fontSize: '13px', marginBottom: '6px' }}>
              【肌動組 GYMspot 營運方重要法定權益與使用前提】
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '12px' }}>
              歡迎使用「肌動組 GYMspot」（下稱「本平台」）。本協議為您（包含自由教練、健身房/工作室經營業者及一般使用者）與本平台營運團隊間具備完全法律效力之合約。當您點擊「註冊」、「登入」、「儲值點數」、「時段預約」或「我已詳細閱讀並同意遵守本合約」時，即視為您已完整審閱、充分理解並無保留同意遵守本條款全部內容。
            </div>
          </div>

          {/* Section 1 */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
              第一條：平台定位、服務性質與第三方免責界線
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>技術與資訊媒合中介定位：</strong>本平台係基於地理定位演算法與資料庫技術，提供全台場租健身房價格查詢、設備規格檢視及「場地時段線上排程鎖定」之純技術服務工具。<strong>本平台絕非健身房場地之租賃出租人、二房東，亦非自由教練之雇主、代理人或教練與學員體適能課程承攬之當事人。</strong>
              </li>
              <li>
                <strong>交易不介入與抽成原則：</strong>除本協議明定之「時段預約技術服務費（鎖位金）」外，本平台不經手、不代收亦不抽成自由教練向學員收取之任何私人授課費用。場租費用之收取、發票開立與教學私約，均由授課教練與合作場館雙方直接依法律與民法租賃規定履行。
              </li>
              <li>
                <strong>場館即時數據免責：</strong>本平台各場館之價格、營業時間、合格保險及器材標籤，均來自公開蒐集或場合作方自主申報登記。平台盡合理審查查核之義務，惟無法對場館現場臨時休館、設備臨時故障或突發性政策變動負即時擔保之法律責任，教練帶課前應以現場實際狀態為準。
              </li>
            </ol>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
              第二條：時程表即時預約、深蹲架鎖位手續費與爽約防制規範
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>預約鎖位費之法律性質：</strong>自由教練使用本平台預約系統鎖定指定場館特定時段與深蹲架/場位時，平台將自教練帳戶扣抵對應點數（每筆 NT$ 30 ~ 50 元等值點數）。<strong>該筆費用性質為「平台系統排程演算與排他性時段鎖定之數位技術手續費」，一經系統確認鎖位完成即視為平台技術服務交付完畢。</strong>
              </li>
              <li>
                <strong>不予退費與爽約罰則：</strong>除因場館發生重大火警、天災停電等不可抗力致無法營業外，<strong>凡因教練個人排程、學員請假、遲到、忘記或個人疏忽而未到場使用者，該筆預約手續費概不退還。</strong>教練若有連續無故爽約、惡意佔位阻礙他人使用之情事，本平台得逕行暫停或終止該帳號使用權，無須事先通知。
              </li>
              <li>
                <strong>禁止機器人搶位：</strong>用戶嚴禁使用外掛、自動化腳本或非法逆向工程干擾搶佔熱門時段。違反者除沒收帳戶點數外，本平台將依刑法妨害電腦使用罪及民法侵權行為追究其一切損害賠償責任。
              </li>
            </ol>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
              第三條：數位點數（GYM Points）錢包條款與防制洗錢規範
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>點數屬性：</strong>本平台提供之數位點數（換算基準為 1 點 = NT$ 1），為平台內部用於兌換預約手續費或加值推廣之數位抵用憑證，<strong>非銀行法所稱之電子貨幣或法定流通貨幣，亦不產生任何利息。</strong>
              </li>
              <li>
                <strong>禁止轉售與非法套現：</strong>點數僅限持有人帳號於本平台合法扣抵使用，嚴禁私下交易、轉讓、洗錢、抵債或非透過本平台授權之套現行為。一經查獲，平台有權立即凍結相關帳戶。
              </li>
              <li>
                <strong>退費申辦流程：</strong>用戶如欲終止帳號並就未消費之現金儲值點數申辦退還，應提出身分證明文件審核。平台將扣除第三方金流處理成本及 10% 系統行政處理手續費後，將剩餘之有效儲值餘額退回原付款帳戶；因平台活動贈送之贈點不在退款範圍內。
              </li>
            </ol>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
              第四條：運動安全自主、意外傷害與法律責任極限完全排除
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>運動風險自我承擔：</strong>肌力體能訓練具有潛在之肉體疲勞、肌肉拉傷、骨折甚至突發心血管意外之生理風險。自由教練於現場指導時，應善盡專業注意義務，課前詳細評估學員身體評估與訓練強度。
              </li>
              <li>
                <strong>人身傷害完全免責：</strong>教練與學員於場館內所發生之任何體傷、病變、突發猝死、爭執毆打、性騷擾或財物失竊等糾紛，<strong>純屬當事人間與場館管理之法律關係，本平台營運方不負任何形式之民事賠償、連帶清償或刑事責任。</strong>
              </li>
              <li>
                <strong>賠償金額最高上限：</strong>在適用法律允許之最大極限內，若因本平台系統嚴重故障或爭端致用戶遭受實質可歸責損害，本平台就單一用戶所承擔之全部累計民事賠償責任上限，<strong>以該用戶於事件發生前三十天內實際向本平台支付之系統手續費用總額為絕對最高上限。</strong>
              </li>
            </ol>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
              第五條：個人資料保護政策與隱私權法定遵循（個資法完整條款）
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>個人資料蒐集目的：</strong>本平台依據個人資料保護法相關法令，基於「會員管理與身分識別（法定代號 090）」、「商業資訊與地圖媒合技術推播（040）」及「消費者爭議處理（069）」之正當特定目的，在業務所必要之範圍內蒐集、處理及利用您的個人資料。
              </li>
              <li>
                <strong>蒐集之個人資料類別：</strong>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  <li>C001 辨識個人者：姓名、會員暱稱、通訊電子郵件、聯絡電話、LINE ID。</li>
                  <li>C038 職業與執照：體適能教練合格證照名稱與證號、急救證書資料（教練資格認證審查用）。</li>
                  <li>C102 約定技術資料：行動裝置 GPS 定位座標（僅用於即時半徑搜尋最近場館）、IP 位址、瀏覽歷程與預約時程操作記錄。</li>
                </ul>
              </li>
              <li>
                <strong>GPS 定位與個人資料嚴格保護承諾：</strong>
                本平台僅在您主動點擊「定位」功能時取得瀏覽器或手機授權之坐標資料以進行距離計算，絕不常駐追蹤個人移動路徑，<strong>亦絕不會將您的電話、信箱或私密位置資料出售、租借或交換予任何外部廣告商或第三方資料公司。</strong>
              </li>
              <li>
                <strong>資安技術防護：</strong>全站連線皆實施高規格 SSL/TLS 256-bit 傳輸層加密。第三方金流交易由具備國際 PCI-DSS 認證之金流機構獨立代收，本平台伺服器不儲存使用者信用卡卡號完整機密資料。
              </li>
              <li>
                <strong>當事人權利行使：</strong>您可以隨時透過本平台官方聯絡管道，向我們請求查詢、閱覽、製給複製本、補充、更正、停止蒐集處理利用或刪除您的個人資料帳號。
              </li>
            </ol>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', margin: '0 0 8px' }}>
              第六條：智慧財產權宣告、條款修正與管轄法院約定
            </h3>
            <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
          </div>
        </div>

        {/* Footer Accept Bar (底色全黑) */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #1c1c1c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#000000',
          gap: '12px'
        }}>
          {/* Left: 一鍵滑到底按鈕 & 狀態提示 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {!hasScrolledToBottom ? (
              <button
                id="terms-scroll-to-bottom-btn"
                onClick={handleScrollToBottom}
                style={{
                  background: '#141414',
                  color: '#f8fafc',
                  border: '1px solid #2e2e2e',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#b4ff04'; e.currentTarget.style.color = '#b4ff04'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2e2e2e'; e.currentTarget.style.color = '#f8fafc'; }}
              >
                <ArrowDown size={14} />
                一鍵滑到底
              </button>
            ) : (
              <span style={{ fontSize: '11px', color: '#b4ff04', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✓ 已審閱至合約最底端
              </span>
            )}

            {!hasScrolledToBottom && (
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                請滑動至底部以解鎖同意按鈕
              </span>
            )}
          </div>

          {/* Right: 同意按鈕（未滑到底前停用） */}
          <button
            id="terms-accept-btn"
            disabled={!hasScrolledToBottom}
            onClick={hasScrolledToBottom ? onClose : undefined}
            style={{
              background: hasScrolledToBottom ? '#b4ff04' : '#141414',
              color: hasScrolledToBottom ? '#0a1402' : '#525252',
              border: hasScrolledToBottom ? 'none' : '1px solid #262626',
              borderRadius: '12px',
              padding: '11px 22px',
              fontSize: '13px',
              fontWeight: 900,
              cursor: hasScrolledToBottom ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: hasScrolledToBottom ? '0 0 16px rgba(180, 255, 4, 0.35)' : 'none',
              transition: 'all 0.2s ease',
              opacity: hasScrolledToBottom ? 1 : 0.7
            }}
          >
            <Check size={16} strokeWidth={3} />
            我已詳細閱讀並同意遵守本合約
          </button>
        </div>
      </div>
    </div>
  );
}
