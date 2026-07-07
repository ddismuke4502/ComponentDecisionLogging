import type {
  ComponentDecision,
  DecisionOption,
  DecisionOptionScores,
} from "@/features/components/component-types";

export const comparisonCriteria = [
  {
    key: "performance",
    label: "Performance",
    description: "Runtime cost, rendering efficiency, and interaction speed.",
  },
  {
    key: "accessibility",
    label: "Accessibility",
    description: "Semantic support, keyboard behavior, and assistive tech fit.",
  },
  {
    key: "bundleSize",
    label: "Bundle Size",
    description: "Impact on shipped JavaScript and dependency weight.",
  },
  {
    key: "developerExperience",
    label: "Developer Experience",
    description: "Ease of maintenance, testing, reuse, and implementation.",
  },
] as const satisfies ReadonlyArray<{
  key: keyof DecisionOptionScores;
  label: string;
  description: string;
}>;

export type DecisionComparisonCriterion =
  (typeof comparisonCriteria)[number]["key"];

export function calculateOptionTotalScore(option: DecisionOption) {
  return comparisonCriteria.reduce(
    (total, criterion) => total + option.scores[criterion.key],
    0,
  );
}

export function calculateOptionAverageScore(option: DecisionOption) {
  return calculateOptionTotalScore(option) / comparisonCriteria.length;
}

export function getChosenOption(decision: ComponentDecision) {
  return (
    decision.optionsConsidered.find(
      (option) => option.id === decision.chosenOptionId,
    ) ?? null
  );
}

export function rankDecisionOptions(options: DecisionOption[]) {
  return [...options].sort((firstOption, secondOption) => {
    const scoreDifference =
      calculateOptionTotalScore(secondOption) -
      calculateOptionTotalScore(firstOption);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return firstOption.name.localeCompare(secondOption.name);
  });
}

export function getHighestScoringOption(decision: ComponentDecision) {
  return rankDecisionOptions(decision.optionsConsidered)[0] ?? null;
}

export function isChosenOptionHighestScoring(decision: ComponentDecision) {
  const chosenOption = getChosenOption(decision);
  const highestScoringOption = getHighestScoringOption(decision);

  if (!chosenOption || !highestScoringOption) {
    return false;
  }

  return chosenOption.id === highestScoringOption.id;
}

export function getCriterionLeaders(
  decision: ComponentDecision,
  criterion: DecisionComparisonCriterion,
) {
  if (decision.optionsConsidered.length === 0) {
    return [];
  }

  const highestScore = Math.max(
    ...decision.optionsConsidered.map((option) => option.scores[criterion]),
  );

  return decision.optionsConsidered.filter(
    (option) => option.scores[criterion] === highestScore,
  );
}

export function getDecisionComparisonSummary(decision: ComponentDecision) {
  const chosenOption = getChosenOption(decision);
  const highestScoringOption = getHighestScoringOption(decision);

  return {
    chosenOption,
    highestScoringOption,
    isChosenHighestScoring: isChosenOptionHighestScoring(decision),
    optionCount: decision.optionsConsidered.length,
    criteriaCount: comparisonCriteria.length,
  };
}