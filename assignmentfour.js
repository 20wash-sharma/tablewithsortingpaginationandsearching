//global variables
var name, locationof, phone, address, email, inlinedata, lastname, salary;
var currentPage = 0;
var numPerPage = 5;

//view button click start
$("#viewbutton").click(function () {
    $("#dlbootstrap").remove();
    var id;
    var row;
    $("input:checkbox").each(function () {
        var $this = $(this);

        if ($this.is(":checked")) {
            id = $this.attr("id").substr(8);
            // alert(id);
            // row = $(this).parent().parent().children().index($(this).parent());
            row = $this.parent().parent().index();

        }


    });

    var retrievedObject = localStorage.getItem('testObject');


    var originalObject = JSON.parse(retrievedObject);



    var html;



    for (var i in originalObject)
    {

        if (parseInt(originalObject[i].id) === parseInt(id)) {

            html = '<tr  id="dlbootstrap"><td colspan="6"><dl id="slidedowndl" style="display:none;" class="dl-horizontal">  <dt>Name</dt>  <dd>' + originalObject[i].name + '</dd>  <dt>Location</dt>  <dd>' + originalObject[i].location + '</dd>  <dt>Phone</dt>  <dd>' + originalObject[i].phone + '</dd><dt>Address</dt>  <dd>' + originalObject[i].address + '</dd><dt>Email</dt>  <dd>' + originalObject[i].email + '</dd><dt>Salary</dt>  <dd>' + originalObject[i].salary + '</dd><dt>Lastname</dt>  <dd>' + originalObject[i].lastname + '</dd><dt></dt>  <dd><button id="viewportremove" class="btn btn-danger">close</button></dl></td></tr>';

        }

    }
    $('#myTable > tbody > tr').eq(row).after(html);
//$("#dlbootstrap").removeClass("hidden");
    $("#slidedowndl").slideDown();
});//view button click end



//viewport bootstrap clicked start
$("#myTable").on("click", "#viewportremove", function () {
    $("#slidedowndl").slideUp();
    setTimeout(function () {
        $("#dlbootstrap").remove();
    }, 400);

});//viewport bootstrap clicked end



//bulk select starts
$(function () {
    $('#bulkselect').change(function () {
        if ($(this).is(":checked")) {
            var greaterthan = (currentPage + 1) * numPerPage;
            var lessthan = currentPage * numPerPage;
            $('#myTable tr .selectcheckbox').slice(lessthan, greaterthan).prop('checked', true);
            $('#myTable tr').slice(lessthan + 1, greaterthan + 1).addClass("selected");
            $("#editbutton").attr("disabled", "disabled");
            $("#viewbutton").attr("disabled", "disabled");
            $("#deletebutton").removeAttr("disabled");
        } else {
            $('.selectcheckbox').parents('tr').removeClass("selected");
            $('#myTable .selectcheckbox').prop('checked', false);
            $("#editbutton").attr("disabled", "disabled");
            $("#viewbutton").attr("disabled", "disabled");
            $("#deletebutton").attr("disabled", "disabled");
        }

    });

});//bulk select ends
//no of rows per page select box change event starts
$('#Numberofpages').on('change', function () {
    $('#bulkselect').prop('checked', false);
    numPerPage = this.value;
    if($("#search").val())
    {
        var numRows = $('#myTable').find('tbody tr').length;
   

    var numPages = Math.ceil(numRows / numPerPage);
   // alert(currentPage+'and'+numPages)
        if(currentPage >= numPages)
            currentPage=0;
     filterTableElements();   
    }
        
    else{
        currentPage = 0;
     populateInTable();
   
    }
    
});
//no of rows per page select box change event ends
//for the striped color start
$.fn.alternateRowColors = function () {

    $('tbody tr:odd', this).removeClass('even').addClass('odd');

    $('tbody tr:even', this).removeClass('odd').addClass('even');

    return this;

};

//for the striped color ends

