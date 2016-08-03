var UI = require('ui');
var ajax = require('ajax');

var splashScreen = new UI.Card({
  title: "Medal Count",
  body: "Loading...",
  banner: 'images/Rings_135.png'
});
splashScreen.show();

ajax({ url: 'https://app.scrapinghub.com/api/jobs/list.json?project=84590&apikey=f3c8dc917c7444e7aa903a582c42f8f6&count=2', type: 'json' },
  function(jobsList) {
    var indx = jobsList.jobs[0].state == "finished" ? 0 : 1;
    ajax({ url: 'https://storage.scrapinghub.com/items/' + jobsList.jobs[indx].id + '?apikey=f3c8dc917c7444e7aa903a582c42f8f6&format=json', type: 'json' },
      function(data) {
        var items = [];
        
        data.forEach(function(obj) { 
          items.push({
            title: obj.place + " " + obj.country, 
            subtitle: "G:" + obj.gold + " S:" + obj.silver + " B:" + obj.bronze + " Tot:" + obj.total
          }); 
        });
        
        var menu = new UI.Menu({
          sections:[{
            items:items
          }]
        });    
        
        splashScreen.hide();
        menu.show();
      }
    );
  }
);