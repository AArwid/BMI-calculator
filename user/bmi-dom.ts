import { BMI, bmiCategory } from '../models/bmi.js';
import { getCategoryLabel } from './bmi-utils.js';

const resultCard = document.querySelector<HTMLDivElement>('#bmiResultCard')!;
const bmiValueEl = document.querySelector<HTMLDivElement>('#bmiValue')!;
const bmiCategoryEl = document.querySelector<HTMLDivElement>('#bmiCategory')!;
const bmiMarker = document.querySelector<HTMLDivElement>('#bmiMarker')!;
const heightDisplay = document.querySelector<HTMLDivElement>('#bmiHeightDisplay')!;
const weightDisplay = document.querySelector<HTMLDivElement>('#bmiWeightDisplay')!;
const historyBody = document.querySelector<HTMLElement>('#bmiHistoryTable tbody')!;

export const displayResult = (bmiValue: number, category: bmiCategory, heightCm: number, weightKg: number) => {
  resultCard.style.display = '';
  bmiValueEl.textContent = bmiValue.toString();
  bmiCategoryEl.textContent = getCategoryLabel(category);
  heightDisplay.textContent = heightCm + ' cm';
  weightDisplay.textContent = weightKg.toFixed(1) + ' kg';

  const pos = ((bmiValue - 10) / (40 - 10)) * 100;
  bmiMarker.style.left = pos + '%';
};

export const displayHistory = (history: BMI[]) => {
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
