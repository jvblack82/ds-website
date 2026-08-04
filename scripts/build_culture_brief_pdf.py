"""
Generates public/Dreamscope_Brief_Culture.pdf, the paper version of
/brief/culture.

Run with:
  python scripts/build_culture_brief_pdf.py

Matches the existing Dreamscope_Brief.pdf (the AI Maestro one): ReportLab, A4,
2 pages, real brand fonts embedded from assets/fonts/.

The copy here is deliberately kept in sync with src/pages/BriefCulture.tsx by
hand. If you edit one, edit the other. Every number traces to Joe's July 2026
culture CV, and the 450-person client is never named.
"""
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "assets" / "fonts"
OUT = ROOT / "public" / "Dreamscope_Brief_Culture.pdf"

# Warm palette, same hexes as the .brc- tokens in BriefCulture.tsx
DARK = HexColor("#1E2B3A")
CARAMEL = HexColor("#B5895A")
CREAM = HexColor("#FBF8F1")
WHITE = HexColor("#FFFFFF")
BODY = HexColor("#4A4036")
MUTED = HexColor("#8A7E70")
LINE = HexColor("#E7DECF")

SERIF = "DMSerif"
SERIF_I = "DMSerif-Italic"
SANS = "Jakarta"
SANS_SB = "Jakarta-SemiBold"
SANS_I = "Jakarta-Italic"

for name, filename in [
    (SERIF, "DMSerifDisplay-Regular.ttf"),
    (SERIF_I, "DMSerifDisplay-Italic.ttf"),
    (SANS, "PlusJakartaSans-Regular.ttf"),
    (SANS_SB, "PlusJakartaSans-SemiBold.ttf"),
    (SANS_I, "PlusJakartaSans-Italic.ttf"),
]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))

PW, PH = A4
M = 48  # page margin
CW = PW - (M * 2)  # content width


class Page:
    """Thin wrapper over the canvas that tracks a vertical cursor."""

    def __init__(self, c):
        self.c = c
        self.y = PH - M

    def space(self, n):
        self.y -= n

    def text(self, s, font, size, color, leading=None, width=CW, x=M, gap=0):
        leading = leading or size * 1.45
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        for line in simpleSplit(s, font, size, width):
            self.y -= leading
            self.c.drawString(x, self.y, line)
        self.y -= gap

    def rule(self, color=LINE, gap_before=10, gap_after=10):
        self.y -= gap_before
        self.c.setStrokeColor(color)
        self.c.setLineWidth(1)
        self.c.line(M, self.y, PW - M, self.y)
        self.y -= gap_after

    def snum(self, label):
        self.text(label, SERIF, 13, CARAMEL, gap=2)

    def h2(self, s):
        self.text(s, SERIF, 22, DARK, leading=27, gap=7)

    def lead(self, s, color=BODY, width=CW):
        self.text(s, SANS, 10.1, color, leading=16.2, width=width, gap=5)


def band(c, y_top, height, color):
    c.setFillColor(color)
    c.rect(0, y_top - height, PW, height, stroke=0, fill=1)


