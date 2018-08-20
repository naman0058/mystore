const tableHeader = `<table><tr><td>Id</td><td>Name</td><td>Description</td><td>Logo</td><td>Created Date</td><td>Edit</td><td>Delete</td></tr>`
start()
let categories = []

$.getJSON(`category/all`, data => {
    result = data
    makeTable(data)
})


$('#submit').click(function () {
    let categoryOBJ = {
        name: $('#name').val(),
        description: $('#description').val(),
        logo: $('#logo').val(),
        created_date: 'CURDATE()'
    }
    $.post(`/category/insert`, categoryOBJ, function (data) {
        insert()
    })
})


function makeTable(category) {
    let table = tableHeader + `<tbody>`
    $.each(category, function (i, item) {
        table += `<tr>
            <td>${item.id}</td>
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

$('#result').on('click', '.delete', function () {
    const id = $(this).attr('id')
    $.get(`/category/delete`, { id }, data => {
        refersh()
    })
})

$('#result').on('click', '.edit', function () {
    const id = $(this).attr('id')
    const result = categories.find(item => item.id == id);
    edit()
    $('#pid').val(result.id)
    $('#pname').val(result.name)
    $('#pdescription').val(result.description)
    $('#plogo').val(result.logo)
})


$('#update').click(function () {  
    let updateobj = {
        id: $('#pid').val(),
        name: $('#pname').val(),
        description: $('#pdescription').val(),
        logo: $('#plogo').val(),
        created_date: 'CURDATE()'
    }

    $.post(`/category/update`, updateobj, function (data) {
        update()
    })
})


function back() 
{
    $('#newcategorydiv').hide()
    $('#back').hide()
    $('#result').show()
    $('#refresh').show()
    $('#editdiv').hide()
}
function div() 
{
    $('#result').hide()
    $('#newcategorydiv').show()
    $('#back').show()
    $('#refresh').hide()
    $('#editdiv').hide()
}
function insert()
 {
    $('#result').show()
    $('#newcategorydiv').hide()
    $('#back').hide()
    $('#refresh').show()
    refersh()
}
function start()
 {

    $('#newcategorydiv').hide()
    $('#back').hide()
}
function edit()
 {
    $('#back').show()
    $('#refresh').hide()
    $('#result').hide()
    $('#editdiv').show()
    $('#newcategorydiv').hide()
}
function update()
 {
    $('#result').show()
    $('#editdiv').hide()
    $('#newcategorydiv').hide()
    refersh()
}
$('#back').click(function ()
 {
    back()
})
$("#editdiv").hide()
$('#refresh').click(function ()
 {
    refersh()
})
$('#new').click(function () 
{
    div()
})
function refersh() 
{
    $.getJSON(`/category/all`, data => makeTable(data))
}