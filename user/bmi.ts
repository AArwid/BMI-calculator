import { calculateBmi, getBmiCategory, getHistory, saveToHistory, createBmiEntry } from './bmi-utils.js';
import { displayResult, displayHistory } from './bmi-dom.js';

const form = document.querySelector<HTMLFormElement>('#bmiForm')!;
const heightInput = document.querySelector<HTMLInputElement>('#bmiHeight')!;
const weightInput = document.querySelector<HTMLInputElement>('#bmiWeight')!;
const saveBtn = document.querySelector<HTMLButtonElement>('#saveBmiBtn')!;
const useProfileBtn = document.querySelector<HTMLButtonElement>('#useProfileBtn')!;

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const height = +heightInput.value;
  const weight = +weightInput.value;
  if (!height || !weight) return;

  const bmiValue = calculateBmi(height, weight);
  const category = getBmiCategory(bmiValue);
  displayResult(bmiValue, category, height, weight);
};

const saveResult = () => {
  const height = +heightInput.value;
  const weight = +weightInput.value;
  if (!height || !weight) return;

  saveToHistory(createBmiEntry(height, weight));
  displayHistory(getHistory());
};

const loadProfileData = () => {
  const currentUser = localStorage.getItem('currentUser');

  if (!currentUser) {
    alert('You need to log in to use profile data. Redirecting to login...');
    sessionStorage.setItem('bmiRedirect', 'true');
    window.location.href = 'account.html';
    return;
  }

  const history = getHistory();

  if (history.length === 0) {
    alert('No previous measurements found. Calculate and save a result first.');
    return;
  }

  const lastEntry = history[0];
  heightInput.value = lastEntry.heightCm.toString();
  weightInput.value = lastEntry.weightKg.toString();
};

const initApp = () => {
  displayHistory(getHistory());

  if (sessionStorage.getItem('bmiLoggedIn') === 'true') {
    sessionStorage.removeItem('bmiLoggedIn');
    loadProfileData();
  }
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);
saveBtn.addEventListener('click', saveResult);
useProfileBtn.addEventListener('click', loadProfileData);
