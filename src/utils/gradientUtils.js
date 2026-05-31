export function getGradientCSS(colors, angle = 90) {
  return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
}

export function getTailwindGradient(colors) {
  return `background: linear-gradient(90deg, ${colors.join(", ")});`;
}

export function downloadGradientPNG(colors, angle = 90) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1200;
  canvas.height = 600;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px Arial";
  ctx.fillText("Generated Gradient", 50, 500);

  ctx.font = "24px Arial";
  ctx.fillText(colors.join("  "), 50, 545);

  const link = document.createElement("a");
  link.download = "gradient.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}