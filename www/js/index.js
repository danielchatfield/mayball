/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.checkProgramme();
        app.updatePage();
    },
    checkProgramme: function() {

        $.getJSON('http://tickets.robinsonmayball.co.uk/api', function(data) {
          var oldProg = window.localStorage.getItem('programme');
          var newProg = JSON.stringify(data.programme);
          localStorage.setItem('locations', JSON.stringify(data.locations));
          localStorage.setItem('programme', newProg);

          if (newProg !== oldProg) {
            updatePage();
          }
        });
    },
    updatePage: function() {
      //remove programme DOM
      $('.event').remove();
      var programme = window.localStorage.getItem('programme');
      var locations = window.localStorage.getItem('locations');

      if (programme === undefined || programme.length === 0) {
        return;
      }
      if (locations === undefined || locations.length === 0) {
        return;
      }
      programme = JSON.parse(programme);
      locations = JSON.parse(locations);

      for(var i in programme) {
        item = programme[i];
        item.location = locations[item.location];
        app.addEvent(item);
      }
      //add new stuff
    },
    addEvent: function(item) {
      var time = item.date;
      var html = "<div><h2>" + time + " - " + item.title + "</h2><h3>" + item.location + "</h3></div>";
      $(html)
        .addClass('event')
        .attr('data-time', item.date)
        .appendTo('.programme');
    }
};
