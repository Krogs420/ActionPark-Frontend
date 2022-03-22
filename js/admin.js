const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const activities = 'http://localhost:8080/api/activity/all-activities';
const bookingLine = 'http://localhost:8080/api/booking-line/all-booking-lines';
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
  const bookingList = await fetchBooking();

  for (let x of bookingList) {
    const tableRow = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = x.bookingId;

    const td2 = document.createElement('td')
    td2.textContent = x.totalPrice
    tableRow.append(td1);
    tableRow.append(td2);
    bookingOverview.append(tableRow)
    console.log("fgedgdfg");
  }

}

addTableOverview(activities, customer, booking, bookingLine);

