<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

        <link rel="stylesheet" href="styles.css"/>

    </head>



    <body>
        <div class="container">
            <!-- Static navbar -->
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#"> ASSIGNMENT FOUR</a>
                    </div>

                    <div class="row allcontrols">
                        <div class="col-md-12">
                            <div class="row ">
                                <div class="form-group">


                                    <button id="addbutton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add</button>
                                    <button id="editbutton" type="button" disabled class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">EDIT</button>
                                    <button id="deletebutton" type="button" disabled class="btn btn-primary" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo">DELETE</button>
                                    <button id="viewbutton" type="button" disabled class="btn btn-primary">View</button>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 ">
                                    <div class="form-group"><p>No of rows per page
                                            <select id="Numberofpages" class="form-control ">
                                                <option>5</option>
                                                <option>10</option>
                                                <option>20</option>
                                                <option>50</option>
                                            </select></p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="form-control pull-right" placeholder="search" id="search"/>

                                </div>
                            </div>





                        </div> 

                    </div>


                </div><!--/.container-fluid -->
            </nav>
            <section >


                <table id="myTable" class="table sortable paginated">
                    <thead>
                        <tr><th><input class="" id="bulkselect" type="checkbox"/></th><th class="sort-alpha" >Name<i id="icon1" class="fa fa-sort" aria-hidden="true"></i></th><th class="sort-alpha">Location<i id="icon2" class="fa fa-sort" aria-hidden="true"></i></th><th class="sort-alpha">Phone<i id="icon3" class="fa fa-sort" aria-hidden="true"></i></th><th class="sort-alpha">Address<i id="icon4" class="fa fa-sort" aria-hidden="true"></i></th><th class="sort-alpha">email<i id="icon5" class="fa fa-sort" aria-hidden="true"></i></th></tr>
                    </thead>
                    <tbody>

                    </tbody>

                </table> 
            </section>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="exampleModalLabel">Add Info</h4>
                    </div>
                    <form name="myForm" action="" onsubmit="return addOrUpdateHandler(event)" method="post">
                        <div class="modal-body">


                            <div class="form-group">
                                <label for="formGroupExampleInput">Name</label>
                                <input type="text" class="form-control" name="fname" placeholder="Name">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Location</label>
                                <input type="text" class="form-control" name="flocation" placeholder="Location">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Phone</label>
                                <input type="text" class="form-control" name="fphone" placeholder="Phone">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Address</label>
                                <input type="text" class="form-control" name="faddress" placeholder="Address">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Email</label>
                                <input type="text" class="form-control" name="femail" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Lastname</label>
                                <input type="text" class="form-control" name="flastname" placeholder="lastname">
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Salary</label>
                                <input type="number"  class="form-control" name="fsalary" placeholder="salary">
                            </div>


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <input id="submitbuttonid" type="submit" class="btn btn-primary" value="Submit" data-addedit="add">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="">Delete Info</h4>
                    </div>
                    <form name="myForm" action="" onsubmit="return deleteSelectedRow(event)" method="post">
                        <div class="modal-body">


                            <h4>You are about to delete.Do you want to proceed?</h4>



                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">NO</button>
                            <input type="submit" class="btn btn-primary" value="YES">
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script
            src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="assignmentfour.js"></script>

    </body>
</html>
