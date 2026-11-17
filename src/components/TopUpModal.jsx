import React, { useState } from 'react';
import { X, Check, Lock } from 'lucide-react';

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

export default function TopUpModal({ points, onClose, onTopUp }) {
  const [selected, setSelected] = useState('p2');
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('a0903383712@gmail.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = PLANS.find((p) => p.id === selected) || PLANS[1];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
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
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .topup-dialog {
          width: 100%;
          max-width: 500px;
          background: #0b0f17;
          border: 1px solid #1e293b;
          border-radius: 18px;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.75);
          color: #f8fafc;
          overflow: hidden;
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
          background: #111827;
          border: 1.5px solid #1e293b;
          color: #f8fafc;
          transition: border-color 0.15s ease, background 0.15s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .topup-card:hover {
          border-color: #334155;
        }
        .topup-card.is-active {
          background: #141e2e;
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
            border-radius: 20px 20px 0 0;
            border-bottom: none;
            animation: sheetUp 0.25s cubic-bezier(0.22, 1, 0.36, 1);
            padding-bottom: env(safe-area-inset-bottom);
          }
          .topup-drag-bar {
            display: block;
            width: 36px;
            height: 4px;
            background: #334155;
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
          <div className="topup-body">
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  場位預約媒合方案
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#94a3b8' }}>
                  單次購買 · 每次預約鎖位扣抵 30 點
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  background: '#151e2e',
                  border: '1px solid #26354d',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  color: '#cbd5e1',
                  fontWeight: 600,
                   fontVariantNumeric: 'tabular-nums'
                }}>
                  可用 <strong style={{ color: '#b4ff04', fontWeight: 800 }}>{points}</strong> 點
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="關閉"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: '1px solid #1e293b',
                    color: '#94a3b8',
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
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: active ? '#b4ff04' : '#94a3b8' }}>
                          {p.name}
                        </span>
                        {active ? (
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#b4ff04',
                            color: '#0b0f17',
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
                            color: p.hot ? '#0b0f17' : '#cbd5e1',
                            background: p.hot ? '#b4ff04' : '#1e293b',
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

                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', fontVariantNumeric: 'tabular-nums' }}>
                        NT$ {p.price}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontVariantNumeric: 'tabular-nums' }}>
                        {p.points} 點 · ${p.unitPrice}/次
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Summary Bar */}
            <div style={{
              background: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '11px 14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px'
            }}>
              <span style={{ color: '#cbd5e1' }}>
                已選 <strong style={{ color: '#ffffff' }}>{plan.name}（{plan.times} 次預約 / {plan.points} 點）</strong>
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
                color: '#090d14',
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

            {/* Clean, Understated Compliance Footer */}
            <div style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid #161f2e',
              fontSize: '11px',
              color: '#64748b',
              lineHeight: 1.55
            }}>
              <div>
                新台幣 (TWD) 計價 · 支援 Visa / MasterCard / JCB 一次付清，付款完成立即開通額度。
              </div>
              <div style={{ marginTop: '2px' }}>
                購買 7 日內若未使用任何預約可申請全額退刷 · 客服 a0903383712@gmail.com / 0903-383-712
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Clean Credit Card Checkout View inside the same modal */
          <div className="topup-body">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>
                  信用卡安全付款
                </h2>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                  {plan.name} · {plan.times} 次場位預約媒合（{plan.points} 點）
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutStep(false)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: '#151e2e',
                  border: '1px solid #26354d',
                  color: '#cbd5e1',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                返回重選
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>
                  電子收據通知信箱
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#111827',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>
                  信用卡資訊（Visa / MasterCard / JCB）
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="卡號"
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    background: '#111827',
                    border: '1px solid #1e293b',
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
                    placeholder="MM/YY"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#111827',
                      border: '1px solid #1e293b',
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
                    placeholder="CVC"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      background: '#111827',
                      border: '1px solid #1e293b',
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

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  height: '46px',
                  borderRadius: '10px',
                  background: '#b4ff04',
                  color: '#090d14',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '4px'
                }}
              >
                <Lock size={15} />
                <span>{isProcessing ? '授權處理中...' : `確認付款 NT$ ${plan.price}`}</span>
              </button>
            </form>

            <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '12px' }}>
              透過藍新金流 256-bit SSL 加密傳輸 · 商店代號核發後自動切換正式刷卡閘道
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
