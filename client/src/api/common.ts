import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {ICommonResponse, IResponse} from "../models/response";
import {baseQuery} from "./errorHandling";

interface IGetLanguagesResponse extends IResponse, ICommonResponse {}

export const commonAPI = createApi({
    reducerPath: 'commonAPI',
    baseQuery: baseQuery('/common'),
    endpoints: (builder) => ({
        getCommon: builder.query<ICommonResponse, void>({
            query: () => {
                return {
                    url: '/get_common',
                    method: 'POST',
                }
            },
            transformResponse: (response: IGetLanguagesResponse) => {
                if (!response.result || !response.languages) {
                    return {
                        languages: [],
                        nets: []
                    }
                }

                return {
                    languages: response.languages,
                    nets: response.nets
                }
            }
        })
    })
})