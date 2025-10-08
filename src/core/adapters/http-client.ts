import { env } from "./env";
import axios from "axios";

export class HTTPClient {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = env.BASE_URL!!;
    }

    public async get(url: string, params?: any, token?: string) {
        try {
            let finalUrl = `${this.baseURL}${url}`;
            let queryParams = undefined;

            if (typeof params === "string") {
                finalUrl += `/${params}`;
            } 
            else if (typeof params === "object" && params !== null) {
                queryParams = params;
            }

            const response = await axios.get(finalUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: queryParams
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }

    public async post(url: string, params?: any, token?: string) {
        try {
            const response = await axios.post(this.baseURL + url, params, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }

    public async put(url: string, params?: any, token?: string) {
        try {
            const response = await axios.put(this.baseURL + url, params, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }

    public async patch(url: string, params?: any, token?: string) {
        try {
            const response = await axios.patch(this.baseURL + url, params, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }

    public async delete(url: string, params?: any, token?: string) {
        try {
            const response = await axios.delete(this.baseURL + url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: params,
            });
            
            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }
    
};
