const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const activities = 'http://localhost:8080/api/activity/all-activities';
const bookingLine = 'http://localhost:8080/api/booking-line/all-booking-lines';
const customer = 'http://localhost:8080/api/customer/all-customers';
const booking = 'http://localhost:8080/api/booking/all-bookings';
const bookingByDate = 'http://localhost:8080/api/booking/bookingdate/';
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

async function addTableOverview() {
  const bookings = await fetchBooking();
  const activity = await fetchActivities();
  const customer = await fetchCustomer();
  const bookingline = await fetchBookingLine();
  console.log(bookings)

  for (let booking of bookings) {
    for (let i = 0; i<booking.bookingLines.length; i++) {

    const td1 = document.createElement('td');
    td1.textContent = booking.bookingId;
    const tableRow = document.createElement('tr');
    const td2 = document.createElement('td');
    td2.textContent = booking.bookingLines[i].activity.activityName;
    const td3 = document.createElement('td');
    td3.textContent = booking.bookingLines[i].activityTime;
    const td4 = document.createElement('td');
    td4.textContent = booking.customer.customerPhoneNum;
    const td5 = document.createElement('td');
    td5.textContent = booking.bookingLines[i].activityInstructor;
    tableRow.append(td1);
    tableRow.append(td2);
    tableRow.append(td3);
    tableRow.append(td4);
    tableRow.append(td5);
    bookingOverview.append(tableRow)
    console.log("fgedgdfg");
    }
  }

}

addTableOverview(activities, customer, booking, bookingLine);

async function getByDate() {
  const bookingDate = document.getElementById('document_date').value;
  const bookingDate2 = new Date(bookingDate);
  const bookingDate3 = bookingDate2.toLocaleDateString('en-CA');
  const bookings = await fetchBookingByDate(bookingDate3);
  console.log(bookings);
}

searchBtn.addEventListener('click', getByDate);
