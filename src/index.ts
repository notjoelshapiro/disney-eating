import {
  delayInMS,
  lookupDataDefinition,
  runQueryWithLookupData,
} from "./queryHelpers";
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

    if (lookups[i + 1]) {
      await delayInMS(2000);
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

const generateLookupsForSpring2002 = (eatery: EateryNames) => {
  return [
    generateLookupData("4-23-2022", eatery, 2),
    generateLookupData("4-24-2022", eatery, 2),
    generateLookupData("4-24-2022", eatery, 4),
    generateLookupData("4-25-2022", eatery, 2),
    generateLookupData("4-26-2022", eatery, 2),
  ];
};

const lookupsToRun: lookupDataDefinition[] = [
  ...generateLookupsForSpring2002(EateryNames.Oga),
  ...generateLookupsForSpring2002(EateryNames.Lamplight),
  ...generateLookupsForSpring2002(EateryNames.CarthayLounge),
];

start(lookupsToRun);
