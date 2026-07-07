from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "it-diagnostic-agent-build-and-user-manual.md"
OUTPUT = ROOT / "output" / "pdf" / "it-diagnostic-agent-build-and-user-manual.pdf"
FONT = "C:/Windows/Fonts/NotoSansTC-VF.ttf"

BLUE = colors.HexColor("#1f4e6d")
BLUE_DARK = colors.HexColor("#12324a")
BLUE_LIGHT = colors.HexColor("#eaf3f8")
INK = colors.HexColor("#263238")
MUTED = colors.HexColor("#6b7280")
LINE = colors.HexColor("#d8e1e8")
SOFT = colors.HexColor("#f7f9fb")
GREEN = colors.HexColor("#0f766e")
GREEN_LIGHT = colors.HexColor("#e8f5f2")
AMBER = colors.HexColor("#9a5b00")
AMBER_LIGHT = colors.HexColor("#fff4df")


def register_fonts():
    pdfmetrics.registerFont(TTFont("NotoSansTC", FONT))


def make_styles():
    base = getSampleStyleSheet()
    common = {"fontName": "NotoSansTC", "wordWrap": "CJK"}
    return {
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=base["Title"],
            **common,
            fontSize=27,
            leading=34,
            alignment=TA_LEFT,
            textColor=BLUE_DARK,
            spaceAfter=5 * mm,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=base["BodyText"],
            **common,
            fontSize=12,
            leading=17,
            textColor=colors.HexColor("#476579"),
            spaceAfter=8 * mm,
        ),
        "toc_title": ParagraphStyle(
            "TocTitle",
            parent=base["Heading1"],
            **common,
            fontSize=20,
            leading=26,
            textColor=BLUE_DARK,
            spaceAfter=6 * mm,
        ),
        "section": ParagraphStyle(
            "SectionTitle",
            parent=base["Heading1"],
            **common,
            fontSize=15,
            leading=19,
            textColor=colors.white,
        ),
        "h2": ParagraphStyle(
            "SubTitle",
            parent=base["Heading2"],
            **common,
            fontSize=12.5,
            leading=17,
            textColor=BLUE,
            spaceBefore=3 * mm,
            spaceAfter=1.5 * mm,
        ),
        "body": ParagraphStyle(
            "ManualBody",
            parent=base["BodyText"],
            **common,
            fontSize=9.6,
            leading=14,
            textColor=INK,
            spaceAfter=1.7 * mm,
            alignment=TA_LEFT,
        ),
        "small": ParagraphStyle(
            "SmallText",
            parent=base["BodyText"],
            **common,
            fontSize=8.5,
            leading=12,
            textColor=MUTED,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            **common,
            fontSize=9.4,
            leading=13,
            leftIndent=7 * mm,
            firstLineIndent=-4 * mm,
            spaceAfter=1.2 * mm,
            textColor=INK,
        ),
        "number": ParagraphStyle(
            "Number",
            parent=base["BodyText"],
            **common,
            fontSize=9.4,
            leading=13,
            leftIndent=8 * mm,
            firstLineIndent=-5 * mm,
            spaceAfter=1.2 * mm,
            textColor=INK,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="NotoSansTC",
            fontSize=8.2,
            leading=11,
            textColor=colors.HexColor("#102a43"),
        ),
        "callout": ParagraphStyle(
            "Callout",
            parent=base["BodyText"],
            **common,
            fontSize=9.3,
            leading=13,
            textColor=colors.HexColor("#3a2d12"),
        ),
        "toc": ParagraphStyle(
            "TocItem",
            parent=base["BodyText"],
            **common,
            fontSize=9.3,
            leading=13,
            textColor=INK,
        ),
    }


def escape(text):
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("`", "")
    )


def clean_inline(text):
    return escape(text.replace("  ", " "))


def make_box(content, style, background=SOFT, border=LINE, padding=6):
    table = Table([[content]], colWidths=[174 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 0.5, border),
                ("LEFTPADDING", (0, 0), (-1, -1), padding),
                ("RIGHTPADDING", (0, 0), (-1, -1), padding),
                ("TOPPADDING", (0, 0), (-1, -1), padding),
                ("BOTTOMPADDING", (0, 0), (-1, -1), padding),
            ]
        )
    )
    return table


