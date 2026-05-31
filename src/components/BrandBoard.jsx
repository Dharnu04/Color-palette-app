import { Download, Copy, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { getSuggestedFonts } from "../utils/fontMatcher";
import { getGradientCSS } from "../utils/gradientUtils";
import { getBrandPersonality } from "../utils/personalityUtils";

export default function BrandBoard({ paletteName, colors, setStatus }) {
  const fonts = getSuggestedFonts(paletteName);
  const personality = getBrandPersonality(colors);

  const safeFileName = paletteName.replace(/\s+/g, "-").toLowerCase();

  const copySummary = async () => {
    const summary = `
Brand: ${paletteName}

COLORS
${colors.join("\n")}

TYPOGRAPHY
Heading: ${fonts.heading}
Body: ${fonts.body}

STYLE
${fonts.style}

BRAND PERSONALITY
Tone: ${personality.tone.join(", ")}
Industries: ${personality.industries.join(", ")}
${personality.description}
`;

    await navigator.clipboard.writeText(summary);
    setStatus("Brand board copied.");
  };

  const getBoardCanvas = async () => {
    const board = document.getElementById("brand-board-export");

    if (!board) return null;

    return await html2canvas(board, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });
  };

  const downloadBoardPNG = async () => {
    const canvas = await getBoardCanvas();

    if (!canvas) {
      setStatus("Could not find brand board.");
      return;
    }

    const link = document.createElement("a");
    link.download = `${safeFileName}-brand-board.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    setStatus("Brand board PNG downloaded.");
  };

  const downloadBoardPDF = async () => {
    const canvas = await getBoardCanvas();

    if (!canvas) {
      setStatus("Could not find brand board.");
      return;
    }

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);

    pdf.save(`${safeFileName}-brand-board.pdf`);

    setStatus("Brand board PDF downloaded.");
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Brand Board
          </p>

          <h2 className="text-3xl font-black text-slate-950 dark:text-white">
            Export Client Presentation
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={copySummary}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Copy size={15} />
            Copy Summary
          </button>

          <button
            onClick={downloadBoardPNG}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950"
          >
            <Download size={15} />
            Export PNG
          </button>

          <button
            onClick={downloadBoardPDF}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950"
          >
            <FileText size={15} />
            Export PDF
          </button>
        </div>
      </div>

      <div
        id="brand-board-export"
        style={{
          overflow: "hidden",
          borderRadius: "32px",
          backgroundColor: "#ffffff",
          color: "#020617",
        }}
      >
        <div
          style={{
            height: "160px",
            background: getGradientCSS(colors),
          }}
        />

        <div style={{ padding: "32px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "48px",
                lineHeight: "1",
                fontWeight: 900,
                color: "#020617",
              }}
            >
              {paletteName}
            </h1>

            <p
              style={{
                marginTop: "12px",
                fontSize: "18px",
                color: "#64748b",
              }}
            >
              {fonts.style}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {colors.map((color) => (
              <div key={color}>
                <div
                  style={{
                    height: "96px",
                    borderRadius: "16px",
                    backgroundColor: color,
                  }}
                />

                <p
                  style={{
                    marginTop: "8px",
                    textAlign: "center",
                    fontSize: "12px",
                    fontWeight: 900,
                    color: "#020617",
                  }}
                >
                  {color}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                backgroundColor: "#f8fafc",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                Typography
              </p>

              <h3
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: 900,
                  color: "#020617",
                }}
              >
                {fonts.heading}
              </h3>

              <p style={{ marginTop: "12px", color: "#020617" }}>
                Body Font: {fonts.body}
              </p>
            </div>

            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                backgroundColor: "#f8fafc",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                Brand Direction
              </p>

              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 900,
                  color: "#020617",
                }}
              >
                {fonts.style}
              </h3>

              <p
                style={{
                  marginTop: "12px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#64748b",
                }}
              >
                Generated from palette analysis and typography matching.
              </p>
            </div>

            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                backgroundColor: "#f8fafc",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                Personality
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {personality.tone.map((item) => (
                  <span
                    key={item}
                    style={{
                      borderRadius: "999px",
                      backgroundColor: "#ffffff",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: 900,
                      color: "#334155",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p
                style={{
                  marginTop: "16px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#64748b",
                }}
              >
                {personality.description}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                backgroundColor: colors[0],
                color: colors[4],
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.7,
                }}
              >
                Logo Background
              </p>

              <h3
                style={{
                  margin: "32px 0 0",
                  fontSize: "36px",
                  fontWeight: 900,
                }}
              >
                {paletteName}
              </h3>
            </div>

            <div
              style={{
                borderRadius: "24px",
                padding: "24px",
                backgroundColor: "#f8fafc",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#94a3b8",
                }}
              >
                UI Preview
              </p>

              <div
                style={{
                  marginTop: "24px",
                  borderRadius: "16px",
                  backgroundColor: "#ffffff",
                  padding: "20px",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#020617",
                  }}
                >
                  Brand Card
                </h4>

                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#64748b",
                  }}
                >
                  A preview card using your palette for digital layouts.
                </p>

                <button
                  style={{
                    marginTop: "20px",
                    border: 0,
                    borderRadius: "999px",
                    backgroundColor: colors[2],
                    padding: "12px 20px",
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#ffffff",
                  }}
                >
                  Primary Action
                </button>
              </div>
            </div>
          </div>

          <div>
            <p
              style={{
                margin: "0 0 12px",
                fontSize: "12px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#94a3b8",
              }}
            >
              Suggested Industries
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {personality.industries.map((industry) => (
                <span
                  key={industry}
                  style={{
                    borderRadius: "999px",
                    backgroundColor: "#f1f5f9",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: 900,
                    color: "#334155",
                  }}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}