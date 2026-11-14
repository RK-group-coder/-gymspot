import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ArrowUpDown,
  Check,
  Plus,
  X,
  Camera,
  Award
} from 'lucide-react';

const STORAGE_KEY = 'gymspot_gym_reviews_v1';

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: '張巧陵',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    badge: '在地嚮導 · 22 則評論 · 7 張相片',
    rating: 5,
    timeAgo: '1 個月前',
    timestamp: 1730000000000,
    content: '環境很乾淨，器材很新，混合運動所需要的器材幾乎都有，放鬆的器材也很齊全，練起來很舒服！帶學生來上課空間非常足夠。',
    maintenance: '全新',
    likes: 14,
    photos: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=700&auto=format&fit=crop'
    ]
  },
  {
    id: 'rev-2',
    author: '林柏宇 Kevin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    badge: '自由教練 · 18 則評論 · 5 張相片',
    rating: 5,
    timeAgo: '2 週前',
    timestamp: 1731200000000,
    content: '空間寬敞不擁擠，深蹲架與自由重量區動線規劃得很好，上課時段不會跟其他教練搶器材。環境維護得很舒服，學生反饋也超好！',
    maintenance: '全新',
    likes: 9,
    photos: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=700&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=700&auto=format&fit=crop'
    ]
  },
  {
    id: 'rev-3',
    author: '陳怡君',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    badge: '在地嚮導 · 35 則評論 · 12 張相片',
    rating: 5,
    timeAgo: '2 個月前',
    timestamp: 1728000000000,
    content: '固定跟教練約在這邊上課，也有皮拉提斯與功能性訓練空間，淋浴間跟更衣室都很乾淨舒服，離捷運站近交通很方便。',
    maintenance: '維護極佳',
    likes: 6,
    photos: []
  },
  {
    id: 'rev-4',
    author: '王冠廷 Coach Ray',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    badge: '自由教練 · 9 則評論 · 3 張相片',
    rating: 4,
    timeAgo: '3 個月前',
    timestamp: 1725000000000,
    content: '小時制場租收費透明，不綁堂數對自由教練很友善。器材手感很好，空間採光舒服，是附近帶上課的首選場館。',
    maintenance: '乾淨整潔',
    likes: 5,
    photos: []
  }
];

const KEYWORD_TOPICS = [
  { key: 'all', label: '全部', baseCount: null },
  { key: '舒服', label: '舒服', baseCount: 12 },
  { key: '空間', label: '空間', baseCount: 7 },
  { key: '上課', label: '上課', baseCount: 6 },
  { key: '器材', label: '器材', baseCount: 9 },
  { key: '乾淨', label: '乾淨', baseCount: 8 },
  { key: '皮拉提斯', label: '皮拉提斯', baseCount: 6 }
];

const SORT_OPTIONS = [
  { key: 'relevant', label: '最相關' },
  { key: 'newest', label: '最新' }
];

function loadGymReviews(gymId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_REVIEWS;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed[gymId]) && parsed[gymId].length > 0) {
      return parsed[gymId];
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_REVIEWS;
}

function saveGymReviews(gymId, reviews) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    parsed[gymId] = reviews;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore storage errors
  }
}

