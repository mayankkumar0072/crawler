
const assert = require('assert');
const Process = require("../controller/process");

const urls = {
	"success":"https://snap21.com/reviews/eagers-mazda-newstead-qld",
	"fail":"https://snap21.com/reviews/eagers-mazda"
}

describe('test with correct url', function() {
			it("error response should be null", function(done) {
				Process.processStart(urls["success"],(err,data)=>{
					if(data){
						console.log("1",err,data);
						assert.notEqual(0,data.length);
						done();
					}
    	});
		});
});


describe('test with incorrect url', function() {
			it("data response should be empty array", function(done) {
				Process.processStart(urls["fail"],(err,data)=>{
					if(data){
						console.log("2",err,data,data.length);
						assert.equal(0,JSON.parse(data).length);
						done();
					}
    	});
		});
});
