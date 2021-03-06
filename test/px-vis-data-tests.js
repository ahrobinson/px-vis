document.addEventListener("WebComponentsReady", function() {
  runTests();
});

function runTests(){
  suite('px-vis-data does Polymer exist?', function() {
    test('Polymer exists', function() {
      assert.isTrue(Polymer !== null);
    });
  });

  suite('px-vis-data appendAjax setup works', function() {
    var appendAjax = document.getElementById('appendAjax');
    var ironAjax = null;
    var eventObj = null;

    suiteSetup(function(done){
      var d = [
        {
          "url":"test_data/delta-egt-cruise.json"
        },{
          "url":"test_data/hpt-acc-position-cruise.json",
        }
      ];

      document.addEventListener('px-vis-data-updated',function(evt){
        eventObj = evt.detail;
        // doh...ajax comes in async, so check that it matches the order we expect for our tests
        if(eventObj.data[0].seriesNumber !== '0'){
          eventObj.data.reverse();
        }
      });

      appendAjax.set('requestData',d);

      setTimeout(function(){
        ironAjax = appendAjax.querySelectorAll('iron-ajax');
        done()
      },1000);
      // done();
    });

    test('appendAjax fixture is created', function() {
      assert.isTrue(appendAjax !== null);
    });
    test('appendAjax iron-ajaxes created', function() {
      assert.equal(ironAjax.length, 2);
    });

    test('appendAjax iron-ajax 1 url', function() {
      assert.equal(ironAjax[0].url, "test_data/delta-egt-cruise.json");
    });

    test('appendAjax iron-ajax 2 url', function() {
      assert.equal(ironAjax[1].url, "test_data/hpt-acc-position-cruise.json");
    });

    test('event fired', function() {
      assert.isTrue(eventObj !== null);
    });
    test('event dataVar', function() {
      assert.equal(eventObj.dataVar, 'appendedDataSet');
    });
    test('event method', function() {
      assert.equal(eventObj.method, 'set');
    });
    test('event data exists and is an array', function() {
      assert.isTrue(Array.isArray(eventObj.data));
    });
    test('event data exists and is the correct length', function() {
      assert.equal(eventObj.data.length,2);
    });

    test('event data 1 series is array', function() {
      assert.isTrue(Array.isArray(eventObj.data[0].series));
    });
    test('event data 1 series length', function() {
      assert.include([646,694],eventObj.data[0].series.length);
    });
    test('event data 1 series[0]', function() {
      assert.include(['[1397102460000,11.4403]','[1397102460000,96.5]'],JSON.stringify(eventObj.data[0].series[0]));
    });

    test('event data 2 series is array', function() {
      assert.isTrue(Array.isArray(eventObj.data[1].series));
    });
    test('event data 2 series length', function() {
      assert.include([646,694],eventObj.data[1].series.length);
    });
    test('event data 2 series[0]', function() {
      assert.include(['[1397102460000,11.4403]','[1397102460000,96.5]'],JSON.stringify(eventObj.data[1].series[0]));
    });
  }); //suite

  suite('px-vis-data flatAjax setup works', function() {
    var flatAjax = document.getElementById('flatAjax');
    var ironAjax = null;
    var eventObj = null;

    suiteSetup(function(done){
      var d = [{
        "url":"test_data/delta-egt-cruise-events.json"
      },{
        "url":"test_data/delta-egt-cruise-thresholds.json"
      }];

      document.addEventListener('px-vis-data-updated',function(evt){
        eventObj = evt.detail;
        // doh...ajax comes in async, so check that it matches the order we expect for our tests
        if(eventObj.data[0]['id'] !== '123'){
          eventObj.data.reverse();
        }
      });

      flatAjax.set('requestData',d);

      setTimeout(function(){
        ironAjax = flatAjax.querySelectorAll('iron-ajax');
        done()
      },1000);
      // done();
    });

    test('flatAjax fixture is created', function() {
      assert.isTrue(flatAjax !== null);
    });
    test('flatAjax iron-ajaxes created', function() {
      assert.equal(ironAjax.length, 2);
    });

    test('flatAjax iron-ajax 1 url', function() {
      assert.equal(ironAjax[0].url, "test_data/delta-egt-cruise-events.json");
    });

    test('flatAjax iron-ajax 2 url', function() {
      assert.equal(ironAjax[1].url, "test_data/delta-egt-cruise-thresholds.json");
    });

    test('event fired', function() {
      assert.isTrue(eventObj !== null);
    });
    test('event dataVar', function() {
      assert.equal(eventObj.dataVar, 'flattenedDataSet');
    });
    test('event method', function() {
      assert.equal(eventObj.method, 'set');
    });
    test('event data exists and is an array', function() {
      assert.isTrue(Array.isArray(eventObj.data));
    });
    test('event data exists and is the correct length', function() {
      assert.equal(eventObj.data.length,8);
    });

    test('event data [0] id', function() {
      assert.equal(eventObj.data[0]['id'],'123');
    });
    test('event data [0] time', function() {
      assert.equal(eventObj.data[0]['time'],1424803620000);
    });
    test('event data [0] time', function() {
      assert.equal(eventObj.data[0]['label'],'Recalibrate');
    });

    test('event data [5] id', function() {
      assert.equal(eventObj.data[5]['id'],'456');
    });
    test('event data [5] time', function() {
      assert.equal(eventObj.data[5]['time'],1415286720000);
    });
    test('event data [5] time', function() {
      assert.equal(eventObj.data[5]['label'],'Fan start');
    });
  }); //suite
} //runTests
