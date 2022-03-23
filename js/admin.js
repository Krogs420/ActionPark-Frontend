const activities = 'http://localhost:8080/api/activity/all-activities';
const bookingLine = 'http://localhost:8080/api/booking-line/all-booking-lines';
const customer = 'http://localhost:8080/api/customer/all-customers';
const booking = 'http://localhost:8080/api/booking/all-bookings';
const bookingByDate = 'http://localhost:8080/api/booking/bookingdate/';
const instructor = 'http://localhost:8080/api/instructor/all-instructors';
const bookingOverview = document.getElementById('bview-table')
const searchBtn = document.getElementById('search-button')

function fetchActivities() {
  return fetch(activities).then(response => response.json());
}

function fetchCustomer() {
  return fetch(customer).then(response => response.json());
}

function fetchBookingLine() {
  return fetch(bookingLine).then(response => response.json());
}

function fetchBooking() {
  return fetch(booking).then(response => response.json());
}


function fetchBookingByDate(date) {
  return fetch(bookingByDate + date).then(response => response.json());
}

function fetchInstructor() {
  return fetch(instructor).then(response => response.json());
}

const instructorMap = new Map();

async function createInstructorMap() {
  out("show allinstructors");
  const incstructorList = await fetchInstructor();
  instructorList.forEach((instructor, index) => {
    console.log(instructor.name + "ix=" + index);
    instructorMap.set(instructor.name, instructor);
  })
}

async function addTableOverview() {
  const bookings = await fetchBooking();
  const instructors = await fetchInstructor();
  /* const activity = await fetchActivities();
   const customer = await fetchCustomer();
   const bookingline = await fetchBookingLine();

   */
  console.log(bookings)

  const tbody = document.createElement('tbody')
  tbody.setAttribute('id', 'tbodyadmin')

  for (let booking of bookings) {
    for (let i = 0; i < booking.bookingLines.length; i++) {

      const td1 = document.createElement('td');
      td1.textContent = booking.bookingId;
      const tableRow = document.createElement('tr');
      const td2 = document.createElement('td');
      td2.textContent = booking.bookingLines[i].activity.activityName;
      const td3 = document.createElement('td');
      td3.textContent = booking.bookingLines[i].activityTime;
      const td4 = document.createElement('td');
      td4.textContent = booking.customer.customerPhoneNum;
      const td5 = document.createElement('select');
      td5.textContent = booking.bookingLines[i].activityInstructor;
      let ix = 0;
      /* instructorMap.forEach(instructor => {


       */

      for (let instructor of instructors) {
        console.log("hej :)" + instructor.name)

        const el = document.createElement("option");
        el.textContent = instructor.instructorName;
        td5.appendChild(el);
        if (instructor.instructorName === instructor.instructorName) {
          td5.selectedIndex = ix;
        }
        ix++;
        td5.addEventListener("change", (event) => {
          const selectedIx = td5.selectedIndex;
          const opt = td5.options[selectedIx];
          /*instructor.instructor = instructor.get(opt.value);

           */
        })
      }


      tableRow.append(td1);
      tableRow.append(td2);
      tableRow.append(td3);
      tableRow.append(td4);
      tableRow.append(td5);
      tbody.append(tableRow);
      bookingOverview.append(tbody)
      console.log("fgedgdfg");
    }
  }

}

async function restUpdateInstructor(instructor) {
  const url = "http://localhost:8080/update/" + instructor.instructorId;

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: ""
  }

  const jsonString = JSON.stringify(instructor);
  fetchOptions.body = jsonString;

  //calls backend and wait for return
  const response = await fetch(url, fetchOptions);

  out(response);
  if (!response.ok) {
    out("Det gik ikke godt med update");
  }


  return response;
}

/*

 let cell = row.insertCell(colCount++);

//Create a dropdown
cell = row.insertCell(colCount++);
const ddRegion = document.createElement("select");
let ix = 0;
regionMap.forEach(region => {
  const el = document.createElement("option");
  el.textContent = region.name;
  el.value = region.regionCode;
  ddRegion.appendChild(el);
  if (region.regionCode == county.region.regionCode) {
    ddRegion.selectedIndex = ix;
  }
  ix++;
  ddRegion.addEventListener("change", (event) => {
    const selind = ddRegion.selectedIndex;
    const opt = ddRegion.options[selind];
    county.region = regionMap.get(opt.value);
  })
});
cell.appendChild(ddRegion);
//end dropdown

 */


addTableOverview(activities, customer, booking, bookingLine);

async function getByDate() {
  console.log("Fisken er stor");
  const bookingDate = document.getElementById('document_date').value;
  const bookingDate2 = new Date(bookingDate);
  const bookingDate3 = bookingDate2.toLocaleDateString('en-CA');
  const bookings = await fetchBookingByDate(bookingDate3);
  const instructors = await fetchInstructor();

  console.log(bookings);

  const table = document.getElementById('bview-table')

  const tbody = document.getElementById('tbodyadmin')
  tbody.innerHTML = ""

  for (let booking of bookings) {
    for (let i = 0; i < booking.bookingLines.length; i++) {

      const td1 = document.createElement('td');
      td1.textContent = booking.bookingId;
      const tableRow = document.createElement('tr');
      const td2 = document.createElement('td');
      td2.textContent = booking.bookingLines[i].activity.activityName;
      const td3 = document.createElement('td');
      td3.textContent = booking.bookingLines[i].activityTime;
      const td4 = document.createElement('td');
      td4.textContent = booking.customer.customerPhoneNum;
      const td5 = document.createElement('select');
      td5.textContent = booking.bookingLines[i].activityInstructor;
      let ix = 0;

      for (let instructor of instructors) {
        console.log("hej :)" + instructor.name)

        const el = document.createElement("option");
        el.textContent = instructor.instructorName;
        td5.appendChild(el);
        if (instructor.instructorName === instructor.instructorName) {
          td5.selectedIndex = ix;
        }
        ix++;
        td5.addEventListener("change", (event) => {
          const selectedIx = td5.selectedIndex;
          const opt = td5.options[selectedIx];
          /*instructor.instructor = instructor.get(opt.value);

           */
        })
      }

      tableRow.append(td1);
      tableRow.append(td2);
      tableRow.append(td3);
      tableRow.append(td4);
      tableRow.append(td5);
      tbody.append(tableRow)
      bookingOverview.append(tbody)
      console.log("fgedgdfg");
    }
  }
}

searchBtn.addEventListener('click', getByDate);

