//required modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer(function (request, response) {
	//File Path
	var sourcePath = 'D:\\Priyanka DT\\Office\\Task\\Source\\ChatApp\\source';
	var path = url.parse(request.url).pathname;
	var pagePath = sourcePath + '\\pages';
	var cssPath = sourcePath + '\\css';
	var jsPath = sourcePath + '\\js';
	var serverPath = sourcePath + '\\server';
	var dataFilePath = sourcePath + '\\datafile';

	switch (path) {
		case '/':
			response.writeHead(200, { 'Content-Type': 'text/plain' });
			response.write("This is Test Message.");
			response.end();
			break;
		case '/registration.css': fs.readFile(cssPath + path, function (error, data) {
			if (error) {
				response.writeHead(404);
				response.write(error);
				response.end();
			} else {
				response.writeHead(200, { 'Content-Type': 'text/css' });
				response.write(data);
				response.end();
			}
		});
			break;

		case '/saveregistration':
			let jsonString = ''

			if (request.method == 'POST') {
				jsonString = 'in new code';
				var body = '';

				request.on('data', function (data) {
					jsonString = ' in on';
					body += data;

					if (body.length > 1e6)
						request.connection.destroy();
				});

				request.on('end', function () {
					 var newRegistration = qs.parse(body);

					fs.readFile(dataFilePath + '\\registration.json',function (error, post) {

						if (error) {
							response.writeHead(404);
							response.write(error);
							response.end();
						} else {
							var registrationData = JSON.parse(post);
							registrationData.push(newRegistration);
							fs.writeFile(dataFilePath + "\\registration.json", JSON.stringify(registrationData), function (err) {
								if (err) 
								{
									response.writeHead(404);
									response.write(err);
									response.end();
								}
								else{
									response.writeHead(200, { 'Content-Type': 'text' });
									response.write('Registrtion saved successfully');
									response.end();
								}								
							  });
						}

					});
				});
			}
			break;

		case '/registration.html':
			fs.readFile(pagePath + path, function (error, data) {
				if (error) {
					response.writeHead(404);
					response.write(error);
					response.end();
				} else {
					response.writeHead(200, { 'Content-Type': 'text/html' });
					response.write(data);
					response.end();
				}
			});
			break;

		case '/test.html':
			fs.readFile(__dirname + path, function (error, data) {
				if (error) {
					response.writeHead(404);
					response.write(error);
					response.end();
				} else {
					response.writeHead(200, { 'Content-Type': 'text/html' });
					response.write(path + "-" + pagePath + "----" + __dirname);
					response.end();
				}
			});
			break;

		case '/registration.js':
			fs.readFile(jsPath + path, function (error, data) {
				if (error) {
					response.writeHead(404);
					response.write(error);
					response.end();
				} else {
					response.writeHead(200, { 'Content-Type': 'text' });
					response.write(data);
					response.end();
				}
			});
			break;
			
		default:
			response.writeHead(404);
			response.write("opps this doesn't exist - 404");
			response.end();
			break;
	}
});

server.listen(8082);