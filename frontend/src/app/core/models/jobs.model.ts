export interface job {
    title: string,
    type: string,
    level: string,
    location: string,
}

export interface jobs {
    totalJobs: number,
    page: number,
    pageLimit: number,
    totalPages: number,
    data: job[]
}