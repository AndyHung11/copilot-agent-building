#!/usr/bin/env python3
"""Build the single-file offline edition of each 3D Agent site.

Every site (/, /expo/, /planet/, /playground/) loads three.js, its data files
and building.js with <script src>, so saving the page from a browser gives a
broken copy. This script inlines every local script and image into one HTML
file under downloads/, which runs from file:// with no network.

Usage:  python _tools/build_offline.py
"""

from __future__ import annotations

import base64
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_URL = "https://andyhung11.github.io/copilot-agent-building/"
EDM_LANGS = ("zh", "cn", "en")

SITES = [
    {"dir": ".", "out": "copilot-agent-building.html"},
    {"dir": "expo", "out": "copilot-agent-expo.html"},
    {"dir": "planet", "out": "copilot-agent-planet.html"},
    {"dir": "playground", "out": "copilot-agent-playground.html"},
]

SCRIPT_TAG = re.compile(r'[ \t]*<script src="([^"]+)"></script>\r?\n')
DOWNLOAD_BTN = re.compile(r'<a id="downloadBtn"[^>]*>.*?</a>', re.S)
EDM_URL_CALL = re.compile(r"new URL\(`\$\{LANG\}/\$\{edmFile\}`, EDM_BASE_URL\)\.href")
EDM_FRAME_GUARDED = re.compile(
    r'if \((\w+) && !\1\.getAttribute\("src"\)\) \1\.setAttribute\("src", edmUrl\);'
)
EDM_FRAME_SRC = re.compile(r'(\w+)\.setAttribute\("src", edmUrl\);')
LOGO = "copilot-logo.png"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def data_uri(path: Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode("ascii")


def edm_offline_pack() -> str:
    """Embed every newsletter so the EDM panes render with no network."""
    docs: dict[str, str] = {}
    for lang in EDM_LANGS:
        for path in sorted((ROOT / "edm" / lang).glob("*.html")):
            docs[f"{lang}/{path.name}"] = read_text(path)

    # The newsletters contain their own </script> tags; escaping the slash keeps
    # the JSON valid while stopping the parser from ending this block early.
    payload = json.dumps(docs, ensure_ascii=False).replace("</", "<\\/")
    return (
        "<script>\n"
        "/* offline newsletters: every EDM is inlined and mounted via srcdoc, which\n"
        "   works from file:// where blob: and cross-origin iframes do not. */\n"
        f"const EDM_DOCS = {payload};\n"
        f'function EDM_URL(lang, file) {{ return "{SITE_URL}edm/" + lang + "/" + file; }}\n'
        "function EDM_MOUNT(frame, lang, file) {\n"
        "  if (!frame || frame.dataset.mounted) return;\n"
        "  frame.dataset.mounted = '1';\n"
        "  const doc = EDM_DOCS[lang + '/' + file];\n"
        "  if (doc) frame.setAttribute('srcdoc', doc);\n"
        "  else frame.setAttribute('src', EDM_URL(lang, file));\n"
        "}\n"
        "</script>\n"
    )


def inline_script(src: str, site_dir: Path, logo_uri: str) -> str:
    """Return the <script> block that replaces <script src="..."></script>."""
    target = (site_dir / src).resolve()
    code = read_text(target)

    if target.name == "index.js" and target.parent.name == "edm":
        # document.currentScript.src is empty once inlined, so pin the base URL.
        code = re.sub(
            r"const EDM_BASE_URL = .*?;",
            f'const EDM_BASE_URL = "{SITE_URL}edm/";',
            code,
            count=1,
        )
        block = f"<script>\n/* inlined: {src} */\n{code}\n</script>\n"
        return block + edm_offline_pack()

    if target.name == "building.js":
        code, url_hits = EDM_URL_CALL.subn("EDM_URL(LANG, edmFile)", code)
        code, guarded = EDM_FRAME_GUARDED.subn(r"EDM_MOUNT(\1, LANG, edmFile);", code)
        code, bare = EDM_FRAME_SRC.subn(r"EDM_MOUNT(\1, LANG, edmFile);", code)
        if not url_hits or guarded + bare != url_hits:
            raise SystemExit(
                f"{target}: EDM rewrite mismatch "
                f"(urls={url_hits}, frames={guarded + bare}) — offline panes would break"
            )

    code = code.replace(f'"{LOGO}"', f'"{logo_uri}"')
    if "</script" in code:
        raise SystemExit(f"{target} contains a closing script tag; cannot inline")
    return f"<script>\n/* inlined: {src} */\n{code}\n</script>\n"


def build(site: dict) -> Path:
    site_dir = (ROOT / site["dir"]).resolve()
    html = read_text(site_dir / "index.html")
    logo_uri = data_uri(site_dir / LOGO, "image/png")

    html = SCRIPT_TAG.sub(lambda m: inline_script(m.group(1), site_dir, logo_uri), html)
    html = html.replace(f'src="{LOGO}"', f'src="{logo_uri}"')

    # The offline copy keeps its own download button, pointing back at the
    # published file so a reader can always re-fetch a fresh copy.
    html = DOWNLOAD_BTN.sub(
        f'<a id="downloadBtn" href="{SITE_URL}downloads/{site["out"]}" download '
        f'aria-label="下載離線 HTML / Download offline HTML" '
        f'title="下載離線 HTML / Download offline HTML">⬇ HTML</a>',
        html,
        count=1,
    )

    # Markup only: template literals inside the inlined scripts build their
    # own URLs at runtime and are not static references.
    markup = re.sub(r"<script\b.*?</script>", "", html, flags=re.S)
    leftovers = [
        ref
        for ref in re.findall(r'(?:src|href)="([^"#]+)"', markup)
        if not ref.startswith(("http", "data:", "mailto:", "javascript:"))
    ]
    if leftovers:
        raise SystemExit(
            f"{site['dir']}: unresolved local references {sorted(set(leftovers))}"
        )

    out_path = ROOT / "downloads" / site["out"]
    out_path.write_text(html, encoding="utf-8", newline="")
    return out_path


def main() -> int:
    for site in SITES:
        path = build(site)
        print(f"{path.relative_to(ROOT).as_posix()}  {path.stat().st_size / 1024:.0f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
