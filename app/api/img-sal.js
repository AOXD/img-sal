'use strict';

const BingSearch = require('bing.search');

module.exports = function(app, LatestSearch) {
  app.route('/latest')
    .get(getLatestSearch);

  app.get('/:param', handlePost);

  function handlePost(req, res) {

    const searchQuery = req.params.param;
    const search = new BingSearch(process.env.API_KEY);
    const history = {
      "term": searchQuery,
      "when": new Date().toLocalString()
    };

    if (searchQuery !== 'favicon.ico') {
      save(history);
    }

    search.images(searchQuery, {
      top: size
    }, function(err, results) {
      if (err) throw err;
      res.send(results.map(makeList));
    });

  }

  function makeList(img) {
    return {
      "url": img.url,
      "snippet": img.title,
      "thumbnail": img.thumbnail.url,
      "context": img.sourceURL
    };
  }

  function save(obj) {
    const latestHistory = new LatestSearch(obj);

    latestHistory.save(function(err) {
      if (err) throw err;
    });
  }

  function getLatestSearch(req, res) {
    // Check to see if the site is already there
    History.find({}, null, {
      "limit": 10,
      "sort": {
        "when": -1
      }
    }, function(err, history) {
      if (err) return console.error(err);
      console.log(history);
      res.send(history.map(function(arg) {
        // Displays only the field we need to show.
        return {
          term: arg.term,
          when: arg.when
        };
      }));
    });
  }

};
