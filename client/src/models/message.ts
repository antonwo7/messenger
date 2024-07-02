import {IUser, TShortUser} from "./user";

export interface IPureMessage {
    id: number
    text: string | null
    from_user_id: number
    to_user_id: number
    created_on: string
    attachment_id?: number | null
}

export interface IMessage extends IPureMessage {
    user: TShortUser
}

export interface IChat {
    user: TShortUser | null
    messages: IMessage[]
}