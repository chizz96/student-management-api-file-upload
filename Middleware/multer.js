const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, './gallery');
    },

    filename:(req, file, callback)=>{
        const date = Date.now();
        const randNumber = Math.floor(Math.random() * 1E8);
        const ext = file.originalname.split(".").pop();
        const filename = `IMG_${date}_${randNumber}${ext}`;

        callback(null, filename);

    }
})


const filefilter = (req, file,callback)=>{
    if(file.mimetype.startWith('image/')){
        callback(null, true)
    }else{
        callback(new Error('image Only'))
    }
    
};

const limits = {
    fileSize: 1024 * 1024 * 2

};

const upload = multer({
    storage,
    filefilter,
    limits
})

module.exports = upload;