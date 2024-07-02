import {ILanguage} from "./common";

export interface IUser {
    id: number
    login: string
    name: string
    surname?: string
    email: string
    phone?: string
    created_on?: string
    last_login?: string
    avatar?: string
    background?: string
    description?: string
    birthday?: string
    sex?: string
    city?: string
    status_message?: string
    status?: string
    interface_mode?: number
    nets?: IUserNet[]
    languages?: IUserLanguage[]
    contacts?: TShortUser[]
    seen?: string
    options?: IOptions
    images?: IImage[]
    video?: IVideo[]
}

export type TShortUser = Pick<IUser, 'id' | 'name' | 'surname' | 'login' | 'seen' | 'interface_mode' | 'options'>

export interface IOptions {
    [key: string]: string | number
}

export interface IImage {
    id: number
}

export interface IVideo {
    id: number
}

export interface INet {
    id: number
    name?: string
    icon?: string
}

export interface IUserNet {
    id: number
    net_id: number
    url: string
}

export interface IUserLanguage {
    id: number
    lang_id: number
}