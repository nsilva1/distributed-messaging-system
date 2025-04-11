import express from 'express'
import { createJob, getJob } from '../services/jobService.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const job = await createJob(req.body)
        res.status(201).json(job)
    } catch (error) {
        res.json({error: error.message})
    }
});

router.get('/:id', async (req, res) => {
    const job = await getJob(req.params.id);
    
    if(!job){
        res.status(404).json({error: "Job doesn't exist"})
    }

    res.status(200).json(job)
})

export default router;