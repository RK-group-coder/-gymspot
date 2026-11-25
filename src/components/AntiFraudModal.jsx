import React from 'react';
import { X } from 'lucide-react';

export default function AntiFraudModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      id="antifraud-modal"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3600,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          background: '#000000',
          border: '1px solid #262626',
          borderRadius: '18px',
          boxShadow: '0 24px 54px rgba(0, 0, 0, 0.95)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #1f1f1f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#000000'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#ffffff' }}>
              肌動組 GYMspot · 防詐騙宣導聲明
            </h2>
            <div style={{ fontSize: '12px', color: '#a3a3a3', marginTop: '3px' }}>
              守護您的個人資料與交易財產安全 · 165 反詐騙專線
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="關閉防詐騙宣導"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#141414',
              border: '1px solid #2e2e2e',
              color: '#a3a3a3',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '22px 24px',
          fontSize: '13.5px',
          color: '#d4d4d4',
          lineHeight: 1.75,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Top Highlight Box */}
          <div style={{
            background: '#141414',
            border: '1px solid rgba(180, 255, 4, 0.4)',
            borderRadius: '12px',
            padding: '14px 16px'
          }}>
            <div style={{ color: '#b4ff04', fontWeight: 800, fontSize: '14px', marginBottom: '6px' }}>
              親愛的教練與合作場館夥伴您好：
            </div>
            <div style={{ color: '#e5e5e5', fontSize: '13px' }}>
              近期網路詐騙手法多元且日益盛行，為守護您的個資與財產安全，敬請配合並留意以下事項：
              <strong style={{ color: '#ffffff' }}>「肌動組 GYMspot」絕不會以任何名義或理由，透過 Email、簡訊、電話或社群私訊向您索取或要求變更金融帳戶、信用卡密碼等資訊，亦絕不會要求您至銀行臨櫃或操作 ATM 解除設定。</strong>
            </div>
          </div>

          {/* Bullet Points */}
          <div style={{
            background: '#141414',
            border: '1px solid #262626',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div>
              <strong style={{ color: '#ffffff' }}>1. 切勿點擊可疑信件與不明連結：</strong>
              <div style={{ color: '#a3a3a3', marginTop: '2px' }}>
                若收到內容異常的 Email 或訊息（尤其宣稱預約訂單異常、付款驗證失敗、帳戶凍結或要求重新提供信用卡資料等通知），請勿直接點擊信件或簡訊內的連結；不認識的 LINE 好友邀請或陌生私訊也請勿理會。
              </div>
            </div>

            <div>
              <strong style={{ color: '#ffffff' }}>2. 提防竄改號碼與「+」號開頭不明來電：</strong>
              <div style={{ color: '#a3a3a3', marginTop: '2px' }}>
                當您接到來電顯示開頭為「+」、「+1」、「+2」、「+886」等境外或不明來電時，請務必提高警覺，提防詐騙集團竄改電話號碼或假冒本平台客服、金流機構、銀行行員或公務機關。
              </div>
            </div>

            <div>
              <strong style={{ color: '#ffffff' }}>3. 識破「重複扣款／誤設分期或連續包月」話術：</strong>
              <div style={{ color: '#a3a3a3', marginTop: '2px' }}>
                本平台所有場位預約媒合方案皆為「單次購買、一次付清」，系統絕無自動分期或自動續扣功能。常見詐騙手法會以「重複下單」、「誤設為分期付款／VIP 連續扣款」為由要求您操作網路銀行或 ATM，請直接拒絕並掛斷。若與信用卡帳務有關，請直接撥打您信用卡背面的發卡銀行官方客服電話查證。
              </div>
            </div>

            <div>
              <strong style={{ color: '#ffffff' }}>4. 強化個人帳號與密碼安全：</strong>
              <div style={{ color: '#a3a3a3', marginTop: '2px' }}>
                建議您定期更新密碼、提升密碼強度（採用大小寫英文字母與數字混合），避免在不同網站使用相同密碼，並切勿於公用電腦儲存帳號或信用卡資訊。
              </div>
            </div>
          </div>

          {/* Official Contact & 165 Box */}
          <div style={{
            background: '#141414',
            border: '1px solid #262626',
            borderRadius: '12px',
            padding: '16px 18px'
          }}>
            <div style={{ color: '#b4ff04', fontWeight: 800, fontSize: '14px', marginBottom: '6px' }}>
              官方客服查證與防詐協助
            </div>
            <p style={{ margin: '0 0 12px', color: '#d4d4d4', fontSize: '13px' }}>
              若您收到疑似假冒「肌動組 GYMspot」的 Email、簡訊或來電，或對任何交易通知有疑慮，請於第一時間透過本平台官方客服管道查證，或直撥警政署 <strong>165 反詐騙諮詢專線</strong>：
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '8px',
              fontSize: '12.5px',
              color: '#e5e5e5',
              background: '#0a0a0a',
              border: '1px solid #222222',
              borderRadius: '8px',
              padding: '12px 14px'
            }}>
              <div>
                <span style={{ color: '#8a8a8a' }}>官方聯絡信箱：</span>
                <strong style={{ color: '#ffffff' }}>official@gymspot.space</strong>
              </div>
              <div>
                <span style={{ color: '#8a8a8a' }}>客服專線：</span>
                <strong style={{ color: '#ffffff' }}>0903-383-712</strong>
                <span style={{ color: '#737373', fontSize: '11.5px' }}> (10:00-18:00)</span>
              </div>
              <div>
                <span style={{ color: '#8a8a8a' }}>官方 Instagram：</span>
                <a
                  href="https://www.instagram.com/gymspot_official?knvt=Njh3OHBiMnkxb2N5&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#b4ff04', textDecoration: 'underline', fontWeight: 700 }}
                >
                  @gymspot_official
                </a>
              </div>
              <div>
                <span style={{ color: '#8a8a8a' }}>165 全民防騙網：</span>
                <a
                  href="https://165.npa.gov.tw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#b4ff04', textDecoration: 'underline', fontWeight: 700 }}
                >
                  https://165.npa.gov.tw/
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #1f1f1f',
          background: '#000000',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#b4ff04',
              color: '#000000',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 24px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            我已了解
          </button>
        </div>
      </div>
    </div>
  );
}
