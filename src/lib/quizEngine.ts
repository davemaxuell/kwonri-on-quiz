import type { OxAnswer, QuizQuestion } from '../data/questions';

export const POINTS_PER_CORRECT = 200;
export const COMBO_BONUS_STEP = 50;

export interface AnswerRecord {
  questionId: number;
  choice: OxAnswer;
  correctAnswer: OxAnswer;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface RankTier {
  grade: 'S' | 'A' | 'B' | 'C';
  levelLabel: string;
  title: string;
  comment: string;
}

export function evaluateAnswer(
  question: QuizQuestion,
  choice: OxAnswer,
  currentStreak: number
): {
  record: AnswerRecord;
  nextStreak: number;
  comboBonus: number;
} {
  const isCorrect = question.answer === choice;
  const nextStreak = isCorrect ? currentStreak + 1 : 0;
  const comboBonus = isCorrect && nextStreak >= 2 ? COMBO_BONUS_STEP : 0;
  const pointsEarned = isCorrect ? POINTS_PER_CORRECT + comboBonus : 0;

  return {
    record: {
      questionId: question.id,
      choice,
      correctAnswer: question.answer,
      isCorrect,
      pointsEarned,
    },
    nextStreak,
    comboBonus,
  };
}

export function computeRank(correctCount: number, totalCount: number): RankTier {
  const ratio = totalCount > 0 ? correctCount / totalCount : 0;

  if (ratio >= 1) {
    return {
      grade: 'S',
      levelLabel: 'LV.99',
      title: '노동법 마스터 · 완전 권리ON!',
      comment: '모든 권리 퀴즈를 완벽하게 뚫었습니다! 어디서 일해도 당당한 에이스!',
    };
  }
  if (ratio >= 0.8) {
    return {
      grade: 'A',
      levelLabel: 'LV.75',
      title: '알바 권리 수호자',
      comment: '핵심 노동법 감각이 아주 날카롭습니다! 아쉽게 놓친 조항만 딱 챙겨보세요.',
    };
  }
  if (ratio >= 0.5) {
    return {
      grade: 'B',
      levelLabel: 'LV.50',
      title: '권리 각성 루키',
      comment: '기본 감각은 충분해요! 오늘 확인한 조항이 실전 알바 현장의 방패가 됩니다.',
    };
  }
  return {
    grade: 'C',
    levelLabel: 'LV.20',
    title: '권리 배터리 충전 중!',
    comment: '지금 바로 알아둔 게 진짜 이득! 아래 오답 노트로 내 권리를 ON 해보세요.',
  };
}

export function formatScore(score: number): string {
  return String(Math.max(0, score)).padStart(5, '0');
}

export function formatStage(currentIndex: number, totalCount: number): string {
  const current = String(Math.min(totalCount, currentIndex + 1)).padStart(2, '0');
  const total = String(totalCount).padStart(2, '0');
  return `${current}/${total}`;
}
