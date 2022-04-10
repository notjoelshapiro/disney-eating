import axios from "axios";
import {lookupDataDefinition, OpeningDefinition} from "./queryHelpers";
import {
  IFTTT_EVENT_NAME,
  IFTTT_KEY,
  IFTTT_OPENING_FAILURE_EVENT_NAME,
} from "./url-consts";

export const hasAvailableTimes = (openings: OpeningDefinition[]) => {
  return openings.length > 0;
};

export const triggerIfttt = async (
  {
    value1,
    value2,
    value3,
  }: {
    value1: string | number;
    value2: string | number;
    value3: string | number;
  },
  eventName = IFTTT_EVENT_NAME
) => {
  // https://maker.ifttt.com/trigger/{event}/with/key/{my_key}?value1=Alex&value2=Helen
  const url = `https://maker.ifttt.com/trigger/${eventName}/with/key/${IFTTT_KEY}`;
  const data = {
    value1,
    value2,
    value3,
  };

  return axios.post(url, data);
};

export const notifyIftttForFailure = async (
  lookupData: lookupDataDefinition
) => {
  await triggerIfttt(
    {
      value1: lookupData.eatery,
      value2: lookupData.dateString,
      value3: lookupData.guestCount,
    },
    IFTTT_OPENING_FAILURE_EVENT_NAME
  );
  return true;
};

export const notifyIftttForOpenings = async (openings: OpeningDefinition[]) => {
  // iterate through openingTimes and console log the value
  for (let i = 0; i < openings.length; i++) {
    const opening = openings[i];
    await triggerIfttt({
      value1: opening.eatery,
      value2: opening.mealTime,
      value3: opening.guestCount,
    });
  }

  return true;
};
