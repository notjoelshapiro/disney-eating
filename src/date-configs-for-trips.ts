import { DateAndPersonCountDataDefinition, generateLookupData, generateLookupsForEateryAndDatePersonData } from "./execution-tools";
import { FOUR_PERSON_COUNT, generateFourPersonData, generateSixPersonData, generateTwoPersonData, TWO_PERSON_COUNT } from "./generate-date-and-person-data";
import { generateLookupDataForDatesAndEateries } from "./generate-lookup-data-for-dates-and-eateries";
import {
  lookupDataDefinition,
} from "./queryHelpers";
import { EateryNames } from "./url-consts";

// const generateLookupsForSpring2002 = (eatery: EateryNames) => {
//   return [
//     generateLookupData("4-23-2022", eatery, 2),
//     generateLookupData("4-24-2022", eatery, 2),
//     generateLookupData("4-24-2022", eatery, 4),
//     generateLookupData("4-25-2022", eatery, 2),
//     generateLookupData("4-26-2022", eatery, 2),
//   ];
// };

// const lookupsToRunForSpring2002: lookupDataDefinition[] = [
//   ...generateLookupsForSpring2002(EateryNames.Oga),
//   ...generateLookupsForSpring2002(EateryNames.Lamplight),
//   ...generateLookupsForSpring2002(EateryNames.CarthayLounge),
//   ...generateLookupsForSpring2002(EateryNames.TraderSams),
// ];


// // Spookdaz 2022
// const eateriesForSpookdays2022: EateryNames[] = [
//   EateryNames.Oga,
//   EateryNames.Lamplight,
//   // EateryNames.CarthayLounge,
//   EateryNames.TraderSams,
//   EateryNames.BlueBayou,
//   EateryNames.BlueBayouFantasmic,
//   EateryNames.RiverBelleTerraceFantasmic,
//   // EateryNames.CafeOrleans, turned off nearly immediately on 9/14
//   EateryNames.CarthayCircleRestaurant,
//   // EateryNames.TomorrowlandSkylineLoungeExperience,
//   // EateryNames.WineCountryTrattoria, turned off nearly immediately on 9/14
//   // EateryNames.WorldOfColorDessertParty, turned off nearly immediately on 9/14
// ];

// const dataForSpookdays2022: DateAndPersonCountDataDefinition[] = [
//   { date: "10-06-2022", count: TWO_PERSON_COUNT },
//   { date: "10-07-2022", count: TWO_PERSON_COUNT },
//   { date: "10-08-2022", count: FOUR_PERSON_COUNT },
//   { date: "10-09-2022", count: TWO_PERSON_COUNT },
// ];

// // This one is now known borked because of refactors of underlying code and not wanting to delete history.
// const lookupsToRunForSpookdays2022: lookupDataDefinition[] = [];
// // eateriesForSpookdays2022.forEach(
// //   eatery => {
// //     lookupsToRunForSpookdays2022.push(...generateLookupsForEateryAndDatePersonData(
// //       eatery,
// //       dataForSpookdays2022,
// //     ));
// //   });

//   // Food and wine 2023
// const eateriesForFoodAndWine2023: EateryNames[] = [
//   EateryNames.Oga,
//   EateryNames.Lamplight,
//   EateryNames.CarthayLounge,
//   EateryNames.TraderSams,
//   EateryNames.BlueBayou,
//   EateryNames.BlueBayouFantasmic,
//   EateryNames.RiverBelleTerraceFantasmic,
//   // EateryNames.CafeOrleans, turned off nearly immediately on 9/14
//   EateryNames.CarthayCircleRestaurant,
//   // EateryNames.TomorrowlandSkylineLoungeExperience,
//   // EateryNames.WineCountryTrattoria, turned off nearly immediately on 9/14
//   // EateryNames.WorldOfColorDessertParty, turned off nearly immediately on 9/14
// ];

// const datesForFoodAndWine2023: DateAndPersonCountDataDefinition[] = [
//   generateSixPersonData("4-22-2023"), // Updated on 3/29
//   generateTwoPersonData("4-23-2023"),
//   generateTwoPersonData("4-24-2023"),
//   generateTwoPersonData("4-25-2023"),
// ];



// const lookupsToRunForFoodAndWine2023: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
//   datesForFoodAndWine2023,
//   eateriesForFoodAndWine2023,
// );

