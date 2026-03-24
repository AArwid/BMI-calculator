export interface BMI {
  id: string;
  userId: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  category: bmiCategory;
  measuredAt: Date;
}

export type bmiCategory =
  | "underweight"
  | "normal_weight"
  | "overweight"
  | "obesity";
