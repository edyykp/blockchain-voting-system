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

export {};

declare global {
  interface Window {
    DocumentTouch?: any;
    ethereum: {
      isMetaMask?: boolean;
      isStatus?: boolean;
      host?: string;
      path?: string;
      sendAsync?: (
        request: { method: string; params?: Array<any> },
        callback: (error: any, response: any) => void,
      ) => void;
      send?: (
        request: { method: string; params?: Array<any> },
        callback: (error: any, response: any) => void,
      ) => void;
      request: (request: {
        method: string;
        params?: Array<any>;
      }) => Promise<any>;
    };
  }
}
