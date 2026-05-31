export function exportAsCSS(colors) {
  return `:root {\n${colors
    .map((color, index) => `  --color-${index + 1}: ${color};`)
    .join("\n")}\n}`;
}

export function exportAsTailwind(colors) {
  return `colors: {\n${colors
    .map((color, index) => `  palette${index + 1}: "${color}",`)
    .join("\n")}\n}`;
}

export function exportAsFigmaTokens(colors) {
  const tokens = {
    color: {
      primary: {
        value: colors[0],
        type: "color",
      },
      secondary: {
        value: colors[1],
        type: "color",
      },
      accent: {
        value: colors[2],
        type: "color",
      },
      surface: {
        value: colors[3],
        type: "color",
      },
      text: {
        value: colors[4],
        type: "color",
      },
    },
  };

  return JSON.stringify(tokens, null, 2);
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function downloadPalettePNG(colors) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1200;
  canvas.height = 400;

  const width = canvas.width / colors.length;

  colors.forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(index * width, 0, width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px Arial";
    ctx.fillText(color, index * width + 40, 340);
  });

  const link = document.createElement("a");
  link.download = "color-palette.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}