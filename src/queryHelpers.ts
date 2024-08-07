import axios from "axios";
import {EateryNames} from "./url-consts";
import {
  generateOgaURLWithDate,
  getDateInPartsFromTimestamp,
} from "./url-helpers";

export enum OpeningMealTimesDefinition {
  Breakfast = "breakfast",
  Lunch = "lunch",
  Dinner = "dinner",
}

// Optional so we can reuse this with some flexibility.
export type OpeningDefinition = {
  guestCount: number;
  eatery: EateryNames;
  mealTime: OpeningMealTimesDefinition;
  dateString: string;
};

export type QueryErrorDefinition = string | null;

export type QueryResultDefinition = {
  error: QueryErrorDefinition;
  wasSuccessful: boolean;
  openings: OpeningDefinition[];
};

export const runQuery = async (
  url: string,
  eatery: EateryNames,
  guestCount: number,
  dateString: string
): Promise<QueryResultDefinition> => {
  /*
    result:

    [
      {
        ID: "2022-04-10|138|2",
        Block: "91",
        Date: "2022-04-10",
        DayName: "Sunday",
        DayOfMonth: "10",
        MonthName: "April",
        PartySize: "2",
        MealOpenings: {Breakfast: "0", Lunch: "0", Dinner: "0"},
        MealTimes: {
          Breakfast: {Start: "0800", End: "1000"},
          Lunch: {Start: "1005", End: "1555"},
          Dinner: {Start: "1605", End: "2320"},
        },
      },
      {
        ID: "2022-04-11|138|2",
        Block: "92",
        Date: "2022-04-11",
        DayName: "Monday",
        DayOfMonth: "11",
        MonthName: "April",
        PartySize: "2",
        MealOpenings: {Breakfast: "0", Lunch: "0", Dinner: "0"},
        MealTimes: {
          Breakfast: {Start: "0800", End: "1000"},
          Lunch: {Start: "1005", End: "1555"},
          Dinner: {Start: "1605", End: "2320"},
        },
      },
    ];
  */
  let error: QueryErrorDefinition = null;

  const errorCallback = (error: any, url: string) => {
    error = `Error on url ${url} with message of: ${error.message}`;
  };

  let openings: OpeningDefinition[] = [];

  const generateOpeningResultObject = (
    availableMealtime: OpeningMealTimesDefinition,
    dateStringFromResponse: string
  ): OpeningDefinition => {
    return {
      guestCount,
      mealTime: availableMealtime,
      eatery,
      dateString: dateStringFromResponse,
    };
  };

  const hasOpenTimeForSlot = (slotCount: any) => {
    return slotCount && parseInt(slotCount, 10) > 0;
  };

  await axios
    .get(url)
    .then((res) => {
      try {
        const resDataForDate = res.data[0];
        // console.log("resDataForDate.Date", resDataForDate.Date);

        const resultOpenings = resDataForDate.MealOpenings;
        if (hasOpenTimeForSlot(resultOpenings.Breakfast)) {
          openings.push(
            generateOpeningResultObject(OpeningMealTimesDefinition.Breakfast, resDataForDate.Date)
          );
        }
        if (hasOpenTimeForSlot(resultOpenings.Lunch)) {
          openings.push(
            generateOpeningResultObject(OpeningMealTimesDefinition.Lunch, resDataForDate.Date)
          );
        }
        if (hasOpenTimeForSlot(resultOpenings.Dinner)) {
          openings.push(
            generateOpeningResultObject(OpeningMealTimesDefinition.Dinner, resDataForDate.Date)
          );
        }
      } catch (err: any) {
        errorCallback(err, url);
      }
    })
    .catch((err) => {
      errorCallback(err, url);
    });

  return {
    wasSuccessful: error === null,
    error,
    openings,
  };
};

// magic number pushes to 8:20am for that day.
// dateString needs to be in the form of '4-25-2022'
export const getTimestampForDateString = (dateString: string): number => {
  return new Date(dateString).getTime() + 500000;
};

// https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
export const delayInMS = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export type lookupDataDefinition = {
  dateString: string;
  eatery: EateryNames;
  guestCount: number;
};

export const runQueryWithLookupData = async ({
  dateString,
  eatery,
  guestCount,
}: lookupDataDefinition): Promise<QueryResultDefinition> => {
  const tempTimestamp = getTimestampForDateString(dateString);
  const generatedURLForEatery = generateOgaURLWithDate(
    // getTodaysDateInParts(),
    getDateInPartsFromTimestamp(tempTimestamp),
    eatery,
    guestCount
  );

  return runQuery(generatedURLForEatery, eatery, guestCount, dateString);
};

export const generateEateryURL = (
  guestCount: number,
  dateString: string,
): string => {
  return `https://disneyland.disney.go.com/dine-res/search-results/${guestCount}/${dateString}/allDay`

}
