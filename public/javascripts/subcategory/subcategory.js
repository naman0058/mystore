const tableHeader = `<table><tr><td>Id</td><td>Category Name</td><td>Subcategory Name</td><td>Description</td><td>Logo</td><td>Created Date</td><td>Edit</td><td>Delete</td></tr>`

let categories = []
let subcategories = []

$.getJSON(`category/all`, data => {
    categories = data
    fillDropDown('categoryid', data, 'Choose Category', 0)
  
})

$.getJSON(`subcategory/all`, data => {
    subcategories = data
    makeTable(data)
  
})

function fillDropDown(id, data, label, selectedid = 0) {
    $(`#${id}`).empty()
    $(`#${id}`).append($('<option>').val("null").text(label))

    $.each(data, (i, item) => {
        if (item.id == selectedid) {
            $(`#${id}`).append($('<option selected>').val(item.id).text(item.name))
        } else {
            $(`#${id}`).append($('<option>').val(item.id).text(item.name))
        }
    })
}

    



$('#submit').click(function(){
    let insertObj ={

        categoryid:$('#categoryid').val(),
        name: $('#name').val(),
        description:$('#description').val(),
        logo:$('#logo').val(),
        created_date: 'CURDATE()'
     }
    
     $.post('subcategory/insert',insertObj,function(data){
        refresh()

     })
})



function makeTable(subcategory) {
    let table = tableHeader + `<tbody>`
    $.each(subcategory, function(i, item) {
        table += `<tr>
            <td>${item.id}</td>
            <td>${item.cname}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.logo}</td>
            <td>${item.created_date}</td>
            <td><button class="btn btn-outline-primary edit" id="${item.id}"><i style="font-size:12px;color:blue" class="fa">&#xf00c;</i></button></td>
            <td><button class="btn btn-outline-success delete" id="${item.id}"><i style="font-size:14px;color:green" class="fa">&#xf014;</i></button></td>
            </tr>`
    })
    table += '</tbody></table>' 
    $('#result').html(table)
}



$('#result').on('click', '.delete', function() {
    const id = $(this).attr('id')
    $.get(`subcategory/delete`,  { id }, data => {
        refresh()
    })
})



$('#result').on('click', '.edit', function() {
    const id = $(this).attr('id')
    const result = subcategories.find(item => item.id == id);
   // console.log(result.categoryid)
    fillDropDown('pcategoryid', categories, 'Choose Category', result.categoryid)
    $('#editdiv').show()
    $('#insertdiv').hide() 

    $('#pid').val(result.id)
    $('#pcategoryid').val(result.categoryid)
    $('#pname').val(result.name)
    $('#pdescription').val(result.description)
    $('#plogo').val(result.logo)
 })


 
$('#update').click(function(){  //data insert in database
    let updateobj = {
        id: $('#pid').val(),
        categoryid:$('#pcategoryid').val(),
        name: $('#pname').val(),
        description: $('#pdescription').val(),
        logo: $('#plogo').val(),
   
        created_date: 'CURDATE()'
    }

    $.post(`subcategory/update`, updateobj , function(data) {
       update()
    })
})


function refresh() 
{
    $.getJSON(`subcategory/all`, data => makeTable(data))
}
function update()
{
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').show() 
    refresh()
    refresh()
}

$('#editdiv').hide()
