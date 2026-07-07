import { mockComponents } from "@/data/mock-components";
import {
  calculateOptionAverageScore,
  calculateOptionTotalScore,
  comparisonCriteria,
  getChosenOption,
  getCriterionLeaders,
  getDecisionComparisonSummary,
  getHighestScoringOption,
  isChosenOptionHighestScoring,
  rankDecisionOptions,
} from "@/features/components/decision-comparison-utils";

const primaryButtonDecision = mockComponents[0].decisions[0];

describe("decision-comparison-utils", () => {
  it("defines the required MVP comparison criteria", () => {
    expect(comparisonCriteria.map((criterion) => criterion.key)).toEqual([
      "performance",
      "accessibility",
      "bundleSize",
      "developerExperience",
    ]);
  });

  it("calculates the total score for an option", () => {
    const nativeButtonOption = primaryButtonDecision.optionsConsidered[0];

    expect(calculateOptionTotalScore(nativeButtonOption)).toBe(19);
  });

  it("calculates the average score for an option", () => {
    const nativeButtonOption = primaryButtonDecision.optionsConsidered[0];

    expect(calculateOptionAverageScore(nativeButtonOption)).toBeCloseTo(4.75);
  });

  it("finds the chosen option for a decision", () => {
    const chosenOption = getChosenOption(primaryButtonDecision);

    expect(chosenOption?.id).toBe("option-native-button");
    expect(chosenOption?.name).toBe("Native button element");
  });

  it("ranks options from highest score to lowest score", () => {
    const rankedOptions = rankDecisionOptions(
      primaryButtonDecision.optionsConsidered,
    );

    expect(rankedOptions[0].id).toBe("option-native-button");
    expect(rankedOptions[1].id).toBe("option-clickable-div");
  });

  it("returns the highest scoring option", () => {
    const highestScoringOption = getHighestScoringOption(primaryButtonDecision);

    expect(highestScoringOption?.id).toBe("option-native-button");
  });

  it("detects whether the chosen option is the highest scoring option", () => {
    expect(isChosenOptionHighestScoring(primaryButtonDecision)).toBe(true);
  });

  it("returns the leader for a specific criterion", () => {
    const accessibilityLeaders = getCriterionLeaders(
      primaryButtonDecision,
      "accessibility",
    );

    expect(accessibilityLeaders).toHaveLength(1);
    expect(accessibilityLeaders[0].id).toBe("option-native-button");
  });

  it("summarizes the comparison state for a decision", () => {
    const summary = getDecisionComparisonSummary(primaryButtonDecision);

    expect(summary.optionCount).toBe(2);
    expect(summary.criteriaCount).toBe(4);
    expect(summary.chosenOption?.id).toBe("option-native-button");
    expect(summary.highestScoringOption?.id).toBe("option-native-button");
    expect(summary.isChosenHighestScoring).toBe(true);
  });
});