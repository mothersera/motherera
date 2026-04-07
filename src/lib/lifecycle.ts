export type LifecycleStageId =
  | "pre_conception"
  | "first_trimester"
  | "second_trimester"
  | "third_trimester"
  | "postpartum_0_3"
  | "postpartum_3_12"
  | "parenting";

export type LifecycleInputs = {
  expectedDueDate?: Date | null;
  gestationalAgeWeeks?: number | null;
  childBirthDates?: Date[] | null;
  wellnessObjectives?: string[] | null;
};

export type LifecycleEvaluation = {
  stageId: LifecycleStageId;
  label: string;
  motherhoodStage: "pregnancy" | "postpartum" | "child_0_5" | "toddler";
  confidence: "high" | "medium" | "low";
  derivedFrom: "birth_date" | "due_date" | "gestational_age" | "objective" | "fallback";
};

function toFiniteNumber(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function daysBetween(a: Date, b: Date) {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function monthsBetween(a: Date, b: Date) {
  const years = b.getFullYear() - a.getFullYear();
  const months = b.getMonth() - a.getMonth();
  const total = years * 12 + months;
  const dayAdj = b.getDate() >= a.getDate() ? 0 : -1;
  return total + dayAdj;
}

function normalizeObjectives(list: string[] | null | undefined) {
  if (!Array.isArray(list)) return [];
  return list
    .map(s => String(s || "").trim())
    .filter(Boolean)
    .slice(0, 12);
}

function pickLatestDate(dates: Date[]) {
  if (!Array.isArray(dates) || dates.length === 0) return null;
  const valid = dates.filter(d => d instanceof Date && !Number.isNaN(d.getTime()));
  if (valid.length === 0) return null;
  valid.sort((a, b) => b.getTime() - a.getTime());
  return valid[0];
}

export function evaluateLifecycle(inputs: LifecycleInputs, now: Date = new Date()): LifecycleEvaluation {
  const objectives = normalizeObjectives(inputs.wellnessObjectives);
  const due = inputs.expectedDueDate instanceof Date && !Number.isNaN(inputs.expectedDueDate.getTime()) ? inputs.expectedDueDate : null;
  const ga = toFiniteNumber(inputs.gestationalAgeWeeks);
  const childDates = Array.isArray(inputs.childBirthDates) ? inputs.childBirthDates.filter(d => d instanceof Date && !Number.isNaN(d.getTime())) : [];
  const latestBirth = pickLatestDate(childDates);

  if (latestBirth && latestBirth.getTime() <= now.getTime()) {
    const months = monthsBetween(latestBirth, now);
    if (months < 3) {
      return {
        stageId: "postpartum_0_3",
        label: "Early Postpartum (0–3 months)",
        motherhoodStage: "postpartum",
        confidence: "high",
        derivedFrom: "birth_date",
      };
    }
    if (months < 12) {
      return {
        stageId: "postpartum_3_12",
        label: "Extended Postpartum (3–12 months)",
        motherhoodStage: "postpartum",
        confidence: "high",
        derivedFrom: "birth_date",
      };
    }
    const toddler = months >= 12 && months < 36;
    return {
      stageId: "parenting",
      label: "Active Parenting & Child Development",
      motherhoodStage: toddler ? "toddler" : "child_0_5",
      confidence: "high",
      derivedFrom: "birth_date",
    };
  }

  if (due && due.getTime() >= now.getTime()) {
    const daysUntilDue = daysBetween(now, due);
    const weeksUntilDue = clamp(Math.ceil(daysUntilDue / 7), 0, 40);
    const weeks = clamp(40 - weeksUntilDue, 0, 42);
    const stageId: LifecycleStageId = weeks < 14 ? "first_trimester" : weeks < 28 ? "second_trimester" : "third_trimester";
    const label = stageId === "first_trimester" ? "First Trimester" : stageId === "second_trimester" ? "Second Trimester" : "Third Trimester";
    return {
      stageId,
      label,
      motherhoodStage: "pregnancy",
      confidence: "high",
      derivedFrom: "due_date",
    };
  }

  if (ga != null) {
    const weeks = clamp(Math.round(ga), 0, 42);
    const stageId: LifecycleStageId = weeks < 14 ? "first_trimester" : weeks < 28 ? "second_trimester" : "third_trimester";
    const label = stageId === "first_trimester" ? "First Trimester" : stageId === "second_trimester" ? "Second Trimester" : "Third Trimester";
    return {
      stageId,
      label,
      motherhoodStage: "pregnancy",
      confidence: weeks === 0 ? "low" : "medium",
      derivedFrom: "gestational_age",
    };
  }

  const objectiveText = objectives.join(" ").toLowerCase();
  if (/(conceive|fertility|trying\s+to\s+conceive|ttc|pre[-\s]?conception)/.test(objectiveText)) {
    return {
      stageId: "pre_conception",
      label: "Pre-Conception Planning",
      motherhoodStage: "pregnancy",
      confidence: "medium",
      derivedFrom: "objective",
    };
  }

  return {
    stageId: "second_trimester",
    label: "Pregnancy",
    motherhoodStage: "pregnancy",
    confidence: "low",
    derivedFrom: "fallback",
  };
}

export function lifecycleStageForCommerce(stageId: LifecycleStageId | string) {
  if (stageId === "postpartum_0_3") return "newborn";
  if (stageId === "postpartum_3_12") return "postpartum";
  if (stageId === "parenting") return "child_0_5";
  if (stageId === "pre_conception") return "pregnancy";
  return "pregnancy";
}
