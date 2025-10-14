import type {
  Adjustments,
  CSSFilter,
  PresetFilter,
  PresetFilters,
} from './types'

export const PRESET_FILTERS: {
  name: PresetFilter
  values: PresetFilters
}[] = [
  {
    name: 'Normal',
    values: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
    },
  },
  {
    name: 'Vintage',
    values: {
      sepia: 0.6,
      brightness: 90,
      contrast: 110,
      saturation: 100,
      hue: 0,
    },
  },
  {
    name: 'Cool Blue',
    values: {
      brightness: 95,
      contrast: 110,
      saturation: 110,
      hue: 190,
    },
  },
  {
    name: 'Noir',
    values: {
      grayscale: 100,
      brightness: 80,
      contrast: 140,
      saturation: 0,
      hue: 0,
    },
  },
  {
    name: 'Dreamy',
    values: {
      blur: 1.5,
      brightness: 130,
      contrast: 100,
      saturation: 110,
      hue: 0,
    },
  },
  {
    name: 'Inverted',
    values: {
      invert: 100,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
    },
  },
  {
    name: 'Sepia Tone',
    values: {
      sepia: 0.7,
      brightness: 100,
      contrast: 105,
      saturation: 90,
      hue: 0,
    },
  },
  {
    name: 'Pop Art',
    values: {
      brightness: 120,
      contrast: 140,
      saturation: 180,
      hue: 0,
    },
  },
  {
    name: 'Cyberpunk',
    values: {
      brightness: 100,
      contrast: 180,
      saturation: 150,
      hue: 220,
    },
  },
] as const

export function getPresetFilterByName(filterName: PresetFilter) {
  return PRESET_FILTERS.find((filter) => filter.name === filterName)
}

/**
 * Combine preset filters and user-adjusted filters.
 *
 * @param {Object} presetFilters - Preset filter values
 * @param {Object} adjustments - User-controlled filter values
 * @returns {string} Combined CSS filter string
 */
export function getFinalFilter(
  presetFilters: PresetFilters,
  adjustments: Adjustments
) {
  // Start with a list of supported filters
  const filters = {
    brightness:
      ((presetFilters.brightness ?? 100) * (adjustments.brightness ?? 100)) /
      100,
    contrast:
      ((presetFilters.contrast ?? 100) * (adjustments.contrast ?? 100)) / 100,
    saturation:
      ((presetFilters.saturation ?? 100) * (adjustments.saturation ?? 100)) /
      100,
    hue: (presetFilters.hue ?? 0) + (adjustments.hue ?? 0),
    sepia: presetFilters.sepia ?? 0,
    grayscale: presetFilters.grayscale ?? 0,
    blur: presetFilters.blur ?? 0,
    invert: presetFilters.invert ?? 0,
  }

  const cssFilterParts = [
    generateCssFilter('brightness', filters.brightness),
    generateCssFilter('contrast', filters.contrast),
    generateCssFilter('saturate', filters.saturation),
    generateCssFilter('hue-rotate', filters.hue, false, 'deg'),
    generateCssFilter('sepia', filters.sepia, false),
    generateCssFilter('grayscale', filters.grayscale, false),
    generateCssFilter('blur', filters.blur, false, 'px'),
    generateCssFilter('invert', filters.invert, false),
  ]

  return cssFilterParts.filter(Boolean).join(' ').trim()
}

/**
 * Generate a CSS filter string for an individual filter value.
 *
 * @param {string} filterName - The name of the CSS filter (e.g., 'brightness', 'contrast')
 * @param {number} value - The value for the filter
 * @param {boolean} isPercentage - Whether the filter value should be treated as a percentage (e.g., brightness, contrast)
 * @param {string} unit - The unit for the filter (e.g., "px" for blur, "deg" for hue-rotate)
 * @returns {string} The corresponding CSS filter string (e.g., 'brightness(0.8)', 'blur(5px)')
 */
function generateCssFilter(
  filterName: CSSFilter,
  value: number,
  isPercentage = true,
  unit = ''
): string {
  if (value === 0) return ''

  const filterValue = isPercentage ? value / 100 : value
  return `${filterName}(${filterValue}${unit})`
}
