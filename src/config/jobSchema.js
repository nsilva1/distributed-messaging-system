import Joi from 'joi'

export const jobSchema = Joi.object({
    type: Joi.string().valid('image-resize', 'data-enrich', 'tx-verify').required(),
    data: Joi.object().required(),
    priority: Joi.number().min(1).max(5).default(3)
});