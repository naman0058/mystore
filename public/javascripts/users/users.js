
$('#submit').click(function(){
    let insertObj ={

     
        name: $('#name').val(),
        email:$('#email').val(),
        password:$('#password').val(),
        number:$('#number').val()
        
     }
    console.log(insertObj)
     $.post('/users/insert',insertObj,function(data){
      alert('submitted successfully')
     })
})


$('#logindiv').hide()

$('#signupdiv').on('click', '#a', function() {

    $('#logindiv').show()
    $('#signupdiv').hide()
})



$('#logindiv').on('click', '#s', function() {

    $('#logindiv').hide()
    $('#signupdiv').show()
})

/*
$('#login').click(function(){
    let checkObj ={
      
        email:$('#checkemail').val(),
        password:$('#checkpassword').val()
      }
      $.post('/users/check',checkObj,function(data){
         
})

})*/