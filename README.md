
## Tech task introduction

This is the tech task done for Stuart interview process.
This task was done in under 4 hours, to deliver results in the asked time box.
This task includes the courier API, where you can access insert, delete, update methods, as well as inspect courier data and find needed couriers with some capacity.
This task is completed using TypeScript.

### Project dependencies
[MongoDB](https://www.mongodb.com/download-center)
[Node.JS (personally used v14)](https://nodejs.org/en/)

### Install project dependencies

To install the dependencies, write the command

```sh
npm install
```

## Available Scripts

+ `clean` - remove coverage data, Jest cache and transpiled files,
+ `build` - transpile TypeScript to ES6,
+ `build:watch` - interactive watch mode to automatically transpile source files,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `dev` - to start the API

## Code structure
Code is divided into some segments, to deliver separation of concerns and enforce good coding practices.
- Controllers - these only contains parameter validation and calls to services.
- Helpers - these contains helper functions, which are reusable and otherwise not fit to be in services.
- Models - these contains collection models and how data is stored in the database.
- Routes - these contains API routes for specific functionality (only couriers in this instance)
- Services - these contains database logic and some validation of logic flow.

## Testing
Helpers and Services are covered with some simple unit tests, to ensure that certain methods are called under some specific conditions. Jest was used to create those tests. Test folders are found next to the files that are being tested.

## Courier model
Courier is comprised of three different fields, which are stored in MongoDB
- ID - which is a unique identifier of the courier.
- maxCapacity - which stores how many litres maximum the courier can actually take.
- currentCapacity - which stores how many litres the courier can take right now.

## API calls
API currently has five different endpoints to call:
```sh
curl http://localhost:3000/api/courier/
```
Returns all couriers in the collection. No filtering is done in this API.

```sh
curl --header "Content-Type: application/json"   --request POST   --data '{"max_capacity":45}'   http://localhost:3000/api/courier
```
This endpoint is for inserting variables. It only contains max_capacity as a variable and currentCapacity is stored to the same value.

```sh
curl --header "Content-Type: application/json"   --request GET   --data '{"capacity_required":16}'   http://localhost:3000/api/courier/lookup
```
This endpoint is for finding couriers with current available capacity, which must be equal or greater than the value user puts into capacity_required field.

```sh
curl --header "Content-Type: application/json"   --request PUT   --data '{"current_capacity":20, "max_capacity":45}'   http://localhost:3000/api/courier/5ec75f118d5e350e44cd67d1
```
This endpoint is for updating couriers values. Both current_capacity and max_capacity has to be passed in order for this to work.

```sh
curl --header "Content-Type: application/json"   --request DELETE   http://localhost:3000/api/courier/5ec75f118d5e350e44cd67d1
```

This endpoint is for deleting the courier. The id of the courier has to be passed for this operation.
