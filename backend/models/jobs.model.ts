export interface job {
    title: string,
    type: string,
    level: string,
    location: null | string,
    is_active: boolean
}

export interface jobs {
    jobs: job[]
}

export interface jobsTreated {
    title: string,
    type: string,
    level: string,
    location: string,
}