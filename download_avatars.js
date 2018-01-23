var request = require('request');
var fs = require('fs');
var token = require('./secrets');
var repoOwner = process.argv[2];
var repoName = process.argv[3];

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
    console.log("Avatar URL: ", body.avatar_url);
    cb(err, parse);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      console.log('Downloading');
      console.log('Response Status Code: ', response.statusCode);
      console.log('Response Status Message: ', response.statusMessage);
      console.log('Response Headers: ', response.headers['content-type']);
    })
    .on('end', function(end) {
      console.log('Download complete!');
    })
    .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(repoOwner, repoName, function(err, result){
  console.log("Errors: ", err);
  console.log("Result:", result);
  for (var i = 0; i < result.length; i++) {
    var contributor = result[i]
    downloadImageByURL(contributor.avatar_url, "avatars/" + contributor.login + ".jpg");
  }
})
