// ==UserScript==
// @name         Newline: Lesson View
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://newline.theironyard.com/admin/courses/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

  const dataURL = '';
  const lessons = document.querySelectorAll('.eo');
  const styles = 'text-align:center; border: 25px solid #43d6a0; margin: 0 -20px; background-color: #43d6a0; color: white;';
  const course = Number(document.URL.substr(document.URL.lastIndexOf("/") + 1));

  fetch(dataURL).then(function(response) {
    return response.json();
  }).then(function(data) {
    let days = data[course];
    if (days) {
      data[course].forEach( day => groupLessons(day));
    } else {
      console.log(`This lesson is not supported by Lesson View. See here -> ${dataURL}`);
    }
  });

  function groupLessons (day) {

    let i, dt, lessonId;

    for (i = 0; i < lessons.length; i++ ) {
      dt = lessons[i].querySelector('dt');
      if (!dt.hasAttribute('style')) {
        lessonId = Number(dt.innerText.substr(-3));
        if (lessonId === Number(day.start)){ // start
          lessons[i].insertAdjacentHTML('beforebegin', `<div style="${styles}">${day.title}</div>`);
        }
      }
    }

  }

})();