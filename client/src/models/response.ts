import {ILanguage} from "./common";
import {INet} from "./user";

export interface IResponse {
    result: boolean
    log?: string
}

export interface ICommonResponse {
    languages: ILanguage[]
    nets: INet[]
}