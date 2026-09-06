import os, glob, re

frontend_dir = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend'

# 1. Clean all backslash escapes across all files
for f in glob.glob(os.path.join(frontend_dir, '*.html')):
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    c = c.replace("\\'", "'").replace('\\"', '"')
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(c)

# 2. Fix index.html with direct <a> anchor tags for buttons
idx_path = os.path.join(frontend_dir, 'index.html')
with open(idx_path, 'r', encoding='utf-8') as fp:
    c = fp.read()

# Replace Yatri button with anchor tag
c = re.sub(
    r'<button[^>]*>\s*<span>\s*Enter as Yatri\s*</span>\s*<span[^>]*>arrow_forward</span>\s*</button>',
    '<a href="yatri_home.html" class="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors duration-150 shadow-sm active:scale-[0.99]"><span>Enter as Yatri</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span></a>',
    c
)

# Replace Nashikkar button with anchor tag
c = re.sub(
    r'<button[^>]*>\s*<span>\s*Vendor &amp; Admin Login\s*</span>\s*<span[^>]*>login</span>\s*</button>',
    '<a href="nashikkar_login.html" class="w-full h-12 bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-on-secondary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors duration-150 shadow-sm active:scale-[0.99]"><span>Vendor &amp; Admin Login</span><span class="material-symbols-outlined text-[20px]">login</span></a>',
    c
)

# Also ensure Police button is prominent
if 'police_login.html' not in c:
    police_box = '''
    <div class="w-full flex justify-center my-3">
      <a href="police_login.html" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-label-md text-label-md transition-all shadow-sm border border-slate-700">
        <span class="material-symbols-outlined text-blue-400 text-[18px]">local_police</span>
        <span>Police &amp; Administration Terminal →</span>
      </a>
    </div>
    '''
    c = c.replace('<!-- Header Section: Emblem & Spiritual-Civic Identity -->', police_box + '\n<!-- Header Section: Emblem & Spiritual-Civic Identity -->')

with open(idx_path, 'w', encoding='utf-8') as fp:
    fp.write(c)
print('Fixed index.html')

# 3. Fix yatri_home.html with direct <a> tags on action buttons and cards
yh_path = os.path.join(frontend_dir, 'yatri_home.html')
with open(yh_path, 'r', encoding='utf-8') as fp:
    yh = fp.read()

yh = re.sub(
    r'<button[^>]*>\s*<span>\s*Compare Rates\s*</span>\s*<span[^>]*>arrow_forward</span>\s*</button>',
    '<a href="marketplace.html" class="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold"><span>Compare Rates</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></a>',
    yh
)
yh = re.sub(
    r'<button[^>]*>\s*<span>\s*Find Meals\s*</span>\s*<span[^>]*>arrow_forward</span>\s*</button>',
    '<a href="food_finder.html" class="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold"><span>Find Meals</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></a>',
    yh
)
yh = re.sub(
    r'<button[^>]*>\s*<span>\s*File Notice\s*</span>\s*<span[^>]*>arrow_forward</span>\s*</button>',
    '<a href="report_issue.html" class="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold"><span>File Notice</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></a>',
    yh
)
yh = re.sub(
    r'<button[^>]*>\s*<span>\s*Get Help Now\s*</span>\s*<span[^>]*>arrow_forward</span>\s*</button>',
    '<a href="emergency_sos.html" class="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-semibold"><span>Get Help Now</span><span class="material-symbols-outlined text-[18px]">arrow_forward</span></a>',
    yh
)

with open(yh_path, 'w', encoding='utf-8') as fp:
    fp.write(yh)
print('Fixed yatri_home.html')

# 4. Fix nashikkar_login.html button
nl_path = os.path.join(frontend_dir, 'nashikkar_login.html')
with open(nl_path, 'r', encoding='utf-8') as fp:
    nl = fp.read()
nl = re.sub(
    r'<button[^>]*class="[^"]*bg-primary[^"]*"[^>]*>\s*<span>\s*Verify &amp; Enter Portal\s*</span>',
    '<a href="nashikkar_overview.html" class="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors duration-150 shadow-sm active:scale-[0.99]"><span>Verify &amp; Enter Portal</span>',
    nl
)
nl = re.sub(r'</span>\s*<span class="material-symbols-outlined text-\[20px\]">arrow_forward</span>\s*</button>', '</span><span class="material-symbols-outlined text-[20px]">arrow_forward</span></a>', nl)
with open(nl_path, 'w', encoding='utf-8') as fp:
    fp.write(nl)
print('Fixed nashikkar_login.html')

# 5. Fix police_login.html button
pl_path = os.path.join(frontend_dir, 'police_login.html')
with open(pl_path, 'r', encoding='utf-8') as fp:
    pl = fp.read()
pl = re.sub(
    r'<button[^>]*class="[^"]*bg-primary[^"]*"[^>]*>',
    '<a href="police_escalations.html" class="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors duration-150 shadow-sm active:scale-[0.99]">',
    pl,
    count=1
)
pl = pl.replace('Validating Badge &amp; Token...</button>', 'Validating Badge &amp; Token...</a>')
with open(pl_path, 'w', encoding='utf-8') as fp:
    fp.write(pl)
print('Fixed police_login.html')

# 6. Copy updated files to yatri-nashikkar-app/public and police-app/public
import shutil
shutil.copytree(frontend_dir, '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/yatri-nashikkar-app/public', dirs_exist_ok=True)
shutil.copytree(frontend_dir, '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/police-app/public', dirs_exist_ok=True)
print('Synchronized to app directories!')
