export interface RaceType {
  circuitId: string;
  locality: string;
  country: string;
}

export interface DriverType {
  startingPosition: number;
  finalPosition: number;
  Driver: {
    permanentNumber: string;
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    name: string;
  };
}
