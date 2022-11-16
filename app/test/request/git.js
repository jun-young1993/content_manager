var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://api.github.com/repos/jun-young1993/content_manager/releases/latest',
  'headers': {
	'user-agent': 'node.js',
    // 'Authorization': 'Bearer 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'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const result = response.body;
  console.log(result.tag_name)
});
