const Joi = require('joi')


exports.createStudentValidation = (req, res, next)=>{
    const createStudentSchema = Joi.object({
         fullName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).required().messages({
            "any.required": "full Name is Required",
            "string.empty": "PLease input your fullName",
            "string.pattern.base": "full name must be Alphabets and must be 3 characters long",
        }),
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Please enter your email address",
            "any.required": "The email field is required",
        }),
        phone: Joi.string().pattern(/^(?:\+234|234|0)[789][01]\d{8}$/).required(),

        department: Joi.string().required()    

    })
    

    const { error } = createStudentSchema.validate(req.body);

    // console.log(error.details);
    
    if (error) {
        return res.status(400).json({
        message: error.details[0].message
        })
    }
next()
}



exports.updateStudentValidation = (req, res, next)=>{
    const updatestudentSchema = Joi.object({
         fullName: Joi.string().trim().pattern(new RegExp("^[A-Za-z]{3,}$")).optional().messages({
            "any.required": "full Name is Required",
            "string.empty": "PLease input your fullName",
            "string.pattern.base": "full name must be Alphabets and must be 3 characters long",
        }),
        email: Joi.string().email().optional().messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Please enter your email address",
            "any.required": "The email field is required",
        }),

        phone: Joi.string().pattern(/^(?:\+234|234|0)[789][01]\d{8}$/).optional(),

        department: Joi.string().optional()

        

    })
    

    const { error } = updatestudentSchema.validate(req.body);

    // console.log(error.details);
    
    if (error) {
        return res.status(400).json({
        message: error.details[0].message
        })
    }
next()
}



