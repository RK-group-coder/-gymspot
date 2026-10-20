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
      {/* 1. Header Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(7, 10, 16, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1e293b',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div 
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img 
            src="/brand-icon.png" 
            alt="肌動組" 
            style={{ height: '40px', width: 'auto', mixBlendMode: 'screen' }} 
          />
          <img 
            src="/brand-text.png" 
            alt="GYMspot" 
            style={{ height: '26px', width: 'auto', marginLeft: '6px', mixBlendMode: 'screen' }} 
          />
        </div>

        <button
          onClick={onNavigateHome}
          style={{
            background: '#b4ff04',
            color: '#0a1402',
            border: 'none',
            borderRadius: '12px',
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 16px rgba(180, 255, 4, 0.35)',
            transition: 'all 0.15s ease'
          }}
        >
          <ArrowLeft size={16} strokeWidth={3} />
          <span>返回地圖找場館</span>
        </button>
      </header>

      {/* 2. Main Article Container */}
      <main style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '60px 24px 90px',
        position: 'relative'
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '240px',
          background: 'radial-gradient(ellipse at center, rgba(180, 255, 4, 0.12) 0%, rgba(7, 10, 16, 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Main Title Badge */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(180, 255, 4, 0.08)',
              border: '1px solid rgba(180, 255, 4, 0.3)',
              borderRadius: '999px',
              padding: '6px 16px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#b4ff04',
              marginBottom: '16px'
            }}>
              <Sparkles size={14} color="#b4ff04" />
              品牌創立核心報告
            </div>

            <h1 style={{
              fontSize: 'clamp(30px, 5vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.25,
              margin: '0 0 16px',
              color: '#ffffff',
              letterSpacing: '-0.5px'
            }}>
              為什麼我們創立<br />
              <span style={{ color: '#b4ff04', textShadow: '0 0 24px rgba(180, 255, 4, 0.45)' }}>
                「肌動組 GYMspot」？
              </span>
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#cbd5e1',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.8
            }}>
              由一群資深自由教練與熱愛重訓的工程師共同發起。<br />
              這不是另一家連鎖健身房，而是一場針對台灣體適能「場租黑箱與抽成剝削」的數位革新。
            </p>
          </div>

          {/* Section A: 我們在台灣看見了什麼問題？ */}
          <section style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '36px 32px',
            marginBottom: '36px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#f87171',
              padding: '6px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 900,
              marginBottom: '16px'
            }}>
              <AlertCircle size={15} /> 我們在台灣健身產業看見的三大沉痾
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.4 }}>
              教練用專業流汗，卻在制度與資訊不對稱中受困
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Problem 1 */}
              <div style={{
                background: '#0a0e17',
                border: '1px solid #1b2436',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontWeight: 900, fontSize: '13px' }}>
                    1
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    高達 30%～50% 的私教課堂抽成剝削
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#94a3b8', margin: 0 }}>
                  在傳統大型連鎖健身房，一堂動輒 1,600 ~ 2,200 元的私人教練課，實際落入教練口袋的往往只有幾百元。龐大業績壓力逼得專業教練變成銷售業務員，無法專心回歸教學本質；想獨立出來當自由教練，卻苦於沒有屬於自己的教學主場。
                </p>
              </div>

              {/* Problem 2 */}
              <div style={{
                background: '#0a0e17',
                border: '1px solid #1b2436',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontWeight: 900, fontSize: '13px' }}>
                    2
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    場租資訊極度黑箱封閉，私訊問到心累
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#94a3b8', margin: 0 }}>
                  台灣缺乏透明的場租彙整平台。自由教練每接一位不同區域的學員，就得逐一到 IG、LINE 私訊周邊工作室詢問：「一小時場租多少？」、「尖峰離峰怎麼算？」、「學員有沒有另外收清潔費？」、「深蹲架有幾台？」。小編回覆緩慢、費率混亂，甚至不同人問給不同報價，消耗極大溝通成本。
                </p>
              </div>

              {/* Problem 3 */}
              <div style={{
                background: '#0a0e17',
                border: '1px solid #1b2436',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', fontWeight: 900, fontSize: '13px' }}>
                    3
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    現場「撞架搶器材」，學員乾等無比尷尬
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#94a3b8', margin: 0 }}>
                  許多場館口頭答應教練可以帶課，但到了現場卻發現深蹲架、專用草皮全被其他教練或會員佔滿。付費學員只能站在旁邊尷尬乾等或臨時被迫換菜單，嚴重損及教學專業形象與授課流暢度。
                </p>
              </div>
            </div>
          </section>

          {/* Section B: 於是，肌動組打算如何解決？ */}
          <section style={{
            background: 'linear-gradient(145deg, rgba(180, 255, 4, 0.08) 0%, rgba(13, 19, 31, 0.95) 100%)',
            border: '1.5px solid rgba(180, 255, 4, 0.4)',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: '0 0 35px rgba(180, 255, 4, 0.12)',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#b4ff04',
              color: '#0a1402',
              padding: '6px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 900,
              marginBottom: '16px'
            }}>
              <CheckCircle2 size={15} /> 我們的具體解法與核心承諾
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', margin: '0 0 20px', lineHeight: 1.4 }}>
              用科技終結黑箱，為台灣打造「公平、透明、高效」的場租新生態
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Solution 1 */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.85)',
                border: '1px solid rgba(180, 255, 4, 0.25)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#b4ff04', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1402', fontWeight: 900, fontSize: '13px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    全台首創「地圖實價登錄」：10 秒比價，所有費用器材全面透明
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#cbd5e1', margin: 0 }}>
                  不用再私訊問價！肌動組將各場館的<strong>離峰/尖峰每小時場租、學員清潔費、深蹲架台數、特殊賽事槓規格</strong>全部公開在地圖上。教練打開手機一鍵定位，半徑幾百公尺內哪家場地最划算、設備最好，一目瞭然。
                </p>
              </div>

              {/* Solution 2 */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.85)',
                border: '1px solid rgba(180, 255, 4, 0.25)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#b4ff04', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1402', fontWeight: 900, fontSize: '13px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    堅持「0 課堂抽成」原則：教練的辛勞收益，100% 留給教練自己
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#cbd5e1', margin: 0 }}>
                  我們絕不從教練的私教課堂費中抽取一分錢佣金。教練自訂課價、自行向學員收費，賺取的每一分錢全數歸教練所有，平台僅作為高效率的純技術工具。
                </p>
              </div>

              {/* Solution 3 */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.85)',
                border: '1px solid rgba(180, 255, 4, 0.25)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#b4ff04', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1402', fontWeight: 900, fontSize: '13px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    秒級時程表鎖位機制：保證到場有專屬深蹲架可用
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#cbd5e1', margin: 0 }}>
                  為每個合作場館建置可用時段排程表。教練提前在線上選定時段與架號鎖位，系統即時扣除該時段可用名額，確保教練與學員踏入現場時，器材已經準備就緒，再也不用經歷搶架乾等的窘境。
                </p>
              </div>

              {/* Solution 4 */}
              <div style={{
                background: 'rgba(8, 12, 20, 0.85)',
                border: '1px solid rgba(180, 255, 4, 0.25)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#b4ff04', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a1402', fontWeight: 900, fontSize: '13px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    100% 營業登記查核與責任保險：為雙方安全築起防護牆
                  </h3>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#cbd5e1', margin: 0 }}>
                  平台嚴格篩選合法立案之合格場館，審查消防安檢與公共意外責任險，淘汰違規黑心鐵皮屋，保障自由教練專業名譽與學員人身安全。
                </p>
              </div>
            </div>
          </section>

          {/* Action Callout Box */}
          <div style={{
            background: 'rgba(17, 24, 39, 0.85)',
            border: '1px solid #243248',
            borderRadius: '20px',
            padding: '28px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#ffffff', margin: 0 }}>
              加入肌動組，一起翻轉台灣自由健身生態
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, maxWidth: '520px' }}>
              無論您是尋求優質場地的自由教練，還是希望提高離峰收益的健身房主，肌動組都是您最可靠的夥伴。
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={onNavigateHome}
                style={{
                  background: '#b4ff04',
                  color: '#0a1402',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 0 16px rgba(180, 255, 4, 0.35)'
                }}
              >
                <MapPin size={16} /> 立即開始地圖探索
              </button>

              <button
                onClick={onOpenRegister}
                style={{
                  background: '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Building2 size={16} /> 場館免費入駐申請
              </button>
            </div>
          </div>
        </div>
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
