/**
 * Description Process for running crawler
 * @Author mayank
 * @Created on 17-Feb-2018
 */
'use strict';

const childProcess = require('child_process');
const phantomjs = require('phantomjs');
const PHANTOM_SERVICE = phantomjs.path;


class Process{

  processStart(request_url,callback){
    var phantomArgs = [__dirname+ "/../middleware/webpage.js",request_url];
    var child_process = childProcess.spawn(PHANTOM_SERVICE, phantomArgs);

    child_process.stdout.on("data", (data) => {
      console.error(data.toString());
      callback(null, data.toString());
    });

    child_process.stderr.on("data", (data) => {
      callback(`error: can't able to crawl the given url`, null);
    });

    child_process.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      callback(null, 'close');
    });

  }

}

module.exports = new Process();
