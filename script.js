/*
  Name: Anthony Liang
  Course: GUI I
  Email: anthony_liang@student.uml.edu
*/
// setting all elements in html to values in javascript
const tbody = document.getElementById("tbody");
const thead = document.getElementById("thead");
const formDiv = document.getElementById("form-div");
const err = document.getElementById("err");

// Function to generate the table based on user input
function generateTable() {
  var min_col_val = parseInt(document.getElementById("min_col_val").value);
  var max_col_val = parseInt(document.getElementById("max_col_val").value);
  var min_row_val = parseInt(document.getElementById("min_row_val").value);
  var max_row_val = parseInt(document.getElementById("max_row_val").value);

  // clears tbody and thead for empty table
  tbody.innerHTML = "";
  thead.innerHTML = "";

  // create a table row element specifically for the header
  const trHeader = document.createElement("tr");
  // append a table header to the table row
  trHeader.appendChild(document.createElement("th"));
  // iterate through columns and create table header cells
  for (var col = min_col_val; col <= max_col_val; col++) {
    const th = document.createElement("th");
    th.innerText = col;
    trHeader.appendChild(th);
  }
  thead.appendChild(trHeader);

  // iterate through rows to create table data rows
  for (var row = min_row_val; row <= max_row_val; row++) {
    // create a table row element for data
    const trData = document.createElement("tr");
    // create a table header cell for the row header
    const th = document.createElement("th");
    th.innerText = row;
    trData.appendChild(th);
    // iterate through columns and create table header cells
    for (var col = min_col_val; col <= max_col_val; col++) {
      const td = document.createElement("td");
      // calculate and display the result in the cell
      const result = row * col;
      td.innerText = result;
      // append the data cell to the data row
      trData.appendChild(td);
    }
    tbody.appendChild(trData); // append
  }
}

function formValidate() {
  /* the following two methods are used to check whether or not the the minimum values are bigger than the maximum value */
  /* https://jqueryvalidation.org/jQuery.validator.addMethod/ */
  // create a new method to check the minimum column value
  $.validator.addMethod(
    "minColValCheck",
    // references element, then value of the element, and then parses as an int to make sure max val is bigger than min val
    function (e, val, params) {
      var minValInput = $("#" + params[0]);
      var maxValInput = $("#" + params[1]);
      return parseInt(minValInput.val()) <= parseInt(maxValInput.val());
    },
    "Min col value must be less than or equal to the max value."
  );
  /* https://jqueryvalidation.org/jQuery.validator.addMethod/ */
  // create a new method to check the minimum row value
  $.validator.addMethod(
    "minRowValCheck",
    // references element, then value of the element, and then parses as an int to make sure max val is bigger than min val
    function (e, val, params) {
      // create jquery
      var minField = $("#" + params[0]);
      var maxField = $("#" + params[1]);
      return parseInt(minField.val()) <= parseInt(maxField.val());
    },
    "Min row value must be less than or equal to the max value."
  );

  $("#form").validate({
    /* create rules for the form to validate */
    rules: {
      min_col_val: {
        required: true,
        number: true,
        min: -250,
        max: 250,
      },
      max_col_val: {
        required: true,
        number: true,
        min: -250,
        max: 250,
        minColValCheck: ["min_col_val", "max_col_val"], // use the jquery method created earlier to check between min and max col value
      },
      min_row_val: {
        required: true,
        number: true,
        min: -250,
        max: 250,
      },
      max_row_val: {
        required: true,
        number: true,
        min: -250,
        max: 250,
        minRowValCheck: ["min_row_val", "max_row_val"], // use the jquery method created earlier to check between min and max row value
      },
    },
    // error messages to direct user to finding/correcting them
    messages: {
      min_col_val: {
        required: "No number found for min col, please enter a number.",
      },
      max_col_val: {
        required: "No number found for max col, please enter a number."
      },
      min_row_val: {
        required: "No number found for min row, please enter a number."
      },
      max_row_val: {
        required: "No number found for max row, please enter a number."
      }
    },
    // only run the following functions if the form passes validation successfully
    submitHandler: function (form) {
      if ($("#form").valid() == true) {
        generateTable(); // generate table only if there are no errors
        form.reset(); // clear form data after successful submission
      }
    },
    // create the error statement element as a div and put it after the input field
    errorElement: "div",
    errorPlacement: function (error, element) {
      element.after(error);
    },
  });
}

formValidate();
