const times = ["08:00","09:00", "10:00","11:00", "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00", "22:00","23:00"];
const out = function (str){
  console.log(str)
}

const pbCreateTimeTable = document.getElementById("pbCreateTimeTable")

$(document).ready(function() {
  $('.fa-calendar').click(function(){
    $(document).ready(function(){
      $("#document_date").datepicker().focus();
    });
  });
});


let txt = "";
for (let x in times) {
  txt += times[x] + " ";
  document.getElementById("times").innerHTML = txt;
}




pbCreateTimeTable-addEventListener('click', createTableFromMap)






