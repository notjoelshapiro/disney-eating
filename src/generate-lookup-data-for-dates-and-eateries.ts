import { DateAndPersonCountDataDefinition, generateLookupsForEateryAndDatePersonData } from "./execution-tools";
import { lookupDataDefinition } from "./queryHelpers";
import { EateryNames } from "./url-consts";

export type exclusionDataDefinition = {
  [dateString: string]: EateryNames[]
}

export const generateLookupDataForDatesAndEateries = (
  datesAndPersonCounts: DateAndPersonCountDataDefinition[],
  eateries: EateryNames[],
  exclusionData?: exclusionDataDefinition
) => {
const lookupDataForDatesAndEateries: lookupDataDefinition[] = [];
eateries.forEach(
  eatery => {
    return lookupDataForDatesAndEateries.push(...generateLookupsForEateryAndDatePersonData(
      eatery,
      datesAndPersonCounts,
      exclusionData
    ));
  })
return lookupDataForDatesAndEateries;
}