import {lookupDataDefinition, runQueryWithLookupData} from "./queryHelpers";
import {
  hasAvailableTimes,
  notifyIftttForFailure,
  notifyIftttForOpenings,
} from "./result-helpers";
import {EateryNames} from "./url-consts";

const start = async (lookups: lookupDataDefinition[]) => {
  for (let i = 0; i < lookups.length; i++) {
    const currLookup = lookups[i];
    const lookupResult = await runQueryWithLookupData(currLookup);
    if (!lookupResult.wasSuccessful) {
      console.log(`OGA query failed with error: ${lookupResult.error}`);
      notifyIftttForFailure(currLookup);
      return;
    }

    if (hasAvailableTimes(lookupResult.openings)) {
      console.log("Available time was found!");
      notifyIftttForOpenings(lookupResult.openings);
    }
  }
  return true;
};

const generateLookupData = (
  dateString: string,
  eatery: EateryNames,
  guestCount: number
): lookupDataDefinition => {
  return {
    dateString,
    eatery,
    guestCount,
  };
};

const lookupsToRun: lookupDataDefinition[] = [
  generateLookupData("4-25-2022", EateryNames.Oga, 2),
];

start(lookupsToRun);
