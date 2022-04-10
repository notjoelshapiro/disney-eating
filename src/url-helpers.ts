//Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/354099;entityType=restaurant/table-service/2/2022-04-10/?mealPeriod=80000717
// exampleCheck.py file has a different script.

import {
  BASE_DINING_URL,
  EateryIDs,
  DestinationIDs,
  EateryNames,
} from "./url-consts";

// 2 person oga breakfast: Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/19268344;entityType=restaurant/table-service/2/2022-04-11/?mealPeriod=80000712
// 4 person oga breakfast: Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/19268344;entityType=restaurant/table-service/4/2022-04-11/?mealPeriod=80000712

// 2 person oga lunch: Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/19268344;entityType=restaurant/table-service/2/2022-04-11/?mealPeriod=80000717
// 4 person oga lunch: Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/19268344;entityType=restaurant/table-service/4/2022-04-11/?mealPeriod=80000717

// 2 person oga dinner: Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/19268344;entityType=restaurant/table-service/2/2022-04-11/?mealPeriod=80000714
// 4 person oga dinner: Request URL: https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B4F2F756F-699A-459E-AEBC-CF9935F9E758%7D/dlr/19268344;entityType=restaurant/table-service/4/2022-04-11/?mealPeriod=80000714

// 2 person OGA https://mousedining.com/v1/openings/2022-04-10%7C138%7C2%7C28
// 4 person OGA https://mousedining.com/v1/openings/2022-04-10%7C138%7C4%7C28

export type DatePartsDefinition = {
  year: string;
  month: string;
  day: string;
};

export const getDateInPartsFromTimestamp = (
  timestamp: number
): DatePartsDefinition => {
  var today = new Date(timestamp);
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = String(today.getFullYear());

  return {year: yyyy, month: mm, day: dd};
};

export const getTodaysDateInParts = (): DatePartsDefinition => {
  return getDateInPartsFromTimestamp(Date.now());
};

export const buildEncodedURLPart = (
  eatery: EateryNames,
  guestCount: number,
  destinationId: DestinationIDs = DestinationIDs.Disneyland
): string => {
  return encodeURI(`|${EateryIDs[eatery]}|${guestCount}|${destinationId}`);
};

export const generateOgaURLWithDate = (
  dateParts: DatePartsDefinition,
  eatery: EateryNames,
  guestCount: number
) => {
  const {year, month, day} = dateParts;

  // const baseURL = 'https://mousedining.com/v1/openings/2022-04-23%7C138%7C2%7C28'
  // encoded bit (%7C138%7C2%7C28) = '|138|2|28' (2 is people count)

  const encodedURLPart = buildEncodedURLPart(eatery, guestCount);
  const builtURL = `${BASE_DINING_URL}/${year}-${month}-${day}${encodedURLPart}`;

  return builtURL;
};
