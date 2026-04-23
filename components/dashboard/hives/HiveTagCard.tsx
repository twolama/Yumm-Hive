"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import QRCode from "qrcode";
// import { cn } from "@/lib/utils";

type HiveTagCardProps = {
  hiveId: string;
  hardwareId: string;
  title?: string;
  description?: string;
};

const TAG_WIDTH = 2400;
const TAG_HEIGHT = 1200;

const HONEYCOMB_SVG = `<svg width="111" height="117" viewBox="0 0 111 117" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.12">
<path d="M77.9651 62.225L66.8445 42.575L77.9651 22.925H99.8794L111 42.575L99.8794 62.225H77.9651ZM39.0429 85.15L27.9223 65.5L39.0429 45.85H60.9571L72.0777 65.5L60.9571 85.15H39.0429ZM39.0429 39.3L27.9223 19.65L39.0429 0H60.9571L72.0777 19.65L60.9571 39.3H39.0429ZM0.120644 62.225L-11 42.575L0.120644 22.925H22.0349L32.6649 42.575L22.0349 62.225H0.120644ZM0.120644 108.075L-11 88.425L0.120644 68.775H22.0349L32.6649 88.425L22.0349 108.075H0.120644ZM39.6971 131L27.9223 111.35L39.0429 91.7H60.9571L72.0777 111.35L60.9571 131H39.6971ZM77.9651 108.075L66.8445 88.425L77.9651 68.775H99.8794L111 88.425L99.8794 108.075H77.9651Z" fill="#1A1C1A"/>
</g>
</svg>`;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function loadImage(src: string) {
  const image = new window.Image();
  image.decoding = "async";
  image.src = src;
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Failed to load image"));
  });
  return image;
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      currentLine = testLine;
    } else if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(word);
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

