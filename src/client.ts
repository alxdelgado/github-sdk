import { GitHubClientOptions, GitHubRepo, GitHubSdkError } from './types';


export class GitHubClient {
    // TODO: define private fields: 
    private baseUrl: string; 
    private token?: string; 
    private userAgent?: string;

    constructor(options: GitHubClientOptions) {
        // TODO: initialize private fields from options
        this.baseUrl = options.baseUrl ?? "https://api.github.com";
        this.token = options.token;
        this.userAgent = options.userAgent ?? "alex-github-sdk/0.1.0"; 
    }

    // Internal helper to build headers for each request
    private buildHeaders(): Record<string, string> {
        // Todo: build headers object

        const headers: Record<string, string> = {
            "Accept": "application/vnd.github.v3+json", 
            "User-Agent": this.userAgent ?? "alex-github-sdk/0.1.0"
        };

        if (this.token) {
            headers ["Authorization"] = `Bearer ${this.token}`;
        }

        return headers;
    }

    // Generic request helper
    private async request<T>(path: string, init?: RequestInit): Promise<T> {
        const url = this.baseUrl + path;
        const defaultHeaders = this.buildHeaders();
        const initHeaders = (init?.headers ?? {}) as Record<string, string>;
        const response = await fetch(url, {...init, headers: {...defaultHeaders, ...initHeaders}});
        // If response is not ok, throw an error
        if (!response.ok) {
            let errorBody: unknown;
            // Attempt to parse error body
            try {
                errorBody = await response.json();
            }
            catch {
                try {
                    errorBody = await response.text();
                } catch {
                    errorBody = undefined;
                }
            }
            throw new GitHubSdkError(`GitHub API request failed with status ${response.status}: ${response.statusText}`,
                response.status,
                errorBody
            );
        }
        return response.json() as Promise<T>;
    }

    // Public API: list repos for a given username
    async listUserRepos (username: string): Promise<GitHubRepo[]> {
        // TODO: implement listUserRepos method
        return this.request<GitHubRepo[]>(`/users/${username}/repos`);
    }
}


