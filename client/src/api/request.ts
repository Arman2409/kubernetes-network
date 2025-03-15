import axios, { AxiosInstance } from 'axios';

export class Request {
    static instance: Request | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        const requestBaseUrl = import.meta.env.VITE_API_URL;

        this.axiosInstance = axios.create({
            baseURL: requestBaseUrl,
        });

        console.log("Request class initialized with:", requestBaseUrl);
    }

    static getInstance(): Request {
        if (!Request.instance) {
            Request.instance = new Request();
        }
        return Request.instance;
    }

    async getRandom() {
        return await this.axiosInstance.get("/random")
            .then(({ data }) => data)
            .catch(err => {
                console.error("Failed to get random quote", err);
                return ({
                    error: "Failed to get random quote"
                })
            })
    }

    async getTodays() {
        return await this.axiosInstance.get("/for-today")
            .then(({ data }) => data)
            .catch(err => {
                console.error("Failed to get today's quote", err);
                return ({
                    error: "Failed to get today's quote"
                })
            })
    }
}