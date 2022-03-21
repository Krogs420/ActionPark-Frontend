const activities = 'http://localhost:8080/api/activity/all-activities';

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
    parent.append(activityName)
    let activityinfo = document.createElement("div");
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
    for (let x of times) {
      let timeName = document.createElement("button");
      timeName.classList.add("time-button");
      const tidspunkt = document.createTextNode(x);
      timeName.append(tidspunkt);
      timeTable.append(timeName);
    }


      /*
      activityinfo.append(activityh2);
      const activityNameTag = document.createTextNode(x);
      activityName.append(activityNameTag);
      activityName.addEventListener('click', clickButton)
      timeTable.append(activityName);
  */

    }
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

  const button = document.getElementById("btn")
  const activityTable = document.getElementById("activityTable")

