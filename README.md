# HaoChia_TL — v1-based refinement

Base: `HaoChia_TL_rebase_v1`.

This revision returns both `web/` and `phone/` to the v1 rebase structure, then applies only the requested asset/layout changes. The current guide module is preserved.

Uploaded assets are stored under `shared/assets/tl/`. SVGs with Illustrator-linked photos were repaired to use local `pigs.jpg` / `avocados.jpg`.


## Asset alignment pass
- Updated asset47-p1-bg, asset45-p2-bg, fab desktop/mobile.
- Desktop asset45 shifted up 100px; asset46 enlarged ~20%; first paragraph lowered ~10%.
- asset8 and asset31 clouds enter once from outside the viewport with ease-in and finish flush to the browser edges.


## Desktop asset alignment v3
- asset45-p2-bg moved down 50px from the previous pass.
- asset31-cloud follows the same vertical shift.
- Efficient group moved 20px left.
- First paragraph moved 10px up.
- asset8-cloud enters immediately from +50px right overflow; asset31-cloud enters on scroll from -50px left overflow.
- Cloud transitions shortened to 280ms ease-in.


Update v5: desktop/mobile asset refresh and cloud entry motion tweaks.


## v7 patch
- Desktop: sec2 base transparent; p2 background up 100px; asset31 cloud up 70px more; CTA heading widened/right-aligned region and moved down 10px.
- Mobile: explicit sec1_bg-mobile.svg image added to prevent missing hero background; external links/arrows moved down 3px; footer logo widened to 180px.


## v8 patch
- Desktop sec2 section boundary moved upward another 100px.
- Mobile sec1 rebuilt around the complete sec1_bg-mobile.svg; obsolete sec1-photo removed and live logo/copy overlaid on the unified artwork.


## v12 updates
- Desktop
  - about-mascot kept at 320px wide and shifted 15px left.
  - section-p1__layer extended downward by 200px.
  - footer mail text shifted ~10px left and aligned horizontally with the mail icon.
  - footer logo / mail icon / mail text moved down by 15px from the previous state.
  - footer copyright pinned 15px from the bottom.
- Mobile
  - en-tagline enlarged by 10%.
  - Restored the cloud over the pig photo using `asset8-cloud.svg`.
  - Updated `sec1_bg-mobile.svg` to the newly uploaded version.
  - White seam at the right edge was caused by SVG/subpixel anti-alias rounding on the full-bleed hero artwork; mitigated by slight overscan (`width:101%`, negative left offset).
  - Added proportional whole-page downscaling below 430px viewport width to preserve layout structure.


## Integration pass v13
- Desktop base: `HaoChia_TL_rebase_v1_refined_assets_v7/web`
  - kept the scaling behavior and overall visual balance from v7
  - reduced the upward overlap of section p2 to avoid the clipped top edge
  - lowered the p2 background artwork slightly and filled the section background to remove the white footer gap
  - extended `section-p1__layer` downward to stabilize the lower edge near the transition
- Mobile base: `HaoChia_TL_rebase_v1_refined_assets_v12/phone`
  - preserved the v12 fixes
  - moved footer logo / LINE / mail slightly downward

## v14 integration
Desktop is restored to the exact `HaoChia_TL_rebase_v1_refined_assets_v7/web` implementation and its matching v7 `asset47-p1-bg.svg`.
Only two desktop fixes are added:
1. `section-p2` allows the upward-shifted top of `asset45-p2-bg.svg` to remain visible instead of being clipped.
2. `section-p2` uses the original dark-blue base color so the upward background shift cannot expose a white strip at the footer.

Mobile is preserved exactly from v13 (v12 mobile base + the accepted small footer downward adjustment).


## v15 desktop pass
- Updated asset47-p1-bg.svg
- Header logo now scales proportionally with page width and is enlarged
- CTA heading/list/qrcode moved slightly upward and heading widened toward QR right edge
- Sec1 lower edge unclipped while keeping current sec1/sec2 relationship as close as possible


## v16
- Desktop uses a 1000px master composition and scales the entire artwork stage proportionally to the browser width with no maximum scale cap.
- Floating FAB and guide UI remain viewport-relative and are not scaled with the artwork stage.
- Header logo shifted left by half its own width.
- Smart-farm heading/body and sustainability heading/body/tagline moved upward as groups.
- Footer logo/mail group moved upward by about one footer-logo height.
- Desktop background set to white.
- Guide cycle cue lands the cycle heading around one third from the top of the viewport.
- The original page video remains visible and playing while guide mode is active.


