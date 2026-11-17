import React from 'react';

export type SpriteMood = 'ready' | 'happy' | 'alert' | 'victory';

interface WorkerSpriteProps {
  mood: SpriteMood;
  className?: string;
}

/**
 * 24x24 pixel-art sprite representing a Korean part-time worker
 * holding a glowing cyan "권리" shield — rendered at exact integer multiples (120px / 72px).
 */
export const WorkerShieldSprite: React.FC<WorkerSpriteProps> = ({ mood, className }) => {
  const isHappy = mood === 'happy' || mood === 'victory';
  const isAlert = mood === 'alert';

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label="권리ON 방패 캐릭터"
    >
      {/* Ambient pixel shadow */}
      <rect x="4" y="22" width="10" height="1" fill="#060811" />
      <rect x="15" y="21" width="6" height="1" fill="#060811" />

      <g className={`sprite-body sprite-body--${mood}`}>
        {/* Sparkles or alert marker */}
        {isHappy && (
          <g className="sprite-sparkles">
            <rect x="2" y="3" width="1" height="1" fill="#fcd31d" />
            <rect x="1" y="4" width="3" height="1" fill="#fcd31d" />
            <rect x="2" y="5" width="1" height="1" fill="#fcd31d" />
            <rect x="19" y="2" width="1" height="1" fill="#1ad7e6" />
            <rect x="18" y="3" width="3" height="1" fill="#1ad7e6" />
            <rect x="19" y="4" width="1" height="1" fill="#1ad7e6" />
          </g>
        )}
        {mood === 'victory' && (
          <>
            <rect x="6" y="1" width="1" height="2" fill="#fcd31d" />
            <rect x="8" y="0" width="2" height="3" fill="#fcd31d" />
            <rect x="11" y="1" width="1" height="2" fill="#fcd31d" />
            <rect x="6" y="3" width="6" height="1" fill="#a86e08" />
          </>
        )}
        {isAlert && (
          <g className="sprite-alert-mark">
            <rect x="19" y="2" width="2" height="4" fill="#d92332" />
            <rect x="19" y="7" width="2" height="2" fill="#fcd31d" />
          </g>
        )}

        {/* Hair outline & shading */}
        <rect x="6" y="4" width="6" height="1" fill="#060811" />
        <rect x="5" y="5" width="8" height="1" fill="#3b2419" />
        <rect x="4" y="6" width="10" height="2" fill="#3b2419" />
        <rect x="5" y="5" width="3" height="1" fill="#633d29" />
        <rect x="4" y="7" width="1" height="1" fill="#060811" />
        <rect x="13" y="7" width="1" height="1" fill="#060811" />

        {/* Face */}
        <rect x="5" y="8" width="8" height="4" fill="#f8cba6" />
        <rect x="4" y="8" width="1" height="3" fill="#060811" />
        <rect x="13" y="8" width="1" height="3" fill="#060811" />
        <rect x="5" y="12" width="8" height="1" fill="#d99b72" />

        {/* Eyes & mouth */}
        {isHappy ? (
          <>
            <rect x="6" y="9" width="2" height="1" fill="#060811" />
            <rect x="10" y="9" width="2" height="1" fill="#060811" />
            <rect x="8" y="11" width="2" height="1" fill="#d92332" />
          </>
        ) : isAlert ? (
          <>
            <rect x="6" y="9" width="1" height="2" fill="#060811" />
            <rect x="11" y="9" width="1" height="2" fill="#060811" />
            <rect x="8" y="11" width="2" height="1" fill="#060811" />
          </>
        ) : (
          <>
            <g className="sprite-eyes-blink">
              <rect x="6" y="9" width="1" height="2" fill="#060811" />
              <rect x="11" y="9" width="1" height="2" fill="#060811" />
            </g>
            <rect x="5" y="10" width="1" height="1" fill="#f29b88" />
            <rect x="12" y="10" width="1" height="1" fill="#f29b88" />
            <rect x="8" y="11" width="2" height="1" fill="#c96452" />
          </>
        )}

        {/* Shirt sleeves, green collar & navy work apron */}
        <rect x="4" y="13" width="10" height="2" fill="#f4f7ff" />
        <rect x="5" y="13" width="8" height="5" fill="#1d5ce5" />
        <rect x="6" y="13" width="6" height="5" fill="#101836" />
        <rect x="6" y="13" width="1" height="2" fill="#2ee55b" />
        <rect x="11" y="13" width="1" height="2" fill="#2ee55b" />
        <rect x="10" y="15" width="2" height="1" fill="#fcd31d" />

        {/* Arms */}
        {isHappy ? (
          <>
            <rect x="2" y="11" width="2" height="3" fill="#f8cba6" />
            <rect x="14" y="10" width="2" height="3" fill="#f8cba6" />
          </>
        ) : (
          <>
            <rect x="3" y="14" width="2" height="3" fill="#f8cba6" />
            <rect x="13" y="14" width="2" height="2" fill="#f8cba6" />
          </>
        )}

        {/* Legs & shoes */}
        <rect x="6" y="18" width="2" height="3" fill="#182754" />
        <rect x="10" y="18" width="2" height="3" fill="#182754" />
        <rect x="5" y="21" width="3" height="1" fill="#98a6c7" />
        <rect x="10" y="21" width="3" height="1" fill="#98a6c7" />

        {/* Faceted Glowing Cyan Rights Shield */}
        <g
          className="sprite-shield"
          transform={isHappy ? 'translate(0, -2)' : isAlert ? 'translate(-1, -1)' : ''}
        >
          <rect x="15" y="9" width="6" height="1" fill="#060811" />
          <rect x="14" y="10" width="8" height="1" fill="#5cecff" />
          <rect x="13" y="11" width="1" height="5" fill="#060811" />
          <rect x="22" y="11" width="1" height="5" fill="#060811" />
          <rect x="14" y="11" width="8" height="5" fill="#1ad7e6" />
          <rect x="15" y="16" width="6" height="2" fill="#1d5ce5" />
          <rect x="16" y="18" width="4" height="1" fill="#1d5ce5" />
          <rect x="17" y="19" width="2" height="1" fill="#060811" />
          <rect x="15" y="11" width="6" height="4" fill="#5cecff" />
          <rect x="17" y="12" width="2" height="4" fill="#f4f7ff" />
          <rect x="16" y="13" width="4" height="2" fill="#f4f7ff" />
        </g>
      </g>
    </svg>
  );
};

