import os
import glob
import re

FRONTEND_DIR = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend'
YATRI_PUBLIC = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/yatri-nashikkar-app/public'
POLICE_PUBLIC = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/police-app/public'

html_files = glob.glob(os.path.join(FRONTEND_DIR, '*.html'))
print(f"Found {len(html_files)} HTML files in frontend")

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ensure i18n.js script is included before </body>
    if 'src="i18n.js"' not in content and "src='i18n.js'" not in content:
        if '</body>' in content:
            content = content.replace('</body>', '<script src="i18n.js"></script>\n</body>')
        elif '</main>' in content:
            content = content.replace('</main>', '</main>\n<script src="i18n.js"></script>')
        else:
            content += '\n<script src="i18n.js"></script>'

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Injected i18n.js into {os.path.basename(fpath)}")

# Copy i18n.js to public dirs as well
for dest in [YATRI_PUBLIC, POLICE_PUBLIC]:
    if os.path.isdir(dest):
        import shutil
        shutil.copy(os.path.join(FRONTEND_DIR, 'i18n.js'), os.path.join(dest, 'i18n.js'))
        # sync all html files
        for fpath in html_files:
            shutil.copy(fpath, os.path.join(dest, os.path.basename(fpath)))
        print(f"Synced i18n and HTML to {dest}")

print("Injection complete!")
