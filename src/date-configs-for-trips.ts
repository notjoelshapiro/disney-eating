import { DateAndPersonCountDataDefinition, generateLookupData, generateLookupsForEateryOnDates } from "./execution-tools";
import {
  lookupDataDefinition,
} from "./queryHelpers";
import { EateryNames } from "./url-consts";

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


// Spookdaz 2022
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

  // Food and wine 2023
const eateriesForFoodAndWine2023: EateryNames[] = [
  EateryNames.Oga,
  EateryNames.Lamplight,
  EateryNames.CarthayLounge,
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


const dataForFoodAndWine2023: DateAndPersonCountDataDefinition[] = [
  { date: "4-22-2023", count: FOUR_PERSON_COUNT },
  { date: "4-23-2023", count: TWO_PERSON_COUNT },
  { date: "4-24-2023", count: TWO_PERSON_COUNT},
  { date: "4-25-2023", count: TWO_PERSON_COUNT },
];

const lookupsToRunForFoodAndWine2023: lookupDataDefinition[] = [];
eateriesForFoodAndWine2023.forEach(
  eatery => {
    lookupsToRunForFoodAndWine2023.push(...generateLookupsForEateryOnDates(
      eatery,
      dataForFoodAndWine2023,
    ));
  })

  export const generatedEateriesForTrips: {[key: string]:lookupDataDefinition[] } = {
  'spring2002': lookupsToRunForSpring2002,
  'spookdays2022': lookupsToRunForSpookdays2022,
  'foodAndWine2023': lookupsToRunForFoodAndWine2023,
  } as const;


// Using a type so we can get autocomplete on the name of the trip.
  export type generatedEateriesForTripsDefinition = typeof generatedEateriesForTrips;
