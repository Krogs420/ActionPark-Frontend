const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

$(document).ready(function () {
  $('.fa-calendar').click(function () {
    $(document).ready(function () {
      $("#document_date").datepicker().focus();
    });
  });
});



function createTimeRows() {
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

const pbCreateTimeTable = document.getElementById("document_date");
const timeTable = document.getElementById("timetable")


pbCreateTimeTable.addEventListener('click', createTimeRows)






