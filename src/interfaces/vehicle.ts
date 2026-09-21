export interface VehicleI{
    readonly type: string;
    readonly name: string;
    readonly isRented: boolean;
    
    rent(duration: number): number;
    drive(distance: number): void;
    returnVehicle(): void;
    printStatus(): void;
}

export * from './vehicle.js';