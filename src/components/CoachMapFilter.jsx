import React from 'react';
import { MapPin, Layers, RotateCcw } from 'lucide-react';

export default function CoachMapFilter({
  searchQuery,
  onSearchChange,
  activeCity,
  onCityChange,
  activeDistrict,
  onDistrictChange,
  cityList = [],
  districtList = [],
  onResetFilters
}) {
  const isFiltered = activeCity !== '全部縣市' || activeDistrict !== '全部行政區';

  return (
    <div style={{
      background: '#0d121e',
      padding: '14px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      borderBottom: '1px solid #1f293d'
    }}>
      {/* 第一層：縣市篩選 (各縣市左側皆標示場館數量) */}
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
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
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

      {/* 3. 第二層：行政區分區篩選 (螢光白主色調，各分區左側皆標示場館數量) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        paddingTop: '6px',
        borderTop: '1px dashed #1e293b'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 700,
          color: '#cbd5e1',
          letterSpacing: '0.04em'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f1f5f9' }}>
            <Layers size={12} color="#ffffff" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))' }} />
            行政分區 {activeCity !== '全部縣市' ? `(${activeCity})` : ''}
          </span>
          {activeDistrict !== '全部行政區' && (
            <span style={{
              fontSize: '11px',
              color: '#ffffff',
              fontWeight: 700,
              textShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
            }}>
              已鎖定：{activeDistrict}
            </span>
          )}
        </div>

        {/* 行政分區標籤列 (螢光白發光風格，左側標示登記場館數量) */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          {districtList.map((d) => {
            const isActive = activeDistrict === d.name;
            return (
              <button
                key={d.name}
                onClick={() => onDistrictChange(d.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px 4px 5px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #ffffff' : '1px solid #1e283b',
                  background: isActive ? 'rgba(255, 255, 255, 0.16)' : '#0e1522',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontSize: '11px',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.35)' : 'none',
                  textShadow: isActive ? '0 0 6px rgba(255, 255, 255, 0.5)' : 'none'
                }}
              >
                {/* 區域名稱左側標示場館數量 */}
                <span style={{
                  background: isActive ? '#ffffff' : '#1e293b',
                  color: isActive ? '#0a0f1d' : '#64748b',
                  fontWeight: 900,
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  lineHeight: 1,
                  boxShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none'
                }}>
                  {d.count}
                </span>
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
