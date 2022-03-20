const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const out = function (str) {
  console.log(str)
}

$(document).ready(function () {
  $('.fa-calendar').click(function () {
    $(document).ready(function () {
      $("#document_date").datepicker().focus();
    });
  });
});

const activities = 'http://localhost:8080/getActivities';

const activityMap = new Map;

function fetchActivites() {
  return fetch(activities).then(response => response.json())

}

async function createActivities() {
  const activityList = await fetchActivites();
  activityList.forEach((activity, index) => {
    activityMap.set(activity.name, activity)
  })
}

function createTimeTableFromMap() {
  out("create table");
  for (activityKey of activityMap.keys()) {
    out(activityMap.get(activityKey))
  }
}

function addRow() {
  for (let x of times) {
    let timeName = document.createElement("button");
    timeName.classList.add("time-button");
    const tidspunkt = document.createTextNode(x);
    timeName.append(tidspunkt);
    timeName.addEventListener('click', clickButton)
    timeTable.append(timeName);


  }
}

async function clickButton() {
  out("button should be red")
  return document.getElementsByClassName('time-button').backgroundColor = "white";

}


createActivities();
createTimeTableFromMap()

const pbCreateTimeTable = document.getElementById("document_date");
const timeTable = document.getElementById("timetable")


pbCreateTimeTable.addEventListener('click', addRow)






