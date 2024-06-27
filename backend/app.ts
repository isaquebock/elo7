import express from 'express';
import axios from 'axios';
import { job, jobs, jobsTreated } from './models/jobs.model';
import { configDotenv } from 'dotenv';
import cors from 'cors';

configDotenv();

const app = express();
const port = 3000;
app.use(cors());

function handleData(jobs: job[]): job[] {
    return jobs
        .filter(job => job.is_active)
        .map(job => (
            {
                ...job, 
                location: (!job.location ? 'Remoto' : sliceJobLocation(job.location))
            }))
}

function sliceJobLocation(location: string): string {
    const newLocation = location.split(',');

    return `${newLocation[0]}, ${newLocation[2]}`
}

function searchJob(jobs: jobsTreated[], search: string): jobsTreated[] {
    const findedJobs = jobs
        .filter(job => job.title.toLowerCase().includes(search.toLowerCase()))

    return findedJobs;
}

app.get('/', (req, res) => {
  res.send(`Server is listening at http://localhost:${port} 🚀`);
});

app.get('/jobs', async (req, res) => {
    const pageLimit = 5;

    const { page = 1, search } = req.query;

    const startIndex = (Number(page) - 1) * pageLimit;
    const endIndex = Number(page) * pageLimit;

    const response: jobs = await (await axios.get(process.env.API)).data;
    const jobsTreated: jobsTreated[] = handleData(response.jobs);

    const paginatedJobs = jobsTreated.slice(startIndex, endIndex);

    const isSearch = (!search || search.toString() == '');

    res.status(200)
    .send(
        {   
            totalJobs: isSearch ? jobsTreated.length : searchJob(jobsTreated, search.toString()).length,
            page: Number(page),
            pageLimit,
            totalPages: Math.ceil(jobsTreated.length / pageLimit),
            data: isSearch ? paginatedJobs : searchJob(jobsTreated, search.toString()).slice(startIndex, endIndex)
        }
    );
});

app.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port} 🚀`);
});