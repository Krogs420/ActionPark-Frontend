const postCustomerUrl = 'http://localhost:8080/api/customer/add';


const out = function (str) {
  console.log(str);
}


//execute function createFormEventListener when html is loaded
document.addEventListener('DOMContentLoaded', createFormEventListener);


function createFormEventListener() {
  const customerForm = document.getElementById('new-customer-form');
  customerForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const url = postCustomerUrl;

  try {
    const formData = new FormData(form);
    const customer = await postFormDataAsJson(url, formData).then(response => response.json());
    await getBooking(customer, localStorage["booking-id"])
    localStorage.clear();
    location.href = 'confirmation.html';
  } catch (err) {
    alert(err.message);
    out(err);
  }
}


async function postFormDataAsJson(url, formData) {

  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: formDataJsonString
  };

  const response = await fetch(url, fetchOptions);
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response;
}

async function getBooking(customer, id) {
  const url = 'http://localhost:8080/api/booking/' + id;
  const booking = await fetch(url).then(response => response.json());
  booking.customer = customer;
  await updateBooking(booking);

}

async function updateBooking(booking) {
  const url = 'http://localhost:8080/api/booking/update/' + booking.bookingId;

  const fetchOptions = {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(booking)
  };

  const response = await fetch(url, fetchOptions)
  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  return response;
}


