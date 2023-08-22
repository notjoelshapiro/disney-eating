export const BASE_DINING_URL = "https://mousedining.com/v1/openings";

export const IFTTT_EVENT_NAME = "reservation_available";

export const IFTTT_OPENING_FAILURE_EVENT_NAME = "reservation_lookup_failure";

export const IFTTT_KEY = "felvPa6aBfh_DOZ6eoPgDj-8U5kVjNXoWh1lY11bWLM";

export const IFTTT_KEY_FOR_KATIE = "chNWCbjcW9MN59AzhWUCnu";

export const IFTTT_KEY_FOR_NATALIE = 'cZT_syP03_BSOJC1hcYxml'

export const QUERY_DELAY_DURATION = 1400;

export type IFTTTEventWebhookDefinition = {
  value1: string; // eatery
  value2: string; // mealtime
  value3: number; // guestCount
};

export type LocationDefinition = {
  locationID: string;
  locationName: string;
  locationSlug: string;
};

export enum LocationSlugs {
  Disneyland = "disneyland",
  DisneyWorld = "disneyworld",
}

export enum DestinationIDs {
  Disneyland = "2",
  Disneyworld = "1",
}

export enum EateryNames {
  Oga = "Oga's Canteen",
  Lamplight = "Lamplight Lounge",
  CarthayLounge = "Carthay Circle Lounge",
  TraderSams = "Trader Sams",
  BlueBayou = "Blue Bayou",
  BlueBayouFantasmic = "Blue Bayou (Fantasmic)",
  RiverBelleTerraceFantasmic = "River Belle Terrace (Fantasmic)",
  CafeOrleans = "Cafe Orleans",
  CarthayCircleRestaurant = "Carthay Circle Restaurant",
  TomorrowlandSkylineLoungeExperience = "Tomorrowland Skyline Lounge Experience",
  WineCountryTrattoria = "Wine Country Trattoria",
  WorldOfColorDessertParty = "World of Color Dessert Party",
  RiverBelleTerrace = "River Belle Terrace",
}

export const EateryIDs = {
  [EateryNames.Oga]: "138",
  [EateryNames.Lamplight]: "126",
  [EateryNames.CarthayLounge]: "145",
  [EateryNames.TraderSams]: "151",
  [EateryNames.BlueBayou]: "99",
  [EateryNames.BlueBayouFantasmic]: "180",
  [EateryNames.RiverBelleTerraceFantasmic]: "90",
  [EateryNames.CafeOrleans]: "100",
  [EateryNames.CarthayCircleRestaurant]: "101",
  [EateryNames.TomorrowlandSkylineLoungeExperience]: "170",
  [EateryNames.WineCountryTrattoria]: "110",
  [EateryNames.WorldOfColorDessertParty]: "175",
  [EateryNames.RiverBelleTerrace]: "98",
};
