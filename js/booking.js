const times = ["08:00", "10:00", "12:00","14:00","16:00","18:00","19:00","20:00","22:00","23:00"];

function fillEventTimes(time, index){
  const viewTimes = document.getElementById("booking-day");
  viewTimes.textContent = time;
  viewTimes.value =index
  console.log(time)
}

function addTimes(btn){
  times.forEach(fillEventTimes);
}

function selectTime(btn){
  fillTimes.value;
}

function fillTimes(){
  for (const timeKey of timeKeyMap.keys()){
    const el = document.createElement("option")
    el.textContent  = timeKey;
    el.value = timeKeyMap.get(timeKey);

  }
}

const pbGetTimes = document.getElementById("pbGetTimes")
const pbFillDD = document.getElementById("pbGetTimes")

pbGetTimes.addEventListener('click', fillEventTimes)
pbFillDD.addEventListener('click', addTimes)


