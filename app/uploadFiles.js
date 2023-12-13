const multer = require('multer')

const uploadFn = (destinationPath, ...filterType) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${destinationPath}`)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, file.fieldname + '-' + uniqueSuffix + "-" + file.originalname.replace(/\s/g, ''))
        }
    })

    function fileFilter(req, file, cb) {
        // console.log(file.mimetype);
        filterType.map((tf) => {
            if (file.mimetype === `${tf}`) {
                cb(null, true)
            } else {
                cb(null, false)
            }
        })

    }
    const upload = multer({ storage: storage, fileFilter })
    return upload
}


module.exports = uploadFn