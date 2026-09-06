import glob, os

files = glob.glob('/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    if "\\'" in c or '\\"' in c:
        print(os.path.basename(f), 'has backslash escapes')
