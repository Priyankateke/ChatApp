//required modules

//http built-in module : which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
var http = require('http');

//url: The URL module splits up a web address into readable parts. with the url.parse() method
var url = require('url');

//fs: allows us to work with the file system on your computer. 
var fs = require('fs');

//qs: Query String module provides a way of parsing the URL query string.
var qs = require('querystring');

//createServer() : to create an HTTP server:
var server = http.createServer(function (request, response) {
	//File Path
	var sourcePath = 'D:\\Priyanka DT\\Office\\Task\\Source\\ChatApp\\source';
	var path = url.parse(request.url).pathname;
	var pagePath = sourcePath + '\\pages';
	var cssPath = sourcePath + '\\css';
	var jsPath = sourcePath + '\\js';
	var serverPath = sourcePath + '\\server';
	var dataFilePath = sourcePath + '\\datafile';
	var imgagePath = sourcePath + '\\image';

	switch (path) {
		case '/':

			//writeHead() If the response from the HTTP server is supposed to be displayed as HTML,
			//(200, { 'Content-Type': 'text/plain' }) :1.all is OK the, 2.object containing the response headers.
			response.writeHead(200, { 'Content-Type': 'text/plain' });

			//display as HTML
			response.write("This is Test Message.");
			response.end();
			break;

		case '/user-profile.png':
			var img = fs.readFileSync(imgagePath + path);
			response.writeHead(200, {'Content-Type': 'image/gif' });
			response.end(img, 'binary');
			break;

		case '/chat.css':
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

			//checking method
			if (request.method == 'POST') {
				var body = '';

				//append data
				request.on('data', function (data) {

					body += data;

					//for validation
					if (body.length > 1e6)
						request.connection.destroy();
				});

				//parse data
				request.on('end', function () {
					var newRegistration = qs.parse(body);

					//read json file using json
					fs.readFile(dataFilePath + '\\registration.json', function (error, post) {

						//error response
						if (error) {
							response.writeHead(404);
							response.write(error);
							response.end();
						} else {

							//parse json data
							var registrationData = JSON.parse(post);

							//push new registration data
							registrationData.push(newRegistration);

							//writing data to json file
							fs.writeFile(dataFilePath + "\\registration.json", JSON.stringify(registrationData), function (err) {
								if (err) {
									response.writeHead(404);
									response.write(err);
									response.end();
								}
								else {
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

		case '/checkForLogin':

			//check method
			if (request.method == 'POST') {
				var body = '';

				//append data
				request.on('data', function (data) {
					body += data;

					//for validation
					if (body.length > 1e6)
						request.connection.destroy();
				});

				request.on('end', function () {
					//parse login data
					var userCredentials = qs.parse(body);

					//read saved registration data
					fs.readFile(dataFilePath + '\\registration.json', function (error, filedata) {
						var message = '';
						if (error) {
							response.writeHead(404);
							response.write(error);
							response.end();
						} else {

							//parse user registration data present in json file
							var loginData = JSON.parse(filedata);

							//iterating data
							for (var i = 0; i < loginData.length; i++) {

								//compare login credential 
								if (loginData[i].UserName == userCredentials.UserName) {
									if (loginData[i].Password == userCredentials.Password) {
										message = "Valid User";
										break;
									}
								}
							}
						}

						if (message == "Valid User") {
							response.writeHead(200, { 'Content-Type': 'text' });
							response.write(message);
							response.end();
						}
						else {
							response.writeHead(404);
							response.write("Please enter valid user name and password");
							response.end();
						}
					});
				});
			}
			break;

		case '/chatpage.html':
		case '/login.html':
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

		case '/login.js':
			fs.readFile(jsPath + path, function (error, data) {
				if (error) {
					response.writeHead(404);
					response.write(error);
					response.end();
				}
				else {
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