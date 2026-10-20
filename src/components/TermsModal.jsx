import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('terms'); // 'terms', 'privacy', 'guidelines'

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
      padding: '20px'
    }}>
      {/* Modal Dialog */}
      <div 
        id="terms-modal-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          background: '#0d131f',
          border: '1px solid #243248',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#111827'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(180, 255, 4, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b4ff04'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                肌動組 GYMspot · 平台服務條款與隱私權
              </h2>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '2px 0 0' }}>
                保障自由教練、健身房場館與學員三方權益之透明準則
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #1e293b',
          background: '#090d16',
          padding: '0 24px'
        }}>
          {[
            { id: 'terms', label: '服務條款 (Terms)', icon: FileText },
            { id: 'privacy', label: '隱私保護 (Privacy)', icon: Lock },
            { id: 'guidelines', label: '場租守則 (Guidelines)', icon: CheckCircle2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '14px 18px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #b4ff04' : '2px solid transparent',
                  color: isActive ? '#b4ff04' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div style={{
          padding: '24px',
          overflowY: 'auto',
          fontSize: '13px',
          lineHeight: '1.7',
          color: '#cbd5e1'
        }}>
          {activeTab === 'terms' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'rgba(180, 255, 4, 0.08)',
                border: '1px solid rgba(180, 255, 4, 0.2)',
                borderRadius: '12px',
                padding: '14px',
                color: '#b4ff04',
                fontSize: '12px'
              }}>
                歡迎使用「肌動組」自由教練與場租媒合平台。使用本平台前，請詳閱以下使用者協議條款。
              </div>

              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  一、平台服務宗旨
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  肌動組提供全台合法立案之健身房、體能工作室場租價格透明比價、設備查詢與聯絡資訊媒合服務。平台不向自由教練抽成課堂費用，致力推廣健康公平的場租共享生態。
                </p>
              </div>

              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  二、自由教練自律規範
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  自由教練使用媒合場地授課時，應具備合法有效之體適能專業證照及 CPR+AED 證照，並恪遵各場館規定之器材使用禮節、離峰/尖峰預約時段及學員清潔費繳納義務。
                </p>
              </div>

              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  三、場地責任與意外免責
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  運動訓練具一定之體能風險，自由教練應於帶課前審慎評估學員身心狀況。除場館器材因自身維護不當造成之損壞外，訓練過程之教學安全由授課教練全權負責任。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  一、個人資料蒐集與利用
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  肌動組僅於提供即時定位半徑搜尋服務時，請求瀏覽器 GPS 定位權限。我們絕不會將教練之精準地理位置或身分資料出售予第三方或廣告商。
                </p>
              </div>

              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  二、資料加密與資安規範
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  所有通訊皆符合 HTTPS 傳輸加密協定。若您為認證教練或場館管理員，登入憑證與通聯資料皆經過高階加密防護，確保資訊隱私不受侵害。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'guidelines' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: '#131b2e',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ color: '#ffffff', textShadow: '0 0 6px rgba(255, 255, 255, 0.5)', fontWeight: 800, marginBottom: '4px' }}>
                  💡 場租三原則：準時歸還、器材歸位、清潔消毒
                </div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>
                  良好場租禮儀是自由教練長期維持低成本帶課與建立良好口碑的關鍵。
                </div>
              </div>

              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  1. 器材使用前需預約登記
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  若場館深蹲架或草皮區為熱門設施，請提前透過 LINE 官方帳號或場館系統預約時段，避免多位教練同時段撞課。
                </p>
              </div>

              <div>
                <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 6px' }}>
                  2. 槓片與啞鈴主動歸位
                </h4>
                <p style={{ margin: 0, color: '#94a3b8' }}>
                  課後應引導學員或教練本人將重量設備回放至架上，並使用場館提供之酒精噴霧擦拭接觸面。
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
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
              borderRadius: '8px',
              padding: '9px 20px',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            我已瞭解並同意
          </button>
        </div>
      </div>
    </div>
  );
}
