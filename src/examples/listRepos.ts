// todo: import GitHubClient (and optionally types) from "../src/index"
import { GitHubClient } from "../index";

// For now, we'll allow passing a username on the command line: `node... octocat`
async function main() {
    const username = process.argv[2] || "octocat";

    // Initialize the GitHubClient
    const client = new GitHubClient({});

    let userRepos;
    try {
        // Fetch the user's repo's
        const userRepos = await client.listUserRepos(username); 
    } catch (error) {
        console.error("Error fetching repositories:", error);
        return;
    }

    // Print the names of the repositories fetched; 
    console.log(`Repositories for user ${username}:`); 
    for (const repo of userRepos) {
        console.log(`- ${repo.full_name}, URL: ${repo.html_url}`); 
    }
}

// execute the main function
main().catch(console.error); 