const { Octokit } = require("@octokit/core");

export const getRepo = (token, repo) => {
    const octokit = new Octokit({auth: token})

    return new Promise((resolve, reject) => {
        octokit.request('POST /user/projects', {
            name: repo,
            mediaType: {
                previews: ['inertia']
            }}).then(r => {
                console.log(r)
                resolve({
                    name: r.data.name,
                    body: r.data.body
                })
            }).catch(e => reject(e))
    })
}