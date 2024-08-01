import { exclusionDataDefinition } from "./generate-lookup-data-for-dates-and-eateries";
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
  datesAndCountsData: DateAndPersonCountDataDefinition[],
  exclusionData?: exclusionDataDefinition
): lookupDataDefinition[] => {
  const lookupData: lookupDataDefinition[] = [];

  const foundAndExcludedData: string[] = [];

  datesAndCountsData.forEach(({date, count}) => {
    const eateriesOnDate = exclusionData && exclusionData[date] ? exclusionData[date] : [];
    const excludeEateryOnDay = eateriesOnDate.includes(eatery)
    if (excludeEateryOnDay) {
      const exclusionString = `Excluding ${eatery} on ${date}`;
      console.log(exclusionString);
      foundAndExcludedData.push(exclusionString);
      return;
    }

    lookupData.push(generateLookupData(date, eatery, count));
  })

  console.log('foundAndExcludedData', foundAndExcludedData);
  console.log('lookupData', lookupData);
  // datesAndCountsData.map(({date, count}) => {
  //   if (exclusionData && exclusionData[date] && exclusionData[date].includes(eatery)) {
  //     return null
  //   }
  //   return generateLookupData(date, eatery, count);
  // });
  return lookupData;
};
