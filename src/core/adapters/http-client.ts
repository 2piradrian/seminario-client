import { env } from "./env";
import axios from "axios";

export class HTTPClient {
    private readonly baseURL: string;

    constructor() {
        this.baseURL = env.BASE_URL!!;
    }

    public async get(url: string, params?: any, token?: string) {
        try {
            const response = await axios.get(this.baseURL + url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: params
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

    public async delete(url: string, params?: any, token?: string) {
        try {
            const response = await axios.delete(this.baseURL + url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: params,
            });
            
            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.message);
        }
    }
    
};