import formidable from 'formidable-serverless';

export default async function parseMultipartForm(req, res, next) {
	const form = new formidable.IncomingForm();
	//ini ga bisa cuma untuk item, harus di perbaiki untuk profile image, ads, sama video
	//ato ga coba bikin middleware nya dinamis lah intinya biar untuk ads nya nanti juga lancar
	form.multiples = true;
	form.uploadDir = `./public/assets/images/items`;
	form.keepExtensions = true;

	form.on('fileBegin', (fields, file) => {
		file.name = Date.now() + file.name;
		file.path = form.uploadDir + '/' + file.name;
	})

	//check kalo file nya cuma bisa image doang
	const contentType = req.headers['content-type']
	if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
		console.log('masuk')
		form.parse(req, (err, fields, files) => {
			if (!err) {
				console.log('masukkk')
				console.log(files)
				console.log(fields)
				req.body = fields;
				if (!files.images.length) {
					files.images = [files.images];
				}

				req.files = files
			} else {
				console.log("error")
				console.log(err);
			}
			next();
		})
	} else {
		console.log('errors bet')
		next();
	}
}

