var request = require('request');
var fs = require('fs');
var token = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
  if (repoOwner === undefined | repoName === undefined) {
    console.log('Error: please enter valid names');
  } else {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  }};


  request(options, function(err, res, body) {
    var parse = JSON.parse(body);
    cb(err, parse);
    parse.forEach(function(avatar) {
        console.log("Avatar URL: ", avatar.avatar_url);
    });
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Response Status Code: ', response.statusCode);
      console.log('Response Status Message: ', response.statusMessage);
      console.log('Response Headers: ', response.headers['content-type']);
    })
    .on('end', function(end) {
      console.log('Download complete!');
    })
    .pipe(fs.createWriteStream(filePath));
}


// getRepoContributors(process.argv[2], process.argv[3], function(err, result){
//  console.log("Errors:", err);
//  var sort = JSON.parse(result);
//  sort.forEach(function(avatar){
//    downloadImageByURL(avatar.avatar_url, "avatars/pic");
//  });
// });
