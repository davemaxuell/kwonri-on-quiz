export type OxAnswer = 'O' | 'X';

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  answer: OxAnswer;
  lawRef: string;
  explanation: string;
}

/**
 * 권리ON O/X 퀴즈 문항 데이터 (Single Source of Truth)
 * ------------------------------------------------------------------
 * 새로운 Q&A를 추가할 때 아래 배열 끝에 같은 형식으로 객체를 추가하면
 * 스테이지 수, 점수, 진행 보석(Stage Gems), 결과 리뷰가 자동으로 확장됩니다.
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: '최저임금',
    question: '2026년 최저임금은 시급 10,320원이다.',
    answer: 'O',
    lawRef: '고용노동부고시 제2025-47호',
    explanation:
      '2026년 법정 최저임금은 시급 10,320원(주 40시간·유급주휴 포함 월 2,156,880원)이며 업종 구분 없이 모든 사업장에 동일하게 적용됩니다.',
  },
  {
    id: 2,
    category: '근로계약',
    question: '"계약기간 중 퇴사하면 위약금을 낸다"는 조항은 유효하다.',
    answer: 'X',
    lawRef: '근로기준법 제20조 (위약 예정의 금지)',
    explanation:
      '근로계약 불이행에 대해 위약금이나 손해배상액을 미리 정하는 계약은 법 위반으로 무효입니다. 중도 퇴사 시에도 위약금을 낼 의무는 없습니다.',
  },
  {
    id: 3,
    category: '휴게시간',
    question: '4시간을 일하면 30분 이상 쉬는 시간을 받아야 한다.',
    answer: 'O',
    lawRef: '근로기준법 제54조 (휴게)',
    explanation:
      '근로시간이 4시간이면 30분 이상, 8시간이면 1시간 이상의 휴게시간을 근무 도중에 주어야 하며, 이 시간에는 자유롭게 쉴 수 있어야 합니다.',
  },
  {
    id: 4,
    category: '임금지급',
    question: '임금은 매달 한 번 이상, 정해진 날짜에 줘야 한다.',
    answer: 'O',
    lawRef: '근로기준법 제43조 (임금 지급)',
    explanation:
      '임금은 통화로 직접·전액을 매월 1회 이상 일정한 날짜를 정해 지급해야 합니다. 정당한 이유 없이 미루거나 일방적으로 깎을 수 없습니다.',
  },
  {
    id: 5,
    category: '평등보호',
    question: '외국인 근로자도 한국 근로기준법의 보호를 받는다.',
    answer: 'O',
    lawRef: '근로기준법 제6조 (균등한 처우)',
    explanation:
      '국적이나 체류자격을 이유로 근로조건을 차별할 수 없습니다. 한국 사업장에서 일하는 외국인 근로자도 근로기준법과 최저임금법의 보호를 받습니다.',
  },
];
