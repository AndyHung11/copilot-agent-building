/* =========================================================
   M365 Copilot Agent 大學 — campus view + schools, collegiate styling
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
  const LANG_KEY = "copilotCampusLang";
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
      brandT1: "M365 Copilot Agent 大學",
      brandT2: "Power of Copilot · {z} 所學院 · {a} 位 AI 助教",
      btnExterior: "看校景", btnAtrium: "回中央草坪", btnBack: "回中央草坪",
      sideTitle: "校園導覽 · {z} 所學院",
      hintText: "🖱️ 草坪：拖曳環顧·點學院入內　·　教室內：拖曳轉動講桌·點卡開始試聽",
      searchPh: "搜尋 Agent 名稱或關鍵字…",
      noMatch: "沒有符合的 Agent",
      licReq: "需 M365 Copilot 授權", licFree: "免授權即可使用",
      licReqShort: "需授權", licFreeShort: "免授權",
      tabRun: "▶ 試聽一堂", tabInfo: "痛點 · 上手 · 提示詞", tabEdm: "電子報原文",
      edmNote: "本 Agent 的「一分鐘小教室」電子報原文", edmOpen: "在新分頁開啟 ↗",
      simBadge: "⚠ 試聽示意 · 非真實執行結果", replay: "↻ 再聽一次",
      you: "你", secWhat: "這個 Agent 能幫你做什麼", secPain: "你可能正在經歷",
      secStart: "快速上手", secExample: "範例提示詞", copy: "複製", copied: "已複製 ✓",
      outLabel: "產出", structLabel: "產出結構", structTitle: "這個 Agent 的工作流程",
      structNote: "依官方 Agent 指示整理,實際產出內容依你的輸入而定。",
      footSim: "以上為<b>試玩示意</b>,用於說明這個 Agent 的對話方式與產出型態,非真實執行結果。內容不指涉特定真實企業,不含捏造的具體數據。",
      footStruct: "以上為依官方指示整理的<b>產出結構示意</b>,呈現這個 Agent 的工作流程與產出骨架,不含模擬內容。",
      swotS: "優勢 STRENGTHS", swotW: "劣勢 WEAKNESSES",
      swotO: "機會 OPPORTUNITIES", swotT: "威脅 THREATS",
      rkH: "高", rkM: "中", rkL: "低",
      cardSolves: "解決這些問題", cardSteps: (n) => n + " 步驟即可上手", cardCta: "▶  開始試聽",
      pavEnter: "點擊入館 ▸", agentsSuffix: "助教", backSign: "← 回中央草坪",
      plazaWelcome: "歡迎來到 Copilot Agent 大學", parkSign: "COPILOT AGENT 大學",
      deckSub: (n) => n + " 位 AI 助教", enterExp: "點此入館",
    },
    en: {
      brandT1: "M365 Copilot Agent University",
      brandT2: "Power of Copilot · {z} schools · {a} AI teaching assistants",
      btnExterior: "Campus view", btnAtrium: "The Quad", btnBack: "Back to the Quad",
      sideTitle: "Campus map · {z} schools",
      hintText: "🖱️ Quad: drag to look around · click a school to enter　·　Inside: drag to spin the lecterns · click one to sit in",
      searchPh: "Search agents by name or keyword…",
      noMatch: "No matching agent",
      licReq: "Requires M365 Copilot license", licFree: "No add-on license needed",
      licReqShort: "License", licFreeShort: "Free",
      tabRun: "▶ Sit in", tabInfo: "Pain points · Getting started · Prompts", tabEdm: "Newsletter",
      edmNote: "The original newsletter issue for this agent", edmOpen: "Open in new tab ↗",
      simBadge: "⚠ Illustrative class · not a real execution", replay: "↻ Run again",
      you: "You", secWhat: "What this agent does for you", secPain: "You might be experiencing",
      secStart: "Getting started", secExample: "Example prompts", copy: "Copy", copied: "Copied ✓",
      outLabel: "OUTPUT", structLabel: "STRUCTURE", structTitle: "How this agent works",
      structNote: "Compiled from the official agent instructions. Actual output depends on your input.",
      footSim: "The above is an <b>illustrative play-through</b> showing how this agent converses and what it produces. It is not a real execution, references no specific real company, and contains no fabricated figures.",
      footStruct: "The above is a <b>structural outline</b> compiled from the official instructions, showing the agent's workflow and output skeleton. It contains no simulated content.",
      swotS: "STRENGTHS", swotW: "WEAKNESSES",
      swotO: "OPPORTUNITIES", swotT: "THREATS",
      rkH: "HIGH", rkM: "MED", rkL: "LOW",
      cardSolves: "Solves these problems", cardSteps: (n) => n + " steps to get started", cardCta: "▶  Sit in on this",
      pavEnter: "Click to enter ▸", agentsSuffix: "TAs", backSign: "← Back to the Quad",
      plazaWelcome: "Welcome to Copilot Agent University", parkSign: "COPILOT AGENT UNIVERSITY",
      deckSub: (n) => n + " AI teaching assistants", enterExp: "Enter school",
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
  const LOBBY_MIN_DIST = 48;

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
  scene.background = new THREE.Color(0x9fd4f5);
  scene.fog = new THREE.Fog(0xbfe3f7, 170, 340);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 600);
  const EXTERIOR = { pos: { x: 10, y: 34, z: SHELL_R + 78 }, look: { x: 0, y: 8, z: 0 } };
  const INTERIOR = { pos: { x: 0, y: 42, z: 88 }, look: { x: 0, y: 4, z: 0 } };
  camera.position.set(12, 26, SHELL_R + 96);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;         // target is pinned to the atrium centre
  controls.enableZoom = false;        // replaced by custom zoom below
  controls.minDistance = LOBBY_MIN_DIST;
  controls.maxDistance = 105;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 7, 0);
  controls.update();

  // ---------- Lighting: open-air park in bright daylight ----------
  scene.add(new THREE.HemisphereLight(0xbfe3ff, 0x3d6b2e, 0.38));
  scene.add(new THREE.AmbientLight(0xffffff, 0.08));
  const key = new THREE.DirectionalLight(0xfff4e0, 0.82);
  key.position.set(52, 78, 44);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 1; key.shadow.camera.far = 260;
  key.shadow.camera.left = -95; key.shadow.camera.right = 95;
  key.shadow.camera.top = 95; key.shadow.camera.bottom = -95;
  key.shadow.bias = -0.0004;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xcfe8ff, 0.18);
  rim.position.set(-48, 34, -56);
  scene.add(rim);

  // ---------- Sky: bright daytime gradient ----------
  (function () {
    const mat = new THREE.ShaderMaterial({
      side: THREE.BackSide, fog: false,
      uniforms: {
        top: { value: new THREE.Color(0x3f8fd6) },
        mid: { value: new THREE.Color(0x9fd4f5) },
        bot: { value: new THREE.Color(0xe8f6ff) },
      },
      vertexShader: "varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      fragmentShader: "varying vec3 p;uniform vec3 top;uniform vec3 mid;uniform vec3 bot;void main(){float h=normalize(p).y;vec3 c=h>0.0?mix(mid,top,smoothstep(0.0,0.7,h)):mix(mid,bot,smoothstep(0.0,-0.4,h));gl_FragColor=vec4(c,1.0);}",
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(280, 32, 20), mat));
  })();

  // ---------- Clouds: soft billboarded puffs drifting around the park ----------
  const clouds = [];
  (function () {
    const cv = document.createElement("canvas"); cv.width = cv.height = 256;
    const c = cv.getContext("2d");
    // a few overlapping soft blobs make a convincing fluffy cloud
    [[128, 150, 70], [80, 160, 52], [180, 158, 56], [104, 122, 46], [156, 124, 44]].forEach(([x, y, r]) => {
      const g = c.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.6, "rgba(255,255,255,0.68)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    });
    // built before the shared canvasTex helper exists, so make the texture directly
    const tex = new THREE.CanvasTexture(cv);
    tex.encoding = THREE.sRGBEncoding;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
      const r = 150 + Math.random() * 80;
      const s = 34 + Math.random() * 30;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(s, s * 0.56),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0.85 }));
      m.position.set(Math.cos(a) * r, 52 + Math.random() * 46, Math.sin(a) * r);
      scene.add(m);
      clouds.push({ mesh: m, a, r, speed: 0.006 + Math.random() * 0.008 });
    }
  })();

  // ---------- Campus ground: lawns with a stone-paved quad ----------
  (function () {
    const grass = new THREE.Mesh(new THREE.CircleGeometry(230, 72),
      new THREE.MeshStandardMaterial({ color: 0x4f8f3d, roughness: 0.96, metalness: 0 }));
    grass.rotation.x = -Math.PI / 2; grass.position.y = -0.08; grass.receiveShadow = true;
    scene.add(grass);
    // mown stripes across the playing fields beyond the campus wall
    for (let r = 56; r < 220; r += 16) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 8, 84),
        new THREE.MeshBasicMaterial({ color: 0x5da749, transparent: true, opacity: 0.4 }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = -0.05;
      scene.add(ring);
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
    // ride name — a dark outline plus a white halo keeps it legible against sky or grass
    fit(zName(zone), 300, 132, SAFE, "'Segoe UI', sans-serif");
    ctx.shadowColor = "rgba(255,255,255,0.98)";
    ctx.shadowBlur = 26;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(zName(zone), W / 2, 128);
    ctx.fillText(zName(zone), W / 2, 128);
    ctx.shadowBlur = 0;
    ctx.lineWidth = 7; ctx.strokeStyle = "#ffffff";
    ctx.strokeText(zName(zone), W / 2, 128);
    ctx.fillStyle = hexToRgba(zone.color, 1);
    ctx.fillText(zName(zone), W / 2, 128);
    ctx.lineWidth = 2.2; ctx.strokeStyle = "rgba(52,32,10,0.55)";
    ctx.strokeText(zName(zone), W / 2, 128);
    // thin rule in the ride colour
    ctx.strokeStyle = hexToRgba(zone.color, 0.95);
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(W / 2 - 170, 220); ctx.lineTo(W / 2 + 170, 220); ctx.stroke();
    // secondary name — big, with tracking that yields before the type size does
    ctx.shadowColor = "rgba(255,255,255,0.98)"; ctx.shadowBlur = 18;
    ctx.fillStyle = "#3a2810";
    tracked((zSub(zone) || "").toUpperCase(), 700, 60, 9, 286, SAFE);
    // ride capacity
    ctx.fillStyle = "#4a3418";
    tracked(zone.count + " " + T("agentsSuffix"), 800, 56, 5, 370, SAFE);
    ctx.shadowBlur = 0;
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
    // a painted board behind the text, so it always reads against the striped tent wall
    ctx.fillStyle = "rgba(255,252,245,0.94)";
    roundRect(ctx, 8, 8, W - 16, H - 16, 34); ctx.fill();
    ctx.lineWidth = 9; ctx.strokeStyle = hexToRgba(zone.color, 1);
    roundRect(ctx, 8, 8, W - 16, H - 16, 34); ctx.stroke();
    // icon disc
    ctx.fillStyle = hexToRgba(zone.color, 0.22);
    ctx.beginPath(); ctx.arc(150, 150, 96, 0, Math.PI * 2); ctx.fill();
    ctx.font = "120px 'Segoe UI Emoji', sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(zone.icon, 150, 158);
    // name
    ctx.textAlign = "left";
    ctx.fillStyle = hexToRgba(zone.color, 1);
    ctx.font = "800 92px 'Segoe UI', sans-serif";
    ctx.fillText(zName(zone), 290, 118);
    ctx.lineWidth = 2.4; ctx.strokeStyle = "rgba(50,32,12,0.5)";
    ctx.strokeText(zName(zone), 290, 118);
    ctx.fillStyle = "#3a2810";
    ctx.font = "600 40px 'Segoe UI', sans-serif";
    ctx.fillText((zSub(zone) || "").toUpperCase() + "  ·  " + T("deckSub")(zone.count), 294, 188);
    // scenario description
    ctx.fillStyle = "#54402a";
    ctx.font = "40px 'Segoe UI', sans-serif";
    wrapText(ctx, zDesc(zone) || "", 290 + 0, 280, W - 340, 54, 2);
    return canvasTex(cv);
  }

  // ---------- Campus boundary: stone plinth wall with iron railings, and the main gate ----------
  const ENTRANCE_HALF = 0.28; // radians of the entrance gap half-width (around +Z)
  const shellGroup = new THREE.Group();
  scene.add(shellGroup);
  const wallStruct = new THREE.Group(); // kept for compatibility with the lobby camera logic
  shellGroup.add(wallStruct);
  function shellAdd(o) { shellGroup.add(o); }
  buildShellReal();

  function buildShellReal() {
    const PIERS = 40;
    const pierAng = (Math.PI * 2) / PIERS;
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd8cdb8, roughness: 0.88, metalness: 0.02 });
    const stoneDark = new THREE.MeshStandardMaterial({ color: 0xbdae93, roughness: 0.9 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x2b3340, roughness: 0.5, metalness: 0.55 });
    const hedgeMat = new THREE.MeshStandardMaterial({ color: 0x35702a, roughness: 0.95 });
    const PIER_H = 2.9;

    const pierPts = [];
    for (let i = 0; i < PIERS; i++) {
      const a = i * pierAng + Math.PI / 2;
      const da = Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2));
      if (Math.abs(da) < ENTRANCE_HALF) { pierPts.push(null); continue; }
      const x = Math.cos(a) * SHELL_R, z = Math.sin(a) * SHELL_R;
      // squared stone pier with a moulded cap
      const pier = new THREE.Mesh(new THREE.BoxGeometry(0.85, PIER_H, 0.85), stoneMat);
      pier.position.set(x, PIER_H / 2, z); pier.rotation.y = -a; pier.castShadow = true;
      shellAdd(pier);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.22, 1.15), stoneDark);
      cap.position.set(x, PIER_H + 0.11, z); cap.rotation.y = -a;
      shellAdd(cap);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), stoneMat);
      ball.position.set(x, PIER_H + 0.42, z);
      shellAdd(ball);
      pierPts.push(new THREE.Vector3(x, 0, z));
    }

    // between the piers: a low stone plinth carrying vertical iron railings
    for (let i = 0; i < PIERS; i++) {
      const p0 = pierPts[i], p1 = pierPts[(i + 1) % PIERS];
      if (!p0 || !p1) continue;
      const mid = new THREE.Vector3().lerpVectors(p0, p1, 0.5);
      const len = p0.distanceTo(p1);
      const rot = -Math.atan2(p1.z - p0.z, p1.x - p0.x);

      const plinth = new THREE.Mesh(new THREE.BoxGeometry(len, 0.55, 0.55), stoneMat);
      plinth.position.set(mid.x, 0.27, mid.z); plinth.rotation.y = rot;
      plinth.castShadow = true; plinth.receiveShadow = true;
      shellAdd(plinth);
      // top and bottom rails
      [0.85, 2.15].forEach((h) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.09, 0.09), ironMat);
        rail.position.set(mid.x, h, mid.z); rail.rotation.y = rot;
        shellAdd(rail);
      });
      // balusters with spear tips
      const bars = Math.max(5, Math.round(len / 0.62));
      for (let b = 0; b <= bars; b++) {
        const p = new THREE.Vector3().lerpVectors(p0, p1, b / bars);
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.85, 0.07), ironMat);
        bar.position.set(p.x, 1.48, p.z); bar.rotation.y = rot;
        shellAdd(bar);
        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.26, 4), ironMat);
        tip.position.set(p.x, 2.48, p.z); tip.rotation.y = rot;
        shellAdd(tip);
      }
      // clipped hedge just inside the railing
      const hedge = new THREE.Mesh(new THREE.BoxGeometry(len, 1.5, 1.5), hedgeMat);
      hedge.position.set(mid.x * 0.965, 0.75, mid.z * 0.965); hedge.rotation.y = rot;
      hedge.castShadow = true;
      shellAdd(hedge);
    }

    // ---------- The main gate ----------
    const ex = 0, ez = SHELL_R;
    const GATE_H = 9.6, GATE_HALF = 9.5;
    [-GATE_HALF, GATE_HALF].forEach((px) => {
      // tall ashlar pier, banded into courses
      const pier = new THREE.Mesh(new THREE.BoxGeometry(2.6, GATE_H, 2.6), stoneMat);
      pier.position.set(ex + px, GATE_H / 2, ez + 1.2); pier.castShadow = true;
      shellAdd(pier);
      for (let c = 1; c < 7; c++) {
        const course = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.08, 2.68), stoneDark);
        course.position.set(ex + px, c * (GATE_H / 7), ez + 1.2);
        shellAdd(course);
      }
      // moulded cornice and a lantern on top
      const cor = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.45, 3.3), stoneDark);
      cor.position.set(ex + px, GATE_H + 0.22, ez + 1.2); cor.castShadow = true;
      shellAdd(cor);
      const plinth2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.5), stoneMat);
      plinth2.position.set(ex + px, GATE_H + 0.7, ez + 1.2);
      shellAdd(plinth2);
      const lantern = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.3, 1.0),
        new THREE.MeshBasicMaterial({ color: 0xfff0c4 }));
      lantern.position.set(ex + px, GATE_H + 1.6, ez + 1.2);
      shellAdd(lantern);
      const lframe = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.12, 1.12), ironMat);
      lframe.position.set(ex + px, GATE_H + 2.28, ez + 1.2);
      shellAdd(lframe);
      const lroof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.8, 4), ironMat);
      lroof.position.set(ex + px, GATE_H + 2.7, ez + 1.2); lroof.rotation.y = Math.PI / 4;
      shellAdd(lroof);
    });

    // wrought-iron overthrow arch spanning the piers
    const span = new THREE.Mesh(new THREE.TorusGeometry(GATE_HALF - 0.4, 0.2, 8, 44, Math.PI), ironMat);
    span.position.set(ex, GATE_H - 0.6, ez + 1.2); span.castShadow = true;
    shellAdd(span);
    const spanInner = new THREE.Mesh(new THREE.TorusGeometry(GATE_HALF - 2.1, 0.12, 8, 40, Math.PI), ironMat);
    spanInner.position.set(ex, GATE_H - 0.6, ez + 1.2);
    shellAdd(spanInner);
    // radiating bars filling the overthrow
    for (let i = 1; i < 12; i++) {
      const a = (i / 12) * Math.PI;
      const r0 = GATE_HALF - 2.1, r1 = GATE_HALF - 0.4;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.07, r1 - r0, 0.07), ironMat);
      bar.position.set(ex + Math.cos(a) * (r0 + r1) / 2, GATE_H - 0.6 + Math.sin(a) * (r0 + r1) / 2, ez + 1.2);
      bar.rotation.z = a - Math.PI / 2;
      shellAdd(bar);
    }

    // stone forecourt in front of the gate
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(22, 13),
      new THREE.MeshStandardMaterial({ color: 0xcfc6b4, roughness: 0.92 }));
    mat.rotation.x = -Math.PI / 2; mat.position.set(ex, 0.02, ez + 4.5); mat.receiveShadow = true;
    shellAdd(mat);
    for (let i = -2; i <= 2; i++) {
      const joint = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 13),
        new THREE.MeshBasicMaterial({ color: 0xb5ab98 }));
      joint.rotation.x = -Math.PI / 2; joint.position.set(ex + i * 4.4, 0.04, ez + 4.5);
      shellAdd(joint);
    }

    // the university crest: the Copilot logo on a stone roundel above the arch
    const roundel = new THREE.Mesh(new THREE.CylinderGeometry(4.3, 4.3, 0.4, 40), stoneMat);
    roundel.rotation.x = Math.PI / 2; roundel.position.set(ex, GATE_H + 4.0, ez + 1.1);
    roundel.castShadow = true;
    shellAdd(roundel);
    const roundelRim = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.26, 10, 44), stoneDark);
    roundelRim.position.set(ex, GATE_H + 4.0, ez + 1.1);
    shellAdd(roundelRim);
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 5.6),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
    logo.position.set(ex, GATE_H + 4.0, ez + 1.45);
    shellAdd(logo);

    // carved name board across the gate
    const board = new THREE.Mesh(new THREE.BoxGeometry(19.5, 2.9, 0.4), stoneMat);
    board.position.set(ex, GATE_H + 1.0, ez + 2.5); board.castShadow = true;
    shellAdd(board);
    const boardTrim = new THREE.Mesh(new THREE.BoxGeometry(20.2, 0.22, 0.5), stoneDark);
    boardTrim.position.set(ex, GATE_H + 2.5, ez + 2.5);
    shellAdd(boardTrim);
    const nameTex = textTexture(T("parkSign"), 1120, 150, "800 72px 'Segoe UI'", "#4a3a22", "#efe6d2");
    const nameP = new THREE.Mesh(new THREE.PlaneGeometry(18.6, 2.5),
      new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    nameP.position.set(ex, GATE_H + 1.0, ez + 2.72);
    shellAdd(nameP);
    shellGroup.userData.nameP = nameP;
  }


  // ---------- The Quad: a great lawn crossed by stone walks ----------
  (function () {
    // the campus floor is lawn, not paving — walks are laid on top of it
    const lawn = new THREE.Mesh(new THREE.CircleGeometry(SHELL_R - 1.5, 96),
      new THREE.MeshStandardMaterial({ color: 0x57993f, roughness: 0.96, metalness: 0 }));
    lawn.rotation.x = -Math.PI / 2; lawn.position.y = 0.01; lawn.receiveShadow = true;
    scene.add(lawn);
    // a broad stone ring walk around the quad, with kerbs
    const walkR = SHELL_R - 9;
    const ring = new THREE.Mesh(new THREE.RingGeometry(walkR - 2.4, walkR + 2.4, 110),
      new THREE.MeshStandardMaterial({ color: 0xcfc6b4, roughness: 0.92 }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.04; ring.receiveShadow = true;
    scene.add(ring);
    [walkR - 2.4, walkR + 2.4].forEach((r) => {
      const kerb = new THREE.Mesh(new THREE.RingGeometry(r - 0.16, r + 0.16, 110),
        new THREE.MeshBasicMaterial({ color: 0xb0a68f }));
      kerb.rotation.x = -Math.PI / 2; kerb.position.y = 0.06;
      scene.add(kerb);
    });
    // paving joints radiating across the ring walk
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const j = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 0.1),
        new THREE.MeshBasicMaterial({ color: 0xb5ab98 }));
      j.rotation.set(-Math.PI / 2, 0, -a);
      j.position.set(Math.cos(a) * walkR, 0.06, Math.sin(a) * walkR);
      scene.add(j);
    }
    // the approach walk from the gate to the quad
    const approach = new THREE.Mesh(new THREE.PlaneGeometry(7.5, SHELL_R - walkR + 4),
      new THREE.MeshStandardMaterial({ color: 0xcfc6b4, roughness: 0.92 }));
    approach.rotation.x = -Math.PI / 2;
    approach.position.set(0, 0.04, (SHELL_R + walkR) / 2 + 1);
    scene.add(approach);
  })();

  // ---------- Campus clock tower (the landmark at the heart of the quad) ----------
  const plazaGroup = new THREE.Group();
  scene.add(plazaGroup);
  {
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xded3bd, roughness: 0.86, metalness: 0.02 });
    const stoneDark = new THREE.MeshStandardMaterial({ color: 0xc0b195, roughness: 0.9 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x3f6b63, roughness: 0.62, metalness: 0.25 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd9a93c, roughness: 0.34, metalness: 0.7 });
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x2b3340, roughness: 0.5, metalness: 0.55 });

    // the tower is deliberately SLIM: it is the landmark, but it must not block the
    // sightline across the quad to the schools
    const TOWER_R = 2.2, SHAFT_H = 11.5;

    // stepped stone base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(PLAZA_R, PLAZA_R + 0.5, 0.4, 48), stoneDark);
    base.position.y = 0.2; base.receiveShadow = true;
    plazaGroup.add(base);
    const step2 = new THREE.Mesh(new THREE.CylinderGeometry(PLAZA_R - 2.2, PLAZA_R - 2.0, 0.4, 44), stoneMat);
    step2.position.y = 0.6; step2.receiveShadow = true;
    plazaGroup.add(step2);
    const step3 = new THREE.Mesh(new THREE.CylinderGeometry(PLAZA_R - 4.4, PLAZA_R - 4.2, 0.4, 40), stoneDark);
    step3.position.y = 1.0; step3.receiveShadow = true;
    plazaGroup.add(step3);
    // the square plinth the shaft rises from
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 2.5, 1.5, TOWER_R * 2.5), stoneMat);
    plinth.position.y = 1.95; plinth.castShadow = true;
    plazaGroup.add(plinth);
    const plinthCap = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 2.7, 0.24, TOWER_R * 2.7), stoneDark);
    plinthCap.position.y = 2.8;
    plazaGroup.add(plinthCap);

    // square shaft, banded into stone courses with slender corner pilasters
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 2, SHAFT_H, TOWER_R * 2), stoneMat);
    shaft.position.y = 2.9 + SHAFT_H / 2; shaft.castShadow = true;
    plazaGroup.add(shaft);
    for (let c = 1; c < 8; c++) {
      const course = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 2.08, 0.07, TOWER_R * 2.08), stoneDark);
      course.position.y = 2.9 + c * (SHAFT_H / 8);
      plazaGroup.add(course);
    }
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) => {
      const pil = new THREE.Mesh(new THREE.BoxGeometry(0.42, SHAFT_H, 0.42), stoneDark);
      pil.position.set(sx * TOWER_R, 2.9 + SHAFT_H / 2, sz * TOWER_R);
      plazaGroup.add(pil);
    });
    // tall lancet windows on each face
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const win = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 4.2),
        new THREE.MeshStandardMaterial({ color: 0x25313f, roughness: 0.4, metalness: 0.2 }));
      win.position.set(Math.sin(a) * (TOWER_R + 0.02), 9.5, Math.cos(a) * (TOWER_R + 0.02));
      win.rotation.y = a;
      plazaGroup.add(win);
      const arch = new THREE.Mesh(new THREE.CircleGeometry(0.45, 16, 0, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x25313f, roughness: 0.4 }));
      arch.position.set(Math.sin(a) * (TOWER_R + 0.02), 11.6, Math.cos(a) * (TOWER_R + 0.02));
      arch.rotation.y = a;
      plazaGroup.add(arch);
    }

    // ---------- Clock stage: a face on all four sides ----------
    const CLOCK_Y = 2.9 + SHAFT_H + 1.9;
    const stage = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 2.3, 3.8, TOWER_R * 2.3), stoneMat);
    stage.position.y = CLOCK_Y; stage.castShadow = true;
    plazaGroup.add(stage);
    // one canvas face reused on all four sides
    const faceCan = document.createElement("canvas"); faceCan.width = faceCan.height = 256;
    const fx = faceCan.getContext("2d");
    fx.fillStyle = "#f6f1e4"; fx.beginPath(); fx.arc(128, 128, 120, 0, Math.PI * 2); fx.fill();
    fx.strokeStyle = "#2b3340"; fx.lineWidth = 8;
    fx.beginPath(); fx.arc(128, 128, 116, 0, Math.PI * 2); fx.stroke();
    for (let h = 0; h < 12; h++) {
      const a = (h / 12) * Math.PI * 2;
      const big = h % 3 === 0;
      fx.strokeStyle = "#2b3340"; fx.lineWidth = big ? 9 : 4;
      fx.beginPath();
      fx.moveTo(128 + Math.sin(a) * (big ? 96 : 102), 128 - Math.cos(a) * (big ? 96 : 102));
      fx.lineTo(128 + Math.sin(a) * 110, 128 - Math.cos(a) * 110);
      fx.stroke();
    }
    // hands frozen at a pleasant 10:10
    fx.lineCap = "round"; fx.strokeStyle = "#2b3340";
    fx.lineWidth = 10; fx.beginPath(); fx.moveTo(128, 128);
    fx.lineTo(128 + Math.sin(-Math.PI / 3) * 62, 128 - Math.cos(-Math.PI / 3) * 62); fx.stroke();
    fx.lineWidth = 7; fx.beginPath(); fx.moveTo(128, 128);
    fx.lineTo(128 + Math.sin(Math.PI / 3) * 92, 128 - Math.cos(Math.PI / 3) * 92); fx.stroke();
    fx.fillStyle = "#d9a93c"; fx.beginPath(); fx.arc(128, 128, 11, 0, Math.PI * 2); fx.fill();
    const faceTex = new THREE.CanvasTexture(faceCan);
    faceTex.encoding = THREE.sRGBEncoding;
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const dial = new THREE.Mesh(new THREE.CircleGeometry(1.42, 36),
        new THREE.MeshBasicMaterial({ map: faceTex, transparent: true }));
      dial.position.set(Math.sin(a) * (TOWER_R * 1.15 + 0.03), CLOCK_Y, Math.cos(a) * (TOWER_R * 1.15 + 0.03));
      dial.rotation.y = a;
      plazaGroup.add(dial);
      const surround = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.16, 10, 36), goldMat);
      surround.position.copy(dial.position); surround.rotation.y = a;
      plazaGroup.add(surround);
    }

    // ---------- Belfry, spire and weather vane ----------
    const belfryY = CLOCK_Y + 3.2;
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 2.8, 0.4, TOWER_R * 2.8), stoneDark);
    cornice.position.y = belfryY - 0.5; cornice.castShadow = true;
    plazaGroup.add(cornice);
    // open belfry: four corner posts with arched openings between
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sz]) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.9, 0.5), stoneMat);
      post.position.set(sx * TOWER_R * 0.95, belfryY + 1.2, sz * TOWER_R * 0.95);
      plazaGroup.add(post);
    });
    const belfryDark = new THREE.Mesh(new THREE.BoxGeometry(TOWER_R * 1.5, 2.6, TOWER_R * 1.5),
      new THREE.MeshStandardMaterial({ color: 0x1e2734, roughness: 0.6 }));
    belfryDark.position.y = belfryY + 1.2;
    plazaGroup.add(belfryDark);
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.78, 1.0, 14), goldMat);
    bell.position.y = belfryY + 1.3;
    plazaGroup.add(bell);
    // pyramidal copper spire
    const spire = new THREE.Mesh(new THREE.ConeGeometry(TOWER_R * 1.55, 4.6, 4), roofMat);
    spire.position.y = belfryY + 5.0; spire.rotation.y = Math.PI / 4; spire.castShadow = true;
    plazaGroup.add(spire);
    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 6), goldMat);
    finial.position.y = belfryY + 8.0;
    plazaGroup.add(finial);
    const vane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.62),
      new THREE.MeshStandardMaterial({ color: 0x2b3340, roughness: 0.5, metalness: 0.5,
        side: THREE.DoubleSide }));
    vane.position.set(0.55, belfryY + 8.5, 0);
    plazaGroup.add(vane);
    plazaGroup.userData.vane = vane;

    // the Copilot crest, carved into the tower above the entrance
    const crest = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.0),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
    crest.position.set(0, 6.4, TOWER_R + 0.05);
    plazaGroup.add(crest);
    const crestBack = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.0),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
    crestBack.position.set(0, 6.4, -TOWER_R - 0.05); crestBack.rotation.y = Math.PI;
    plazaGroup.add(crestBack);
    // the shared animate loop expects these keys
    plazaGroup.userData.ride = null;
    plazaGroup.userData.mounts = [];

    // lamp standards ringing the tower base
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.5;
      const lx = Math.cos(a) * (PLAZA_R - 1.4), lz = Math.sin(a) * (PLAZA_R - 1.4);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 4.2, 8), ironMat);
      post.position.set(lx, 2.3, lz); post.castShadow = true;
      plazaGroup.add(post);
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.5),
        new THREE.MeshBasicMaterial({ color: 0xfff0c4 }));
      lamp.position.set(lx, 4.6, lz);
      plazaGroup.add(lamp);
      const lcap = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.35, 4), ironMat);
      lcap.position.set(lx, 5.1, lz); lcap.rotation.y = Math.PI / 4;
      plazaGroup.add(lcap);
    }

    const eLight = new THREE.PointLight(0xfff1cf, 0.7, 46); eLight.position.y = 7;
    plazaGroup.add(eLight);

    // the welcome line, set into the paving in front of the tower
    const titleTex = textTexture(T("plazaWelcome"), 1180, 112, "800 52px 'Segoe UI'", "#4a3a22", "#f2ead6");
    const title = new THREE.Mesh(new THREE.PlaneGeometry(14, 1.33),
      new THREE.MeshBasicMaterial({ map: titleTex, transparent: true }));
    title.rotation.x = -Math.PI / 2; title.position.set(0, 0.42, PLAZA_R + 4.2);
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

    // ---------- School buildings: one collegiate hall per faculty ----------
    const zc = new THREE.Color(zone.color);
    const lawnMat = new THREE.MeshStandardMaterial({ color: 0x57993f, roughness: 0.96 });
    const paveMat = new THREE.MeshStandardMaterial({ color: 0xcfc6b4, roughness: 0.92 });
    const brickMat = new THREE.MeshStandardMaterial({ color: 0xb4674a, roughness: 0.88 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe4dac4, roughness: 0.84 });
    const stoneDark = new THREE.MeshStandardMaterial({ color: 0xc3b699, roughness: 0.88 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x5d6b7d, roughness: 0.72, metalness: 0.12 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x9ec4dd, roughness: 0.16, metalness: 0.5,
      transparent: true, opacity: 0.72 });
    const winMat = new THREE.MeshStandardMaterial({ color: 0x2c3c4e, roughness: 0.3, metalness: 0.35 });
    const accMat = new THREE.MeshStandardMaterial({ color: zc, roughness: 0.5, metalness: 0.15,
      emissive: zc.clone(), emissiveIntensity: 0.06 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xcfd8e4, roughness: 0.4, metalness: 0.6 });

    // shared base: a paved forecourt with a coloured kerb identifying the school
    const pad = new THREE.Mesh(new THREE.BoxGeometry(PAV_W, 0.3, PAV_D), paveMat);
    pad.position.set(0, 0.15, 0); pad.receiveShadow = true;
    g.add(pad);
    const kerb = new THREE.Mesh(new THREE.TorusGeometry(PAV_W * 0.46, 0.2, 8, 40), accMat);
    kerb.rotation.x = Math.PI / 2; kerb.position.y = 0.32;
    g.add(kerb);

    // ---- shared building parts, so every school reads as one campus ----
    // a run of windows across a facade
    function windowBand(w, y, z, count, wallW, sill) {
      for (let i = 0; i < count; i++) {
        const x = -wallW / 2 + (i + 0.5) * (wallW / count);
        const win = new THREE.Mesh(new THREE.BoxGeometry(w, 1.5, 0.16), winMat);
        win.position.set(x, y, z);
        g.add(win);
        if (sill) {
          const s = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.14, 0.34), stoneMat);
          s.position.set(x, y - 0.86, z);
          g.add(s);
        }
      }
    }
    // a classical portico: columns, entablature and pediment
    function portico(cols, width, height, z) {
      for (let i = 0; i < cols; i++) {
        const x = -width / 2 + (i / (cols - 1)) * width;
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, height, 14), stoneMat);
        col.position.set(x, height / 2 + 0.3, z); col.castShadow = true;
        g.add(col);
        const capital = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.3, 0.95), stoneMat);
        capital.position.set(x, height + 0.4, z);
        g.add(capital);
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.28, 0.95), stoneDark);
        plinth.position.set(x, 0.42, z);
        g.add(plinth);
      }
      const arch = new THREE.Mesh(new THREE.BoxGeometry(width + 1.6, 0.62, 1.5), stoneMat);
      arch.position.set(0, height + 0.9, z); arch.castShadow = true;
      g.add(arch);
      // low triangular pediment
      const ped = new THREE.Mesh(new THREE.ConeGeometry((width + 1.8) / 2, 1.5, 3),
        new THREE.MeshStandardMaterial({ color: 0xe4dac4, roughness: 0.84 }));
      ped.position.set(0, height + 1.95, z);
      ped.rotation.y = Math.PI / 2; ped.scale.z = 0.36;
      ped.castShadow = true;
      g.add(ped);
      // the entrance steps
      for (let s = 0; s < 3; s++) {
        const st = new THREE.Mesh(new THREE.BoxGeometry(width + 1.2 - s * 0.5, 0.16, 1.9 - s * 0.45), stoneDark);
        st.position.set(0, 0.08 + s * 0.16, z + 1.5 - s * 0.22);
        g.add(st);
      }
    }
    // a pitched roof over a rectangular block, ridged in the school's colour so each
    // faculty is identifiable from the bird's-eye view where you mostly see roofs
    function pitchedRoof(w, d, y, h) {
      const r = new THREE.Mesh(new THREE.ConeGeometry(Math.hypot(w, d) / 2, h, 4), roofMat);
      r.position.y = y + h / 2; r.rotation.y = Math.PI / 4;
      r.scale.set(w / Math.hypot(w, d) * 1.02, 1, d / Math.hypot(w, d) * 1.02);
      r.castShadow = true;
      g.add(r);
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.26, 0.5),
        new THREE.MeshStandardMaterial({ color: zone.color, roughness: 0.6 }));
      ridge.position.y = y + h - 0.05;
      g.add(ridge);
      // eaves band, also in the school's colour
      const eaves = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.22, d + 0.2),
        new THREE.MeshStandardMaterial({ color: zone.color, roughness: 0.62 }));
      eaves.position.y = y + 0.05;
      g.add(eaves);
    }

    if (zone.id === "Z1") {
      // School of Management — the old administration building: brick, stone quoins,
      // a columned portico and a cupola. The most formal hall on campus.
      const BW = 10.4, BD = 6.8, BH = 7.2;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD), brickMat);
      body.position.y = BH / 2 + 0.3; body.castShadow = true; body.receiveShadow = true;
      g.add(body);
      // stone base course and cornice
      const baseC = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.3, 0.8, BD + 0.3), stoneMat);
      baseC.position.y = 0.7; g.add(baseC);
      const cornice = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.5, 0.42, BD + 0.5), stoneMat);
      cornice.position.y = BH + 0.5; cornice.castShadow = true; g.add(cornice);
      // quoins at the corners
      [-1, 1].forEach((sx) => {
        for (let q = 0; q < 7; q++) {
          const qn = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.36), stoneMat);
          qn.position.set(sx * (BW / 2 - 0.2), 1.4 + q * 0.92, BD / 2);
          g.add(qn);
        }
      });
      windowBand(1.0, 3.1, BD / 2 + 0.04, 6, BW - 1.8, true);
      windowBand(1.0, 5.6, BD / 2 + 0.04, 6, BW - 1.8, true);
      pitchedRoof(BW + 0.6, BD + 0.6, BH + 0.7, 2.2);
      // cupola crowning the roof
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 1.5, 14), stoneMat);
      drum.position.y = BH + 3.5; drum.castShadow = true; g.add(drum);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const cc = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.4, 8), stoneMat);
        cc.position.set(Math.cos(a) * 1.2, BH + 3.5, Math.sin(a) * 1.2);
        g.add(cc);
      }
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ color: 0x3f6b63, roughness: 0.6, metalness: 0.3 }));
      dome.position.y = BH + 4.25; dome.castShadow = true; g.add(dome);
      const fin = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6),
        new THREE.MeshStandardMaterial({ color: 0xd9a93c, roughness: 0.34, metalness: 0.7 }));
      fin.position.y = BH + 5.8; g.add(fin);
      portico(6, 6.2, 5.4, BD / 2 + 1.5);

    } else if (zone.id === "Z2") {
      // School of Design & Media — a converted studio block: sawtooth north-light
      // roof, big industrial glazing, a mural wall in the school colour
      const BW = 10.6, BD = 7.0, BH = 6.0;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD),
        new THREE.MeshStandardMaterial({ color: 0xf0ece3, roughness: 0.78 }));
      body.position.y = BH / 2 + 0.3; body.castShadow = true; g.add(body);
      // full-height studio glazing on the front
      const glazing = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.6, BH - 1.4, 0.2), glassMat);
      glazing.position.set(0, BH / 2 + 0.5, BD / 2 + 0.05); g.add(glazing);
      // steel mullions
      for (let i = 0; i <= 8; i++) {
        const mx = -(BW - 1.6) / 2 + i * ((BW - 1.6) / 8);
        const m = new THREE.Mesh(new THREE.BoxGeometry(0.12, BH - 1.4, 0.26), steelMat);
        m.position.set(mx, BH / 2 + 0.5, BD / 2 + 0.08); g.add(m);
      }
      [-1, 1].forEach((k) => {
        const t2 = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.6, 0.12, 0.26), steelMat);
        t2.position.set(0, BH / 2 + 0.5 + k * (BH - 1.4) / 2, BD / 2 + 0.08); g.add(t2);
      });
      // sawtooth roof: north-light glazing, the signature of an art studio
      for (let i = 0; i < 4; i++) {
        const z0 = -BD / 2 + 0.9 + i * (BD / 4);
        const slope = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.2, 2.1),
          new THREE.MeshStandardMaterial({ color: 0x5b6b7d, roughness: 0.7 }));
        slope.position.set(0, BH + 1.1, z0 + 0.5);
        slope.rotation.x = -0.52; slope.castShadow = true;
        g.add(slope);
        const light = new THREE.Mesh(new THREE.BoxGeometry(BW - 0.4, 1.5, 0.14), glassMat);
        light.position.set(0, BH + 1.1, z0 - 0.42);
        g.add(light);
      }
      // a painted mural panel in the school colour
      const mural = new THREE.Mesh(new THREE.BoxGeometry(0.2, BH - 1.2, BD - 1.4), accMat);
      mural.position.set(-BW / 2 - 0.05, BH / 2 + 0.4, 0); g.add(mural);
      // oversized paint-roller sculpture by the door
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 3.4, 10), steelMat);
      handle.position.set(BW / 2 - 1.0, 2.0, BD / 2 + 1.6); handle.rotation.z = 0.24;
      g.add(handle);
      const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 1.8, 16), accMat);
      roller.position.set(BW / 2 - 1.5, 3.8, BD / 2 + 1.6); roller.rotation.z = Math.PI / 2;
      roller.castShadow = true; g.add(roller);

    } else if (zone.id === "Z3") {
      // School of Education & Development — a low, welcoming pavilion set in a garden,
      // with a timber colonnade and a green roof
      const BW = 10.0, BD = 6.4, BH = 4.6;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD),
        new THREE.MeshStandardMaterial({ color: 0xf4efe2, roughness: 0.82 }));
      body.position.y = BH / 2 + 0.3; body.castShadow = true; g.add(body);
      const timberMat = new THREE.MeshStandardMaterial({ color: 0xa9784a, roughness: 0.86 });
      // deep timber colonnade along the front
      for (let i = 0; i < 7; i++) {
        const x = -BW / 2 + 0.6 + i * ((BW - 1.2) / 6);
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, BH + 0.6, 0.3), timberMat);
        post.position.set(x, (BH + 0.6) / 2 + 0.3, BD / 2 + 1.7); post.castShadow = true;
        g.add(post);
      }
      const veranda = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.28, 2.0), timberMat);
      veranda.position.set(0, BH + 0.9, BD / 2 + 1.0); veranda.castShadow = true;
      g.add(veranda);
      const deck = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.24, 2.2), timberMat);
      deck.position.set(0, 0.42, BD / 2 + 1.1); g.add(deck);
      windowBand(1.2, 2.8, BD / 2 + 0.04, 5, BW - 2.0, false);
      // planted green roof with shrubs
      const greenRoof = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.5, 0.5, BD + 0.5),
        new THREE.MeshStandardMaterial({ color: 0x4f8f3d, roughness: 0.96 }));
      greenRoof.position.y = BH + 0.55; greenRoof.castShadow = true; g.add(greenRoof);
      for (let i = 0; i < 9; i++) {
        const bx = -BW / 2 + 0.9 + (i % 5) * ((BW - 1.8) / 4);
        const bz = -BD / 2 + 1.4 + Math.floor(i / 5) * 2.6;
        const shrub = new THREE.Mesh(new THREE.SphereGeometry(0.5 + (i % 3) * 0.1, 10, 8),
          new THREE.MeshStandardMaterial({ color: i % 2 ? 0x3f8c2c : 0x57a83f, roughness: 0.9 }));
        shrub.position.set(bx, BH + 1.0, bz); shrub.scale.y = 0.8;
        g.add(shrub);
      }
      // a young tree in the forecourt
      const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 2.4, 8), timberMat);
      tr.position.set(-BW / 2 + 0.6, 1.2, BD / 2 + 3.4); g.add(tr);
      const can = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 10),
        new THREE.MeshStandardMaterial({ color: 0x3f8c2c, roughness: 0.88 }));
      can.position.set(-BW / 2 + 0.6, 3.5, BD / 2 + 3.4); can.castShadow = true; g.add(can);

    } else if (zone.id === "Z4") {
      // School of Law — a severe neoclassical courthouse: a full colonnade,
      // a heavy pediment, and the scales of justice
      const BW = 9.6, BD = 6.4, BH = 6.6;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD), stoneMat);
      body.position.y = BH / 2 + 0.6; body.castShadow = true; g.add(body);
      // a high stone podium, reached by steps
      const podium = new THREE.Mesh(new THREE.BoxGeometry(BW + 1.6, 0.9, BD + 3.4), stoneDark);
      podium.position.set(0, 0.45, 0.9); podium.receiveShadow = true; g.add(podium);
      for (let s = 0; s < 4; s++) {
        const st = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.0 - s * 0.3, 0.22, 0.6), stoneDark);
        st.position.set(0, 0.11 + s * 0.22, BD / 2 + 2.4 - s * 0.32);
        g.add(st);
      }
      windowBand(0.9, 4.2, BD / 2 + 0.04, 5, BW - 2.4, true);
      // eight-column portico across the whole front
      const COLS = 8, CW = BW - 0.8, CH = 6.0;
      for (let i = 0; i < COLS; i++) {
        const x = -CW / 2 + (i / (COLS - 1)) * CW;
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.42, CH, 16), stoneMat);
        col.position.set(x, CH / 2 + 0.9, BD / 2 + 1.5); col.castShadow = true;
        g.add(col);
        // fluting suggested by four slim ribs
        for (let f = 0; f < 4; f++) {
          const fa = (f / 4) * Math.PI * 2;
          const rib = new THREE.Mesh(new THREE.BoxGeometry(0.08, CH, 0.08), stoneDark);
          rib.position.set(x + Math.cos(fa) * 0.37, CH / 2 + 0.9, BD / 2 + 1.5 + Math.sin(fa) * 0.37);
          g.add(rib);
        }
        const cap = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.34, 1.0), stoneMat);
        cap.position.set(x, CH + 1.05, BD / 2 + 1.5); g.add(cap);
      }
      const entab = new THREE.Mesh(new THREE.BoxGeometry(CW + 1.6, 1.0, 1.9), stoneMat);
      entab.position.set(0, CH + 1.7, BD / 2 + 1.5); entab.castShadow = true; g.add(entab);
      const ped = new THREE.Mesh(new THREE.ConeGeometry((CW + 1.8) / 2, 2.0, 3), stoneMat);
      ped.position.set(0, CH + 3.0, BD / 2 + 1.5);
      ped.rotation.y = Math.PI / 2; ped.scale.z = 0.34; ped.castShadow = true;
      g.add(ped);
      pitchedRoof(BW + 0.4, BD + 0.4, BH + 0.6, 1.8);
      // scales of justice standing on the podium
      const goldM = new THREE.MeshStandardMaterial({ color: 0xd9a93c, roughness: 0.34, metalness: 0.7 });
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 3.0, 10), goldM);
      mast.position.set(-BW / 2 - 1.4, 2.4, BD / 2 + 2.2); g.add(mast);
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, 0.1), goldM);
      beam.position.set(-BW / 2 - 1.4, 3.9, BD / 2 + 2.2); g.add(beam);
      [-1, 1].forEach((s) => {
        const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.34, 0.16, 14), goldM);
        pan.position.set(-BW / 2 - 1.4 + s * 1.05, 3.35, BD / 2 + 2.2); g.add(pan);
        const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.56, 6), goldM);
        wire.position.set(-BW / 2 - 1.4 + s * 1.05, 3.62, BD / 2 + 2.2); g.add(wire);
      });

    } else if (zone.id === "Z5") {
      // School of Language & Communication — a broadcast house: a glazed corner
      // studio, a radio mast, and a satellite dish
      const BW = 9.8, BD = 6.6, BH = 6.4;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD),
        new THREE.MeshStandardMaterial({ color: 0xe8e2d6, roughness: 0.8 }));
      body.position.y = BH / 2 + 0.3; body.castShadow = true; g.add(body);
      // horizontal ribbon windows, very 1930s broadcasting
      [2.6, 4.9].forEach((y) => {
        const rib = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.2, 1.4, 0.18), winMat);
        rib.position.set(0, y, BD / 2 + 0.05); g.add(rib);
        const led = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.0, 0.16, 0.34), stoneMat);
        led.position.set(0, y + 0.86, BD / 2 + 0.1); g.add(led);
      });
      // the glazed on-air studio bay, cantilevered at the corner
      const bay = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 3.4, 20, 1, false, 0, Math.PI), glassMat);
      bay.position.set(BW / 2 - 1.2, BH - 1.2, BD / 2 + 0.6); bay.rotation.y = -Math.PI / 2;
      g.add(bay);
      const bayFloor = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.45, 0.26, 20, 1, false, 0, Math.PI), stoneMat);
      bayFloor.position.set(BW / 2 - 1.2, BH - 2.9, BD / 2 + 0.6); bayFloor.rotation.y = -Math.PI / 2;
      bayFloor.castShadow = true; g.add(bayFloor);
      const bayRoof = new THREE.Mesh(new THREE.CylinderGeometry(2.45, 2.45, 0.26, 20, 1, false, 0, Math.PI), accMat);
      bayRoof.position.set(BW / 2 - 1.2, BH + 0.55, BD / 2 + 0.6); bayRoof.rotation.y = -Math.PI / 2;
      g.add(bayRoof);
      pitchedRoof(BW + 0.4, BD + 0.4, BH + 0.5, 1.4);
      // lattice radio mast with a beacon and signal rings
      const mastH = 8.0;
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.3, mastH, 8), steelMat);
      mast.position.set(-BW / 2 + 1.4, BH + 1.2 + mastH / 2, -BD / 4); mast.castShadow = true;
      g.add(mast);
      for (let i = 0; i < 6; i++) {
        const br = new THREE.Mesh(new THREE.BoxGeometry(0.9 - i * 0.1, 0.08, 0.08), steelMat);
        br.position.set(-BW / 2 + 1.4, BH + 2.0 + i * 1.25, -BD / 4);
        br.rotation.y = i * 0.5;
        g.add(br);
      }
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10),
        new THREE.MeshBasicMaterial({ color: 0xff5a5a }));
      beacon.position.set(-BW / 2 + 1.4, BH + 1.2 + mastH + 0.3, -BD / 4);
      g.add(beacon);
      g.userData.beacon = beacon;
      // broadcast rings radiating from the mast top
      const rings = [];
      for (let i = 0; i < 3; i++) {
        const r = new THREE.Mesh(new THREE.TorusGeometry(1.0 + i * 0.9, 0.06, 8, 30), accMat);
        r.position.set(-BW / 2 + 1.4, BH + 1.2 + mastH + 0.3, -BD / 4);
        r.rotation.x = Math.PI / 2;
        r.material = new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.5 });
        g.add(r); rings.push(r);
      }
      g.userData.rings = rings;
      // satellite dish on the roof
      const dish = new THREE.Mesh(new THREE.SphereGeometry(1.3, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2.6),
        new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.5, side: THREE.DoubleSide }));
      dish.position.set(BW / 2 - 2.0, BH + 1.8, -BD / 4);
      dish.rotation.set(-0.9, 0, 0.3); dish.castShadow = true;
      g.add(dish);

    } else if (zone.id === "Z6") {
      // College of Engineering — a workshop hall: exposed steel frame, a barrel-vault
      // roof, a gantry crane and a rooftop water tank
      const BW = 10.8, BD = 7.2, BH = 6.2;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD),
        new THREE.MeshStandardMaterial({ color: 0xd9dde3, roughness: 0.7, metalness: 0.15 }));
      body.position.y = BH / 2 + 0.3; body.castShadow = true; g.add(body);
      // exposed steel frame on the facade
      for (let i = 0; i <= 5; i++) {
        const x = -BW / 2 + i * (BW / 5);
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.28, BH, 0.28), steelMat);
        col.position.set(x, BH / 2 + 0.3, BD / 2 + 0.16); g.add(col);
      }
      [2.2, 4.4, BH + 0.2].forEach((y) => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.22, 0.28), steelMat);
        b.position.set(0, y, BD / 2 + 0.16); g.add(b);
      });
      // industrial glazing between the frames
      for (let i = 0; i < 5; i++) {
        const x = -BW / 2 + (i + 0.5) * (BW / 5);
        const gl = new THREE.Mesh(new THREE.BoxGeometry(BW / 5 - 0.5, 1.9, 0.14), glassMat);
        gl.position.set(x, 3.3, BD / 2 + 0.1); g.add(gl);
      }
      // big roll-up workshop door
      const door = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.2, 0.2), accMat);
      door.position.set(0, 1.9, BD / 2 + 0.14); g.add(door);
      for (let i = 0; i < 7; i++) {
        const sl = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 0.24), steelMat);
        sl.position.set(0, 0.6 + i * 0.44, BD / 2 + 0.2); g.add(sl);
      }
      // barrel-vault roof: a half-cylinder whose axis runs along the building's depth.
      // the cylinder's own axis is Y, so a single rotation about X lays it along Z
      const vault = new THREE.Mesh(
        new THREE.CylinderGeometry(BW / 2, BW / 2, BD + 0.4, 24, 1, true, 0, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0xaeb8c4, roughness: 0.55, metalness: 0.35,
          side: THREE.DoubleSide })
      );
      vault.rotation.x = Math.PI / 2;
      vault.position.y = BH + 0.3;
      vault.scale.y = 0.62;              // a shallow, workshop-like arc
      vault.castShadow = true;
      g.add(vault);
      // ribs across the vault, and a ridge in the school's colour
      for (let i = 0; i <= 4; i++) {
        const rz = -BD / 2 + i * (BD / 4);
        const rib = new THREE.Mesh(
          new THREE.TorusGeometry(BW / 2, 0.11, 8, 22, Math.PI), steelMat);
        rib.position.set(0, BH + 0.3, rz);
        rib.scale.y = 0.62;
        g.add(rib);
      }
      const vRidge = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.22, BD + 0.5),
        new THREE.MeshStandardMaterial({ color: zone.color, roughness: 0.6 }));
      vRidge.position.set(0, BH + 0.3 + (BW / 2) * 0.62, 0);
      g.add(vRidge);
      // gable end walls closing the vault
      [-1, 1].forEach((s) => {
        const gable = new THREE.Mesh(
          new THREE.CircleGeometry(BW / 2, 24, 0, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0xd9dde3, roughness: 0.7 }));
        gable.position.set(0, BH + 0.3, s * (BD / 2 + 0.2));
        gable.scale.y = 0.62;
        if (s < 0) gable.rotation.y = Math.PI;
        g.add(gable);
      });
      // gantry crane spanning the forecourt
      [-1, 1].forEach((s) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.34, 6.2, 0.34), steelMat);
        leg.position.set(s * (BW / 2 - 0.4), 3.1 + 0.3, BD / 2 + 2.6); leg.castShadow = true;
        g.add(leg);
      });
      const girder = new THREE.Mesh(new THREE.BoxGeometry(BW - 0.4, 0.5, 0.5), accMat);
      girder.position.set(0, 6.5, BD / 2 + 2.6); girder.castShadow = true; g.add(girder);
      for (let i = 0; i < 8; i++) {
        const d2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 0.1), steelMat);
        d2.position.set(-BW / 2 + 0.8 + i * ((BW - 1.6) / 7), 6.05, BD / 2 + 2.6);
        d2.rotation.z = i % 2 ? 0.7 : -0.7;
        g.add(d2);
      }
      const hoist = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), steelMat);
      hoist.position.set(1.4, 6.0, BD / 2 + 2.6); g.add(hoist);
      const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.6, 6), steelMat);
      cable.position.set(1.4, 4.4, BD / 2 + 2.6); g.add(cable);
      const hook = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.07, 8, 14), steelMat);
      hook.position.set(1.4, 3.1, BD / 2 + 2.6); g.add(hook);
      g.userData.hoist = { hoist, cable, hook };
      // rooftop water tank on a stand
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 1.8, 16),
        new THREE.MeshStandardMaterial({ color: 0x8e99a8, roughness: 0.6, metalness: 0.4 }));
      tank.position.set(-BW / 2 + 2.2, BH + 3.9, -BD / 4); tank.castShadow = true; g.add(tank);
      [[-0.7, -0.7], [-0.7, 0.7], [0.7, -0.7], [0.7, 0.7]].forEach(([dx, dz]) => {
        const l = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), steelMat);
        l.position.set(-BW / 2 + 2.2 + dx, BH + 2.0, -BD / 4 + dz); g.add(l);
      });

    } else if (zone.id === "Z7") {
      // School of Innovation & Ventures — the newest building on campus: a glass
      // cube with a canted facade, a roof terrace and an incubator sign
      const BW = 9.6, BD = 6.6, BH = 7.0;
      const core = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.0, BH, BD - 1.0),
        new THREE.MeshStandardMaterial({ color: 0xf3f5f8, roughness: 0.6 }));
      core.position.y = BH / 2 + 0.3; core.castShadow = true; g.add(core);
      // a full glass skin, stepped out from the core
      const skin = new THREE.Mesh(new THREE.BoxGeometry(BW, BH - 0.6, BD), glassMat);
      skin.position.y = BH / 2 + 0.5; g.add(skin);
      // horizontal floor bands + vertical fins
      for (let f = 1; f < 4; f++) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.16, 0.22, BD + 0.16), accMat);
        band.position.y = 0.3 + f * (BH / 4); g.add(band);
      }
      for (let i = 0; i <= 7; i++) {
        const x = -BW / 2 + i * (BW / 7);
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, BH - 0.6, 0.4), steelMat);
        fin.position.set(x, BH / 2 + 0.5, BD / 2 + 0.16); g.add(fin);
      }
      // a canted entrance canopy
      const canopy = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.24, 2.6), accMat);
      canopy.position.set(0, 3.5, BD / 2 + 1.4); canopy.rotation.x = 0.16;
      canopy.castShadow = true; g.add(canopy);
      [-2.2, 2.2].forEach((px) => {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 3.3, 8), steelMat);
        p.position.set(px, 1.75, BD / 2 + 2.4); g.add(p);
      });
      // roof terrace with a rail and planters
      const terrace = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.24, BD),
        new THREE.MeshStandardMaterial({ color: 0xbfae92, roughness: 0.9 }));
      terrace.position.y = BH + 0.45; g.add(terrace);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(i % 2 ? BD : BW, 0.08, 0.08), steelMat);
        rail.position.set(Math.sin(a) * (i % 2 ? BW / 2 : 0), BH + 1.35, Math.cos(a) * (i % 2 ? 0 : BD / 2));
        rail.rotation.y = i % 2 ? Math.PI / 2 : 0;
        g.add(rail);
      }
      for (let i = 0; i < 4; i++) {
        const pl = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.6, 1.1),
          new THREE.MeshStandardMaterial({ color: 0xbfae92, roughness: 0.9 }));
        pl.position.set(-BW / 2 + 1.2 + i * 2.4, BH + 0.87, -BD / 2 + 1.2); g.add(pl);
        const gr = new THREE.Mesh(new THREE.SphereGeometry(0.6, 10, 8),
          new THREE.MeshStandardMaterial({ color: 0x4f8f3d, roughness: 0.92 }));
        gr.position.set(-BW / 2 + 1.2 + i * 2.4, BH + 1.4, -BD / 2 + 1.2); gr.scale.y = 0.7;
        g.add(gr);
      }
      // a lightbulb sculpture — the incubator's mark
      const bulbStem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.4, 8), steelMat);
      bulbStem.position.set(BW / 2 + 1.2, 1.5, BD / 2 + 1.0); g.add(bulbStem);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.9 }));
      bulb.position.set(BW / 2 + 1.2, 3.4, BD / 2 + 1.0); g.add(bulb);
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 0.5, 12), steelMat);
      collar.position.set(BW / 2 + 1.2, 2.7, BD / 2 + 1.0); g.add(collar);
      g.userData.bulb = bulb;

    } else if (zone.id === "Z8") {
      // School of Artificial Intelligence — a data-centre pavilion: a dark glazed
      // box, a server-rack colonnade and a slowly turning neural sculpture
      const BW = 10.0, BD = 6.8, BH = 6.4;
      const body = new THREE.Mesh(new THREE.BoxGeometry(BW, BH, BD),
        new THREE.MeshStandardMaterial({ color: 0x2a3444, roughness: 0.5, metalness: 0.35 }));
      body.position.y = BH / 2 + 0.3; body.castShadow = true; g.add(body);
      // glowing circuit tracery across the facade
      for (let i = 0; i < 5; i++) {
        const y = 1.2 + i * 1.15;
        const tr = new THREE.Mesh(new THREE.BoxGeometry(BW - 1.2, 0.07, 0.06),
          new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.85 }));
        tr.position.set(0, y, BD / 2 + 0.04); g.add(tr);
        for (let k = 0; k < 4; k++) {
          const nx = -BW / 2 + 1.4 + k * ((BW - 2.8) / 3);
          const node = new THREE.Mesh(new THREE.CircleGeometry(0.16, 12),
            new THREE.MeshBasicMaterial({ color: 0xbfe6ff }));
          node.position.set(nx, y, BD / 2 + 0.06); g.add(node);
        }
      }
      // a colonnade of server racks along the front, status lights blinking
      const lights = [];
      for (let i = 0; i < 5; i++) {
        const x = -BW / 2 + 1.0 + i * ((BW - 2.0) / 4);
        const rack = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.6, 0.9),
          new THREE.MeshStandardMaterial({ color: 0x1b222e, roughness: 0.55, metalness: 0.4 }));
        rack.position.set(x, 2.1, BD / 2 + 2.0); rack.castShadow = true; g.add(rack);
        for (let r = 0; r < 6; r++) {
          const led = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.07, 0.05),
            new THREE.MeshBasicMaterial({ color: r % 2 ? 0x5ce1a0 : zone.color }));
          led.position.set(x, 0.9 + r * 0.52, BD / 2 + 2.47);
          g.add(led); lights.push(led);
        }
      }
      g.userData.leds = lights;
      pitchedRoof(BW + 0.4, BD + 0.4, BH + 0.4, 1.2);
      // a neural-network sculpture turning above the roof
      const net = new THREE.Group();
      net.position.set(0, BH + 3.2, 0);
      g.add(net);
      g.userData.net = net;
      const nodePos = [];
      for (let i = 0; i < 3; i++) {
        for (let k = 0; k < 3; k++) {
          const p = new THREE.Vector3((i - 1) * 1.5, (k - 1) * 1.1, 0);
          nodePos.push(p);
          const n = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10),
            new THREE.MeshBasicMaterial({ color: i === 1 ? 0xbfe6ff : zone.color }));
          n.position.copy(p); net.add(n);
        }
      }
      // connect adjacent layers
      for (let i = 0; i < 6; i++) {
        const a = nodePos[i], b = nodePos[i + 3];
        const len = a.distanceTo(b);
        const link = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, len, 6),
          new THREE.MeshBasicMaterial({ color: zone.color, transparent: true, opacity: 0.5 }));
        link.position.copy(a).lerp(b, 0.5);
        link.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0),
          b.clone().sub(a).normalize());
        net.add(link);
      }
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

  // ---------- Campus scenery: avenue trees, benches, noticeboards and bike racks ----------
  (function () {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6f4f31, roughness: 0.92 });
    const leafMats = [0x3f8c2c, 0x4fa337, 0x357a26].map((c) =>
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.88 }));
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x2b3340, roughness: 0.5, metalness: 0.55 });
    const timberMat = new THREE.MeshStandardMaterial({ color: 0x8c6239, roughness: 0.88 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xded3bd, roughness: 0.86 });

    function tree(x, z, s) {
      const gg = new THREE.Group();
      gg.position.set(x, 0, z); gg.scale.setScalar(s);
      const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.46, 3.6, 8), trunkMat);
      tr.position.y = 1.8; tr.castShadow = true; gg.add(tr);
      // three offset blobs make a fuller, less geometric canopy
      [[0, 5.0, 0, 2.3], [-1.2, 4.2, 0.6, 1.6], [1.1, 4.4, -0.6, 1.45]].forEach(([bx, by, bz, r], i) => {
        const b = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), leafMats[i % 3]);
        b.position.set(bx, by, bz); b.castShadow = true; gg.add(b);
      });
      scene.add(gg);
    }

    // a mature tree belt outside the campus wall, skipping the gate approach
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2;
      const da = Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2));
      if (Math.abs(da) < 0.5) continue;
      const r = SHELL_R + 7 + (i % 3) * 4.5;
      tree(Math.cos(a) * r, Math.sin(a) * r, 0.95 + (i % 4) * 0.16);
    }
    // specimen trees on the lawn between the schools
    for (let i = 0; i < ZONES.length; i++) {
      const a = (i + 0.5) * ((Math.PI * 2) / ZONES.length) - Math.PI / 2 + OFF;
      tree(Math.cos(a) * (RADIUS - 5), Math.sin(a) * (RADIUS - 5), 0.9);
      tree(Math.cos(a) * (RADIUS + 8), Math.sin(a) * (RADIUS + 8), 1.05);
    }

    // benches and lamp standards lining the ring walk
    const walkR = SHELL_R - 9;
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2 + 0.28;
      const x = Math.cos(a) * (walkR - 3.4), z = Math.sin(a) * (walkR - 3.4);
      // park bench: timber slats on iron ends
      const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.14, 0.75), timberMat);
      seat.position.set(x, 0.62, z); seat.rotation.y = -a; seat.castShadow = true;
      scene.add(seat);
      const backr = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.66, 0.12), timberMat);
      backr.position.set(x - Math.cos(a) * 0.32, 1.02, z - Math.sin(a) * 0.32);
      backr.rotation.y = -a; scene.add(backr);
      [-1, 1].forEach((s) => {
        const endp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.62, 0.75), ironMat);
        endp.position.set(x - Math.sin(a) * s * 1.14, 0.31, z + Math.cos(a) * s * 1.14);
        endp.rotation.y = -a; scene.add(endp);
      });

      // a tall iron lamp standard, the same family as the ones at the tower
      const lampA = a + 0.16;
      const lx = Math.cos(lampA) * (walkR + 2.8), lz = Math.sin(lampA) * (walkR + 2.8);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.17, 4.8, 8), ironMat);
      post.position.set(lx, 2.4, lz); post.castShadow = true; scene.add(post);
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.72, 0.52),
        new THREE.MeshBasicMaterial({ color: 0xfff0c4 }));
      lamp.position.set(lx, 5.1, lz); scene.add(lamp);
      const lcap = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.36, 4), ironMat);
      lcap.position.set(lx, 5.62, lz); lcap.rotation.y = Math.PI / 4; scene.add(lcap);
    }

    // noticeboards facing the walk, plastered with society posters
    const posterCols = [0xff6f91, 0x4f7cff, 0x34c38f, 0xffb703, 0x8378de];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.85;
      const x = Math.cos(a) * (walkR - 6.5), z = Math.sin(a) * (walkR - 6.5);
      const board = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.0, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x33414f, roughness: 0.75 }));
      board.position.set(x, 2.0, z); board.rotation.y = -a + Math.PI / 2;
      board.castShadow = true; scene.add(board);
      const cork = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 1.7),
        new THREE.MeshStandardMaterial({ color: 0xc89a63, roughness: 0.9 }));
      cork.position.set(x + Math.cos(a) * 0.1, 2.0, z + Math.sin(a) * 0.1);
      cork.rotation.y = -a + Math.PI / 2; scene.add(cork);
      // a scatter of poster rectangles
      for (let p = 0; p < 6; p++) {
        const px = -1.1 + (p % 3) * 1.05, py = 0.42 - Math.floor(p / 3) * 0.86;
        const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.62),
          new THREE.MeshBasicMaterial({ color: posterCols[(i + p) % posterCols.length] }));
        const ox = Math.cos(a) * 0.12, oz = Math.sin(a) * 0.12;
        poster.position.set(x + ox - Math.sin(-a + Math.PI / 2) * px, 2.0 + py, z + oz + Math.cos(-a + Math.PI / 2) * px);
        poster.rotation.y = -a + Math.PI / 2;
        poster.rotation.z = (p % 2 ? 1 : -1) * 0.04;
        scene.add(poster);
      }
      [-1.4, 1.4].forEach((s) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.1, 0.16), ironMat);
        leg.position.set(x - Math.sin(-a + Math.PI / 2) * s, 0.55, z + Math.cos(-a + Math.PI / 2) * s);
        scene.add(leg);
      });
    }

    // bicycle racks with a few parked bikes
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 2.1;
      const bx = Math.cos(a) * (walkR - 5.0), bz = Math.sin(a) * (walkR - 5.0);
      for (let h = 0; h < 5; h++) {
        const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 8, 18, Math.PI), ironMat);
        hoop.position.set(bx - Math.sin(-a) * (h - 2) * 0.95, 0.42, bz + Math.cos(-a) * (h - 2) * 0.95);
        hoop.rotation.y = -a;
        scene.add(hoop);
      }
      // two bikes suggested by wheels and a frame bar
      [-1, 1].forEach((s) => {
        const off = s * 1.5;
        [-0.55, 0.55].forEach((w) => {
          const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 8, 20), ironMat);
          wheel.position.set(bx - Math.sin(-a) * (off + w), 0.44, bz + Math.cos(-a) * (off + w));
          wheel.rotation.y = -a + Math.PI / 2;
          scene.add(wheel);
        });
        const bar = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.07, 0.07),
          new THREE.MeshStandardMaterial({ color: posterCols[i % posterCols.length], roughness: 0.5 }));
        bar.position.set(bx - Math.sin(-a) * off, 0.78, bz + Math.cos(-a) * off);
        bar.rotation.y = -a;
        scene.add(bar);
      });
    }

    // a campus signpost with fingerboards, at the head of the approach walk
    (function () {
      const sx = 5.2, sz = SHELL_R - 13;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 4.4, 10), timberMat);
      post.position.set(sx, 2.2, sz); post.castShadow = true; scene.add(post);
      ZONES.slice(0, 4).forEach((z, i) => {
        const fb = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.4, 0.1),
          new THREE.MeshStandardMaterial({ color: z.color, roughness: 0.6 }));
        fb.position.set(sx + 1.15, 3.9 - i * 0.62, sz);
        fb.rotation.y = i * 0.7;
        fb.position.set(sx + Math.cos(i * 0.7) * 1.15, 3.9 - i * 0.62, sz - Math.sin(i * 0.7) * 1.15);
        scene.add(fb);
      });
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.4, 8), stoneMat);
      cap.position.set(sx, 4.6, sz); scene.add(cap);
    })();
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

    // ---------- Lecture theatre interior: panelled walls, tall windows, a raked gallery ----------
    // 1) daylight sky seen through the windows
    const domeCan = document.createElement("canvas"); domeCan.width = 16; domeCan.height = 256;
    const dctx = domeCan.getContext("2d");
    const grad = dctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, "#3f8fd6");
    grad.addColorStop(0.55, "#9fd4f5");
    grad.addColorStop(0.72, "#e8f6ff");
    grad.addColorStop(0.74, "#5da749");
    grad.addColorStop(1.0, "#3f7a30");
    dctx.fillStyle = grad; dctx.fillRect(0, 0, 16, 256);
    const domeTex = new THREE.CanvasTexture(domeCan);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(150, 32, 20),
      new THREE.MeshBasicMaterial({ map: domeTex, side: THREE.BackSide, fog: false, depthWrite: false })
    );
    grp.add(dome);
    // lawn outside the windows
    const lawn = new THREE.Mesh(new THREE.CircleGeometry(140, 60),
      new THREE.MeshStandardMaterial({ color: 0x4f8f3d, roughness: 0.96 }));
    lawn.rotation.x = -Math.PI / 2; lawn.position.y = -0.2;
    grp.add(lawn);

    // parquet floor with a runner carpet down the centre aisle
    const floor = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.3, RD),
      new THREE.MeshStandardMaterial({ color: 0x9a6f45, roughness: 0.6, metalness: 0.05 }));
    floor.position.y = -0.15; floor.receiveShadow = true;
    grp.add(floor);
    // parquet joints
    for (let x = -RW / 2 + 3; x < RW / 2; x += 3) {
      const j = new THREE.Mesh(new THREE.PlaneGeometry(0.1, RD),
        new THREE.MeshBasicMaterial({ color: 0x86603c }));
      j.rotation.x = -Math.PI / 2; j.position.set(x, 0.02, 0);
      grp.add(j);
    }
    // the runner is tinted well back toward cream, so it never competes with the cards
    const runnerCol = new THREE.Color(zone.color).lerp(new THREE.Color(0xffffff), 0.5);
    const runner = new THREE.Mesh(new THREE.PlaneGeometry(5.4, RD - 2),
      new THREE.MeshStandardMaterial({ color: runnerCol, roughness: 0.92 }));
    runner.rotation.x = -Math.PI / 2; runner.position.set(0, 0.04, 2);
    grp.add(runner);
    [-1, 1].forEach((s) => {
      const trimline = new THREE.Mesh(new THREE.PlaneGeometry(0.28, RD - 2),
        new THREE.MeshBasicMaterial({ color: 0xe6dcc4 }));
      trimline.rotation.x = -Math.PI / 2; trimline.position.set(s * 2.4, 0.05, 2);
      grp.add(trimline);
    });

    // ---------- Walls: dado panelling below, plaster above, tall windows between ----------
    const plasterMat = new THREE.MeshStandardMaterial({ color: 0xefe7d6, roughness: 0.88 });
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x7d5433, roughness: 0.62 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x8f6540, roughness: 0.55 });
    const DADO = 3.2;
    function hallWall(width, cx, cz, along, withWindows) {
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(along === "x" ? width : 0.5, RH, along === "x" ? 0.5 : width),
        plasterMat);
      wall.position.set(cx, RH / 2, cz); wall.receiveShadow = true;
      grp.add(wall);
      // timber dado panelling
      const dado = new THREE.Mesh(
        new THREE.BoxGeometry(along === "x" ? width : 0.62, DADO, along === "x" ? 0.62 : width),
        panelMat);
      dado.position.set(cx, DADO / 2, cz);
      grp.add(dado);
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(along === "x" ? width : 0.74, 0.22, along === "x" ? 0.74 : width),
        trimMat);
      rail.position.set(cx, DADO + 0.1, cz);
      grp.add(rail);
      // stiles dividing the panelling into bays
      const bays = Math.round(width / 3.4);
      for (let i = 0; i <= bays; i++) {
        const off = -width / 2 + i * (width / bays);
        const st = new THREE.Mesh(
          new THREE.BoxGeometry(along === "x" ? 0.22 : 0.68, DADO, along === "x" ? 0.68 : 0.22),
          trimMat);
        if (along === "x") st.position.set(cx + off, DADO / 2, cz);
        else st.position.set(cx, DADO / 2, cz + off);
        grp.add(st);
      }
      // cornice where the wall meets the ceiling
      const cornice = new THREE.Mesh(
        new THREE.BoxGeometry(along === "x" ? width : 0.78, 0.34, along === "x" ? 0.78 : width),
        new THREE.MeshStandardMaterial({ color: 0xf6f0e2, roughness: 0.8 }));
      cornice.position.set(cx, RH - 0.5, cz);
      grp.add(cornice);
      if (!withWindows) return;
      // tall sash windows looking onto the lawn
      const nrm = along === "x" ? (cz < 0 ? 1 : -1) : (cx < 0 ? 1 : -1);
      for (let i = 0; i < bays; i++) {
        const off = -width / 2 + (i + 0.5) * (width / bays);
        const glass = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 5.2),
          new THREE.MeshBasicMaterial({ color: 0xcfe7f7, transparent: true, opacity: 0.32 }));
        const surround = new THREE.Mesh(new THREE.BoxGeometry(2.5, 5.7, 0.16), trimMat);
        const setPos = (m, d) => {
          if (along === "x") { m.position.set(cx + off, 6.6, cz + d * nrm); m.rotation.y = nrm > 0 ? 0 : Math.PI; }
          else { m.position.set(cx + d * nrm, 6.6, cz + off); m.rotation.y = nrm > 0 ? Math.PI / 2 : -Math.PI / 2; }
        };
        setPos(surround, 0.2); grp.add(surround);
        setPos(glass, 0.3); grp.add(glass);
        // glazing bars: a six-over-six sash
        for (let b = 1; b < 3; b++) {
          const mull = new THREE.Mesh(new THREE.BoxGeometry(0.09, 5.2, 0.05), trimMat);
          const mx = -1.0 + b * (2.0 / 3);
          if (along === "x") { mull.position.set(cx + off + mx, 6.6, cz + 0.32 * nrm); }
          else { mull.position.set(cx + 0.32 * nrm, 6.6, cz + off + mx); mull.rotation.y = Math.PI / 2; }
          grp.add(mull);
        }
        [-1.3, 0, 1.3].forEach((dy) => {
          const tr = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.09, 0.05), trimMat);
          if (along === "x") { tr.position.set(cx + off, 6.6 + dy, cz + 0.32 * nrm); }
          else { tr.position.set(cx + 0.32 * nrm, 6.6 + dy, cz + off); tr.rotation.y = Math.PI / 2; }
          grp.add(tr);
        });
      }
    }
    hallWall(RW, 0, -RD / 2, "x", false);  // the lecture wall, behind the board
    hallWall(RW, 0, RD / 2, "x", true);
    hallWall(RD, -RW / 2, 0, "z", true);
    hallWall(RD, RW / 2, 0, "z", true);

    // coffered ceiling with pendant lights
    const ceil = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.3, RD),
      new THREE.MeshStandardMaterial({ color: 0xfaf4e6, roughness: 0.86 }));
    ceil.position.y = RH;
    grp.add(ceil);
    for (let x = -RW / 2 + 4.5; x < RW / 2 - 1; x += 9) {
      for (let z = -RD / 2 + 4.5; z < RD / 2 - 1; z += 9) {
        const coffer = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.3, 8.2),
          new THREE.MeshStandardMaterial({ color: 0xf4eddd, roughness: 0.88 }));
        coffer.position.set(x, RH - 0.22, z);
        grp.add(coffer);
        const bead = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.16, 8.6),
          new THREE.MeshStandardMaterial({ color: 0xd8c7a6, roughness: 0.7 }));
        bead.position.set(x, RH - 0.42, z);
        grp.add(bead);
      }
    }
    // brass pendant lamps down the hall
    for (let i = 0; i < 4; i++) {
      const z = -RD / 2 + 9 + i * (RD / 4.4);
      [-10, 10].forEach((x) => {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 6),
          new THREE.MeshStandardMaterial({ color: 0xb08a3c, roughness: 0.4, metalness: 0.6 }));
        rod.position.set(x, RH - 1.1, z);
        grp.add(rod);
        const shade = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.7, 16, 1, true),
          new THREE.MeshStandardMaterial({ color: 0x2f4f45, roughness: 0.5, metalness: 0.3,
            side: THREE.DoubleSide }));
        shade.position.set(x, RH - 2.1, z);
        grp.add(shade);
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 10),
          new THREE.MeshBasicMaterial({ color: 0xffefc4 }));
        bulb.position.set(x, RH - 2.4, z);
        grp.add(bulb);
      });
    }

    // ---------- The lecture wall: a blackboard flanked by panelling ----------
    const board = new THREE.Mesh(new THREE.BoxGeometry(26, 9.6, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x24382f, roughness: 0.92 }));
    board.position.set(0, RH / 2 + 1.0, -RD / 2 + 0.42);
    grp.add(board);
    const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(27, 10.6, 0.22), trimMat);
    boardFrame.position.set(0, RH / 2 + 1.0, -RD / 2 + 0.3);
    grp.add(boardFrame);
    // the school's title, chalked on the board
    const header = new THREE.Mesh(new THREE.PlaneGeometry(24, 8.4),
      new THREE.MeshBasicMaterial({ map: roomHeaderTexture(zone), transparent: true }));
    header.position.set(0, RH / 2 + 1.2, -RD / 2 + 0.6);
    grp.add(header);
    // chalk tray and a lectern in front of the board
    const tray = new THREE.Mesh(new THREE.BoxGeometry(26, 0.22, 0.5), trimMat);
    tray.position.set(0, RH / 2 - 4.0, -RD / 2 + 0.6);
    grp.add(tray);
    const dais = new THREE.Mesh(new THREE.BoxGeometry(RW - 16, 0.4, 5.0),
      new THREE.MeshStandardMaterial({ color: 0x8c6239, roughness: 0.7 }));
    dais.position.set(0, 0.2, -RD / 2 + 4.0);
    dais.receiveShadow = true;
    grp.add(dais);
    const lectern = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.25, 0.9), panelMat);
    lectern.position.set(-6.5, 1.05, -RD / 2 + 4.2); lectern.castShadow = true;
    grp.add(lectern);
    const slope = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.12, 1.1), trimMat);
    slope.position.set(-6.5, 1.72, -RD / 2 + 4.2); slope.rotation.x = -0.28;
    grp.add(slope);
    const colourBand = new THREE.Mesh(new THREE.PlaneGeometry(RW, 0.5),
      new THREE.MeshBasicMaterial({ color: zone.color }));
    colourBand.position.set(0, 0.62, -RD / 2 + 0.3);
    grp.add(colourBand);

    // ---------- A raked gallery of tiered benches along the back ----------
    for (let r = 0; r < 4; r++) {
      const zRow = RD / 2 - 5.5 - r * 3.2;
      const y = 0.55 + r * 0.75;
      const tier = new THREE.Mesh(new THREE.BoxGeometry(RW - 6, 0.5 + r * 0.75, 2.6),
        new THREE.MeshStandardMaterial({ color: 0xa8825a, roughness: 0.82 }));
      tier.position.set(0, (0.5 + r * 0.75) / 2, zRow);
      tier.receiveShadow = true;
      grp.add(tier);
      // the desk top and bench for each tier
      const desk = new THREE.Mesh(new THREE.BoxGeometry(RW - 6.6, 0.18, 1.1), panelMat);
      desk.position.set(0, y + 0.42, zRow - 0.7);
      desk.castShadow = true;
      grp.add(desk);
      const bench = new THREE.Mesh(new THREE.BoxGeometry(RW - 6.6, 0.16, 0.7), trimMat);
      bench.position.set(0, y + 0.18, zRow + 0.75);
      grp.add(bench);
      // the centre aisle cuts through the rows
      const cut = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.62 + r * 0.75, 2.8),
        new THREE.MeshStandardMaterial({ color: zone.color, roughness: 0.9 }));
      cut.position.set(0, (0.5 + r * 0.75) / 2, zRow);
      grp.add(cut);
    }

    // lighting: the scene's daylight already reaches here, so add only a soft fill
    const kl = new THREE.DirectionalLight(0xfff0d6, 0.5);
    kl.position.set(12, 30, 26); grp.add(kl); grp.add(kl.target);
    const cl = new THREE.PointLight(0xfff3dd, 0.55, 80); cl.position.set(0, RH - 3, 2); grp.add(cl);
    const fill = new THREE.PointLight(0xfff3dd, 0.3, 70); fill.position.set(0, RH - 1.5, -RD / 4); grp.add(fill);


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

      ${edmFile ? `<div class="m-pane" id="paneEdm">
        <div class="edm-bar">
          <span class="edm-note">${T("edmNote")}</span>
          <a class="edm-open" href="edm/${LANG}/${edmFile}" target="_blank" rel="noopener">${T("edmOpen")}</a>
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
        if (fr && !fr.getAttribute("src")) fr.setAttribute("src", `edm/${LANG}/${edmFile}`);
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
      ? "M365 Copilot Agent — University"
      : "M365 Copilot Agent — 大學";
  }

  function retextureScene() {
    // the two big 3D wordmarks: the arch header and the plaza welcome line
    if (shellGroup.userData.nameP) {
      const m = shellGroup.userData.nameP.material;
      m.map.dispose();
      m.map = textTexture(T("parkSign"), 1120, 150, "800 76px 'Segoe UI'", "#ffffff", "#ff5d73");
      m.needsUpdate = true;
    }
    if (plazaGroup.userData.title) {
      const m = plazaGroup.userData.title.material;
      m.map.dispose();
      m.map = textTexture(T("plazaWelcome"), 1180, 112, "800 52px 'Segoe UI'", "#7a4a20", "#ffd88a");
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
    // the weather vane on the clock tower turns lazily in the breeze
    if (plazaGroup.userData.vane) {
      plazaGroup.userData.vane.rotation.y = Math.sin(t * 0.18) * 0.9 + 0.4;
    }
    // clouds drift slowly across the campus and always face the camera
    clouds.forEach((c) => {
      c.a += c.speed * 0.02;
      c.mesh.position.x = Math.cos(c.a) * c.r;
      c.mesh.position.z = Math.sin(c.a) * c.r;
      c.mesh.lookAt(camPos.x, c.mesh.position.y, camPos.z);
    });
    // the campus is alive in small ways: a beacon blinks, a crane hoist rises and
    // falls, a bulb glows, server LEDs flicker, a neural sculpture turns
    zoneGroups.forEach(({ group }) => {
      if (group.userData.beacon) {
        const on = Math.sin(t * 2.4) > 0.3;
        group.userData.beacon.material.color.setHex(on ? 0xff5a5a : 0x5a2020);
      }
      if (group.userData.rings) {
        group.userData.rings.forEach((r, i) => {
          const ph = (t * 0.5 + i * 0.33) % 1;
          r.scale.setScalar(0.6 + ph * 1.6);
          r.material.opacity = 0.55 * (1 - ph);
        });
      }
      if (group.userData.hoist) {
        const h = group.userData.hoist;
        const drop = 1.2 + Math.sin(t * 0.5) * 0.9;
        h.cable.scale.y = drop / 2.6 * 2;
        h.cable.position.y = 6.0 - (drop * 2.6) / 2 / 2;
        h.hook.position.y = 6.0 - drop * 1.3;
      }
      if (group.userData.bulb) {
        const b = group.userData.bulb;
        b.material.opacity = 0.72 + Math.sin(t * 1.6) * 0.2;
        b.scale.setScalar(1 + Math.sin(t * 1.6) * 0.03);
      }
      if (group.userData.leds) {
        group.userData.leds.forEach((l, i) => {
          l.visible = Math.sin(t * (2 + (i % 5) * 0.7) + i) > -0.4;
        });
      }
      if (group.userData.net) group.userData.net.rotation.y = t * 0.3;
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
