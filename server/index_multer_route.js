const storage = multer.memoryStorage();
const upload = multer({storage});

app.post('/api/upload', upload.single('avatar'), fileUploader);