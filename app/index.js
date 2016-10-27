const Nightmare = require('nightmare');
const {send} = require('micro');

module.exports = (req, res) => {
    Nightmare()
        .goto('https://google.com')
        .type('#lst-ib', 'egghead.io')
        .click('#tsf > div.tsf-p > div.jsb > center > input[type="submit"]:nth-child(1)')
        .wait('#ires')
        .evaluate(function () {
            return Array.from(document.querySelectorAll('h3 > a')).map(link => link.href)
        })
        .end()
        .then(function (result) {
            send(res, 200, {title:'Google results for egghead.io', results:result});
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        });
}