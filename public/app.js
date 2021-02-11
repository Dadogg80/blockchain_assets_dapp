
var database;
var refEmployees;

$('document').ready(function() {
    // Initialize database
    database = firebase.database();
    // sets the reference to the database collection as refEmployees
    refEmployees = database.ref('Assets/Employees');
    // Event listener for the submitButton
    $('#submitButton').on('click', submitData);
    // Listen for new data entries in the database
    refEmployees.on('value', gotData, errData);

    console.log(firebase, database);

    
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".file-upload").on('change', function(){
        readURL(this);
    });
});

// Submit the data from the Employee form
function submitData() {   
    var company = $('#inputCompany').val();    
    var first = $('#inputFirst').val();    
    var last = $('#inputLast').val();    
    var email = $('#inputEmail').val();    
    var location = $('#inputLocation').val();    
    var startDate = $('#inputStartDate').val();    
    var role = $('#inputRole').val();    
    var salary = $('#inputSalary').val();    
    var account = $('#inputAccount').val();    
    var department = $('#inputDepartment').val();    
    var textField = $('#inputTextField').val();    

    var data = {
        company: company,
        first: first,
        last: last,
        email: email,
        location: location,
        startDate: startDate,
        role: role,
        salary: salary,
        account: account,
        department: department, 
        textField: textField
    }
     
    console.log(data);
    refEmployees.push(data);
    return data;
}


function gotData(data) {
    var employees = data.val();
    var keys = Object.keys(employees);
    for ( var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var employee = employees[k];
        var company = employee.company;
        var first = employee.first;
        var last = employee.last;
        var email = employee.email;
        var location = employee.location;
        var startDate = employee.startDate;
        var role = employee.role;
        var salary = employee.salary;
        var account = employee.account;
        var department = employee.department;
        var textField = employee.textField;
        

        $("#table_output").append(
            $(`<tr></tr>`).html(`
            <td>${company}</td>
            <td>${first} ${last}</td>
            <td>${email}</td>
            <td class="text-primary">$${salary}</td>
            <td>${location}</td>
            `)      
        );
        console.log(company, first, last, email, location, startDate, role, salary, account, department, textField);
    }
}

function errData(data) {
    console.log('Error!');
    console.log(err);
}
