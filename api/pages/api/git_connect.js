import { Octokit } from "octokit";

async function git_connect(request, response) {

    const octokit = new Octokit();
    const user = await octokit.request('GET /orgs/{username}', {
        username: 'takenet'
    })

    const repos = await octokit.request('get /orgs/{org}/repos', {
        org: 'takenet',
    })

    var repository = {};
    var count = 0;
    for (let i = 0, j = 0; count < 5; i++, j++) {
        if (repos.data[i].language == "C#") {
            repository[j] = {
                name: repos.data[i].name,
                desc: repos.data[i].description,
                language: repos.data[i].language,
                date: repos.data[i].created_at
            };
            count++;
        }
    }

    response.setHeader('Cache-control', 's-maxage=10, stale-while-revalidate');

    response.json({
        avatar: user.data.avatar_url,
        repository: repository,
    });
}

export default git_connect;