export type GemStatus = 'cleared' | 'wrong' | 'current' | 'upcoming';

/**
 * Sharp 16x16 faceted diamond stage gem — rendered at 32x32 (exact 2x integer scale).
 */
export const StageGem: React.FC<{ status: GemStatus; index: number }> = ({ status, index }) => {
  const palette = {
    cleared: { rim: '#060811', hi: '#fff3a1', face: '#fcd31d', shade: '#a86e08' },
    wrong: { rim: '#060811', hi: '#ff9da4', face: '#d92332', shade: '#7c111b' },
    current: { rim: '#060811', hi: '#f4f7ff', face: '#1ad7e6', shade: '#1d5ce5' },
    upcoming: { rim: '#060811', hi: '#3d569e', face: '#1a2a5c', shade: '#0b1128' },
  }[status];

  return (
    <svg
      viewBox="0 0 16 16"
      className={`stage-gem stage-gem--${status}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`스테이지 ${index + 1} (${status})`}
    >
      {/* Crisp pixel outline */}
      <rect x="7" y="0" width="2" height="1" fill={palette.rim} />
      <rect x="5" y="1" width="6" height="1" fill={palette.rim} />
      <rect x="3" y="2" width="10" height="2" fill={palette.rim} />
      <rect x="1" y="4" width="14" height="3" fill={palette.rim} />
      <rect x="2" y="7" width="12" height="3" fill={palette.rim} />
      <rect x="4" y="10" width="8" height="2" fill={palette.rim} />
      <rect x="6" y="12" width="4" height="2" fill={palette.rim} />
      <rect x="7" y="14" width="2" height="1" fill={palette.rim} />

      {/* Main Diamond Body */}
      <rect x="7" y="1" width="2" height="1" fill={palette.hi} />
      <rect x="5" y="2" width="6" height="2" fill={palette.face} />
      <rect x="2" y="4" width="12" height="3" fill={palette.face} />
      <rect x="3" y="7" width="10" height="2" fill={palette.shade} />
      <rect x="5" y="9" width="6" height="2" fill={palette.shade} />
      <rect x="6" y="11" width="4" height="2" fill={palette.shade} />
      <rect x="7" y="13" width="2" height="1" fill={palette.shade} />

      {/* Sharp upper-left facet highlight */}
      <rect x="5" y="2" width="3" height="2" fill={palette.hi} />
      <rect x="3" y="4" width="3" height="2" fill={palette.hi} />
      <rect x="6" y="5" width="2" height="2" fill={palette.hi} />
    </svg>
  );
};

export const CrownSprite: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 16 12" className={className} shapeRendering="crispEdges" aria-hidden="true">
    <rect x="2" y="2" width="2" height="2" fill="#fcd31d" />
    <rect x="7" y="1" width="2" height="3" fill="#fcd31d" />
    <rect x="12" y="2" width="2" height="2" fill="#fcd31d" />
    <rect x="2" y="4" width="12" height="5" fill="#fcd31d" />
    <rect x="3" y="5" width="10" height="3" fill="#fff3a1" />
    <rect x="4" y="6" width="2" height="2" fill="#1ad7e6" />
    <rect x="7" y="5" width="2" height="2" fill="#d92332" />
    <rect x="10" y="6" width="2" height="2" fill="#2ee55b" />
    <rect x="2" y="9" width="12" height="2" fill="#a86e08" />
  </svg>
);

export const PixelArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 10 10" className={className} shapeRendering="crispEdges" aria-hidden="true">
    <rect x="2" y="1" width="2" height="8" fill="currentColor" />
    <rect x="4" y="2" width="2" height="6" fill="currentColor" />
    <rect x="6" y="3" width="2" height="4" fill="currentColor" />
    <rect x="8" y="4" width="1" height="2" fill="currentColor" />
  </svg>
);

export const QrIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 12 12" className={className} shapeRendering="crispEdges" aria-hidden="true">
    <rect x="1" y="1" width="4" height="4" fill="currentColor" />
    <rect x="2" y="2" width="2" height="2" fill="#060811" />
    <rect x="7" y="1" width="4" height="4" fill="currentColor" />
    <rect x="8" y="2" width="2" height="2" fill="#060811" />
    <rect x="1" y="7" width="4" height="4" fill="currentColor" />
    <rect x="2" y="8" width="2" height="2" fill="#060811" />
    <rect x="7" y="7" width="2" height="2" fill="currentColor" />
    <rect x="9" y="9" width="2" height="2" fill="currentColor" />
    <rect x="6" y="6" width="1" height="1" fill="currentColor" />
  </svg>
);
