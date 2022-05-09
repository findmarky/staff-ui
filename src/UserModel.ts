export interface UserName {
    first: string;
    last: string;
    title: string;
}

export interface UserPicture {
    thumbnail: string;
    medium: string;
    large: string;
}

export interface Login {
    uuid: string;
    username: string;
}

export interface UserInfo {
    name: UserName;
    login: Login;
    email: string;
    phone: string;
    gender: string;
    picture: UserPicture;
}
