/**
 * Description Script to run in Browser
 * @Author mayank
 * @Created on 17-Feb-2018
 */

const system = require('system');
const fs = require('fs');

var page = require('webpage').create();
var ARG_URL = system.args[1];
var reviews = {
  eleCount:0,
  check:0
}

page.onResourceRequested = function(requestData, request) {
    var notLoad = "https://snap21.com/photo/view/thumbnail.php";
    if (requestData['url'].indexOf(notLoad) >= 0 || requestData['url'].indexOf(".png") >= 0 || requestData['url'].indexOf(".woff") >= 0 || requestData['url'].indexOf(".css") >=0 ) {
        request.abort();
    }
};


page.onConsoleMessage = function(msg, lineNum, sourceId) {
  if(msg === reviews.eleCount){
    reviews.check++;
  }else{
    reviews.eleCount = msg;
    reviews.check = 0;
  }
  console.log(JSON.stringify(reviews));
};

page.open(ARG_URL, function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
		phantom.exit();
  } else {
      var eleCount = 0;
      var interval = window.setInterval(function() {
            if(reviews.check < 5) {
              page.evaluate(function() {
                eleCount = (document.querySelectorAll(".reviewCount")).length;
                console.log(eleCount);
                window.document.body.scrollTop = document.body.scrollHeight;
              });
            }else {
              clearInterval(interval);
              var pageData = page.evaluate(function() {
        			var data = [];
        			var b = document.getElementsByClassName("quote");
        			if(b&&b.length>0){
        				for(var key=0; key<b.length; key++){
        					var blog = {};
        					if(b[key]){
        						//console.log(b[key]);
        						var comment = b[key].getElementsByClassName("quoteText");
        						blog["content"] = comment[0].textContent;
        						var rating = (b[key].getElementsByClassName("stars")[0]).alt;
        						blog["rating"] = rating;

        						var divSign = b[key].getElementsByClassName("attributionSection");
        						for (var index=0; index<divSign.length; index++){
        							if(divSign[index]){
        								//console.log(divSign[index]);
        								if(divSign[index].getAttribute("itemprop") === "datePublished" && divSign[index].hasAttribute("content")){
        									blog["date"] = divSign[index].getAttribute("content");
        								}
        								if(divSign[index].firstElementChild && divSign[index].firstElementChild.className === "salesPerson salesPersonProfileLink"){
        									blog["name"] =  divSign[index].firstElementChild.textContent;
        								}
        							}
        						}
        					}
        					data.push(blog);
        				}
        			};
        			return data;
            });
              console.log(JSON.stringify(pageData));
              phantom.exit();
            }
      }, 2000);
  }
});
