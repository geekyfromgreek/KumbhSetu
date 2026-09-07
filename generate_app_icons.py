import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_gradient_radial(width, height, center_color, edge_color):
    base = Image.new('RGBA', (width, height), edge_color)
    top = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(top)
    cx, cy = width / 2, height / 2
    max_radius = math.sqrt(cx**2 + cy**2)
    
    # Draw concentric circles
    steps = 60
    for i in range(steps, 0, -1):
        r = max_radius * (i / steps)
        factor = i / steps
        # Interpolate
        r_col = int(center_color[0] * (1 - factor) + edge_color[0] * factor)
        g_col = int(center_color[1] * (1 - factor) + edge_color[1] * factor)
        b_col = int(center_color[2] * (1 - factor) + edge_color[2] * factor)
        a_col = 255
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(r_col, g_col, b_col, a_col))
    
    return top

def draw_rounded_rect(draw, bbox, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

def generate_kumbhveer_icon(size=1024):
    img = Image.new('RGBA', (size, size), (15, 23, 42, 255)) # Dark navy #0F172A
    draw = ImageDraw.Draw(img)
    
    # Outer background radial glow
    for r in range(int(size*0.48), int(size*0.2), -10):
        alpha = int(40 * (1 - (r - size*0.2) / (size*0.28)))
        draw.ellipse([size/2 - r, size/2 - r, size/2 + r, size/2 + r], fill=(249, 115, 22, alpha))
    
    # Shield shape / badge in the center
    cx, cy = size / 2, size / 2
    shield_w = size * 0.68
    shield_h = size * 0.74
    
    # Shield coordinates
    top = cy - shield_h/2 + 20
    bottom = cy + shield_h/2 + 20
    left = cx - shield_w/2
    right = cx + shield_w/2
    
    # Draw Shield
    shield_points = [
        (cx, top - 20),
        (right, top + 40),
        (right, cy + 80),
        (cx, bottom),
        (left, cy + 80),
        (left, top + 40)
    ]
    
    # Shadow
    shadow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.polygon(shield_points, fill=(0, 0, 0, 140))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(shadow)
    
    # Shield Body Gradient (Saffron to Deep Crimson / Gold)
    draw.polygon(shield_points, fill=(249, 115, 22, 255), outline=(254, 215, 170, 255), width=int(size*0.015))
    
    # Inner Shield
    inner_points = [
        (cx, top + 15),
        (right - 25, top + 55),
        (right - 25, cy + 65),
        (cx, bottom - 30),
        (left + 25, cy + 65),
        (left + 25, top + 55)
    ]
    draw.polygon(inner_points, fill=(234, 88, 12, 255), outline=(251, 146, 60, 255), width=int(size*0.01))
    
    # Center Symbol: Seva Emblem (Trishul + Hands / Star of Valor)
    # Trident shaft
    draw.rectangle([cx - size*0.02, cy - size*0.18, cx + size*0.02, cy + size*0.22], fill=(255, 255, 255, 255))
    
    # Central spearhead
    spear_pts = [
        (cx, cy - size*0.26),
        (cx + size*0.055, cy - size*0.16),
        (cx - size*0.055, cy - size*0.16)
    ]
    draw.polygon(spear_pts, fill=(255, 255, 255, 255))
    
    # Left Prong
    left_prong = [
        (cx - size*0.12, cy - size*0.22),
        (cx - size*0.07, cy - size*0.14),
        (cx - size*0.02, cy - size*0.10),
        (cx - size*0.06, cy - size*0.06),
        (cx - size*0.14, cy - size*0.14)
    ]
    draw.polygon(left_prong, fill=(255, 255, 255, 255))
    
    # Right Prong
    right_prong = [
        (cx + size*0.12, cy - size*0.22),
        (cx + size*0.07, cy - size*0.14),
        (cx + size*0.02, cy - size*0.10),
        (cx + size*0.06, cy - size*0.06),
        (cx + size*0.14, cy - size*0.14)
    ]
    draw.polygon(right_prong, fill=(255, 255, 255, 255))
    
    # Protection wings / ring
    draw.arc([cx - size*0.22, cy - size*0.12, cx + size*0.22, cy + size*0.32], 0, 180, fill=(255, 255, 255, 255), width=int(size*0.025))
    
    # Star / Valor badge at base of trident
    draw.ellipse([cx - size*0.06, cy + size*0.02, cx + size*0.06, cy + size*0.14], fill=(254, 240, 138, 255), outline=(255, 255, 255, 255), width=int(size*0.008))
    
    # Text badge ribbon at bottom
    ribbon_w = size * 0.70
    ribbon_h = size * 0.12
    ribbon_top = size * 0.80
    draw.rounded_rectangle([cx - ribbon_w/2, ribbon_top, cx + ribbon_w/2, ribbon_top + ribbon_h], radius=int(ribbon_h/2), fill=(15, 23, 42, 255), outline=(251, 146, 60, 255), width=int(size*0.006))
    
    # Text "KUMBHVEER"
    try:
        font = ImageFont.truetype("arial.ttf", int(size * 0.055))
    except:
        font = ImageFont.load_default()
    
    draw.text((cx, ribbon_top + ribbon_h/2), "KUMBHVEER", fill=(255, 255, 255, 255), anchor="mm", font=font)

    return img

def generate_admin_icon(size=1024):
    img = Image.new('RGBA', (size, size), (15, 23, 42, 255)) # Deep Navy #0F172A
    draw = ImageDraw.Draw(img)
    
    cx, cy = size / 2, size / 2
    
    # Outer gold/amber glow
    for r in range(int(size*0.46), int(size*0.22), -10):
        alpha = int(35 * (1 - (r - size*0.22) / (size*0.24)))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(217, 119, 6, alpha))
        
    # Official Gold Seal Ring
    seal_radius = size * 0.38
    draw.ellipse([cx - seal_radius, cy - seal_radius - size*0.04, cx + seal_radius, cy + seal_radius - size*0.04], fill=(30, 41, 59, 255), outline=(217, 119, 6, 255), width=int(size*0.02))
    
    # Inner gold decorative border
    inner_r = size * 0.34
    draw.ellipse([cx - inner_r, cy - inner_r - size*0.04, cx + inner_r, cy + inner_r - size*0.04], outline=(245, 158, 11, 200), width=int(size*0.006))
    
    # Admin Emblem: Central Command Crest (Ashoka Pillar / Temple Pillar + Shield of Governance)
    crest_y = cy - size*0.04
    # Pillars / Temple Dome
    pillar_w = size * 0.05
    pillar_h = size * 0.28
    
    # Center Pillar
    draw.rectangle([cx - pillar_w/2, crest_y - pillar_h/2 + 20, cx + pillar_w/2, crest_y + pillar_h/2], fill=(245, 158, 11, 255))
    # Left Pillar
    draw.rectangle([cx - size*0.16, crest_y - pillar_h/2 + 40, cx - size*0.16 + pillar_w, crest_y + pillar_h/2], fill=(217, 119, 6, 255))
    # Right Pillar
    draw.rectangle([cx + size*0.16 - pillar_w, crest_y - pillar_h/2 + 40, cx + size*0.16, crest_y + pillar_h/2], fill=(217, 119, 6, 255))
    
    # Base pedestal
    draw.rounded_rectangle([cx - size*0.22, crest_y + pillar_h/2, cx + size*0.22, crest_y + pillar_h/2 + size*0.05], radius=int(size*0.01), fill=(245, 158, 11, 255), outline=(254, 240, 138, 255), width=2)
    
    # Dome / Arch on top
    draw.polygon([
        (cx, crest_y - pillar_h/2 - size*0.08),
        (cx + size*0.22, crest_y - pillar_h/2 + 20),
        (cx - size*0.22, crest_y - pillar_h/2 + 20)
    ], fill=(245, 158, 11, 255))
    
    # Kalash pinnacle on dome
    draw.ellipse([cx - size*0.03, crest_y - pillar_h/2 - size*0.12, cx + size*0.03, crest_y - pillar_h/2 - size*0.06], fill=(254, 240, 138, 255))
    
    # Dharma Chakra / Authority Star in center
    draw.ellipse([cx - size*0.07, crest_y - size*0.04, cx + size*0.07, crest_y + size*0.10], fill=(15, 23, 42, 255), outline=(254, 240, 138, 255), width=int(size*0.008))
    
    # Star lines
    for angle in range(0, 360, 45):
        rad = math.radians(angle)
        sx = cx + (size * 0.05) * math.cos(rad)
        sy = crest_y + size*0.03 + (size * 0.05) * math.sin(rad)
        draw.line([(cx, crest_y + size*0.03), (sx, sy)], fill=(254, 240, 138, 255), width=int(size*0.005))
    
    # Text badge at bottom
    ribbon_w = size * 0.74
    ribbon_h = size * 0.12
    ribbon_top = size * 0.80
    draw.rounded_rectangle([cx - ribbon_w/2, ribbon_top, cx + ribbon_w/2, ribbon_top + ribbon_h], radius=int(ribbon_h/2), fill=(30, 41, 59, 255), outline=(245, 158, 11, 255), width=int(size*0.006))
    
    try:
        font = ImageFont.truetype("arial.ttf", int(size * 0.050))
    except:
        font = ImageFont.load_default()
    
    draw.text((cx, ribbon_top + ribbon_h/2), "KUMBH ADMIN", fill=(254, 240, 138, 255), anchor="mm", font=font)
    
    return img

