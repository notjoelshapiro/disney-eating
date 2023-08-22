import { generatedEateriesForTrips, generatedEateriesForTripsDefinition } from "./date-configs-for-trips";
import { start } from "./execution-tools";


// Using a type so we can get autocomplete on the name of the trip.
const generatedEateriesForCurrTrip: generatedEateriesForTripsDefinition = generatedEateriesForTrips;

start(generatedEateriesForCurrTrip.spookdaz2023);
