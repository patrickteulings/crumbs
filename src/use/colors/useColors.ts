import { toRefs, reactive } from 'vue'

export const useColors = (): any => {
  const state = reactive({
    error: null,
    username: 'null',
    password: 'null',
    user: null
  })

  const hexToHSL = (hex = 'FF9900'): any => {
    const regExConverter = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    const result = regExConverter || ['FF9900', 'ff', '99', '00']

    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)

    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let h = (max + min) / 2

    let s = (max + min) / 2
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    const HSL = { h: 0, s: 0, l: 0 }

    HSL.h = h * 100 || 0
    HSL.s = s * 100 || 0
    HSL.l = l * 100 || 0

    return HSL
  }


  const newHexToHSL = (H: any) => {
    // Convert hex to RGB first
    let r: any = 0
    let g: any = 0
    let b: any = 0

    if (H.length === 4) {
      r = '0x' + H[1] + H[1]
      g = '0x' + H[2] + H[2]
      b = '0x' + H[3] + H[3]
    } else if (H.length === 7) {
      r = '0x' + H[1] + H[2]
      g = '0x' + H[3] + H[4]
      b = '0x' + H[5] + H[6]
    }
    // Then to HSL
    r /= 255
    g /= 255
    b /= 255

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

    if (h < 0) {
      h += 360
    }

    l = (cmax + cmin) / 2
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return 'hsl(' + h + ',' + s + '%,' + l + '%)'
  }

  //
  const hexToRgb = (hex: any) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    let m, r, g, b

    hex = hex.replace(shorthandRegex, function (m: any, r: any, g: any, b: any) {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const RGBToHSL = (r: any, g: any, b: any) => {
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

    if (h < 0) {
    // Make negative hues positive behind 360°
      h += 360
    }

    l = (cmax + cmin) / 2

    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)
    return { h, s, l }
    // return 'hsl(' + h + ',' + s + '%,' + l + '%)'
  }

  return {
    ...toRefs(state),
    hexToHSL,
    newHexToHSL,
    hexToRgb,
    RGBToHSL
  }
}