def generate_localbazaar_icon(size=1024):
    img = Image.new('RGBA', (size, size), (6, 78, 59, 255)) # Deep Emerald Green #064E3B
    draw = ImageDraw.Draw(img)
    
    cx, cy = size / 2, size / 2
    
    # Warm amber / gold glow
    for r in range(int(size*0.46), int(size*0.22), -10):
        alpha = int(35 * (1 - (r - size*0.22) / (size*0.24)))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(245, 158, 11, alpha))
    
    # Outer circle badge
    badge_radius = size * 0.38
    draw.ellipse([cx - badge_radius, cy - badge_radius - size*0.04, cx + badge_radius, cy + badge_radius - size*0.04], fill=(4, 120, 87, 255), outline=(254, 240, 138, 255), width=int(size*0.018))
    
    # Center Symbol: Traditional Indian Bazaar Stall & Kalash
    stall_y = cy - size*0.04
    
    # Canopy stripes (Saffron / Gold / Green)
    canopy_top = stall_y - size*0.20
    canopy_bot = stall_y - size*0.05
    
    # Scalloped Canopy Roof
    scallops = 5
    canopy_w = size * 0.50
    step = canopy_w / scallops
    start_x = cx - canopy_w/2
    
    for i in range(scallops):
        x1 = start_x + i * step
        x2 = x1 + step
        fill_col = (245, 158, 11, 255) if i % 2 == 0 else (255, 255, 255, 255)
        
        poly = [
            (cx, canopy_top),
            (x2, canopy_bot),
            (x1, canopy_bot)
        ]
        draw.polygon(poly, fill=fill_col, outline=(180, 83, 9, 255), width=2)
        # Scallop bottom arc
        draw.ellipse([x1, canopy_bot - step*0.25, x2, canopy_bot + step*0.25], fill=fill_col, outline=(180, 83, 9, 255), width=2)

    # Canopy pinnacle
    draw.polygon([
        (cx, canopy_top - size*0.05),
        (cx + size*0.04, canopy_top),
        (cx - size*0.04, canopy_top)
    ], fill=(254, 240, 138, 255))
    
    # Stall counter / Storefront
    counter_top = canopy_bot + size*0.04
    counter_bot = counter_top + size*0.14
    counter_w = size * 0.44
    draw.rounded_rectangle([cx - counter_w/2, counter_top, cx + counter_w/2, counter_bot], radius=int(size*0.015), fill=(254, 243, 199, 255), outline=(245, 158, 11, 255), width=int(size*0.008))
    
    # Stall pillars
    draw.rectangle([cx - counter_w/2 + size*0.02, canopy_bot, cx - counter_w/2 + size*0.05, counter_top], fill=(245, 158, 11, 255))
    draw.rectangle([cx + counter_w/2 - size*0.05, canopy_bot, cx + counter_w/2 - size*0.02, counter_top], fill=(245, 158, 11, 255))
    
    # Rupee Symbol / Authenticity Seal on counter
    draw.ellipse([cx - size*0.06, counter_top + size*0.015, cx + size*0.06, counter_bot - size*0.015], fill=(4, 120, 87, 255), outline=(245, 158, 11, 255), width=2)
    
    try:
        r_font = ImageFont.truetype("arial.ttf", int(size * 0.075))
    except:
        r_font = ImageFont.load_default()
    
    draw.text((cx, (counter_top + counter_bot)/2), "₹", fill=(254, 240, 138, 255), anchor="mm", font=r_font)
    
    # Text badge at bottom
    ribbon_w = size * 0.74
    ribbon_h = size * 0.12
    ribbon_top = size * 0.80
    draw.rounded_rectangle([cx - ribbon_w/2, ribbon_top, cx + ribbon_w/2, ribbon_top + ribbon_h], radius=int(ribbon_h/2), fill=(4, 120, 87, 255), outline=(254, 240, 138, 255), width=int(size*0.006))
    
    try:
        font = ImageFont.truetype("arial.ttf", int(size * 0.048))
    except:
        font = ImageFont.load_default()
    
    draw.text((cx, ribbon_top + ribbon_h/2), "LOCAL BAZAAR", fill=(255, 255, 255, 255), anchor="mm", font=font)
    
    return img

