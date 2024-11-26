export interface Series {
  id: string;
  title: string;
}

export interface FredResponse {
  seriess: Series[];
}

export interface Observations {
  date: string;
  value: string;
}

export interface FredObservations {
  observations: Observations[];
}
