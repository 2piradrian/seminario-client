import { env } from "./env";
import axios from "axios";

export class HTTPClient {
    private readonly baseURL: string;
    private readonly secret: string;

    constructor() {
        this.baseURL = env.BASE_URL!!;
        this.secret = env.API_SECRET!!;
    }

    public async get(url: string, params?: any) {
        try {
            const response = await axios.get(this.baseURL + url, {
                headers: {
                    Authorization: this.secret
                },
                params: params
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.error);
        }
    }

    public async post(url: string, params?: any) {
        try {
            const response = await axios.post(this.baseURL + url, params, {
                headers: {
                    Authorization: this.secret
                }
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.error);
        }
    }

    public async put(url: string, params?: any) {
        try {
            const response = await axios.put(this.baseURL + url, params, {
                headers: {
                    Authorization: this.secret
                },
                params: params
            });

            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.error);
        }
    }

    public async delete(url: string, params?: any) {
        try {
            const response = await axios.delete(this.baseURL + url, {
                headers: {
                    Authorization: this.secret
                },
                params: params,
            });
            
            return response.data;
        }
        catch (error: any) {
            throw new Error(error.response.data.error);
        }
    }
    
};