import React, { useState } from 'react';
import { X, Check, CreditCard, ShieldCheck, Mail, Phone, Clock, FileText } from 'lucide-react';

export const PLANS = [
  {
    id: 'p1',
    name: '輕量媒合方案',
    price: 150,
    points: 150,
    times: 5,
    unitPrice: 30,
    bonus: 0,
    description: '包含 5 次場位預約媒合服務（平均 NT$ 30 / 次）'
  },
  {
    id: 'p2',
    name: '標準媒合方案',
    price: 300,
    points: 330,
    times: 11,
    unitPrice: 27,
    bonus: 30,
    description: '包含 11 次場位預約媒合服務（含加贈 1 次，平均 NT$ 27 / 次）',
    hot: true
  },
  {
    id: 'p3',
    name: '進階媒合方案',
    price: 500,
    points: 570,
    times: 19,
    unitPrice: 26,
    bonus: 70,
    description: '包含 19 次場位預約媒合服務（含加贈 3 次，平均 NT$ 26 / 次）'
  },
  {
    id: 'p4',
    name: '專業教練方案',
    price: 1000,
    points: 1200,
    times: 40,
    unitPrice: 25,
    bonus: 200,
    description: '包含 40 次場位預約媒合服務（含加贈 7 次，平均 NT$ 25 / 次）'
  }
];

