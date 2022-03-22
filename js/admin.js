const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const activities = 'http://localhost:8080/api/activity/all-activities';
const bookingLine = 'http://localhost:8080/api/bookingline/all-booking-lines';
const customer = 'http://localhost:8080/api/customer/all-customers';
const booking = 'http://localhost:8080/api/booking/all-bookings';
const bookingOverview = document.getElementById('bview-table')

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

async function addTableOverview() {
  const bookings = await fetchBooking();
  const activity = await fetchActivities();
  const customer = await fetchCustomer();
  const bookingline = await fetchBookingLine();

  for (let x of bookings) {
    const tableRow = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = activity.activityName;
    const td2 = document.createElement('td');
    td2.textContent = activity.toString();
    const td3 = document.createElement('td');
    td3.textContent = customer.customerPhoneNum;
    const td4 = document.createElement('td');
    td4.textContent = booking.bookingId;
    const td5 = document.createElement('td');
    td5.textContent = bookingline.activityInstructor;
    tableRow.append(td1);
    tableRow.append(td2);
    tableRow.append(td3);
    tableRow.append(td4);
    tableRow.append(td5);
    bookingOverview.append(tableRow)
    console.log("fgedgdfg");
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

addTableOverview(activities, customer, booking, bookingLine);

