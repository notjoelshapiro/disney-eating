import { DateAndPersonCountDataDefinition } from "./execution-tools";


export const TWO_PERSON_COUNT = 2;
export const FOUR_PERSON_COUNT = 4;
export const SIX_PERSON_COUNT = 6;

export type dateStringDefinition = `${number}-${number}-${number}`;

export const generateTwoPersonData = (dateString: dateStringDefinition): DateAndPersonCountDataDefinition => {
  return { date: dateString, count: TWO_PERSON_COUNT }
};

export const generateFourPersonData = (dateString: dateStringDefinition): DateAndPersonCountDataDefinition => {
  return { date: dateString, count: FOUR_PERSON_COUNT }
};

export const generateSixPersonData = (dateString: dateStringDefinition): DateAndPersonCountDataDefinition => {
  return { date: dateString, count: SIX_PERSON_COUNT }
}; 