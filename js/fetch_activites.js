const activities = 'http://localhost:8080/getActivities';

const activityMap = new Map;

function fetchActivites() {
  return fetch(activities).then(response => response.json())

}

async function createActivities() {
  const activityList = await fetchActivites();
  activityList.forEach((activity, index) => {
    activityMap.set(activity.activityName, activity)
  })
}

function createTimeTableFromMap() {
  out("create table");
  for (activityKey of activityMap.keys()) {
    out(activityMap.get(activityKey))
  }
}

createActivities()
createTimeTableFromMap()