export default function HiveTagCard({ hiveId, hardwareId, description }: HiveTagCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);

  const webDescriptionLines = useMemo(() => {
    if (description) return description.split("\n").filter(l => l.trim());
    return [
      "This unique identifier is linked to your",
      `HIVE #${hiveId}`,
      "hardware tag and cannot be changed",
      "after registration."
    ];
  }, [description, hiveId]);

  const canvasDescriptionLines = useMemo(() => {
    if (description) return description.split("\n").filter(l => l.trim());
    return [
      "This unique identifier is linked to your",
      "hardware tag and cannot be changed",
      "after registration."
    ];
  }, [description]);

  useEffect(() => {
    QRCode.toDataURL(hardwareId, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 1000
    }).then(setQrDataUrl);
  }, [hardwareId]);

  const downloadTag = async () => {
    if (!qrDataUrl || isExporting) return;
    setIsExporting(true);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = TAG_WIDTH;
      canvas.height = TAG_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const qrImage = await loadImage(qrDataUrl);
      const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(HONEYCOMB_SVG)}`;
      const honeycombImage = await loadImage(svgDataUrl);

      // Main Card Body
      ctx.fillStyle = "#f4f4f4";
      ctx.fillRect(0, 0, TAG_WIDTH, TAG_HEIGHT);
      ctx.strokeStyle = "#f2a316";
      ctx.lineWidth = 15;
      roundRect(ctx, 10, 10, TAG_WIDTH - 20, TAG_HEIGHT - 20, 140);
      ctx.stroke();

      // Honeycomb Details (Bottom Left)
      ctx.drawImage(honeycombImage, -30, 820, 111 * 4, 117 * 4);

      // Right Panel
      ctx.fillStyle = "#faebd2";
      roundRect(ctx, 1340, 80, 980, 1040, 110);
      ctx.fill();

      // ========== ICON (dotted ring + grey circle) – matches web preview ==========
      ctx.save();
      ctx.translate(140, 140);               // top‑left corner, same as web preview
      ctx.strokeStyle = "#f2a316";
      ctx.lineWidth = 10;
      ctx.setLineDash([14, 14]);
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);    // outer ring radius 70px
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#dbdbdb";             // grey inner circle
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);    // inner circle radius 50px
      ctx.fill();
      ctx.restore();
      // ========== END ICON ==========

      // Top Header
      ctx.fillStyle = "#6b5b4c";
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText("PRE-GENERATED HIVE ID", 140, 340);

      // Hardware ID
      ctx.fillStyle = "#9c6b00";
      ctx.font = '900 190px sans-serif';
      ctx.fillText(hardwareId, 130, 530);

      // Description
      ctx.fillStyle = "#665d50";
      ctx.font = '400 56px sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      const descriptionX = 140;
      const descriptionY = 680;
      const descriptionLineHeight = 74;
      const descriptionMaxWidth = 1120;
      const descriptionMaxLines = 4;

      const wrappedDescriptionLines = canvasDescriptionLines
        .flatMap((line) => wrapCanvasText(ctx, line, descriptionMaxWidth))
        .slice(0, descriptionMaxLines);

      wrappedDescriptionLines.forEach((line, i) => {
        ctx.fillText(line, descriptionX, descriptionY + i * descriptionLineHeight);
      });

      // QR Code
      const qrSize = 800;
      const qrX = 1430;
      const qrY = 200;
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, qrX, qrY, qrSize, qrSize, 85);
      ctx.fill();
      ctx.drawImage(qrImage, qrX + 60, qrY + 60, qrSize - 120, qrSize - 120);

      // Vertical Text
      ctx.save();
      ctx.translate(2295, 600);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = "#000000";
      ctx.font = 'bold 64px sans-serif';
      ctx.textAlign = "center";
      ctx.fillText(`HIVE #${hiveId}`, 0, 0);
      ctx.restore();

      const link = document.createElement("a");
      link.download = `hive-tag-${hardwareId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[850px] w-full mx-auto">
      {/* Web Preview Card */}
      <div className="relative flex flex-col md:flex-row items-stretch justify-between w-full overflow-hidden rounded-[48px] border-2 border-[#f2a316] bg-[#f4f4f4] shadow-sm">
        
        {/* Honeycomb background */}
        <div
          className="absolute left-[-10px] bottom-[-10px] z-0 pointer-events-none"
          style={{ transform: "scale(2.5)", transformOrigin: "bottom left", opacity: 0.12 }}
          dangerouslySetInnerHTML={{ __html: HONEYCOMB_SVG }}
        />

        {/* Left Content Section */}
        <div className="relative z-10 flex flex-col justify-center p-8 md:p-10 md:w-[54%]">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-dotted border-[#f2a316]" />
            <div className="h-9 w-9 rounded-full bg-[#dbdbdb]" />
          </div>

          <div className="mt-7">
            <p className="text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] text-[#6b5b4c]">
              Pre-generated Hive ID
            </p>
            <h3 className="mt-1 text-5xl md:text-6xl font-black tracking-tight text-[#9c6b00]">
              {hardwareId}
            </h3>

            <div className="mt-6 space-y-0.5 max-w-[360px] text-[14px] md:text-[15px] leading-snug text-[#665d50]">
              {webDescriptionLines.map((line, idx) => (
                <p
                  key={idx}
                  className={line.includes(`HIVE #${hiveId}`) ? "font-bold text-[#9c6b00] mt-1" : ""}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: QR + Rotated Badge – centered and no overlap */}
        <div className="relative z-10 flex items-center justify-center p-6 md:w-[46%]">
          <div className="relative flex h-full w-full items-center justify-center rounded-[36px] bg-[#faebd2] p-6 md:pr-24">
            {/* QR container – perfectly centered */}
            <div className="rounded-[28px] bg-white p-3 shadow-sm w-full max-w-[240px] md:max-w-[280px] aspect-square flex items-center justify-center mx-auto">
              {qrDataUrl && (
                <Image
                  src={qrDataUrl}
                  alt="QR Code"
                  width={280}
                  height={280}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            {/* Rotated text – moved far right, no overlap */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap text-[16px] font-extrabold tracking-[0.15em] text-black hidden md:block">
              HIVE #{hiveId}
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={downloadTag}
          disabled={!qrDataUrl || isExporting}
          className="bg-[#f2a316] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#db8e0d] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-5 w-5" />
          {isExporting ? "Exporting..." : "Download Tag"}
        </button>
      </div>
    </div>
  );
}