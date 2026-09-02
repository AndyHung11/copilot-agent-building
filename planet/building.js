/* =========================================================
   M365 Copilot Agent 遊樂園 — park view + zones, tech contrast
   Reuses ZONES / AGENTS from data.js
   ========================================================= */

(function () {
  "use strict";

  // Fail loudly instead of silently hanging on the loading spinner if the 3D
  // library never arrived (blocked network, bad deploy, missing vendor/ folder).
  if (typeof THREE === "undefined" || !THREE.OrbitControls || !THREE.Reflector) {
    const box = document.getElementById("loading");
    if (box) {
      const zh = /^zh\b/i.test((navigator.languages && navigator.languages[0]) || navigator.language || "");
      box.innerHTML = zh
        ? "<div style='max-width:460px;text-align:center;line-height:1.7'>" +
          "<div style='font-size:34px;margin-bottom:10px'>🎡</div>" +
          "<b>3D 元件載入失敗，園區開不了</b><br>" +
          "請重新整理頁面；若持續發生，可能是網路或 Proxy 擋掉了程式檔案。</div>"
        : "<div style='max-width:460px;text-align:center;line-height:1.7'>" +
          "<div style='font-size:34px;margin-bottom:10px'>🎡</div>" +
          "<b>The 3D engine failed to load, so the park can't open.</b><br>" +
          "Please refresh. If it keeps happening, your network or proxy may be blocking the script files.</div>";
    }
    return;
  }

  const canvas = document.getElementById("three-canvas");
  const tooltip = document.getElementById("tooltip");
  const esc = (s) => (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Language ----------
  // default follows the browser: any zh-* locale gets Chinese, everything else English
  const LANG_KEY = "copilotPlanetLang";
  function detectLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "zh" || saved === "en") return saved;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    return /^zh\b/i.test(nav) ? "zh" : "en";
  }
  let LANG = detectLang();
  const isEN = () => LANG === "en";
  const EN = (typeof AGENTS_EN !== "undefined") ? AGENTS_EN : {};

  // localized accessors — fall back to the Chinese source when English is missing
  const aName = (a) => (isEN() ? (a.ename || a.cname) : a.cname);
  const aSub = (a) => (isEN() ? a.cname : a.ename);
  const aTag = (a) => (isEN() && EN[a.id] && EN[a.id].tagline) ? EN[a.id].tagline : a.tagline;
  const aDesc = (a) => (isEN() && EN[a.id] && EN[a.id].description) ? EN[a.id].description : a.description;
  const aPains = (a) => (isEN() && EN[a.id] && EN[a.id].painPoints && EN[a.id].painPoints.length)
    ? EN[a.id].painPoints : (a.painPoints || []);
  const aSteps = (a) => (isEN() && EN[a.id] && EN[a.id].quickStart && EN[a.id].quickStart.length)
    ? EN[a.id].quickStart : (a.quickStart || []);
  const aExample = (a) => (isEN() && EN[a.id] && EN[a.id].example) ? EN[a.id].example : a.example;
  const zName = (z) => (isEN() ? (z.nameEn || z.name) : z.name);
  const zSub = (z) => (isEN() ? z.name : (z.nameEn || ""));
  // some source records pack several emoji into one field — show only the first glyph
  const oneEmoji = (s) => {
    const g = [...(s || "")].filter((c) => !/[\uFE0F\u200D\u2640\u2642]/.test(c));
    return g[0] || "🤖";
  };
  const aEmoji = (a) => oneEmoji(a.emoji);
  // taglines in the source often start with decorative sparkles — strip them
  const cleanTag = (s) => (s || "").replace(/^[\s✨🌟⭐️*]+/, "").trim();

  const UI = {
    zh: {
      brandT1: "M365 Copilot Agent 星球",
      brandT2: "Power of Copilot · {z} 座艙區 · {a} 位 AI 組員",
      btnExterior: "看軌道", btnAtrium: "回指揮核心", btnBack: "回指揮核心",
      sideTitle: "基地圖譜 · {z} 座艙區",
      hintText: "🖱️ 核心區：拖曳環顧·點艙區進入　·　艙內：拖曳轉動終端·點卡啟動",
      searchPh: "搜尋 Agent 名稱或關鍵字…",
      noMatch: "沒有符合的 Agent",
      licReq: "需 M365 Copilot 授權", licFree: "免授權即可使用",
      licReqShort: "需授權", licFreeShort: "免授權",
      tabRun: "▶ 啟動模擬", tabInfo: "痛點 · 上手 · 提示詞", tabEdm: "電子報原文",
      edmNote: "本 Agent 的「一分鐘小教室」電子報原文", edmOpen: "在新分頁開啟 ↗",
      simBadge: "⚠ 模擬示意 · 非真實執行結果", replay: "↻ 重新模擬",
      you: "你", secWhat: "這個 Agent 能幫你做什麼", secPain: "你可能正在經歷",
      secStart: "快速上手", secExample: "範例提示詞", copy: "複製", copied: "已複製 ✓",
      outLabel: "產出", structLabel: "產出結構", structTitle: "這個 Agent 的工作流程",
      structNote: "依官方 Agent 指示整理,實際產出內容依你的輸入而定。",
      footSim: "以上為<b>模擬示意</b>,用於說明這個 Agent 的對話方式與產出型態,非真實執行結果。內容不指涉特定真實企業,不含捏造的具體數據。",
      footStruct: "以上為依官方指示整理的<b>產出結構示意</b>,呈現這個 Agent 的工作流程與產出骨架,不含模擬內容。",
      swotS: "優勢 STRENGTHS", swotW: "劣勢 WEAKNESSES",
      swotO: "機會 OPPORTUNITIES", swotT: "威脅 THREATS",
      rkH: "高", rkM: "中", rkL: "低",
      cardSolves: "解決這些問題", cardSteps: (n) => n + " 步驟即可上手", cardCta: "▶  啟動模擬",
      pavEnter: "點擊進艙 ▸", agentsSuffix: "組員", backSign: "← 回指揮核心",
      plazaWelcome: "歡迎降落 Copilot Agent 星球", parkSign: "COPILOT AGENT 星球基地",
      deckSub: (n) => n + " 位 AI 組員", enterExp: "點此進艙",
    },
    en: {
      brandT1: "M365 Copilot Agent Planet",
      brandT2: "Power of Copilot · {z} domes · {a} AI crew",
      btnExterior: "Orbit view", btnAtrium: "Command core", btnBack: "Back to core",
      sideTitle: "Base map · {z} domes",
      hintText: "🖱️ Core: drag to look around · click a dome to enter　·　Inside: drag to spin consoles · click one to run",
      searchPh: "Search agents by name or keyword…",
      noMatch: "No matching agent",
      licReq: "Requires M365 Copilot license", licFree: "No add-on license needed",
      licReqShort: "License", licFreeShort: "Free",
      tabRun: "▶ Run simulation", tabInfo: "Pain points · Getting started · Prompts", tabEdm: "Newsletter",
      edmNote: "The original newsletter issue for this agent", edmOpen: "Open in new tab ↗",
      simBadge: "⚠ Illustrative simulation · not a real execution", replay: "↻ Run again",
      you: "You", secWhat: "What this agent does for you", secPain: "You might be experiencing",
      secStart: "Getting started", secExample: "Example prompts", copy: "Copy", copied: "Copied ✓",
      outLabel: "OUTPUT", structLabel: "STRUCTURE", structTitle: "How this agent works",
      structNote: "Compiled from the official agent instructions. Actual output depends on your input.",
      footSim: "The above is an <b>illustrative simulation</b> showing how this agent converses and what it produces. It is not a real execution, references no specific real company, and contains no fabricated figures.",
      footStruct: "The above is a <b>structural outline</b> compiled from the official instructions, showing the agent's workflow and output skeleton. It contains no simulated content.",
      swotS: "STRENGTHS", swotW: "WEAKNESSES",
      swotO: "OPPORTUNITIES", swotT: "THREATS",
      rkH: "HIGH", rkM: "MED", rkL: "LOW",
      cardSolves: "Solves these problems", cardSteps: (n) => n + " steps to get started", cardCta: "▶  Run simulation",
      pavEnter: "Click to dock ▸", agentsSuffix: "CREW", backSign: "← Command core",
      plazaWelcome: "Welcome to Copilot Agent Planet", parkSign: "COPILOT AGENT BASE",
      deckSub: (n) => n + " AI crew", enterExp: "Dock here",
    },
  };
  const T = (k) => UI[LANG][k];

  // ---------- Layout ----------
  const RADIUS = 30;
  const PLAZA_R = 11;
  const PAV_W = 13;
  const PAV_D = 11;
  const PAV_H_SCALE = 1;   // the rides are modelled at true proportions — no vertical stretch
  const SHELL_R = 48;
  const WALL_H = 26;
  const OFF = Math.PI / ZONES.length; // keep entrance (+Z) between two pavilions
  // the concourse target is pinned to the centre, so zooming in heads straight for the
  // carousel — the ride is tall and wide, so keep well clear of it
  const LOBBY_MIN_DIST = 40;

  const step = (Math.PI * 2) / ZONES.length;
  ZONES.forEach((z, i) => {
    const a = i * step - Math.PI / 2 + OFF;
    z.center = { x: RADIUS * Math.cos(a), z: RADIUS * Math.sin(a) };
    z.dir = { x: Math.cos(a), z: Math.sin(a) };
    z.index = i;
  });
  const zoneById = Object.fromEntries(ZONES.map((z) => [z.id, z]));

  const agentsByZone = {};
  AGENTS.forEach((a) => (agentsByZone[a.zone] = agentsByZone[a.zone] || []).push(a));
  const agentById = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

  // one-line scenario intro shown inside each department room
  const ZONE_DESC = {
    Z1: "洞察、分析、決策——讓 AI 陪你把每一步想清楚、講明白。",
    Z2: "從靈感到貼文，內容、創意、品牌聲音一次到位。",
    Z3: "打造健康、對齊、有溫度又高效的團隊。",
    Z4: "合規、審閱、把關，讓文件風險無所遁形。",
    Z5: "會前準備到會後摘要，溝通與紀錄一氣呵成。",
    Z6: "把想法變成可執行、可量測的營運與專案藍圖。",
    Z7: "從需求到產品，加速你的每一段創新旅程。",
    Z8: "學會用 AI、打造你專屬的 Agent 與提示詞。",
  };
  const ZONE_DESC_EN = {
    Z1: "Insight, analysis, decisions — think each step through and say it clearly.",
    Z2: "From spark to post: content, creative and brand voice in one place.",
    Z3: "Build teams that are healthy, aligned, human and highly effective.",
    Z4: "Compliance, review and guardrails — leave no document risk hidden.",
    Z5: "From pre-read to recap: communication and records in one flow.",
    Z6: "Turn ideas into executable, measurable operations and project plans.",
    Z7: "From requirement to product — accelerate every leg of the journey.",
    Z8: "Learn to work with AI and craft your own agents and prompts.",
  };
  const zDesc = (z) => (isEN() ? (ZONE_DESC_EN[z.id] || ZONE_DESC[z.id]) : ZONE_DESC[z.id]);

  const hexToRgba = (hex, al) => {
    const c = new THREE.Color(hex);
    return `rgba(${(c.r * 255) | 0},${(c.g * 255) | 0},${(c.b * 255) | 0},${al})`;
  };

  // scene mode + raycast context (swapped between lobby and department rooms)
  let mode = "lobby";
  let ctxAgents = null;   // set to clickAgents after they exist
  let ctxPortals = null;
  const roomLook = new THREE.Vector3();     // locked focus point while inside a room
  let roomMaxDist = 21;                     // max camera distance while inside a room

  // ---------- Renderer / scene / camera ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  // a bright, saturated park reads better without ACES filmic desaturation
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070f);
  scene.fog = new THREE.Fog(0x0a1020, 140, 320);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 600);
  const EXTERIOR = { pos: { x: 10, y: 34, z: SHELL_R + 78 }, look: { x: 0, y: 8, z: 0 } };
  // the core column and its holo array are tall — frame them from a little further back
  const INTERIOR = { pos: { x: 0, y: 25, z: 54 }, look: { x: 0, y: 8, z: 0 } };
  camera.position.set(12, 26, SHELL_R + 96);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;         // target is pinned to the atrium centre
  controls.enableZoom = false;        // replaced by custom zoom below
  controls.minDistance = LOBBY_MIN_DIST;
  controls.maxDistance = 105;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 8, 0);
  controls.update();

  // ---------- Lighting: a low, hard sun over the planet surface ----------
  scene.add(new THREE.HemisphereLight(0x5f78b8, 0x140f14, 0.42));
  scene.add(new THREE.AmbientLight(0x33415f, 0.24));
  const key = new THREE.DirectionalLight(0xfff0dd, 0.95);
  key.position.set(62, 40, 34);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1; key.shadow.camera.far = 300;
  key.shadow.camera.left = -110; key.shadow.camera.right = 110;
  key.shadow.camera.top = 110; key.shadow.camera.bottom = -110;
  key.shadow.bias = -0.0004;
  scene.add(key);
  // cool bounce from the planet's ring and atmosphere
  const rim = new THREE.DirectionalLight(0x5aa0ff, 0.4);
  rim.position.set(-52, 30, -58);
  scene.add(rim);

  // ---------- Deep space backdrop ----------
  (function () {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide, fog: false,
      uniforms: {
        top: { value: new THREE.Color(0x03050c) },
        mid: { value: new THREE.Color(0x0a1224) },
        bot: { value: new THREE.Color(0x2a1b33) },
      },
      vertexShader: "varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "varying vec3 p;uniform vec3 top;uniform vec3 mid;uniform vec3 bot;void main(){float h=normalize(p).y;vec3 c=h>0.0?mix(mid,top,smoothstep(0.0,0.6,h)):mix(mid,bot,smoothstep(0.0,-0.35,h));gl_FragColor=vec4(c,1.0);}",
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(280, 32, 20), mat));
  })();

  // ---------- Starfield ----------
  (function () {
    const n = 1600, pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 210 + Math.random() * 55;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = Math.abs(r * Math.cos(ph)) * 0.9 + 10;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      // a few stars run warm, most are blue-white
      const w = Math.random();
      col[i * 3] = w > 0.9 ? 1.0 : 0.72 + Math.random() * 0.28;
      col[i * 3 + 1] = 0.78 + Math.random() * 0.22;
      col[i * 3 + 2] = 1.0;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({
      size: 1.1, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false })));
  })();

  // ---------- A ringed gas giant low on the horizon ----------
  (function () {
    const grp = new THREE.Group();
    grp.position.set(-120, 62, -175);
    scene.add(grp);
    // banded body, drawn on a canvas so the stripes read at distance
    const cv = document.createElement("canvas"); cv.width = 8; cv.height = 128;
    const c = cv.getContext("2d");
    const bands = ["#c9a583", "#e0c3a1", "#a8825f", "#d9b58f", "#8f6b4d", "#cfa87f"];
    for (let i = 0; i < 22; i++) {
      c.fillStyle = bands[i % bands.length];
      c.fillRect(0, i * (128 / 22), 8, 128 / 22 + 1);
    }
    const bodyTex = new THREE.CanvasTexture(cv);
    bodyTex.encoding = THREE.sRGBEncoding;
    const body = new THREE.Mesh(new THREE.SphereGeometry(26, 40, 28),
      new THREE.MeshStandardMaterial({ map: bodyTex, roughness: 1, metalness: 0, fog: false }));
    body.rotation.z = 0.22;
    grp.add(body);
    // ring system
    [[34, 46, 0.34], [48, 55, 0.2]].forEach(([r0, r1, op]) => {
      const ring = new THREE.Mesh(new THREE.RingGeometry(r0, r1, 96),
        new THREE.MeshBasicMaterial({ color: 0xd8c3a5, transparent: true, opacity: op,
          side: THREE.DoubleSide, depthWrite: false, fog: false }));
      ring.rotation.x = Math.PI / 2 - 0.38;
      ring.rotation.z = 0.22;
      grp.add(ring);
    });
    // a small moon
    const moon = new THREE.Mesh(new THREE.SphereGeometry(4.6, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0x9aa2b4, roughness: 1, fog: false }));
    moon.position.set(52, -18, 22);
    grp.add(moon);
  })();

  // clouds are a park thing — kept empty so the shared animate loop is unchanged
  const clouds = [];

  // ---------- Planet surface: rocky regolith with craters and dust ----------
  (function () {
    const ground = new THREE.Mesh(new THREE.CircleGeometry(240, 84),
      new THREE.MeshStandardMaterial({ color: 0x4a3a3f, roughness: 1, metalness: 0.05 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.1; ground.receiveShadow = true;
    scene.add(ground);

    // scattered craters beyond the base
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = SHELL_R + 18 + Math.random() * 140;
      const rad = 4 + Math.random() * 13;
      const rim = new THREE.Mesh(new THREE.RingGeometry(rad * 0.72, rad, 26),
        new THREE.MeshStandardMaterial({ color: 0x5d4a4e, roughness: 1 }));
      rim.rotation.x = -Math.PI / 2;
      rim.position.set(Math.cos(a) * r, -0.06, Math.sin(a) * r);
      scene.add(rim);
      const bowl = new THREE.Mesh(new THREE.CircleGeometry(rad * 0.72, 24),
        new THREE.MeshStandardMaterial({ color: 0x352a2e, roughness: 1 }));
      bowl.rotation.x = -Math.PI / 2;
      bowl.position.set(Math.cos(a) * r, -0.07, Math.sin(a) * r);
      scene.add(bowl);
    }

    // boulders breaking up the horizon
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = SHELL_R + 14 + Math.random() * 150;
      const s = 1.2 + Math.random() * 4.2;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0),
        new THREE.MeshStandardMaterial({ color: 0x594549, roughness: 1, flatShading: true }));
      rock.position.set(Math.cos(a) * r, s * 0.45, Math.sin(a) * r);
      rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      rock.castShadow = true;
      scene.add(rock);
    }
  })();



  // ---------- Real M365 Copilot logo texture ----------
  const logoTex = new THREE.TextureLoader().load("copilot-logo.png");
  logoTex.encoding = THREE.sRGBEncoding;

  // ---------- Clickable registries ----------
  const clickAgents = [];
  const clickPortals = [];
  const kiosks = [];

  // ---------- Canvas texture helpers ----------
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function wrapText(ctx, text, x, y, maxW, lh, maxLines) {
    const chars = (text || "").split("");
    const lines = [];
    let line = "", truncated = false;
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (line && ctx.measureText(line + ch).width > maxW) {
        lines.push(line);
        line = ch;
        if (lines.length === maxLines) { truncated = true; line = ""; break; }
      } else line += ch;
    }
    if (line) lines.push(line);
    if (truncated && lines.length) {
      let last = lines[lines.length - 1];
      while (ctx.measureText(last + "…").width > maxW && last.length) last = last.slice(0, -1);
      lines[lines.length - 1] = last + "…";
    }
    lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
    return lines.length;
  }
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  function canvasTex(cv) {
    const t = new THREE.CanvasTexture(cv);
    t.anisotropy = maxAniso;
    t.encoding = THREE.sRGBEncoding;
    t.minFilter = THREE.LinearMipmapLinearFilter;  // crisp at distance, no shimmer
    t.magFilter = THREE.LinearFilter;              // smooth when viewed up close
    t.generateMipmaps = true;
    return t;
  }

  // Clean centered department typography — no plate, no frame, no badge.
  // Reads like architectural signage lettering floating in the pavilion.
  function signTexture(zone) {
    const W = 1024, H = 430, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const SAFE = W - 56;
    // shrink a font until the text fits the available width
    const fit = (text, weight, size, maxW, family) => {
      let s = size;
      const fam = family || "'Segoe UI', sans-serif";
      ctx.font = `${weight} ${s}px ${fam}`;
      while (s > 12 && ctx.measureText(text).width > maxW) {
        s -= 2; ctx.font = `${weight} ${s}px ${fam}`;
      }
      return s;
    };
    // draw text with letter tracking, auto-reducing tracking (then size) to fit
    const tracked = (text, weight, size, track, y, maxW) => {
      let s = size, tr = track;
      const measure = () => {
        ctx.font = `${weight} ${s}px 'Segoe UI', sans-serif`;
        return ctx.measureText(text).width + tr * Math.max(0, text.length - 1);
      };
      while (measure() > maxW && tr > 0) tr -= 0.5;
      while (measure() > maxW && s > 12) s -= 2;
      const total = measure();
      let x = W / 2 - total / 2;
      ctx.textAlign = "left";
      for (const ch of text) {
        ctx.fillText(ch, x, y);
        x += ctx.measureText(ch).width + tr;
      }
      ctx.textAlign = "center";
    };
    // dome designation — luminous lettering that reads against the night sky
    fit(zName(zone), 300, 132, SAFE, "'Segoe UI', sans-serif");
    ctx.shadowColor = hexToRgba(zone.color, 0.95);
    ctx.shadowBlur = 36;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(zName(zone), W / 2, 128);
    ctx.fillText(zName(zone), W / 2, 128);
    ctx.shadowBlur = 0;
    // thin rule in the dome colour
    ctx.strokeStyle = hexToRgba(zone.color, 0.95);
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(W / 2 - 170, 220); ctx.lineTo(W / 2 + 170, 220); ctx.stroke();
    // secondary name — big, with tracking that yields before the type size does
    ctx.fillStyle = hexToRgba(zone.color, 1);
    tracked((zSub(zone) || "").toUpperCase(), 700, 60, 9, 286, SAFE);
    // crew complement
    ctx.fillStyle = "rgba(216,244,255,0.94)";
    tracked(zone.count + " " + T("agentsSuffix"), 800, 56, 5, 370, SAFE);
    return canvasTex(cv);
  }

  function kioskTexture(agent, zone) {
    // render at 2x for crisp text when the card is viewed up close in 3D
    const S = 2, W = 620, H = 800, cv = document.createElement("canvas");
    cv.width = W * S; cv.height = H * S;
    const ctx = cv.getContext("2d");
    ctx.scale(S, S);
    // card body
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 8, 8, W - 16, H - 16, 40); ctx.fill();
    // top color band with the department name
    ctx.fillStyle = zone.color;
    roundRect(ctx, 8, 8, W - 16, 104, 40); ctx.fill();
    ctx.fillRect(8, 72, W - 16, 40);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "700 30px 'Segoe UI', sans-serif";
    ctx.textAlign = "left"; ctx.textBaseline = "middle";
    ctx.fillText(zName(zone), 40, 62);
    // license pill, right side of the band
    const licTxt = agent.license === "required" ? T("licReqShort") : T("licFreeShort");
    ctx.font = "700 22px 'Segoe UI', sans-serif";
    const lw = ctx.measureText(licTxt).width + 40;
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    roundRect(ctx, W - 40 - lw, 40, lw, 44, 22); ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(licTxt, W - 40 - lw / 2, 63);

    // agent name — the hero element, generous size and line spacing
    ctx.fillStyle = "#12192b";
    ctx.font = "800 46px 'Segoe UI', sans-serif";
    ctx.textAlign = "center";
    const nameLines = wrapText(ctx, aName(agent), W / 2, 182, W - 90, 56, 2);
    // secondary name
    const enY = 182 + (nameLines > 1 ? 56 : 0) + 48;
    ctx.fillStyle = "#7b869c";
    ctx.font = "600 24px 'Segoe UI', sans-serif";
    ctx.fillText(aSub(agent) || "", W / 2, enY);
    // divider
    ctx.strokeStyle = hexToRgba(zone.color, 0.35);
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W / 2 - 70, enY + 38); ctx.lineTo(W / 2 + 70, enY + 38); ctx.stroke();
    // tagline / what it does
    ctx.fillStyle = "#3c465c";
    ctx.font = "500 28px 'Segoe UI', sans-serif";
    const tagY = enY + 86;
    const tagLines = wrapText(ctx, cleanTag(aTag(agent)), W / 2, tagY, W - 96, 40, 3);

    // ---- pain points: fills the empty middle and shows what it solves ----
    let y = tagY + tagLines * 40 + 30;
    const roomLeft = (H - 128) - y;                  // vertical space before the CTA
    const maxPains = Math.max(0, Math.min(3, Math.floor((roomLeft - 34) / 70)));
    const pains = aPains(agent).slice(0, maxPains);
    if (pains.length) {
      ctx.fillStyle = "#8c97ab";
      ctx.font = "800 21px 'Segoe UI', sans-serif";
      ctx.fillText(T("cardSolves"), W / 2, y);
      y += 34;
      ctx.textAlign = "left";
      pains.forEach((p) => {
        const boxY = y - 4;
        ctx.fillStyle = hexToRgba(zone.color, 0.09);
        roundRect(ctx, 40, boxY, W - 80, 60, 15); ctx.fill();
        // colored bullet
        ctx.fillStyle = zone.color;
        ctx.beginPath(); ctx.arc(64, boxY + 30, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#3f4a5f";
        ctx.font = "600 24px 'Segoe UI', sans-serif";
        // single line, ellipsised to fit
        let s = p;
        while (ctx.measureText(s + "…").width > W - 130 && s.length) s = s.slice(0, -1);
        ctx.fillText(s.length < p.length ? s + "…" : s, 84, boxY + 31);
        y += 70;
      });
      ctx.textAlign = "center";
    }

    // ---- step count chip (only if it fits above the CTA) ----
    const nSteps = aSteps(agent).length;
    if (nSteps && y + 48 < H - 128) {
      const chip = T("cardSteps")(nSteps);
      ctx.font = "700 23px 'Segoe UI', sans-serif";
      const cw = ctx.measureText(chip).width + 48;
      ctx.fillStyle = "#eef1f6";
      roundRect(ctx, W / 2 - cw / 2, y + 2, cw, 46, 23); ctx.fill();
      ctx.fillStyle = "#5d6880";
      ctx.fillText(chip, W / 2, y + 26);
    }

    // call-to-action
    ctx.fillStyle = hexToRgba(zone.color, 0.14);
    roundRect(ctx, W / 2 - 132, H - 110, 264, 66, 33); ctx.fill();
    ctx.fillStyle = zone.color;
    ctx.font = "700 27px 'Segoe UI', sans-serif";
    ctx.fillText(T("cardCta"), W / 2, H - 75);
    return canvasTex(cv);
  }

  function textTexture(text, W, H, font, color, glow) {
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    ctx.font = font; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = 22; }
    ctx.fillStyle = color;
    ctx.fillText(text, W / 2, H / 2);
    return canvasTex(cv);
  }

  // big room back-wall header: icon + zh name + EN + one-line scenario
  function roomHeaderTexture(zone) {
    const W = 1200, H = 420, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    // a dark board behind the text, matching the module's bulkhead panels
    ctx.fillStyle = "rgba(10,16,30,0.92)";
    roundRect(ctx, 8, 8, W - 16, H - 16, 20); ctx.fill();
    ctx.lineWidth = 7; ctx.strokeStyle = hexToRgba(zone.color, 1);
    roundRect(ctx, 8, 8, W - 16, H - 16, 20); ctx.stroke();
    // icon disc
    ctx.fillStyle = hexToRgba(zone.color, 0.26);
    ctx.beginPath(); ctx.arc(150, 150, 96, 0, Math.PI * 2); ctx.fill();
    ctx.font = "120px 'Segoe UI Emoji', sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(zone.icon, 150, 158);
    // name
    ctx.textAlign = "left";
    ctx.save(); ctx.shadowColor = hexToRgba(zone.color, 0.85); ctx.shadowBlur = 24;
    ctx.fillStyle = "#eaf6ff";
    ctx.font = "800 92px 'Segoe UI', sans-serif";
    ctx.fillText(zName(zone), 290, 118);
    ctx.restore();
    ctx.fillStyle = hexToRgba(zone.color, 1);
    ctx.font = "600 40px 'Segoe UI', sans-serif";
    ctx.fillText((zSub(zone) || "").toUpperCase() + "  ·  " + T("deckSub")(zone.count), 294, 188);
    // scenario description
    ctx.fillStyle = "#a8bad4";
    ctx.font = "40px 'Segoe UI', sans-serif";
    wrapText(ctx, zDesc(zone) || "", 290 + 0, 280, W - 340, 54, 2);
    return canvasTex(cv);
  }

  // ---------- Base perimeter: shield pylons + energy curtain, and the airlock gate ----------
  const ENTRANCE_HALF = 0.28; // radians of the entrance gap half-width (around +Z)
  const shellGroup = new THREE.Group();
  scene.add(shellGroup);
  const wallStruct = new THREE.Group(); // kept for compatibility with the lobby camera logic
  shellGroup.add(wallStruct);
  function shellAdd(o) { shellGroup.add(o); }
  buildShellReal();

  function buildShellReal() {
    const pylonCount = 30;
    const pylonAng = (Math.PI * 2) / pylonCount;
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xb9c3d4, metalness: 0.65, roughness: 0.38 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x232c40, metalness: 0.55, roughness: 0.5 });
    const glowCyan = new THREE.MeshBasicMaterial({ color: 0x59e0ff });
    const PYLON_H = 6.2;

    const pts = [];
    for (let i = 0; i < pylonCount; i++) {
      const a = i * pylonAng + Math.PI / 2;
      const da = Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2));
      if (Math.abs(da) < ENTRANCE_HALF) { pts.push(null); continue; }
      const x = Math.cos(a) * SHELL_R, z = Math.sin(a) * SHELL_R;
      // tapered pylon with a lit emitter head
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.95, 1.1, 8), darkMat);
      base.position.set(x, 0.55, z); base.castShadow = true;
      shellAdd(base);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.45, PYLON_H, 8), hullMat);
      shaft.position.set(x, PYLON_H / 2 + 1.0, z); shaft.castShadow = true;
      shellAdd(shaft);
      const head = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), glowCyan);
      head.position.set(x, PYLON_H + 1.5, z);
      shellAdd(head);
      pts.push(new THREE.Vector3(x, PYLON_H + 1.5, z));
    }

    // energy curtain: translucent panels strung between the pylon heads
    for (let i = 0; i < pylonCount; i++) {
      const p0 = pts[i], p1 = pts[(i + 1) % pylonCount];
      if (!p0 || !p1) continue;
      const mid = new THREE.Vector3().lerpVectors(p0, p1, 0.5);
      const len = p0.distanceTo(p1);
      const field = new THREE.Mesh(new THREE.PlaneGeometry(len, PYLON_H + 1.0),
        new THREE.MeshBasicMaterial({ color: 0x2f9fd8, transparent: true, opacity: 0.13,
          side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
      field.position.set(mid.x, (PYLON_H + 1.5) / 2 + 0.6, mid.z);
      field.lookAt(0, (PYLON_H + 1.5) / 2 + 0.6, 0);
      shellAdd(field);
      // hard light line along the top of the curtain
      const beam = new THREE.Mesh(new THREE.BoxGeometry(len, 0.09, 0.09), glowCyan);
      beam.position.set(mid.x, PYLON_H + 1.5, mid.z);
      beam.rotation.y = -Math.atan2(p1.z - p0.z, p1.x - p0.x);
      shellAdd(beam);
    }

    // landing-pad kerb ring
    const kerb = new THREE.Mesh(
      new THREE.CylinderGeometry(SHELL_R + 0.6, SHELL_R + 1.4, 0.9, pylonCount * 2, 1, true), darkMat);
    kerb.position.y = 0.45;
    shellAdd(kerb);

    // ---------- Airlock gate ----------
    const ex = 0, ez = SHELL_R;
    const GATE_H = 13.5, GATE_HALF = 10;
    // two docking towers
    [-GATE_HALF, GATE_HALF].forEach((px) => {
      const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 2.1, GATE_H, 12), hullMat);
      tower.position.set(ex + px, GATE_H / 2, ez + 1.2); tower.castShadow = true;
      shellAdd(tower);
      // stacked hull rings
      for (let s = 0; s < 6; s++) {
        const band = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.14, 8, 20), darkMat);
        band.rotation.x = Math.PI / 2;
        band.position.set(ex + px, 1.4 + s * 2.1, ez + 1.2);
        shellAdd(band);
      }
      // running lights up the tower
      for (let s = 0; s < 4; s++) {
        const lite = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), glowCyan);
        lite.position.set(ex + px + (px > 0 ? -1.75 : 1.75), 3 + s * 3, ez + 1.2);
        shellAdd(lite);
      }
      const cap = new THREE.Mesh(new THREE.ConeGeometry(2.3, 2.4, 12), darkMat);
      cap.position.set(ex + px, GATE_H + 1.2, ez + 1.2); cap.castShadow = true;
      shellAdd(cap);
      const beaconL = new THREE.Mesh(new THREE.SphereGeometry(0.45, 10, 8),
        new THREE.MeshBasicMaterial({ color: 0xff5d5d }));
      beaconL.position.set(ex + px, GATE_H + 2.7, ez + 1.2);
      shellAdd(beaconL);
    });
    // docking ring spanning the towers
    const span = new THREE.Mesh(new THREE.TorusGeometry(GATE_HALF, 0.75, 12, 44, Math.PI), hullMat);
    span.position.set(ex, GATE_H - 1.4, ez + 1.2); span.castShadow = true;
    shellAdd(span);
    const spanGlow = new THREE.Mesh(new THREE.TorusGeometry(GATE_HALF, 0.2, 10, 44, Math.PI), glowCyan);
    spanGlow.position.set(ex, GATE_H - 1.4, ez + 2.0);
    shellAdd(spanGlow);

    // approach apron with guidance chevrons
    const apron = new THREE.Mesh(new THREE.PlaneGeometry(22, 14),
      new THREE.MeshStandardMaterial({ color: 0x1f2839, roughness: 0.85, metalness: 0.2 }));
    apron.rotation.x = -Math.PI / 2; apron.position.set(ex, 0.02, ez + 5); apron.receiveShadow = true;
    shellAdd(apron);
    for (let i = 0; i < 4; i++) {
      const ch = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x59e0ff, transparent: true, opacity: 0.55 }));
      ch.rotation.x = -Math.PI / 2;
      ch.position.set(ex, 0.05, ez + 2.2 + i * 2.4);
      shellAdd(ch);
    }

    // Copilot logo above the gate (real PNG)
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 7.2),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
    logo.position.set(ex, GATE_H + 4.6, ez + 1.9);
    shellAdd(logo);
    // base designation across the docking ring
    const nameTex = textTexture(T("parkSign"), 1120, 150, "800 76px 'Segoe UI'", "#d8f4ff", "#2f9fd8");
    const nameP = new THREE.Mesh(new THREE.PlaneGeometry(18, 2.5),
      new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    nameP.position.set(ex, GATE_H - 4.6, ez + 2.2);
    shellAdd(nameP);
    shellGroup.userData.nameP = nameP;
    const eL = new THREE.PointLight(0x59e0ff, 0.8, 52); eL.position.set(ex, 11, ez + 6); shellAdd(eL);
  }

  // ---------- Landing-pad deck ----------
  (function () {
    const geo = new THREE.CircleGeometry(SHELL_R - 1.5, 96);
    const floor = new THREE.Mesh(geo,
      new THREE.MeshStandardMaterial({ color: 0x232c40, roughness: 0.55, metalness: 0.45 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = 0.01; floor.receiveShadow = true;
    scene.add(floor);
    // concentric guidance rings
    for (let r = 16; r <= SHELL_R - 3; r += 11) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.11, r + 0.11, 100),
        new THREE.MeshBasicMaterial({ color: 0x2f9fd8, transparent: true, opacity: 0.5 }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.05;
      scene.add(ring);
    }
    // hazard hatching around the outer edge
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const t = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 3.2),
        new THREE.MeshBasicMaterial({ color: i % 2 ? 0x59e0ff : 0x1b2437,
          transparent: true, opacity: 0.5 }));
      t.rotation.x = -Math.PI / 2; t.rotation.z = -a;
      t.position.set(Math.cos(a) * (SHELL_R - 4), 0.06, Math.sin(a) * (SHELL_R - 4));
      scene.add(t);
    }
  })();



  // ---------- Command core: the base's reactor and holo array ----------
  const plazaGroup = new THREE.Group();
  scene.add(plazaGroup);
  {
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xb9c3d4, metalness: 0.68, roughness: 0.34 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e2637, metalness: 0.6, roughness: 0.45 });
    const glowCyan = new THREE.MeshBasicMaterial({ color: 0x59e0ff });

    // tiered reactor housing
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(PLAZA_R, PLAZA_R + 0.8, 0.7, 48), darkMat);
    disc.position.y = 0.35; disc.receiveShadow = true;
    plazaGroup.add(disc);
    const deck = new THREE.Mesh(new THREE.CylinderGeometry(PLAZA_R - 2.0, PLAZA_R - 1.4, 0.6, 40), hullMat);
    deck.position.y = 0.95; deck.receiveShadow = true;
    plazaGroup.add(deck);
    const trim = new THREE.Mesh(new THREE.TorusGeometry(PLAZA_R - 2.0, 0.16, 12, 72), glowCyan);
    trim.rotation.x = Math.PI / 2; trim.position.y = 1.25;
    plazaGroup.add(trim);
    // radial vent slots around the housing
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const vent = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 0.35), darkMat);
      vent.position.set(Math.cos(a) * (PLAZA_R - 0.9), 0.85, Math.sin(a) * (PLAZA_R - 0.9));
      vent.rotation.y = -a;
      plazaGroup.add(vent);
    }

    // reactor column
    const col = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.9, 7.2, 16), hullMat);
    col.position.y = 4.8; col.castShadow = true;
    plazaGroup.add(col);
    for (let s = 0; s < 5; s++) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.13, 8, 24), glowCyan);
      band.rotation.x = Math.PI / 2; band.position.y = 2.2 + s * 1.5;
      plazaGroup.add(band);
    }
    // containment cage around the core
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.28, 8.6, 0.28), hullMat);
      strut.position.set(Math.cos(a) * 3.1, 5.0, Math.sin(a) * 3.1);
      strut.castShadow = true;
      plazaGroup.add(strut);
    }
    const cageTop = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.22, 10, 40), hullMat);
    cageTop.rotation.x = Math.PI / 2; cageTop.position.y = 9.3;
    plazaGroup.add(cageTop);

    // the holo array turns as one piece — four projector panes above the core
    const ride = new THREE.Group();
    ride.position.y = 10.6;
    plazaGroup.add(ride);
    plazaGroup.userData.ride = ride;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      // no opaque backing plate — a solid frame just reads as a grey slab through
      // the translucent pane. A thin glowing border sells the hologram far better.
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 2.8),
        new THREE.MeshBasicMaterial({ color: 0x59e0ff, transparent: true, opacity: 0.34,
          side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
      pane.position.set(Math.sin(a) * 3.13, 0, Math.cos(a) * 3.13);
      pane.rotation.y = a;
      ride.add(pane);
      // luminous edge around the pane
      [[0, 1.45], [0, -1.45]].forEach(([, dy]) => {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.09, 0.09), glowCyan);
        edge.position.set(Math.sin(a) * 3.13, dy, Math.cos(a) * 3.13);
        edge.rotation.y = a;
        ride.add(edge);
      });
      [-2.55, 2.55].forEach((dx) => {
        const edge = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.9, 0.09), glowCyan);
        edge.position.set(Math.sin(a) * 3.13 + Math.cos(a) * dx, 0,
                          Math.cos(a) * 3.13 - Math.sin(a) * dx);
        edge.rotation.y = a;
        ride.add(edge);
      });
      // scan lines across each pane
      for (let k = 0; k < 5; k++) {
        const ln = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 0.06),
          new THREE.MeshBasicMaterial({ color: 0x9beeff, transparent: true, opacity: 0.6,
            depthWrite: false }));
        ln.position.set(Math.sin(a) * 3.16, -1.1 + k * 0.55, Math.cos(a) * 3.16);
        ln.rotation.y = a;
        ride.add(ln);
      }
    }

    // energy core: a glowing sphere in a halo
    const orb = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 18),
      new THREE.MeshBasicMaterial({ color: 0x9beeff }));
    orb.position.y = 10.6;
    plazaGroup.add(orb);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(2.3, 20, 16),
      new THREE.MeshBasicMaterial({ color: 0x59e0ff, transparent: true, opacity: 0.2,
        blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.y = 10.6;
    plazaGroup.add(halo);

    // Copilot logo suspended above the core, back-to-back so it reads all round
    const emblem = new THREE.Group();
    emblem.position.y = 16.6;
    const SZ = 5.6;
    const front = new THREE.Mesh(new THREE.PlaneGeometry(SZ, SZ),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, depthWrite: false }));
    front.position.z = 0.04;
    emblem.add(front);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(SZ, SZ),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, depthWrite: false }));
    back.position.z = -0.04; back.rotation.y = Math.PI;
    emblem.add(back);
    plazaGroup.add(emblem);
    plazaGroup.userData.emblem = emblem;
    // no ride mounts on a reactor; keep the key so the shared animate loop is happy
    plazaGroup.userData.mounts = [];

    const eLight = new THREE.PointLight(0x59e0ff, 1.5, 60); eLight.position.y = 10.6; plazaGroup.add(eLight);

    const titleTex = textTexture(T("plazaWelcome"), 1180, 112, "800 52px 'Segoe UI'", "#d8f4ff", "#2f9fd8");
    const title = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.33), new THREE.MeshBasicMaterial({ map: titleTex, transparent: true }));
    title.rotation.x = -Math.PI / 2; title.position.set(0, 0.75, PLAZA_R + 3.4);
    plazaGroup.add(title);
    plazaGroup.userData.title = title;
  }



  // ---------- Kiosk builder ----------
  function buildKiosk(agent, zone) {
    const grp = new THREE.Group();
    const standMat = new THREE.MeshStandardMaterial({ color: 0x24304a, metalness: 0.5, roughness: 0.4 });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.14, 24), standMat);
    base.position.y = 0.07; base.castShadow = true;
    grp.add(base);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.44, 0.56, 30),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.15;
    grp.add(ring);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.05, 10), standMat);
    pole.position.y = 0.66;
    grp.add(pole);
    const baseY = 1.85;
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.92),
      new THREE.MeshBasicMaterial({ map: kioskTexture(agent, zone), transparent: true }));
    panel.position.y = baseY;
    grp.add(panel);
    const backing = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.92, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0.05 }));
    backing.position.set(0, baseY, -0.035); backing.castShadow = true;
    grp.add(backing);
    grp.userData.panel = panel;
    grp.userData.baseY = baseY;
    return grp;
  }

  // ---------- Floating glass card (3D agent display inside a room) ----------
  function buildFloatingCard(agent, zone) {
    const grp = new THREE.Group();
    const CW = 4.6, CH = 5.94;   // matches the 620x800 texture aspect
    const tex = kioskTexture(agent, zone);

    // spinner: the part that rotates (glass + both faces + frame + hit box)
    const spinner = new THREE.Group();
    grp.add(spinner);

    const glass = new THREE.Mesh(new THREE.PlaneGeometry(CW, CH),
      new THREE.MeshStandardMaterial({
        color: 0x14223e, metalness: 0.3, roughness: 0.28,
        transparent: true, opacity: 0.72, side: THREE.DoubleSide,
      }));
    spinner.add(glass);
    // printed face on BOTH sides so it's readable while spinning
    const faceFront = new THREE.Mesh(new THREE.PlaneGeometry(CW - 0.3, CH - 0.3),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    faceFront.position.z = 0.03;
    spinner.add(faceFront);
    const faceBack = new THREE.Mesh(new THREE.PlaneGeometry(CW - 0.3, CH - 0.3),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    faceBack.position.z = -0.03; faceBack.rotation.y = Math.PI;
    spinner.add(faceBack);
    // glowing colored frame (thin box outline via 4 bars)
    const fMat = new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
    const bar = (w, h, x, y) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), fMat);
      m.position.set(x, y, 0.04); spinner.add(m);
    };
    bar(CW, 0.075, 0, CH / 2 - 0.038);
    bar(CW, 0.075, 0, -CH / 2 + 0.038);
    bar(0.075, CH, -CW / 2 + 0.038, 0);
    bar(0.075, CH, CW / 2 - 0.038, 0);
    // invisible hit box (has volume → clickable at any spin angle)
    const hit = new THREE.Mesh(new THREE.BoxGeometry(CW, CH, 0.5),
      new THREE.MeshBasicMaterial({ visible: false }));
    spinner.add(hit);

    // fixed (non-spinning) ambience: halo, tether, floor spot
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(CW + 1.5, CH + 1.5),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.12,
        blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.z = -0.3;
    grp.add(halo);
    grp.userData.halo = halo;
    const tether = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.2, 6),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.25 }));
    tether.position.y = -CH / 2 - 1.1;
    grp.add(tether);
    const spot = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.8, 28),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
    spot.rotation.x = -Math.PI / 2; spot.position.y = -CH / 2 - 2.17;
    grp.add(spot);

    grp.userData.hit = hit;
    grp.userData.spinner = spinner;
    return grp;
  }

  // ---------- Exit gateway inside a room (returns to lobby) ----------
  function buildExitGate() {
    const grp = new THREE.Group();
    const col = 0x6fa8ff;
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x24304a, metalness: 0.6, roughness: 0.35,
      emissive: new THREE.Color(col), emissiveIntensity: 0.25 });
    const glowMat = new THREE.MeshBasicMaterial({ color: col });
    [-1, 1].forEach((s) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.2, 0.4), frameMat);
      p.position.set(s * 1.5, 2.1, 0); p.castShadow = true;
      grp.add(p);
    });
    const beam = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.35, 0.4), frameMat);
    beam.position.set(0, 4.15, 0);
    grp.add(beam);
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.08), glowMat);
    strip.position.set(0, 3.95, 0.22);
    grp.add(strip);
    // portal shimmer
    const portal = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.9),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.14,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    portal.position.set(0, 2.1, 0);
    grp.add(portal);
    // sign
    const signTex = textTexture(T("backSign"), 420, 120, "700 56px 'Segoe UI'", "#eaf2ff", "#4f7cff");
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.86),
      new THREE.MeshBasicMaterial({ map: signTex, transparent: true }));
    sign.position.set(0, 4.85, 0.1);
    grp.add(sign);
    // floor glow mat
    const matGlow = new THREE.Mesh(new THREE.CircleGeometry(1.7, 28),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22 }));
    matGlow.rotation.x = -Math.PI / 2; matGlow.position.y = 0.03;
    grp.add(matGlow);
    const el = new THREE.PointLight(col, 0.6, 14); el.position.set(0, 3, 1); grp.add(el);
    // generous invisible hit box covering the whole gateway (easy to click)
    const hit = new THREE.Mesh(new THREE.BoxGeometry(4.2, 5.6, 1.2),
      new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(0, 2.8, 0.1);
    grp.add(hit);
    grp.userData.hit = hit;
    return grp;
  }

  // ---------- Department体驗館 (glass storefront pavilions) ----------
  const zoneGroups = [];
  const pavHi = [];   // per-pavilion hover-highlight references
  ZONES.forEach((zone) => {
    const g = new THREE.Group();
    g.position.set(zone.center.x, 0, zone.center.z);
    g.rotation.y = Math.atan2(-zone.dir.x, -zone.dir.z);
    g.scale.set(1, PAV_H_SCALE, 1);
    scene.add(g);
    zoneGroups.push({ zone, group: g });
    // un-stretched child layer: anything with text goes here so the pavilion's vertical
    // scale never distorts type. Inside gUp, y values are real world units.
    const gUp = new THREE.Group();
    gUp.scale.set(1, 1 / PAV_H_SCALE, 1);
    g.add(gUp);

    // ---------- Dome build: a geodesic habitat module per crew section ----------
    const zc = new THREE.Color(zone.color);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x222b3e, roughness: 0.6, metalness: 0.4 });
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xb9c3d4, metalness: 0.66, roughness: 0.36 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1b2334, metalness: 0.55, roughness: 0.5 });
    const accMat = new THREE.MeshStandardMaterial({ color: zc, roughness: 0.4, metalness: 0.35,
      emissive: zc.clone(), emissiveIntensity: 0.08 });
    const glowMat = new THREE.MeshBasicMaterial({ color: zone.color });

    // landing pad the module sits on
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(PAV_W * 0.5, PAV_W * 0.54, 0.5, 32), padMat);
    pad.position.set(0, 0.25, 0); pad.receiveShadow = true;
    g.add(pad);
    const padRing = new THREE.Mesh(new THREE.TorusGeometry(PAV_W * 0.5, 0.14, 8, 44), glowMat);
    padRing.rotation.x = Math.PI / 2; padRing.position.y = 0.52;
    g.add(padRing);
    // anchor feet
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.42, 0.7, 6), darkMat);
      foot.position.set(Math.cos(a) * (PAV_W * 0.46), 0.35, Math.sin(a) * (PAV_W * 0.46));
      g.add(foot);
    }

    // ---------- The dome itself ----------
    const DOME_R = 5.6;
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(DOME_R, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: zc.clone().lerp(new THREE.Color(0xdfe8f6), 0.55),
        metalness: 0.45, roughness: 0.3, transparent: true, opacity: 0.42, side: THREE.DoubleSide })
    );
    shell.position.y = 0.5; shell.castShadow = true;
    g.add(shell);
    // geodesic strut work: latitude hoops + meridian ribs
    [0.28, 0.55, 0.8].forEach((f) => {
      const y = Math.sin(f * Math.PI / 2) * DOME_R;
      const r = Math.cos(f * Math.PI / 2) * DOME_R;
      const hoop = new THREE.Mesh(new THREE.TorusGeometry(r, 0.09, 6, 30), hullMat);
      hoop.rotation.x = Math.PI / 2; hoop.position.y = 0.5 + y;
      g.add(hoop);
    });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const rib = new THREE.Mesh(new THREE.TorusGeometry(DOME_R, 0.08, 6, 20, Math.PI / 2), hullMat);
      rib.rotation.y = a; rib.position.y = 0.5;
      g.add(rib);
    }
    // base collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(DOME_R + 0.1, DOME_R + 0.25, 1.0, 24), darkMat);
    collar.position.y = 0.9; collar.castShadow = true;
    g.add(collar);
    const collarGlow = new THREE.Mesh(new THREE.TorusGeometry(DOME_R + 0.2, 0.1, 8, 40), glowMat);
    collarGlow.rotation.x = Math.PI / 2; collarGlow.position.y = 1.3;
    g.add(collarGlow);
    // apex cupola + beacon
    const cupola = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.15, 1.1, 12), hullMat);
    cupola.position.y = DOME_R + 0.6; cupola.castShadow = true;
    g.add(cupola);
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), glowMat);
    beacon.position.y = DOME_R + 1.5;
    g.add(beacon);

    // viewports round the dome
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.2;
      const win = new THREE.Mesh(new THREE.CircleGeometry(0.62, 14),
        new THREE.MeshBasicMaterial({ color: 0x9beeff, transparent: true, opacity: 0.8 }));
      win.position.set(Math.cos(a) * (DOME_R - 0.35), 2.5, Math.sin(a) * (DOME_R - 0.35));
      win.lookAt(Math.cos(a) * (DOME_R + 6), 2.5, Math.sin(a) * (DOME_R + 6));
      g.add(win);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.07, 6, 16), hullMat);
      rim.position.copy(win.position);
      rim.lookAt(Math.cos(a) * (DOME_R + 6), 2.5, Math.sin(a) * (DOME_R + 6));
      g.add(rim);
    }

    // ---------- Docking airlock facing the core ----------
    const lockZ = PAV_D / 2 - 2.4;
    const tube = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 4.0, 14, 1, true), hullMat);
    tube.rotation.x = Math.PI / 2; tube.position.set(0, 1.9, lockZ);
    g.add(tube);
    for (let s = 0; s < 3; s++) {
      const band = new THREE.Mesh(new THREE.TorusGeometry(1.56, 0.11, 8, 20), darkMat);
      band.position.set(0, 1.9, lockZ - 1.4 + s * 1.4);
      g.add(band);
    }
    const hatch = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.24, 10, 26), accMat);
    hatch.position.set(0, 1.9, lockZ + 2.0);
    g.add(hatch);
    const hatchGlow = new THREE.Mesh(new THREE.CircleGeometry(1.42, 22),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.32 }));
    hatchGlow.position.set(0, 1.9, lockZ + 2.05);
    g.add(hatchGlow);

    // ---------- Surface equipment: solar arrays, antenna, cargo, rover ----------
    [-1, 1].forEach((s) => {
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 3.4, 8), hullMat);
      mast.position.set(s * (PAV_W * 0.42), 1.7, -PAV_D * 0.2);
      g.add(mast);
      const wing = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.12, 2.0),
        new THREE.MeshStandardMaterial({ color: 0x2a3f6d, metalness: 0.5, roughness: 0.35 }));
      wing.position.set(s * (PAV_W * 0.42), 3.5, -PAV_D * 0.2);
      wing.rotation.z = s * 0.35; wing.castShadow = true;
      g.add(wing);
      // cell grid on the panel
      for (let c = 0; c < 4; c++) {
        const cell = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 2.0),
          new THREE.MeshBasicMaterial({ color: 0x4f7cc4 }));
        cell.position.set(s * (PAV_W * 0.42) - 1.65 + c * 1.1, 3.56 + (s * 0.35) * (c - 1.5) * 0.32, -PAV_D * 0.2);
        cell.rotation.z = s * 0.35;
        g.add(cell);
      }
    });
    // dish antenna
    const aMast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.6, 8), hullMat);
    aMast.position.set(-PAV_W * 0.3, 1.3, PAV_D * 0.26);
    g.add(aMast);
    const dish = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.6),
      new THREE.MeshStandardMaterial({ color: 0xdfe6f2, metalness: 0.4, roughness: 0.4,
        side: THREE.DoubleSide }));
    dish.position.set(-PAV_W * 0.3, 2.9, PAV_D * 0.26);
    dish.rotation.set(-0.8, 0, 0.3); dish.castShadow = true;
    g.add(dish);
    // cargo containers
    [[PAV_W * 0.3, PAV_D * 0.28, 0.2], [PAV_W * 0.36, PAV_D * 0.16, -0.4]].forEach(([cx, cz, rot]) => {
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.1, 1.2), darkMat);
      box.position.set(cx, 0.9, cz); box.rotation.y = rot; box.castShadow = true;
      g.add(box);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.16, 1.25), accMat);
      stripe.position.set(cx, 1.28, cz); stripe.rotation.y = rot;
      g.add(stripe);
    });
    // marker lights around the pad
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + 0.4;
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), glowMat);
      lamp.position.set(Math.cos(a) * (PAV_W * 0.5), 0.75, Math.sin(a) * (PAV_W * 0.5));
      g.add(lamp);
    }



    // department name: clean lettering floating at the FRONT of the pavilion (in front of
    // the glass, at the entrance edge). depthTest off + high renderOrder → never occluded.
    // ride name floating in front of the attraction. depthTest off + high renderOrder
    // → never occluded, so it can sit at a comfortable reading height on every ride.
    const NAME_Y = 9.2;
    const NAME_Z = PAV_D / 2 + 1.6;
    const nameMesh = new THREE.Mesh(new THREE.PlaneGeometry(11.2, 4.7),
      new THREE.MeshBasicMaterial({ map: signTexture(zone), transparent: true,
        depthWrite: false, depthTest: false }));
    nameMesh.position.set(0, NAME_Y, NAME_Z);
    nameMesh.renderOrder = 20;
    gUp.add(nameMesh);
    // a second copy facing the back, so the name reads from either side of the pavilion
    const nameBack = new THREE.Mesh(new THREE.PlaneGeometry(11.2, 4.7),
      new THREE.MeshBasicMaterial({ map: signTexture(zone), transparent: true,
        depthWrite: false, depthTest: false }));
    nameBack.position.set(0, NAME_Y, NAME_Z - 0.06); nameBack.rotation.y = Math.PI;
    nameBack.renderOrder = 20;
    gUp.add(nameBack);

    // interior accent light
    const pl = new THREE.PointLight(zone.color, 0.6, 20); pl.position.set(0, 4, 0); g.add(pl);

    // portal hit volume (enter): wraps the whole structure plus its sign, so a click
    // anywhere on the pavilion works from any orbit angle — not just the front face
    const portal = new THREE.Mesh(
      new THREE.CylinderGeometry(PAV_W * 0.66, PAV_W * 0.66, 13, 20, 1, false),
      new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    );
    portal.position.set(0, 6, 0);
    g.add(portal);
    clickPortals.push({ mesh: portal, zoneId: zone.id });

    // path from the concourse out to this ride, in warm park paving
    const d = zone.dir;
    const s0 = new THREE.Vector3(d.x * (PLAZA_R + 0.2), 0.05, d.z * (PLAZA_R + 0.2));
    const s1 = new THREE.Vector3(zone.center.x - d.x * (PAV_D / 2 + 0.3), 0.05, zone.center.z - d.z * (PAV_D / 2 + 0.3));
    const mid = new THREE.Vector3().lerpVectors(s0, s1, 0.5);
    const len = s0.distanceTo(s1);
    const rot = -Math.atan2(d.z, d.x) + Math.PI / 2;
    const walk = new THREE.Mesh(new THREE.PlaneGeometry(3.4, len),
      new THREE.MeshStandardMaterial({ color: 0xe4d9c3, roughness: 0.92 }));
    walk.rotation.set(-Math.PI / 2, 0, rot); walk.position.copy(mid); walk.position.y = 0.04;
    scene.add(walk);
    // coloured kerbs marking which ride this path leads to
    [-1.62, 1.62].forEach((off) => {
      const edge = new THREE.Mesh(new THREE.PlaneGeometry(0.3, len),
        new THREE.MeshBasicMaterial({ color: zone.color }));
      edge.rotation.copy(walk.rotation);
      edge.position.copy(mid).add(new THREE.Vector3(-d.z * off, 0, d.x * off));
      edge.position.y = 0.06;
      scene.add(edge);
    });

    // subtle enter affordance below the department name
    const hintTex = textTexture(T("pavEnter"), 512, 100, "700 54px 'Segoe UI'", hexToRgba(zone.color, 1), zone.color);
    const hint = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.02),
      new THREE.MeshBasicMaterial({ map: hintTex, transparent: true,
        depthWrite: false, depthTest: false }));
    hint.position.set(0, 6.2, PAV_D / 2 + 1.6);
    hint.renderOrder = 20;
    gUp.add(hint);
    // ground marking that signals the ride is enterable
    const glowPad = new THREE.Mesh(new THREE.CircleGeometry(3.2, 32),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.22 }));
    glowPad.rotation.x = -Math.PI / 2; glowPad.position.y = 0.31;
    g.add(glowPad);

    // hover-highlight ring on the ground (hidden until the pavilion is hovered)
    const hiRing = new THREE.Mesh(new THREE.RingGeometry(PAV_W * 0.62, PAV_W * 0.74, 56),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0, side: THREE.DoubleSide }));
    hiRing.rotation.x = -Math.PI / 2; hiRing.position.y = 0.24;
    g.add(hiRing);
    // a soft vertical beam of light that appears over the hovered pavilion
    // (in gUp so the pavilion's vertical scale doesn't push it through the roof)
    const hiBeam = new THREE.Mesh(new THREE.CylinderGeometry(PAV_W * 0.5, PAV_W * 0.66, WALL_H - 5, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    hiBeam.position.y = (WALL_H - 5) / 2 + 0.3;
    gUp.add(hiBeam);
    pavHi.push({ zoneId: zone.id, group: g, frameMat: accMat, ring: hiRing, beam: hiBeam, baseEmissive: 0.06, k: 0,
                 zone, signMeshes: [nameMesh, nameBack], hintMesh: hint });
  });

  // ---------- Surface installations: relay masts, rovers, cargo stacks ----------
  (function () {
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xb9c3d4, metalness: 0.66, roughness: 0.36 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1b2334, metalness: 0.55, roughness: 0.5 });
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x594549, roughness: 1, flatShading: true });

    // relay masts between the domes, lit in that dome's colour
    for (let i = 0; i < ZONES.length; i++) {
      const a = (i + 0.5) * ((Math.PI * 2) / ZONES.length) - Math.PI / 2 + OFF;
      const r = RADIUS - 10;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const col = ZONES[i].color;
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 0.5, 10), darkMat);
      base.position.set(x, 0.25, z); scene.add(base);
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 7.0, 8), hullMat);
      mast.position.set(x, 3.7, z); mast.castShadow = true; scene.add(mast);
      // cross arms
      [2.6, 4.4, 6.0].forEach((h, k) => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(2.0 - k * 0.4, 0.1, 0.1), hullMat);
        arm.position.set(x, h, z); arm.rotation.y = -a; scene.add(arm);
      });
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8),
        new THREE.MeshBasicMaterial({ color: col }));
      tip.position.set(x, 7.4, z); scene.add(tip);
    }

    // survey rovers parked around the pad
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.5;
      const r = SHELL_R - 11;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      const rov = new THREE.Group();
      rov.position.set(x, 0, z);
      rov.rotation.y = -a + 0.6;
      scene.add(rov);
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 1.5), hullMat);
      body.position.y = 1.0; body.castShadow = true; rov.add(body);
      const mastR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.3, 6), hullMat);
      mastR.position.set(-0.8, 1.9, 0); rov.add(mastR);
      const cam = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.3), darkMat);
      cam.position.set(-0.8, 2.6, 0); rov.add(cam);
      const panel = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x2a3f6d, metalness: 0.5, roughness: 0.35 }));
      panel.position.set(0.4, 1.5, 0); rov.add(panel);
      [[-0.9, 0.75], [0.9, 0.75], [-0.9, -0.75], [0.9, -0.75]].forEach(([wx, wz]) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.3, 12), darkMat);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(wx, 0.44, wz);
        rov.add(wheel);
      });
    }

    // cargo stacks and floodlights ringing the pad
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + 0.25;
      const r = SHELL_R - 6;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      // stacked containers
      const h = 1 + (i % 2);
      for (let k = 0; k < h; k++) {
        const box = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 1.6), darkMat);
        box.position.set(x, 0.65 + k * 1.25, z); box.rotation.y = -a;
        box.castShadow = true; scene.add(box);
        const band = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.14, 1.65),
          new THREE.MeshBasicMaterial({ color: 0x59e0ff, transparent: true, opacity: 0.7 }));
        band.position.set(x, 1.05 + k * 1.25, z); band.rotation.y = -a;
        scene.add(band);
      }
      // floodlight on a tripod
      const la = a + 0.2;
      const lx = Math.cos(la) * (r + 3.5), lz = Math.sin(la) * (r + 3.5);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.2, 4.2, 8), hullMat);
      post.position.set(lx, 2.1, lz); scene.add(post);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.4), darkMat);
      head.position.set(lx, 4.4, lz); head.rotation.y = -la; scene.add(head);
      const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.4),
        new THREE.MeshBasicMaterial({ color: 0xdfeaff }));
      lens.position.set(lx - Math.cos(la) * 0.22, 4.35, lz - Math.sin(la) * 0.22);
      lens.rotation.y = -la + Math.PI / 2;
      scene.add(lens);
    }

    // rock outcrops just inside the perimeter, to root the base on the surface
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = SHELL_R - 16 - Math.random() * 6;
      const s = 0.9 + Math.random() * 1.8;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), rockMat);
      rock.position.set(Math.cos(a) * r, s * 0.4, Math.sin(a) * r);
      rock.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      rock.castShadow = true;
      scene.add(rock);
    }
  })();



  // ---------- Department rooms (each a dedicated interior space, built lazily) ----------
  const rooms = {};        // id -> { group, clickAgents:[], stance }
  const roomKiosks = [];    // (legacy) per-card animation list
  const roomCarousels = []; // { carousel, baseY } — whole ring revolves
  function roomOrigin(zone) { return new THREE.Vector3(800 + zone.index * 200, 0, 0); }

  function buildRoom(zone) {
    const o = roomOrigin(zone);
    const grp = new THREE.Group();
    grp.position.copy(o);
    scene.add(grp);
    const RW = 54, RD = 68, RH = 12;
    const roomClickAgents = [];

    // ---------- Module interior: a pressurised habitat with a view of the surface ----------
    const zc = new THREE.Color(zone.color);
    const hullTone = zc.clone().lerp(new THREE.Color(0x0d1422), 0.82);
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xa8b4c8, metalness: 0.6, roughness: 0.42 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x161d2c, metalness: 0.5, roughness: 0.55 });

    // 1) the planet and stars seen through the viewports
    const domeCan = document.createElement("canvas"); domeCan.width = 16; domeCan.height = 256;
    const dctx = domeCan.getContext("2d");
    const grad = dctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, "#03050c");
    grad.addColorStop(0.5, "#0a1224");
    grad.addColorStop(0.72, "#2a1b33");
    grad.addColorStop(0.74, "#4a3a3f");
    grad.addColorStop(1.0, "#352a2e");
    dctx.fillStyle = grad; dctx.fillRect(0, 0, 16, 256);
    const domeTex = new THREE.CanvasTexture(domeCan);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(150, 32, 20),
      new THREE.MeshBasicMaterial({ map: domeTex, side: THREE.BackSide, fog: false, depthWrite: false })
    );
    grp.add(dome);
    const surface = new THREE.Mesh(new THREE.CircleGeometry(140, 60),
      new THREE.MeshStandardMaterial({ color: 0x4a3a3f, roughness: 1 }));
    surface.rotation.x = -Math.PI / 2; surface.position.y = -0.2;
    grp.add(surface);
    // a few stars outside the windows
    (function () {
      const n = 500, pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const rr = 120 + Math.random() * 25, th = Math.random() * Math.PI * 2;
        const ph = Math.acos(Math.random());
        pos[i * 3] = rr * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = rr * Math.cos(ph) + 8;
        pos[i * 3 + 2] = rr * Math.sin(ph) * Math.sin(th);
      }
      const gg = new THREE.BufferGeometry();
      gg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      grp.add(new THREE.Points(gg, new THREE.PointsMaterial({ color: 0xcfe0ff, size: 1.0,
        transparent: true, opacity: 0.85, depthWrite: false })));
    })();

    // deck plating with a lit centre track
    const floor = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.3, RD),
      new THREE.MeshStandardMaterial({ color: 0x1d2536, roughness: 0.55, metalness: 0.45 }));
    floor.position.y = -0.15; floor.receiveShadow = true;
    grp.add(floor);
    const runway = new THREE.Mesh(new THREE.PlaneGeometry(4.6, RD - 2),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.2 }));
    runway.rotation.x = -Math.PI / 2; runway.position.set(0, 0.02, 2);
    grp.add(runway);
    [-1, 1].forEach((s) => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.3, RD),
        new THREE.MeshBasicMaterial({ color: zone.color }));
      line.rotation.x = -Math.PI / 2; line.position.set(s * (RW / 2 - 1), 0.03, 0);
      grp.add(line);
    });
    // deck seams
    for (let x = -RW / 2 + 8; x < RW / 2; x += 8) {
      const seam = new THREE.Mesh(new THREE.PlaneGeometry(0.12, RD),
        new THREE.MeshBasicMaterial({ color: 0x2c3446 }));
      seam.rotation.x = -Math.PI / 2; seam.position.set(x, 0.04, 0);
      grp.add(seam);
    }

    // ---------- Hull walls: ribbed panels with viewports ----------
    const ribStep = 6;
    function hullWall(width, cx, cz, along) {
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(along === "x" ? width : 0.5, RH, along === "x" ? 0.5 : width),
        new THREE.MeshStandardMaterial({ color: hullTone, roughness: 0.72, metalness: 0.3 })
      );
      wall.position.set(cx, RH / 2, cz); wall.receiveShadow = true;
      grp.add(wall);
      const n = Math.round(width / ribStep);
      for (let i = 0; i <= n; i++) {
        const off = -width / 2 + i * (width / n);
        // structural rib
        const rib = new THREE.Mesh(
          new THREE.BoxGeometry(along === "x" ? 0.34 : 0.62, RH, along === "x" ? 0.62 : 0.34), hullMat);
        if (along === "x") rib.position.set(cx + off, RH / 2, cz);
        else rib.position.set(cx, RH / 2, cz + off);
        grp.add(rib);
        // viewport between ribs
        if (i < n) {
          const vo = off + (width / n) / 2;
          const win = new THREE.Mesh(new THREE.CircleGeometry(1.5, 20),
            new THREE.MeshBasicMaterial({ color: 0x0a1224 }));
          const nrm = along === "x" ? (cz < 0 ? 1 : -1) : (cx < 0 ? 1 : -1);
          if (along === "x") { win.position.set(cx + vo, 5.4, cz + 0.28 * nrm); win.rotation.y = nrm > 0 ? 0 : Math.PI; }
          else { win.position.set(cx + 0.28 * nrm, 5.4, cz + vo); win.rotation.y = nrm > 0 ? Math.PI / 2 : -Math.PI / 2; }
          grp.add(win);
          const rimW = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.16, 8, 24), hullMat);
          rimW.position.copy(win.position); rimW.rotation.copy(win.rotation);
          grp.add(rimW);
        }
      }
      // light strip where the wall meets the ceiling
      const cove = new THREE.Mesh(
        new THREE.BoxGeometry(along === "x" ? width : 0.3, 0.2, along === "x" ? 0.3 : width),
        new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.8 })
      );
      cove.position.set(cx, RH - 0.9, cz);
      grp.add(cove);
    }
    hullWall(RW, 0, -RD / 2, "x");
    hullWall(RW, 0, RD / 2, "x");
    hullWall(RD, -RW / 2, 0, "z");
    hullWall(RD, RW / 2, 0, "z");

    // vaulted ceiling with structural arches
    const ceil = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.3, RD),
      new THREE.MeshStandardMaterial({ color: 0x141b29, roughness: 0.8, metalness: 0.3 }));
    ceil.position.y = RH;
    grp.add(ceil);
    // shallow transverse ribs: a wide-radius torus arc so the crown clears the deck
    const ARCH_RISE = 2.4;
    const ARCH_R = ((RW / 2) * (RW / 2) + ARCH_RISE * ARCH_RISE) / (2 * ARCH_RISE);
    const ARCH_ARC = 2 * Math.asin((RW / 2) / ARCH_R);
    const ribMat = new THREE.MeshStandardMaterial({ color: 0x5c687e, metalness: 0.55, roughness: 0.6 });
    for (let z = -RD / 2 + 6; z < RD / 2; z += 6) {
      const arch = new THREE.Mesh(
        new THREE.TorusGeometry(ARCH_R, 0.22, 8, 40, ARCH_ARC), ribMat);
      arch.rotation.z = Math.PI / 2 - ARCH_ARC / 2;   // centre the arc on the vertical axis
      arch.position.set(0, RH - 0.35 - ARCH_RISE - ARCH_R, z);
      grp.add(arch);
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(RW - 12, 0.35),
        new THREE.MeshBasicMaterial({ color: 0x9dc6f0, transparent: true, opacity: 0.75 }));
      strip.rotation.x = Math.PI / 2; strip.position.set(0, RH - 0.5, z + 3);
      grp.add(strip);
    }

    // back-bulkhead display + hazard band
    const header = new THREE.Mesh(new THREE.PlaneGeometry(24, 8.4),
      new THREE.MeshBasicMaterial({ map: roomHeaderTexture(zone), transparent: true }));
    header.position.set(0, RH / 2 + 1.2, -RD / 2 + 0.32);
    grp.add(header);
    const wash = new THREE.Mesh(new THREE.PlaneGeometry(RW, 0.5),
      new THREE.MeshBasicMaterial({ color: zone.color }));
    wash.position.set(0, 0.9, -RD / 2 + 0.32);
    grp.add(wash);

    // lighting: the scene rig already reaches here, so only a soft interior fill
    const kl = new THREE.DirectionalLight(0xdfeaff, 0.4);
    kl.position.set(12, 30, 26); grp.add(kl); grp.add(kl.target);
    const cl = new THREE.PointLight(0x9fc4ff, 0.35, 80); cl.position.set(0, RH - 2, 2); grp.add(cl);



    // ---------- Carousel of floating glass cards (whole ring revolves) ----------
    const list = agentsByZone[zone.id] || [];
    const carousel = new THREE.Group();
    const RING_Y = 4.7;
    carousel.position.set(0, RING_Y, -3);   // ring center, mid-room
    grp.add(carousel);
    // radius derived from card width so cards never crowd each other
    const ringR = Math.max(8.2, list.length * 1.0);
    list.forEach((agent, idx) => {
      const a = (idx / list.length) * Math.PI * 2;
      const card = buildFloatingCard(agent, zone);
      card.position.set(Math.sin(a) * ringR, 0, Math.cos(a) * ringR);
      card.rotation.y = a;                // face radially outward
      carousel.add(card);
      roomClickAgents.push({ mesh: card.userData.hit, agentId: agent.id });
    });
    // remember the carousel + its center height so the animate loop can revolve it
    roomCarousels.push({ carousel, baseY: carousel.position.y });

    // ---------- Exit gateway (return to lobby), front-left, angled toward the viewer ----------
    const exitGate = buildExitGate();
    exitGate.position.set(-(ringR + 6), 0, 8);
    exitGate.rotation.y = 0.5;
    grp.add(exitGate);
    const exitAgentless = { mesh: exitGate.userData.hit };

    // camera sits INSIDE the room, in front of the carousel, looking at the ring center.
    // its distance scales with the ring so every department frames up the same way.
    const camGap = 13.5;
    const stance = {
      pos: { x: o.x, y: RING_Y + 1.3, z: o.z - 3 + ringR + camGap },
      look: { x: o.x, y: RING_Y, z: o.z - 3 },
    };
    // keep the camera inside the front wall no matter how far out you zoom
    const maxDist = Math.min(ringR + camGap + 7, RD / 2 - 3 - 2);
    const room = { group: grp, clickAgents: roomClickAgents, exit: exitAgentless, stance, maxDist, zoneId: zone.id };
    rooms[zone.id] = room;
    return room;
  }

  // ---------- Scene transition (black fade) ----------
  const fadeEl = document.getElementById("fade");
  const backBtn = document.getElementById("backBtn");
  const roomDeck = document.getElementById("roomDeck");
  let transitioning = false;
  function transition(midpoint) {
    if (transitioning) return;
    transitioning = true;
    fadeEl.classList.add("show");
    setTimeout(() => {
      midpoint();
      setTimeout(() => { fadeEl.classList.remove("show"); transitioning = false; }, 80);
    }, 440);
  }

  function populateDeck(zone) {
    document.getElementById("rdIcon").textContent = zone.icon;
    document.getElementById("rdIcon").style.background = hexToRgba(zone.color, 0.2);
    document.getElementById("rdName").textContent = zName(zone);
    document.getElementById("rdSub").textContent = (zSub(zone) || "").toUpperCase() + " · " + T("deckSub")(zone.count);
    document.getElementById("rdDesc").textContent = zDesc(zone) || "";
    const grid = document.getElementById("rdGrid");
    grid.innerHTML = "";
    (agentsByZone[zone.id] || []).forEach((agent) => {
      const lic = agent.license === "required"
        ? `<span class="rc-pill req">${T("licReqShort")}</span>` : `<span class="rc-pill">${T("licFreeShort")}</span>`;
      const card = document.createElement("div");
      card.className = "rd-card";
      card.style.setProperty("--rc", zone.color);
      card.innerHTML =
        `<div class="rc-top"><div class="rc-em" style="background:${hexToRgba(zone.color, 0.16)}">${aEmoji(agent)}</div>
         <div class="rc-nm">${esc(aName(agent))}</div></div>
         <div class="rc-tl">${esc(cleanTag(aTag(agent)))}</div>
         <div class="rc-foot">${lic}<span class="rc-go">${T("cardCta").replace("▶  ", "")} ▸</span></div>`;
      card.addEventListener("click", () => openModal(agent.id));
      grid.appendChild(card);
    });
  }

  let ctxExit = null;      // { mesh } for the in-room exit gateway
  let atExterior = false;  // true when camera is parked outside the building
  let curZoneId = null;    // department currently being viewed (room mode)

  function enterRoom(id, after) {
    const zone = zoneById[id];
    if (!zone) return;
    atExterior = false;
    hideZoneHover();
    transition(() => {
      const room = rooms[id] || buildRoom(zone);
      camera.position.set(room.stance.pos.x, room.stance.pos.y, room.stance.pos.z);
      controls.target.set(room.stance.look.x, room.stance.look.y, room.stance.look.z);
      roomLook.set(room.stance.look.x, room.stance.look.y, room.stance.look.z);
      roomMaxDist = room.maxDist;
      controls.minDistance = 4; controls.maxDistance = roomMaxDist;
      controls.enableRotate = false; // room stays put; only the cards spin
      controls.enabled = false;      // fully hand touch/mouse to the carousel drag logic
      controls.update();
      mode = "room";
      curZoneId = id;
      ctxAgents = room.clickAgents; ctxPortals = []; ctxExit = room.exit;
      setActiveZoneBtn(id);
      backBtn.classList.add("show");
      if (after) after();
    });
  }
  function exitRoom() {
    atExterior = false;
    transition(() => {
      camera.position.set(INTERIOR.pos.x, INTERIOR.pos.y, INTERIOR.pos.z);
      controls.target.set(INTERIOR.look.x, INTERIOR.look.y, INTERIOR.look.z);
      controls.minDistance = LOBBY_MIN_DIST; controls.maxDistance = 105;
      controls.enableRotate = true; // restore free orbit in the lobby
      controls.enabled = true;
      controls.update();
      mode = "lobby";
      curZoneId = null;
      ctxAgents = clickAgents; ctxPortals = clickPortals; ctxExit = null;
      setActiveZoneBtn(null);
      backBtn.classList.remove("show");
    });
  }
  backBtn.addEventListener("click", exitRoom);

  // ---------- Sidebar ----------
  const zoneListRoot = document.getElementById("zoneList");
  function renderSidebar() {
    zoneListRoot.innerHTML = "";
    ZONES.forEach((zone) => {
      const btn = document.createElement("button");
      btn.className = "zone-btn"; btn.dataset.zone = zone.id; btn.style.color = zone.color;
      btn.innerHTML = `<div class="ic" style="background:${zone.color}">${zone.icon}</div>
        <div class="info"><div class="n1" style="color:#1c2333">${esc(zName(zone))}</div>
        <div class="n2">${esc(zSub(zone))}</div></div><div class="cnt">${zone.count}</div>`;
      btn.addEventListener("click", () => { enterRoom(zone.id); if (window.innerWidth <= 860) sidebar.classList.remove("open"); });
      zoneListRoot.appendChild(btn);
    });
  }
  renderSidebar();
  function setActiveZoneBtn(id) {
    document.querySelectorAll(".zone-btn").forEach((b) => b.classList.toggle("active", b.dataset.zone === id));
  }

  // ---------- Camera fly ----------
  let flightRAF = null;
  function animateCamera(pos, look, dur, done) {
    if (flightRAF) cancelAnimationFrame(flightRAF);
    controls.enabled = false;
    const sp = camera.position.clone(), sl = controls.target.clone();
    const tp = new THREE.Vector3(pos.x, pos.y, pos.z), tl = new THREE.Vector3(look.x, look.y, look.z);
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    (function step(now) {
      const t = Math.min(1, (now - t0) / dur), e = ease(t);
      camera.position.lerpVectors(sp, tp, e);
      controls.target.lerpVectors(sl, tl, e);
      controls.update();
      if (t < 1) flightRAF = requestAnimationFrame(step);
      else { controls.enabled = true; flightRAF = null; done && done(); }
    })(performance.now());
  }
  function flyToZone(id, done) {
    const zone = zoneById[id];
    if (!zone) return;
    setActiveZoneBtn(id);
    const d = zone.dir;
    const camPos = { x: zone.center.x - d.x * 18, y: 8, z: zone.center.z - d.z * 18 };
    const look = { x: zone.center.x + d.x * 0.5, y: 2.6, z: zone.center.z + d.z * 0.5 };
    animateCamera(camPos, look, 1150, done);
  }
  function flyInterior() {
    setActiveZoneBtn(null);
    if (mode === "room") { atExterior = false; exitRoom(); return; }
    // keep the exterior state (and its loose limits) for the whole flight so the lobby
    // camera constraints can't grab the camera mid-animation and cause a stutter
    animateCamera(INTERIOR.pos, INTERIOR.look, 1600, () => {
      atExterior = false;
      controls.minDistance = LOBBY_MIN_DIST; controls.maxDistance = 105;
    });
  }
  function goExterior() {
    atExterior = true;
    // outside we need a much wider range so the whole building fits on screen
    controls.minDistance = 40; controls.maxDistance = 320;
    animateCamera(EXTERIOR.pos, EXTERIOR.look, 1400);
  }
  function flyExterior() {
    setActiveZoneBtn(null);
    if (mode === "room") {
      exitRoom();
      setTimeout(goExterior, 620);
      return;
    }
    goExterior();
  }
  document.getElementById("homeBtn").addEventListener("click", flyInterior);
  document.getElementById("exteriorBtn").addEventListener("click", flyExterior);

  // ---------- Raycast ----------
  const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2();
  function pickAt(cx, cy) {
    mouse.x = (cx / window.innerWidth) * 2 - 1;
    mouse.y = -(cy / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const a = raycaster.intersectObjects((ctxAgents || []).map((x) => x.mesh), false)[0];
    if (a) return { type: "agent", obj: a.object };
    if (ctxExit) {
      const ex = raycaster.intersectObject(ctxExit.mesh, false)[0];
      if (ex) return { type: "exit" };
    }
    const p = raycaster.intersectObjects((ctxPortals || []).map((x) => x.mesh), false)[0];
    if (p) return { type: "portal", obj: p.object };
    return null;
  }
  const dragTurn = { active: false, lastX: 0, vel: 0, pointerId: null };
  function activeCarousel() {
    // the carousel belonging to the room currently in view
    for (const rc of roomCarousels) {
      const wp = new THREE.Vector3(); rc.carousel.getWorldPosition(wp);
      if (Math.abs(wp.x - camera.position.x) < 60) return rc.carousel;
    }
    return null;
  }

  // ---------- Pavilion hover: focus highlight + list of all Agent names ----------
  const zoneHoverEl = document.getElementById("zoneHover");
  let hoveredZoneId = null;
  let hoverSettling = false;   // true while the camera is rotating a pavilion to centre
  function showZoneHover(zone, cx, cy) {
    if (hoveredZoneId !== zone.id) {
      const list = (agentsByZone[zone.id] || []);
      const twoCol = list.length > 6;
      const items = list.map((a) => `<li>${esc(aName(a))}</li>`).join("");
      zoneHoverEl.innerHTML =
        `<div class="zh-head">
           <div class="zh-bar" style="background:${zone.color}"></div>
           <div class="zh-title">
             <div class="zh-name">${esc(zName(zone))}</div>
             <div class="zh-en">${esc(zSub(zone) || "")}</div>
           </div>
           <div class="zh-cnt" style="color:${zone.color};border-color:${hexToRgba(zone.color, 0.45)}">${list.length}</div>
         </div>
         <div class="zh-desc">${esc(zDesc(zone) || "")}</div>
         <ol class="zh-list${twoCol ? " two" : ""}" style="--zc:${zone.color}">${items}</ol>
         <div class="zh-tip">${T("enterExp")}</div>`;
      zoneHoverEl.style.borderLeftColor = zone.color;
      zoneHoverEl.style.display = "block";
      hoveredZoneId = zone.id;
      // anchor the panel once, where the pointer entered — it must NOT chase the cursor,
      // otherwise it jitters while you move over the pavilion
      const pw = zoneHoverEl.offsetWidth || 320, ph = zoneHoverEl.offsetHeight || 260;
      let x = cx + 26, y = cy + 22;
      if (x + pw > window.innerWidth - 14) x = cx - pw - 26;
      if (x < 14) x = 14;
      if (y + ph > window.innerHeight - 14) y = Math.max(14, window.innerHeight - ph - 14);
      zoneHoverEl.style.left = x + "px"; zoneHoverEl.style.top = y + "px";
    }
  }
  function hideZoneHover() {
    if (hoveredZoneId !== null) { zoneHoverEl.style.display = "none"; hoveredZoneId = null; }
  }
  // the focus panel is a large, stationary target — clicking it enters the zone it
  // describes, so you never have to chase the pavilion while the camera swings round
  zoneHoverEl.addEventListener("click", (e) => {
    e.stopPropagation();
    if (hoveredZoneId && mode === "lobby") enterRoom(hoveredZoneId);
  });
  zoneHoverEl.addEventListener("pointerdown", (e) => e.stopPropagation());

  canvas.addEventListener("pointermove", (e) => {
    // while dragging the carousel (mouse OR touch), spin it — this must run for touch too
    if (dragTurn.active && (dragTurn.pointerId === null || e.pointerId === dragTurn.pointerId)) {
      const dx = e.clientX - dragTurn.lastX;
      dragTurn.lastX = e.clientX;
      const car = activeCarousel();
      if (car) { car.rotation.y += dx * 0.006; dragTurn.vel = dx * 0.006; }
      tooltip.style.display = "none";
      e.preventDefault();
      return;
    }
    if (e.pointerType === "touch") return; // no hover tooltip on touch
    const hit = pickAt(e.clientX, e.clientY);
    if (hit && hit.type === "agent") {
      const a = (ctxAgents || []).find((x) => x.mesh === hit.obj);
      tooltip.textContent = aName(agentById[a.agentId]);
      tooltip.style.left = e.clientX + "px"; tooltip.style.top = e.clientY + "px";
      tooltip.style.display = "block"; document.body.style.cursor = "pointer";
      hideZoneHover();
    } else if (hit && hit.type === "portal") {
      tooltip.style.display = "none"; document.body.style.cursor = "pointer";
      const pz = (ctxPortals || []).find((x) => x.mesh === hit.obj);
      // don't let the swing itself switch which pavilion is focused
      if (pz && mode === "lobby" && !(hoverSettling && hoveredZoneId && pz.zoneId !== hoveredZoneId))
        showZoneHover(zoneById[pz.zoneId], e.clientX, e.clientY);
      else if (!hoverSettling) hideZoneHover();
    } else if (hit && hit.type === "exit") {
      tooltip.style.display = "none"; document.body.style.cursor = "pointer";
      hideZoneHover();
    } else {
      tooltip.style.display = "none";
      document.body.style.cursor = mode === "room" && roomCarousels.length ? "grab" : "default";
      // in the lobby, keep the last hovered pavilion "latched" (focus stays on it) until
      // another pavilion is hovered or the pointer leaves the canvas — avoids jitter
      if (mode !== "lobby") hideZoneHover();
    }
  }, { passive: false });
  // moving the pointer ONTO the focus panel must not dismiss it — the panel is a
  // click target in its own right
  canvas.addEventListener("pointerleave", (e) => {
    if (e.relatedTarget && zoneHoverEl.contains(e.relatedTarget)) return;
    hideZoneHover();
  });
  zoneHoverEl.addEventListener("pointerleave", (e) => {
    if (e.relatedTarget === canvas) return;
    hideZoneHover();
  });
  // once the user grabs to navigate the lobby, release the hover-focus latch so we
  // never fight their manual orbit/pan
  let orbiting = false;
  controls.addEventListener("start", () => { orbiting = true; if (mode === "lobby") hideZoneHover(); });
  controls.addEventListener("end", () => { orbiting = false; });

  let downPos = null;
  canvas.addEventListener("pointerdown", (e) => {
    downPos = { x: e.clientX, y: e.clientY };
    // primary button (mouse-left) or any touch/pen contact starts a carousel drag in a room
    const primary = e.button === 0 || e.pointerType === "touch" || e.pointerType === "pen";
    if (mode === "room" && primary) {
      dragTurn.active = true; dragTurn.lastX = e.clientX; dragTurn.vel = 0; dragTurn.pointerId = e.pointerId;
      controls.enabled = false; // stop OrbitControls from eating the touch/drag in a room
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      document.body.style.cursor = "grabbing";
    }
  });
  function endDrag(e) {
    if (!dragTurn.active) return;
    dragTurn.active = false; dragTurn.pointerId = null;
    controls.enabled = (mode !== "room"); // keep OrbitControls off while inside a room
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    document.body.style.cursor = "default";
  }
  canvas.addEventListener("pointerup", (e) => {
    const wasDragging = dragTurn.active;
    endDrag(e);
    if (!downPos) return;
    const moved = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y); downPos = null;
    if (moved > 8) return; // it was a drag, not a tap
    const hit = pickAt(e.clientX, e.clientY);
    // if the camera is outside the building shell (parked exterior, or zoomed way out),
    // a building click should first bring you into the atrium — never teleport into a room
    const outside = mode === "lobby" &&
      Math.hypot(camera.position.x, camera.position.z) > SHELL_R - 4;
    if (atExterior || outside) { if (hit) flyInterior(); return; }
    if (!hit) return;
    if (hit.type === "agent") openModal((ctxAgents || []).find((x) => x.mesh === hit.obj).agentId);
    else if (hit.type === "exit") exitRoom();
    else enterRoom((ctxPortals || []).find((x) => x.mesh === hit.obj).zoneId);
    void wasDragging;
  });
  canvas.addEventListener("pointercancel", endDrag);

  // ---------- Zoom (pure dolly toward the pinned target) ----------
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomIn = e.deltaY < 0;
    const factor = zoomIn ? 0.86 : 1 / 0.86;
    const offset = camera.position.clone().sub(controls.target);
    let dist = offset.length() * factor;
    dist = Math.max(controls.minDistance, Math.min(controls.maxDistance, dist));
    // the target is pinned (atrium centre / room centre), so zoom is a pure dolly —
    // you can never lose the scene or fly through the middle of it
    offset.setLength(dist);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  }, { passive: false });
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalEl = document.getElementById("modal");
  function openModal(id) {
    const agent = agentById[id]; if (!agent) return;
    const zone = zoneById[agent.zone];
    const lic = agent.license === "required"
      ? `<span class="badge req">${T("licReq")}</span>` : `<span class="badge free">${T("licFree")}</span>`;
    const pains = aPains(agent).map((p) => `<div class="pain-item">${esc(p)}</div>`).join("");
    const steps = aSteps(agent).map((s) => `<li>${esc(s)}</li>`).join("");
    const sim = (typeof SIM !== "undefined") ? SIM[id] : null;
    const ex = aExample(agent);
    const edmFile = (typeof EDM !== "undefined" && EDM[id]) ? EDM[id][LANG] || EDM[id].zh : null;
    const edmUrl = edmFile ? new URL(`${LANG}/${edmFile}`, EDM_BASE_URL).href : null;
    modalEl.innerHTML = `
      <button id="modalClose">✕</button>
      <div class="m-head">
        <div class="m-emoji" style="background:${hexToRgba(zone.color, 0.12)}">${aEmoji(agent)}</div>
        <div><div class="m-cname">${esc(aName(agent))}</div><div class="m-ename">${esc(aSub(agent))}</div>
        <div class="m-badges"><span class="badge zone" style="background:${zone.color}">${zone.icon} ${esc(zName(zone))}</span>${lic}</div></div>
      </div>
      <div class="m-tagline" style="color:${zone.color}">${esc(cleanTag(aTag(agent)))}</div>

      <div class="m-tabs">
        <button class="m-tab on" data-pane="run">${T("tabRun")}</button>
        <button class="m-tab" data-pane="info">${T("tabInfo")}</button>
        ${edmFile ? `<button class="m-tab" data-pane="edm">${T("tabEdm")}</button>` : ""}
      </div>

      <div class="m-pane on" id="paneRun">
        <div class="run-head">
          <span class="sim-badge">${T("simBadge")}</span>
          <button class="run-btn" id="replayBtn">${T("replay")}</button>
        </div>
        <div class="stage" id="simStage"></div>
        <div class="sim-foot" id="simFoot"></div>
      </div>

      <div class="m-pane" id="paneInfo">
        <div class="m-section"><h4>${T("secWhat")}</h4><div class="m-desc">${esc(aDesc(agent))}</div></div>
        ${pains ? `<div class="m-section"><h4>${T("secPain")}</h4><div class="pain-list">${pains}</div></div>` : ""}
        ${steps ? `<div class="m-section"><h4>${T("secStart")}</h4><ol class="step-list">${steps}</ol></div>` : ""}
        ${ex ? `<div class="m-section"><h4>${T("secExample")}</h4><div class="example-box">${esc(ex)}<button class="copy-btn">${T("copy")}</button></div></div>` : ""}
      </div>

      ${edmUrl ? `<div class="m-pane" id="paneEdm">
        <div class="edm-bar">
          <span class="edm-note">${T("edmNote")}</span>
          <a class="edm-open" href="${edmUrl}" target="_blank" rel="noopener">${T("edmOpen")}</a>
        </div>
        <iframe class="edm-frame" id="edmFrame" title="newsletter" loading="lazy"></iframe>
      </div>` : ""}`;

    modalEl.querySelector("#modalClose").addEventListener("click", closeModal);
    const cp = modalEl.querySelector(".copy-btn");
    if (cp) cp.addEventListener("click", () => {
      navigator.clipboard.writeText(ex);
      cp.textContent = T("copied");
      setTimeout(() => (cp.textContent = T("copy")), 1500);
    });
    modalEl.querySelectorAll(".m-tab").forEach((t) => t.addEventListener("click", () => {
      const pane = t.dataset.pane;
      modalEl.querySelectorAll(".m-tab").forEach((x) => x.classList.toggle("on", x === t));
      modalEl.querySelectorAll(".m-pane").forEach((p) => p.classList.remove("on"));
      const target = modalEl.querySelector(
        pane === "run" ? "#paneRun" : pane === "edm" ? "#paneEdm" : "#paneInfo");
      if (target) target.classList.add("on");
      // the newsletter is a fixed 728px email layout — widen the modal so it never clips
      modalEl.classList.toggle("wide", pane === "edm");
      if (pane === "run") playSim(agent, zone, sim);
      if (pane === "edm") {
        // load the newsletter only the first time the tab is opened
        const fr = modalEl.querySelector("#edmFrame");
        if (fr && !fr.getAttribute("src")) fr.setAttribute("src", edmUrl);
      }
    }));
    modalEl.querySelector("#replayBtn").addEventListener("click", () => playSim(agent, zone, sim));
    modalEl.classList.remove("wide");
    modalBackdrop.classList.add("show");
    playSim(agent, zone, sim);
  }

  // ---------- Simulated run inside the agent modal ----------
  let simTimers = [];
  function playSim(agent, zone, sim) {
    simTimers.forEach(clearTimeout); simTimers = [];
    const stage = modalEl.querySelector("#simStage");
    const foot = modalEl.querySelector("#simFoot");
    if (!stage) return;
    stage.innerHTML = "";

    const authored = !!(sim && sim.turns);
    const push = (html) => { stage.insertAdjacentHTML("beforeend", html); stage.scrollTop = stage.scrollHeight; };
    const askBubble = (txt) =>
      `<div class="s-msg u"><div class="s-av u">${T("you")}</div><div class="s-bub">${esc(txt).replace(/\n/g, "<br>")}</div></div>`;
    const sayBubble = (html) =>
      `<div class="s-msg"><div class="s-av a">C</div><div class="s-bub">${html}</div></div>`;
    const stepLine = (s) =>
      `<div class="s-step"><span class="s-dot"></span>${esc(s)}</div>`;
    const settleSteps = () => stage.querySelectorAll(".s-step").forEach((e) => e.classList.add("done"));

    // hold for a beat so the user can read the card before the run starts
    let t = 1000;
    const at = (fn, gap) => { simTimers.push(setTimeout(fn, t)); t += gap; };

    if (authored) {
      const turns = sim.turns[LANG] || sim.turns.zh;
      turns.forEach((turn, ti) => {
        at(() => { settleSteps(); push(askBubble(turn.ask)); }, ti === 0 ? 320 : 900);
        if (turn.say) {
          // agent "typing" beat, then the reply
          at(() => push(sayBubble(turn.say.replace(/\n/g, "<br>"))), 1250);
        }
        (turn.steps || []).forEach((s) => {
          at(() => { settleSteps(); push(stepLine(s)); }, 660);
        });
      });
      at(() => {
        settleSteps();
        push(`<div class="s-msg"><div class="s-av a">C</div><div style="flex:1">${simArtifact(sim, zone)}</div></div>`);
      }, 0);
    } else {
      const prompt = (aExample(agent) || "").split("\n").filter((s) => s.trim())[0] || aName(agent);
      const steps = aSteps(agent).slice(0, 4).map((s) => s.replace(/^\d+[.、)]\s*/, ""));
      at(() => push(askBubble(prompt)), 480);
      steps.forEach((s) => at(() => { settleSteps(); push(stepLine(s)); }, 640));
      at(() => {
        settleSteps();
        push(`<div class="s-msg"><div class="s-av a">C</div><div style="flex:1">${simSkeleton(agent, zone)}</div></div>`);
      }, 0);
    }

    foot.innerHTML = authored ? T("footSim") : T("footStruct");
  }

  function simArtifact(sim, zone) {
    const L = (o) => (o && o[LANG]) ? o[LANG] : (o && o.zh);
    let body = "";
    if (sim.art === "swot") {
      const d = L(sim.data);
      const q = (cls, label, arr) =>
        `<div class="swq ${cls}"><div class="qt">${label}</div><ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
      body = `<div class="swot">${q("s", T("swotS"), d.S)}${q("w", T("swotW"), d.W)}${q("o", T("swotO"), d.O)}${q("t", T("swotT"), d.T)}</div>`;
    } else if (sim.art === "brief") {
      body = L(sim.data).map((n) =>
        `<div class="nb"><div class="cat">${esc(n.cat)}</div>
         <div class="tx"><span class="lv ${n.lv}">${n.lv === "m" ? "MUST-KNOW" : "NICE-TO-KNOW"}</span>${esc(n.tx)}</div></div>`).join("");
    } else {
      const d = L(sim.data), rl = { h: T("rkH"), m: T("rkM"), l: T("rkL") };
      body = `<table><thead><tr>${d.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>
        ${d.rows.map((r) => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td>
          <td><span class="rk ${r[3]}">${rl[r[3]]}</span></td></tr>`).join("")}</tbody></table>`;
    }
    return `<div class="art"><h5><span class="k">${T("outLabel")}</span>${esc(L(sim.title))}</h5>${body}
            <div class="art-rec">${L(sim.rec)}</div></div>`;
  }

  function simSkeleton(agent, zone) {
    const rows = aSteps(agent).map((s, i) =>
      `<div class="skrow"><div class="skn">${i + 1}</div>
       <div class="skb"><div class="d">${esc(s.replace(/^\d+[.、)]\s*/, ""))}</div></div></div>`).join("");
    return `<div class="art"><h5><span class="k">${T("structLabel")}</span>${T("structTitle")}</h5>
            ${rows || `<div class="skb"><div class="d">${esc(aDesc(agent) || "")}</div></div>`}
            <div class="art-rec">${T("structNote")}</div></div>`;
  }
  function closeModal() {
    simTimers.forEach(clearTimeout); simTimers = [];
    modalBackdrop.classList.remove("show");
  }
  modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // ---------- Search ----------
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { searchResults.classList.remove("show"); return; }
    const m = AGENTS.filter((a) =>
      `${a.cname} ${a.ename} ${a.tagline} ${(EN[a.id] && EN[a.id].tagline) || ""}`.toLowerCase().includes(q)
    ).slice(0, 10);
    searchResults.innerHTML = m.length
      ? m.map((a) => { const z = zoneById[a.zone];
          return `<div class="sr-item" data-id="${a.id}"><span class="nm">${esc(aName(a))}</span><span class="zn" style="background:${z.color}">${esc(zName(z))}</span></div>`; }).join("")
      : `<div class="sr-item" style="cursor:default;color:#8a93a6">${T("noMatch")}</div>`;
    searchResults.classList.add("show");
    searchResults.querySelectorAll(".sr-item[data-id]").forEach((it) => it.addEventListener("click", () => {
      const agent = agentById[it.dataset.id];
      searchResults.classList.remove("show"); searchInput.value = ""; searchInput.blur();
      enterRoom(agent.zone, () => openModal(agent.id));
    }));
  }
  searchInput.addEventListener("input", () => runSearch(searchInput.value));
  document.addEventListener("click", (e) => { if (!e.target.closest("#searchWrap")) searchResults.classList.remove("show"); });

  // ---------- Sidebar / hint ----------
  const sidebar = document.getElementById("sidebar");
  document.getElementById("hamburger").addEventListener("click", () => sidebar.classList.toggle("open"));
  document.getElementById("hintClose").addEventListener("click", () => (document.getElementById("hint").style.display = "none"));

  // ---------- Viewport: shift the 3D framing right so the scene centers in the
  // visible stage (the 256px sidebar overlays the canvas on desktop) ----------
  function applyViewOffset() {
    const W = window.innerWidth, H = window.innerHeight;
    const side = W > 860 ? 256 : 0;   // sidebar is off-canvas on mobile
    camera.aspect = W / H;
    if (side) {
      // Render a virtual frame that is `side` wider and take the LEFT portion, so the
      // scene's centre lands to the right of the sidebar (in the visible stage).
      camera.setViewOffset(W + side, H, 0, 0, W, H);
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }

  // ---------- Resize ----------
  window.addEventListener("resize", applyViewOffset);
  applyViewOffset();

  // ---------- Language switching ----------
  function applyStaticText() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = UI[LANG][el.dataset.i18n];
      // {z} / {a} keep the brand line in step with the data files
      if (typeof v === "string")
        el.innerHTML = v.replace("{z}", ZONES.length).replace("{a}", AGENTS.length);
    });
    searchInput.placeholder = T("searchPh");
    document.documentElement.lang = isEN() ? "en" : "zh-Hant";
    document.title = isEN()
      ? "M365 Copilot Agent — Planet"
      : "M365 Copilot Agent — 星球";
  }

  function retextureScene() {
    // the two big 3D wordmarks: the arch header and the plaza welcome line
    if (shellGroup.userData.nameP) {
      const m = shellGroup.userData.nameP.material;
      m.map.dispose();
      m.map = textTexture(T("parkSign"), 1120, 150, "800 76px 'Segoe UI'", "#d8f4ff", "#2f9fd8");
      m.needsUpdate = true;
    }
    if (plazaGroup.userData.title) {
      const m = plazaGroup.userData.title.material;
      m.map.dispose();
      m.map = textTexture(T("plazaWelcome"), 1180, 112, "800 52px 'Segoe UI'", "#d8f4ff", "#2f9fd8");
      m.needsUpdate = true;
    }
    // ride signage + enter hint
    pavHi.forEach((ph) => {
      const tex = signTexture(ph.zone);
      ph.signMeshes.forEach((m) => { m.material.map.dispose(); m.material.map = tex; m.material.needsUpdate = true; });
      if (ph.hintMesh) {
        ph.hintMesh.material.map.dispose();
        ph.hintMesh.material.map = textTexture(T("pavEnter"), 512, 100, "700 54px 'Segoe UI'",
          hexToRgba(ph.zone.color, 1), ph.zone.color);
        ph.hintMesh.material.needsUpdate = true;
      }
    });
    // department rooms are built lazily — drop them so they rebuild in the new language
    Object.keys(rooms).forEach((id) => {
      const r = rooms[id];
      scene.remove(r.group);
      r.group.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
        }
      });
      delete rooms[id];
    });
    roomCarousels.length = 0;
  }

  function setLang(next) {
    if (next === LANG) return;
    LANG = next;
    localStorage.setItem(LANG_KEY, LANG);
    document.querySelectorAll("#langSeg button").forEach((b) =>
      b.classList.toggle("on", b.dataset.lang === LANG));
    applyStaticText();
    renderSidebar();
    hideZoneHover();
    const wasRoom = mode === "room";
    const roomZone = curZoneId;
    closeModal();
    retextureScene();
    if (wasRoom && roomZone) {
      // rebuild and re-enter the same room in the new language
      enterRoom(roomZone);
    }
  }

  document.getElementById("langSeg").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (b) setLang(b.dataset.lang);
  });
  // reflect the detected language on first paint
  document.querySelectorAll("#langSeg button").forEach((b) =>
    b.classList.toggle("on", b.dataset.lang === LANG));
  applyStaticText();

  // ---------- Animate ----------
  const camPos = new THREE.Vector3();
  const focusPt = new THREE.Vector3();
  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.016;
    controls.update();
    camera.getWorldPosition(camPos);
    // the central carousel turns steadily; its horses rise and fall on their poles
    if (plazaGroup.userData.ride) {
      plazaGroup.userData.ride.rotation.y = t * 0.16;
      (plazaGroup.userData.mounts || []).forEach((m) => {
        m.horse.position.y = m.baseY + Math.sin(t * 1.7 + m.phase) * 0.55;
      });
    }
    if (plazaGroup.userData.emblem) {
      const em = plazaGroup.userData.emblem;
      em.rotation.y = t * 0.16;   // turn with the ride below it
    }
    // clouds drift slowly around the park and always face the camera
    clouds.forEach((c) => {
      c.a += c.speed * 0.02;
      c.mesh.position.x = Math.cos(c.a) * c.r;
      c.mesh.position.z = Math.sin(c.a) * c.r;
      c.mesh.lookAt(camPos.x, c.mesh.position.y, camPos.z);
    });
    // rides that move: the wheel turns, the small carousel spins, the rocket flickers
    zoneGroups.forEach(({ group }) => {
      if (group.userData.wheel) {
        const w = group.userData.wheel;
        w.rotation.z = t * 0.13;
        // gondolas swing on their pins, so counter-rotate to keep them level
        (group.userData.wheelCars || []).forEach((c, i) => {
          c.rotation.z = -w.rotation.z + Math.sin(t * 1.1 + i) * 0.05;
        });
      }
      if (group.userData.spin) group.userData.spin.rotation.y = t * 0.34;
      if (group.userData.flame) {
        const f = group.userData.flame;
        f.scale.set(1, 0.82 + Math.sin(t * 9) * 0.16, 1);
        f.material.opacity = 0.6 + Math.sin(t * 12) * 0.16;
      }
    });
    // room: the carousel is turned MANUALLY by dragging; here we only apply
    // gentle floating bob + a little inertial drift after a drag ends.
    if (mode === "room") {
      // BULLETPROOF recovery: keep the focus pinned to the room center and the camera
      // distance clamped every frame, so no amount of zooming can ever get you lost.
      controls.target.copy(roomLook);
      const off = camera.position.clone().sub(roomLook);
      const d = off.length();
      const cd = Math.max(4, Math.min(roomMaxDist, d));
      if (Math.abs(cd - d) > 1e-4 || d < 1e-4) {
        if (d < 1e-4) off.set(0, 0, 1);
        camera.position.copy(roomLook).add(off.setLength(cd));
      }
      roomCarousels.forEach(({ carousel, baseY }) => {
        carousel.position.y = baseY + Math.sin(t * 0.9) * 0.12;
      });
      if (!dragTurn.active && Math.abs(dragTurn.vel) > 0.0001) {
        const car = activeCarousel();
        if (car) car.rotation.y += dragTurn.vel;
        dragTurn.vel *= 0.94; // friction
      }
    }
    // pavilion hover highlight: slow, calm focus on the hovered department
    for (const ph of pavHi) {
      const target = (ph.zoneId === hoveredZoneId && mode === "lobby") ? 1 : 0;
      ph.k += (target - ph.k) * 0.05;
      if (Math.abs(ph.k) < 0.002 && target === 0) ph.k = 0;
      ph.frameMat.emissiveIntensity = ph.baseEmissive + ph.k * 1.1;
      ph.ring.material.opacity = ph.k * 0.8;
      ph.beam.material.opacity = ph.k * 0.14;
      const pop = 1 + ph.k * 0.05;
      ph.group.scale.set(pop, PAV_H_SCALE * pop, pop);
      ph.group.position.y = ph.k * 0.4;
    }
    // The atrium focus stays pinned to the centre (so you can never spin off into space).
    // Hovering a pavilion ORBITS the camera around that centre until the pavilion is
    // framed dead-centre — the target itself never moves.
    // NOTE: skipped while parked outside or mid-flight, otherwise the exterior view gets
    // yanked back inside the shell and the fly-in animation stutters.
    if (mode === "lobby" && !atExterior && !flightRAF) {
      focusPt.set(INTERIOR.look.x, INTERIOR.look.y, INTERIOR.look.z);
      controls.target.lerp(focusPt, 0.05);

      // Keep a comfortable downward viewing angle at every zoom level, and never let
      // the camera punch out through the curtain wall.
      const off = camera.position.clone().sub(controls.target);
      const d = off.length();
      // 1) minimum elevation — stops the plaza disc filling the screen when zoomed in
      const MIN_ELEV = 0.46;                       // sin(elevation) ≈ 27°
      if (off.y / d < MIN_ELEV) {
        const horiz = Math.hypot(off.x, off.z) || 0.001;
        const ny = d * MIN_ELEV;
        const nh = Math.sqrt(Math.max(0.001, d * d - ny * ny)) / horiz;
        off.x *= nh; off.z *= nh; off.y = ny;
        camera.position.copy(controls.target).add(off);
      }
      // 2) stay inside the glass shell and under the roof
      const hr = Math.hypot(camera.position.x - controls.target.x,
                            camera.position.z - controls.target.z);
      // an open-air park has no ceiling to bump into — allow a wide, airy viewing envelope
      const maxHr = SHELL_R + 16;
      if (hr > maxHr) {
        const k = maxHr / hr;
        camera.position.x = controls.target.x + (camera.position.x - controls.target.x) * k;
        camera.position.z = controls.target.z + (camera.position.z - controls.target.z) * k;
      }
      if (camera.position.y > 58) camera.position.y = 58;

      if (hoveredZoneId && !orbiting) {
        const z = zoneById[hoveredZoneId];
        // camera must sit on the OPPOSITE side of the centre from the pavilion, so the
        // pavilion ends up straight ahead in the middle of the screen
        const cx = camera.position.x - controls.target.x;
        const cz = camera.position.z - controls.target.z;
        const cur = Math.atan2(cx, cz);
        const want = Math.atan2(-(z.center.x - controls.target.x), -(z.center.z - controls.target.z));
        // shortest angular path
        let diff = want - cur;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        // while the view is still swinging the pavilion to centre, the geometry slides
        // under a stationary cursor — latch the hover so the target can't change mid-swing
        hoverSettling = Math.abs(diff) > 0.05;
        if (Math.abs(diff) > 0.002) {
          const a = cur + diff * 0.035;                 // slow, calm rotation
          const r = Math.hypot(cx, cz);
          camera.position.x = controls.target.x + Math.sin(a) * r;
          camera.position.z = controls.target.z + Math.cos(a) * r;
        }
      }
    }
    // the park is open-air, so nothing needs hiding as the camera moves around
    wallStruct.visible = true;
    renderer.render(scene, camera);
  }

  // ---------- Boot: exterior → hold 1s → smooth fly-in to the atrium ----------
  ctxAgents = clickAgents; ctxPortals = clickPortals;
  requestAnimationFrame(() => {
    document.getElementById("loading").style.display = "none";
    // park outside first so the whole building reads, hold, then fly in
    atExterior = true;
    controls.minDistance = 40; controls.maxDistance = 320;
    animateCamera(EXTERIOR.pos, EXTERIOR.look, 1600, () => {
      setTimeout(() => {
        // stay in "exterior" state for the whole flight so the lobby camera
        // constraints never kick in mid-animation (that caused a visible jump)
        animateCamera(INTERIOR.pos, INTERIOR.look, 2400, () => {
          atExterior = false;
          controls.minDistance = LOBBY_MIN_DIST; controls.maxDistance = 105;
        });
      }, 1000);
    });
  });
  animate();
})();
