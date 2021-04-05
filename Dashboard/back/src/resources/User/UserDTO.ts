interface UpdateDTO {
    weather?: {
        used?: boolean,
        temp?: string,
        weather?: string,
    },
    spacex?: {
        used?: boolean,
        latest?: boolean,
        next?: boolean
    },
    github?: {
        used?: boolean,
        repo?: string
    }
}

export default UpdateDTO;