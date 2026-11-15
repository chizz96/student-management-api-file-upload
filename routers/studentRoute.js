const router = require("express").Router()

const { createStudent, getAllStudents, getOneStudent, updateStudent, deleteStudent, studentMultImages, studentMultImagesField } = require("../controllers/studentController")

const upload = require("../Middleware/multer")

const { createStudentValidation, updateStudentValidation} = require("../Validation/studentValidation")

const uploadMiddleware = upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'passportImage', maxCount: 1 },
    { name: 'identityCardImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 }
])

router.post("/api/students", createStudentValidation, upload.single("profileImage"), createStudent)

router.get("/api/students", getAllStudents)

router.get("/api/students/:id", getOneStudent)

router.put("/api/students/:id", updateStudentValidation, upload.single("profileImage"), updateStudent)

router.delete("/api/students/:id", deleteStudent)

router.post("/api/students/:id/gallery", upload.array('galleryImages',5), studentMultImages)

router.post("/api/students/:id/images", uploadMiddleware, studentMultImagesField)


module.exports = router