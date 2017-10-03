const request = require('sync-request')
var apiKey = process.env['LEXSEARCH_KEY']
var cheerio = require('cheerio')
const replaceString = require('replace-string')

function fetch (canonical) {
	var res = request('POST',
		`https://hack-api.lexferenda.ch/search?apikey=${apiKey}&size=1&l=de&t=cod,rul`,
		{ json: {"query":{"term":{"canonical.keyword":canonical}}, "_source": ["shortcodes","marginalia","title","book_abbreviation","html"]} }
	)
	res = JSON.parse(res.getBody('utf8')).hits.hits[0]
	doc = res['_source']
	if (res._type == 'cod') {
		var title = `${doc['title']} ${doc['book_abbreviation']} (${doc['marginalia']})`
		var htmlTitle = `<b>${doc['title']}</b> ${doc['book_abbreviation']}<br /> <i>${doc['marginalia']}</i>)`
		var html = doc['html']
	} else {
		var title = `${doc['title']}`
		var htmlTitle = `<b>${doc['title']}</b>`
		$ = cheerio.load(doc['html']);
		var html = $('div.regeste-de').html()
	}
	return {
		title: title,
		htmlTitle: replaceString(htmlTitle, '"', '\''),
		html: replaceString(html, '"', '\'')
	}
}

module.exports = {
	fetch: fetch
}
