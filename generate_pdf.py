import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
)
from reportlab.pdfgen import canvas

PDF_OUTPUT_PATH = r"d:\t3-kumbhsetu\KUMBHSETU_ECOSYSTEM_DOCUMENTATION.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Running header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(44, 802, "KumbhSetu 2026: Maha Kumbh Mela Ecosystem Documentation")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(44, 796, 551, 796)

        # Running footer
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(551, 24, footer_text)
        self.drawString(44, 24, "CONFIDENTIAL & PROPRIETARY — KUMBHATHON INNOVATION FOUNDATION")
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(44, 34, 551, 34)
        self.restoreState()


def build_pdf():
    doc = SimpleDocTemplate(
        PDF_OUTPUT_PATH,
        pagesize=A4,
        leftMargin=44,
        rightMargin=44,
        topMargin=48,
        bottomMargin=44,
    )

    styles = getSampleStyleSheet()

    PRIMARY = colors.HexColor("#C2410C")    # Saffron
    PRIMARY_DARK = colors.HexColor("#7C2D12")
    SECONDARY = colors.HexColor("#D97706")  # Gold
    DARK_TEXT = colors.HexColor("#0F172A")  # Slate 900
    MUTED_TEXT = colors.HexColor("#475569") # Slate 600
    LIGHT_BG = colors.HexColor("#F8FAFC")
    BORDER_COLOR = colors.HexColor("#CBD5E1")

    title_style = ParagraphStyle(
        "CoverTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=PRIMARY_DARK,
        spaceAfter=3,
    )
    subtitle_style = ParagraphStyle(
        "CoverSubTitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=14,
        textColor=MUTED_TEXT,
        spaceAfter=8,
    )
    h1_style = ParagraphStyle(
        "Heading1_Custom",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=16,
        textColor=PRIMARY_DARK,
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True,
    )
    h2_style = ParagraphStyle(
        "Heading2_Custom",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=DARK_TEXT,
        spaceBefore=6,
        spaceAfter=3,
        keepWithNext=True,
    )
    body_style = ParagraphStyle(
        "Body_Custom",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12,
        textColor=DARK_TEXT,
        spaceAfter=4,
    )
    bullet_style = ParagraphStyle(
        "Bullet_Custom",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11.5,
        textColor=DARK_TEXT,
        leftIndent=10,
        spaceAfter=2.5,
    )
    table_text = ParagraphStyle(
        "TableText",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=10.5,
        textColor=DARK_TEXT,
    )
    table_header = ParagraphStyle(
        "TableHeader",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=10.5,
        textColor=colors.white,
    )

    story = []

    # -------------------------------------------------------------------------
    # COVER / HEADER BANNER
    # -------------------------------------------------------------------------
    story.append(Paragraph("KUMBHSETU 2026", title_style))
    story.append(Paragraph("Maha Kumbh Mela Nashik–Trimbakeshwar — 4-App Connected Digital Ecosystem", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceAfter=8))

    # Metadata Table
    meta_data = [
        [Paragraph("<b>Document:</b> System Architecture & User Guide", table_text), Paragraph("<b>Target Event:</b> Maha Kumbh Mela 2026", table_text)],
        [Paragraph("<b>Backend Cloud:</b> Supabase (PostgreSQL + Realtime)", table_text), Paragraph("<b>Ecosystem Status:</b> 4 Apps Synchronized & Verified", table_text)],
    ]
    meta_table = Table(meta_data, colWidths=[250, 257])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    # -------------------------------------------------------------------------
    # 1. EXECUTIVE SUMMARY & SYSTEM TOPOLOGY
    # -------------------------------------------------------------------------
    story.append(Paragraph("1. Executive Summary & Architecture", h1_style))
    story.append(Paragraph(
        "<b>KumbhSetu 2026</b> is a multi-role digital ecosystem connecting millions of pilgrims, district administration authorities, local food & craft merchants, and ground safety volunteers during the Maha Kumbh Mela. All applications communicate through a unified Supabase cloud database with sub-second real-time sync, resilient memory-fallback offline storage, and automated ratings computation.",
        body_style
    ))

    # App Matrix Table
    apps_data = [
        [Paragraph("Application", table_header), Paragraph("Primary Role", table_header), Paragraph("Key Modules & Capabilities", table_header)],
        [
            Paragraph("<b>KumbhSetu-Expo</b><br/>(Pilgrim Mobile App)", table_text),
            Paragraph("Yatris & Devotees", table_text),
            Paragraph("Live RTO transit fares, verified local bazaar shops & ratings, grievance reporting, rumor buster, snan muhurat & map.", table_text)
        ],
        [
            Paragraph("<b>KumbhSetu-Admins</b><br/>(Admin Portal)", table_text),
            Paragraph("RTO, Municipal Corp, Police Control", table_text),
            Paragraph("Set transit route price caps, essential commodity ceilings, audit & approve/reject/delete bazaar stalls, dispatch fact-checks.", table_text)
        ],
        [
            Paragraph("<b>KumbhSetu-LocalBazaar</b><br/>(Merchant App)", table_text),
            Paragraph("Local Vendors & Eateries", table_text),
            Paragraph("Register stall, upload FSSAI license & photos, 1-tap Open/Closed toggle, manage food catalog, customer inquiry desk.", table_text)
        ],
        [
            Paragraph("<b>KumbhVeer</b><br/>(Volunteer App)", table_text),
            Paragraph("Ground Patrol & Fact-Checkers", table_text),
            Paragraph("Sector-targeted incident alerts, on-the-spot physical inspection, Swipe-to-Resolve, ground rumor investigation (EN/MR).", table_text)
        ],
    ]
    apps_table = Table(apps_data, colWidths=[120, 110, 277])
    apps_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_DARK),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(apps_table)
    story.append(Spacer(1, 8))

    # -------------------------------------------------------------------------
    # 2. FEATURE WORKFLOWS & SYNCHRONIZATION
    # -------------------------------------------------------------------------
    story.append(Paragraph("2. Real-Time Cross-App Workflows", h1_style))

    story.append(Paragraph("A. Transit Tariffs & Price Ceiling Enforcement", h2_style))
    story.append(Paragraph("• <b>Admin Creation:</b> District Administration & RTO configure route tariffs in <code>tariff_routes</code> (Shared Auto, Bus, Private Auto, Taxi) and ceiling prices in <code>commodity_prices</code>.", bullet_style))
    story.append(Paragraph("• <b>Pilgrim Stream:</b> KumbhSetu-Expo streams the official route cards dynamically with real-time search, travel duration, distance, and 4-mode pricing.", bullet_style))
    story.append(Paragraph("• <b>Resilient Fallbacks:</b> API service includes automatic multi-tier query retries to ensure fares always display without failure.", bullet_style))

    story.append(Paragraph("B. Local Bazaar, Admin Auditing & Shop Ratings", h2_style))
    story.append(Paragraph("• <b>Stall Registration:</b> Merchants register their eatery or stall with photos, address, and FSSAI badge in KumbhSetu-LocalBazaar. Initial state is set to pending verification.", bullet_style))
    story.append(Paragraph("• <b>Admin Authority:</b> In KumbhSetu-Admins, the administration audits the stall with full authority to <b>Approve & Verify</b> (publishes to Yatri app), <b>Reject/Revoke</b>, or <b>Delete</b> permanently.", bullet_style))
    story.append(Paragraph("• <b>Yatri Marketplace Visibility:</b> Only Admin-verified stalls (<code>is_verified = true</code>) appear in the Pilgrim marketplace.", bullet_style))
    story.append(Paragraph("• <b>Live Open/Closed Status:</b> Vendors toggle stall open/closed status in 1-tap; green 'OPEN' or gray 'CLOSED' badge updates immediately.", bullet_style))
    story.append(Paragraph("• <b>Rating & Dynamic Ranking:</b> Pilgrims submit 1–5★ reviews -> triggers database recalculation of average rating -> shops automatically rank with top-rated rising to the top.", bullet_style))

    story.append(Paragraph("C. Grievance Reporting & Volunteer Resolution", h2_style))
    story.append(Paragraph("• <b>Citizen Report:</b> Pilgrims file overcharging or crowd safety complaints in KumbhSetu-Expo.", bullet_style))
    story.append(Paragraph("• <b>Squad Dispatch:</b> Realtime alerts notify both KumbhSetu-Admins and KumbhVeer volunteers in that duty sector.", bullet_style))
    story.append(Paragraph("• <b>Ground Resolution:</b> Volunteers visit the spot, add resolution notes, and <b>Swipe-to-Resolve</b> in KumbhVeer.", bullet_style))

    story.append(Paragraph("D. Rumor Buster & Fact-Checking", h2_style))
    story.append(Paragraph("• <b>Claim Submission:</b> Pilgrims submit unverified social media rumors in the app.", bullet_style))
    story.append(Paragraph("• <b>Ground Investigation:</b> KumbhVeer volunteers physically verify conditions on the ground.", bullet_style))
    story.append(Paragraph("• <b>Official Broadcast:</b> Admins publish verified status (TRUE / FALSE) with official explanations live across all apps.", bullet_style))

    story.append(Spacer(1, 8))

    # -------------------------------------------------------------------------
    # 3. DATABASE SCHEMA & DATA MODELS
    # -------------------------------------------------------------------------
    story.append(Paragraph("3. Supabase Cloud Database Schema", h1_style))
    story.append(Paragraph("The backend comprises 9 relational tables with row-level security, triggers, and realtime publication:", body_style))

    schema_data = [
        [Paragraph("Table Name", table_header), Paragraph("Primary Columns & Schema", table_header), Paragraph("Sync Scope", table_header)],
        [
            Paragraph("<code>public.tariff_routes</code>", table_text),
            Paragraph("id, route_name, standard_rate, shared_auto_rate, bus_rate, night_rate, distance_km, approx_minutes, traffic_note", table_text),
            Paragraph("Admin -> Pilgrims", table_text)
        ],
        [
            Paragraph("<code>public.commodity_prices</code>", table_text),
            Paragraph("id, item_name, category, max_retail_price, unit, notes", table_text),
            Paragraph("Admin -> Pilgrims", table_text)
        ],
        [
            Paragraph("<code>public.merchants</code>", table_text),
            Paragraph("id, business_name, owner_name, phone, category, scale_type, fssai_number, facade_image_url, is_verified, is_open_now, rating, review_count", table_text),
            Paragraph("Merchants <-> Admins <-> Pilgrims", table_text)
        ],
        [
            Paragraph("<code>public.catalog_items</code>", table_text),
            Paragraph("id, merchant_id, name, category, price, description, image_url, is_available", table_text),
            Paragraph("Merchants -> Pilgrims", table_text)
        ],
        [
            Paragraph("<code>public.shop_reviews</code>", table_text),
            Paragraph("id, merchant_id, user_name, rating, comment, created_at", table_text),
            Paragraph("Pilgrims -> Merchants/Admins", table_text)
        ],
        [
            Paragraph("<code>public.incidents_and_grievances</code>", table_text),
            Paragraph("id, title, description, category, sector, status, priority, reporter_name, assigned_volunteer_name, resolution_notes, resolved_at", table_text),
            Paragraph("Pilgrims -> Admins & Volunteers", table_text)
        ],
        [
            Paragraph("<code>public.fact_checks_and_rumors</code>", table_text),
            Paragraph("id, claim_title, verdict, official_explanation, submitted_by, verified_by_volunteer, verified_by_admin", table_text),
            Paragraph("All 4 Applications", table_text)
        ],
        [
            Paragraph("<code>public.volunteer_profiles</code>", table_text),
            Paragraph("id, full_name, phone, id_card_number, assigned_sector, is_active, tasks_resolved_count", table_text),
            Paragraph("Volunteers <-> Admins", table_text)
        ],
        [
            Paragraph("<code>public.pilgrim_inquiries</code>", table_text),
            Paragraph("id, merchant_id, item_id, pilgrim_name, pilgrim_phone, message, status", table_text),
            Paragraph("Pilgrims -> Merchants", table_text)
        ],
    ]
    schema_table = Table(schema_data, colWidths=[130, 260, 117])
    schema_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#1E293B")),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 3.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(schema_table)
    story.append(Spacer(1, 8))

    # -------------------------------------------------------------------------
    # 4. HOW TO RUN & TEST LOCALLY
    # -------------------------------------------------------------------------
    story.append(Paragraph("4. Local Execution & Credentials", h1_style))
    story.append(Paragraph("All 4 applications run on Expo SDK 57 with web, Android, and iOS support.", body_style))

    creds_data = [
        [Paragraph("App Directory", table_header), Paragraph("Start Command", table_header), Paragraph("Default Login / Passcode", table_header)],
        [
            Paragraph("<b>KumbhSetu-Expo</b>", table_text),
            Paragraph("<code>cd KumbhSetu-Expo && npx expo start</code>", table_text),
            Paragraph("Open registration (Name, Phone, DOB) or Direct Sign-In", table_text)
        ],
        [
            Paragraph("<b>KumbhSetu-Admins</b>", table_text),
            Paragraph("<code>cd KumbhSetu-Admins && npx expo start</code>", table_text),
            Paragraph("<b>Username:</b> Gaurang<br/><b>Password:</b> pass123 (or PIN: 1008)", table_text)
        ],
        [
            Paragraph("<b>KumbhSetu-LocalBazaar</b>", table_text),
            Paragraph("<code>cd KumbhSetu-LocalBazaar && npx expo start</code>", table_text),
            Paragraph("Register new stall or enter 10-digit mobile number", table_text)
        ],
        [
            Paragraph("<b>KumbhVeer</b>", table_text),
            Paragraph("<code>cd KumbhVeer && npx expo start</code>", table_text),
            Paragraph("Register volunteer or badge ID (e.g. KV-RAMKUND-01)", table_text)
        ],
    ]
    creds_table = Table(creds_data, colWidths=[120, 200, 187])
    creds_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_DARK),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(creds_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("© 2026 Kumbhathon Innovation Foundation • Maha Kumbh Mela Ecosystem", ParagraphStyle(
        "FooterNote",
        parent=styles["Normal"],
        fontName="Helvetica-Oblique",
        fontSize=8,
        textColor=MUTED_TEXT,
        alignment=1,
    )))

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF at: {PDF_OUTPUT_PATH}")

if __name__ == "__main__":
    build_pdf()
