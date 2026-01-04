export const calculateInventoryValue = (items: Array<{ quantity: number; cost: number }>): number => {
  return items.reduce((total, item) => total + item.quantity * item.cost, 0);
};

export const calculateTurnoverRate = (costOfGoodsSold: number, averageInventoryValue: number): number => {
  if (averageInventoryValue === 0) return 0;
  return costOfGoodsSold / averageInventoryValue;
};

export const calculateROI = (gain: number, cost: number): number => {
  if (cost === 0) return 0;
  return ((gain - cost) / cost) * 100;
};

export const calculateCarbonReduction = (
  currentEmissions: number,
  baselineEmissions: number
): number => {
  return baselineEmissions - currentEmissions;
};

export const calculateCarbonReductionPercentage = (
  currentEmissions: number,
  baselineEmissions: number
): number => {
  if (baselineEmissions === 0) return 0;
  return ((baselineEmissions - currentEmissions) / baselineEmissions) * 100;
};

export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
};

export const calculateOnTimeDeliveryRate = (
  onTimeDeliveries: number,
  totalDeliveries: number
): number => {
  if (totalDeliveries === 0) return 0;
  return (onTimeDeliveries / totalDeliveries) * 100;
};
