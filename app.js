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
		response.writeHead(200, {
			"Content-Type": "text/html"
		});

		Process.processStart(requestedUrl,(err,data)=>{
			if(data === 'close'){
      		response.end();
			}else{
				try{
					var json = JSON.parse(data);
					if(json["eleCount"]){
						response.write(`<body></body><script type="text/javascript">document.body.innerHTML ='Processing review no. ${json['eleCount']}....'</script>`);
					}else{
						response.write(`<body></body><script type="text/javascript">document.body.innerHTML =${JSON.stringify(data)}</script>`);
					}
				}catch(e){
					response.write(`<body></body><script type="text/javascript">document.body.innerHTML =${JSON.stringify(data)}</script>`);
				}
			}
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
