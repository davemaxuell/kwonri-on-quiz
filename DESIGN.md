---
name: 권리ON
description: CRT pixel-art arcade O/X labor rights booth quiz
colors:
  bg-void: "#060811"
  bg-crt: "#090e21"
  bg-panel: "#101836"
  bg-panel-deep: "#0b1128"
  blue-arcade: "#1d5ce5"
  blue-border: "#2a4ea8"
  cyan-glow: "#1ad7e6"
  cyan-bright: "#5cecff"
  green-o: "#2ee55b"
  green-o-depth: "#0e7b34"
  green-o-ink: "#04190a"
  red-x: "#d92332"
  red-x-rim: "#f97316"
  red-x-depth: "#7c111b"
  gold-power: "#fcd31d"
  gold-depth: "#a86e08"
  gold-ink: "#1a1100"
  white-flash: "#f4f7ff"
  steel-muted: "#98a6c7"
typography:
  display:
    fontFamily: "'Press Start 2P', 'Galmuri11', monospace"
    fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
  headline:
    fontFamily: "'Galmuri11', system-ui, sans-serif"
    fontSize: "clamp(1.22rem, 2.55vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.48
    letterSpacing: "normal"
  body:
    fontFamily: "'Galmuri11', system-ui, sans-serif"
    fontSize: "clamp(0.95rem, 1.6vw, 1.08rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "'Press Start 2P', 'Galmuri11', monospace"
    fontSize: "0.62rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "26px"
components:
  button-o:
    backgroundColor: "{colors.green-o}"
    textColor: "{colors.green-o-ink}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-x:
    backgroundColor: "{colors.red-x}"
    textColor: "{colors.white-flash}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-next:
    backgroundColor: "{colors.gold-power}"
    textColor: "{colors.gold-ink}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  dialogue-box:
    backgroundColor: "{colors.bg-panel}"
    textColor: "{colors.white-flash}"
    rounded: "{rounded.none}"
    padding: "24px 30px"
---

# Design System: 권리ON

## Overview

**Creative North Star: "The Luminous 16-Color Booth Cabinet"**

권리ON turns a labor-rights booth into a crisp phosphor-black CRT arcade cabinet (`medium-native-crt-arcade-pixel-glow`), built around approved Comp A: an immediate Question 1 RPG/quiz dialogue frame with a pixel-art Korean part-time worker shield sprite, oversized tactile O and X push-buttons, faceted diamond stage gems, and instant booth turnover controls.

**Key Characteristics:**
- Strict 16-color sprite palette over Phosphor Black (`#060811`) and Deep CRT Navy (`#090e21`).
- Crisp 90-degree stepped pixel corners (`0px` border radius throughout) and hard `px` bevels.
- Toggleable CRT scanline overlay (`CRT ON/OFF`) and Web Audio 8-bit synthesizer (`SFX ON/OFF`).

## Colors

High-contrast arcade palette reserving saturated greens, reds, and golds strictly for O/X polarity, stage progress, and rank achievements.

### Primary
- **Phosphor Black** (`#060811`): Outer arcade surround and shadow floor.
- **CRT Screen Navy** (`#090e21`): Active cabinet viewport ground.
- **Arcade Panel Blue** (`#101836`): Dialogue card and rank hero surface.
- **Arcade Frame Blue** (`#1d5ce5`): Outer cabinet border and inner pixel double-frame.
- **Cyan Glow** (`#1ad7e6`): Stepped corner brackets, active stage gem, and brand frame accent.

### Secondary
- **Arcade Green** (`#2ee55b`) / **Deep Green Bevel** (`#0e7b34`): Dedicated to **O (맞다)** choice polarity and right-answer confirmation.
- **Arcade Red** (`#d92332`) / **Orange Rim** (`#f97316`): Dedicated to **X (아니다)** choice polarity and miss/check feedback.
- **Power Gold** (`#fcd31d`) / **Gold Depth** (`#a86e08`): Reserved for `SCORE`, `STAGE`, cleared diamond gems, `NEXT`/`BOOTH RESET` primary action, and rank crowns.

### Neutral
- **Flash White** (`#f4f7ff`): Primary Hangul question and legal explanation ink (>15:1 contrast on `#101836`).
- **Steel Muted** (`#98a6c7`): HUD captions and booth telemetry (>7.2:1 contrast).

