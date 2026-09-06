# -*- coding: utf-8 -*-
"""
Compiles the master dictionary (1,689+ keys) into kumbh-setu/frontend/i18n.js
with full trilingual support and dynamic pattern replacement.
"""
import json
import os

with open('/tmp/master_translations.json', 'r', encoding='utf-8') as f:
    master_dict = json.load(f)

json_translations = json.dumps(master_dict, ensure_ascii=False, indent=2)

JS_CODE = f"""/**
 * KumbhSetu (कुंभसेतु) — Complete Trilingual Translation Engine
 * Official Languages: English (en), Marathi (mr / मराठी), Hindi (hi / हिंदी)
 * Covers all 23 screens with {len(master_dict)}+ verified entries and dynamic pattern matching.
 */

(function () {{
  'use strict';

  const TRANSLATIONS = {json_translations};

  const LANG_STORAGE_KEY = 'kumbhsetu_lang';
  const SUPPORTED_LANGS = ['en', 'mr', 'hi'];

  function getSavedLang() {{
    let saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (!saved || !SUPPORTED_LANGS.includes(saved)) {{
      saved = 'en';
    }}
    return saved;
  }}

  function saveLang(lang) {{
    if (SUPPORTED_LANGS.includes(lang)) {{
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      applyTranslations(lang);
      updateLanguageUIElements(lang);
      window.dispatchEvent(new CustomEvent('kumbh_language_changed', {{ detail: {{ lang }} }}));
    }}
  }}

  // Core Pattern Matcher for Dynamic Content (Reviews, Distances, Times, Rates)
  function matchDynamicPattern(str, targetLang) {{
    if (!str || typeof str !== 'string') return null;
    const t = str.trim();

    // 1. Reviews: "(1,042 reviews)"
    let m = t.match(/^\\((\\d+[\\d,]*)\\s*reviews?\\)$/i);
    if (m) {{
      return targetLang === 'mr' ? `(${{m[1]}} पुनरावलोकने)` : (targetLang === 'hi' ? `(${{m[1]}} समीक्षाएं)` : `(${{m[1]}} reviews)`);
    }}

    // 2. Tours: "(184 tours)"
    m = t.match(/^\\((\\d+[\\d,]*)\\s*tours?\\)$/i);
    if (m) {{
      return targetLang === 'mr' ? `(${{m[1]}} दौरे)` : (targetLang === 'hi' ? `(${{m[1]}} टूर)` : `(${{m[1]}} tours)`);
    }}

    // 3. Pax: "(3 pax)"
    m = t.match(/^\\((\\d+[\\d,]*)\\s*pax\\)$/i);
    if (m) {{
      return targetLang === 'mr' ? `(${{m[1]}} प्रवासी)` : (targetLang === 'hi' ? `(${{m[1]}} यात्री)` : `(${{m[1]}} pax)`);
    }}

    // 4. Walking distance: "(7 min walk)"
    m = t.match(/^\\((\\d+[\\d,]*)\\s*mins?\\s*walk\\)$/i);
    if (m) {{
      return targetLang === 'mr' ? `(${{m[1]}} मिनिटे चालत)` : (targetLang === 'hi' ? `(${{m[1]}} मिनट पैदल)` : `(${{m[1]}} min walk)`);
    }}

    // 5. Distance: "1.2 km away" or "120m away"
    m = t.match(/^(\\d+[\\d,.]*)\\s*(?:km|km\\s*away)(?:\\s*•\\s*(.*))?$/i);
    if (m) {{
      const extra = m[2] ? translateText(m[2], targetLang) : '';
      if (targetLang === 'mr') return extra ? `${{m[1]}} किमी अंतरावर • ${{extra}}` : `${{m[1]}} किमी अंतरावर`;
      if (targetLang === 'hi') return extra ? `${{m[1]}} किमी दूर • ${{extra}}` : `${{m[1]}} किमी दूर`;
      return t;
    }}

    m = t.match(/^(\\d+[\\d,.]*)\\s*(?:m|m\\s*away)(?:\\s*•\\s*(.*))?$/i);
    if (m) {{
      const extra = m[2] ? translateText(m[2], targetLang) : '';
      if (targetLang === 'mr') return extra ? `${{m[1]}} मी अंतरावर • ${{extra}}` : `${{m[1]}} मी अंतरावर`;
      if (targetLang === 'hi') return extra ? `${{m[1]}} मी दूर • ${{extra}}` : `${{m[1]}} मी दूर`;
      return t;
    }}

    // 6. Time ago: "12m ago", "2 hrs ago"
    m = t.match(/^(\\d+)\\s*m\\s*ago$/i);
    if (m) {{
      return targetLang === 'mr' ? `${{m[1]}} मिनिटांपूर्वी` : (targetLang === 'hi' ? `${{m[1]}} मिनट पहले` : `${{m[1]}}m ago`);
    }}
    m = t.match(/^(\\d+)\\s*hrs?\\s*ago$/i);
    if (m) {{
      return targetLang === 'mr' ? `${{m[1]}} तासांपूर्वी` : (targetLang === 'hi' ? `${{m[1]}} घंटे पहले` : `${{m[1]}} hrs ago`);
    }}

    // 7. Rates: "/ night", "/ satvik thali", "/ full half-day tour"
    if (t.startsWith('/')) {{
      const rest = t.substring(1).trim();
      const transRest = translateText(rest, targetLang);
      if (transRest && transRest !== rest) {{
        return `/ ${{transRest}}`;
      }}
    }}

    return null;
  }}

  function translateText(str, targetLang) {{
    if (!str || typeof str !== 'string') return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    // 0. Check dynamic pattern (reviews, distances, timers)
    const dynMatch = matchDynamicPattern(trimmed, targetLang);
    if (dynMatch) return dynMatch;

    // 1. Direct dictionary match
    if (TRANSLATIONS[trimmed] && TRANSLATIONS[trimmed][targetLang]) {{
      return TRANSLATIONS[trimmed][targetLang];
    }}

    // 2. Case-insensitive dictionary match
    const lower = trimmed.toLowerCase();
    for (const key in TRANSLATIONS) {{
      if (key.toLowerCase() === lower) {{
        return TRANSLATIONS[key][targetLang] || TRANSLATIONS[key].en || trimmed;
      }}
    }}

    // 3. Reverse lookup (if node is currently in mr or hi)
    for (const key in TRANSLATIONS) {{
      const entry = TRANSLATIONS[key];
      if (entry.en === trimmed || entry.mr === trimmed || entry.hi === trimmed ||
          (entry.en && entry.en.toLowerCase() === lower) ||
          (entry.mr && entry.mr.toLowerCase() === lower) ||
          (entry.hi && entry.hi.toLowerCase() === lower)) {{
        return entry[targetLang] || entry.en || trimmed;
      }}
    }}

    // 4. Smart suffix handling (colon, arrow, bullet, ellipsis)
    const suffixMatch = trimmed.match(/^(.*?)([\\s]*[:•→]+|\\{{3\\}}|\\.\\.\\.)$/);
    if (suffixMatch) {{
      const base = suffixMatch[1].trim();
      const punct = suffixMatch[2];
      const transBase = translateText(base, targetLang);
      if (transBase && transBase !== base) {{
        return transBase + punct;
      }}
    }}

    // 5. Smart prefix handling (+, bullet, hash)
    const prefixMatch = trimmed.match(/^([+•\\-\\s#]+)(.*)$/);
    if (prefixMatch) {{
      const prefix = prefixMatch[1];
      const base = prefixMatch[2].trim();
      const transBase = translateText(base, targetLang);
      if (transBase && transBase !== base) {{
        return prefix + transBase;
      }}
    }}

    // 6. Parenthetical phrases: "(Optional)" -> "(ऐच्छिक)"
    const parenMatch = trimmed.match(/^\\((.*?)\\)$/);
    if (parenMatch) {{
      const inner = parenMatch[1].trim();
      const transInner = translateText(inner, targetLang);
      if (transInner && transInner !== inner) {{
        return `(${{transInner}})`;
      }}
    }}

    return trimmed;
  }}

  let isApplying = false;

  function applyTranslations(lang) {{
    if (isApplying) return;
    isApplying = true;

    try {{
      // 1. Translate Page Title
      if (document.title) {{
        if (!document._kumbhOrigTitle) {{
          document._kumbhOrigTitle = document.title;
        }}
        const translatedTitle = translateText(document._kumbhOrigTitle, lang);
        if (translatedTitle) document.title = translatedTitle;
      }}

      // 2. Translate explicit data-i18n elements
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {{
        const key = el.getAttribute('data-i18n');
        if (key && TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {{
          el.textContent = TRANSLATIONS[key][lang];
        }}
      }});

      // 3. Translate all standard input & textarea placeholders
      const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
      inputs.forEach(el => {{
        if (typeof el._kumbhOrigPlaceholder !== 'string') {{
          el._kumbhOrigPlaceholder = el.getAttribute('placeholder') || '';
        }}
        const orig = el._kumbhOrigPlaceholder;
        if (!orig) return;
        if (lang === 'en') {{
          el.setAttribute('placeholder', orig);
        }} else {{
          const trans = translateText(orig, lang);
          if (trans) el.setAttribute('placeholder', trans);
        }}
      }});

      // 4. Translate select options
      const options = document.querySelectorAll('select option');
      options.forEach(opt => {{
        if (typeof opt._kumbhOrigText !== 'string') {{
          opt._kumbhOrigText = opt.text.trim();
        }}
        const orig = opt._kumbhOrigText;
        if (!orig) return;
        if (lang === 'en') {{
          opt.text = orig;
        }} else {{
          const trans = translateText(orig, lang);
          if (trans) opt.text = trans;
        }}
      }});

      // 5. Scan & translate all standard text nodes using TreeWalker
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {{
          acceptNode: function (node) {{
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const parentTag = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript', 'textarea', 'code', 'pre'].includes(parentTag)) {{
              return NodeFilter.FILTER_REJECT;
            }}
            // Skip icons, language modal, and segmented language buttons on index page
            if (parent.closest('.material-symbols-outlined, .material-icons, .material-symbols-rounded, #kumbh-lang-modal, #lang-switch-group, svg')) {{
              return NodeFilter.FILTER_REJECT;
            }}
            return NodeFilter.FILTER_ACCEPT;
          }}
        }}
      );

      const nodesToUpdate = [];
      while (walker.nextNode()) {{
        nodesToUpdate.push(walker.currentNode);
      }}

      nodesToUpdate.forEach(node => {{
        const currentVal = node.nodeValue.trim();
        if (!currentVal) return;

        // Initialize canonical original source
        if (typeof node._kumbhOrig !== 'string') {{
          let canonical = currentVal;
          for (const key in TRANSLATIONS) {{
            const entry = TRANSLATIONS[key];
            if (entry.mr === currentVal || entry.hi === currentVal) {{
              canonical = entry.en || key;
              break;
            }}
          }}
          node._kumbhOrig = canonical;
        }}

        const orig = node._kumbhOrig;
        let targetText = orig;

        if (lang === 'en') {{
          targetText = orig;
        }} else {{
          targetText = translateText(orig, lang);
        }}

        if (targetText && targetText !== currentVal) {{
          const leading = node.nodeValue.match(/^\\s*/)[0] || '';
          const trailing = node.nodeValue.match(/\\s*$/)[0] || '';
          node.nodeValue = leading + targetText + trailing;
        }}
      }});
    }} finally {{
      isApplying = false;
    }}
  }}

  function updateLanguageUIElements(lang) {{
    // 1. Segmented switcher on index.html
    const segmentButtons = document.querySelectorAll('.lang-btn');
    segmentButtons.forEach(btn => {{
      const onclickAttr = btn.getAttribute('onclick') || '';
      const isCurrent = (onclickAttr.includes(`'${{lang}}'`) || onclickAttr.includes(`"${{lang}}"`));
      if (isCurrent) {{
        btn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
        btn.classList.remove('text-on-surface-variant');
      }} else {{
        btn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
        btn.classList.add('text-on-surface-variant');
      }}
    }});

    // 2. Header language dropdown / pill button on inner pages
    const headerButtons = document.querySelectorAll('header button, [aria-label*="Language" i], [aria-label*="language" i], .lang-dropdown-trigger');
    const langLabels = {{ en: 'English', mr: 'मराठी', hi: 'हिंदी' }};

    headerButtons.forEach(btn => {{
      if (btn.classList.contains('lang-btn') || btn.closest('#lang-switch-group')) return;
      const textSpan = btn.querySelector('span:not(.material-symbols-outlined):not(.material-icons)');
      if (textSpan) {{
        textSpan.textContent = langLabels[lang] || 'English';
      }}
    }});

    // 3. Floating language pill if active
    const floatText = document.querySelector('#kumbh-floating-lang-btn .kumbh-float-lang-text');
    if (floatText) {{
      floatText.textContent = langLabels[lang] || 'English';
    }}
  }}

  // Language Switcher Modal
  function createLanguageModal() {{
    if (document.getElementById('kumbh-lang-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'kumbh-lang-modal';
    modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-md z-[999999] hidden items-center justify-center p-4 transition-opacity duration-200 opacity-0';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999999;';
    modal.innerHTML = `
      <div class="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-outline-variant/30 transform scale-95 transition-transform duration-200" id="kumbh-lang-modal-content" style="background-color: #ffffff; color: #1b1b20;">
        <div class="flex items-center justify-between pb-4 border-b border-surface-container-high mb-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[24px]">translate</span>
            <h3 class="font-headline-sm text-on-surface font-bold text-lg">Select Language / भाषा निवडा</h3>
          </div>
          <button type="button" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer" onclick="window.KumbhI18n.closeModal()">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div class="flex flex-col gap-2.5">
          <button type="button" onclick="window.KumbhI18n.setLanguage('en')" class="lang-modal-opt flex items-center justify-between p-3.5 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="en">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇬🇧</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-base">English</div>
                <div class="text-xs text-on-surface-variant">Default Global</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>

          <button type="button" onclick="window.KumbhI18n.setLanguage('mr')" class="lang-modal-opt flex items-center justify-between p-3.5 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="mr">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇳</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-base">मराठी (Marathi)</div>
                <div class="text-xs text-on-surface-variant">स्थानिक भाषा / Regional</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>

          <button type="button" onclick="window.KumbhI18n.setLanguage('hi')" class="lang-modal-opt flex items-center justify-between p-3.5 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="hi">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇳</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-base">हिंदी (Hindi)</div>
                <div class="text-xs text-on-surface-variant">राष्ट्रीय भाषा / National</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>
        </div>

        <div class="mt-5 pt-3 text-center border-t border-surface-container-high">
          <p class="text-xs text-on-surface-variant">कुंभसेतु • Simhastha Kumbh Mela 2027</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {{
      if (e.target === modal) {{
        window.KumbhI18n.closeModal();
      }}
    }});
  }}

  function openLanguageModal() {{
    createLanguageModal();
    const modal = document.getElementById('kumbh-lang-modal');
    const content = document.getElementById('kumbh-lang-modal-content');
    if (!modal) return;
    const currentLang = getSavedLang();

    const options = modal.querySelectorAll('.lang-modal-opt');
    options.forEach(opt => {{
      const optLang = opt.getAttribute('data-lang');
      const check = opt.querySelector('.check-icon');
      if (optLang === currentLang) {{
        opt.classList.add('border-primary', 'bg-primary/5');
        if (check) check.classList.remove('opacity-0');
      }} else {{
        opt.classList.remove('border-primary', 'bg-primary/5');
        if (check) check.classList.add('opacity-0');
      }}
    }});

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {{
      modal.classList.remove('opacity-0');
      if (content) {{
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }}
    }}, 10);
  }}

  function closeLanguageModal() {{
    const modal = document.getElementById('kumbh-lang-modal');
    const content = document.getElementById('kumbh-lang-modal-content');
    if (!modal) return;

    modal.classList.add('opacity-0');
    if (content) {{
      content.classList.remove('scale-100');
      content.classList.add('scale-95');
    }}
    setTimeout(() => {{
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }}, 200);
  }}

  function cycleLanguage() {{
    const current = getSavedLang();
    const next = current === 'en' ? 'mr' : (current === 'mr' ? 'hi' : 'en');
    window.KumbhI18n.setLanguage(next);
  }}

  function isLangButton(el) {{
    if (!el) return false;
    if (el.closest('#kumbh-lang-modal')) return false;
    if (el.closest('#lang-switch-group') || el.classList.contains('lang-btn')) {{
      return false;
    }}

    const explicitTrigger = el.closest('.lang-dropdown-trigger, [data-action="language"], [data-lang-trigger]');
    if (explicitTrigger) return true;

    const headerBtn = el.closest('header button, header .lang-btn');
    if (headerBtn) {{
      const ariaLabel = (headerBtn.getAttribute('aria-label') || '').toLowerCase();
      if (ariaLabel.includes('language') || ariaLabel.includes('translate')) {{
        return true;
      }}
      const icon = headerBtn.querySelector('.material-symbols-outlined, .material-icons');
      if (icon && icon.textContent.trim() === 'translate') {{
        return true;
      }}
      const txt = (headerBtn.textContent || '').trim();
      if (txt === 'मराठी' || txt === 'हिंदी' || txt === 'English' || txt.startsWith('मराठी') || txt.startsWith('हिंदी') || txt.startsWith('English')) {{
        return true;
      }}
    }}
    return false;
  }}

  document.addEventListener('click', function (e) {{
    const target = e.target;
    if (isLangButton(target)) {{
      e.preventDefault();
      e.stopPropagation();
      openLanguageModal();
    }}
  }}, true);

  function ensureLanguageButtonOnPage() {{
    if (document.getElementById('lang-switch-group')) return;

    const header = document.querySelector('header');
    if (header) {{
      const headerRight = header.querySelector('.flex.items-center:last-child');
      if (headerRight && !headerRight.querySelector('[aria-label*="Language" i], .lang-dropdown-trigger')) {{
        let hasTranslate = false;
        headerRight.querySelectorAll('button').forEach(b => {{
          if (b.innerHTML.includes('translate') || b.textContent.includes('मरा') || b.textContent.includes('English')) hasTranslate = true;
        }});
        if (!hasTranslate) {{
          const langPill = document.createElement('button');
          langPill.type = 'button';
          langPill.setAttribute('aria-label', 'Toggle Language');
          langPill.className = 'lang-dropdown-trigger h-9 px-space-xs rounded-full bg-surface-container-high flex items-center gap-space-2xs text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container';
          langPill.innerHTML = `
            <span class="material-symbols-outlined text-primary text-[16px]">translate</span>
            <span>${{getSavedLang() === 'mr' ? 'मराठी' : (getSavedLang() === 'hi' ? 'हिंदी' : 'English')}}</span>
            <span class="material-symbols-outlined text-outline text-[16px]">expand_more</span>
          `;
          headerRight.insertBefore(langPill, headerRight.firstChild);
        }}
      }}
    }} else {{
      if (!document.getElementById('kumbh-floating-lang-btn')) {{
        const floatContainer = document.createElement('div');
        floatContainer.id = 'kumbh-floating-lang-btn';
        floatContainer.className = 'fixed top-3 right-3 z-50';
        floatContainer.innerHTML = `
          <button type="button" aria-label="Toggle Language" class="lang-dropdown-trigger flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/95 backdrop-blur-md text-on-surface shadow-md border border-outline-variant/30 text-xs font-semibold hover:bg-surface-container cursor-pointer transition-all">
            <span class="material-symbols-outlined text-primary text-[16px]">translate</span>
            <span class="kumbh-float-lang-text">${{getSavedLang() === 'mr' ? 'मराठी' : (getSavedLang() === 'hi' ? 'हिंदी' : 'English')}}</span>
          </button>
        `;
        document.body.appendChild(floatContainer);
      }}
    }}
  }}

  let mutationTimeout = null;
  const domObserver = new MutationObserver(function (mutations) {{
    const currentLang = getSavedLang();
    if (currentLang === 'en') return;

    let hasAddedNodes = false;
    for (let i = 0; i < mutations.length; i++) {{
      const m = mutations[i];
      if (m.target && (m.target.id === 'kumbh-lang-modal' || m.target.closest?.('#kumbh-lang-modal') || m.target.closest?.('#lang-switch-group'))) {{
        continue;
      }}
      if (m.addedNodes.length > 0) {{
        hasAddedNodes = true;
        break;
      }}
    }}

    if (hasAddedNodes) {{
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(function () {{
        domObserver.disconnect();
        applyTranslations(currentLang);
        domObserver.observe(document.body, {{ childList: true, subtree: true }});
      }}, 50);
    }}
  }});

  window.KumbhI18n = {{
    setLanguage: function (lang) {{
      saveLang(lang);
      closeLanguageModal();
    }},
    getLanguage: getSavedLang,
    openModal: openLanguageModal,
    closeModal: closeLanguageModal,
    cycleLanguage: cycleLanguage,
    translate: translateText,
    apply: function () {{
      const current = getSavedLang();
      applyTranslations(current);
      updateLanguageUIElements(current);
    }}
  }};

  window.toggleLanguage = openLanguageModal;
  window.toggleLanguageModal = openLanguageModal;
  window.openLanguageModal = openLanguageModal;
  window.cycleLanguage = cycleLanguage;
  window.setLang = function (btn, langCode) {{
    window.KumbhI18n.setLanguage(langCode);
  }};
  window.switchLang = function (langCode) {{
    window.KumbhI18n.setLanguage(langCode);
  }};

  function init() {{
    createLanguageModal();
    ensureLanguageButtonOnPage();
    const currentLang = getSavedLang();
    document.documentElement.lang = currentLang;
    applyTranslations(currentLang);
    updateLanguageUIElements(currentLang);

    try {{
      domObserver.observe(document.body, {{ childList: true, subtree: true }});
    }} catch (e) {{
      console.warn('MutationObserver not attached:', e);
    }}
  }}

  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', init);
  }} else {{
    init();
  }}
}})();
"""

out_path = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/i18n.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(JS_CODE)

print(f"Successfully compiled {out_path} ({len(JS_CODE)} bytes, {len(master_dict)} keys)!")
