export interface Vehicle{
    rent: (duration: number) => number;
    drive: (distance: number) => void;
    returnVehicle: () => void;
    printStatus: () => void;
}

export * from './vehicle.js';