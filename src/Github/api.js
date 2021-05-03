const { Octokit } = require("@octokit/core");

export const getUser = (token, user) => {
    const octokit = new Octokit({auth: token})

    return new Promise((resolve, reject) => {
        octokit.request('GET /users/{username}', {username: user})
            .then(r => resolve(r.data))
            .catch(e => reject(e))
    })
}