import { Octokit } from "octokit";

async function git_connect(request, response) {
    const octokit = new Octokit({ auth: `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` });
    const login = await octokit.request('GET /users/{username}', {
        username: 'takenet'
    })

    const dynamicDate = new Date();

    response.json({
        status: 'ok',
        date: dynamicDate.toGMTString(),
        id: login.data.avatar_url
    });
}

export default git_connect;