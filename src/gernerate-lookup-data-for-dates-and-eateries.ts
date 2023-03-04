import { DateAndPersonCountDataDefinition, generateLookupsForEateryAndDatePersonData } from "./execution-tools";
import { lookupDataDefinition } from "./queryHelpers";
import { EateryNames } from "./url-consts";

export const generateLookupDataForDatesAndEateries = (
  datesAndPersonCounts: DateAndPersonCountDataDefinition[],
  eateries: EateryNames[],
) => {
const lookupDataForDatesAndEateries: lookupDataDefinition[] = [];
eateries.forEach(
  eatery => {
    lookupDataForDatesAndEateries.push(...generateLookupsForEateryAndDatePersonData(
      eatery,
      datesAndPersonCounts,
    ));
  })
return lookupDataForDatesAndEateries;
}