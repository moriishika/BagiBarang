import formidable from 'formidable-serverless';

export default async function parseMultipartForm(req, res, next) {
	const form = new formidable.IncomingForm();
	//ini ga bisa cuma untuk item, harus di perbaiki untuk profile image, ads, sama video
	//ato ga coba bikin middleware nya dinamis lah intinya biar untuk ads nya nanti juga lancar
	form.multiples = true;
	form.uploadDir = `./public/assets/images/items`;
	form.keepExtensions = true;

	form.on('fileBegin', (fields, file) => {
		console.log(file)
		file.name = Date.now() + file.name;
		file.path = form.uploadDir + '/' + file.name;
	})

	//check kalo file nya cuma bisa image doang
	const contentType = req.headers['content-type']
	if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
		form.parse(req, (err, fields, files) => {
			if (!err) {
				req.body = fields;
				console.log(files);
				console.log(fields);
				if (!files.images.length) {
					files.images = [files.images];
				}

				req.files = files
			}
			console.log("error")
			console.log(err);
			next();
		})
	} else {
		next();
	}
}

