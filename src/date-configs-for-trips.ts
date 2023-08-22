import { DateAndPersonCountDataDefinition, generateLookupData, generateLookupsForEateryAndDatePersonData } from "./execution-tools";
import { FOUR_PERSON_COUNT, generateFourPersonData, generateSixPersonData, generateTwoPersonData, TWO_PERSON_COUNT } from "./generate-date-and-person-data";
import { generateLookupDataForDatesAndEateries } from "./gernerate-lookup-data-for-dates-and-eateries";
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

const dataForSpookdays2022: DateAndPersonCountDataDefinition[] = [
  { date: "10-06-2022", count: TWO_PERSON_COUNT },
  { date: "10-07-2022", count: TWO_PERSON_COUNT },
  { date: "10-08-2022", count: FOUR_PERSON_COUNT },
  { date: "10-09-2022", count: TWO_PERSON_COUNT },
];

const lookupsToRunForSpookdays2022: lookupDataDefinition[] = [];
eateriesForSpookdays2022.forEach(
  eatery => {
    lookupsToRunForSpookdays2022.push(...generateLookupsForEateryAndDatePersonData(
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

const datesForFoodAndWine2023: DateAndPersonCountDataDefinition[] = [
  generateSixPersonData("4-22-2023"), // Updated on 3/29
  generateTwoPersonData("4-23-2023"),
  generateTwoPersonData("4-24-2023"),
  generateTwoPersonData("4-25-2023"),
];



const lookupsToRunForFoodAndWine2023: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
  datesForFoodAndWine2023,
  eateriesForFoodAndWine2023,
);

const eateriesForSpookdaz2023: EateryNames[] = [
  EateryNames.Oga,
  EateryNames.Lamplight,
  EateryNames.CarthayLounge,
  EateryNames.CarthayCircleRestaurant,
  EateryNames.TraderSams,
  EateryNames.BlueBayou,
  EateryNames.RiverBelleTerrace,
];

const datesForSpookdaz2023: DateAndPersonCountDataDefinition[] = [
  generateSixPersonData("10-14-2023"), 
  generateTwoPersonData("10-15-2023"),
  generateTwoPersonData("10-16-2023"),
  generateTwoPersonData("10-17-2023"),
];

const lookupsToRunForSpookdaz2023: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
  datesForSpookdaz2023,
  eateriesForSpookdaz2023,
);

// Add an entry to this object for each trip you want to run.
  export const generatedEateriesForTrips: {[key: string]:lookupDataDefinition[] } = {
  'spring2002': lookupsToRunForSpring2002,
  'spookdays2022': lookupsToRunForSpookdays2022,
  'foodAndWine2023': lookupsToRunForFoodAndWine2023,
  'spookdaz2023': lookupsToRunForSpookdaz2023,
  } as const;


// Using a type so we can get autocomplete on the name of the trip.
  export type generatedEateriesForTripsDefinition = typeof generatedEateriesForTrips;
