import React, { useState } from 'react';
import { 
  User, 
  Award, 
  MapPin, 
  DollarSign, 
  Clock, 
  Dumbbell, 
  X, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Phone, 
  Edit3,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [coachProfile, setCoachProfile] = useState({
    name: '林峻 (Alex Lin)',
    title: '肌力體能自由教練 · NSCA-CSCS',
    bio: '專注於肌力三項強化、女性無痛阻力訓練與上班族體態雕塑。重視動作控制與安全關節排列，讓學員在沒有運動傷害的前提下穩定突破個人紀錄。',
    experience: '6 年自由教練帶課資歷',
    hourlyRate: '1,800 ~ 2,200',
    primaryAreas: '台北大安 / 信義 / 板橋',
    instagram: '@alex_coach_fit',
    lineId: 'coach_alex77',
    certifications: [
      'NSCA - Certified Strength and Conditioning Specialist (CSCS)',
      'ACE - Certified Personal Trainer (ACE-CPT)',
      '中華民國紅十字會 CPR+AED 急救員認證',
      'FMS 功能性動作篩檢 Lv.1 & Lv.2'
    ],
    specialties: ['肌力與體能', '深蹲硬舉專項', '體態雕塑', '活動度優化', '新手阻力訓練']
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

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
        id="profile-modal-card"
        style={{
          width: '100%',
          maxWidth: '680px',
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
        {/* Header Cover Banner */}
        <div style={{
          height: '90px',
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #0f172a 100%)',
          position: 'relative',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start'
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: 'none',
              color: '#f8fafc',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Info Summary */}
        <div style={{
          padding: '0 24px 16px',
          position: 'relative',
          marginTop: '-42px',
          borderBottom: '1px solid #1e293b'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              {/* Avatar */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #b4ff04 0%, #ffffff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid #0d131f',
                boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                fontSize: '28px',
                fontWeight: 900,
                color: '#0a1402'
              }}>
                AL
              </div>

              <div style={{ paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    {coachProfile.name}
                  </h2>
                  <span style={{
                    background: 'rgba(180, 255, 4, 0.18)',
                    color: '#b4ff04',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(180, 255, 4, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ShieldCheck size={12} /> 肌動組 GYMspot 認證教練
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '3px 0 0' }}>
                  {coachProfile.title}
                </p>
              </div>
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
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isEditing ? '#b4ff04' : '#1e293b',
                color: isEditing ? '#0a1402' : '#cbd5e1',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <Edit3 size={14} />
              <span>{isEditing ? '儲存變更' : '編輯個人簡介'}</span>
            </button>
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
              個人頁面資料已成功儲存！
            </div>
          )}
        </div>

        {/* Scrollable Body Content */}
        <div style={{
          padding: '20px 24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* Key Coach Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px'
          }}>
            {[
              { label: '本月授課堂數', value: '46 堂', icon: Calendar, color: '#ffffff' },
              { label: '特約配合場館', value: '6 間', icon: Dumbbell, color: '#b4ff04' },
              { label: '學員好評推薦', value: '4.95 ⭐', icon: Star, color: '#fbbf24' },
              { label: '帶課單堂定價', value: `$${coachProfile.hourlyRate}`, icon: DollarSign, color: '#a855f7' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} style={{
                  background: '#111827',
                  border: '1px solid #1f293d',
                  borderRadius: '12px',
                  padding: '12px 10px',
                  textAlign: 'center'
                }}>
                  <Icon size={18} color={stat.color} style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{stat.label}</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#f8fafc', marginTop: '2px' }}>
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coach Bio */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', margin: '0 0 8px' }}>
              教練自介 / 教學理念
            </h4>
            {isEditing ? (
              <textarea
                value={coachProfile.bio}
                onChange={(e) => setCoachProfile({ ...coachProfile, bio: e.target.value })}
                rows={3}
                style={{
                  width: '100%',
                  background: '#090d16',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  color: '#f8fafc',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  outline: 'none'
                }}
              />
            ) : (
              <div style={{
                background: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '10px',
                padding: '12px 14px',
                fontSize: '13px',
                lineHeight: '1.6',
                color: '#cbd5e1'
              }}>
                {coachProfile.bio}
              </div>
            )}
          </div>

          {/* Specialities Chips */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', margin: '0 0 8px' }}>
              專長項目
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {coachProfile.specialties.map((spec, i) => (
                <span key={i} style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  boxShadow: '0 0 6px rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications List */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', margin: '0 0 8px' }}>
              專業證照與查核標籤
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {coachProfile.certifications.map((cert, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#111827',
                  border: '1px solid #1f293d',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#e2e8f0'
                }}>
                  <CheckCircle2 size={15} color="#b4ff04" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', margin: '0 0 8px' }}>
              聯絡方式與常駐商圈
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{
                background: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#cbd5e1'
              }}>
                <MapPin size={16} color="#ffffff" style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))' }} />
                <span>常駐：{coachProfile.primaryAreas}</span>
              </div>
              <div style={{
                background: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: '#cbd5e1'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>IG: {coachProfile.instagram}</span>
              </div>
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
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            關閉頁面
          </button>
        </div>
      </div>
    </div>
  );
}
