import { calculateBmi, getBmiCategory } from "../user/bmi";

describe("calculateBmi", () => {
  test("returns correct BMI for normal weight (170 cm, 70 kg)", () => {
    expect(calculateBmi(170, 70)).toBe(24.2);
  });

  test("returns correct BMI for underweight (180 cm, 50 kg)", () => {
    expect(calculateBmi(180, 50)).toBe(15.4);
  });

  test("returns correct BMI for overweight (175 cm, 90 kg)", () => {
    expect(calculateBmi(175, 90)).toBe(29.4);
  });

  test("returns correct BMI for obesity (160 cm, 100 kg)", () => {
    expect(calculateBmi(160, 100)).toBe(39.1);
  });

  test("result is rounded to one decimal place", () => {
    // 173 cm / 68 kg → 22.714... → should be 22.7
    const result = calculateBmi(173, 68);
    const decimalPlaces = (result.toString().split(".")[1] ?? "").length;
    expect(decimalPlaces).toBeLessThanOrEqual(1);
    expect(result).toBe(22.7);
  });
});

describe("getBmiCategory", () => {
  test('returns "underweight" for BMI below 18.5', () => {
    expect(getBmiCategory(15.4)).toBe("underweight");
    expect(getBmiCategory(18.4)).toBe("underweight");
  });

  test('returns "normal_weight" for BMI 18.5-24.9', () => {
    expect(getBmiCategory(18.5)).toBe("normal_weight");
    expect(getBmiCategory(22.0)).toBe("normal_weight");
    expect(getBmiCategory(24.9)).toBe("normal_weight");
  });

  test('returns "overweight" for BMI 25-29.9', () => {
    expect(getBmiCategory(25.0)).toBe("overweight");
    expect(getBmiCategory(27.5)).toBe("overweight");
    expect(getBmiCategory(29.9)).toBe("overweight");
  });

  test('returns "obesity" for BMI 30 and above', () => {
    expect(getBmiCategory(30.0)).toBe("obesity");
    expect(getBmiCategory(39.1)).toBe("obesity");
    expect(getBmiCategory(45.0)).toBe("obesity");
  });

  test("exact boundary 18.5 is normal_weight not underweight", () => {
    expect(getBmiCategory(18.5)).toBe("normal_weight");
  });

  test("exact boundary 25.0 is overweight not normal_weight", () => {
    expect(getBmiCategory(25.0)).toBe("overweight");
  });

  test("exact boundary 30.0 is obesity not overweight", () => {
    expect(getBmiCategory(30.0)).toBe("obesity");
  });
});

describe("calculateBmi + getBmiCategory integration", () => {
  test("170 cm / 70 kg → normal_weight", () => {
    expect(getBmiCategory(calculateBmi(170, 70))).toBe("normal_weight");
  });

  test("180 cm / 50 kg → underweight", () => {
    expect(getBmiCategory(calculateBmi(180, 50))).toBe("underweight");
  });

  test("175 cm / 90 kg → overweight", () => {
    expect(getBmiCategory(calculateBmi(175, 90))).toBe("overweight");
  });

  test("160 cm / 100 kg → obesity", () => {
    expect(getBmiCategory(calculateBmi(160, 100))).toBe("obesity");
  });
});
