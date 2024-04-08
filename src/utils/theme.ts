export class Theme {
  primary: string;
  success: string;
  alert: string;
  danger: string;
  info: string;
  complementary: string;

  constructor() {
    this.primary = '#c44a13';
    this.success = '';
    this.alert = '';
    this.danger = '';
    this.info = '';
    this.complementary = '';
    this.generateColors();
  }

  hexToHSL(hex: string): { hue: number, saturation: number, lightness: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
      return { hue: 0, saturation: 0, lightness: 0 };
    }

    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let hue = 0, saturation = 0, lightness = (max + min) / 2;

    if (max === min) {
      hue = saturation = 0;
    } else {
      const diff = max - min;
      saturation = lightness > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      switch (max) {
        case r: hue = (g - b) / diff + (g < b ? 6 : 0); break;
        case g: hue = (b - r) / diff + 2; break;
        case b: hue = (r - g) / diff + 4; break;
      }
      hue /= 6;
    }

    return {
      hue: Math.round(hue * 360),
      saturation: Math.round(saturation * 100),
      lightness: Math.round(lightness * 100)
    };
  }

  getTonality(color: string): { hue: number, saturation: number, lightness: number } {
    const { hue, saturation, lightness } = this.hexToHSL(color);
    return { hue, saturation, lightness };
  }

  generateColor(hue: number): string {
    const { saturation, lightness } = this.getTonality(this.primary);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  private generateColors() {
    const { hue } = this.getTonality(this.primary);
    this.success = this.generateColor(120);
    this.alert = this.generateColor(60);
    this.danger = this.generateColor(0);
    this.info = this.generateColor(240);
    this.complementary = this.generateColor((hue +  180) %  360);
    this.applyStyles();
  }

  private applyStyles() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
    :root {
      --success: ${this.success};
      --alert: ${this.alert};
      --danger: ${this.danger};
      --info: ${this.info};
      --complementary: ${this.complementary};
    }
  `;
    document.head.appendChild(styleElement);
  }
}

export const theme = new Theme();