$(document).ready(function(){

    var csrftoken = $("[name=csrfmiddlewaretoken]").val();



// click em editar no consulta de funcionario o metodo para editar esta na consulta.js
$(document).on('click','#editar_funcionario',function(){
  $.ajax({
    url:'/atendentes/show/'+$(this).attr('idd'),
    success: function(data){
      console.log(data.data[0]);
      $("#Editar_funcionario input[name='nome_func_edit']").val(data.data[0]['username']);
      $("#Editar_funcionario input[name='email_atendente_edit']").val(data.data[0]['email']);
      if(data.data[0]['is_superuser'] == true){
          $("#Editar_funcionario [name='admin_edit']").prop('checked', true);

      }else{
          $("#Editar_funcionario [name='admin_edit']").prop('checked', false);
      }

      $("#Editar_funcionario #edit_funcionario").attr('idd',data.data[0]['id'])

      $("#Editar_funcionario").modal()
    },
    error: function(error){
      console.log(error);
    }
  })
console.log($(this).attr('idd'));
});


// click em excluir no consulta de funcionario o metodo para exluir esta na consulta.js

$(document).on('click','#excluir_funcionario',function(){
  console.log($(this).attr('idd'));
  $("#Excluir_funcionario #destroy_funcionario").attr('idd',$(this).attr('idd'));
  $("#Excluir_funcionario").modal();
});



var csrftoken = $("[name=csrfmiddlewaretoken]").val();
let tabela_funcionario=$("#tabela_funcionario");
tabela_funcionario.DataTable({
ajax: '/atendentes/index',
columns:[

        {'data':'username',"name":'username'},
          {"data":'email','name':'email'},
        {"data":'is_superuser','name':'is_superuser'},
        {'data':'id',"name":'id'},
        ],
        "language": {
           "search": "PESQUISAR:",
           'emptyTable':"Sem registro",
           'info': "Mostrar página _PAGE_ de _PAGES_",
           'paginate': {
            'next':"Próximo",
            'previous':"Anterior",
          }

         },
dom: 'Bfrtip',
"autoWidth": true,
buttons: true,
 buttons:    [{extend: 'excel', text:'Excel',class:'btn btn-default'},{extend: 'csv', text:'CSV',class:'btn btn-warning'}],
 "columnDefs": [ {
    "targets": [3],
    Width: '150px',
    'orderning': false,
    "render":function(data,type,row){
       return gerenciamento(data,type,row);
    }
  },
  {
    "targets": [2],
    "width": '60px',
    'orderning': false,
    "render":function(data,type,row){
       return tipousuario(data,type,row);
    }
  }
]
});

var csrftoken = $("[name=csrfmiddlewaretoken]").val();
$('#limpa_campos').click(function(){
  $("input[name='nome_func']").val("");
  $("input[id='password']").val("");
});

$('#cadastra_func').click(function(){
    if ($("#nomea").val() == '' || $("#emaila").val() == '' || $("#senhaa").val() == ''){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'error',
        title: "Ops! preencha todos os campos."
      })
      return false;
    }
    $.ajax({
      type:'POST',
      url:'/atendentes/store',
      headers: { "X-CSRFToken": csrftoken},
      data:$('#cadastra_funcionarioform').serialize()
    }).done(function(data){
        $("input[name='nome_func']").val("");
        $("input[id='password']").val("");
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: data.menssagem
          })
        tabela_funcionario.DataTable().ajax.reload();

    }).fail(function(errors){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: 'error',
            title: errors.responseText
          })
    });
});

$("#destroy_funcionario").click(function(){
    $.ajax({
      url:"/atendentes/destroy/"+$(this).attr('idd'),
      headers: { "X-CSRFToken":  csrftoken },
      type:"DELETE",
      success : function(data){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'success',
          title: data.menssagem
        })
        $('#Excluir_funcionario').modal('hide')
        tabela_funcionario.DataTable().ajax.reload();
      },
      error: function(error){
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: error.responseText
        })
      }
    })
  })
  $("#edit_funcionario").click(function(){
    $.ajax({

    url: "/atendentes/edit/"+$(this).attr('idd'),
    headers: { "X-CSRFToken":  csrftoken },
    data :$("#cadastra_funcionarioform_edit").serialize(),
    type:"POST",
    success : function(data){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'success',
        title: data.menssagem
      })
      $('#Editar_funcionario').modal('hide')
      tabela_funcionario.DataTable().ajax.reload();
    },
    error: function(error){
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'error',
        title: error.responseText
      })
    }

  })
});




var gerenciamento = function(data,type,row){

    return ("<div class ='row'>"+
    "<div class ='col-md-12 d-flex'>"+
    "<div class='col-md-3'><button class='btn btn-outline-dark' id='editar_funcionario' idd='"+row.id+"'>EDITAR</button></div>"+
    "<div class='col-md-6'><button class='btn btn-dark' id='excluir_funcionario' idd='"+row.id+"'>DELETAR</button></div>"+
    "</div>"+
    "</div>");
}
var tipousuario = function(data,type,row){
if (row.is_superuser == true){
    return 'Administrador'
}
else{
  return 'Funcionário'
}
}
})
