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
import {EateryNames, QUERY_DELAY_DURATION} from "./url-consts";

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
      await delayInMS(QUERY_DELAY_DURATION);
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

const lookupsToRunForSpring2002: lookupDataDefinition[] = [
  ...generateLookupsForSpring2002(EateryNames.Oga),
  ...generateLookupsForSpring2002(EateryNames.Lamplight),
  ...generateLookupsForSpring2002(EateryNames.CarthayLounge),
  ...generateLookupsForSpring2002(EateryNames.TraderSams),
];

type DateAndPersonCountDataDefinition = {date: string, count: number}

const generateLookupsForEateryOnDates = (
  eatery: EateryNames,
  datesAndCountsData: DateAndPersonCountDataDefinition[]
) => {
  const lookupDataForSpookdays2022: lookupDataDefinition[] = datesAndCountsData.map(({date, count}) => {
    return generateLookupData(date, eatery, count);
  });
  return lookupDataForSpookdays2022;
};

const eateriesForSpookdays2022: EateryNames[] = [
  EateryNames.Oga,
  EateryNames.Lamplight,
  // EateryNames.CarthayLounge,
  EateryNames.TraderSams,
  EateryNames.BlueBayou,
  EateryNames.BlueBayouFantasmic,
  EateryNames.RiverBelleTerraceFantasmic,
  // EateryNames.CafeOrleans, turned off nearly immediately on 9/14
  EateryNames.CarthayCircleRestaurant,
  // EateryNames.TomorrowlandSkylineLoungeExperience,
  // EateryNames.WineCountryTrattoria, turned off nearly immediately on 9/14
  // EateryNames.WorldOfColorDessertParty, turned off nearly immediately on 9/14
];

const TWO_PERSON_COUNT = 2;
const FOUR_PERSON_COUNT = 4;

const dataForSpookdays2022: DateAndPersonCountDataDefinition[] = [
  { date: "10-06-2022", count: TWO_PERSON_COUNT },
  { date: "10-07-2022", count: TWO_PERSON_COUNT },
  { date: "10-08-2022", count: FOUR_PERSON_COUNT },
  { date: "10-09-2022", count: TWO_PERSON_COUNT },
];

const lookupsToRunForSpookdays2022: lookupDataDefinition[] = [];
eateriesForSpookdays2022.forEach(
  eatery => {
    lookupsToRunForSpookdays2022.push(...generateLookupsForEateryOnDates(
      eatery,
      dataForSpookdays2022,
    ));
  })

start(lookupsToRunForSpookdays2022);
