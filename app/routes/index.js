'use strict';

module.exports = function(app) {
  app.route('/')
    .get(function(req, res) {
      res.render('index', {
        title: 'Image Search Abstraction Layer API',
        err: 'Oops something went wrong!'
      });
    });
};