def create_adaptive_foreground(icon_img, size=512):
    # For Android adaptive foreground: centered emblem with transparent padding around it (safe zone is center 66%)
    res = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    scaled = icon_img.resize((int(size * 0.76), int(size * 0.76)), Image.Resampling.LANCZOS)
    offset = int(size * 0.12)
    res.alpha_composite(scaled, (offset, offset))
    return res

def create_adaptive_background(color, size=512):
    return Image.new('RGBA', (size, size), color)

def create_monochrome(icon_img, size=512):
    # Grayscale icon on transparent background
    res = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    gray = icon_img.convert('L')
    alpha = icon_img.split()[3]
    white_img = Image.new('RGBA', icon_img.size, (255, 255, 255, 255))
    white_img.putalpha(alpha)
    scaled = white_img.resize((int(size * 0.76), int(size * 0.76)), Image.Resampling.LANCZOS)
    offset = int(size * 0.12)
    res.alpha_composite(scaled, (offset, offset))
    return res

def save_all_app_assets(app_name, generator_fn, bg_color, target_dir):
    os.makedirs(target_dir, exist_ok=True)
    
    # 1. Main app icon 1024x1024
    icon_1024 = generator_fn(1024)
    icon_1024.save(os.path.join(target_dir, 'icon.png'), 'PNG')
    
    # 2. Android adaptive foreground 512x512
    fg_512 = create_adaptive_foreground(icon_1024, 512)
    fg_512.save(os.path.join(target_dir, 'android-icon-foreground.png'), 'PNG')
    
    # 3. Android adaptive background 512x512
    bg_512 = create_adaptive_background(bg_color, 512)
    bg_512.save(os.path.join(target_dir, 'android-icon-background.png'), 'PNG')
    
    # 4. Monochrome 512x512
    mono_512 = create_monochrome(icon_1024, 512)
    mono_512.save(os.path.join(target_dir, 'android-icon-monochrome.png'), 'PNG')
    
    # 5. Splash icon 512x512
    splash_512 = fg_512
    splash_512.save(os.path.join(target_dir, 'splash-icon.png'), 'PNG')
    
    # 6. Favicon 64x64
    fav_64 = icon_1024.resize((64, 64), Image.Resampling.LANCZOS)
    fav_64.save(os.path.join(target_dir, 'favicon.png'), 'PNG')
    
    print(f"Generated all assets for {app_name} in {target_dir}")

if __name__ == '__main__':
    base_dir = r"d:\t3-kumbhsetu"
    
    # KumbhVeer
    save_all_app_assets(
        "KumbhVeer",
        generate_kumbhveer_icon,
        (15, 23, 42, 255), # #0F172A
        os.path.join(base_dir, "KumbhVeer", "assets", "images")
    )
    
    # KumbhSetu-Admins
    save_all_app_assets(
        "KumbhSetu-Admins",
        generate_admin_icon,
        (15, 23, 42, 255), # #0F172A
        os.path.join(base_dir, "KumbhSetu-Admins", "assets", "images")
    )
    
    # KumbhSetu-LocalBazaar
    save_all_app_assets(
        "KumbhSetu-LocalBazaar",
        generate_localbazaar_icon,
        (6, 78, 59, 255), # #064E3B
        os.path.join(base_dir, "KumbhSetu-LocalBazaar", "assets", "images")
    )
