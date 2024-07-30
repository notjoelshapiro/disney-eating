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
import {
  EateryNames,
  QUERY_DELAY_DURATION
} from "./url-consts";

export type DateAndPersonCountDataDefinition = {date: string, count: number}

export const start = async (lookups: lookupDataDefinition[]) => {

  let foundReservation = false;
  for (let i = 0; i < lookups.length; i++) {
    const currLookup = lookups[i];
    const { wasSuccessful, openings, error } = await runQueryWithLookupData(currLookup);
    if (!wasSuccessful) {
      console.log(`OGA query failed with error: ${error}`);
      notifyIftttForFailure(currLookup);
      return;
    }

    if (hasAvailableTimes(openings)) {
      notifyIftttForOpenings(openings);
      foundReservation = true;
    }

    if (lookups[i + 1]) {
      await delayInMS(QUERY_DELAY_DURATION);
    }
  }

  if (!foundReservation) {
    console.log(`No reservations found when searching at ${new Date().toLocaleString()}.`);
  }
  return true;
};

export const generateLookupData = (
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

export const generateLookupsForEateryAndDatePersonData = (
  eatery: EateryNames,
  datesAndCountsData: DateAndPersonCountDataDefinition[]
) => {
  const lookupDataForSpookdays2022: lookupDataDefinition[] = datesAndCountsData.map(({date, count}) => {
    return generateLookupData(date, eatery, count);
  });
  return lookupDataForSpookdays2022;
};