def section_banner(text, styles):
    table = Table([[Paragraph(escape(text), styles["section"])]], colWidths=[174 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), BLUE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return KeepTogether([Spacer(1, 3 * mm), table, Spacer(1, 3 * mm)])


def extract_meta_and_headings(markdown):
    title = "IT Diagnostic Agent 靜態網頁建置與操作手冊"
    meta = []
    headings = []

    for line in markdown.splitlines():
        line = line.strip()
        if line.startswith("# "):
            title = line[2:].strip()
            continue
        if line.startswith("## "):
            headings.append(("section", line[3:].strip()))
            continue
        if line.startswith("### "):
            headings.append(("sub", line[4:].strip()))
            continue
        if line and not line.startswith("- ") and not headings and "：" in line:
            meta.append(line.replace("  ", ""))

    return title, meta[:4], headings


def build_cover(title, meta, styles):
    subtitle = (
        "本手冊整合本機維護、資料固化、GitHub 版本管理、"
        "Cloudflare Workers Static Assets 發布，以及網頁日常操作流程。"
    )
    chips = [
        "純靜態網站",
        "GitHub main 自動部署",
        "Workers Static Assets",
        "Export / Import 協作",
    ]

    chip_cells = [[Paragraph(escape(chip), styles["small"]) for chip in chips[:2]]]
    chip_cells.append([Paragraph(escape(chip), styles["small"]) for chip in chips[2:]])
    chip_table = Table(chip_cells, colWidths=[54 * mm, 54 * mm])
    chip_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), BLUE_LIGHT),
                ("BOX", (0, 0), (-1, -1), 0.4, colors.HexColor("#c6ddeb")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )

    meta_rows = [[Paragraph(clean_inline(item), styles["body"])] for item in meta]
    meta_table = Table(meta_rows, colWidths=[116 * mm])
    meta_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )

    return [
        Spacer(1, 25 * mm),
        Paragraph(escape(title), styles["cover_title"]),
        Paragraph(escape(subtitle), styles["cover_subtitle"]),
        HRFlowable(width="100%", thickness=1, color=LINE, spaceAfter=8 * mm),
        meta_table,
        Spacer(1, 8 * mm),
        chip_table,
        Spacer(1, 42 * mm),
        make_box(
            Paragraph(
                "建議閱讀順序：先看第 2 章資料同步模式，再看第 5 章匯出與匯入，最後依第 8 章發布到 Cloudflare Workers。",
                styles["callout"],
            ),
            styles["callout"],
            background=AMBER_LIGHT,
            border=colors.HexColor("#f0c36a"),
        ),
        PageBreak(),
    ]


def build_toc(headings, styles):
    rows = []
    for kind, text in headings:
        prefix = "" if kind == "section" else "    "
        rows.append([Paragraph(escape(prefix + text), styles["toc"])])

    table = Table(rows, colWidths=[174 * mm])
    table.setStyle(
        TableStyle(
            [
                ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, SOFT]),
                ("LINEBELOW", (0, 0), (-1, -1), 0.25, colors.HexColor("#edf1f4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return [
        Paragraph("目錄", styles["toc_title"]),
        Paragraph(
            "章節依實際維護流程排序，從資料來源、頁面操作、協作、版本管理到 Cloudflare Workers 發布。",
            styles["body"],
        ),
        Spacer(1, 3 * mm),
        table,
        PageBreak(),
    ]


def paragraph_for_line(line, styles):
    numbered = re.match(r"^(\d+)\.\s+(.*)$", line)
    if numbered:
        return Paragraph(f"{numbered.group(1)}. {clean_inline(numbered.group(2))}", styles["number"])
    if line.startswith("- "):
        return Paragraph("• " + clean_inline(line[2:]), styles["bullet"])
    if line.startswith("注意：") or line.startswith("安全限制："):
        return make_box(
            Paragraph(clean_inline(line), styles["callout"]),
            styles["callout"],
            background=AMBER_LIGHT,
            border=colors.HexColor("#edc15e"),
        )
    return Paragraph(clean_inline(line), styles["body"])


def build_story(markdown, styles):
    story = []
    in_code = False
    code_lines = []
    skip_header = True

    for raw in markdown.splitlines():
        line = raw.rstrip()

        if line.startswith("# "):
            continue

        if skip_header and line.startswith("## "):
            skip_header = False

        if skip_header:
            continue

        if line.startswith("```"):
            if in_code:
                code = Preformatted("\n".join(code_lines), styles["code"])
                background = GREEN_LIGHT if any("->" in item for item in code_lines) else SOFT
                border = colors.HexColor("#96d4c8") if background == GREEN_LIGHT else LINE
                story.append(make_box(code, styles["code"], background=background, border=border, padding=7))
                story.append(Spacer(1, 2 * mm))
                code_lines = []
                in_code = False
            else:
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not line:
            story.append(Spacer(1, 1.2 * mm))
            continue

        if line.startswith("## "):
            story.append(section_banner(line[3:], styles))
            continue

        if line.startswith("### "):
            title = Paragraph(escape(line[4:]), styles["h2"])
            accent = Table([[title]], colWidths=[174 * mm])
            accent.setStyle(
                TableStyle(
                    [
                        ("LINEBEFORE", (0, 0), (0, 0), 3, BLUE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                        ("TOPPADDING", (0, 0), (-1, -1), 3),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                    ]
                )
            )
            story.append(KeepTogether([Spacer(1, 2 * mm), accent]))
            continue

        flowable = paragraph_for_line(line, styles)
        story.append(flowable)

    return story


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("NotoSansTC", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 12 * mm, "IT Diagnostic Agent 靜態網頁建置與操作手冊")
    canvas.drawRightString(192 * mm, 12 * mm, f"第 {doc.page} 頁")
    canvas.restoreState()


def main():
    register_fonts()
    styles = make_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    markdown = SOURCE.read_text(encoding="utf-8")
    title, meta, headings = extract_meta_and_headings(markdown)

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=18 * mm,
        title=title,
        author="Codex",
    )
    story = []
    story.extend(build_cover(title, meta, styles))
    story.extend(build_toc(headings, styles))
    story.extend(build_story(markdown, styles))
    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(OUTPUT)


if __name__ == "__main__":
    main()
