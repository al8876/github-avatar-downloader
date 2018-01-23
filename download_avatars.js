var request = require('request');
var token = require('./secrets')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + token.GITHUB_TOKEN
    }
  };
  // console.log();


  request(options, function(err, res, body) {
    var parse = JSON.parse(body);
    cb(err, parse);
    parse.forEach(function() {
      for (var i = 0; i < 10; i++) {
        var avatar = parse[i];
        console.log("Avatar URL: ", avatar.avatar_url);
      }
    });
  });
}



getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});