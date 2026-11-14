import React from 'react';
import { MapPin, RotateCcw } from 'lucide-react';

export default function CoachMapFilter({
  activeCity,
  onCityChange,
  cityList = [],
  onResetFilters
}) {
  const isFiltered = activeCity !== '全部縣市';

  return (
    <div style={{
      background: '#0d121e',
      padding: '14px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      borderBottom: '1px solid #1f293d'
    }}>
      {/* 縣市篩選 (各縣市左側皆標示場館數量) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.04em'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} color="#b4ff04" />
            縣市探索
          </span>
          {isFiltered && onResetFilters && (
            <button
              onClick={onResetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#e2e8f0',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '2px 4px',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#e2e8f0'; }}
            >
              <RotateCcw size={11} />
              重設所有條件
            </button>
          )}
        </div>

        {/* 縣市標籤列 (左側標示登記場館數量) */}
        <div className="chip-scroll" style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {cityList.map((c) => {
            const isActive = activeCity === c.name;
            return (
              <button
                key={c.name}
                onClick={() => onCityChange(c.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 11px 5px 6px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #b4ff04' : '1px solid #1f293d',
                  background: isActive ? 'rgba(180, 255, 4, 0.16)' : '#111827',
                  color: isActive ? '#b4ff04' : '#cbd5e1',
                  fontSize: '12px',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 0 10px rgba(180, 255, 4, 0.35)' : 'none'
                }}
              >
                {/* 縣市左側標示場館數量 */}
                <span style={{
                  background: isActive ? '#b4ff04' : '#1e293b',
                  color: isActive ? '#0a1402' : '#94a3b8',
                  fontWeight: 900,
                  fontSize: '11px',
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  lineHeight: 1,
                  boxShadow: isActive ? '0 0 8px rgba(180, 255, 4, 0.8)' : 'none'
                }}>
                  {c.count}
                </span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
