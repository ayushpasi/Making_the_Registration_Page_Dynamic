// Get the form element by its ID
var form = document.getElementById("my-form");

// Add a submit event listener to the form
form.addEventListener("submit", saveData);

// Get the "users" ul element
var user = document.getElementById("users");

// Function to handle form submission
function saveData(e) {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Get the values from the input fields
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;

  // Create an object to store the user data
  var dataObj = {
    name: name,
    email: email,
    mobile: mobile,
  };

  axios
    .post(
      "https://crudcrud.com/api/832d19e4675b4275b12a83d9b049af91/appointmentData",
      dataObj
    )
    .then((res) => {
      console.log(res.data);
      showData(res.data);
    })
    .catch((err) => {
      document.body.innerHTML = "Somthing went wrong";
      console.log(err);
    });
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mobile").value = "";
  // Convert the data object to a JSON string
  //var data = JSON.stringify(dataObj);

  // Store the JSON data in local storage with the email as the key
  // localStorage.setItem(email, data);
}
// Function to remove a user when the delete button is clicked
function removeUser(e) {
  if (confirm("Are you sure?")) {
    var li = e.target.parentNode;
    user.removeChild(li);
    var emailDelete = findEmail(li);
    localStorage.removeItem(emailDelete[1].trim());
  }
}
// Function to split and extract the name, email, and mobile from the list item
function findEmail(li) {
  var text = li.textContent;
  var parts = text.split("  ");
  if (parts.length > 1) {
    return parts;
  }
  return null;
}

// Function to handle editing user data
function editData(e) {
  var li = e.target.parentNode;
  user.removeChild(li);
  var formData = findEmail(li);

  // Extract the name, email, and mobile separately
  var name = formData[0].trim();
  var email = formData[1].trim();
  var mobile = formData[2].trim();

  // Set the form fields with the extracted values for editing
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("mobile").value = mobile;
}

function showData(obj) {
  // Create a new list item element
  var li = document.createElement("li");

  // Add a class "item" to the list item
  li.className = "item";

  // Create a text node with user data and append it to the list item
  li.appendChild(
    document.createTextNode(
      obj.name + "  " + obj.email + "  " + obj.mobile + "  "
    )
  );

  // Create a delete button element
  var btn = document.createElement("button");

  // Add a class "delete" to the button
  btn.className = "delete";

  // Add text "delete" to the button
  btn.appendChild(document.createTextNode("delete"));

  // Add a click event listener to the delete button
  btn.addEventListener("click", removeUser);

  // Create an edit button element
  var edit = document.createElement("button");

  // Add a class "edit" to the button
  edit.className = "edit";

  // Add text "edit" to the button
  edit.appendChild(document.createTextNode("edit"));

  // Add a click event listener to the edit button
  edit.addEventListener("click", editData);

  // Append the edit and delete buttons to the list item
  li.appendChild(edit);
  li.appendChild(btn);

  // Append the list item to the "users" ul
  user.appendChild(li);

  // Log the data stored in local storage for the given email
  console.log(localStorage.getItem(email));

  // Clear the form fields after submission
}
function fetchAndShowData() {
  axios
    .get(
      "https://crudcrud.com/api/832d19e4675b4275b12a83d9b049af91/appointmentData"
    )
    .then((res) => {
      var data = res.data;
      data.forEach((item) => {
        showData(item);
      });
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
}

// Call the fetchAndShowData function on page load to display existing data
fetchAndShowData();