export default function TopUpModal({ points, onClose, onTopUp }) {
  const [selected, setSelected] = useState('p2');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('a0903383712@gmail.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12 / 28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const plan = PLANS.find((p) => p.id === selected) || PLANS[1];

  const handleOpenCheckout = () => {
    setCheckoutModalOpen(true);
  };

  const handleSimulatedPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutModalOpen(false);
      onTopUp(plan.points, plan.price);
    }, 900);
  };

  return (
    <div id="topup-modal" className="topup-overlay" onClick={onClose}>
      <style>{`
        .topup-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: rgba(0, 0, 0, 0.82);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .topup-sheet {
          width: 100%;
          max-width: 480px;
          max-height: 94vh;
          overflow-y: auto;
          background: #080c12;
          border: 1px solid rgba(180, 255, 4, 0.35);
          border-radius: 24px;
          box-shadow: 0 0 40px rgba(180, 255, 4, 0.16), 0 25px 60px rgba(0, 0, 0, 0.9);
          position: relative;
        }
        .topup-handle { display: none; }
        @keyframes topupSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .topup-overlay {
            align-items: flex-end;
            padding: 0;
          }
          .topup-sheet {
            max-width: none;
            max-height: 92vh;
            border-radius: 24px 24px 0 0;
            border-bottom: none;
            animation: topupSlideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            padding-bottom: env(safe-area-inset-bottom);
          }
          .topup-handle {
            display: block;
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 44px;
            height: 5px;
            border-radius: 3px;
            background: rgba(255, 255, 255, 0.6);
            z-index: 5;
          }
        }
      `}</style>

      <div className="topup-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="topup-handle" />

        {/* Hero banner */}
        <div style={{ position: 'relative', height: '175px', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
          <img
            src="/points-banner.png"
            alt="肌動組教練場位媒合預約方案"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(8,12,18,0.1) 20%, rgba(8,12,18,0.92) 85%, #080c12 100%)'
            }}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="關閉"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        <div style={{ padding: '0 20px 22px', marginTop: '-24px', position: 'relative' }}>
          {/* Header & Subtitle */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#f8fafc' }}>
                自由教練場位預約媒合方案
              </span>
              <span
                style={{
                  background: 'rgba(180, 255, 4, 0.16)',
                  border: '1px solid #b4ff04',
                  color: '#b4ff04',
                  fontSize: '10.5px',
                  fontWeight: 900,
                  padding: '2px 7px',
                  borderRadius: '6px'
                }}
              >
                線上單次購買
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>
              本服務為自由教練提供場地即時排程與媒合，全額新台幣計價 · 信用卡一次付清 · 7日未用全額退費
            </div>
          </div>

          {/* Current balance display */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(180,255,4,0.14), rgba(17,24,39,0.9))',
              border: '1px solid rgba(180,255,4,0.4)',
              borderRadius: '14px',
              padding: '12px 16px',
              marginBottom: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#ffffff', fontWeight: 800 }}>目前帳戶可用預約額度</div>
              <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginTop: '2px' }}>
                場館鎖位每次扣抵 30 點服務費
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: '#b4ff04' }}>{points}</span>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700 }}>點額度</span>
            </div>
          </div>

          {/* 4 Service Plans */}
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', marginBottom: '8px' }}>
            請選擇預約媒合服務方案
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {PLANS.map((p) => {
              const active = p.id === selected;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p.id)}
                  style={{
                    position: 'relative',
                    textAlign: 'left',
                    cursor: 'pointer',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    transition: 'all 0.16s ease',
                    background: active
                      ? 'linear-gradient(160deg, rgba(180,255,4,0.18), rgba(12,18,28,0.98))'
                      : '#0d131f',
                    border: active ? '1.5px solid #b4ff04' : '1px solid #1f2a3d',
                    boxShadow: active ? '0 0 14px rgba(180,255,4,0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>{p.name}</span>
                      {p.hot && (
                        <span
                          style={{
                            background: '#b4ff04',
                            color: '#0a1402',
                            fontSize: '10px',
                            fontWeight: 900,
                            padding: '1px 6px',
                            borderRadius: '5px'
                          }}
                        >
                          熱門首選
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11.5px', color: active ? '#b4ff04' : '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                      {p.description}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '10px' }}>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>新台幣</div>
                    <div style={{ fontSize: '20px', fontWeight: 900, color: '#b4ff04', lineHeight: 1.1 }}>
                      ${p.price}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Checkout Button */}
          <button
            id="topup-confirm-btn"
            type="button"
            onClick={handleOpenCheckout}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(90deg, #b4ff04, #d4ff5a)',
              color: '#0a1402',
              fontWeight: 900,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(180,255,4,0.4)'
            }}
          >
            <CreditCard size={17} />
            <span>線上信用卡一次付清 NT$ {plan.price}</span>
          </button>

          {/* Compliance & Consumer Rights Card for Gateway Review (藍新金流審核專用合規卡片) */}
          <div
            style={{
              marginTop: '14px',
              background: '#0d131f',
              border: '1px solid #1c2738',
              borderRadius: '12px',
              padding: '12px 14px',
              fontSize: '11px',
              color: '#cbd5e1',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#b4ff04', fontWeight: 800, fontSize: '11.5px' }}>
              <ShieldCheck size={14} />
              <span>藍新金流交易安全與消費者保護政策</span>
            </div>
            <div>
              <strong>計價幣別與付款方式：</strong>全站交易皆以新台幣 (TWD) 計價，支援 Visa / MasterCard / JCB 信用卡 256-bit SSL 安全即時交易。
            </div>
            <div>
              <strong>數位服務即時交付：</strong>完成線上刷卡授權後，系統將立即開通所選方案之場位預約媒合服務。
            </div>
            <div>
              <strong>7日無條件全額退費政策：</strong>自購買日起算 7 日內，若所購方案完全未使用任何預約服務，可聯繫客服申請全額刷退處理。
            </div>
            <div style={{ borderTop: '1px dashed #243248', paddingTop: '6px', marginTop: '2px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={12} color="#b4ff04" />
                <span>客服信箱：a0903383712@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Phone size={12} color="#b4ff04" />
                <span>客服電話：0912-345-678（週一至週五 10:00 - 18:00）</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <FileText size={12} color="#b4ff04" />
                <span>營運品牌：肌動組 GYMspot 運動空間媒合平台</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 藍新金流線上刷卡結帳模擬視窗 */}
      {checkoutModalOpen && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setCheckoutModalOpen(false);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3200,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
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
              maxWidth: '430px',
              background: '#0d131f',
              border: '1px solid #23334d',
              borderRadius: '20px',
              padding: '22px',
              color: '#f4f4f5',
              boxShadow: '0 25px 60px rgba(0,0,0,0.95)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="/brand-icon-transparent.png"
                  alt="GYMspot"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>藍新金流 (NewebPay) 線上安全刷卡</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                style={{
                  background: '#151f30',
                  border: '1px solid #283952',
                  color: '#cbd5e1',
                  borderRadius: '8px',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* 訂單摘要 */}
            <div
              style={{
                background: '#131b2b',
                border: '1px solid #24354e',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>
                  {plan.name}（{plan.times} 次預約媒合）
                </div>
                <div style={{ fontSize: '11px', color: '#b4ff04', marginTop: '2px' }}>
                  開通 {plan.points} 點可用預約額度
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#b4ff04' }}>NT$ {plan.price}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>新台幣一次付清</div>
              </div>
            </div>

            {/* 刷卡表單 */}
            <form onSubmit={handleSimulatedPayment} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div>
                <label style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  持卡人電子發票／交易收據通知信箱
                </label>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#070a11',
                    border: '1px solid #23344d',
                    borderRadius: '8px',
                    padding: '8px 11px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                  信用卡卡號（Visa / MasterCard / JCB）
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="卡號"
                  style={{
                    width: '100%',
                    background: '#070a11',
                    border: '1px solid #23344d',
                    borderRadius: '8px 8px 0 0',
                    padding: '8px 11px',
                    color: '#ffffff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="有效月年 (MM/YY)"
                    style={{
                      background: '#070a11',
                      border: '1px solid #23344d',
                      borderTop: 'none',
                      borderRadius: '0 0 0 8px',
                      padding: '8px 11px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="text"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="背面後三碼 (CVC)"
                    style={{
                      background: '#070a11',
                      border: '1px solid #23344d',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRadius: '0 0 8px 0',
                      padding: '8px 11px',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  fontSize: '14.5px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '4px'
                }}
              >
                <Check size={16} />
                <span>{isProcessing ? '256-bit SSL 安全授權處理中...' : `確認刷卡付款 NT$ ${plan.price}`}</span>
              </button>
            </form>

            <div style={{ fontSize: '10.5px', color: '#64748b', textAlign: 'center', lineHeight: 1.4 }}>
              待藍新金流商店代號 (MerchantID) 與 HashKey 核發後，此視窗將對接藍新正式 MPG 刷卡閘道。
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
