import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_pitch_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Base directory for images
    base_dir = os.path.join("d:", os.sep, "t3-kumbhsetu")
    images_dir = os.path.join(base_dir, "Images")

    # Image Paths
    img_yatri_1 = os.path.join(images_dir, "Yatri app", "231eed08-fa39-4412-bd3c-55a6441bb8bd.jpg")
    img_yatri_2 = os.path.join(images_dir, "Yatri app", "b0bd2efa-7528-4d49-a1fc-4f349fef6ad8.jpg")
    img_yatri_3 = os.path.join(images_dir, "Yatri app", "09057a2a-7a89-48cf-9402-4ff57b4b402a.jpg")
    img_yatri_4 = os.path.join(images_dir, "Yatri app", "f79bc193-45d3-486a-9905-3adc84293683.jpg")

    img_veer_1 = os.path.join(images_dir, "KumbVeer App", "3ebc7cb2-b0a2-4b57-bb1e-dcbf2f2daed1.jpg")
    img_veer_2 = os.path.join(images_dir, "KumbVeer App", "46fbdef9-acd1-4260-91a5-2034667d7a5d.jpg")

    img_admin_1 = os.path.join(images_dir, "Admin App", "Screenshot 2026-09-07 121840.png")
    img_admin_2 = os.path.join(images_dir, "Admin App", "Screenshot 2026-09-07 121931.png")
    img_admin_3 = os.path.join(images_dir, "Admin App", "Screenshot 2026-09-07 121957.png")
    img_admin_4 = os.path.join(images_dir, "Admin App", "Screenshot 2026-09-07 122008.png")

    img_bazaar_1 = os.path.join(images_dir, "LocalBazaar App", "360937d6-19d8-49b6-b8ad-0738937ed986.jpg")
    img_bazaar_2 = os.path.join(images_dir, "LocalBazaar App", "b8b4c828-00ad-4d72-9b5c-82f01a3e3bae.jpg")

    # Professional Corporate Palette
    COLOR_BG = RGBColor(250, 248, 245)         # Warm Ivory #FAF8F5
    COLOR_PRIMARY = RGBColor(232, 93, 4)        # Deep Saffron #E85D04
    COLOR_NAVY = RGBColor(15, 23, 42)           # Dark Slate Navy #0F172A
    COLOR_POLICE = RGBColor(2, 132, 199)        # Police Blue #0284C7
    COLOR_EMERALD = RGBColor(5, 150, 105)       # Civic Green #059669
    COLOR_WHITE = RGBColor(255, 255, 255)
    COLOR_MUTED = RGBColor(100, 116, 139)       # Slate 500
    COLOR_CARD_BORDER = RGBColor(226, 232, 240) # Slate 200

    blank_slide_layout = prs.slide_layouts[6]

    def set_slide_background(slide, color):
        bg = slide.background
        fill = bg.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, title_text, category_text="KUMBHSETU SMART GOVERNANCE PLATFORM"):
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.38), Inches(11.7), Inches(0.32))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = category_text.upper()
        p_tag.font.size = Pt(10.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = COLOR_PRIMARY

        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.7), Inches(0.65))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_NAVY

    def add_badge_icon(slide, left, top, text, bg_color, text_color=COLOR_WHITE):
        icon_shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(0.8), Inches(0.32))
        icon_shape.fill.solid()
        icon_shape.fill.fore_color.rgb = bg_color
        icon_shape.line.fill.background()
        tf = icon_shape.text_frame
        tf.word_wrap = False
        p = tf.paragraphs[0]
        p.text = text
        p.alignment = PP_ALIGN.CENTER
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = text_color
        return icon_shape

    def add_phone_frame(slide, img_path, left, top, width=Inches(2.35), height=Inches(4.9)):
        if os.path.exists(img_path):
            border_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left - Inches(0.04), top - Inches(0.04), width + Inches(0.08), height + Inches(0.08))
            border_box.fill.solid()
            border_box.fill.fore_color.rgb = COLOR_NAVY
            border_box.line.fill.background()
            slide.shapes.add_picture(img_path, left, top, width, height)

    # ==========================================
    # SLIDE 1: Title Slide
    # ==========================================
    s1 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s1, COLOR_NAVY)

    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(0.15), Inches(4.5))
    bar.fill.solid()
    bar.fill.fore_color.rgb = COLOR_PRIMARY
    bar.line.fill.background()

    t_box = s1.shapes.add_textbox(Inches(1.2), Inches(1.5), Inches(7.5), Inches(4.5))
    tf1 = t_box.text_frame
    tf1.word_wrap = True

    p1 = tf1.paragraphs[0]
    p1.text = "KUMBHSETU"
    p1.font.size = Pt(46)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_PRIMARY

    p2 = tf1.add_paragraph()
    p2.text = "Integrated Smart Governance, Pilgrim Safety & Anti-Extortion Ecosystem"
    p2.font.size = Pt(20)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_WHITE
    p2.space_before = Pt(14)

    p3 = tf1.add_paragraph()
    p3.text = "Engineered for Nashik-Trimbakeshwar Simhastha Kumbh Mela 2027 (100M+ Projected Visitors)"
    p3.font.size = Pt(14)
    p3.font.color.rgb = RGBColor(148, 163, 184)
    p3.space_before = Pt(12)

    p4 = tf1.add_paragraph()
    p4.text = "Tri-App Command Network: Pilgrim Mobile App | KumbhVeer Volunteers | Police Rapid Radar"
    p4.font.size = Pt(12.5)
    p4.font.bold = True
    p4.font.color.rgb = COLOR_POLICE
    p4.space_before = Pt(24)

    # Title Slide Phone Previews
    if os.path.exists(img_yatri_1):
        add_phone_frame(s1, img_yatri_1, Inches(9.0), Inches(1.3), Inches(2.0), Inches(4.2))
    if os.path.exists(img_veer_1):
        add_phone_frame(s1, img_veer_1, Inches(10.8), Inches(1.8), Inches(1.9), Inches(4.0))

    # ==========================================
    # SLIDE 2: Challenge Matrix
    # ==========================================
    s2 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s2, COLOR_BG)
    add_header(s2, "Executive Challenge Matrix: Managing 100M+ Pilgrims at Scale", "Operational Bottlenecks")

    challenges = [
        ("PRICING", "Transit & Market Price Extortion", "Unscrupulous auto, taxi, and stall operators charge 3x-5x standard rates, exploiting rural and elderly pilgrims with zero real-time tariff visibility.", COLOR_PRIMARY),
        ("RESPONSE", "High-Latency Ground Dispatch", "Traditional emergency response takes 25-45 minutes to reach patrol squads, risking crowd bottlenecks and uncontrolled crowd surges.", COLOR_NAVY),
        ("PANIC", "Unchecked Rumor & Misinformation Cascades", "Viral unverified claims regarding ghat closures or bridge damage create hazardous panic stampede risks before authorities can clarify.", COLOR_POLICE),
        ("SILOS", "Disconnected Stakeholder Operations", "Pilgrims, on-ground volunteers (NCC/NSS), and Flying Police Squads operate on disconnected communication channels.", COLOR_EMERALD)
    ]

    for i, (tag, title, desc, accent) in enumerate(challenges):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 2.7)

        card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.6), Inches(2.4))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = COLOR_CARD_BORDER

        add_badge_icon(s2, left + Inches(0.25), top + Inches(0.25), tag, accent)

        tb = s2.shapes.add_textbox(left + Inches(0.25), top + Inches(0.68), Inches(5.1), Inches(1.6))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(14)
        p_t.font.bold = True
        p_t.font.color.rgb = accent

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = COLOR_MUTED
        p_d.space_before = Pt(6)

    # ==========================================
    # SLIDE 3: Tri-App Ecosystem Overview
    # ==========================================
    s3 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s3, COLOR_BG)
    add_header(s3, "The Solution: A Synchronized Tri-Application Network", "System Architecture")

    apps = [
        ("PILGRIM", "KumbhSetu-Expo\nPilgrim Super App", "• 4 Languages (HI / MR / GU / EN)\n• Fare Calculator & RTO Price Caps\n• 1-Tap Photo + GPS Complaint Log\n• Verified Bazaar & Snan Timers\n• 24x7 Emergency SOS Speed-Dial", COLOR_PRIMARY),
        ("VOLUNTEER", "KumbhVeer\nVolunteer Ground App", "• Real-Time Sector Incident Alerts\n• 3-Stage Severity Tagging (Low/Med/High)\n• Field Triage & Merchant Spot-Check\n• 1-Tap Google Maps GPS Route\n• Direct Pilgrim Phone Connection", COLOR_EMERALD),
        ("COMMAND", "KumbhSetu-Admins\nPolice & Collector Center", "• Dedicated Police Rapid Radar\n• Instant Challan & Fine Enforcement\n• Dynamic Route Tariff Management\n• Official Rumor Buster Dispatcher\n• Desktop (.exe) & Web Control", COLOR_POLICE)
    ]

    for i, (tag, title, desc, color) in enumerate(apps):
        left = Inches(0.8 + i * 3.95)
        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.5), Inches(3.75), Inches(5.4))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = color
        card.line.width = Pt(1.5)

        add_badge_icon(s3, left + Inches(0.25), Inches(1.75), tag, color)

        tb = s3.shapes.add_textbox(left + Inches(0.25), Inches(2.2), Inches(3.25), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = color

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11.5)
        p_d.font.color.rgb = COLOR_NAVY
        p_d.space_before = Pt(12)

    # ==========================================
    # SLIDE 4: Showcase 1 - KumbhSetu-Expo (Pilgrim App)
    # ==========================================
    s4 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s4, COLOR_BG)
    add_header(s4, "Pilgrim Super App: Anti-Extortion & Safety in 4 Languages", "Application Showcase 1 / 4")

    # Left Feature Cards
    card4 = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(6.5), Inches(5.4))
    card4.fill.solid()
    card4.fill.fore_color.rgb = COLOR_WHITE
    card4.line.color.rgb = COLOR_CARD_BORDER

    tb4 = s4.shapes.add_textbox(Inches(1.1), Inches(1.7), Inches(5.9), Inches(5.0))
    tf4 = tb4.text_frame
    tf4.word_wrap = True

    p4_1 = tf4.paragraphs[0]
    p4_1.text = "KumbhSetu-Expo (Pilgrim Mobile Application)"
    p4_1.font.size = Pt(16)
    p4_1.font.bold = True
    p4_1.font.color.rgb = COLOR_PRIMARY

    features_s4 = [
        ("• 4-Language Cultural Localization", "Instant switching across Hindi, Marathi, Gujarati, and English with culturally authentic terminology."),
        ("• Dynamic RTO Transit Fare Calculator", "Pre-calculated maximum rates for 50+ routes across Nashik Road, CBS, Ramkund, and Trimbakeshwar."),
        ("• 1-Tap Photo & GPS Incident Logging", "Pilgrims capture shop/vehicle photos and lock coordinates with instant Case Token IDs (KS-RTO-XXXXXX)."),
        ("• Case Self-Management & Withdrawal", "Pilgrims track ground volunteer verification live and can delete or withdraw resolved complaints.")
    ]

    for title, desc in features_s4:
        p_t = tf4.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_NAVY
        p_t.space_before = Pt(10)

        p_d = tf4.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = COLOR_MUTED
        p_d.space_before = Pt(2)

    # Right Screenshots
    if os.path.exists(img_yatri_2):
        add_phone_frame(s4, img_yatri_2, Inches(7.7), Inches(1.5), Inches(2.4), Inches(5.3))
    if os.path.exists(img_yatri_3):
        add_phone_frame(s4, img_yatri_3, Inches(10.4), Inches(1.5), Inches(2.4), Inches(5.3))

    # ==========================================
    # SLIDE 5: Showcase 2 - KumbhVeer (Volunteer Ground Triage)
    # ==========================================
    s5 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s5, COLOR_BG)
    add_header(s5, "KumbhVeer: Decentralized Ground Triage & Verification", "Application Showcase 2 / 4")

    # Left Feature Cards
    card5 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(6.5), Inches(5.4))
    card5.fill.solid()
    card5.fill.fore_color.rgb = COLOR_WHITE
    card5.line.color.rgb = COLOR_CARD_BORDER

    tb5 = s5.shapes.add_textbox(Inches(1.1), Inches(1.7), Inches(5.9), Inches(5.0))
    tf5 = tb5.text_frame
    tf5.word_wrap = True

    p5_1 = tf5.paragraphs[0]
    p5_1.text = "KumbhVeer (Volunteer Ground Application)"
    p5_1.font.size = Pt(16)
    p5_1.font.bold = True
    p5_1.font.color.rgb = COLOR_EMERALD

    features_s5 = [
        ("• Sub-Minute Sector Dispatch", "On-duty volunteers stationed at Ramkund, Tapovan, and Kushavarta receive instant real-time vibration alerts for nearby incidents."),
        ("• 3-Tier Severity Calibration", "Volunteers physically inspect the spot and calibrate ticket priority:\n  - Low: Informal spot resolve\n  - Medium: Price compliance check\n  - High: Direct Police Flying Squad escalation"),
        ("• 1-Tap Google Maps GPS Route", "Provides walking and transit navigation directly to the pilgrim's locked GPS pin."),
        ("• Direct Pilgrim Dialing", "Instant one-touch phone verification to prevent false reporting and clarify landmark details.")
    ]

    for title, desc in features_s5:
        p_t = tf5.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_NAVY
        p_t.space_before = Pt(10)

        p_d = tf5.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = COLOR_MUTED
        p_d.space_before = Pt(2)

    # Right Screenshots
    if os.path.exists(img_veer_1):
        add_phone_frame(s5, img_veer_1, Inches(7.7), Inches(1.5), Inches(2.4), Inches(5.3))
    if os.path.exists(img_veer_2):
        add_phone_frame(s5, img_veer_2, Inches(10.4), Inches(1.5), Inches(2.4), Inches(5.3))

    # ==========================================
    # SLIDE 6: Showcase 3 - KumbhSetu-Admins (Police Rapid Radar)
    # ==========================================
    s6 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s6, COLOR_BG)
    add_header(s6, "Police Command Center: Tactical Live Radar & Enforcement", "Application Showcase 3 / 4")

    # Left Text Box
    card6 = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.4), Inches(5.4))
    card6.fill.solid()
    card6.fill.fore_color.rgb = COLOR_WHITE
    card6.line.color.rgb = COLOR_CARD_BORDER

    tb6 = s6.shapes.add_textbox(Inches(1.05), Inches(1.7), Inches(4.9), Inches(5.0))
    tf6 = tb6.text_frame
    tf6.word_wrap = True

    p6_1 = tf6.paragraphs[0]
    p6_1.text = "KumbhSetu-Admins (Police Tactical Center)"
    p6_1.font.size = Pt(15.5)
    p6_1.font.bold = True
    p6_1.font.color.rgb = COLOR_POLICE

    features_s6 = [
        ("• Dedicated Police Rapid Radar Stream", "Real-time triage stream prioritizing High Severity and Medium Watch extortion tickets across sectors."),
        ("• 150px Full-Resolution Photo Evidence", "High-resolution photographic inspection modal allowing officers to verify signboards and vehicle plates."),
        ("• Instant Digital Challans & Penalties", "Executes formal fines (INR 500 / 1,000 / 2,000 / 5,000), shop license suspensions, or FIR registrations."),
        ("• Cross-Platform Desktop (.exe) & Web", "Zero-dependency standalone Windows software built for the Mela Control Room and field laptops.")
    ]

    for title, desc in features_s6:
        p_t = tf6.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(12.5)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_NAVY
        p_t.space_before = Pt(8)

        p_d = tf6.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = COLOR_MUTED
        p_d.space_before = Pt(2)

    # Right Screenshots (Admin App Desktop / Tablet UI)
    if os.path.exists(img_admin_1):
        add_phone_frame(s6, img_admin_1, Inches(6.5), Inches(1.5), Inches(3.0), Inches(5.3))
    if os.path.exists(img_admin_2):
        add_phone_frame(s6, img_admin_2, Inches(9.8), Inches(1.5), Inches(3.0), Inches(5.3))

    # ==========================================
    # SLIDE 7: Showcase 4 - Verified Bazaar & Rumor Buster
    # ==========================================
    s7 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s7, COLOR_BG)
    add_header(s7, "Verified Local Bazaar & Rumor Buster Dispatcher", "Application Showcase 4 / 4")

    # Left Text
    card7 = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.5), Inches(5.4), Inches(5.4))
    card7.fill.solid()
    card7.fill.fore_color.rgb = COLOR_WHITE
    card7.line.color.rgb = COLOR_CARD_BORDER

    tb7 = s7.shapes.add_textbox(Inches(1.05), Inches(1.7), Inches(4.9), Inches(5.0))
    tf7 = tb7.text_frame
    tf7.word_wrap = True

    p7_1 = tf7.paragraphs[0]
    p7_1.text = "Commerce Integrity & Public Safety"
    p7_1.font.size = Pt(15.5)
    p7_1.font.bold = True
    p7_1.font.color.rgb = COLOR_PRIMARY

    features_s7 = [
        ("• Verified Kumbh Bazaar Directory", "Directory of government-registered, FSSAI-certified food stalls, puja samagri stores, and dharamshalas with official price caps."),
        ("• Zero-Panic Rumor Buster", "Citizens submit suspicious claims; District Administration verifies and broadcasts official verdicts (TRUE / FALSE / UNDER REVIEW) in 4 languages."),
        ("• Shahi Snan Live Muhurat Countdown", "Auspicious bath timings and ghat crowd density status for Ramkund, Kushavarta, and Tapovan."),
        ("• Direct Merchant Calling & Inquiries", "Pilgrims directly connect with verified stalls to pre-order food and puja essentials at capped rates.")
    ]

    for title, desc in features_s7:
        p_t = tf7.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(12.5)
        p_t.font.bold = True
        p_t.font.color.rgb = COLOR_NAVY
        p_t.space_before = Pt(8)

    p_d = tf7.add_paragraph()
    p_d.text = desc
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = COLOR_MUTED
    p_d.space_before = Pt(2)

    # Right Screenshots
    if os.path.exists(img_bazaar_1):
        add_phone_frame(s7, img_bazaar_1, Inches(6.5), Inches(1.5), Inches(2.4), Inches(5.3))
    if os.path.exists(img_admin_3):
        add_phone_frame(s7, img_admin_3, Inches(9.2), Inches(1.5), Inches(3.6), Inches(5.3))

    # ==========================================
    # SLIDE 8: Technology Stack & Cloud Architecture
    # ==========================================
    s8 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s8, COLOR_BG)
    add_header(s8, "Enterprise Technology Stack & Cloud Infrastructure", "Technical Specifications")

    tech_cards = [
        ("CLIENT", "Mobile & Web Tier", "• React Native Expo SDK 57 (React 19)\n• TypeScript with strict type-safety\n• 4-Language i18n localization engine\n• Asynchronous safe storage caching\n• Responsive iOS, Android & Web", COLOR_PRIMARY),
        ("CLOUD", "Real-Time Cloud Engine", "• Supabase PostgreSQL Database\n• Sub-second WebSocket Channels\n• Dedicated 'kumbh-media' bucket\n• Pure JS Base64 binary converter\n• Row Level Security (RLS) enforcement", COLOR_POLICE),
        ("DESKTOP", "Command Center Software", "• Electron 44 Standalone Windows App\n• Automated .exe packaging pipeline\n• Role-based DBA provisioning\n• Custom HTTP static asset bridge\n• Zero-dependency desktop bundle", COLOR_NAVY)
    ]

    for i, (tag, title, desc, color) in enumerate(tech_cards):
        left = Inches(0.8 + i * 3.95)
        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.5), Inches(3.75), Inches(5.4))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = color
        card.line.width = Pt(1.5)

        add_badge_icon(s8, left + Inches(0.25), Inches(1.75), tag, color)

        tb = s8.shapes.add_textbox(left + Inches(0.25), Inches(2.2), Inches(3.25), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = color

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11.5)
        p_d.font.color.rgb = COLOR_NAVY
        p_d.space_before = Pt(12)

    # ==========================================
    # SLIDE 9: Operational Impact & Performance Benchmarks
    # ==========================================
    s9 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s9, COLOR_BG)
    add_header(s9, "Projected Impact & Operational Benchmarks", "Performance Metrics")

    metrics = [
        ("TIME", "< 4 Min", "Incident Response Time", "Reduced from 35+ mins via volunteer ground triage", COLOR_EMERALD),
        ("PRICE", "100%", "Price Transparency", "Across 50+ transit routes & commodity caps", COLOR_PRIMARY),
        ("SCALE", "100M+", "Pilgrim Reach", "In Hindi, Marathi, Gujarati & English", COLOR_POLICE),
        ("SAFETY", "0 Panic", "Misinformation Containment", "Sub-minute rumor clarification broadcast", COLOR_NAVY)
    ]

    for i, (tag, val, label, sub, color) in enumerate(metrics):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 2.7)

        card = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.6), Inches(2.4))
        card.fill.solid()
        card.fill.fore_color.rgb = COLOR_WHITE
        card.line.color.rgb = COLOR_CARD_BORDER

        add_badge_icon(s9, left + Inches(0.25), top + Inches(0.22), tag, color)

        tb = s9.shapes.add_textbox(left + Inches(0.25), top + Inches(0.6), Inches(5.1), Inches(1.7))
        tf = tb.text_frame
        tf.word_wrap = True

        p_v = tf.paragraphs[0]
        p_v.text = val
        p_v.font.size = Pt(34)
        p_v.font.bold = True
        p_v.font.color.rgb = color

        p_l = tf.add_paragraph()
        p_l.text = label
        p_l.font.size = Pt(13.5)
        p_l.font.bold = True
        p_l.font.color.rgb = COLOR_NAVY
        p_l.space_before = Pt(2)

        p_s = tf.add_paragraph()
        p_s.text = sub
        p_s.font.size = Pt(11)
        p_s.font.color.rgb = COLOR_MUTED
        p_s.space_before = Pt(2)

    # ==========================================
    # SLIDE 10: Conclusion & Deployment Readiness
    # ==========================================
    s10 = prs.slides.add_slide(blank_slide_layout)
    set_slide_background(s10, COLOR_NAVY)

    bar10 = s10.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(0.15), Inches(4.5))
    bar10.fill.solid()
    bar10.fill.fore_color.rgb = COLOR_PRIMARY
    bar10.line.fill.background()

    tb10 = s10.shapes.add_textbox(Inches(1.2), Inches(1.5), Inches(7.5), Inches(4.5))
    tf10 = tb10.text_frame
    tf10.word_wrap = True

    p10_1 = tf10.paragraphs[0]
    p10_1.text = "KumbhSetu: Ready for Simhastha Kumbh Mela 2027"
    p10_1.font.size = Pt(32)
    p10_1.font.bold = True
    p10_1.font.color.rgb = COLOR_PRIMARY

    p10_2 = tf10.add_paragraph()
    p10_2.text = "Empowering Pilgrims • Equipping Volunteers • Enabling Authorities"
    p10_2.font.size = Pt(18)
    p10_2.font.bold = True
    p10_2.font.color.rgb = COLOR_WHITE
    p10_2.space_before = Pt(14)

    p10_3 = tf10.add_paragraph()
    p10_3.text = "• Cross-Platform Mobile Apps Ready (Android, iOS)\n• Desktop Command Center Built (Windows .exe Standalone)\n• Cloud Real-time Backend & Supabase Storage Operational\n• 4-Language Cultural Localization & SOS Triage Validated"
    p10_3.font.size = Pt(12.5)
    p10_3.font.color.rgb = RGBColor(203, 213, 225)
    p10_3.space_before = Pt(14)

    # Final preview thumbnails
    if os.path.exists(img_yatri_4):
        add_phone_frame(s10, img_yatri_4, Inches(9.0), Inches(1.5), Inches(2.0), Inches(4.2))
    if os.path.exists(img_admin_4):
        add_phone_frame(s10, img_admin_4, Inches(10.8), Inches(1.8), Inches(2.0), Inches(4.0))

    output_paths = [
        os.path.join("d:", os.sep, "t3-kumbhsetu", "KumbhSetu_Executive_Pitch_Deck.pptx"),
        os.path.join("d:", os.sep, "t3-kumbhsetu", "KumbhSetu_Pitch_Deck_Final.pptx"),
        os.path.join("d:", os.sep, "t3-kumbhsetu", "KumbhSetu_Pitch_Deck.pptx")
    ]
    saved = False
    for path in output_paths:
        try:
            prs.save(path)
            print(f"Presentation with embedded photographs saved to {path}")
            saved = True
            break
        except Exception as e:
            print(f"Notice: Could not save to {path} ({e}), trying next path...")
    if not saved:
        fallback = os.path.join("d:", os.sep, "t3-kumbhsetu", "KumbhSetu_Deck_Updated.pptx")
        prs.save(fallback)
        print(f"Saved to fallback: {fallback}")

if __name__ == "__main__":
    create_pitch_deck()
