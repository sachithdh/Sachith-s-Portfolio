import { useEffect, useRef, type ComponentType } from "react";
import {
  SiDocker,
  SiGithub,
  SiNginx,
  SiReact,
  SiNodedotjs,
  SiNestjs,
  SiSpringboot,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiKubernetes,
  SiAmazonwebservices,
  SiSupabase,
  SiLinux,
  SiGit,
  SiPython,
  SiTailwindcss,
  SiFigma,
  SiVercel,
  SiGraphql,
  SiPhp,
  SiUbuntu,
  SiPostman,
  SiGithubactions,
  SiVite,
  SiRedux,
  SiExpress,
  SiFirebase,
  SiCloudflare,
  SiTerraform,
  SiRabbitmq,
  SiGrafana,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

type Logo = {
  name: string;
  Icon: ComponentType;
  // Brand colour; null means the mark is monochrome and follows the theme ink
  color: string | null;
};

const LOGOS: Logo[] = [
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "GitHub", Icon: SiGithub, color: null },
  { name: "Nginx", Icon: SiNginx, color: "#009639" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
  { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
  { name: "Next.js", Icon: SiNextdotjs, color: null },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", Icon: FaJava, color: "#ED8B00" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
  { name: "AWS", Icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Supabase", Icon: SiSupabase, color: "#3FCF8E" },
  { name: "Linux", Icon: SiLinux, color: "#FCC624" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Vercel", Icon: SiVercel, color: null },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Ubuntu", Icon: SiUbuntu, color: "#E95420" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Express", Icon: SiExpress, color: null },
  { name: "Firebase", Icon: SiFirebase, color: "#DD2C00" },
  { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020" },
  { name: "Terraform", Icon: SiTerraform, color: "#844FBA" },
  { name: "RabbitMQ", Icon: SiRabbitmq, color: "#FF6600" },
  { name: "Grafana", Icon: SiGrafana, color: "#F46800" },
];

// ── Spiral tuning (desktop / mobile profiles) ──
const LAYOUT = {
  arms: 6,
  turns: 1.05, // revolutions each arm makes from origin to outer end
  rMaxFrac: 0.7, // drawn spiral reach, as a fraction of the half-diagonal
  birthFrac: 0.08, // where tiles are born, as a fraction of the outer winding
  cardN: 64,
  tunedMpx: 1.65, // viewport area the tile count was tuned at
  cardHFrac: 0.17, // tile size ceiling as a fraction of viewport height
  density: 0.82, // share of the gap to the nearest neighbour a tile may fill
};
const MOBILE = {
  belowMpx: 0.6,
  arms: 3,
  turns: 0.7,
  rMaxFrac: 0.8,
  birthFrac: 0.08,
  cardN: 14,
  cardHFrac: 0.2,
  density: 0.94,
};
const MAX_CARDS = LAYOUT.cardN;

const MOTION = {
  idleSpeed: 0.57, // full journeys (birth → offscreen) per minute
  scrub: 0.2, // journeys advanced per 1000px of scroll
  spinDeg: -50, // global rotation, degrees per minute
  wobblePx: 6,
  wobbleHz: 0.25,
  armJitter: 0.76, // per-arm conveyor stagger, in slot gaps
  introAt: 0.4, // seconds before the reveal wave starts
  introDur: 4,
  rollChunk: 0.12, // journey fraction tiles slide outward during the reveal
  burstX: 3, // conveyor speed multiplier at the start of the intro
  burstDur: 2.5,
  waveBand: 220,
};

const LOOK = {
  innerCap: 0.45, // newborn size ceiling, ramping to 1 over the journey
  blurPx: 12, // birth blur in tile-local px
  blurEnd: 0.18, // journey fraction where tiles come into focus
  fadeBand: 0.15, // journey fraction over which newborns fade in
  lineAlpha: 0.15,
  tickAlpha: 0.3,
  lineW: 2,
  ticksPerArm: 16,
  circFrac: 0.56, // dashed construction circle radius vs outer winding
  pulseAlpha: 0.72,
  pulseSpeed: 0.19,
  pulseLen: 0.05,
  pulseW: 3.5,
  pulseCount: 3,
  pulseHue: 0.4, // per-arm hue rotation of the pulse colour (dark theme)
  copyDim: 0.28, // tile opacity while passing behind the hero copy
};

const POINTER = {
  fieldPx: 320,
  tugPx: 8,
  holdTau: 0.15, // how fast the hovered tile brakes
  restTau: 1, // how fast the rest of the spiral follows it to a stop
  holdWobble: 1.2,
  heldScale: 1.12,
};

const ARM_SAMPLES = 200;
const BASE_PX = 100; // tiles are laid out at this size and scaled per frame

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const fract = (x: number) => x - Math.floor(x);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const ease = (current: number, target: number, dt: number, tau: number) =>
  current + (target - current) * (1 - Math.exp(-dt / Math.max(0.01, tau)));

type Geometry = {
  arms: number;
  cardN: number;
  rMax: number;
  thetaMax: number;
  thetaBirth: number;
  thetaExit: number;
  b: number;
  cardCap: number;
  density: number;
  slotsPerArm: number;
};

const buildGeometry = (width: number, height: number): Geometry => {
  const mpx = (width * height) / 1e6;
  const mobile = mpx < MOBILE.belowMpx;
  const p = mobile ? MOBILE : LAYOUT;
  const arms = p.arms;
  const cardN = mobile
    ? MOBILE.cardN
    : Math.max(
        6,
        Math.min(LAYOUT.cardN, Math.round((LAYOUT.cardN * mpx) / LAYOUT.tunedMpx)),
      );
  const halfDiag = Math.hypot(width, height) / 2;
  const rMax = p.rMaxFrac * halfDiag;
  const thetaMax = p.turns * Math.PI * 2;
  // Archimedean spiral r = b·θ
  const b = rMax / thetaMax;
  const cardCap = Math.min(180, Math.max(56, height * p.cardHFrac));
  return {
    arms,
    cardN,
    rMax,
    thetaMax,
    thetaBirth: p.birthFrac * thetaMax,
    // Tiles keep travelling until they are fully offscreen
    thetaExit: (halfDiag + 1.5 * cardCap) / b,
    b,
    cardCap,
    density: p.density,
    slotsPerArm: Math.max(1, Math.ceil(cardN / arms)),
  };
};

// Rotates a hex colour's hue by `deg`, for the per-arm pulse tint
const hueShift = (hex: string, deg: number) => {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const bl = (n & 255) / 255;
  const max = Math.max(r, g, bl);
  const min = Math.min(r, g, bl);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - bl) / d) % 6;
    else if (max === g) h = (bl - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  h = (h * 60 + deg + 360 * 4) % 360;
  return `hsl(${h.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%)`;
};

const HeroVortex = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tileEls = useRef<(HTMLDivElement | null)[]>([]);
  const spriteEls = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const tiles = tileEls.current;
    const sprites = spriteEls.current;

    // Per-tile state
    const journey = new Float32Array(MAX_CARDS);
    const prevJourney = new Float32Array(MAX_CARDS).fill(NaN);
    const holdOffset = new Float32Array(MAX_CARDS);
    const size = new Float32Array(MAX_CARDS);
    const held = new Float32Array(MAX_CARDS);
    const posX = new Float32Array(MAX_CARDS);
    const posY = new Float32Array(MAX_CARDS);
    // Least-recently-used counter per logo, so neighbours rarely repeat
    const logoUse = new Float64Array(LOGOS.length).map((_, i) => i);
    let useCounter = LOGOS.length;

    const setLogo = (tile: number, logo: number) => {
      const el = tiles[tile];
      const sprite = sprites[logo];
      logoUse[logo] = ++useCounter;
      if (!el || !sprite) return;
      el.querySelector(".hero-vortex__icon")?.replaceChildren(
        ...Array.from(sprite.childNodes, (n) => n.cloneNode(true)),
      );
      const label = el.querySelector(".hero-vortex__label");
      if (label) label.textContent = LOGOS[logo].name;
      const color = LOGOS[logo].color;
      if (color) el.style.setProperty("--logo-color", color);
      else el.style.removeProperty("--logo-color");
    };

    // Deal logos golden-ratio scattered so the first frame isn't patterned
    for (let i = 0; i < MAX_CARDS; i++) {
      setLogo(i, Math.floor(fract(i * 0.618034) * LOGOS.length));
    }

    let width = 0;
    let height = 0;
    let geo = buildGeometry(1, 1);
    const colors = {
      line: "rgba(242, 241, 238, 0.4)",
      accent: "#2d81ff",
      ink: "#f2f1ee",
      light: false,
    };

    const readTheme = () => {
      const cs = getComputedStyle(root);
      colors.line = cs.getPropertyValue("--hero-line-strong").trim() || colors.line;
      colors.accent = cs.getPropertyValue("--hv-pulse").trim() || colors.accent;
      colors.ink = cs.getPropertyValue("--hero-ink").trim() || colors.ink;
      colors.light =
        document.documentElement.getAttribute("data-theme") === "light";
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = root.clientWidth;
      height = root.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      geo = buildGeometry(width, height);
      tiles.forEach((el, i) => {
        if (el) el.style.display = i < geo.cardN ? "" : "none";
      });
      size.fill(0);
    };

    const state = {
      time: 0,
      idleP: 0,
      spin: 0,
      lastP: 0,
      holdTarget: 0,
      holdRest: 0,
      target: -1,
    };
    const pointer = { x: 0, y: 0, active: false };

    const drawUnderlay = (
      cx: number,
      cy: number,
      cos: number,
      sin: number,
      waveR: number,
      instr: number,
    ) => {
      const { arms, b, thetaBirth, thetaExit, thetaMax, rMax } = geo;
      const rot = (x: number, y: number): [number, number] => [
        cx + cos * x - sin * y,
        cy + sin * x + cos * y,
      ];
      const t0 = 0.3 * thetaBirth;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let arm = 0; arm < arms; arm++) {
        const offset = (arm * Math.PI * 2) / arms;
        const pts: [number, number][] = [];
        for (let s = 0; s <= ARM_SAMPLES; s++) {
          const th = t0 + (s / ARM_SAMPLES) * (thetaExit - t0);
          const r = b * th;
          pts.push(rot(r * Math.cos(th + offset), r * Math.sin(th + offset)));
        }

        // Resting hairline guide
        ctx.globalAlpha = LOOK.lineAlpha * instr;
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = LOOK.lineW * 0.6;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let s = 1; s < pts.length; s++) ctx.lineTo(pts[s][0], pts[s][1]);
        ctx.stroke();

        // Comet pulses riding outward: sharp head, longer tail, arms dephased
        // by the golden conjugate so they never flash in lockstep
        ctx.strokeStyle = colors.light
          ? colors.ink
          : hueShift(colors.accent, arm * LOOK.pulseHue * 360);
        for (let s = 0; s < ARM_SAMPLES; s++) {
          const aT = s / ARM_SAMPLES;
          const d = fract(
            aT * LOOK.pulseCount - state.time * LOOK.pulseSpeed + arm * 0.618,
          );
          const off = d - 0.5;
          const sig = LOOK.pulseLen * (off < 0 ? 1.7 : 0.55);
          let g = Math.exp(-0.5 * (off / sig) * (off / sig));
          g *= smoothstep(0.04, 0.14, aT);
          const r = b * (t0 + aT * (thetaExit - t0));
          g *= clamp01((waveR - r) / MOTION.waveBand);
          if (g < 0.02) continue;
          ctx.globalAlpha = LOOK.pulseAlpha * g * instr * (colors.light ? 0.62 : 1);
          ctx.lineWidth = LOOK.lineW * 0.6 + LOOK.pulseW * g;
          ctx.beginPath();
          ctx.moveTo(pts[s][0], pts[s][1]);
          ctx.lineTo(pts[s + 1][0], pts[s + 1][1]);
          ctx.stroke();
        }
      }

      // Tick marks straddling each arm's outer half
      ctx.globalAlpha = LOOK.tickAlpha * instr;
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let arm = 0; arm < arms; arm++) {
        const offset = (arm * Math.PI * 2) / arms;
        for (let i = 0; i < LOOK.ticksPerArm; i++) {
          const th = thetaMax * (0.45 + (0.55 * (i + 0.5)) / LOOK.ticksPerArm);
          const r = b * th;
          const c = Math.cos(th + offset);
          const sn = Math.sin(th + offset);
          ctx.moveTo(...rot((r - 6) * c, (r - 6) * sn));
          ctx.lineTo(...rot((r + 6) * c, (r + 6) * sn));
        }
      }
      ctx.stroke();

      // Dashed construction circle
      const A = LOOK.circFrac * rMax;
      const dashes = Math.max(8, Math.round((Math.PI * A) / 14));
      ctx.globalAlpha = LOOK.lineAlpha * instr;
      ctx.beginPath();
      for (let i = 0; i < dashes; i++) {
        const a0 = (i / dashes) * Math.PI * 2 + state.spin;
        ctx.moveTo(cx + A * Math.cos(a0), cy + A * Math.sin(a0));
        ctx.arc(cx, cy, A, a0, a0 + Math.PI / dashes);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const frame = (dt: number) => {
      state.time += dt;
      const t = state.time;
      const { arms, b, thetaBirth, thetaExit, slotsPerArm, cardN } = geo;

      // Intro choreography: a reveal wave rolls outward from the wordmark
      // while the conveyor arrives fast and settles into its drift
      const introT = reduceMotion ? 1 : (t - MOTION.introAt) / MOTION.introDur;
      const wave = easeOut(clamp01(introT));
      const burstK = reduceMotion
        ? 1
        : easeOut(clamp01((t - MOTION.introAt) / MOTION.burstDur));
      const burst = 1 + (MOTION.burstX - 1) * (1 - burstK);
      const instr = reduceMotion ? 1 : smoothstep(0, 1, (t - 0.15) / 1.2);
      const waveR = wave >= 1 ? 1e6 : wave * b * thetaExit;

      state.idleP += (dt * MOTION.idleSpeed * burst) / 60;
      state.spin +=
        ((dt * MOTION.spinDeg * Math.PI) / 180 / 60) * (1 - state.holdRest);
      const P = state.idleP + (window.scrollY * MOTION.scrub) / 1000;
      const dP = P - state.lastP;
      state.lastP = P;

      const hasTarget = state.target >= 0;
      state.holdTarget = ease(state.holdTarget, +hasTarget, dt, POINTER.holdTau);
      state.holdRest = ease(state.holdRest, +hasTarget, dt, POINTER.restTau);

      const cos = Math.cos(state.spin);
      const sin = Math.sin(state.spin);
      const cx = width / 2;
      const cy = height / 2;
      const roll = -MOTION.rollChunk * (1 - wave);

      // 1. Journey + position along the arms
      for (let i = 0; i < cardN; i++) {
        const arm = i % arms;
        const slot = Math.floor(i / arms);
        // A hovered tile brakes; everything else follows more slowly
        holdOffset[i] -=
          dP *
          (i === state.target
            ? Math.max(state.holdTarget, state.holdRest)
            : state.holdRest);
        const p = Math.max(
          0,
          fract((slot + 0.5 + arm * MOTION.armJitter) / slotsPerArm + P + holdOffset[i]) +
            roll,
        );
        // Wrapped back to the centre: hand it the least recently used logo
        if (!Number.isNaN(prevJourney[i]) && Math.abs(p - prevJourney[i]) > 0.5) {
          let best = 0;
          for (let l = 1; l < LOGOS.length; l++) {
            if (logoUse[l] < logoUse[best]) best = l;
          }
          setLogo(i, best);
        }
        prevJourney[i] = p;
        journey[i] = p;

        const th = thetaBirth + p * (thetaExit - thetaBirth);
        const r = b * th;
        const ang = th + (arm * Math.PI * 2) / arms;
        const c = Math.cos(ang);
        const s = Math.sin(ang);
        const amp =
          MOTION.wobblePx *
          (1 + (POINTER.holdWobble - 1) * state.holdRest) *
          (1 - held[i]);
        const m = Math.sin(t * MOTION.wobbleHz * Math.PI * 2 + 2.399 * i);
        const q = Math.cos(t * MOTION.wobbleHz * Math.PI * 1.4 + 1.713 * i);
        const lx = r * c + amp * (-m * s + 0.6 * q * c);
        const ly = r * s + amp * (m * c + 0.6 * q * s);
        // Spin the whole system; tiles themselves stay upright
        let x = cos * lx - sin * ly;
        let y = sin * lx + cos * ly;

        if (pointer.active) {
          const dx = pointer.x - cx - x;
          const dy = pointer.y - cy - y;
          const d2 = dx * dx + dy * dy;
          const k =
            (POINTER.tugPx * Math.exp(-d2 / (POINTER.fieldPx * POINTER.fieldPx)) *
              (1 - held[i])) /
            Math.max(1, Math.sqrt(d2));
          x += dx * k;
          y += dy * k;
        }
        posX[i] = x;
        posY[i] = y;
      }

      // 2. Pointer target: the outermost tile under the cursor
      let target = -1;
      if (pointer.active) {
        let best = -1;
        for (let i = 0; i < cardN; i++) {
          const half = (size[i] * (i === state.target ? POINTER.heldScale : 1)) / 2;
          if (journey[i] < 0.04 || half < 6) continue;
          if (
            Math.abs(pointer.x - cx - posX[i]) <= half &&
            Math.abs(pointer.y - cy - posY[i]) <= half &&
            journey[i] > best
          ) {
            best = journey[i];
            target = i;
          }
        }
      }
      state.target = target;

      // 3. Size against nearest neighbour, then paint
      const copyHalfW = Math.min(width * 0.46, 380);
      const copyHalfH = Math.min(height * 0.34, 270);
      for (let i = 0; i < cardN; i++) {
        const el = tiles[i];
        if (!el) continue;
        const p = journey[i];
        held[i] = ease(held[i], +(i === state.target), dt, 0.25);

        let nearest = Infinity;
        for (let j = 0; j < cardN; j++) {
          if (j === i) continue;
          const d = Math.max(
            Math.abs(posX[j] - posX[i]),
            Math.abs(posY[j] - posY[i]),
          );
          if (d < nearest) nearest = d;
        }
        const goal = Math.min(
          geo.cardCap * (LOOK.innerCap + (1 - LOOK.innerCap) * p),
          geo.density * nearest,
        );
        // Shrink immediately to stay collision-free, grow gently
        size[i] = goal < size[i] ? goal : ease(size[i], goal, dt, 1 / 3);

        const scale =
          (Math.max(0.001, size[i]) / BASE_PX) *
          (1 + (POINTER.heldScale - 1) * held[i]);
        const r = b * (thetaBirth + p * (thetaExit - thetaBirth));
        const reveal = clamp01((waveR - r) / MOTION.waveBand);
        // Dim tiles drifting behind the hero copy so the text stays readable
        const copyDist = Math.hypot(posX[i] / copyHalfW, posY[i] / copyHalfH);
        const copyDim =
          LOOK.copyDim + (1 - LOOK.copyDim) * smoothstep(0.75, 1.15, copyDist);
        const alpha =
          clamp01(p / LOOK.fadeBand) * reveal * Math.max(copyDim, held[i]);
        const blur =
          LOOK.blurPx *
          Math.max((1 - smoothstep(0, LOOK.blurEnd, p)) * (1 - held[i]), 1 - reveal);

        el.style.transform = `translate3d(${cx + posX[i] - BASE_PX / 2}px, ${
          cy + posY[i] - BASE_PX / 2
        }px, 0) scale(${scale})`;
        el.style.opacity = alpha.toFixed(3);
        el.style.filter = blur > 0.3 ? `blur(${blur.toFixed(2)}px)` : "";
        el.style.zIndex = String(10 + Math.round(100 * p) + Math.round(500 * held[i]));
        el.classList.toggle("is-held", held[i] > 0.5);
      }

      ctx.clearRect(0, 0, width, height);
      drawUnderlay(cx, cy, cos, sin, waveR, instr);
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;

    const loop = (now: number) => {
      frame(Math.min((now - last) / 1000, 0.05));
      last = now;
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf || reduceMotion || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    // Reduced motion: a single settled frame, redrawn only when needed
    const still = () => {
      size.fill(0);
      for (let k = 0; k < 30; k++) frame(0.05);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        e.pointerType === "mouse" &&
        pointer.y >= 0 &&
        pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onResize = () => {
      resize();
      if (reduceMotion) still();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    // Pause while the hero is scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(root);

    // Re-read colours when the site theme is toggled
    const mo = new MutationObserver(() => {
      readTheme();
      if (reduceMotion) still();
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    readTheme();
    resize();
    if (reduceMotion) still();
    else frame(0);
    start();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="hero-vortex" ref={rootRef} aria-hidden="true">
      <canvas className="hero-vortex__canvas" ref={canvasRef} />

      {Array.from({ length: MAX_CARDS }, (_, i) => (
        <div
          key={i}
          className="hero-vortex__tile"
          ref={(el) => {
            tileEls.current[i] = el;
          }}
        >
          <span className="hero-vortex__icon" />
          <span className="hero-vortex__label" />
        </div>
      ))}

      {/* Source icons, cloned into tiles as they are dealt new logos */}
      <div className="hero-vortex__sprites">
        {LOGOS.map(({ name, Icon }, i) => (
          <span
            key={name}
            ref={(el) => {
              spriteEls.current[i] = el;
            }}
          >
            <Icon />
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeroVortex;