## v17
- Desktop header logo centered while retaining proportional page scaling.
- Sustainability block shifted downward.
- Cycle diagram hover effect removed and replaced with subtle breathing animation.
- Section 2 container/layer made transparent to avoid unintended color bands.
- Updated `shared/assets/tl/asset45-p2-bg.svg` to the latest uploaded revision.

## v19
- Desktop footer logo / mail icon / mail text moved downward by approximately one footer-logo height.
- Sustainability heading / body / English tagline moved down 10px at the 1000px master width.
- asset31 cloud moved down 10px while retaining its edge-overflow and idle sway.
- Added a #def1fb top bleed behind asset47 to mask sub-pixel white seams during proportional stage scaling.


## v20
- Desktop: footer group moved down; sustainability group moved down; partner cloud moved up.
- Desktop: extended top bleed and hero background overlap to suppress the remaining top seam.
- Desktop: updated asset45-p2-bg.svg and changed cloud idle motion to continuous ping-pong with no midpoint hold.

## v22
- Rebuilt from v20 desktop geometry rather than v21.
- Restored footer logo/mail group from v20's unintended +56px shift.
- Header/footer logo AOS moved to direct-position wrappers to reduce SVG blur from nested transforms.
- Added engineer-style AOS entrance motion to CTA links (80ms stagger); retained header/footer/QR/text entrance effects.
- Preserved v21 guide-launch position and English slogan position.
- Preserved v21 cloud idle motion while separating entry translate from idle transform to prevent asset31 entry jump.
- QR moved down exactly 2px at the 1000px master.
- Smart-farm heading/body moved down 10px.
- Mobile asset52-mobile-fruit.svg and p4_bg.svg updated; p4_bg now uses a local package asset.

## v23
- Desktop remains unchanged from v22 for blur diagnosis only.
- Mobile reverted to the v20 phone implementation and v20 asset52-mobile-fruit.svg.

## v24
- Mobile remains exactly on the v20 version restored in v23.
- Desktop element coordinates remain unchanged from v23.
- Replaced whole-page `transform: scale()` with CSS `zoom` when supported, retaining the old transform scaler only as a compatibility fallback.
- AOS animated elements now finish at `transform: none` rather than remaining on `translateZ(0)`, reducing persistent compositing blur.
- No desktop positioning adjustments were introduced in this pass.

## v25
- Fixed desktop white strip / rightward overflow introduced by CSS zoom.
- Root cause: the centered `left: calc((100vw - 1000px)/2)` offset was also magnified by CSS zoom.
- In zoom-capable browsers the 1000px master stage is now anchored at `left: 0`, so its zoomed width exactly matches the viewport.
- Transform-scale fallback retains the original centered behavior.
- Mobile unchanged.

## v26
- Desktop only: footer logo replaced with a direct copy of the current header-logo implementation.
- Footer now inherits the header logo's width, X positioning, SVG rendering treatment, and `zoom-in` AOS behavior.
- Only the footer Y position remains at the current footer value (`top: 78.35%`).
- Mobile unchanged.

## v27
- Desktop only: QR code enlarged slightly and micro-positioned.
- QR top now follows the first CTA-link row.
- QR right edge now follows the CTA heading's 14% right boundary.
- Mobile unchanged.

## v28
- Desktop only: QR code size unchanged from v27.
- QR code nudged 5px left and 4px down at the 1000px master reference.
- Mobile unchanged.


## v29
- Desktop: added a 3px dark-blue footer bleed below section 2 and rounded body height upward with a 3px safety allowance.
- Mobile: added a 3px dark-blue bottom bleed below the p4/footer artwork.
- No content or element-position changes.

## v30
- Mobile: copyright changed to the desktop-style bold treatment (`font-weight: 700`) with full opacity.
- Desktop: cloud idle travel restored to the v20 3%↔9% / -9%↔-3% motion.
- Desktop: added a 1-second hold at each end of the cloud travel; total loop is 9.4s.
- Desktop: entry movement remains separated from idle transform to avoid the asset31 handoff jump.

## v31
- Reverted the desktop body scroll-height calculation to the v28 behavior (`page.offsetHeight * scale`).
- Desktop bottom bleed remains, but is now drawn inward from `bottom: 0` instead of outside the section at `bottom: -3px`.
- Mobile bottom bleed is likewise contained inside the page boundary.
- No visual element positions, cloud motion, QR alignment, logo treatment, or mobile copyright styling were changed.

## v32
- Fixed desktop cloud idle motion: `transform: ... !important` was overriding the keyframe transform, so the clouds stayed frozen after entry.
- Cloud entry still uses the independent `translate` property; the v30 idle path/endpoint holds remain unchanged.
- Fixed cycle-diagram breathing: the v24 AOS sharpness rule (`[data-aos].aos-animate { transform:none!important; }`) was overriding the breathing transform.
- Cycle diagram now uses an outer AOS wrapper and an inner breathing SVG, separating the two transform systems.
- No positioning changes.

