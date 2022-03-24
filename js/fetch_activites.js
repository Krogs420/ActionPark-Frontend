const activities = 'http://localhost:8080/api/activity/all-activities';
const activityTable = document.getElementById("activityTable")
const bookingTable = document.getElementById('bline-table')
const bookingBttn = document.getElementById('book-button')
const activityArray = []

createActivities().catch(err => console.error(err));

function fetchActivities() {
  return fetch(activities).then(response => response.json());
}

async function createActivities() {
  const activityList = await fetchActivities();
  for (let activity of activityList) {
    out(activity)
    let parent = document.getElementById("parent")
    let activityName = document.createElement("div");
    activityName.classList.add("activity-box");
    activityName.setAttribute('id', activity.activityId)
    parent.append(activityName)
    let activityinfo = document.createElement("div");
    activityinfo.classList.add("activity-info")
    activityName.append(activityinfo);
    let activityh2 = document.createElement("h2");
    activityh2.textContent = activity.activityName;
    activityinfo.append(activityh2)
    let activityImgPoster = document.createElement("div");
    activityinfo.append(activityImgPoster);
    activityImgPoster.classList.add("image-poster");
    let activityImage = document.createElement("img");
    activityImgPoster.append(activityImage);
    activityImage.src = activity.activityImageHref;

    let timeTable = document.createElement("div");
    activityName.append(timeTable);
    for (let i = 0; i < times.length; i++) {
      let timeName = document.createElement("button");
      timeName.setAttribute('id', i);
      timeName.classList.add("time-button");
      const tidspunkt = document.createTextNode(times[i]);
      timeName.append(tidspunkt);
      timeTable.append(timeName);
      timeName.addEventListener('click', () => {
        addBookinglineToBooking(activity, times[i])
        activity.activityTime = times[i];
        activityArray.push(activity);
        bookingTotal();

      })
    }
  }
}

function addBookinglineToBooking(activity, time) {
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


}

function bookingTotal() {
  const totalCell = document.getElementById('total');
  let sum = 0;
  for (bookingLine of activityArray) {
    sum += bookingLine.activityPrice;
  }
  totalCell.textContent = sum;
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

async function postBooking() {
  let bookingObjsArray = [];

  //skal komme et andet sted fra, hard coded for nu
  const booking1 = {
    contenderAmount: 4,
  }

  for (let activity of activityArray) {
    const test = await postBookingLine(activity).then(response => response.json())
    const test2 = await test;
    bookingObjsArray.push(test2)
  }
  booking1.bookingLines = bookingObjsArray

  const bookingDate = document.getElementById('document_date').value;
  console.log(bookingDate);
  const bookingDate2 = new Date(bookingDate);
  console.log(bookingDate2);
  const bookingDate3 = bookingDate2.toLocaleDateString('en-CA');
  console.log(bookingDate3);
  booking1.bookingDate = bookingDate3;

  const url = 'http://localhost:8080/api/booking/add'

  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(booking1)
  };
  const response = await fetch(url, fetchOptions).then(response => response.json());
  localStorage["booking-id"] = response.bookingId;
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

bookingBttn.addEventListener('click', async () => {
  await postBooking();
  location.href = 'form.html'
})

async function postBookingLine(activity) {

  const url = 'http://localhost:8080/api/booking-line/add'
  const booklingline = {}
  booklingline.activity = activity;

  booklingline.activityTime = activity.activityTime

  console.log(JSON.stringify(booklingline))
  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(booklingline)
  };
  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response;
}


