//   ./src/lib/secrets.ts


export class Secrets {
    
    public PUBLIC_APPWRITE_ENDPOINT: string;
    public PUBLIC_APPWRITE_PROJECT_ID: string;
    public PUBLIC_DATABASE: string;
    public PUBLIC_COLLECTION_ID: string;
    public CONSULT_LINK: string;

    constructor() {
        this.PUBLIC_APPWRITE_ENDPOINT = import.meta.env.PUBLIC_APPWRITE_ENDPOINT;
        this.PUBLIC_APPWRITE_PROJECT_ID = import.meta.env.PUBLIC_APPWRITE_PROJECT_ID;
        this.PUBLIC_DATABASE = import.meta.env.PUBLIC_DATABASE;
        this.PUBLIC_COLLECTION_ID = import.meta.env.PUBLIC_COLLECTION_ID;
        this.CONSULT_LINK = import.meta.env.CONSULT_LINK;
    }
}