export default function GymReviewsSection({ gym }) {
  const gymId = gym?.id || gym?.name || 'default-gym';
  const [reviews, setReviews] = useState(() => loadGymReviews(gymId));
  const [selectedKeyword, setSelectedKeyword] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [likedIds, setLikedIds] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // 新增評論表單狀態（單純保留評論內容與照片，不作星級）
  const [isWriting, setIsWriting] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newPhotos, setNewPhotos] = useState([]);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setReviews(loadGymReviews(gymId));
    setSelectedKeyword('all');
    setSearchQuery('');
    setIsWriting(false);
  }, [gymId]);

  const totalReviewCount = 64 + reviews.length;

  const filteredReviews = useMemo(() => {
    let list = [...reviews];

    if (selectedKeyword !== 'all') {
      list = list.filter(
        (r) =>
          r.content.includes(selectedKeyword) ||
          (r.maintenance && r.maintenance.includes(selectedKeyword))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.content.toLowerCase().includes(q) ||
          r.author.toLowerCase().includes(q) ||
          (r.maintenance && r.maintenance.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    } else {
      // 最相關：有照片與按讚數優先
      list.sort(
        (a, b) =>
          (b.photos?.length || 0) * 3 +
          (b.likes || 0) -
          ((a.photos?.length || 0) * 3 + (a.likes || 0))
      );
    }

    return list;
  }, [reviews, selectedKeyword, searchQuery, sortBy]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4 - newPhotos.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewPhotos((prev) => [...prev, reader.result].slice(0, 4));
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const created = {
      id: `rev-${Date.now()}`,
      author: '自由教練',
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      badge: `自由教練 · 1 則評論${newPhotos.length > 0 ? ` · ${newPhotos.length} 張相片` : ''}`,
      timeAgo: '剛剛',
      timestamp: Date.now(),
      content: newContent.trim(),
      likes: 0,
      photos: newPhotos
    };

    const next = [created, ...reviews];
    setReviews(next);
    saveGymReviews(gymId, next);

    setNewContent('');
    setNewPhotos([]);
    setIsWriting(false);
  };

  const toggleLike = (id) => {
    const already = !!likedIds[id];
    setLikedIds((prev) => ({ ...prev, [id]: !already }));
    const next = reviews.map((r) =>
      r.id === id ? { ...r, likes: Math.max(0, (r.likes || 0) + (already ? -1 : 1)) } : r
    );
    setReviews(next);
    saveGymReviews(gymId, next);
  };

  return (
    <div
      style={{
        background: '#080808',
        borderRadius: '14px',
        border: '1px solid #1f1f1f',
        padding: isMobile ? '16px 14px' : '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '16px' : '20px'
      }}
    >
      {/* 評論標題列 + 搜尋 + 排序 + 撰寫評論 */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#f8fafc',
                margin: 0
              }}
            >
              評論
            </h3>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#b4ff04' }}>
              共 {totalReviewCount} 則
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
            {/* 搜尋按鈕 */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              title="搜尋評論"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '999px',
                background: searchOpen ? '#262626' : '#141414',
                border: '1px solid #262626',
                color: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Search size={16} />
            </button>

            {/* 排序按鈕 */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setSortMenuOpen((v) => !v)}
                style={{
                  height: '36px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  background: '#141414',
                  border: '1px solid #262626',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <ArrowUpDown size={14} />
                <span>
                  排序：{SORT_OPTIONS.find((o) => o.key === sortBy)?.label || '最相關'}
                </span>
              </button>

              {sortMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '42px',
                    zIndex: 25,
                    background: '#141414',
                    border: '1px solid #2a2a2a',
                    borderRadius: '12px',
                    padding: '6px',
                    minWidth: '130px',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.85)'
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.key);
                        setSortMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: sortBy === opt.key ? '#262626' : 'transparent',
                        color: sortBy === opt.key ? '#b4ff04' : '#e2e8f0',
                        fontSize: '13px',
                        fontWeight: sortBy === opt.key ? 800 : 600,
                        cursor: 'pointer'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 撰寫評論按鈕 */}
            <button
              type="button"
              onClick={() => setIsWriting((v) => !v)}
              style={{
                height: '36px',
                padding: '0 14px',
                borderRadius: '999px',
                background: isWriting ? '#262626' : 'rgba(180, 255, 4, 0.14)',
                border: '1px solid rgba(180, 255, 4, 0.45)',
                color: '#b4ff04',
                fontSize: '13px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              {isWriting ? <X size={14} /> : <Plus size={14} />}
              <span>{isWriting ? '取消撰寫' : '撰寫評論'}</span>
            </button>
          </div>
        </div>

        {/* 搜尋輸入框 */}
        {searchOpen && (
          <div style={{ marginBottom: '12px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋評論關鍵字（例如：器材、舒服、空間、上課）..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#111111',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#f8fafc',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        )}

        {/* 撰寫新評論表單（單純評論與照片，無星級） */}
        {isWriting && (
          <form
            onSubmit={handleSubmitReview}
            style={{
              background: '#111111',
              border: '1px solid #262626',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
              分享您在此場館帶課或訓練的體驗
            </div>

            <textarea
              rows={3}
              required
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="環境乾淨度、器材新舊、動線空間、帶課感受..."
              style={{
                background: '#080808',
                border: '1px solid #262626',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#f8fafc',
                fontSize: '13px',
                resize: 'vertical'
              }}
            />

            {/* 上傳評論照片 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: '8px',
                    background: '#1a1a1a',
                    border: '1px solid #2e2e2e',
                    color: '#cbd5e1',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Camera size={15} color="#b4ff04" />
                  <span>新增相片 ({newPhotos.length}/4)</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>

                {newPhotos.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      width: '44px',
                      height: '44px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      border: '1px solid #333'
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => setNewPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                      style={{
                        position: 'absolute',
                        top: 2,
                        right: 2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        border: 'none',
                        padding: 0,
                        fontSize: 10,
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '9px 18px',
                  fontSize: '13px',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                發佈評論
              </button>
            </div>
          </form>
        )}

        {/* Google 風格關鍵字篩選膠囊標籤（手機版支援橫向直覺滑動） */}
        <div
          style={{
            display: 'flex',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: isMobile ? 'auto' : 'visible',
            WebkitOverflowScrolling: 'touch',
            gap: '8px',
            paddingBottom: isMobile ? '4px' : 0,
            marginBottom: '18px'
          }}
        >
          {KEYWORD_TOPICS.map((topic) => {
            const active = selectedKeyword === topic.key;
            return (
              <button
                key={topic.key}
                type="button"
                onClick={() => setSelectedKeyword(topic.key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 13px',
                  borderRadius: '8px',
                  background: active ? '#262626' : '#141414',
                  border: active ? '1px solid #52525b' : '1px solid #222222',
                  color: active ? '#ffffff' : '#d4d4d8',
                  fontSize: '13px',
                  fontWeight: active ? 800 : 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {active && <Check size={14} color="#b4ff04" />}
                <span>{topic.label}</span>
                {topic.baseCount !== null && (
                  <span style={{ color: active ? '#b4ff04' : '#71717a', fontWeight: 700 }}>
                    {topic.baseCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 評論列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredReviews.length === 0 ? (
            <div style={{ fontSize: '13px', color: '#71717a', padding: '16px 0' }}>
              找不到符合此關鍵字的評論。
            </div>
          ) : (
            filteredReviews.map((rev, index) => (
              <div
                key={rev.id}
                style={{
                  paddingBottom: index < filteredReviews.length - 1 ? '20px' : 0,
                  borderBottom: index < filteredReviews.length - 1 ? '1px solid #1a1a1a' : 'none'
                }}
              >
                {/* 使用者頭像與資訊 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1px solid #2a2a2a'
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          right: -2,
                          bottom: -2,
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#f97316',
                          border: '2px solid #080808',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Award size={9} color="#fff" />
                      </span>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
                          {rev.author}
                        </span>
                        <span style={{ fontSize: '12px', color: '#71717a' }}>
                          · {rev.timeAgo}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                        {rev.badge}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 評論內文 */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#e4e4e7',
                    lineHeight: 1.65,
                    margin: rev.photos?.length ? '0 0 12px' : 0,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {rev.content}
                </p>

                {/* 評論附圖 2x2 網格 */}
                {Array.isArray(rev.photos) && rev.photos.length > 0 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: rev.photos.length === 1 ? '1fr' : '1fr 1fr',
                      gap: '6px',
                      marginTop: '10px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      maxWidth: '520px'
                    }}
                  >
                    {rev.photos.map((photoUrl, pIdx) => (
                      <button
                        key={photoUrl + pIdx}
                        type="button"
                        onClick={() => setPreviewPhoto(photoUrl)}
                        style={{
                          padding: 0,
                          border: 'none',
                          background: '#111',
                          height: isMobile ? '115px' : '150px',
                          cursor: 'zoom-in',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={photoUrl}
                          alt={`${rev.author} 評論照片 ${pIdx + 1}`}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.04)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 評論照片點擊放大檢視 */}
      {previewPhoto && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setPreviewPhoto(null);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3100,
            background: 'rgba(0, 0, 0, 0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <img
            src={previewPhoto}
            alt="評論放大照片"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '88vh',
              borderRadius: '12px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.85)'
            }}
          />
        </div>
      )}
    </div>
  );
}

