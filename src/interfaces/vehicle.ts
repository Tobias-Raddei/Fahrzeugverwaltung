export interface Vehicle{
    rent: (duration: number) => number;
    drive: (distance: number) => void;
    returnVehicle: () => void;
    printStatus: () => void;
    getName: () => string;
    getStatus: () => boolean;
}

export * from './vehicle.js';