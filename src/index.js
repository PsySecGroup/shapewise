const sort = (start, end) => start < end ? [start, end] : [end, start]

/**
 * Logical NOT proximity:
 * Returns true if the value is *outside* the range but still within a threshold distance from the range.
 * Returns false if the value is inside the range.
 */
export function not(start, end, value, threshold) {
  const [min, max] = sort(start, end)

  if (value <= max && value >= min) {
    return false
  }

  const range = max - min
  const thresholdDistance = threshold * range

  const distanceFromTop = max + thresholdDistance
  const distanceFromBottom = thresholdDistance - min

  return (value > max && value < distanceFromTop) ||
     (value < min && value > distanceFromBottom)
}

/**
 * Logical AND proximity:
 * Returns true if the value is near the center of the range, within a given threshold.
 */
export function and(start, end, value, threshold) {
  const [min, max] = sort(start, end)
  const basis = (min + max) / 2
  const distance = Math.abs(value - basis)
  return distance <= threshold
}

/**
 * Logical NAND proximity:
 * Returns true if the value is inside the range but not near the center (based on threshold).
 * Returns false if the value is outside the range.
 */
export function nand(start, end, value, threshold) {
  const [min, max] = sort(start, end)

  if (value > max || value < min) {
    return false
  }

  return !and(start, end, value, threshold)
}

/**
 * Logical OR proximity:
 * Returns true if the value is close to either the top or bottom of the range (edge thresholds).
 */
export function or(start, end, value, threshold) {
  const [min, max] = sort(start, end)

  if (value > max || value < min) {
    return false
  }

  const range = max - min
  const thresholdDistance = threshold * range

  const distanceFromTop = max - thresholdDistance
  const distanceFromBottom = thresholdDistance + min

  return value >= distanceFromTop || value <= distanceFromBottom
}

/**
 * Logical NOR proximity:
 * Returns true if the value is inside the range but *not* near the edges.
 */
export function nor(start, end, value, threshold) {
  const [min, max] = sort(start, end)

  if (value > max || value < min) {
    return false
  }

  return !or(start, end, value, threshold)
}

/**
 * Logical XOR proximity:
 * Returns true if the value is close to *only one* of the two edges of the range (top or bottom).
 */
export function xor(start, end, value, threshold) {
  const [min, max] = sort(start, end)

  const range = max - min
  const thresholdDistance = threshold * range

  const distanceFromTop = max - thresholdDistance
  const distanceFromBottom = thresholdDistance + min

  const isCloseToTop = value >= distanceFromTop
  const isCloseToBottom = value <= distanceFromBottom

  return (isCloseToTop && !isCloseToBottom) || (!isCloseToTop && isCloseToBottom)
}

/**
 * Logical NXOR proximity:
 * Returns true if the value is close to both edges or neither edge (not exclusively one).
 */
export function nxor(start, end, value, threshold) {
  const [min, max] = sort(start, end)

  if (value > max || value < min) {
    return false
  }

  return !xor(start, end, value, threshold)
}