def build():
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("The Dreamscope Brief: Culture")
    c.setAuthor("Joe Black, Dreamscope Consulting")
    c.setSubject(
        "Culture and operations for growing companies. Your people already "
        "know what's broken."
    )

    # ------------------------------------------------------------------ PAGE 1
    c.setFillColor(CREAM)
    c.rect(0, 0, PW, PH, stroke=0, fill=1)

    # HERO on dark
    hero_h = 254
    c.setFillColor(DARK)
    c.rect(0, PH - hero_h, PW, hero_h, stroke=0, fill=1)

    p = Page(c)
    p.space(16)
    p.text("DREAMSCOPE  ·  THE BRIEF", SANS_SB, 8, CARAMEL, gap=10)
    p.text(
        "Your people already know what's broken.",
        SERIF,
        30,
        WHITE,
        leading=34,
        width=CW - 90,
        gap=8,
    )
    p.text(
        "They know how to fix it too. Almost nobody asks them in a way that "
        "gets a straight answer. I do, and then I turn what they said into how "
        "the place actually runs.",
        SANS,
        10.2,
        HexColor("#C9CFD6"),
        leading=15.5,
        width=CW - 60,
        gap=10,
    )
    p.text("90-SECOND READ", SANS_SB, 7.5, HexColor("#8A94A0"))

    p.y = PH - hero_h - 34

    # 01 THE IDEA
    p.snum("01 / The idea")
    p.h2("I don't bring you a culture. I surface yours.")
    p.lead(
        "You already have one. The only question is whether it got built on "
        "purpose. Somewhere in your company people are already doing what "
        "works, and nobody wrote it down. Most culture programs skip that and "
        "install someone else's values instead. I start with your people, not "
        "a framework."
    )
    p.space(13)
    p.text(
        "Everything works better if people love what they do.",
        SERIF_I,
        15,
        CARAMEL,
        leading=19,
        width=CW - 120,
    )

    p.rule(gap_before=34, gap_after=28)

    # 02 THE WORK
    p.snum("02 / The work")
    p.h2("Four phases. Start wherever it hurts.")
    p.lead(
        "You don't need all four. Most engagements start in Discover, because "
        "you cannot fix what you cannot see."
    )
    p.space(10)

    phases = [
        ("01", "Inspire", "Vision, mission, values, and what each one means during a shift."),
        ("02", "Discover", "Interviews, focus groups, surveys, read together by AI that catches what no single source shows."),
        ("03", "Build", "Middle managers, and training and SOPs built from what your top performers already do."),
        ("04", "Implement", "Recognition, meetings, onboarding, reviews. Where culture stops being a deck."),
    ]
    col_w = (CW - 24) / 4
    tile_top = p.y
    tile_h = 138
    for i, (num, name, desc) in enumerate(phases):
        x = M + i * (col_w + 8)
        c.setFillColor(WHITE)
        c.setStrokeColor(CARAMEL if num == "02" else LINE)
        c.setLineWidth(1)
        c.roundRect(x, tile_top - tile_h, col_w, tile_h, 6, stroke=1, fill=1)

        ty = tile_top - 18
        c.setFont(SERIF, 12)
        c.setFillColor(CARAMEL)
        c.drawString(x + 10, ty, num)
        ty -= 15
        c.setFont(SANS_SB, 9.5)
        c.setFillColor(DARK)
        c.drawString(x + 10, ty, name)
        ty -= 12
        c.setFont(SANS, 7.6)
        c.setFillColor(BODY)
        for line in simpleSplit(desc, SANS, 7.6, col_w - 20):
            c.drawString(x + 10, ty, line)
            ty -= 9.6
        if num == "02":
            c.setFont(SANS_SB, 6.4)
            c.setFillColor(CARAMEL)
            c.drawString(x + 10, tile_top - tile_h + 9, "MOST START HERE")

    p.y = tile_top - tile_h

    # footer rule
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.line(M, 38, PW - M, 38)
    c.setFont(SANS, 7.4)
    c.setFillColor(MUTED)
    c.drawString(M, 26, "Dreamscope Consulting  ·  joe@dreamscope.win  ·  dreamscope.win/brief/culture")
    c.drawRightString(PW - M, 26, "1 / 2")

    c.showPage()

    # ------------------------------------------------------------------ PAGE 2
    c.setFillColor(CREAM)
    c.rect(0, 0, PW, PH, stroke=0, fill=1)

    # 03 PROOF on dark
    proof_h = 292
    c.setFillColor(DARK)
    c.rect(0, PH - proof_h, PW, proof_h, stroke=0, fill=1)

    p = Page(c)
    p.space(16)
    p.snum("03 / Proof")
    p.text("Proven on real data, not a slide.", SERIF, 22, WHITE, leading=27, gap=7)
    p.lead(
        "I ran the Culture Engine on a 450-person company across 20+ "
        "locations. A year of data, 40 leadership interviews, 290 survey "
        "responses. The receipts:",
        color=HexColor("#C9CFD6"),
        width=CW - 40,
    )
    p.space(12)

    stats = [
        ("5 of 7", "leadership departures flagged before they happened, validated in a blind retrospective"),
        ("-87%", "supervisor sentiment crisis surfaced, invisible to all 40 interviewed leaders"),
        ("50", "working practices pulled from their own top performers and mapped to strategic goals"),
    ]
    scol = (CW - 32) / 3
    stop = p.y
    for i, (n, label) in enumerate(stats):
        x = M + i * (scol + 16)
        c.setStrokeColor(CARAMEL)
        c.setLineWidth(2)
        c.line(x, stop, x + scol, stop)
        c.setFont(SERIF, 25)
        c.setFillColor(WHITE)
        c.drawString(x, stop - 30, n)
        c.setFont(SANS, 7.8)
        c.setFillColor(HexColor("#A8B0B9"))
        ly = stop - 46
        for line in simpleSplit(label, SANS, 7.8, scol):
            c.drawString(x, ly, line)
            ly -= 10.2

    p.y = stop - 96
    p.lead(
        "None of that came from me. It came from their people. My job was to "
        "make it legible.",
        color=HexColor("#C9CFD6"),
    )

    p.y = PH - proof_h - 22

    # 04 THE HONEST PART
    p.snum("04 / The honest part")
    p.h2("Most culture work stops at the poster.")
    p.lead(
        "Values on a wall change nothing and everyone who works there knows "
        "it. It only counts once it reaches what people touch every week: how "
        "they get hired, trained, recognized, reviewed, and run. I'm an "
        "operator, so that is where I take it. At Pizza 4P's that meant 260+ "
        "frontline SOPs folded into one backbone managers train against."
    )
    p.space(13)
    p.text(
        "Culture you can point at on a wall isn't culture. It's decor.",
        SERIF_I,
        15,
        CARAMEL,
        leading=19,
        width=CW - 130,
    )

    p.rule(gap_before=14, gap_after=10)

    # 05 THE OPERATOR
    p.snum("05 / The operator")
    p.h2("Twenty years operating. Nine across Asia.")
    p.space(4)

    creds = [
        ("Pizza 4P's", "Culture & Ops Excellence Director",
         "Built Culture and L&D from zero across 40+ locations, 5 countries, 3,700 employees. eNPS up 20 points, happiness up 18 to 20%."),
        ("Seller Candy", "Interim COO",
         "Built the operational foundation through 10x team growth and 6x revenue."),
        ("Christina's", "Operations Team Leader",
         "Led operations from 3 to 8 cities and 50 to 500+ employees. Wrote the employee manual and the full SOP suite."),
        ("Delivering Happiness", "Certified Coachsultant",
         "Corporate culture transformation on the Zappos methodology. Engagements with VPBank, Sathapana Bank, and TP Bank."),
    ]
    for org, role, desc in creds:
        c.setStrokeColor(LINE)
        c.setLineWidth(1)
        c.line(M, p.y, PW - M, p.y)
        p.y -= 14
        c.setFont(SANS_SB, 9.2)
        c.setFillColor(DARK)
        c.drawString(M, p.y, org)
        c.setFont(SANS_SB, 6.8)
        c.setFillColor(CARAMEL)
        c.drawString(M, p.y - 10, role.upper())
        dy = p.y
        for line in simpleSplit(desc, SANS, 8.6, CW - 168):
            c.setFont(SANS, 8.6)
            c.setFillColor(BODY)
            c.drawString(M + 168, dy, line)
            dy -= 11.4
        p.y = min(p.y - 19, dy - 5)
    c.setStrokeColor(LINE)
    c.line(M, p.y, PW - M, p.y)

    # CTA band at the bottom
    cta_h = 96
    if p.y < cta_h + 10:
        raise SystemExit(
            f"Credentials overflow the CTA band (cursor {p.y:.0f}pt, band top "
            f"{cta_h}pt). Tighten spacing above or shorten copy; do NOT ship, "
            f"the last credential would be hidden."
        )
    c.setFillColor(DARK)
    c.rect(0, 0, PW, cta_h, stroke=0, fill=1)
    c.setFont(SERIF, 17)
    c.setFillColor(WHITE)
    c.drawString(M, cta_h - 34, "The next step is 15 minutes.")
    c.setFont(SANS, 9)
    c.setFillColor(HexColor("#C9CFD6"))
    c.drawString(
        M, cta_h - 52,
        "A few questions about what you are actually dealing with. I read every one. If it fits, we'll book a call.",
    )
    c.setFont(SANS_SB, 9)
    c.setFillColor(CARAMEL)
    c.drawString(M, cta_h - 72, "discovery.dreamscope.win/culture")
    c.setFont(SANS, 8.4)
    c.setFillColor(HexColor("#8A94A0"))
    c.drawRightString(PW - M, cta_h - 72, "joe@dreamscope.win  ·  2 / 2")

    c.showPage()
    c.save()
    size_kb = OUT.stat().st_size / 1024
    print(f"{OUT.relative_to(ROOT)}  {size_kb:.1f} KB")


if __name__ == "__main__":
    build()
