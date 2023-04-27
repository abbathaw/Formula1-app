export const seasonListAPI = () => `f1/seasons.json?offset=55`; //offset 55 to start from 2005
export const seasonStandingsAPI = (year: string) => `f1/${year}/driverStandings.json`;
export const seasonRaceListAPI = (year: string) => `f1/${year}/results.json`;

export const BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://ergast.com/api/';
