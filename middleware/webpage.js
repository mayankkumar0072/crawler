/**
 * Description Script to run in Browser
 * @Author mayank
 * @Created on 17-Feb-2018
 */

const system = require('system');
const fs = require('fs');

var page = require('webpage').create();
var ARG_URL = system.args[1];

page.open(ARG_URL, function(status) {
  if (status !== 'success') {
    console.log('Unable to access network');
		phantom.exit();
  } else {
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
});
