export const useColors = (): any => {
  /**
   * Convert a Hex to RGB Object.
   * @param {any} hex - The HEX value.
   * @returns {object} - Object with {r, g, b} values
   */

  const hexToRGB = (hex: any): Record<string, unknown> | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i


    hex = hex.replace(shorthandRegex, function (m: number, r: number, g: number, b: number) {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  /**
  * Convert RGB color to HSL Object
  * @param: (red: number, green: number, blue: number)
  * @returns: Object {h: h, s: s, l: l}
  */

  const rgbToHSL = (r: any, g: any, b: any) => {
    // Make r, g, and b fractions of 1
    r /= 255
    g /= 255
    b /= 255

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b)
    const cmax = Math.max(r, g, b)
    const delta = cmax - cmin

    let h = 0
    let s = 0
    let l = 0

    if (delta === 0) {
      h = 0
    } else if (cmax === r) {
      h = ((g - b) / delta) % 6
    } else if (cmax === g) {
      h = (b - r) / delta + 2
    } else {
      h = (r - g) / delta + 4
    }

    h = Math.round(h * 60)

    // Make negative hues positive behind 360°
    if (h < 0) {
      h += 360
    }

    l = (cmax + cmin) / 2

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    // Return a { h, s, l } Object
    return { h, s, l }
  }

  /**
   * Converts HEX value to HSL Object
   * @param hex
   * @returns {object} - HSL OBJECT
   */
  const hexToHSL = (hex: any) => {
    const rgb = hexToRGB(hex)
    const hsl = (rgb) ? rgbToHSL(rgb.r, rgb.g, rgb.b) : rgbToHSL(0, 0, 0)

    return hsl
  }

  return {
    hexToRGB,
    rgbToHSL,
    hexToHSL
  }
}
