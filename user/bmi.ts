import { BMI, bmiCategory } from '../models/bmi.js';

const form = document.querySelector<HTMLFormElement>('#bmiForm')!;
const heightInput = document.querySelector<HTMLInputElement>('#bmiHeight')!;
const weightInput = document.querySelector<HTMLInputElement>('#bmiWeight')!;
const resultCard = document.querySelector<HTMLDivElement>('#bmiResultCard')!;
const bmiValueEl = document.querySelector<HTMLDivElement>('#bmiValue')!;
const bmiCategoryEl = document.querySelector<HTMLDivElement>('#bmiCategory')!;
const bmiMarker = document.querySelector<HTMLDivElement>('#bmiMarker')!;
const heightDisplay = document.querySelector<HTMLDivElement>('#bmiHeightDisplay')!;
const weightDisplay = document.querySelector<HTMLDivElement>('#bmiWeightDisplay')!;
const historyBody = document.querySelector<HTMLElement>('#bmiHistoryTable tbody')!;
const saveBtn = document.querySelector<HTMLButtonElement>('#saveBmiBtn')!;

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

const getCategoryLabel = (category: bmiCategory): string => {
  if (category === 'underweight') return 'Underweight';
  if (category === 'normal_weight') return 'Normal weight';
  if (category === 'overweight') return 'Overweight';
  return 'Obese';
};

const displayResult = (bmiValue: number, category: bmiCategory, heightCm: number, weightKg: number) => {
  resultCard.style.display = '';
  bmiValueEl.textContent = bmiValue.toString();
  bmiCategoryEl.textContent = getCategoryLabel(category);
  heightDisplay.textContent = heightCm + ' cm';
  weightDisplay.textContent = weightKg.toFixed(1) + ' kg';

  const pos = ((bmiValue - 10) / (40 - 10)) * 100;
  bmiMarker.style.left = pos + '%';
};

const displayHistory = (history: BMI[]) => {
  while (historyBody.firstChild) {
    historyBody.removeChild(historyBody.firstChild);
  }

  history.map((entry: BMI) => {
    const row = document.createElement('tr');

    row.appendChild(document.createElement('td')).textContent =
      new Date(entry.measuredAt).toLocaleDateString();
    row.appendChild(document.createElement('td')).textContent = entry.heightCm.toString();
    row.appendChild(document.createElement('td')).textContent = entry.weightKg.toFixed(1);
    row.appendChild(document.createElement('td')).textContent = entry.bmi.toString();
    row.appendChild(document.createElement('td')).textContent = getCategoryLabel(entry.category);

    historyBody.appendChild(row);
  });
};

const getHistory = (): BMI[] => {
  const data = localStorage.getItem('bmi-history');
  return data ? JSON.parse(data) : [];
};

const saveResult = () => {
  const height = +heightInput.value;
  const weight = +weightInput.value;
  if (!height || !weight) return;

  const bmi = calculateBmi(height, weight);

  const entry: BMI = {
    id: Date.now().toString(),
    userId: '',
    heightCm: height,
    weightKg: weight,
    bmi: bmi,
    category: getBmiCategory(bmi),
    measuredAt: new Date(),
  };

  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem('bmi-history', JSON.stringify(history));
  displayHistory(history);
};

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const height = +heightInput.value;
  const weight = +weightInput.value;
  if (!height || !weight) return;

  const bmiValue = calculateBmi(height, weight);
  const category = getBmiCategory(bmiValue);
  displayResult(bmiValue, category, height, weight);
};

const initApp = () => {
  displayHistory(getHistory());
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);
saveBtn.addEventListener('click', saveResult);
