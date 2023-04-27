interface PaginatedResponse {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
}

// Response interface for api/f1/seasons.json (all seasons, list of years)
export interface F1SeasonsResponse {
  MRData: MRDataSeasons;
}

// Response interface for /api/f1/{year}/driverStandings.json (drivers winners and positions for whole season)
export interface F1DriverStandingsResponse {
  MRData: MRDataDriverStandings;
}

// Response interface for api/f1/{year}/{round}/results.json (list of all races in a season plus driver standings in a particular race in a specific season)
export interface F1RaceResultsResponse {
  MRData: MRDataRaceResults;
}

export interface ReducedRaceResults {
  [round: string]: {
    results: RaceResult[];
    race: Omit<Race, 'Results'>;
  };
}

/**
 * Season Information
 */
interface MRDataSeasons extends PaginatedResponse {
  SeasonTable: SeasonTable;
}

interface SeasonTable {
  Seasons: Season[];
}

export interface Season {
  season: string;
  url: string;
}

/**
 * Driver information
 */

interface MRDataDriverStandings extends PaginatedResponse {
  StandingsTable: StandingsTable;
}

interface StandingsTable {
  season: string;
  StandingsLists: StandingList[];
}

export interface StandingList {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

interface Driver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

/**
 * Individual Race Information
 */

interface MRDataRaceResults extends PaginatedResponse {
  RaceTable: {
    season: string;
    round: string;
    Races: Race[];
  };
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results?: RaceResult[];
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: {
    millis: string;
    time: string;
  };
  FastestLap: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
}
