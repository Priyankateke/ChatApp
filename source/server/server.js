//required modules
var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function (request, response) {
	var sourcePath ='D:\\Priyanka DT\\Office\\Task\\Source\\ChatApp\\source'; 
	var path = url.parse(request.url).pathname;
	var pagePath = sourcePath + '\\pages';
	var cssPath = sourcePath + '\\css';
	var jsPath = sourcePath + '\\js';
	var serverPath = sourcePath + '\\server';

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

		case '/registration.html':
			fs.readFile(pagePath  + path, function (error, data) {
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
					response.write( path + "-" + pagepath+"----"+__dirname);
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


