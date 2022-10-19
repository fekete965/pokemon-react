export const ItemsPerPage: Record<string, number> = {
  '12': 12,
  '24': 24,
  '36': 36,
  '48': 48,
}

export const calculateMaxPageNum = (totalItems: number, itemsPerPage: number) => {
  return Math.floor(totalItems / itemsPerPage) + 1
}
