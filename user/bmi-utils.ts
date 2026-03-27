import { BMI, bmiCategory } from '../models/bmi.js';

export const calculateBmi = (heightCm: number, weightKg: number): number => {
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
};

export const getBmiCategory = (bmi: number): bmiCategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal_weight';
  if (bmi < 30) return 'overweight';
  return 'obesity';
};

export const getCategoryLabel = (category: bmiCategory): string => {
  if (category === 'underweight') return 'Underweight';
  if (category === 'normal_weight') return 'Normal weight';
  if (category === 'overweight') return 'Overweight';
  return 'Obese';
};

export const getHistory = (): BMI[] => {
  const data = localStorage.getItem('bmi-history');
  return data ? JSON.parse(data) : [];
};

export const saveToHistory = (entry: BMI) => {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem('bmi-history', JSON.stringify(history));
};

export const createBmiEntry = (heightCm: number, weightKg: number): BMI => {
  const bmi = calculateBmi(heightCm, weightKg);
  return {
    id: Date.now().toString(),
    userId: '',
    heightCm: heightCm,
    weightKg: weightKg,
    bmi: bmi,
    category: getBmiCategory(bmi),
    measuredAt: new Date(),
  };
};
