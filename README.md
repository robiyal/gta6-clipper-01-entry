# gta6-clipper-01-entry

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/robiyal/gta6-clipper-01-entry/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/robiyal/gta6-clipper-01-entry/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

GTA 6 Jet Ski Chase in Vice City — an 11-second vertical Short for make.fun's "Clip GTA 6 for the most YouTube views" bounty. A helicopter hunts an airboat through the swamp, then Jason and Lucia tear across the bay on a green jet ski with the Vice City skyline behind them, cut from Rockstar's official GTA VI Trailer 2. The clip ends on a make.fun pitch card: make clips like this with AI and earn money on make.fun.

The clip itself (`clip.mp4`, plus `TITLE.txt` and `DESCRIPTION.txt`) lives outside this repo — it is uploaded to YouTube by hand, and this repo only carries the submitted video URL in `VIDEO.json`.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22 stdlib only) validates `VIDEO.json` — the URL must be a real `youtube.com/shorts`, `youtube.com/watch` or `youtu.be` link — and copies it to `$MAKEFUN_OUTPUT_DIR/VIDEO.json`. It exits 1 on the placeholder URL shipped in the repo, by design: the placeholder is replaced with the real Shorts URL after the clip is uploaded.

---

<sub>Entered on [make.fun](https://make.fun/?ref=9msm2jv2&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>
