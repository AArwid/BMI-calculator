export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: "male" | "female" | "other" | "prefer_not_to_say";
  activityLevel: ActivityLevel;
  goal: Goal;
  dailyCalorieGoal: number;
  heightCm: number;
  weightKg: number;
}

export type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "extra_active";

export type Goal = "lose_weight" | "maintain_weight" | "gain_muscle";
