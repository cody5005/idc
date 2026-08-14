# idc.

A six-screen troll quiz for anyone whose texts are too long to read. Rebuilt
from scratch as a dependency-free static page — no React, no framer-motion,
no confetti library, no font CDN.

## The two gags

Everything else on the page exists to set these up.

**The button that runs away** (`makeDodger`, screens 2 and 5)
Hover it, tap it, or tab to it and it springs to a random spot on screen. It
re-rolls the destination until the jump is more than 90px, so it never twitches
in place, and it stays 16px inside the viewport so it can never hide off-screen.
Vertical travel is capped at ±180px from home. The other button is the only one
that works, which is the joke.

**The slider that only goes down** (screen 4)
Drag the 💅 knob up past 45% of the track and it lets go and slips straight back
to "I don't care at all." Releasing anywhere above the bottom does the same.
After two attempts it says "Oops… it keeps slipping down 🤭"; after four,
"Give up. It only goes one way. 💀". The first snap-back is what reveals the
DING DING DING button, so you cannot skip the bit. Left idle, the knob twitches
every five seconds to keep you trying.

Both use a small spring integrator (`makeSpring`) tuned to the same
stiffness/damping the original used, so the bounce feels the same. Keyboard
users get the joke too — arrow-keying the slider up snaps it back the same way.

## Files

| Path | What it is |
| --- | --- |
| `src/app.template.html` | The whole app — markup, CSS, JS. Edit this. |
| `src/fonts/*.woff2` | Fredoka and Nunito, latin subsets, variable. |
| `build.mjs` | Inlines the fonts, emits the two outputs below. |
| `index.html` | Standalone page. Drop it on any static host. |
| `artifact.html` | Same page as a body fragment, for Claude Artifacts. |
| `serve.mjs` | Local preview server. |

Both outputs are fully self-contained — zero outbound requests, so they work
offline and behind a strict CSP.

## Working on it

```bash
node build.mjs && node serve.mjs
```

Then open <http://localhost:4321>. Rerun `build.mjs` after every edit to
`src/app.template.html` — the served `index.html` is a build artifact.

## Deploying

`index.html` is the entire site. Drag it into Netlify Drop, commit it to a
GitHub Pages repo, or serve it from any folder. Nothing to install, nothing to
configure.

## Changing the copy

All six screens are plain HTML in `src/app.template.html`, marked
`data-screen="0"` through `data-screen="5"`. Swap the text, rebuild, redeploy.
The gag mechanics key off element IDs, not off the wording, so the jokes keep
working whatever you write.

## Reduced motion

`prefers-reduced-motion` turns off the floating stickers, the sparkles, the
confetti, and the idle slider twitch. The dodge and the snap-back stay — they
are the content, not decoration.