## v33 — desktop guide cue refinement
- Guide starts with the first paragraph centered in the viewport.
- Smart-farm stop now centers the heading + paragraph and triggers at 12s (1s earlier).
- CTA stop now positions the "關注智慧好嘉" heading at the upper one-third of the viewport.
- Removed the final footer stop.
- Loop playback now returns directly to the first cue's landing position instead of scrolling to page top first.
- Mobile guide cue configuration was not changed.

## v34 — synchronized desktop/mobile guide cues
- Desktop second stop moved from 12s to 11s.
- Mobile now uses the same guide timing/landing logic as desktop:
  - 0s: first paragraph centered
  - 11s: smart-farm heading + body centered
  - 37s: cycle stop at upper one-third
  - 63s: sustainability stop using the same landing ratio
  - 75s: CTA stop at upper one-third
  - final footer stop removed
- Shared loop behavior remains: replay returns directly to the first cue.

## v35 — guide timing / mobile landing / focus overlay
- Desktop second cue moved 2s earlier: 11s → 9s.
- Mobile second cue likewise moved to 9s.
- Mobile cue targets now land at approximately 1/4 viewport height; group-centering was removed so this landing ratio is respected.
- Mobile guide launch button is positioned so the circular play icon center aligns with the viewport horizontal center line.
- Added supplied 1000×300 TOP and BTM guide focus overlays.
- Overlays fade in while guide mode is active, stay fixed to viewport top/bottom, scale proportionally with viewport width, and sit below the guide thumbnail/player.


## v36 — overlay asset refresh / mobile guide button center
- Replaced guide overlay TOP and BTM assets with the newly provided SVG files.
- Mobile guide launch button is now horizontally centered as a whole, resolving the icon offset issue.


## v37 — overlay orientation fix
- Corrected the guide overlay mapping: TOP asset is used at the viewport top and BTM asset at the viewport bottom.

## v38 — ambient character motion
- Desktop clouds keep the existing v20-derived timing and endpoint pauses; only the outward travel is increased by 10% (9% → 9.9% safe overflow).
- Efficient now has a subtle continuous whole-character gentle wave after its AOS entrance. AOS and the persistent motion are isolated on separate wrapper/image layers.
- The top avocado character inside `asset45-p2-bg.svg` now has a very subtle 7.5s slow-float motion (±3px vertical, ±1px horizontal, ±0.6°).
- The avocado animation targets only the verified pig and avocado SVG groups using a shared transform origin; their original SVG layer order, photo, background, footer artwork, and section geometry are untouched.

## v39 — motion direction refinement
- Efficient continuous motion is now a true two-endpoint ping-pong with no middle keyframe or middle easing pause.
- Both desktop clouds now begin their post-entry idle motion by moving left.
- Hero cloud enters to its outer/right endpoint, then travels left.
- Partner cloud enters to its inner/right endpoint, then travels left.
- Existing cloud travel range and endpoint holds are preserved.


## v40 — cloud entry easing
- Desktop cloud entry keeps the same path and landing point, but now uses a 300ms ease-out curve for a softer deceleration.
- Idle motion begins after a 340ms handoff buffer, preserving the left-first post-entry drift without a hard stop.

## v41 — desktop cloud behavior
- Replaced the custom cloud entry/idle system with an engineer-style split approach.
- One-time entrance now uses AOS on an outer wrapper (`fade-left` for the right cloud, `fade-right` for the left cloud).
- After entrance, the inner cloud SVG moves horizontally in direct response to page scroll; scrolling upward reverses the movement.
- Hero cloud travels from ~9.9% to 3% right overflow while moving through the opening section.
- Partner cloud travels from ~9.9% to 3% left overflow as the sustainability section enters the viewport.
- Scroll work is throttled through `requestAnimationFrame`; no continuous autonomous cloud animation remains.
- Mobile unchanged.

## v42 — cloud scroll amplitude
- Desktop cloud scroll-synchronised horizontal travel increased by 15%.
- The movement midpoint is unchanged; only the travel range is expanded.
- Range changed from 9.9%↔3.0% to approximately 10.42%↔2.48%.
- Mobile unchanged.

## v43 — asset31 scroll-sync fix
- Fixed asset31 scroll-sync not visibly moving.
- Cause: its progress was calculated from the top of the very tall `section-p2`; by the time asset31 itself entered view, the progress was already clamped to 100%.
- asset31 is now synchronised to its own `.partner-cloud-wrap` viewport position.
- Existing ±15% expanded travel range (10.42% ↔ 2.48%) is preserved.
- asset8 behavior is unchanged.
