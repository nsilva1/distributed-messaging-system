import express from 'express'
import { authenticate } from '../middleware/auth'
import { validateJob } from '../middleware/validate'
import { createJob, getJob } from '../services/jobService'

const router = express.Router()


/**
 * @swagger
 * tags:
 *    name: Jobs
 *    description: Create and View Jobs
 */


router.post('/', authenticate, validateJob, async (req, res) => {
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