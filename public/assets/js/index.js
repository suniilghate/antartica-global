//Login User
$("#login_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        url : `http://localhost:3000/login`,
        method : "POST",
        dataType: "json",
        contentType: "application/json",
        data : JSON.stringify({data})
    }

    $.ajax(request).done(function(response){
        $.cookie('token',response.token);
        console.log(JSON.stringify(response));
        $(location).attr('href', 'http://localhost:3000/');
        //location.reload();
    })

})

$("#add_user").submit(function(event){
    //alert("Data Inserted Successfully!");

    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        url : `http://localhost:3000/`,
        method : "POST",
        dataType: "json",
        contentType: "application/json",
        data : JSON.stringify({data})
    }

    $.ajax(request).done(function(response){
        $(location).attr('href', 'http://localhost:3000/');
        //location.reload();
    })
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        $(location).attr('href', 'http://localhost:3000/');
    })

})
//alert('321');
$(document).ready(function() {
    $('#example').DataTable();
});
//$('#example').DataTable();

if(window.location.pathname == "/"){
    
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }
    })
}