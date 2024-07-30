import axios from "axios";
import {generateEateryURL, lookupDataDefinition, OpeningDefinition} from "./queryHelpers";
import {
  IFTTT_EVENT_NAME,
  IFTTT_KEY,
  IFTTT_KEY_FOR_KATIE,
  IFTTT_KEY_FOR_NATALIE,
  IFTTT_OPENING_FAILURE_EVENT_NAME,
} from "./url-consts";
import { PushoverWrangler } from "./PushoverWrangler";
import { PUSHOVER_TOKEN, PUSHOVER_USER } from "./pushover-consts";

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
  const joelURL = `https://maker.ifttt.com/trigger/${eventName}/with/key/${IFTTT_KEY}`;
  const data = {
    value1,
    value2,
    value3,
  };

  return axios.post(joelURL, data).then(() => {
    const katieURL = `https://maker.ifttt.com/trigger/${eventName}/with/key/${IFTTT_KEY_FOR_KATIE}`;
    return axios.post(katieURL, data);//.then(() => {
    //   const natalieURL = `https://maker.ifttt.com/trigger/${eventName}/with/key/${IFTTT_KEY_FOR_NATALIE}`;
    //   return axios.post(natalieURL, data);
    // });
  });
};

export const notifyIftttForFailure = async (
  lookupData: lookupDataDefinition
) => {
  // await triggerIfttt(
  //   {
  //     value1: lookupData.eatery,
  //     value2: lookupData.dateString,
  //     value3: lookupData.guestCount,
  //   },
  //   IFTTT_OPENING_FAILURE_EVENT_NAME
  // );

  const wrangler = new PushoverWrangler(
    PUSHOVER_TOKEN, PUSHOVER_USER
  );
  await wrangler.notifyError(
    IFTTT_OPENING_FAILURE_EVENT_NAME,
    lookupData
  );

  return true;
};

export const notifyIftttForOpenings = async (openings: OpeningDefinition[]) => {
  // iterate through openingTimes and console log the value
  const iftttPromises: Promise<any>[] = [];

  const imageURL = 'https://imgur.com/qPwOcIE.jpg';

  let base64Image: null | string = null;
  try {
    const response = await axios.get(imageURL, { responseType: 'arraybuffer' });
    base64Image = Buffer.from(response.data, 'binary').toString('base64');
  } catch (err) {
    console.error('Error fetching image', err);
    throw err;
  }

  for (let i = 0; i < openings.length; i++) {
    const opening = openings[i];

    // needs to be in the form of 20-10-15
    console.log(`Available time was found for: ${opening.eatery} on ${opening.dateString} at ${opening.mealTime} for ${opening.guestCount} guests`);

    const notifString = `<b>${opening.eatery}</b> (${opening.dateString} - ${opening.mealTime}) for <b><i>${opening.guestCount}</b></i>!`
    // iftttPromises.push(
    //   triggerIfttt({
    //     value1: notifString,
    //     value2: opening.dateString,
    //     value3: opening.guestCount,
    //   })
    // );
    const wrangler = new PushoverWrangler(
      PUSHOVER_TOKEN, PUSHOVER_USER
    );

    iftttPromises.push(wrangler.notifyMealAvailable(
      `Reservation Available: ${notifString}`,
      opening.eatery,
      opening.mealTime,
      generateEateryURL(opening.guestCount, opening.dateString),
      base64Image,
      'image/jpeg'
    ));
  }

  return Promise.all(iftttPromises).then(() => {
    return true;
  });
};
