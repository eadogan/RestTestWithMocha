const Joi = require('joi')
 
const schema = Joi.object({
    name: Joi.string()
            .min(3)
            .required(),
    completed: Joi.boolean()
})
function validateTask(task) {
    schema.validate(task) 
}

module.exports = schema