//data populate starts
function populateInTable()
{
    $("#dlbootstrap").remove();
    $("#editbutton").attr("disabled", "disabled");
    $("#deletebutton").attr("disabled", "disabled");
    $("#viewbutton").attr("disabled", "disabled");

    var table = document.getElementById('myTable');
    $tablee = table;
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    var retrievedObject = localStorage.getItem('testObject');


    var originalObject = JSON.parse(retrievedObject);

    originalObject.sort(function (a, b) {
        return (parseInt(a.id) < parseInt(b.id)) ? 1 : ((parseInt(b.id) < parseInt(a.id)) ? -1 : 0);
    });
    console.log(originalObject);
    for (var i in originalObject)
    {
        $('#myTable tbody').append('<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="name-' + originalObject[i].id + '">' + originalObject[i].name + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location + '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="address-' + originalObject[i].id + '">' + originalObject[i].address + '</td><td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email + '</td></tr>');

    }
    $('table.sortable').each(function () {

        var $table = $(this);
        $table.alternateRowColors($table);
        //currentPage = 0;
        paginateTheTable($table);
    });

}

//data populate ends
//function add or update handler starts 
function addOrUpdateHandler(event) {
    event.preventDefault();
    var lights = document.getElementsByClassName("has-error");
    while (lights.length)
        lights[0].className = lights[0].className.replace(/\bhas-error\b/g, "");
    var elements = document.getElementsByClassName('errormsg');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

    var validationflag = validateForm();

    if (validationflag && $("#submitbuttonid").attr("data-addedit") === 'add') {
        addTheData();
    } else if (validationflag && $("#submitbuttonid").attr("data-addedit") === 'edit') {
        updateTheData();
    }
    return false;
}
//function add or update handler ends
//validating form data starts
function validateForm() {


    name = document.forms["myForm"]["fname"].value;
    locationof = document.forms["myForm"]["flocation"].value;
    phone = document.forms["myForm"]["fphone"].value;
    address = document.forms["myForm"]["faddress"].value;
    email = document.forms["myForm"]["femail"].value;
    lastname = document.forms["myForm"]["flastname"].value;
    salary = document.forms["myForm"]["fsalary"].value;



    var validation_success = true;
    if (salary === "") {
        document.forms["myForm"]["fsalary"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">salary must be filled out!<span>');

        document.forms["myForm"]["fsalary"].parentElement.className += " has-error";


        validation_success = false;

    } else if (isNaN(salary))
    {
        document.forms["myForm"]["fsalary"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The  salary should be Numbers only!<span>');

        document.forms["myForm"]["fsalary"].parentElement.className += " has-error";


        validation_success = false;

    }
    if (lastname === "") {
        document.forms["myForm"]["flastname"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Lastname must be filled out!<span>');

        document.forms["myForm"]["flastname"].parentElement.className += " has-error";

        validation_success = false;
    } else if (lastname.length < 2)
    {
        document.forms["myForm"]["flastname"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The length of lastname should be atleast 2 characters!<span>');

        document.forms["myForm"]["flastname"].parentElement.className += " has-error";


        validation_success = false;

    }
    if (name === "") {
        document.forms["myForm"]["fname"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Name must be filled out!<span>');

        document.forms["myForm"]["fname"].parentElement.className += " has-error";

        validation_success = false;
    } else if (name.length < 2)
    {
        document.forms["myForm"]["fname"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The length of Name should be atleast 2 characters!<span>');

        document.forms["myForm"]["fname"].parentElement.className += " has-error";


        validation_success = false;

    }
    if (locationof === "") {
        document.forms["myForm"]["flocation"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">location must be filled out!<span>');

        document.forms["myForm"]["flocation"].parentElement.className += " has-error";


        validation_success = false;

    } else if (locationof.length < 2)
    {
        document.forms["myForm"]["flocation"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The length of Location should be atleast 2 characters!<span>');

        document.forms["myForm"]["flocation"].parentElement.className += " has-error";


        validation_success = false;

    }
    if (phone === "") {
        document.forms["myForm"]["fphone"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">phone must be filled out!<span>');

        document.forms["myForm"]["fphone"].parentElement.className += " has-error";


        validation_success = false;

    } else if (phone.length < 2)
    {
        document.forms["myForm"]["fphone"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The length of phone should be atleast 2 characters!<span>');

        document.forms["myForm"]["fphone"].parentElement.className += " has-error";


        validation_success = false;

    } else if (isNaN(phone))
    {
        document.forms["myForm"]["fphone"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The  phone should be Numbers only!<span>');

        document.forms["myForm"]["fphone"].parentElement.className += " has-error";


        validation_success = false;

    }
    if (address === "") {
        document.forms["myForm"]["faddress"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">address must be filled out!<span>');

        document.forms["myForm"]["faddress"].parentElement.className += " has-error";


        validation_success = false;

    } else if (address.length < 2)
    {
        document.forms["myForm"]["faddress"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The length of address should be atleast 2 characters!<span>');

        document.forms["myForm"]["faddress"].parentElement.className += " has-error";


        validation_success = false;

    }
    if (email === "") {
        document.forms["myForm"]["femail"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">email must be filled out!<span>');

        document.forms["myForm"]["femail"].parentElement.className += " has-error";


        validation_success = false;

    } else if (email.length < 2)
    {
        document.forms["myForm"]["femail"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The length of email should be atleast 2 characters!<span>');

        document.forms["myForm"]["femail"].parentElement.className += " has-error";


        validation_success = false;

    } else
    {
        var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(emailformat))
        {
            document.forms["myForm"]["femail"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">The email should be in proper format!<span>');

            document.forms["myForm"]["femail"].parentElement.className += " has-error";



            validation_success = false;


        }


    }


    return validation_success;
}
//validating form data ends




//delete start
function deleteSelectedRow(event) {
    event.preventDefault();
    var arr = $('input:checkbox.selectcheckbox:checked').map(function () {
        return this.id;
    }).get();
    console.log(arr);


    var retrievedObject = localStorage.getItem('testObject');


    var originalObject = JSON.parse(retrievedObject);

    for (var j in arr)
    {
        var temp = arr[j];

        console.log(temp);
        var id = temp.toString().substr(8);
        for (var i in originalObject)
        {
            console.log(' id from sub' + id + '/idfrom looping' + originalObject[i].id + '/indexvalueofi' + i);
            if (parseInt(originalObject[i].id) === parseInt(id)) {
                originalObject.splice(i, 1);
                //console.log('matchfound');

            }

        }



    }
    console.log(originalObject);
    localStorage.setItem('testObject', JSON.stringify(originalObject));
    $(".close").trigger("click");
    $("#editbutton").attr("disabled", "disabled");
    $("#deletebutton").attr("disabled", "disabled");
    $("#viewbutton").attr("disabled", "disabled");
    $("#search").val('');
    $('#bulkselect').prop('checked', false);
    populateInTable();
}
//delete end



//first thing to do when page loads checking local storage and getting json data with ajax if not starts
var getStudentJSONData = function () {
    var promise = new Promise(function (resolve, reject) {

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                if (xmlhttp.status === 200) {

                    resolve(xmlhttp.response);



                } else if (xmlhttp.status === 400) {
                    alert('There was an error 400');
                } else {
                    alert('something else other than 200 was returned');
                }
            }
        };

        xmlhttp.open("GET", "info.json");
        xmlhttp.responseType = 'json';


        xmlhttp.send();



    });
    return promise;
};
var retrievedObject = localStorage.getItem('testObject');
if (!retrievedObject) {
    var fn_return = getStudentJSONData();
    fn_return.then(function (success_response) {


        localStorage.setItem('testObject', JSON.stringify(success_response));

        populateInTable();

    },
            function (err) {
                document.write(err);
            });
}//if local storage is not available
else {
    populateInTable();

}

//first thing to do when page loads checking local storage and getting json data with ajax if not ends
//add button clicked starts
$("#addbutton").click(function () {
    $("#exampleModalLabel").html('Add Info');
    $("#submitbuttonid").attr("data-addedit", 'add');
    document.forms["myForm"].reset();
});
//add button clicked ends
//edit button clicked starts
$("#editbutton").click(function () {
    $("#exampleModalLabel").html('Edit Info');
    $("#submitbuttonid").attr("data-addedit", 'edit');
    var id;
    $("input:checkbox").each(function () {
        var $this = $(this);

        if ($this.is(":checked")) {
            id = $this.attr("id").substr(8);
            // alert(id);
        }

    });

    var retrievedObject = localStorage.getItem('testObject');


    var originalObject = JSON.parse(retrievedObject);

    console.log(originalObject);




    for (var i in originalObject)
    {

        if (parseInt(originalObject[i].id) === parseInt(id)) {
            document.forms["myForm"]["fname"].value = originalObject[i].name;
            document.forms["myForm"]["flocation"].value = originalObject[i].location;
            document.forms["myForm"]["fphone"].value = originalObject[i].phone;
            document.forms["myForm"]["faddress"].value = originalObject[i].address;
            document.forms["myForm"]["femail"].value = originalObject[i].email;
            document.forms["myForm"]["fsalary"].value = originalObject[i].salary;
            document.forms["myForm"]["flastname"].value = originalObject[i].lastname;

        }

    }








});
//edit button clicked ends
//add data starts
function addTheData() {

    var retrievedObject = localStorage.getItem('testObject');
    var originalObject = JSON.parse(retrievedObject);
    if (originalObject.length > 0)
    {


        var maxid = Math.max.apply(Math, originalObject.map(function (o) {
            return o.id;
        }));
        maxid = maxid + 1;
        originalObject.push({"id": maxid, "name": name, "location": locationof, "phone": phone, "address": address, "email": email, "salary": salary, "lastname": lastname});




    } else {
        originalObject.push({"id": 1, "name": name, "location": locationof, "phone": phone, "address": address, "email": email, "salary": salary, "lastname": lastname});





    }
    localStorage.setItem('testObject', JSON.stringify(originalObject));




    console.log(localStorage.getItem('testObject'));


    populateInTable();

    $("#search").val('');

    document.forms["myForm"].reset();
    $(".close").trigger("click");

}//add data ends

//edit start
function updateTheData() {

    var arr = $('input:checkbox.selectcheckbox:checked').map(function () {
        return this.id;
    }).get();
    console.log(arr);



    var id;
    for (var j in arr)
    {
        var temp = arr[j];

        console.log(temp);
        id = temp.toString().substr(8);




    }
    var retrievedObject = localStorage.getItem('testObject');


    var originalObject = JSON.parse(retrievedObject);
    for (var i in originalObject)
    {
        console.log(' id from sub' + id + '/idfrom looping' + originalObject[i].id + '/indexvalueofi' + i);
        if (parseInt(originalObject[i].id) === parseInt(id)) {
            originalObject[i].name = name;
            originalObject[i].location = locationof;
            originalObject[i].phone = phone;
            originalObject[i].address = address;
            originalObject[i].email = email;
            originalObject[i].salary = salary;
            originalObject[i].lastname = lastname;



        }

    }
    console.log(originalObject);
    localStorage.setItem('testObject', JSON.stringify(originalObject));
    document.forms["myForm"].reset();
    $(".close").trigger("click");
    $("#editbutton").attr("disabled", "disabled");
    $("#deletebutton").attr("disabled", "disabled");
    $("#viewbutton").attr("disabled", "disabled");
    if($("#search").val())
        filterTableElements();
    else{
     populateInTable();
   
    }
    
}
//edit end


//when td is clicked for inline editing starts
$("#myTable").on("click", ".selectotherfields", function () {



    var data = $(this).attr('id');
    inlinedata = $("#" + data).html();
    console.log(data);
    $("#" + data).html('<input class="tableinputforupdate form-control" id="input-' + data + '" onfocus="this.value = this.value;" type="text"  value="' + $("#" + data).html() + '"/>');
    $("#input-" + data).focus();


});
//when td is clicked for inline editing ends

$("#myTable").on("blur", ".tableinputforupdate", function (event) {
    var parentid = $(this).parent().attr('id');
    $("#" + parentid).html(inlinedata);


});
//when input box is clicked for stopping propagation starts
$("#myTable").on("click", ".tableinputforupdate", function (event) {
    event.stopPropagation();



});
//when input box is clicked for stopping propagation ends



//when the enter key is pressed for inline editing starts

$("#myTable").on("keypress", ".tableinputforupdate", function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {

        var array = this.id.split('-');
        console.log(array);
        var validation_success = true;
        var generalvalue = $("#" + this.id).val();
        var elements = document.getElementsByClassName('inputerrormsg');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
        if (array[1] === 'name')
        {



            if (generalvalue === "") {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">Name must be filled out!<span>');


                validation_success = false;
            } else if (generalvalue.length < 2)
            {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The length of Name should be atleast 2 characters!<span>');




                validation_success = false;

            }
            console.log(array[1] + '/' + array[2]);
        } else if (array[1] === 'location')
        {

            if (generalvalue === "") {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">Location must be filled out!<span>');


                validation_success = false;
            } else if (generalvalue.length < 2)
            {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The length of Location should be atleast 2 characters!<span>');




                validation_success = false;

            }
            console.log(array[1] + '/' + array[2]);
        } else if (array[1] === 'phone')
        {
            if (generalvalue === "") {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">Phone must be filled out!<span>');


                validation_success = false;
            } else if (generalvalue.length < 2)
            {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The length of Phone should be atleast 2 characters!<span>');




                validation_success = false;

            } else if (isNaN(generalvalue)) {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The  phone should be Numbers only!<span>');




                validation_success = false;
            }
            console.log(array[1] + '/' + array[2]);
        } else if (array[1] === 'address')
        {
            if (generalvalue === "") {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">Address must be filled out!<span>');


                validation_success = false;
            } else if (generalvalue.length < 2)
            {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The length of Address should be atleast 2 characters!<span>');




                validation_success = false;

            }
            console.log(array[1] + '/' + array[2]);
        } else if (array[1] === 'email')
        {
            if (generalvalue === "") {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">Email must be filled out!<span>');


                validation_success = false;
            } else if (generalvalue.length < 2)
            {
                document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The length of Email should be atleast 2 characters!<span>');




                validation_success = false;

            } else
            {
                var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!generalvalue.match(emailformat))
                {
                    document.getElementById(this.id).insertAdjacentHTML('afterEnd', '<span class="inputerrormsg text-danger">The email should be in proper format!<span>');




                    validation_success = false;

                }
            }
            console.log(array[1] + '/' + array[2]);
        }

        if (validation_success)
        {
            var retrievedObject = localStorage.getItem('testObject');


            var originalObject = JSON.parse(retrievedObject);
            for (var i in originalObject)
            {
                if (parseInt(originalObject[i].id) === parseInt(array[2])) {
                    if (array[1] === 'name')
                        originalObject[i].name = generalvalue;
                    else if (array[1] === 'location')
                        originalObject[i].location = generalvalue;

                    else if (array[1] === 'phone')
                        originalObject[i].phone = generalvalue;
                    else if (array[1] === 'address')
                        originalObject[i].address = generalvalue;
                    else if (array[1] === 'email')
                        originalObject[i].email = generalvalue;







                }

            }



            console.log(this.id);
            localStorage.setItem('testObject', JSON.stringify(originalObject));
            $("#editbutton").attr("disabled", "disabled");
            $("#viewbutton").attr("disabled", "disabled");
            $("#deletebutton").attr("disabled", "disabled");
            if ($("#search").val())
                filterTableElements();
            else {

                populateInTable();

            }
           

        }
    } //if key code is 13 ie. enter             

});
//when the enter key is pressed for inline editing ends
//check box when clicked triggerd events start
$("#myTable").on("click", ".selectcheckbox", function () {
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[class='selectcheckbox']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        //$(group).prop("checked", false);
        $box.prop("checked", true);
        // $(this).parents('tr').addClass("selected").siblings().removeClass("selected");
        $(this).parents('tr').addClass("selected");
    } else {
        //$(this).parents('tr').removeClass("selected").siblings().removeClass("selected");
        $(this).parents('tr').removeClass("selected");
        $box.prop("checked", false);
    }

    if ($('.selectcheckbox').filter(':checked').length == 1) {

        $("#deletebutton").removeAttr("disabled");
        $("#editbutton").removeAttr("disabled");
        $("#viewbutton").removeAttr("disabled");

    } else if ($('.selectcheckbox').filter(':checked').length == 0) {

        $("#editbutton").attr("disabled", "disabled");
        $("#deletebutton").attr("disabled", "disabled");
        $("#viewbutton").attr("disabled", "disabled");
    } else
    {
        $("#editbutton").attr("disabled", "disabled");
        $("#viewbutton").attr("disabled", "disabled");

        $("#deletebutton").removeAttr("disabled");
    }

});
//check box when clicked triggerd events end
//filter table elements starts
function filterTableElements(){
    populateInTable();
    $('[id^="icon"]').attr('class', 'fa fa-sort');
    _this = $("#search");
    // Show only matching TR, hide rest of them
    $.each($("#myTable tbody tr"), function () {
        //  console.log($(this).text().toLowerCase());
        console.log($(_this).val().toLowerCase());
        // alert($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()));
        //$('table.sortable').alternateRowColors( $('table.sortable'));



        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).remove();
        //else
        //$(this).append();       

    });

    $('table.sortable').each(function () {

        var $table = $(this);
        $table.alternateRowColors($table);
         if ($("#search").val())
        {
            var numRows = $('#myTable').find('tbody tr').length;


            var numPages = Math.ceil(numRows / numPerPage);
            // alert(currentPage+'and'+numPages)
            if (currentPage >= numPages)
                currentPage = 0;

        } else {
            currentPage = 0;
           

        }
        paginateTheTable($table);
    });
}//filter table elements ends

$("#search").keyup(function () {
    filterTableElements();
});






//=====================================pagination and sorting logic===============================================================================




var newDirection = 1;

$('table.sortable').each(function () {

    var $table = $(this);

    $table.alternateRowColors($table);

    $table.find('th').each(function (column) {

        var findSortKey;



        if ($(this).is('.sort-alpha')) {

            findSortKey = function ($cell) {

                return $cell.find('.sort-key').text().toUpperCase() +
                        ' ' + $cell.text().toUpperCase();

            };

        } else if ($(this).is('.sort-numeric')) {

            findSortKey = function ($cell) {

                var key = parseFloat($cell.text().replace(/^[^d.]*/, ''));

                return isNaN(key) ? 0 : key;

            };

        } else if ($(this).is('.sort-date')) {

            findSortKey = function ($cell) {

                return Date.parse('1 ' + $cell.text());

            };

        }



        if (findSortKey) {

            $(this).addClass('clickable').hover(function () {

                $(this).addClass('hover');

            }, function () {

                $(this).removeClass('hover');

            }).click(function () {



                if ($(this).is('.sorted-asc')) {

                    newDirection = -1;

                } else if ($(this).is('.sorted-desc')) {

                    newDirection = 0;

                } else
                {
                    newDirection = 1;
                }

 
                if (newDirection != 0)
                {

                    rows = $table.find('tbody > tr').get();



                    $.each(rows, function (index, row) {

                        row.sortKey =
                                findSortKey($(row).children('td').eq(column));


                    });

                    rows.sort(function (a, b) {

                        if (a.sortKey < b.sortKey)
                        {
                            //alert(-newDirection);
                            return -newDirection;
                        }


                        if (a.sortKey > b.sortKey)
                        {
                            // alert(newDirection);
                            return newDirection;
                        }


                        return 0;

                    });
                    $.each(rows, function (index, row) {

                        $table.children('tbody').append(row);

                        row.sortKey = null;

                    });



                }//if new Direction not equal to zero
                else {
                    if($("#search").val()){
                        filterTableElements();
                    }
                    else
                    populateInTable();
                }//on the third sort i.e. default sort



                $table.find('th').removeClass('sorted‑asc')
                        .removeClass('sorted-desc');

                var $sortHead = $table.find('th').filter(':nth-child('
                        + (column + 1) + ')');
//console.log($sortHead);
                $('[id^="icon"]').attr('class', 'fa fa-sort');
                if (newDirection == 1) {

                    $sortHead.removeClass('sorted-desc').addClass('sorted-asc');

                    $('#icon' + column).attr('class', 'fa fa-sort-asc');
                } else if (newDirection == -1) {

                    $sortHead.removeClass('sorted-asc').addClass('sorted-desc');

                    $('#icon' + column).attr('class', 'fa fa-sort-desc');

                } else
                {
                    $sortHead.removeClass('sorted-desc').addClass('sorted-default');
                    $('#icon' + column).attr('class', 'fa fa-sort');
                    
                }
                $table.find('td').removeClass('sorted')

                        .filter(':nth-child(' + (column + 1) + ')')
                        .addClass('sorted');

                $table.alternateRowColors($table);
                
                paginateTheTable($table);
                $("#dlbootstrap").remove();

            });//when each th is clicked

        }//if those three class exists

    });//loop through each th

});//with every sortable table


//================================================pagination logic ======================================

function paginateTheTable($table) {





    //var $table = $(this); 
    var greaterthan = (currentPage + 1) * numPerPage;
    var lessthan = currentPage * numPerPage;
    var lessthantoshow = lessthan + 1;
    var numRows = $table.find('tbody tr').length;
    if (greaterthan > numRows)
        greaterthan = numRows;

    var numPages = Math.ceil(numRows / numPerPage);
    var $infocap = $('<p class="paginationinfo pull-left">Showing ' + lessthantoshow + ' to ' + greaterthan + ' of ' + numRows + ' entries </p>');

    var $pager = $('<ul class="pagination pull-right"></ul>');

    for (var page = 0; page < numPages; page++) {

        $('<li class="page-number"><a href="#">' + (page + 1) + '</a></li>')

                .bind('click', {
                    'newPage': page
                }
                , function (event) {
                    $("#dlbootstrap").remove();
                    currentPage = event.data['newPage'];
                    greaterthan = (currentPage + 1) * numPerPage;
                    lessthan = currentPage * numPerPage;
                    lessthantoshow = lessthan + 1;
                    if (greaterthan > numRows)
                        greaterthan = numRows;
                    $infocap = $('<p class="paginationinfo pull-left">Showing ' + lessthantoshow + ' to ' + greaterthan + ' of ' + numRows + ' entries </p>');

                    $table.find('tbody tr').hide().slice(lessthan, greaterthan).show();
                    $(".paginationinfo").remove();
                    $infocap.insertAfter($table);

                    $(this).addClass('active').siblings().removeClass('active');

                })

                .appendTo($pager).addClass('clickable');

    }

    $pager.find('li.page-number:nth-child(' + (currentPage + 1) + ')').addClass('active');

    //$infocap.insertBefore('.pagination');
    $(".paginationinfo,.pagination").remove();





    greaterthan = (currentPage + 1) * numPerPage;
    lessthan = currentPage * numPerPage;
    lessthantoshow = lessthan + 1;
    if (greaterthan > numRows)
    {

        greaterthan = numRows;
    }
    $infocap = $('<p class="paginationinfo pull-left">Showing ' + lessthantoshow + ' to ' + greaterthan + ' of ' + numRows + ' entries </p>');

    $table.find('tbody tr').hide().slice(lessthan, greaterthan).show();
    $infocap.insertAfter($table);
    $pager.insertAfter($table);


}
$('table.sortable').each(function () {

    var $table = $(this);
    paginateTheTable($table);

});
