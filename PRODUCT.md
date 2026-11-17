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
- **Seed Q&A data (5 confirmed items):**
  1. 2026년 최저임금은 시급 10,320원이다. (O)
  2. "계약기간 중 퇴사하면 위약금을 낸다"는 조항은 유효하다. (X)
  3. 4시간을 일하면 30분 이상 쉬는 시간을 받아야 한다. (O)
  4. 임금은 매달 한 번 이상, 정해진 날짜에 줘야 한다. (O)
  5. 외국인 근로자도 한국 근로기준법의 보호를 받는다. (O)
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
