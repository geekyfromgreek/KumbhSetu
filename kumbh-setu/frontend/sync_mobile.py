import glob
import re

files = glob.glob("/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/*.html")
for f in files:
    with open(f, "r", encoding="utf-8") as fp:
        content = fp.read()
    
    # Check if manifest is linked
    if "manifest.json" not in content and "<head>" in content:
        content = content.replace("<head>", "<head>\n  <link rel=\"manifest\" href=\"manifest.json\">\n  <meta name=\"theme-color\" content=\"#EA580C\">\n  <link rel=\"apple-touch-icon\" href=\"icon-192.png\">")
    
    # Replace hardcoded localhost:8000 in fetch template strings: `http://localhost:8000...` -> `${window.API_BASE_URL || "http://localhost:8000"}...`
    new_content = re.sub(r"`http://localhost:8000([^`]*)`", r"`${window.API_BASE_URL || 'http://localhost:8000'}\1`", content)
    
    # Replace single quoted `'http://localhost:8000...'` -> `(window.API_BASE_URL || 'http://localhost:8000') + '...'`
    new_content = re.sub(r"'http://localhost:8000([^']*)'", r"(window.API_BASE_URL || 'http://localhost:8000') + '\1'", new_content)
    
    if new_content != content:
        with open(f, "w", encoding="utf-8") as fp:
            fp.write(new_content)
        print(f"Updated {f}")

print("All HTML files processed.")
