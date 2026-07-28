/* =========================================================
   M365 Copilot Agent 智慧大樓 — exterior + interior, tech contrast
   Reuses ZONES / AGENTS from data.js
   ========================================================= */

(function () {
  "use strict";

  const canvas = document.getElementById("three-canvas");
  const tooltip = document.getElementById("tooltip");
  const esc = (s) => (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // ---------- Language ----------
  // default follows the browser: any zh-* locale gets Chinese, everything else English
  const LANG_KEY = "copilotBuildingLang";
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
      brandT1: "M365 Copilot Agent 智慧大樓",
      brandT2: "Power of Copilot · 8 大部門 · 53 位 AI 助理",
      btnExterior: "看外觀", btnAtrium: "進中庭", btnBack: "返回大廳",
      sideTitle: "樓層導覽 · 8 大部門",
      hintText: "🖱️ 大廳：拖曳環顧·點體驗館進入　·　房間內：拖曳轉動卡片·點卡看詳情",
      searchPh: "搜尋 Agent 名稱或關鍵字…",
      noMatch: "沒有符合的 Agent",
      licReq: "需 M365 Copilot 授權", licFree: "免授權即可使用",
      licReqShort: "需授權", licFreeShort: "免授權",
      tabRun: "▶ 模擬試跑", tabInfo: "痛點 · 上手 · 提示詞",
      simBadge: "⚠ 模擬示意 · 非真實執行結果", replay: "↻ 重播",
      you: "你", secWhat: "這個 Agent 能幫你做什麼", secPain: "你可能正在經歷",
      secStart: "快速上手", secExample: "範例提示詞", copy: "複製", copied: "已複製 ✓",
      outLabel: "產出", structLabel: "產出結構", structTitle: "這個 Agent 的工作流程",
      structNote: "依官方 Agent 指示整理,實際產出內容依你的輸入而定。",
      footSim: "以上為<b>模擬示意</b>,用於說明這個 Agent 的對話方式與產出型態,非真實執行結果。內容不指涉特定真實企業,不含捏造的具體數據。",
      footStruct: "以上為依官方指示整理的<b>產出結構示意</b>,呈現這個 Agent 的工作流程與產出骨架,不含模擬內容。",
      swotS: "優勢 STRENGTHS", swotW: "劣勢 WEAKNESSES",
      swotO: "機會 OPPORTUNITIES", swotT: "威脅 THREATS",
      rkH: "高", rkM: "中", rkL: "低",
      cardSolves: "解決這些問題", cardSteps: (n) => n + " 步驟即可上手", cardCta: "▶  查看詳細",
      pavEnter: "點擊進入 ▸", agentsSuffix: "AGENTS",
      deckSub: (n) => n + " 位 AI 助理", enterExp: "點此進入",
    },
    en: {
      brandT1: "M365 Copilot Agent Building",
      brandT2: "Power of Copilot · 8 departments · 53 AI assistants",
      btnExterior: "Exterior", btnAtrium: "Atrium", btnBack: "Back to lobby",
      sideTitle: "Directory · 8 departments",
      hintText: "🖱️ Lobby: drag to look around · click a pavilion to enter　·　Inside: drag to spin cards · click a card for details",
      searchPh: "Search agents by name or keyword…",
      noMatch: "No matching agent",
      licReq: "Requires M365 Copilot license", licFree: "No add-on license needed",
      licReqShort: "License", licFreeShort: "Free",
      tabRun: "▶ Simulated run", tabInfo: "Pain points · Getting started · Prompts",
      simBadge: "⚠ Illustrative simulation · not a real execution", replay: "↻ Replay",
      you: "You", secWhat: "What this agent does for you", secPain: "You might be experiencing",
      secStart: "Getting started", secExample: "Example prompts", copy: "Copy", copied: "Copied ✓",
      outLabel: "OUTPUT", structLabel: "STRUCTURE", structTitle: "How this agent works",
      structNote: "Compiled from the official agent instructions. Actual output depends on your input.",
      footSim: "The above is an <b>illustrative simulation</b> showing how this agent converses and what it produces. It is not a real execution, references no specific real company, and contains no fabricated figures.",
      footStruct: "The above is a <b>structural outline</b> compiled from the official instructions, showing the agent's workflow and output skeleton. It contains no simulated content.",
      swotS: "STRENGTHS", swotW: "WEAKNESSES",
      swotO: "OPPORTUNITIES", swotT: "THREATS",
      rkH: "HIGH", rkM: "MED", rkL: "LOW",
      cardSolves: "Solves these problems", cardSteps: (n) => n + " steps to get started", cardCta: "▶  View details",
      pavEnter: "Click to enter ▸", agentsSuffix: "AGENTS",
      deckSub: (n) => n + " AI assistants", enterExp: "Enter",
    },
  };
  const T = (k) => UI[LANG][k];

  // ---------- Layout ----------
  const RADIUS = 30;
  const PLAZA_R = 11;
  const PAV_W = 13;
  const PAV_D = 11;
  const PAV_H_SCALE = 1.9;   // make each department pavilion taller (height only, not wider)
  const SHELL_R = 48;
  const WALL_H = 26;
  const OFF = Math.PI / ZONES.length; // keep entrance (+Z) between two pavilions
  // the atrium target is pinned to the centre, so zooming in heads straight for the
  // central emblem — keep a respectful distance from it
  const LOBBY_MIN_DIST = 26;

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
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1222);
  scene.fog = new THREE.Fog(0x0b1222, 90, 210);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 600);
  const EXTERIOR = { pos: { x: 8, y: 20, z: SHELL_R + 62 }, look: { x: 0, y: 11, z: 0 } };
  const INTERIOR = { pos: { x: 0, y: 18, z: 31 }, look: { x: 0, y: 3, z: 0 } };
  camera.position.set(10, 14, SHELL_R + 82);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;         // target is pinned to the atrium centre
  controls.enableZoom = false;        // replaced by custom zoom below
  controls.minDistance = LOBBY_MIN_DIST;
  controls.maxDistance = 90;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 5, 0);
  controls.update();

  // ---------- Lighting ----------
  scene.add(new THREE.HemisphereLight(0x9dbcff, 0x0a0e1a, 0.5));
  scene.add(new THREE.AmbientLight(0x33415f, 0.55));
  const key = new THREE.DirectionalLight(0xe6f0ff, 0.85);
  key.position.set(38, 62, 34);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1; key.shadow.camera.far = 240;
  key.shadow.camera.left = -85; key.shadow.camera.right = 85;
  key.shadow.camera.top = 85; key.shadow.camera.bottom = -85;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x4f7cff, 0.35);
  rim.position.set(-42, 30, -52);
  scene.add(rim);

  // ---------- Sky ----------
  (function () {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide, fog: false,
      uniforms: {
        top: { value: new THREE.Color(0x060a14) },
        mid: { value: new THREE.Color(0x122036) },
        bot: { value: new THREE.Color(0x1d3f5a) },
      },
      vertexShader: "varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "varying vec3 p;uniform vec3 top;uniform vec3 mid;uniform vec3 bot;void main(){float h=normalize(p).y;vec3 c=h>0.0?mix(mid,top,smoothstep(0.0,0.7,h)):mix(mid,bot,smoothstep(0.0,-0.4,h));gl_FragColor=vec4(c,1.0);}",
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(280, 32, 20), mat));
  })();

  // ---------- Stars ----------
  (function () {
    const n = 900, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 200 + Math.random() * 60, th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random());
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph) + 40;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0x9fb8e8, size: 0.8, transparent: true, opacity: 0.7, depthWrite: false })));
  })();

  // ---------- Exterior ground ----------
  (function () {
    const g = new THREE.Mesh(new THREE.CircleGeometry(200, 64),
      new THREE.MeshStandardMaterial({ color: 0x0a1122, roughness: 0.9, metalness: 0.1 }));
    g.rotation.x = -Math.PI / 2; g.position.y = -0.06; g.receiveShadow = true;
    scene.add(g);
    const grid = new THREE.GridHelper(400, 100, 0x21507e, 0x152741);
    grid.position.y = -0.03; grid.material.transparent = true; grid.material.opacity = 0.45;
    scene.add(grid);
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
    // department name — large, luminous, softly haloed so it reads over any background
    fit(zName(zone), 300, 132, SAFE, "'Segoe UI Light', 'Segoe UI', sans-serif");
    ctx.shadowColor = hexToRgba(zone.color, 0.85);
    ctx.shadowBlur = 34;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(zName(zone), W / 2, 128);
    ctx.shadowBlur = 0;
    // thin rule in the department color
    ctx.strokeStyle = hexToRgba(zone.color, 0.75);
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(W / 2 - 170, 220); ctx.lineTo(W / 2 + 170, 220); ctx.stroke();
    // secondary name — big, with tracking that yields before the type size does
    ctx.fillStyle = hexToRgba(zone.color, 1);
    tracked((zSub(zone) || "").toUpperCase(), 600, 60, 9, 286, SAFE);
    // agent count
    ctx.fillStyle = "rgba(228,238,255,0.92)";
    tracked(zone.count + " " + T("agentsSuffix"), 700, 56, 5, 370, SAFE);
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
    // glowing icon disc
    ctx.save();
    ctx.shadowColor = zone.color; ctx.shadowBlur = 60;
    ctx.fillStyle = hexToRgba(zone.color, 0.18);
    ctx.beginPath(); ctx.arc(150, 150, 96, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.font = "120px 'Segoe UI Emoji', sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(zone.icon, 150, 158);
    // name
    ctx.textAlign = "left";
    ctx.save(); ctx.shadowColor = zone.color; ctx.shadowBlur = 24;
    ctx.fillStyle = "#f2f7ff";
    ctx.font = "800 92px 'Segoe UI', sans-serif";
    ctx.fillText(zName(zone), 290, 118);
    ctx.restore();
    ctx.fillStyle = hexToRgba(zone.color, 1);
    ctx.font = "600 40px 'Segoe UI', sans-serif";
    ctx.fillText((zSub(zone) || "").toUpperCase() + "  ·  " + T("deckSub")(zone.count), 294, 188);
    // scenario description
    ctx.fillStyle = "#aebbd4";
    ctx.font = "40px 'Segoe UI', sans-serif";
    wrapText(ctx, zDesc(zone) || "", 290 + 0, 280, W - 340, 54, 2);
    // realign wrapText used center; fix by manual left-draw
    return canvasTex(cv);
  }

  // ---------- Building shell: glass curtain wall + roof + entrance ----------
  const ENTRANCE_HALF = 0.28; // radians of the entrance gap half-width (around +Z)
  const shellGroup = new THREE.Group();
  scene.add(shellGroup);
  const wallStruct = new THREE.Group(); // mullions etc. — hidden while camera is inside the atrium
  shellGroup.add(wallStruct);
  function shellAdd(o) { shellGroup.add(o); }
  buildShellReal();

  function buildShellReal() {
    const segCount = 60;
    const segAng = (Math.PI * 2) / segCount;
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x2a4d78, metalness: 0.45, roughness: 0.16,
      transparent: true, opacity: 0.34, side: THREE.BackSide,
    });
    const mullionMat = new THREE.MeshStandardMaterial({ color: 0x2b3b55, metalness: 0.7, roughness: 0.35 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x5aa0ff });

    for (let i = 0; i < segCount; i++) {
      const a = i * segAng + Math.PI / 2; // start near +Z
      // skip segments in the entrance gap (near +Z = angle PI/2)
      let da = Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2));
      if (Math.abs(da) < ENTRANCE_HALF) continue;
      const x = Math.cos(a) * SHELL_R, z = Math.sin(a) * SHELL_R;
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(SHELL_R * segAng * 1.02, WALL_H), glassMat);
      panel.position.set(x, WALL_H / 2, z);
      panel.lookAt(0, WALL_H / 2, 0);
      shellAdd(panel);
      // vertical mullion
      const mull = new THREE.Mesh(new THREE.BoxGeometry(0.18, WALL_H, 0.4), mullionMat);
      const ma = a - segAng / 2;
      mull.position.set(Math.cos(ma) * SHELL_R, WALL_H / 2, Math.sin(ma) * SHELL_R);
      mull.lookAt(0, WALL_H / 2, 0);
      wallStruct.add(mull);
      // horizontal glow band mid-height
      const band = new THREE.Mesh(new THREE.PlaneGeometry(SHELL_R * segAng * 1.02, 0.12), glowMat);
      band.position.set(x, WALL_H * 0.62, z);
      band.lookAt(0, WALL_H * 0.62, 0);
      band.material = new THREE.MeshBasicMaterial({ color: 0x5aa0ff, transparent: true, opacity: 0.5, side: THREE.BackSide });
      shellAdd(band);
    }

    // base ring (parapet)
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(SHELL_R + 0.4, SHELL_R + 0.8, 1.2, segCount, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x141c30, metalness: 0.5, roughness: 0.5, side: THREE.DoubleSide })
    );
    base.position.y = 0.6;
    shellAdd(base);

    // roof ring with central oculus — glass skylight
    const roof = new THREE.Mesh(
      new THREE.RingGeometry(16, SHELL_R + 1, segCount),
      new THREE.MeshStandardMaterial({
        color: 0x9ec8ff, metalness: 0.35, roughness: 0.16,
        transparent: true, opacity: 0.2, side: THREE.DoubleSide,
      })
    );
    roof.rotation.x = -Math.PI / 2; roof.position.y = WALL_H;
    roof.receiveShadow = true;
    shellAdd(roof);
    // radial skylight mullions across the glass roof
    for (let i = 0; i < segCount; i += 5) {
      const a = i * segAng;
      const mr = new THREE.Mesh(new THREE.BoxGeometry(SHELL_R - 15, 0.12, 0.16),
        new THREE.MeshStandardMaterial({ color: 0x2b3b55, metalness: 0.7, roughness: 0.35 }));
      mr.position.set(Math.cos(a) * (16 + (SHELL_R - 15) / 2), WALL_H, Math.sin(a) * (16 + (SHELL_R - 15) / 2));
      mr.rotation.y = -a;
      shellAdd(mr);
    }
    // glowing oculus rim
    const oc = new THREE.Mesh(new THREE.TorusGeometry(16, 0.18, 10, 80), new THREE.MeshBasicMaterial({ color: 0x5aa0ff }));
    oc.rotation.x = Math.PI / 2; oc.position.y = WALL_H;
    shellAdd(oc);
    // crown parapet
    const crown = new THREE.Mesh(new THREE.TorusGeometry(SHELL_R + 0.6, 0.35, 10, segCount),
      new THREE.MeshStandardMaterial({ color: 0x22314c, metalness: 0.7, roughness: 0.3 }));
    crown.rotation.x = Math.PI / 2; crown.position.y = WALL_H;
    shellAdd(crown);

    // ---------- Entrance: canopy + pillars + logo + name ----------
    const ex = 0, ez = SHELL_R; // entrance faces +Z
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a3b58, metalness: 0.6, roughness: 0.35 });
    // canopy
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(22, 0.7, 7.5), frameMat);
    canopy.position.set(ex, 14.2, ez + 2.6);
    canopy.castShadow = true;
    shellAdd(canopy);
    // two pillars
    [-9.5, 9.5].forEach((px) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.9, 14.2, 0.9), frameMat);
      p.position.set(ex + px, 7.1, ez + 5.8);
      p.castShadow = true;
      shellAdd(p);
    });
    // entrance floor mat (glowing)
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(18, 11),
      new THREE.MeshBasicMaterial({ color: 0x0f6cbd, transparent: true, opacity: 0.25 }));
    mat.rotation.x = -Math.PI / 2; mat.position.set(ex, 0.02, ez + 3.5);
    shellAdd(mat);

    // big Copilot logo above the entrance (real PNG)
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 8.4),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
    logo.position.set(ex, 19.5, ez + 0.4);
    shellAdd(logo);
    // building name
    const nameTex = textTexture("COPILOT AGENT 智慧大樓", 1120, 150, "800 76px 'Segoe UI'", "#eaf2ff", "#4f7cff");
    const nameP = new THREE.Mesh(new THREE.PlaneGeometry(21, 2.8),
      new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    nameP.position.set(ex, 11.3, ez + 0.35);
    shellAdd(nameP);
    // entrance uplights
    const eL = new THREE.PointLight(0x5aa0ff, 0.8, 46); eL.position.set(ex, 14, ez + 6); shellAdd(eL);
  }

  // ---------- Interior reflective floor ----------
  (function () {
    const geo = new THREE.CircleGeometry(SHELL_R - 1.5, 96);
    let floor;
    if (THREE.Reflector) {
      floor = new THREE.Reflector(geo, {
        clipBias: 0.003,
        textureWidth: Math.min(2048, window.innerWidth * (window.devicePixelRatio || 1)),
        textureHeight: Math.min(2048, window.innerHeight * (window.devicePixelRatio || 1)),
        color: 0x2a3550,
      });
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = 0.01;
      scene.add(floor);
      // dark translucent overlay to tone the mirror down to a glossy floor
      const overlay = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x0c1424, transparent: true, opacity: 0.55 }));
      overlay.rotation.x = -Math.PI / 2; overlay.position.y = 0.02;
      scene.add(overlay);
    } else {
      floor = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x101a2e, roughness: 0.25, metalness: 0.6 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = 0.01; floor.receiveShadow = true;
      scene.add(floor);
    }
    // concentric glowing rings
    for (let r = 16; r <= SHELL_R - 3; r += 11) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.04, r + 0.04, 100),
        new THREE.MeshBasicMaterial({ color: 0x2f5f8f, transparent: true, opacity: 0.4 }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.05;
      scene.add(ring);
    }
  })();

  // ---------- Central plaza + emblem ----------
  const plazaGroup = new THREE.Group();
  scene.add(plazaGroup);
  {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(PLAZA_R, PLAZA_R, 0.25, 72),
      new THREE.MeshStandardMaterial({ color: 0x162136, roughness: 0.4, metalness: 0.4 }));
    disc.position.y = 0.12; disc.receiveShadow = true;
    plazaGroup.add(disc);
    const trim = new THREE.Mesh(new THREE.TorusGeometry(PLAZA_R, 0.09, 12, 90),
      new THREE.MeshBasicMaterial({ color: 0x5aa0ff }));
    trim.rotation.x = Math.PI / 2; trim.position.y = 0.26;
    plazaGroup.add(trim);

    // 3D floating emblem: clean logo, no frame — two back-to-back logo planes
    // that revolve, so it reads as a genuine 3D turning logo.
    const emblem = new THREE.Group();
    emblem.position.y = 7;
    const SZ = 8.4;
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
    // soft radial glow disc behind the emblem (billboards to camera)
    const glowTex = (function () {
      const cv = document.createElement("canvas"); cv.width = cv.height = 256;
      const c = cv.getContext("2d");
      const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, "rgba(140,182,255,0.45)"); g.addColorStop(1, "rgba(140,182,255,0)");
      c.fillStyle = g; c.fillRect(0, 0, 256, 256);
      return canvasTex(cv);
    })();
    const glowDisc = new THREE.Mesh(new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    glowDisc.position.y = 7;
    plazaGroup.add(glowDisc);
    plazaGroup.userData.glowDisc = glowDisc;
    const eLight = new THREE.PointLight(0x8ab6ff, 1.2, 40); eLight.position.y = 7; plazaGroup.add(eLight);

    const titleTex = textTexture("歡迎進入 Copilot Agent 智慧大樓", 980, 112, "800 56px 'Segoe UI'", "#dbe8ff", "#3a6ea5");
    const title = new THREE.Mesh(new THREE.PlaneGeometry(11, 1.26), new THREE.MeshBasicMaterial({ map: titleTex, transparent: true }));
    title.rotation.x = -Math.PI / 2; title.position.set(0, 0.28, PLAZA_R - 2.4);
    plazaGroup.add(title);
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
    const signTex = textTexture("← 返回大廳", 420, 120, "700 56px 'Segoe UI'", "#eaf2ff", "#4f7cff");
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

    const wallMat = new THREE.MeshStandardMaterial({ color: 0x16203a, roughness: 0.6, metalness: 0.35 });
    // glass curtain-wall material for the pavilion shell (back/side walls + roof)
    const glassWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(zone.color), metalness: 0.4, roughness: 0.18,
      transparent: true, opacity: 0.24, side: THREE.DoubleSide,
    });

    // floor pad
    const pad = new THREE.Mesh(new THREE.BoxGeometry(PAV_W, 0.2, PAV_D), wallMat);
    pad.position.set(0, 0.1, 0); pad.receiveShadow = true;
    g.add(pad);
    // glowing floor inlay in dept color
    const inlay = new THREE.Mesh(new THREE.PlaneGeometry(PAV_W - 1.2, PAV_D - 1.2),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.10 }));
    inlay.rotation.x = -Math.PI / 2; inlay.position.y = 0.21;
    g.add(inlay);

    // back + side walls (glass curtain wall)
    const back = new THREE.Mesh(new THREE.BoxGeometry(PAV_W, 5.6, 0.3), glassWallMat);
    back.position.set(0, 2.9, -PAV_D / 2 + 0.15); back.castShadow = false; back.receiveShadow = true;
    g.add(back);
    // thin metal mullions framing the back glass so it still reads as a wall
    [-0.5, 0, 0.5].forEach((f) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.14, 5.6, 0.34), wallMat);
      m.position.set(f * (PAV_W - 1), 2.9, -PAV_D / 2 + 0.16); g.add(m);
    });
    [-1, 1].forEach((s) => {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.24, 5.6, PAV_D), glassWallMat);
      side.position.set(s * (PAV_W / 2 - 0.12), 2.9, 0);
      g.add(side);
    });
    // back wall glowing accent band
    const band = new THREE.Mesh(new THREE.PlaneGeometry(PAV_W - 0.6, 0.7),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.85 }));
    band.position.set(0, 4.5, -PAV_D / 2 + 0.32);
    g.add(band);

    // roof canopy (glass skylight with a thin metal perimeter frame)
    const roof = new THREE.Mesh(new THREE.BoxGeometry(PAV_W, 0.12, PAV_D), glassWallMat);
    roof.position.set(0, 5.75, -0.2); roof.castShadow = false;
    g.add(roof);
    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x22314c, metalness: 0.7, roughness: 0.3 });
    const RW2 = PAV_W + 0.5, RD2 = PAV_D + 0.5, ry = 5.72;
    [[0, -RD2 / 2, RW2, 0.22], [0, RD2 / 2 - 0.4, RW2, 0.22]].forEach(([px, pz, w, d]) => {
      const e = new THREE.Mesh(new THREE.BoxGeometry(w, 0.22, d), edgeMat);
      e.position.set(px, ry, pz - 0.2); g.add(e);
    });
    [-1, 1].forEach((s) => {
      const e = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, RD2), edgeMat);
      e.position.set(s * RW2 / 2, ry, -0.2); g.add(e);
    });

    // portal frame (colored, glowing)
    const frameMat = new THREE.MeshStandardMaterial({ color: zone.color, metalness: 0.4, roughness: 0.3,
      emissive: new THREE.Color(zone.color), emissiveIntensity: 0.35 });
    [-1, 1].forEach((s) => {
      const pil = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.8, 0.4), frameMat);
      pil.position.set(s * (PAV_W / 2 - 0.22), 2.9, PAV_D / 2 - 0.22); pil.castShadow = true;
      g.add(pil);
    });
    const beam = new THREE.Mesh(new THREE.BoxGeometry(PAV_W, 0.45, 0.4), frameMat);
    beam.position.set(0, 5.6, PAV_D / 2 - 0.22);
    g.add(beam);

    // department name: clean lettering floating at the FRONT of the pavilion (in front of
    // the glass, at the entrance edge). depthTest off + high renderOrder → never occluded.
    const NAME_Y = 5.4;
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

    // portal click plane (enter)
    const portal = new THREE.Mesh(new THREE.PlaneGeometry(PAV_W - 1, 5.2), new THREE.MeshBasicMaterial({ visible: false }));
    portal.position.set(0, 2.7, PAV_D / 2 - 0.25);
    g.add(portal);
    clickPortals.push({ mesh: portal, zoneId: zone.id });

    // walkway from plaza to pavilion (glowing strip)
    const d = zone.dir;
    const s0 = new THREE.Vector3(d.x * (PLAZA_R + 0.2), 0.05, d.z * (PLAZA_R + 0.2));
    const s1 = new THREE.Vector3(zone.center.x - d.x * (PAV_D / 2 + 0.3), 0.05, zone.center.z - d.z * (PAV_D / 2 + 0.3));
    const mid = new THREE.Vector3().lerpVectors(s0, s1, 0.5);
    const len = s0.distanceTo(s1);
    const rot = -Math.atan2(d.z, d.x) + Math.PI / 2;
    const walk = new THREE.Mesh(new THREE.PlaneGeometry(2.6, len),
      new THREE.MeshStandardMaterial({ color: 0x18233c, roughness: 0.5, metalness: 0.3 }));
    walk.rotation.set(-Math.PI / 2, 0, rot); walk.position.copy(mid); walk.position.y = 0.04;
    scene.add(walk);
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.32, len),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.55 }));
    dash.rotation.copy(walk.rotation); dash.position.copy(mid); dash.position.y = 0.06;
    scene.add(dash);

    // subtle enter affordance below the department name
    const hintTex = textTexture(T("pavEnter"), 512, 100, "700 54px 'Segoe UI'", hexToRgba(zone.color, 1), zone.color);
    const hint = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.02),
      new THREE.MeshBasicMaterial({ map: hintTex, transparent: true,
        depthWrite: false, depthTest: false }));
    hint.position.set(0, 2.2, PAV_D / 2 + 1.6);
    hint.renderOrder = 20;
    gUp.add(hint);
    // glowing interior floor glow to signal it's enterable
    const glowPad = new THREE.Mesh(new THREE.CircleGeometry(3.2, 32),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.14 }));
    glowPad.rotation.x = -Math.PI / 2; glowPad.position.y = 0.22;
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
    pavHi.push({ zoneId: zone.id, group: g, frameMat, ring: hiRing, beam: hiBeam, baseEmissive: 0.35, k: 0,
                 zone, signMeshes: [nameMesh, nameBack], hintMesh: hint });
  });

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

    // ---------- Outdoor context so the glass walls actually read as glass ----------
    // (the room floats in dark space; without something visible outside, transparent
    //  glass over black just looks like a dark solid wall)
    // 1) gradient backdrop dome around the room — dept-color glow at the horizon
    const domeCan = document.createElement("canvas"); domeCan.width = 16; domeCan.height = 256;
    const dctx = domeCan.getContext("2d");
    const grad = dctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, "#05070d");
    grad.addColorStop(0.62, "#080d18");
    grad.addColorStop(0.86, hexToRgba(zone.color, 0.28));
    grad.addColorStop(1.0, hexToRgba(zone.color, 0.06));
    dctx.fillStyle = grad; dctx.fillRect(0, 0, 16, 256);
    const domeTex = new THREE.CanvasTexture(domeCan);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(150, 32, 20),
      new THREE.MeshBasicMaterial({ map: domeTex, side: THREE.BackSide, fog: false, depthWrite: false })
    );
    dome.position.set(0, 0, 0);
    grp.add(dome);
    // 2) wide ground grid extending far beyond the room (seen through the glass)
    const gridOut = new THREE.GridHelper(280, 70, new THREE.Color(zone.color), 0x1b2740);
    gridOut.material.transparent = true; gridOut.material.opacity = 0.32; gridOut.material.depthWrite = false;
    gridOut.position.y = -0.16;
    grp.add(gridOut);

    // floor (glossy dark) + center runway + edge glow lines
    const floor = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.3, RD),
      new THREE.MeshStandardMaterial({ color: 0x0e1626, roughness: 0.28, metalness: 0.55 }));
    floor.position.y = -0.15; floor.receiveShadow = true;
    grp.add(floor);
    const runway = new THREE.Mesh(new THREE.PlaneGeometry(3.4, RD - 2),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.12 }));
    runway.rotation.x = -Math.PI / 2; runway.position.set(0, 0.02, 2);
    grp.add(runway);
    [-1, 1].forEach((s) => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.14, RD),
        new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.5 }));
      line.rotation.x = -Math.PI / 2; line.position.set(s * (RW / 2 - 1), 0.03, 0);
      grp.add(line);
    });

    // walls (back + sides) — glass curtain wall, tinted with the department color
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x111a2e, roughness: 0.65, metalness: 0.3 });
    const glassWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(zone.color), metalness: 0.4, roughness: 0.2,
      transparent: true, opacity: 0.28, side: THREE.DoubleSide,
    });
    const back = new THREE.Mesh(new THREE.BoxGeometry(RW, RH, 0.4), glassWallMat);
    back.position.set(0, RH / 2, -RD / 2); back.receiveShadow = true;
    grp.add(back);
    [-1, 1].forEach((s) => {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.4, RH, RD), glassWallMat);
      side.position.set(s * RW / 2, RH / 2, 0);
      grp.add(side);
      for (let i = -1; i <= 1; i++) {
        const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.12, RH - 2),
          new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.35 }));
        strip.position.set(s * (RW / 2 - 0.25), RH / 2, i * 8);
        strip.rotation.y = -s * Math.PI / 2;
        grp.add(strip);
      }
    });
    // ceiling — glass skylight
    const ceil = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.2, RD), glassWallMat);
    ceil.position.y = RH;
    grp.add(ceil);
    // front wall (encloses the room so no void shows when orbiting)
    const front = new THREE.Mesh(new THREE.BoxGeometry(RW, RH, 0.4), glassWallMat);
    front.position.set(0, RH / 2, RD / 2);
    grp.add(front);
    // curtain-wall mullion frames (thin metal grid) so the glass reads clearly as glass
    const mulMat = new THREE.MeshStandardMaterial({ color: 0x2b3b55, metalness: 0.75, roughness: 0.3 });
    const addMullions = (w, cx, cz, along) => {
      // verticals
      for (let x = -w / 2; x <= w / 2 + 0.01; x += w / 6) {
        const v = new THREE.Mesh(new THREE.BoxGeometry(0.12, RH, 0.12), mulMat);
        if (along === "x") v.position.set(cx + x, RH / 2, cz); else v.position.set(cx, RH / 2, cz + x);
        grp.add(v);
      }
      // horizontals (2 bands)
      [RH * 0.34, RH * 0.68].forEach((y) => {
        const h = new THREE.Mesh(new THREE.BoxGeometry(along === "x" ? w : 0.12, 0.1, along === "x" ? 0.12 : w), mulMat);
        h.position.set(cx, y, cz); grp.add(h);
      });
    };
    addMullions(RW, 0, -RD / 2, "x");   // back
    addMullions(RW, 0, RD / 2, "x");    // front
    addMullions(RD, -RW / 2, 0, "z");   // left
    addMullions(RD, RW / 2, 0, "z");    // right
    const ceilGlow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, RD - 4),
      new THREE.MeshBasicMaterial({ color: 0xbcd4ff, transparent: true, opacity: 0.5 }));
    ceilGlow.rotation.x = Math.PI / 2; ceilGlow.position.set(0, RH - 0.16, 0);
    grp.add(ceilGlow);

    // giant header on the back wall + wash band
    const header = new THREE.Mesh(new THREE.PlaneGeometry(24, 8.4),
      new THREE.MeshBasicMaterial({ map: roomHeaderTexture(zone), transparent: true }));
    header.position.set(0, RH / 2 + 1.2, -RD / 2 + 0.25);
    grp.add(header);
    const wash = new THREE.Mesh(new THREE.PlaneGeometry(RW, 0.5),
      new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.8 }));
    wash.position.set(0, 0.9, -RD / 2 + 0.25);
    grp.add(wash);

    // lighting
    grp.add(new THREE.HemisphereLight(0xbcd0ff, 0x0a0e1a, 0.5));
    const kl = new THREE.PointLight(0xdfeaff, 0.6, 60); kl.position.set(0, RH - 1, 6); grp.add(kl);
    const cl = new THREE.PointLight(zone.color, 0.9, 55); cl.position.set(0, 5, -6); grp.add(cl);

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
      controls.minDistance = LOBBY_MIN_DIST; controls.maxDistance = 90;
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
      controls.minDistance = LOBBY_MIN_DIST; controls.maxDistance = 90;
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
      if (pz && mode === "lobby") showZoneHover(zoneById[pz.zoneId], e.clientX, e.clientY);
      else hideZoneHover();
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
  canvas.addEventListener("pointerleave", hideZoneHover);
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
      </div>`;

    modalEl.querySelector("#modalClose").addEventListener("click", closeModal);
    const cp = modalEl.querySelector(".copy-btn");
    if (cp) cp.addEventListener("click", () => {
      navigator.clipboard.writeText(ex);
      cp.textContent = T("copied");
      setTimeout(() => (cp.textContent = T("copy")), 1500);
    });
    modalEl.querySelectorAll(".m-tab").forEach((t) => t.addEventListener("click", () => {
      modalEl.querySelectorAll(".m-tab").forEach((x) => x.classList.toggle("on", x === t));
      modalEl.querySelectorAll(".m-pane").forEach((p) => p.classList.remove("on"));
      modalEl.querySelector(t.dataset.pane === "run" ? "#paneRun" : "#paneInfo").classList.add("on");
      if (t.dataset.pane === "run") playSim(agent, zone, sim);
    }));
    modalEl.querySelector("#replayBtn").addEventListener("click", () => playSim(agent, zone, sim));
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
      if (typeof v === "string") el.innerHTML = v;
    });
    searchInput.placeholder = T("searchPh");
    document.documentElement.lang = isEN() ? "en" : "zh-Hant";
    document.title = isEN()
      ? "M365 Copilot Agent — Building"
      : "M365 Copilot Agent — 智慧大樓";
  }

  function retextureScene() {
    // pavilion signage + enter hint
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
    if (plazaGroup.userData.emblem) {
      const em = plazaGroup.userData.emblem;
      em.position.y = 7 + Math.sin(t * 0.8) * 0.18;
      em.rotation.y = Math.sin(t * 0.5) * 0.9;   // 3D sway (never fully edge-on)
      em.rotation.x = Math.sin(t * 0.6) * 0.08;  // subtle tilt
      if (plazaGroup.userData.glowDisc) {
        plazaGroup.userData.glowDisc.position.y = em.position.y;
        plazaGroup.userData.glowDisc.lookAt(camPos.x, em.position.y, camPos.z);
      }
    }
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
      const maxHr = SHELL_R - 12;
      if (hr > maxHr) {
        const k = maxHr / hr;
        camera.position.x = controls.target.x + (camera.position.x - controls.target.x) * k;
        camera.position.z = controls.target.z + (camera.position.z - controls.target.z) * k;
      }
      if (camera.position.y > WALL_H - 3) camera.position.y = WALL_H - 3;

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
        if (Math.abs(diff) > 0.002) {
          const a = cur + diff * 0.035;                 // slow, calm rotation
          const r = Math.hypot(cx, cz);
          camera.position.x = controls.target.x + Math.sin(a) * r;
          camera.position.z = controls.target.z + Math.cos(a) * r;
        }
      }
    }
    // hide the vertical wall structure (mullions) whenever the camera is inside the
    // atrium shell, so the curtain wall never blocks the view of the pavilions
    wallStruct.visible = Math.hypot(camera.position.x, camera.position.z) > SHELL_R - 2;
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
          controls.minDistance = LOBBY_MIN_DIST; controls.maxDistance = 90;
        });
      }, 1000);
    });
  });
  animate();
})();
