//  /lib/ArticleData.ts

import { Secrets } from "./Secrets";
import { Client, Databases } from "appwrite";

// BlogPost class
export class BlogPost {
    constructor(
        public slug: string,
        public title: string,
        public content: string,
        public timestamp: string,
        public max_id: string,
        public $id: string,
        public $collectionId: string,
        public $databaseId: string,
        public $createdAt: string,
        public $updatedAt: string,
        public $permissions: string[]
    ) {}
}

// Utility function to format time to UTC
export function formatTimeToCustomUTC(dateString: string): string {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}

// ArticleData class
export class ArticleData {
    public secret: Secrets;
    private client: Client;
    private dataBase: Databases;
    public posts: BlogPost[];

    constructor() {
        this.secret = new Secrets();
        this.client = new Client();
        this.client
            .setEndpoint(this.secret.PUBLIC_APPWRITE_ENDPOINT)
            .setProject(this.secret.PUBLIC_APPWRITE_PROJECT_ID);
        this.dataBase = new Databases(this.client);
        this.posts = [];
    }

    public async initialize(): Promise<void> {
        try {
            this.posts = await this.getPosts();
        } catch (error) {
            console.error("Failed to initialize posts:", error);
        }
    }

    public getPostAt(index: number): BlogPost | undefined {
        return this.posts[index];
    }

    public getSecret(): Secrets {
        return this.secret;
    }

    public async getPosts(): Promise<BlogPost[]> {
        try {
            const response = await this.dataBase.listDocuments<BlogPost>(
                this.secret.PUBLIC_DATABASE,
                this.secret.PUBLIC_COLLECTION_ID
            );

            return response.documents.map((doc) => {
                var content = Buffer.from(doc.content, "utf-8").toString()
                content = content.replaceAll("’", "'");
                content = content.replaceAll("“", '"');
                content = content.replaceAll("”", '"');
                return new BlogPost(
                    doc.slug,
                    doc.title,
                    content,
                    new Date(doc.$createdAt).toISOString(),
                    "",
                    doc.$id,
                    doc.$collectionId,
                    doc.$databaseId,
                    doc.$createdAt,
                    doc.$updatedAt,
                    doc.$permissions
                );
            });
        } catch (error) {
            console.error("Appwrite error fetching posts:", error);
            return []; // Return empty array on failure
        }
    }
}
