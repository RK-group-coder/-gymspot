import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';

const PLANS = [
  { id: 'p1', price: 150, points: 150, bonus: 0, note: '= 5 次預約' },
  { id: 'p2', price: 300, points: 330, bonus: 30, note: '= 11 次預約', hot: true },
  { id: 'p3', price: 500, points: 570, bonus: 70, note: '= 19 次預約' },
  { id: 'p4', price: 1000, points: 1200, bonus: 200, note: '= 40 次預約' }
];

export default function TopUpModal({ points, onClose, onTopUp }) {
  const [selected, setSelected] = useState('p2');
  const plan = PLANS.find(p => p.id === selected);

  return (
    <div
      id="topup-modal"
      className="topup-overlay"
      onClick={onClose}
    >
      <style>{`
        .topup-overlay{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px}
        .topup-sheet{width:100%;max-width:440px;max-height:94vh;overflow-y:auto;background:#080c12;border:1px solid rgba(180,255,4,0.35);border-radius:24px;box-shadow:0 0 40px rgba(180,255,4,0.18),0 25px 60px rgba(0,0,0,0.8);position:relative}
        .topup-handle{display:none}
        @keyframes topupSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @media (max-width:768px){
          .topup-overlay{align-items:flex-end;padding:0}
          .topup-sheet{max-width:none;max-height:90vh;border-radius:24px 24px 0 0;border-bottom:none;animation:topupSlideUp 0.3s cubic-bezier(0.22,1,0.36,1);padding-bottom:env(safe-area-inset-bottom)}
          .topup-handle{display:block;position:absolute;top:8px;left:50%;transform:translateX(-50%);width:44px;height:5px;border-radius:3px;background:rgba(255,255,255,0.6);z-index:5}
        }
      `}</style>
      <div
        className="topup-sheet"
        onClick={e => e.stopPropagation()}
      >
        <div className="topup-handle" />
        {/* Hero banner */}
        <div style={{ position: 'relative', height: '210px', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
          <img
            src="/points-banner.png"
            alt="肌動組數位點數"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,12,18,0) 45%, #080c12 100%)'
          }} />
          <button
            onClick={onClose}
            aria-label="關閉"
            style={{
              position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '10px',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.25)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <X size={18} strokeWidth={3.5} color="#ffffff" />
          </button>
        </div>

        <div style={{ padding: '0 22px 22px', marginTop: '-34px', position: 'relative' }}>
          {/* Balance */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(180,255,4,0.16), rgba(17,24,39,0.9))',
            border: '1px solid rgba(180,255,4,0.45)', borderRadius: '16px', padding: '14px 18px',
            marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            boxShadow: '0 0 18px rgba(180,255,4,0.15)'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 800, letterSpacing: '1px' }}>目前餘額 · 1 點 = NT$1</div>
              <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: 700, marginTop: '3px' }}>預約場位每次 30 點</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff' }}>現有</span>
              <div style={{ fontSize: '30px', fontWeight: 900, color: '#b4ff04', textShadow: '0 0 14px rgba(180,255,4,0.6)', lineHeight: 1 }}>
                {points}<span style={{ fontSize: '13px', marginLeft: '4px' }}>點</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 800, color: '#e2e8f0', marginBottom: '10px' }}>
            選擇儲值方案
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            {PLANS.map(p => {
              const active = p.id === selected;
              return (
                <button
                  key={p.id}
                  id={`topup-plan-${p.id}`}
                  onClick={() => setSelected(p.id)}
                  style={{
                    position: 'relative', textAlign: 'left', cursor: 'pointer', padding: '14px 12px',
                    borderRadius: '14px', color: '#f8fafc', transition: 'all 0.18s ease',
                    background: active ? 'linear-gradient(160deg, rgba(180,255,4,0.18), rgba(10,14,22,0.95))' : '#0d131f',
                    border: active ? '1.5px solid #b4ff04' : '1px solid #1f2a3d',
                    boxShadow: active ? '0 0 16px rgba(180,255,4,0.35)' : 'none',
                    transform: active ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {p.hot && (
                    <span style={{
                      position: 'absolute', top: '-9px', right: '10px', background: '#b4ff04', color: '#0a1402',
                      fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '8px',
                      boxShadow: '0 0 10px rgba(180,255,4,0.6)'
                    }}>熱門</span>
                  )}
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>NT$</div>
                  <div style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.1 }}>{p.price}</div>
                  <div style={{ fontSize: '12px', color: '#b4ff04', fontWeight: 800, marginTop: '6px' }}>
                    {p.points} 點
                    {p.bonus > 0 && (
                      <span style={{
                        marginLeft: '6px', fontSize: '10px', background: 'rgba(180,255,4,0.16)',
                        padding: '1px 6px', borderRadius: '6px'
                      }}>送 {p.bonus}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '15px', color: '#ffffff', fontWeight: 900, marginTop: '8px', textShadow: '0 0 8px rgba(255,255,255,0.45)' }}>{p.note}</div>
                </button>
              );
            })}
          </div>

          <button
            id="topup-confirm-btn"
            onClick={() => onTopUp(plan.points, plan.price)}
            style={{
              width: '100%', padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(90deg, #b4ff04, #d4ff5a)', color: '#0a1402', fontWeight: 900, fontSize: '15px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              boxShadow: '0 0 22px rgba(180,255,4,0.45)'
            }}
          >
            <Check size={17} /> 確認儲值 NT$ {plan.price}
          </button>
          <div style={{
            fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
          }}>
            <ShieldCheck size={12} color="#64748b" /> 示範用流程，尚未串接實際金流
          </div>
        </div>
      </div>
    </div>
  );
}
