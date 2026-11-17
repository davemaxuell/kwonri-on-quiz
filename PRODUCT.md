# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Primary visitors:** Students, youth, and part-time workers visiting the **권리ON** physical campaign board/booth.
- **Secondary users (operators):** Booth hosts running the shared tablet/laptop or updating the quiz Q&A set as new questions are added.
- **Situation & job:** Visitors arrive casually at a booth or scan a QR code on the board; they want a fast, engaging way to test what they know about their Korean labor rights and immediately learn what is true or illegal.

## Product Purpose
Turn an interactive O/X labor rights quiz into an approachable, high-participation booth experience for **권리ON**, helping visitors quickly check common misconceptions about minimum wage, contracts, rest breaks, wage payment, and equal protection, and walk away knowing their actual legal rights.

## Positioning
Unlike dense legal pamphlets or static poster boards, **권리ON** delivers bite-sized O/X decisions with instant right/wrong feedback, plain-language legal explanations right after each answer, and dual booth support (mobile QR play + quick-reset shared kiosk/tablet play).

## Operating Context
- **Dual physical-booth setup:**
  1. **Mobile QR play:** Visitors scan a QR code displayed on the physical board and play on their own smartphones in portrait view.
  2. **Shared booth device play:** Visitors play on a booth tablet or laptop; operators or consecutive visitors need an instant, zero-friction reset back to the start for the next person.
- **Language:** Korean (`ko`) primary content and UI, tailored for Korean youth/part-time worker clarity.

## Capabilities and Constraints
- **Quiz flow:** Sequential O/X quiz with immediate O/X feedback and a short legal explanation after each question, followed by a final score summary and full answer review.
- **Seed & expanded Q&A data (16 deduplicated items in `src/data/questions.ts`):**
  1–5. Core labor standards & 2026 minimum wage (시급 10,320원, 위약금 조항 무효, 4시간 휴게 30분, 월 1회 정기 임금 지급, 외국인 근로자 보호).
  6–13. Additional workplace & 권리ON items (권리ON 서비스 안내, 근로계약서 교부, 수습기간 임금, 손해배상 임의공제 금지, 주휴수당, 연차 포기 무효, 경업금지, 퇴직금).
  14–16. Everyday housing lease items (등기부등본 열람, 전입신고+확정일자 우선변제권, 1년 전월세 계약 시 2년 주장).
- **Extensible Q&A architecture:** Questions, O/X answers, and explanations live in a clean, structured single source of truth so the user can easily append more Q&As later without touching UI/logic.
- **Deployment target:** Static/client-side web app (no backend required at this stage), pushed to GitHub (`davemaxuell`) and hosted on Vercel.
- **Open/undecided facts:** GitHub repository name and visibility (defaulting to a clean name like `kwonri-on-quiz` unless specified), and additional Q&As to be supplied by the user later.

## Brand Commitments
- **Name:** 권리ON
- **Voice:** Clear, empowering, friendly, and legally accurate without intimidating legalese.

## Evidence on Hand
- Five confirmed O/X quiz items and answers supplied directly by the user.
- Short statutory explanations to be grounded strictly in the Korean Labor Standards Act (근로기준법) and official 2026 minimum wage notice; no fabricated statistics, participant counts, or institutional endorsements.

## Product Principles
1. **Immediate participation:** A passing visitor understands what to do and enters Question 1 in one tap.
2. **Learn in the moment:** Every O/X answer immediately pairs celebratory/corrective feedback with the concise legal reason why.
3. **Zero-friction booth turnover:** Works seamlessly one-handed on a visitor's phone and resets cleanly in one tap for the next booth guest.
4. **Content-ready structure:** Adding 5 or 50 more Q&As later requires editing only a single well-typed data list.
5. **Truthful legal grounding:** Explanations cite real statutory rules accurately without invented claims or jargon overload.

## Accessibility & Inclusion
- High-contrast readable Korean typography for both indoor/outdoor booth lighting and smartphone screens.
- Generous O/X touch targets, full keyboard support (`O`/`X` or arrow keys + `Enter`), and respect for `prefers-reduced-motion`.
