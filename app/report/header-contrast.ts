export type HeaderTone = "light" | "dark";

// Choose the stronger black/white contrast after the 15% white glass tint.
export function headerToneForBackground(red: number, green: number, blue: number): HeaderTone {
  const linear = [red, green, blue].map(channel => {
    const tinted = (channel * .85 + 255 * .15) / 255;
    return tinted <= .04045 ? tinted / 12.92 : ((tinted + .055) / 1.055) ** 2.4;
  });
  const luminance = linear[0] * .2126 + linear[1] * .7152 + linear[2] * .0722;
  const blackContrast = (luminance + .05) / .05;
  const whiteContrast = 1.05 / (luminance + .05);
  return blackContrast >= whiteContrast ? "dark" : "light";
}

export function headerToneAtPoint(x: number, y: number, header: HTMLElement): HeaderTone | null {
  // Walk painted layers, not ancestors: a transparent shade can have a white
  // ancestor while a photo/video is painted immediately underneath the shade.
  const underneath = document.elementsFromPoint(x, y).filter(element => !header.contains(element));
  // Native page snapshots temporarily expose only <html> to hit testing.
  // Wait for the real page instead of treating that temporary state as white.
  if (!underneath.some(element => element !== document.documentElement)) return null;
  for (const element of underneath) {
    const style = getComputedStyle(element);
    // Photos and video vary within one section; white lettering gets a dark edge.
    if (element.matches("img, video, canvas") || style.backgroundImage !== "none") return "light";
    const channels = style.backgroundColor.match(/[\d.]+/g)?.map(Number);
    if (channels && channels.length >= 3 && (channels[3] ?? 1) >= .9) {
      return headerToneForBackground(channels[0], channels[1], channels[2]);
    }
  }
  return "dark";
}
