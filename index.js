var pull = require('pull-stream')
  , ssbClient = require('ssb-client')
  , chalk = require('chalk')
  , moment = require('moment')

var sbot = function(cb) {
    ssbClient(function(err, sbot) {
        if (err) throw err;
        cb(sbot);
    });
};

sbot(function(sbot) {
     pull(
          sbot.messagesByType({ type: 'micro', live: true }),
          pull.drain(function (msg) { console.log (
                  msg.value.content.text + " " + 
                  chalk.cyan(msg.value.author) + " " + chalk.dim(moment(msg.value.timestamp).fromNow()) 
                  ) 
          })
     )
});

