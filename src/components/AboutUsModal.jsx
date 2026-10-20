import React from 'react';
import { X, Dumbbell, ShieldCheck, Heart, Sparkles, MapPin, Mail, MessageSquare } from 'lucide-react';

export default function AboutUsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        id="about-us-modal"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          background: '#0d131f',
          border: '1px solid #243248',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 30px rgba(180, 255, 4, 0.1)',
          overflow: 'hidden'
        }}
      >
        {/* Header with Logo */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#111827'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/brand-icon.png" 
              alt="肌動組" 
              style={{ height: '36px', width: 'auto', mixBlendMode: 'screen' }} 
            />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#f8fafc', letterSpacing: '0.5px' }}>
                關於 肌動組 GYMspot
              </div>
              <div style={{ fontSize: '11px', color: '#b4ff04', fontWeight: 700 }}>
                全台自由教練與優質場租健身房媒合平台
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="關閉"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontSize: '13px',
          lineHeight: '1.7',
          color: '#cbd5e1'
        }}>
          {/* Mission statement */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(180, 255, 4, 0.08) 0%, rgba(13, 19, 31, 0.9) 100%)',
            border: '1px solid rgba(180, 255, 4, 0.25)',
            borderRadius: '16px',
            padding: '16px 18px'
          }}>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#b4ff04" /> 我們的初心與使命
            </div>
            <div style={{ color: '#cbd5e1', fontSize: '12.5px' }}>
              「讓每一位自由教練，都能輕鬆找到離學員最近、設備最頂級、價格最透明的訓練主場。」<br />
              肌動組打破傳統場租資訊不對稱與昂貴佣金結構，打造健康、公平、高效率的健身共享生態系。
            </div>
          </div>

          {/* Core Values 3 Columns / Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
              三大核心承諾
            </div>

            <div style={{
              background: '#111827',
              border: '1px solid #1f2a3d',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'rgba(180, 255, 4, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b4ff04',
                flexShrink: 0
              }}>
                <Dumbbell size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                  課堂費用 0 抽成
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  我們堅信教學成果與收益 100% 屬於教練本人。平台絕不抽成您的任何一堂私教費。
                </div>
              </div>
            </div>

            <div style={{
              background: '#111827',
              border: '1px solid #1f2a3d',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'rgba(180, 255, 4, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b4ff04',
                flexShrink: 0
              }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                  實價公開 · 規格透明
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  各場館離峰/尖峰時段場租、學員清潔費、深蹲架台數與專業草皮配置全面公開，比價不再靠私訊。
                </div>
              </div>
            </div>

            <div style={{
              background: '#111827',
              border: '1px solid #1f2a3d',
              borderRadius: '14px',
              padding: '12px 14px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'rgba(180, 255, 4, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b4ff04',
                flexShrink: 0
              }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>
                  嚴格查核保證
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                  入駐場館皆經合法立案查核與公共意外責任險把關，讓您與學員每一次授課都安全安心。
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Community */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.7)',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#f8fafc' }}>
              聯絡我們與合作提案
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="#b4ff04" /> 客服信箱：contact@gymspot.tw
            </div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={14} color="#b4ff04" /> 官方 LINE 合作諮詢：@gymspot
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'flex-end',
          background: '#090d16'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#b4ff04',
              color: '#0a1402',
              border: 'none',
              borderRadius: '10px',
              padding: '9px 20px',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
}
