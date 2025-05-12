export interface Phone {
    deviceName: string;
    brand: string;
    colourOptions: ColourOption[];
    dataOptions: DataOption[];
    pricing: {
        monthly: number;
    };
    stock: number;
    isFiveG: boolean;
}

export interface ColourOption {
    name: string;
    hex: string;
}

export interface DataOption {
    name: string;
    price: number;
}

export interface BasketItem {
    deviceName: string;
    colour: ColourOption;
    storage: DataOption;
    quantity: number;
}