// const eateriesForSpookdaz2023: EateryNames[] = [
//   EateryNames.Oga,
//   EateryNames.Lamplight,
//   // EateryNames.CarthayLounge,
//   // EateryNames.CarthayCircleRestaurant,
//   EateryNames.TraderSams,
//   EateryNames.BlueBayou,
//   // EateryNames.RiverBelleTerrace, turned off almost immediately
// ];

// const datesForSpookdaz2023: DateAndPersonCountDataDefinition[] = [
//   generateTwoPersonData("10-14-2023"),
//   generateFourPersonData("10-15-2023"),
//   generateTwoPersonData("10-16-2023"),
//   generateFourPersonData("10-17-2023"),
//   generateTwoPersonData("10-18-2023"), // Added for Juice and Natalie
//   generateTwoPersonData("10-19-2023"), // Added for Juice and Natalie
// ];

// const lookupsToRunForSpookdaz2023: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
//   datesForSpookdaz2023,
//   eateriesForSpookdaz2023,
// );

// const eateriesForXMas2023: EateryNames[] = [
//   EateryNames.Oga,
//   EateryNames.Lamplight,
//   EateryNames.CarthayLounge,
//   EateryNames.CarthayCircleRestaurant,
//   EateryNames.TraderSams,
//   EateryNames.BlueBayou,
//   // EateryNames.RiverBelleTerrace, turned off almost immediately
// ];

// const datesForXMas2023: DateAndPersonCountDataDefinition[] = [
//   generateTwoPersonData("1-04-2024"),
//   generateTwoPersonData("1-05-2024"),
//   generateFourPersonData("1-06-2024"),
//   generateTwoPersonData("1-07-2024"),
// ];

// const lookupsToRunForXMas2023: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
//   datesForXMas2023,
//   eateriesForXMas2023,
// );

// // Food and wine 2024
// const eateriesForFoodAndWine2024: EateryNames[] = [
//   EateryNames.Oga,
//   EateryNames.Lamplight,
//   EateryNames.CarthayLounge,
//   EateryNames.TraderSams,
//   EateryNames.BlueBayou,
//   EateryNames.CarthayCircleRestaurant,
// ];

// const datesForFoodAndWine2024: DateAndPersonCountDataDefinition[] = [
//   generateTwoPersonData("3-08-2024"),
//   generateFourPersonData("3-09-2024"),
//   generateTwoPersonData("3-10-2024"),
// ];

// const lookupsToRunForFoodAndWine2024: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
//   datesForFoodAndWine2024,
//   eateriesForFoodAndWine2024,
// );

// Spookdaz 2024
const eateriesForSpookdaz2024: EateryNames[] = [
  // EateryNames.Oga,
  EateryNames.Lamplight,
  EateryNames.CarthayLounge,
  EateryNames.TraderSams,
  EateryNames.BlueBayou,
  EateryNames.CarthayCircleRestaurant,
];

const datesForSpookdaz2024: DateAndPersonCountDataDefinition[] = [
  generateTwoPersonData("8-22-2024"),
  generateTwoPersonData("8-23-2024"),
  generateFourPersonData("8-24-2024"),
  generateTwoPersonData("8-25-2024"),
  generateTwoPersonData("8-26-2024"),
];

const lookupsToRunForSpookdaz2024: lookupDataDefinition[] = generateLookupDataForDatesAndEateries(
  datesForSpookdaz2024,
  eateriesForSpookdaz2024,
  {
    ["8-24-2024"]: [
      EateryNames.CarthayCircleRestaurant,
      EateryNames.CarthayLounge
    ],
  }
);

// Add an entry to this object for each trip you want to run.
export const generatedEateriesForTrips: {[key: string]:lookupDataDefinition[] } = {
  // 'spring2002': lookupsToRunForSpring2002,
  // 'spookdaz2022': lookupsToRunForSpookdays2022,
  // 'foodAndWine2023': lookupsToRunForFoodAndWine2023,
  // 'spookdaz2023': lookupsToRunForSpookdaz2023,
  // 'xmas2023': lookupsToRunForXMas2023,
  // 'foodAndWine2024': lookupsToRunForFoodAndWine2024,
  'spookdaz2024': lookupsToRunForSpookdaz2024,
  } as const;


// Using a type so we can get autocomplete on the name of the trip.
  export type generatedEateriesForTripsDefinition = typeof generatedEateriesForTrips;
