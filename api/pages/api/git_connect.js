import { Octokit } from "octokit";

async function git_connect(request, response) {
    const octokit = new Octokit();

    const user = await octokit.request('GET /orgs/{username}', {
        username: 'takenet'
    })

    const repos = await octokit.request('get /orgs/{org}/repos', {
        org: 'takenet',

    })

    const date_repo = repos.find(repo => repo.data.created_at)

    const dynamicDate = new Date();

    response.setHeader('Cache-control', 's-maxage=10, stale-while-revalidate');

    response.json({
        avatar: user.data.avatar_url,
        repos: repos.data,
    });
}

export default git_connect;