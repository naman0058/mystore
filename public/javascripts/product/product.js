const tableHeader = `<table><tr><td>Id</td><td>Category Name</td><td>Subcategory Name</td><td>Product Name</td><td>Rate</td><td>Stock</td><td>Edit</td><td>Delete</td></tr>`
let categories = []
let subcategories = []
let products = []

start()
$.getJSON(`/category/all`, data => {
    categories = data
    fillDropDown('categoryid', data, 'Choose Category', 0)
})

$.getJSON(`/subcategory/all`, data => {
    subcategories = data
    fillDropDown('subcategoryid', [], 'Choose Sub-Category', 0)
})

$('#categoryid').change(() => {
    const filteredData = subcategories.filter(item => item.categoryid == $('#categoryid').val())
    fillDropDown('subcategoryid', filteredData, 'Choose Sub-Category', 0)
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

$.getJSON(`product/showall`, data => {
    products = data
    makeTable(data)
})



$('#submit').click(function () {
    let insertObj = {
        categoryid: $('#categoryid').val(),
        subcategoryid: $('#subcategoryid').val(),
        name: $('#name').val(),
        rate: $('#rate').val(),
        stock: $('#stock').val(),
    }

    $.post('/product/insert', insertObj, function (data) {
      insertdata()
    })
})

function makeTable(product) {
    let table = tableHeader + `<tbody>`
    $.each(product, function (i, item) {
        table += `<tr>
            <td>${item.id}</td>
            <td>${item.categoryname}</td>
            <td>${item.subcategoryname}</td>
            <td>${item.name}</td>
            <td>${item.rate}</td>
            <td>${item.stock}</td>
            <td><button class="btn btn-outline-primary edit" id="${item.id}"><i style="font-size:12px;color:blue" class="fa">&#xf00c;</i></button></td>
            <td><button class="btn btn-outline-success delete" id="${item.id}"><i style="font-size:14px;color:green" class="fa">&#xf014;</i></button></td>
            </tr>`
    })
    table += '</tbody></table>'
    $('#result').html(table)
}

$('#result').on('click', '.delete', function () {
    const id = $(this).attr('id')
    $.get(`product/delete`, { id }, data => {
        refresh()
    })
})

let selectedSubcategory = 0

$('#categoryidUpdate').change(() => {
    const filteredData = subcategories.filter(item => item.categoryid == $('#categoryidUpdate').val())
    fillDropDown('subcategoryidUpdate', filteredData, 'Choose Sub-Category', 0)
})

$('#result').on('click', '.edit', function () {
    const id = $(this).attr('id')
    const product = products.find(item => item.id == id);
    console.log(product.categoryid)

    fillDropDown('categoryidUpdate', categories, 'Choose Category', product.categoryid)
    $('#subcategoryidUpdate').append($('<option>').val(product.subcategoryid).text(product.subcategoryname))
    edit()
    $('#pid').val(product.id)
    $('#pname').val(product.name)
    $('#prate').val(product.rate)
    $('#pstock').val(product.stock)
    
})

$('#update').click(function () {  //data insert in database
    let updateobj = {
        id: $('#pid').val(),
        categoryid: $('#categoryidUpdate').val(),
        subcategoryid: $('#subcategoryidUpdate').val(),
        name: $('#pname').val(),
        rate: $('#rate').val(),
        stock: $('#stock').val(),
    }

    $.post(`product/update`, updateobj, function (data) {
      update()
    })
})



function start()
{
$('#editdiv').hide()
$('#back').hide()
$('#insertdiv').hide()
}
function insert()
{
     $('#insertdiv').show()
    $('#back').show()
    $('#refresh').hide()
    $('#result').hide()
    $('#editdiv').hide()
}
function back()
{
    $('#refresh').show()
    $('#editdiv').hide()
    $('#back').hide()
    $('#insertdiv').hide()
    $('#result').show()
}
function insertdata()
{
    $('#editdiv').hide()
    $('#back').hide()
    $('#insertdiv').hide()
    $('#refresh').show()
    $('#result').show()
    refresh()
}
function edit()
{
    $('#back').show()
    $('#refresh').hide()
    $('#editdiv').show()
    $('#result').hide()
}
function update()
{
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').show()
    refersh()
}

$('#new').click(function () {
    insert()
 })
 
 $('#back').click(function () {
     back()
 })
 
 function refresh() {
     $.getJSON(`product/showall`, data => {
         makeTable(data)
     })
 }

