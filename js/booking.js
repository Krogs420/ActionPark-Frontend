const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const out = function (str) {
  console.log(str)
}
const btn = document.getElementById('btn');

btn.addEventListener('click', function onClick() {
  btn.style.backgroundColor = 'grey';
  btn.style.color = 'green';
})

$(document).ready(function () {
  $('.fa-calendar').click(function () {
    $(document).ready(function () {
      $("#document_date").datepicker().focus();
    });
  });
});

function addRow() {
  for ( let x of times){
    let timeName = document.createElement("button");
    timeName.classList.add("time-button");
    const tidspunkt = document.createTextNode(x);
    timeName.append(tidspunkt);
    timeTable.append(timeName);
  }
}

function createTimeTableFromMap() {
  out("create table");
  timeMap.forEach(times => addRow(times)
  )
}




const pbCreateTimeTable = document.getElementById("document_date");
const timeTable = document.getElementById("timetable")

pbCreateTimeTable.addEventListener('click', addRow)






