// src/types.ts

// Options for creating the Github client
export interface GitHubClientOptions {
    // TODO: baseURL? : string (optional, default will be "https://api.github.com")
    // TODO: token? : string (optional personal access token for authentication)
    // TODO: userAgent? : (optional customer user agent string)

    baseUrl?: string; 
    token?: string; 
    userAgent?: string;
}

// Minimal shape of a Github repository that we care about
export interface GitHubRepo {
    // TODO: id: number (unique identifier for the repository)
    // TODO: name: string (name of the repository)
    // TODO: full_name: string (full name including owner, e.g., "owner/repo")
    // TODO: private: boolean (whether the repository is private)
    // TODO: html_url: string (URL to the repository on GitHub)

    // Optional / nullable fields:
    // TODO: description? : string | null (repository description)
    // TODO: language? : string | null (primary programming language)

    id: number;
    name: string; 
    full_name: string; 
    private: boolean;
    html_url: string;
    description?: string | null; 
    language?: string | null;
}


// A generic error shape for the SDK to throw
export class GitHubSdkError extends Error {
    // TODO: status? : number // HTTP status code, if available
    // TODO: details? : unknown // Any extra info from Github's error response 
    status?: number;
    details?: unknown;

    // The constructor should accept: 
    // - message: string
    // - status?: number
    // - details?: unknown
    constructor(message: string, status?: number, details?: unknown) {
        // TODO: 
        // 1. Call super(message)
        // 2. Assign this.status = status
        // 3. Assign this.details = details
        // 4. Set this.name = "GitHubSdkError"
        // 5. Optionally fix the prototype for Error in TS: 
        super(message);
        this.status = status;
        this.details = details; 
        this.name = "GitHubSdkError";
        Object.setPrototypeOf(this, GitHubSdkError.prototype);        
    }
}
