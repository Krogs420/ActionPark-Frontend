const activities = 'http://localhost:8080/getActivities';
const out = function (str) {
  console.log(str)
}
const activityMap = new Map;

function fetchActivites() {
  return fetch(activities).then(response => response.json())

}

async function createActivities() {
  const activityList = await fetchActivites();
  activityList.forEach((activity, index) => {
    activityMap.set(activity.activityName, index)
    document.createElement('li',activityMap[index])
    out("does it work?")
  })
  out(activityMap)
}

function createTimeTableFromMap() {
  out("create table");
  for (activityKey of activityMap.keys()) {
  }
}

createActivities()
createTimeTableFromMap()
