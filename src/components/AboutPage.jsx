import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  AlertCircle, 
  CheckCircle2, 
  Dumbbell, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  Mail,
  MessageSquare
} from 'lucide-react';

export default function AboutPage({ onNavigateHome, onOpenRegister, onOpenTerms }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#070a10',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* 1. Page Header (Centered) */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '50px 24px 30px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '220px',
          background: 'radial-gradient(ellipse at center, rgba(180, 255, 4, 0.12) 0%, rgba(7, 10, 16, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: -1,
          pointerEvents: 'none'
        }} />

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 900,
          lineHeight: 1.3,
          margin: '0 0 16px',
          color: '#ffffff',
          letterSpacing: '-0.5px'
        }}>
          為什麼我們創立<br />
          <span>
            「<span style={{ color: '#ffffff', textShadow: '0 0 22px rgba(255, 255, 255, 0.85)' }}>肌動組 GYM</span><span style={{ color: '#b4ff04', textShadow: '0 0 25px rgba(180, 255, 4, 0.55)' }}>spot</span>」
          </span>
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#cbd5e1',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.8
        }}>
          由一群資深自由教練與熱愛重訓的工程師共同發起。
        </p>
      </div>

      {/* 2. Main Full-Bleed Story Sections (無框框、貼滿左右兩側) */}
      <main style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Section A: 我們在台灣看見了什麼問題？ (上下白線分隔、左側照片貼滿最左壁，右側文字在照片高度上下置中) */}
        <section 
          className="story-section" 
          style={{ 
            background: 'transparent',
            borderTop: '1px solid rgba(255, 255, 255, 0.35)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.35)'
          }}
        >
          {/* 左側照片：連上最左側螢幕邊緣 */}
          <div className="story-img-side">
            <img 
              src="/about-gym-corner.jpg?v=2" 
              alt="健身房場館角落實景" 
            />
          </div>

          {/* 右側文字：在照片高度範圍內 100% 上下垂直居中 + 水平居中 */}
          <div 
            className="story-text-side" 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              padding: '60px 48px',
              boxSizing: 'border-box'
            }}
          >
            <div className="story-text-inner" style={{ textAlign: 'center', margin: 'auto 0', maxWidth: '580px' }}>
              <h2 style={{ 
                fontSize: 'clamp(22px, 2.5vw, 28px)', 
                fontWeight: 900, 
                color: '#ffffff', 
                margin: '0 auto 20px', 
                lineHeight: 1.35,
                textAlign: 'center' 
              }}>
                我們看見的痛點：要在台灣找一個能帶人的場地，到底有多難？
              </h2>

              <div style={{
                fontSize: '15px',
                lineHeight: 2.15,
                color: '#cbd5e1',
                letterSpacing: '0.2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, textAlign: 'center' }}>
                  我們團隊的幾位夥伴，過去其實也全都是在第一線接案的自由健身教練。在真正出來自己帶課後才深刻發現，要在台灣找到一間「能合法友善帶人」的場租健身房，真的非常非常困難。
                </p>
                <p style={{ margin: 0, textAlign: 'center' }}>
                  就算有些店家確實有提供場租服務，資訊也極端不透明——每家店家點開 Google Maps 一家家找，根本看不出哪間能租、哪間不能租；有些店家明明有在做場租，網路上卻連一丁點費用與規則都沒有放出來。往往在手機前面花了好幾個小時、好不容易篩選出幾家後，教練還得親自頂著大太陽一家家實地走訪現場，櫃檯詢問後才能問到真實報價、確認深蹲架台數與器材規格，整個過程既繁瑣又心力交瘁。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section B: 於是，我們決定徹底終結這場折磨 (上下白線分隔、左側文字在照片高度上下置中，右側照片貼滿最右壁) */}
        <section 
          className="story-section reverse" 
          style={{ 
            background: 'transparent',
            borderTop: '1px solid rgba(255, 255, 255, 0.35)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.35)'
          }}
        >
          {/* 右側照片：連上最右側螢幕邊緣 */}
          <div className="story-img-side">
            <img 
              src="/about-coach-squat.jpg?v=2" 
              alt="教練現場指導學員深蹲" 
            />
          </div>

          {/* 左側文字：在照片高度範圍內 100% 上下垂直居中 + 水平居中 */}
          <div 
            className="story-text-side" 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              textAlign: 'center',
              padding: '60px 48px',
              boxSizing: 'border-box'
            }}
          >
            <div className="story-text-inner" style={{ textAlign: 'center', margin: 'auto 0', maxWidth: '580px' }}>
              <h2 style={{ 
                fontSize: 'clamp(22px, 2.5vw, 28px)', 
                fontWeight: 900, 
                color: '#ffffff', 
                margin: '0 auto 20px', 
                lineHeight: 1.35,
                textAlign: 'center' 
              }}>
                於是，我們決定徹底終結這場找場地的折磨
              </h2>

              <div style={{
                fontSize: '15px',
                lineHeight: 2.15,
                color: '#e2e8f0',
                letterSpacing: '0.2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, textAlign: 'center' }}>
                  正因為我們自己親身走過這段到處碰壁的痛苦過程，才下定決心打造「肌動組 GYMspot」。我們做的事情很單純，就是幫自由教練把全台灣真正有提供場租的健身房與工作室全部找出來整理在地圖上，讓大家能一目了然直接比較各家每小時場租價格與距離，在最短時間內挑選出對教練和學員最方便、最合適的健身房去教課。
                </p>
                <p style={{ margin: 0, textAlign: 'center' }}>
                  更重要的是，我們提供了透明即時的線上預約機制。教練出門前就能先預約好時段，再也不用私訊店家苦苦等待回覆，更不用擔心帶著學員大老遠到了現場，才突然發現客滿、根本沒有位置可以教課。把找場地與確認檔期的折磨交給系統，讓教練能安心專注在帶好每一堂課。
                </p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ height: '40px' }} />
      </main>

      {/* 3. Footer */}
      <footer style={{
        background: '#04060a',
        borderTop: '1px solid #1e293b',
        padding: '36px 24px'
      }}>
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/brand-icon.png" alt="肌動組" style={{ height: '30px', width: 'auto', mixBlendMode: 'screen' }} />
            <span style={{ fontSize: '14px', fontWeight: 900, color: '#ffffff' }}>肌動組 GYMspot</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            fontSize: '12.5px',
            color: '#94a3b8'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={13} color="#b4ff04" /> 客服信箱：contact@gymspot.tw
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={13} color="#b4ff04" /> 官方 LINE 合作諮詢：@gymspot
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '14px',
            fontSize: '11.5px',
            color: '#64748b'
          }}>
            <button
              onClick={onOpenTerms}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              服務條款與隱私權協議
            </button>
            <span>·</span>
            <span>© 2026 肌動組 GYMspot All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
