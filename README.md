## To configure
* Update var `generatedEateriesForTrips` in `date-configs-for-trips.ts` with info for the next trip.
* Then update `index.ts` with the right trip from the var.
## To run
* hit up `crontab -e`
* make sure `ts-node` is globally installed.
* set PATH and cron schedule.
* make sure that IFTTT is on and logged in. it likes to die.
```
PATH=/Users/joelshapiro/.nvm/versions/node/v16.17.0/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/Users/joelshapiro/.nvm/versions/node/v16.17.0/bin

*/10 * * * * ts-node /Users/joelshapiro/Code/disney-eating/src/index.ts
```
