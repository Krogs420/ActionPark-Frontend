
const activities = 'http://localhost:8080/api/activity/all-activities';

const out = function (str) {
  console.log(str)
}
const activityMap = new Map;

createTimeTableFromMap()

function fetchActivites() {
 return fetch(activities).then(response => response.json());

}
fetchActivites()
createActivities()
async function createActivities() {
  const activityList = await fetchActivites();
  activityList.forEach((activity, index) => {
    activityMap.set(activity.activityName, index)
    document.createElement('li',activityMap[index])
    out("does it work?")
  })
}

function createTimeTableFromMap() {
  out("create table");
  for (activityKey of activityMap.keys()) {
  }
}

function addActivity(activity){
  const rowCount = activityTable.rows.length;
  let row = activityTable.insertRow(rowCount);
  let colCount = 0;

//Sætter Aktivitets
  let cell =  row.insertCell(colCount++);
  cell.innerText = activity.activityId;

  //Billede til aktivitet
  cell = row.insertCell(colCount++);
  const imgTag = document.createElement('img')
  imgTag.setAttribute("src",activity.img )
  imgTag.innerText = activity.name;
  cell.appendChild(imgTag);

}

addActivity()


const activityTable = document.getElementById("document_date")
activityTable.addEventListener('click', createTimeTableFromMap)
