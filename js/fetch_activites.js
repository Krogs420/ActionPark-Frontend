const activities = 'http://localhost:8080/api/activity/all-activities';
const button = document.getElementById("btn")
const activityTable = document.getElementById("activityTable")
const bookingTable = document.getElementById('bline-table')

const out = function (str) {
  console.log(str)
}
const activityMap = new Map;
createActivities()

function fetchActivities() {
  return fetch(activities).then(response => response.json());
}

async function createActivities() {
  const activityList = await fetchActivities();
  for (let x of activityList) {
    out(x)
    let parent = document.getElementById("parent")
    let activityName = document.createElement("div");
    activityName.classList.add("activity-box");
    activityName.setAttribute('id', x.activityId)
    parent.append(activityName)
    let activityinfo = document.createElement("div");
    activityinfo.classList.add("activity-info")
    activityName.append(activityinfo);
    let activityh2 = document.createElement("h2");
    activityh2.textContent = x.activityName;
    activityinfo.append(activityh2)
    let activityImgPoster = document.createElement("div");
    activityinfo.append(activityImgPoster);
    activityImgPoster.classList.add("image-poster");
    let activityImage = document.createElement("img");
    activityImgPoster.append(activityImage);
    activityImage.src = x.activityImageHref;

    let timeTable = document.createElement("div");
    activityName.append(timeTable);
    for (let i = 0; i < times.length; i++) {
      let timeName = document.createElement("button");
      timeName.setAttribute('id', i);
      timeName.classList.add("time-button");
      const tidspunkt = document.createTextNode(times[i]);
      timeName.append(tidspunkt);
      timeTable.append(timeName);
      timeName.addEventListener('click',  () => addBookinglineToBooking(x, times[i]))
    }
  }
}

function addBookinglineToBooking(activity, time){
  const tableRow = document.createElement('tr');
  const td1 = document.createElement('td')
  td1.textContent = activity.activityName;
  const td2 = document.createElement('td')
  td2.textContent = time.toString();
  const td3 = document.createElement('td')
  td3.textContent = activity.activityPrice
  tableRow.append(td1);
  tableRow.append(td2);
  tableRow.append(td3);
  bookingTable.append(tableRow)
  console.log('hej')
}


function addActivity(activity) {
  const rowCount = activityTable.rows.length;
  let row = activityTable.insertRow(rowCount);
  let colCount = 0;

  //Sætter Aktivitets
  let cell = row.insertCell(colCount++);
  cell.innerText = activity.activityName;

  //Billede til aktivitet
  cell = row.insertCell(colCount++);
  const imgTag = document.createElement('img');
  imgTag.setAttribute("src", activity.activityImageHref);
  imgTag.innerText = activity.name;
  cell.appendChild(imgTag);
}

function createActivityMap() {
  out("create table");
  activityMap.forEach(activity => createActivities(activity))
}

