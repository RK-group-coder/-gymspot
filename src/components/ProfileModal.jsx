import React, { useState, useRef } from 'react';
import { 
  Award, 
  MapPin, 
  Phone,
  Mail,
  X, 
  CheckCircle2, 
  Edit3,
  Eye,
  Plus,
  Trash2,
  Upload,
  FileImage,
  ShieldAlert,
  Download
} from 'lucide-react';
import { getStoredCoachCerts } from '../utils/certUtils';

export default function ProfileModal({ isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [coachProfile, setCoachProfile] = useState(() => {
    const saved = localStorage.getItem('gymspot_coach_profile');
    const defaultCerts = getStoredCoachCerts();

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          coachId: (parsed.coachId === 'A001' || parsed.coachId === 'A0001') ? 'A1001' : (parsed.coachId || 'A1001'),
          name: parsed.name || '林峻 (Alex Lin)',
          phone: parsed.phone || '0912-345-678',
          email: parsed.email || 'alex.lin.fitness@gmail.com',
          primaryAreas: parsed.primaryAreas || '台北大安 / 信義 / 板橋',
          instagram: parsed.instagram || '@alex_coach_fit',
          certifications: Array.isArray(parsed.certifications) 
            ? parsed.certifications.map((item, idx) => {
                if (typeof item === 'string') {
                  const matched = defaultCerts.find(d => d.name === item);
                  return matched || {
                    id: `cert-${idx}`,
                    name: item,
                    code: `LIC-${idx + 100}`,
                    uploadDate: '已檢附',
                    imageUrl: defaultCerts[0]?.imageUrl || ''
                  };
                }
                return item;
              })
            : defaultCerts
        };
      } catch (e) {
        // fallback
      }
    }
    return {
      coachId: 'A1001',
      name: '林峻 (Alex Lin)',
      phone: '0912-345-678',
      email: 'alex.lin.fitness@gmail.com',
      primaryAreas: '台北大安 / 信義 / 板橋',
      instagram: '@alex_coach_fit',
      certifications: defaultCerts
    };
  });

  // State for adding a new certification
  const [newCertName, setNewCertName] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Add certification（僅填寫文字，不上傳照片）
  const handleAddCertification = () => {
    if (!newCertName.trim()) {
      alert('請先輸入證照全名！例如：NASM-CPT、CPR+AED 等');
      return;
    }

    const newCertItem = {
      id: `cert-custom-${Date.now()}`,
      name: newCertName.trim(),
      uploadDate: new Date().toLocaleDateString('zh-TW')
    };

    setCoachProfile(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertItem]
    }));

    setNewCertName('');
  };

  // Remove certification
  const handleRemoveCertification = (idToRemove) => {
    setCoachProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== idToRemove)
    }));
  };

  // Save changes
  const handleSave = () => {
    setIsEditing(false);
    try {
      localStorage.setItem('gymspot_coach_profile', JSON.stringify(coachProfile));
    } catch (e) {
      // ignore
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <>
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
          id="profile-modal-card"
          style={{
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            background: '#0d131f',
            border: '1px solid #243248',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden'
          }}
        >
          {/* GYMspot Brand Header Banner */}
          <div style={{
            height: '76px',
            background: 'linear-gradient(180deg, rgba(8, 12, 20, 0.85) 0%, rgba(13, 19, 31, 0.98) 100%), url("/gym-dark-bg.jpg") center 40%/cover no-repeat',
            position: 'relative',
            padding: '14px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(180, 255, 4, 0.35)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.45)'
          }}>
            {/* Left: GYMspot Brand Logo & Text (100% 去背透明圖檔，無黑邊黑框) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', userSelect: 'none' }}>
              <img 
                src="/brand-icon-transparent.png" 
                alt="肌動組圖標" 
                style={{ 
                  height: '40px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  flexShrink: 0
                }} 
              />
              <img 
                src="/brand-text-transparent.png" 
                alt="肌動組 GYMspot" 
                style={{ 
                  height: '25px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  marginLeft: '4px',
                  transform: 'translateY(1px)',
                  flexShrink: 0
                }} 
              />
              <span style={{
                marginLeft: '8px',
                background: 'rgba(180, 255, 4, 0.12)',
                border: '1px solid rgba(180, 255, 4, 0.35)',
                color: '#b4ff04',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
                letterSpacing: '0.4px',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
                教練專區
              </span>
            </div>

            {/* Right: Close Button */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#f8fafc',
                cursor: 'pointer',
                padding: '7px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)'
              }}
              title="關閉"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Profile Info Summary Header */}
          <div style={{
            padding: '18px 24px 16px',
            borderBottom: '1px solid #1e293b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {isEditing ? (
                  <input
                    type="text"
                    value={coachProfile.name}
                    onChange={(e) => setCoachProfile({ ...coachProfile, name: e.target.value })}
                    placeholder="請填寫真實姓名"
                    style={{
                      background: '#090d16',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      color: '#f8fafc',
                      fontSize: '18px',
                      fontWeight: 800,
                      outline: 'none',
                      width: '180px'
                    }}
                  />
                ) : (
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', margin: 0, letterSpacing: '0.2px' }}>
                    {coachProfile.name}
                  </h2>
                )}
                <span style={{
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '0.4px'
                }}>
                  會員編號:{coachProfile.coachId || 'A1001'}
                </span>
              </div>

              {/* Edit / Save Button */}
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                style={{
                  background: isEditing ? '#b4ff04' : '#1e293b',
                  color: isEditing ? '#0a1402' : '#cbd5e1',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {isEditing ? '儲存變更' : '編輯個人資料'}
              </button>
            </div>

            <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', lineHeight: 1.6 }}>
              姓名請填寫真實姓名。預約場館時，系統將發送您的姓名、證照與聯絡資訊給場館方確認。
            </div>

            {savedSuccess && (
              <div style={{
                marginTop: '12px',
                padding: '8px 12px',
                background: 'rgba(180, 255, 4, 0.15)',
                border: '1px solid #b4ff04',
                borderRadius: '8px',
                color: '#b4ff04',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={14} />
                個人資料已成功儲存！
              </div>
            )}
          </div>

          {/* Scrollable Body Content */}
          <div style={{
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px'
          }}>
            {/* 1. 專業證照（教練自主檢附證明，無官方背書字眼） */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  專業證照（教練自行填寫，平台不審核）
                </h4>
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '12px' }}>
                本平台不審核教練證照。於場館授課時，場館有權要求教練出示證照，請自行攜帶證照備查。預約時段前，帳號需至少填寫 1 項專業證照，否則系統將自動阻擋預約。
              </div>

              {/* 證照清單 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {coachProfile.certifications.map((cert) => (
                  <div key={cert.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    background: '#111827',
                    border: '1px solid #1f293d',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    transition: 'border-color 0.15s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, overflow: 'hidden' }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '13px', color: '#f1f5f9', fontWeight: 600 }}>{cert.name}</span>
                        {cert.uploadDate && (
                          <span style={{ fontSize: '11px', color: '#64748b', marginLeft: '6px' }}>({cert.uploadDate})</span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>

                      {/* 編輯模式下的刪除按鈕 */}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCertification(cert.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#f87171',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '11.5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                          title="刪除此證照"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* 編輯模式下：新增證照表單 (強制必須檢附照片) */}
              {isEditing && (
                <div style={{
                  marginTop: '12px',
                  background: '#090e17',
                  border: '1px dashed rgba(180, 255, 4, 0.4)',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={15} color="#b4ff04" />
                    <span>新增專業證照</span>
                  </div>

                  <input
                    type="text"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    placeholder="請輸入證照名稱（例如：NASM-CPT、CPR+AED 等）"
                    style={{
                      width: '100%',
                      background: '#111827',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#f8fafc',
                      fontSize: '12.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />


                  <button
                    type="button"
                    onClick={handleAddCertification}
                    style={{
                      background: 'linear-gradient(135deg, #b4ff04 0%, #8ce000 100%)',
                      color: '#0a1402',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12.5px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={15} />
                    確認新增證照
                  </button>
                </div>
              )}
            </div>

            {/* 2. Contact Details (常駐商圈、電話、Gmail、IG) */}
            <div>
              <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                聯絡方式與常駐教學地點
              </h4>

              {isEditing ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '11.5px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>常駐教學地點</label>
                    <input
                      type="text"
                      value={coachProfile.primaryAreas}
                      onChange={(e) => setCoachProfile({ ...coachProfile, primaryAreas: e.target.value })}
                      placeholder="例如：台北大安 / 信義 / 板橋"
                      style={{
                        width: '100%',
                        background: '#090d16',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11.5px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>聯絡電話</label>
                    <input
                      type="text"
                      value={coachProfile.phone}
                      onChange={(e) => setCoachProfile({ ...coachProfile, phone: e.target.value })}
                      placeholder="例如：0912-345-678"
                      style={{
                        width: '100%',
                        background: '#090d16',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11.5px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Gmail / 電子信箱</label>
                    <input
                      type="email"
                      value={coachProfile.email}
                      onChange={(e) => setCoachProfile({ ...coachProfile, email: e.target.value })}
                      placeholder="例如：alex.lin@gmail.com"
                      style={{
                        width: '100%',
                        background: '#090d16',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '11.5px', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>Instagram</label>
                    <input
                      type="text"
                      value={coachProfile.instagram}
                      onChange={(e) => setCoachProfile({ ...coachProfile, instagram: e.target.value })}
                      placeholder="例如：@alex_coach_fit"
                      style={{
                        width: '100%',
                        background: '#090d16',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        padding: '9px 12px',
                        color: '#f8fafc',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {/* 1. 常駐教學地點 */}
                  <div style={{
                    background: '#111827',
                    border: '1px solid #1f293d',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#cbd5e1'
                  }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      常駐教學地點：<strong style={{ color: '#f8fafc' }}>{coachProfile.primaryAreas}</strong>
                    </span>
                  </div>

                  {/* 2. 聯絡電話 */}
                  <div style={{
                    background: '#111827',
                    border: '1px solid #1f293d',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#cbd5e1'
                  }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      電話：<strong style={{ color: '#f8fafc' }}>{coachProfile.phone}</strong>
                    </span>
                  </div>

                  {/* 3. Gmail 信箱 */}
                  <div style={{
                    background: '#111827',
                    border: '1px solid #1f293d',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#cbd5e1'
                  }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      Gmail：<strong style={{ color: '#f8fafc' }}>{coachProfile.email}</strong>
                    </span>
                  </div>

                  {/* 4. Instagram */}
                  <div style={{
                    background: '#111827',
                    border: '1px solid #1f293d',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: '#cbd5e1'
                  }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      IG：<strong style={{ color: '#f8fafc' }}>{coachProfile.instagram}</strong>
                    </span>
                  </div>
                </div>
              )}
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
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              關閉頁面
            </button>
          </div>
        </div>
      </div>

    </>
  );
}
