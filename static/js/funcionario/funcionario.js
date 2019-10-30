$(document).ready(function(){

    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    let tabela_cliente=$("#tabela_cliente");
    
	  tabela_cliente.DataTable({
    ajax: '/clientes/index',
    columns:[
      {'data':'nome',"name":'nome'},
      {'data':'email',"name":'email'},
      {"data":'cpf','name':'cpf'},
      {"data":'cep','name':'cep'},
      {"data":'endereco','name':'endereco'},
      {"data":'telefone','name':'telefone'},
      {"data":'sexo','name':'sexo'},
      {"data":'dt_nascimento','name':'dt_nascimento'},
      
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
  "autoWidth": true,
  dom: 'Bfrtip',
	 buttons: true,
     buttons:    [{extend: 'excel', text:'Excel',class:'btn btn-default'},{extend: 'csv', text:'CSV',class:'btn btn-warning'}],
     "columnDefs": [ {
        "targets": [8],
        Width: '150px',
        'orderning': false,
        "render":function(data,type,row){
           return gerenciamento(data,type,row);
        }
      },
      {
         "targets": [6],
         Width: '150px',
         'orderning': false,
         "render":function(data,type,row){
           console.log(data);
           if(data == true){
             return 'Masculino';
           }
           return 'Feminio';
         }
       }
    ]
    });

    console.log(tabela_cliente);

  $("#edit_cliente").click(function(){
    $.ajax({

    url: "/clientes/edit/"+$(this).attr('idd'),
    headers: { "X-CSRFToken":  csrftoken },
    data :$(".form_cliente_edit").serialize(),
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
      $('#Editar_cliente').modal('hide')
      tabela_cliente.DataTable().ajax.reload();
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


    $("#destroy_cliente").click(function(){
        $.ajax({
          url:"/clientes/destroy/"+$(this).attr('idd'),
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
            $('#Excluir_cliente').modal('hide')
            tabela_cliente.DataTable().ajax.reload();
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

    //   funcao para mostrar os botoes  excluir e editar na tela
    var gerenciamento = function(data,type,row){

         return ("<div class ='row'>"+
          "<div class ='col-md-12 d-flex'>"+
          "<div class='col-md-4'><button class='btn btn-outline-dark' id='editar_cliente' idd='"+row.id+"'>EDITAR</button></div>"+
          "<div class='col-md-6'><button class='btn btn-dark' id='excluir_cliente' idd='"+row.id+"'>DELETAR</button></div>"+
          "</div>"+
          "</div>");
    }



  var csrftoken = $("[name=csrfmiddlewaretoken]").val();
  $('#limpa_campos').click(function(){
    $("input[name='cliente_nome']").val('');
    $("input[name='email_cliente']").val('');
    $("input[name='cliente_cep']").val('');
    $("input[name='cpf_cliente']").val('');
    $("input[name='endereco_cliente']").val('');
    $("input[name='telefone_cliente]").val('');
    $("input[name='nascimento_cliente']").val('');
  });
    $('#cadastra_cliente').click(function(){
        if ($("#nomec").val() == '' || $("#cpfc").val() == '' || $("#datac").val() == ''){
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
             url: "/clientes/store",
             type:'POST',
             headers: { "X-CSRFToken": `{{ csrf_token }}` },
             data :$(".form_cliente").serialize(),
             dataType : 'json',
             success: function(data){
             console.log(data);
             $("input[name='cliente_nome']").val('');
             $("input[name='email_cliente']").val('');
             $("input[name='cliente_cep']").val('');
             $("input[name='cpf_cliente']").val('');
             $("input[name='endereco_cliente']").val('');
             $("input[name='telefone_cliente]").val('');
             $("input[name='nascimento_cliente']").val('');

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

         tabela_cliente.DataTable().ajax.reload();
             },
             error: function(error){
                 console.log(error.responseText);
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
// click em editar no consulta de cliente o metodo para editar esta na consulta.js
$(document).on('click','#editar_cliente',function(){
  $.ajax({
    url:'/clientes/show/'+$(this).attr('idd'),
    success: function(data){
      console.log(data.data[0]['id']);
      $("#Editar_cliente input[name='cliente_nome_edit']").val(data.data[0]['nome']);
      $("#Editar_cliente input[name='email_cliente_edit']").val(data.data[0]['email']);
      $("#Editar_cliente input[name='cliente_cep_edit']").val(data.data[0]['cep']);
      $("#Editar_cliente input[name='cpf_cliente_edit']").val(data.data[0]['cpf']);
      $("#Editar_cliente input[name='endereco_cliente_edit']").val(data.data[0]['endereco']);
      $("#Editar_cliente input[name='telefone_cliente_edit']").val(data.data[0]['telefone']);
      $("#Editar_cliente input[name='data_cliente_edit']").val(data.data[0]['dt_nascimento']);
      $("#Editar_cliente #edit_cliente").attr('idd',data.data[0]['id'])
      $("#Editar_cliente").modal()
    },
    error: function(error){
      console.log(error);
    }
  })
console.log($(this).attr('idd'));
});


// click em excluir no consulta de cliente o metodo para exluir esta na consulta.js

$(document).on('click','#excluir_cliente',function(){
  console.log($(this).attr('idd'));
  $("#Excluir_cliente #destroy_cliente").attr('idd',$(this).attr('idd'));
  $("#Excluir_cliente").modal();
});

});
