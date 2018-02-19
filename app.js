/**
 * Description server start
 * @Author mayank
 * @Created on 17-Feb-2018
 */

'use strict';

const http = require('http');
const port = 3000;
const url = require("url");
const Process = require("./controller/process");

const requestHandler = (request, response) => {
	let parsed_url = url.parse(request.url, true);
	let path = parsed_url['pathname'];
	if(request.method  === 'GET' && path === "/"){

		let requestedUrl = parsed_url.query.url;
		console.log(requestedUrl);

		Process.processStart(requestedUrl,(err,data)=>{
			response.writeHead(200, {
				"Content-Type": "application/JSON"
			});
			response.write(err||data);
			response.end();
		});

	}else{

		response.writeHead(404, {
			"Content-Type": "text/plain"
		});
		response.write("404 Not Found\n");
		response.end();

	}
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
