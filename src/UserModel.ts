export interface Name {
    first: string;
    last: string;
    title: string;
}

export interface Picture {
    thumbnail: string;
    medium: string;
    large: string;
}

export interface Login {
    uuid: string;
    username: string;
}

export interface Street {
    number: number;
    name: string;
}

export interface Coordinates {
    latitude: string;
    longitude: string;
}

export interface Timezone {
    offset: string;
    description: string;
}

export interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
}

export interface UserInfo {
    name: Name;  
    login: Login;
    email: string;
    phone: string;
    gender: string;
    picture: Picture;
}
