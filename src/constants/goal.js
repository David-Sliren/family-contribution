import { reduceGoal } from "@/utils/goals";
import { TOTAL_DISCOUNT } from "./totalDiscount";
import { WALLET } from "./user-contribution";

const RESUCE_WALLET = WALLET - TOTAL_DISCOUNT;

export const GOAL_MONTH = 1000000;

export const GOAL = reduceGoal(RESUCE_WALLET, GOAL_MONTH);
