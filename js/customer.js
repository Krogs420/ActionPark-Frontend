const getCustomersUrl = 'http://localhost:8080/api/customer/all-customers';
const postCustomerUrl = 'http://localhost:8080/api/customer/add';
const getCustomerUrl = 'http://localhost:8080/api/customer/';

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
    await postFormDataAsJson(url, formData);
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

}
