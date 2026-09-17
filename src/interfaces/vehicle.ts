export interface Vehicle{
    rent: (duration: number) => number;
    drive: (distance: number) => void;
    return: () => void;
    printStatus: () => void;
}

export * from './vehicle';