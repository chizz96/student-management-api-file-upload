const { Student } = require("../models")
const fs = require('fs')


exports.createStudent = async(req, res)=>{
    try{
        const { fullName, email, phone, department} = req.body
        const file = req.file.path

        const student = await Student.findOne({where: {email}})

        if(student){
            return res.status(400).json({message:"Student already exist"})
        }

        const newStudent = await Student.create({
            fullName, 
            email, 
            phone, 
            department, 
            profileImage:file
        })

        res.status(201).json({message:"Student successfully created", data:newStudent})



    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}


exports.getAllStudents = async(req, res) => {
    try {
        const students = await Student.findAll();

        return res.status(200).json({
            message: `Total students: ${students.length}`,
            data: students
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.getOneStudent = async(req,res) => {
    try {
        const { id } = req.params;
        const oneStudent = await Student.findByPk(id)

        if(!oneStudent){
            return res.status(404).json({message: "Student not found"})
            }

        return res.status(200).json({
            message: "Student found successfully", data:oneStudent
        })

    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}

exports.updateStudent = async(req,res) =>{
    try{
        const { id } = req.params
        const { fullName, email, phone, department} = req.body

        const student = await Student.findByPk(id)

        if(!student){
            return res.status(404).json({message: "Student not found"})
        }

        const data = {
            fullName,
            email,
            phone,
            department
        }

        if(req.file){
            const oldFilePath = student.profileImage
            fs.unlinkSync(oldFilePath)
            data.profileImage = req.file.path
        }

        await student.update(data)
        return res.status(200).json({message:"Student sucessfully updated"})


    }catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}

exports.deleteStudent = async(req, res)=>{
    try{
        const { id } = req.params
        const student = await Student.findByPk(id)

        if(!student){
            return res.status(404).json({message: "Student not found"})
        }

        const oldFilePath = student.profileImage
        if(oldFilePath){
            fs.unlinkSync(oldFilePath)
        }

        await student.destroy()
        return res.status(200).json({
            message: `Student Deleted Successfully`
        })

    }catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}



exports.studentMultImages = async(req, res)=>{
    try{
        const { id } = req.params
        const student = await Student.findByPk(id)

        if(!student){
            return res.status(404).json({message: "Student not found"})
        }

        const data = {
            galleryImages:student.galleryImages
        }
        
        if (req.files && req.files.length > 0){
            const filePaths = req.files.map((e)=>e.path)
            const files = student.galleryImages ?? []
            const galleryImages = files.concat(filePaths)
            data.galleryImages = galleryImages
        }
        
        const studentgallery = await student.update(data)

        return res.status(200).json({message:"", data:studentgallery})

    }catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}


exports.studentMultImagesField = async(req, res)=>{
    try{
         const { id } = req.params
        const student = await Student.findByPk(id)

        if(!student){
            return res.status(404).json({message: "Student not found"})
        }

        const profileImageFile = req.files['profileImage'][0].path
        const passportImageFile = req.files['passportImage'][0].path
        const identityCardImageFile = req.files['identityCardImage'][0].path
        const galleryImagesFile = req.files['galleryImages'].map(file => file.path)


        const data = {
            profileImage: student.profileImage,
            passportImage: student.passportImage,
            identityCardImage: student.identityCardImage,
            galleryImages:student.galleryImages
        }


        if (req.files['profileImage']){
            data.profileImage = profileImageFile
        }

        if (req.files['passportImage']){
            data.passportImage = passportImageFile
        }

        if (req.files['identityCardImage']){
            data.identityCardImage = identityCardImageFile
        }
        if (req.files['galleryImages']){
            data.galleryImages = galleryImagesFile
        }

        const studentImages =  await student.update(data)

        return res.status(200).json({message:"images successfully uploaded", data:studentImages})


    }catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}




