/**
 * DIRECTION CONTRACT — 권리ON Arcade Cabinet
 *
 * THESIS: A single-screen 16-color CRT arcade O/X booth where visitors answer Question 1
 * immediately instead of scrolling a static legal pamphlet or SaaS quiz card.
 * OWN-WORLD: Phosphor black (#060811) + deep CRT navy (#090e21/#101836), Arcade Green (#2EE55B)
 * for O, Arcade Red (#D92332) for X, Power Gold (#FCD31D) strictly for scores/ranks/cleared gems,
 * stepped pixel frames, and toggleable scanlines.
 * STORY: Visitors walk up or scan QR -> buzz O/X -> learn the exact Korean labor law in-place ->
 * earn a 권리 레벨 rank card -> reset in 1 tap for the next guest.
 * FIRST VIEWPORT: Top 1UP 권리ON / STAGE / SCORE / [CRT][SFX] HUD, central pixel worker sprite
 * beside Q1 inside corner-bracketed CRT box, chunky O/X push-buttons, stage gems + BOOTH RESET.
 * FORM: Approved Comp A of medium-native-crt-arcade-pixel-glow (seed key 32adb2c5).
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import QRCode from 'qrcode';
import { QUESTIONS, type OxAnswer } from './data/questions';
import {
  computeRank,
  evaluateAnswer,
  formatScore,
  formatStage,
  type AnswerRecord,
} from './lib/quizEngine';
import { sfx } from './lib/sfx';
import {
  CrownSprite,
  PixelArrowIcon,
  QrIcon,
  StageGem,
  WorkerShieldSprite,
  type GemStatus,
  type SpriteMood,
} from './components/PixelSprites';

const BOOTH_PLAYS_KEY = 'kwonri_on_booth_plays';

function readBoothPlays(): number {
  try {
    const raw = window.localStorage.getItem(BOOTH_PLAYS_KEY);
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

export default function App() {
  const [stageIndex, setStageIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [lastFeedback, setLastFeedback] = useState<{
    record: AnswerRecord;
    comboBonus: number;
  } | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [crtEnabled, setCrtEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [boothPlays, setBoothPlays] = useState<number>(() => readBoothPlays());

  const [qrOpen, setQrOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const displayScoreRef = useRef(0);
  const totalStages = QUESTIONS.length;
  const currentQuestion = QUESTIONS[stageIndex];

  useEffect(() => {
    sfx.setEnabled(sfxEnabled);
  }, [sfxEnabled]);

  // Smooth arcade scoreboard roll-up toward target score
  useEffect(() => {
    if (score === 0) {
      displayScoreRef.current = 0;
      setDisplayScore(0);
      return;
    }
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || displayScoreRef.current === score) {
      displayScoreRef.current = score;
      setDisplayScore(score);
      return;
    }

    const startVal = displayScoreRef.current;
    const delta = score - startVal;
    const duration = 280;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(startVal + delta * eased);
      displayScoreRef.current = next;
      setDisplayScore(next);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  useEffect(() => {
    if (!qrOpen || typeof window === 'undefined') return;
    let active = true;
    void QRCode.toDataURL(window.location.href, {
      width: 220,
      margin: 1,
      color: { dark: '#070910', light: '#FFFFFF' },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl(null);
      });
    return () => {
      active = false;
    };
  }, [qrOpen]);

  const handleAnswer = useCallback(
    (choice: OxAnswer) => {
      if (isFinished || lastFeedback || !currentQuestion) return;

      const { record, nextStreak, comboBonus } = evaluateAnswer(
        currentQuestion,
        choice,
        streak
      );

      setRecords((prev) => [...prev, record]);
      setScore((prev) => prev + record.pointsEarned);
      setStreak(nextStreak);
      setBestStreak((prev) => Math.max(prev, nextStreak));
      setLastFeedback({ record, comboBonus });

      if (record.isCorrect) {
        setBurstKey((k) => k + 1);
        sfx.playCorrect();
      } else {
        sfx.playWrong();
      }
    },
    [currentQuestion, isFinished, lastFeedback, streak]
  );

  const handleNext = useCallback(() => {
    if (!lastFeedback) return;

    const isLastStage = stageIndex >= totalStages - 1;
    if (isLastStage) {
      const correctCount = records.filter((r) => r.isCorrect).length;
      setIsFinished(true);
      setLastFeedback(null);
      sfx.playVictory(correctCount === totalStages);

      setBoothPlays((prev) => {
        const next = prev + 1;
        try {
          window.localStorage.setItem(BOOTH_PLAYS_KEY, String(next));
        } catch {
          // Ignore storage quota / private mode failures
        }
        return next;
      });
      return;
    }

    sfx.playClick();
    setStageIndex((prev) => prev + 1);
    setLastFeedback(null);
  }, [lastFeedback, records, stageIndex, totalStages]);

  const handleBoothReset = useCallback(() => {
    sfx.playCoinReset();
    setStageIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setRecords([]);
    setLastFeedback(null);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (qrOpen) {
        if (event.key === 'Escape') setQrOpen(false);
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key.toLowerCase();
      if (key === 'c') {
        setCrtEnabled((v) => !v);
        return;
      }
      if (key === 'm') {
        setSfxEnabled((v) => !v);
        return;
      }
      if (key === 'r') {
        handleBoothReset();
        return;
      }
      if (isFinished) {
        if (key === 'enter' || key === ' ') {
          event.preventDefault();
          handleBoothReset();
        }
        return;
      }
      if (lastFeedback) {
        if (key === 'enter' || key === ' ') {
          event.preventDefault();
          handleNext();
        }
        return;
      }
      if (key === 'o' || event.key === 'ArrowLeft') {
        event.preventDefault();
        handleAnswer('O');
      } else if (key === 'x' || event.key === 'ArrowRight') {
        event.preventDefault();
        handleAnswer('X');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleAnswer, handleBoothReset, handleNext, isFinished, lastFeedback, qrOpen]);

  const correctCount = useMemo(
    () => records.filter((r) => r.isCorrect).length,
    [records]
  );

  const rank = useMemo(
    () => computeRank(correctCount, totalStages),
    [correctCount, totalStages]
  );

  const spriteMood: SpriteMood = isFinished
    ? 'victory'
    : lastFeedback
      ? lastFeedback.record.isCorrect
        ? 'happy'
        : 'alert'
      : 'ready';

  const spriteTagText = lastFeedback
    ? lastFeedback.record.isCorrect
      ? `POWER +${lastFeedback.record.pointsEarned}`
      : 'CHECK!'
    : 'READY';

  const dialogueBoxClass = [
    'dialogue-box',
    lastFeedback?.record.isCorrect ? 'dialogue-box--correct' : '',
    lastFeedback && !lastFeedback.record.isCorrect ? 'dialogue-box--wrong' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="arcade-shell">
      <main className={`crt-cabinet${crtEnabled ? ' crt-on' : ''}`}>
        {/* Top Arcade HUD */}
        <header className="hud-bar">
          <div className="brand-badge">
            <span className="brand-1up">1UP</span>
            <span className="brand-title">권리ON</span>
          </div>

          <div className="hud-stats" aria-live="polite">
            <div className="hud-stat">
              <span className="hud-stat-label">STAGE</span>
              <span className="hud-stat-value">
                {isFinished ? 'CLEAR' : formatStage(stageIndex, totalStages)}
              </span>
            </div>
            <div className="hud-stat">
              <span className="hud-stat-label">SCORE</span>
              <span
                className={`hud-stat-value${
                  displayScore !== score ? ' hud-stat-value--rolling' : ''
                }`}
              >
                {formatScore(displayScore)}
              </span>
            </div>
          </div>

          <div className="hud-toggles">
            <button
              type="button"
              className={`hud-toggle${crtEnabled ? ' is-on' : ''}`}
              onClick={() => {
                sfx.playClick();
                setCrtEnabled((v) => !v);
              }}
              aria-pressed={crtEnabled}
              aria-label={`CRT 스캔라인 ${crtEnabled ? '켜짐' : '꺼짐'}`}
            >
              <span>CRT {crtEnabled ? 'ON' : 'OFF'}</span>
              <span className="toggle-track" aria-hidden="true">
                <span className="toggle-knob toggle-knob--crt" />
              </span>
            </button>
            <button
              type="button"
              className={`hud-toggle${sfxEnabled ? ' is-on' : ''}`}
              onClick={() => setSfxEnabled((v) => !v)}
              aria-pressed={sfxEnabled}
              aria-label={`효과음 ${sfxEnabled ? '켜짐' : '꺼짐'}`}
            >
              <span>SFX {sfxEnabled ? 'ON' : 'OFF'}</span>
              <span className="toggle-track" aria-hidden="true">
                <span className="toggle-knob toggle-knob--sfx" />
              </span>
            </button>
          </div>
        </header>

        {/* Active Quiz Stage OR End Screen */}
        {!isFinished && currentQuestion ? (
          <section className="stage-main" aria-label="권리ON OX 퀴즈 스테이지">
            <article key={currentQuestion.id} className={`${dialogueBoxClass} stage-enter`}>
              <span className="corner-pixel corner-pixel--tl" aria-hidden="true" />
              <span className="corner-pixel corner-pixel--tr" aria-hidden="true" />
              <span className="corner-pixel corner-pixel--bl" aria-hidden="true" />
              <span className="corner-pixel corner-pixel--br" aria-hidden="true" />

              <div className="sprite-stage">
                {lastFeedback?.record.isCorrect && (
                  <div key={burstKey} className="pixel-burst" aria-hidden="true">
                    <span className="score-pop">
                      +{lastFeedback.record.pointsEarned}
                      {lastFeedback.comboBonus > 0 ? ' COMBO!' : ''}
                    </span>
                    <span className="spark spark--1" />
                    <span className="spark spark--2" />
                    <span className="spark spark--3" />
                    <span className="spark spark--4" />
                    <span className="spark spark--5" />
                    <span className="spark spark--6" />
                  </div>
                )}
                <WorkerShieldSprite
                  mood={spriteMood}
                  className={`worker-sprite${
                    spriteMood === 'happy'
                      ? ' worker-sprite--happy'
                      : spriteMood === 'alert'
                        ? ' worker-sprite--alert'
                        : ''
                  }`}
                />
                <span
                  className={`sprite-tag${
                    lastFeedback
                      ? lastFeedback.record.isCorrect
                        ? ' sprite-tag--happy'
                        : ' sprite-tag--alert'
                      : ''
                  }`}
                >
                  {spriteTagText}
                </span>
              </div>

              <div
                className={`dialogue-content${
                  lastFeedback ? ' dialogue-content--feedback' : ''
                }`}
              >
                <div className="meta-row">
                  <span className="category-chip">
                    Q{currentQuestion.id} · {currentQuestion.category}
                  </span>
                  {streak >= 2 && (
                    <span className="combo-chip">{streak} COMBO!</span>
                  )}
                </div>

                {!lastFeedback ? (
                  <h1 className="question-text">
                    <span className="question-num">Q{currentQuestion.id}.</span>
                    {currentQuestion.question}
                  </h1>
                ) : (
                  <>
                    <p className="question-recap">
                      Q{currentQuestion.id}. {currentQuestion.question}
                    </p>
                    <div className="feedback-verdict">
                      <span
                        className={`verdict-pill ${
                          lastFeedback.record.isCorrect
                            ? 'verdict-pill--correct'
                            : 'verdict-pill--wrong'
                        }`}
                      >
                        {lastFeedback.record.isCorrect
                          ? `정답! (${currentQuestion.answer})`
                          : `아쉽네요! 정답은 [${currentQuestion.answer}]`}
                      </span>
                      <span className="law-ref-tag">{currentQuestion.lawRef}</span>
                    </div>
                    <p className="explanation-text">{currentQuestion.explanation}</p>
                  </>
                )}
              </div>
            </article>

            <div className="buzzer-deck">
              {!lastFeedback ? (
                <>
                  <button
                    type="button"
                    className="arcade-btn arcade-btn--o"
                    onClick={() => handleAnswer('O')}
                  >
                    <span className="btn-mark" aria-hidden="true">
                      O
                    </span>
                    <span className="btn-label">맞다!</span>
                    <span className="keycap-hint" aria-hidden="true">
                      O
                    </span>
                  </button>
                  <button
                    type="button"
                    className="arcade-btn arcade-btn--x"
                    onClick={() => handleAnswer('X')}
                  >
                    <span className="btn-mark" aria-hidden="true">
                      X
                    </span>
                    <span className="btn-label">아니다!</span>
                    <span className="keycap-hint" aria-hidden="true">
                      X
                    </span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="arcade-btn arcade-btn--next"
                  onClick={handleNext}
                >
                  <span className="btn-label">
                    {stageIndex >= totalStages - 1
                      ? '결과 및 권리 레벨 확인하기'
                      : '다음 스테이지'}
                  </span>
                  <PixelArrowIcon className="btn-arrow-icon" />
                  <span className="keycap-hint" aria-hidden="true">
                    ENTER
                  </span>
                </button>
              )}
            </div>
          </section>
        ) : (
          <section className="result-stage result-enter" aria-label="퀴즈 최종 결과">
            <div className="result-hero">
              <div
                className={`rank-badge-box${
                  rank.grade === 'S' || rank.grade === 'A' ? ' rank-badge-box--top' : ''
                }`}
              >
                <CrownSprite className="crown-icon" />
                <span className="rank-grade">{rank.grade}</span>
                <span className="rank-level">{rank.levelLabel}</span>
              </div>

              <div className="result-summary">
                <span className="result-kicker">권리 레벨 · ALL STAGES CLEAR!</span>
                <h1 className="result-title">{rank.title}</h1>
                <p className="result-comment">{rank.comment}</p>
                <div className="result-metrics">
                  <span>
                    정답 {correctCount} / {totalStages}
                  </span>
                  <span>최종 {score} PTS</span>
                  {bestStreak >= 2 && <span>최고 {bestStreak}연속 콤보</span>}
                </div>
              </div>

              <WorkerShieldSprite mood="victory" className="worker-sprite worker-sprite--victory" />
            </div>

            <div className="ledger-head-row">
              <span className="ledger-title">문항별 권리 해설 복습 · {totalStages}문항</span>
              <span className="ledger-scroll-hint">스크롤하여 전체 보기 ↕</span>
            </div>

            <div className="review-ledger" aria-label="문항별 권리 해설 복습">
              {QUESTIONS.map((q, index) => {
                const rec = records.find((r) => r.questionId === q.id);
                const isOk = rec?.isCorrect ?? false;
                return (
                  <div
                    key={q.id}
                    style={
                      { '--item-delay': `${Math.min(index, 7) * 32}ms` } as CSSProperties
                    }
                    className={`review-item${isOk ? '' : ' review-item--wrong'}`}
                  >
                    <div className="review-head">
                      <span className="review-q">
                        Q{q.id}. {q.question}
                      </span>
                      <span
                        className={`review-status ${
                          isOk ? 'review-status--ok' : 'review-status--miss'
                        }`}
                      >
                        {isOk ? `CLEAR · ${q.answer}` : `CHECK · 정답 ${q.answer}`}
                      </span>
                    </div>
                    <div className="review-law">
                      <strong>[{q.lawRef}]</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="arcade-btn arcade-btn--next"
              onClick={handleBoothReset}
            >
              <PixelArrowIcon className="btn-arrow-icon" />
              <span className="btn-label">다음 참가자 시작 (BOOTH RESET)</span>
              <span className="keycap-hint" aria-hidden="true">
                ENTER
              </span>
            </button>
          </section>
        )}

        {/* Bottom Progress Gems & Booth Turnover Controls */}
        <footer className="booth-footer">
          <div className="booth-telemetry">
            {boothPlays > 0 ? (
              <span className="booth-plays">PLAYS {String(boothPlays).padStart(2, '0')}</span>
            ) : (
              <span className="booth-plays">BOOTH READY</span>
            )}
          </div>

          <div
            className={`gems-track${totalStages > 8 ? ' gems-track--compact' : ''}`}
            aria-label="진행 스테이지 보석"
          >
            {QUESTIONS.map((q, idx) => {
              const rec = records.find((r) => r.questionId === q.id);
              const status: GemStatus = rec
                ? rec.isCorrect
                  ? 'cleared'
                  : 'wrong'
                : !isFinished && idx === stageIndex
                  ? 'current'
                  : 'upcoming';
              return <StageGem key={q.id} status={status} index={idx} />;
            })}
          </div>

          <div className="booth-actions">
            <button
              type="button"
              className="booth-chip-btn"
              onClick={() => {
                sfx.playClick();
                setQrOpen(true);
              }}
            >
              <QrIcon className="pixel-icon" />
              <span>QR</span>
            </button>
            <button
              type="button"
              className="booth-chip-btn booth-reset-btn"
              onClick={handleBoothReset}
            >
              <span>BOOTH RESET</span>
            </button>
          </div>
        </footer>
      </main>

      {qrOpen && (
        <div
          className="qr-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-dialog-title"
          onClick={() => setQrOpen(false)}
        >
          <div className="qr-panel" onClick={(e) => e.stopPropagation()}>
            <h2 id="qr-dialog-title">내 폰으로 권리ON 퀴즈 풀기</h2>
            <p>카메라로 아래 QR 코드를 스캔하면 휴대폰에서 바로 참여할 수 있습니다.</p>
            <div className="qr-frame">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="권리ON 퀴즈 접속 QR 코드" />
              ) : (
                <span>QR 생성 중...</span>
              )}
            </div>
            {typeof window !== 'undefined' && (
              <span className="qr-url">{window.location.href}</span>
            )}
            <button
              type="button"
              className="qr-close-btn"
              onClick={() => setQrOpen(false)}
            >
              닫기 (ESC)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
