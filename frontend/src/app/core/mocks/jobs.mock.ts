import { jobs } from "../models/jobs.model";

export const JOBS_MOCK: jobs = {
    totalJobs: 2,
    page: 1,
    pageLimit: 5,
    totalPages: 1,
    data: [
        {
            title: "",
            type: "",
            level: "",
            location: "",
        },
        {
            title: "",
            type: "",
            level: "",
            location: "",
        },
        {
            title: "gerente mock",
            type: "",
            level: "",
            location: "",
        }
    ],
}