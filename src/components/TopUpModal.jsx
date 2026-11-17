import React, { useState } from 'react';
import { X, Check, Lock, FileText } from 'lucide-react';

export const PLANS = [
  {
    id: 'p1',
    name: '輕量方案',
    times: 5,
    price: 150,
    points: 150,
    unitPrice: 30,
    tag: null
  },
  {
    id: 'p2',
    name: '標準方案',
    times: 11,
    price: 300,
    points: 330,
    unitPrice: 27,
    tag: '熱門 · 加贈 1 次',
    hot: true
  },
  {
    id: 'p3',
    name: '進階方案',
    times: 19,
    price: 500,
    points: 570,
    unitPrice: 26,
    tag: '加贈 3 次'
  },
  {
    id: 'p4',
    name: '專業方案',
    times: 40,
    price: 1000,
    points: 1200,
    unitPrice: 25,
    tag: '加贈 7 次'
  }
];

export default function TopUpModal({ points, onClose, onTopUp, onOpenTerms }) {
  const [selected, setSelected] = useState('p2');
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('0903-383-712');
  const [buyerEmail, setBuyerEmail] = useState('a0903383712@gmail.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = PLANS.find((p) => p.id === selected) || PLANS[1];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!agreedTerms) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep(false);
      onTopUp(plan.points, plan.price);
    }, 800);
  };

  return (
    <div id="topup-modal" className="topup-overlay" onClick={onClose}>
      <style>{`
        .topup-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .topup-dialog {
          width: 100%;
          max-width: 500px;
          max-height: 92vh;
          overflow-y: auto;
          background: #000000;
          border: 1px solid #262626;
          border-radius: 18px;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.92);
          color: #ffffff;
        }
        .topup-drag-bar {
          display: none;
        }
        .topup-body {
          padding: 24px;
        }
        .topup-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }
        .topup-card {
          position: relative;
          text-align: left;
          cursor: pointer;
          padding: 16px;
          border-radius: 12px;
          background: #141414;
          border: 1.5px solid #262626;
          color: #ffffff;
          transition: border-color 0.15s ease, background 0.15s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .topup-card:hover {
          border-color: #3f3f46;
        }
        .topup-card.is-active {
          background: #1c1c1c;
          border-color: #b4ff04;
        }
        .topup-input {
          width: 100%;
          box-sizing: border-box;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 8px;
          padding: 10px 12px;
          color: #ffffff;
          font-size: 13.5px;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .topup-input:focus {
          border-color: #b4ff04;
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .topup-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .topup-dialog {
            max-width: none;
            max-height: 92vh;
            border-radius: 20px 20px 0 0;
            border-bottom: none;
            animation: sheetUp 0.25s cubic-bezier(0.22, 1, 0.36, 1);
            padding-bottom: env(safe-area-inset-bottom);
          }
          .topup-drag-bar {
            display: block;
            width: 36px;
            height: 4px;
            background: #404040;
            border-radius: 2px;
            margin: 10px auto 0;
          }
          .topup-body {
            padding: 16px 16px 20px;
          }
          .topup-grid {
            gap: 10px;
            margin-bottom: 14px;
          }
          .topup-card {
            padding: 13px 12px;
          }
        }
      `}</style>

      <div className="topup-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="topup-drag-bar" />

        {!checkoutStep ? (
          /* ================= STEP 1: 選擇方案 ================= */
          <div className="topup-body">
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  場位預約媒合方案
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#a3a3a3' }}>
                  單次購買 · 每次預約時段使用 1 次額度
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  background: '#141414',
                  border: '1px solid #2e2e2e',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  color: '#d4d4d4',
                  fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  可預約 <strong style={{ color: '#b4ff04', fontWeight: 800 }}>{Math.floor(points / 30)}</strong> 次
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="關閉"
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
            </div>

            {/* 2x2 Plan Grid */}
            <div className="topup-grid">
              {PLANS.map((p) => {
                const active = p.id === selected;
                return (
                  <button
                    key={p.id}
                    id={`topup-plan-${p.id}`}
                    type="button"
                    className={`topup-card ${active ? 'is-active' : ''}`}
                    onClick={() => setSelected(p.id)}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: active ? '#b4ff04' : '#a3a3a3' }}>
                          {p.name}
                        </span>
                        {active ? (
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#b4ff04',
                            color: '#000000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : p.tag ? (
                          <span style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            color: p.hot ? '#000000' : '#d4d4d4',
                            background: p.hot ? '#b4ff04' : '#262626',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            {p.tag}
                          </span>
                        ) : null}
                      </div>

                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                        {p.times} 次預約
                      </div>
                    </div>

                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #262626', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', fontVariantNumeric: 'tabular-nums' }}>
                        NT$ {p.price}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8a8a8a', fontVariantNumeric: 'tabular-nums' }}>
                        平均 ${p.unitPrice}/次
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Summary Bar */}
            <div style={{
              background: '#141414',
              border: '1px solid #262626',
              borderRadius: '10px',
              padding: '11px 14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px'
            }}>
              <span style={{ color: '#d4d4d4' }}>
                已選 <strong style={{ color: '#ffffff' }}>{plan.name}（包含 {plan.times} 次場位預約）</strong>
              </span>
              <span style={{ fontWeight: 800, color: '#b4ff04', fontSize: '15px', fontVariantNumeric: 'tabular-nums' }}>
                NT$ {plan.price}
              </span>
            </div>

            {/* Primary CTA */}
            <button
              id="topup-confirm-btn"
              type="button"
              onClick={() => setCheckoutStep(true)}
              style={{
                width: '100%',
                height: '46px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                background: '#b4ff04',
                color: '#000000',
                fontWeight: 800,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <span>信用卡付款 NT$ {plan.price}</span>
            </button>

            {/* Footer with Terms link */}
            <div style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid #1f1f1f',
              fontSize: '11px',
              color: '#737373',
              lineHeight: 1.6
            }}>
              <div>
                新台幣 (TWD) 計價 · 支援 Visa / MasterCard / JCB 一次付清，付款完成立即開通額度。
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                <span>購買 7 日內未使用可全額退刷 · 客服 a0903383712@gmail.com / 0903-383-712</span>
                {onOpenTerms && (
                  <button
                    type="button"
                    onClick={onOpenTerms}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: '#b4ff04',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    服務條款與退費規範
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ================= STEP 2: 完整信用卡結帳與條款確認 ================= */
          <div className="topup-body">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                  線上信用卡結帳
                </h2>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#a3a3a3' }}>
                  藍新金流 NewebPay · 256-bit SSL 安全加密交易
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutStep(false)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: '#141414',
                  border: '1px solid #2e2e2e',
                  color: '#d4d4d4',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                返回重選
              </button>
            </div>

            {/* 1. 訂單明細框 (Order Summary Card) */}
            <div style={{
              background: '#141414',
              border: '1px solid #262626',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12.5px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#a3a3a3' }}>購買方案</span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>
                  肌動組 GYMspot — {plan.name}（{plan.times} 次預約媒合）
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#a3a3a3' }}>開通額度</span>
                <span style={{ color: '#d4d4d4', fontWeight: 600 }}>
                  共 {plan.times} 次（每次場館時段鎖位使用 1 次）
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#a3a3a3' }}>付款方式</span>
                <span style={{ color: '#d4d4d4' }}>信用卡一次付清（新台幣 TWD）</span>
              </div>
              <div style={{
                borderTop: '1px solid #262626',
                paddingTop: '8px',
                marginTop: '2px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>應付總額</span>
                <span style={{ color: '#b4ff04', fontSize: '18px', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                  NT$ {plan.price}
                </span>
              </div>
            </div>

            {/* 2. 持卡人與信用卡表單 */}
            <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#a3a3a3', display: 'block', marginBottom: '5px' }}>
                    持卡人姓名
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="請輸入真實姓名"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="topup-input"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#a3a3a3', display: 'block', marginBottom: '5px' }}>
                    聯絡手機號碼
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx-xxx-xxx"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="topup-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#a3a3a3', display: 'block', marginBottom: '5px' }}>
                  電子收據與交易通知信箱
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="topup-input"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <label style={{ fontSize: '12px', color: '#a3a3a3' }}>
                    信用卡資訊
                  </label>
                  <span style={{ fontSize: '11px', color: '#737373', fontWeight: 700, letterSpacing: '0.04em' }}>
                    VISA / MasterCard / JCB
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="卡號 0000 0000 0000 0000"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#141414',
                    border: '1px solid #262626',
                    borderRadius: '8px 8px 0 0',
                    padding: '10px 12px',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    outline: 'none',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="有效期限 MM/YY"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#141414',
                      border: '1px solid #262626',
                      borderTop: 'none',
                      borderRadius: '0 0 0 8px',
                      padding: '10px 12px',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      outline: 'none',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  />
                  <input
                    type="text"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="背面末三碼 CVC"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#141414',
                      border: '1px solid #262626',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRadius: '0 0 8px 0',
                      padding: '10px 12px',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      outline: 'none',
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  />
                </div>
              </div>

              {/* 3. 消費者保護條款與 7 日退費政策勾選框 (金流審核必要項目) */}
              <div style={{
                background: '#141414',
                border: agreedTerms ? '1px solid #3f3f46' : '1px solid #ef4444',
                borderRadius: '10px',
                padding: '12px 14px',
                marginTop: '2px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    style={{
                      accentColor: '#b4ff04',
                      width: '16px',
                      height: '16px',
                      marginTop: '2px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ fontSize: '12px', color: '#d4d4d4', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: '#ffffff' }}>
                      我已詳細閱讀並同意遵守
                    </span>{' '}
                    {onOpenTerms ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onOpenTerms();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: '#b4ff04',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        《平台服務條款與 7 日猶豫期退費政策》
                      </button>
                    ) : (
                      <span style={{ color: '#b4ff04', fontWeight: 700 }}>
                        《平台服務條款與 7 日猶豫期退費政策》
                      </span>
                    )}
                    <div style={{ fontSize: '11px', color: '#8a8a8a', marginTop: '4px', lineHeight: 1.5 }}>
                      • 數位服務即時交付：完成線上刷卡授權後，系統立即開通所購之場位預約媒合額度。<br />
                      • 7日猶豫期保障：自購買日起 7 日內若完全未使用任何場位預約，可聯繫客服申請原卡全額退刷。<br />
                      • 客服專線：0903-383-712 · 客服信箱：a0903383712@gmail.com
                    </div>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !agreedTerms}
                style={{
                  width: '100%',
                  height: '46px',
                  borderRadius: '10px',
                  background: agreedTerms ? '#b4ff04' : '#262626',
                  color: agreedTerms ? '#000000' : '#737373',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: agreedTerms ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '2px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Lock size={15} />
                <span>
                  {isProcessing
                    ? '安全授權處理中...'
                    : agreedTerms
                    ? `確認授權付款 NT$ ${plan.price}`
                    : '請先勾選同意服務條款與退費政策'}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