### Named Rules
**The Power-Gold Reserve Rule.** Gold (`#fcd31d`) marks only scores, active progress, rank crests, and primary advancement/reset buttons.
**The Polarity Law.** Green (`#2ee55b`) owns **O** and right verdicts; Red (`#d92332`) owns **X** and wrong verdicts.

## Typography

**Display & HUD Font:** `Press Start 2P` (with `Galmuri11` monospace fallback)
**Body & Hangul Display Font:** `Galmuri11` (with `Pretendard`, `Noto Sans KR`, system sans fallbacks)

**Character:** Authentic 8x8 pixel caps for HUD counters combined with crisp 11px-grid Korean pixel typography (`Galmuri11` weights 400 and 700) so Hangul remains razor sharp at booth viewing distance and on mobile QR screens.

### Hierarchy
- **Display HUD** (`400`, `clamp(0.9rem, 1.6vw, 1.15rem)`, `1.2` line-height): `STAGE` and `SCORE` telemetry.
- **Question Headline** (`700`, `clamp(1.22rem, 2.55vw, 1.75rem)`, `1.48` line-height): Main O/X claim inside the CRT box.
- **Legal Body** (`400`, `clamp(0.95rem, 1.6vw, 1.08rem)`, `1.62` line-height, max `66ch`): Plain-language statutory explanation.
- **HUD Labels** (`400`, `0.62rem`, `0.08em` tracking): Small tracked pixel tags (`STAGE`, `SCORE`, `CRT ON`, `SFX ON`).

## Layout

Single-cabinet responsive viewport (`min(980px, 100%)`) keeping HUD, CRT stage, O/X buzzers, and bottom stage-gem/reset strip visible within one desktop/tablet screen (`1280x800`), collapsing sprite-above-question on portrait mobile (`<= 720px`) with zero horizontal overflow.

## Elevation & Depth

Stepped solid-pixel borders and crisp vertical button bevels (`0 8px 0` bottom depth shadow, depressing `translateY(5px)` on `:active`), paired with restrained phosphor edge glow on active CRT borders (`0 0 28px`) and zero soft blur cards.

## Shapes

Sharp pixel geometry (`0px` border radius across all containers, switches, buttons, and SVG sprites), accented by 90-degree stepped corner pixel squares on the primary dialogue box.

## Components

### Buttons
- **Shape:** Sharp rectangular pixel push-buttons (`0px` radius, `4px` rim border, `8px` pixel step bevel).
- **Primary O / X:** Solid `#2ee55b` (`#04190a` ink) and `#d92332` (`#ffffff` ink) pads with keyboard hints hidden on touch/small screens.
- **Next / Booth Reset:** Solid `#fcd31d` (`#1a1100` ink) advancement pad spanning full deck width.

### Cards / Containers
- **Dialogue Box:** `#101836` ground with `#1ad7e6` (`#2ee55b` on correct, `#f97316` on wrong) stepped corner frame and inner `#090e21`/`#1d5ce5` double ring.
- **Review Ledger:** Compact `#0b1128` rows highlighting missed items in `#1a0d16` with `#d92332` borders.

### Hardware Switches, Stage Gems & Booth Tools
- **Toggles (`CRT`, `SFX`):** `#0b1128` pixel slider-track switches with sliding `#2ee55b` / `#1ad7e6` / `#d92332` indicator knobs (`>= 0.6rem` minimum legibility).
- **Stage Gems:** `32x32` sharp `16x16`-grid pixel diamonds centered in the footer, representing `upcoming`, `current`, `cleared`, and `wrong` stages.
- **Booth QR Modal & Reset:** Crisp `#101836` pixel modal rendering a live scannable QR code for the deployed URL alongside 1-tap `BOOTH RESET` turnover.

## Do's and Don'ts

### Do:
- **Do** keep `O` and `X` buzzers large, side-by-side, and free of line-wrapping (`white-space: nowrap`).
- **Do** preserve `CRT ON/OFF` and `SFX ON/OFF` controls in the top HUD for bright booths and quiet spaces.
- **Do** keep 1-tap `BOOTH RESET` accessible in both the bottom booth strip and end screen.

### Don't:
- **Don't** introduce soft rounded corners (`border-radius > 0`), gradients-as-text, or off-palette hues.
- **Don't** obscure Hangul explanations with opaque scanlines — keep scanline opacity subtle (`0.24`).
- **Don't** let the desktop result screen overflow `800px` outer viewport height.
