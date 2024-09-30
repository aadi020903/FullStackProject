const multer = require('multer');
const upload = multer({
    storage: multer.multerStorage(),
})

module.exports = upload;