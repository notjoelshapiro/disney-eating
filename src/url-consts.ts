export const BASE_DINING_URL = "https://mousedining.com/v1/openings";

export const IFTTT_EVENT_NAME = "reservation_available";

export const IFTTT_OPENING_FAILURE_EVENT_NAME = "reservation_lookup_failure";

export const IFTTT_KEY = "felvPa6aBfh_DOZ6eoPgDj-8U5kVjNXoWh1lY11bWLM";

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
}

export const EateryIDs = {
  [EateryNames.Oga]: "138",
  [EateryNames.Lamplight]: "126",
  [EateryNames.CarthayLounge]: "145",
};
