$(document).ready(function(){

    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    let tabela_fornecedor=$("#tabela_fornecedor");
    
	  tabela_fornecedor.DataTable({
    ajax: '/fornecedor/index',
    columns:[
      {"data":'nome',"name":'nome'},
      {"data":'cnpj',"name":'cnpj'},
      {"data":'endereco','name':'endereco'},
      {"data":'telefone','name':'telefone'},
      {"data":'email','name':'email'},
      {"data":'id',"name":'id'},
      
    ],
      "language": {
         "search": "PESQUISAR:",
         'emptyTable':"Sem registros",
         "info": "Mostrar página _PAGE_ de _PAGES_",
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
        "targets": [5],
        Width: '150px',
        'orderning': false,
        "render":function(data,type,row){
           return gerenciamento(data,type,row);
        }
      },
      {
        "targets": [5],
        Width: '150px',
        'orderning': false,
        "render":function(data,type,row){
          return '<div style="background:'+data+';padding:15%"></div>'
        }
      }
    ]
    });

    console.log(tabela_fornecedor);

  $("#edit_fornecedor").click(function(){
    $.ajax({

    url: "/fornecedor/edit/"+$(this).attr('idd'),
    headers: { "X-CSRFToken":  csrftoken },
    data :$(".form_fornecedor_edit").serialize(),
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
      $('#Editar_fornecedor').modal('hide')
      tabela_fornecedor.DataTable().ajax.reload();
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


    $("#exclui_fornecedor").click(function(){
        $.ajax({
          url:"/fornecedor/destroy/"+$(this).attr('idd'),
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
            $('#Excluir_fornecedor').modal('hide');
            tabela_fornecedor.DataTable().ajax.reload();
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
          "<div class='col-md-4'><button class='btn btn-outline-dark' id='editar_fornecedor' idd='"+row.id+"'>EDITAR</button></div>"+
          "<div class='col-md-6'><button class='btn btn-dark' id='excluir_fornecedor' idd='"+row.id+"'>DELETAR</button></div>"+
          "</div>"+
          "</div>");
    }
  var csrftoken = $("[name=csrfmiddlewaretoken]").val();
  $('#limpa_campo').click(function(){
    $("input[name='nome_fornecedor']").val('');
    $("input[name='cnpj_fornecedor']").val('');
    $("input[name='endereco_fornecedor']").val('');
    $("input[name='telefone_fornecedor']").val('');
    $("input[name='email_fornecedor']").val('');
  });
    $('#cadastra_fornecedor').click(function(){
        if ($("#nomef").val() == '' ||$("#cnpjf").val() == '' || $("#telf").val() == ''){
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
             url: "/fornecedor/store",
             type:'POST',
             headers: { "X-CSRFToken": `{{ csrf_token }}` },
             data :$(".form_fornecedor").serialize(),
             dataType : 'json',
             success: function(data){
             console.log(data);
             $("input[name='nome_fornecedor']").val('');
             $("input[name='cnpj_fornecedor']").val('');
             $("input[name='endereco_fornecedor']").val('');
             $("input[name='telefone_fornecedor']").val('');
             $("input[name='email_fornecedor']").val('');

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
         tabela_fornecedor.DataTable().ajax.reload();
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
$(document).on('click','#editar_fornecedor',function(){
  $.ajax({
    url:'/fornecedor/show/'+$(this).attr('idd'),
    success: function(data){
      console.log(data.data[0]['id']);
      $("#Editar_fornecedor input[name='nome_forcecedor_edit']").val(data.data[0]['nome']);
      $("#Editar_fornecedor input[name='email_fornecedor_edit']").val(data.data[0]['email']);
      $("#Editar_fornecedor input[name='cnpj_fornecedor_edit']").val(data.data[0]['cnpj']);
      $("#Editar_fornecedor input[name='endereco_fornecedor_edit']").val(data.data[0]['endereco']);
      $("#Editar_fornecedor input[name='telefone_fornecedor_edit']").val(data.data[0]['telefone']);
      $("#Editar_fornecedor #edit_fornecedor").attr('idd',data.data[0]['id'])
      $("#Editar_fornecedor").modal()
    },
    error: function(error){
      console.log(error);
    }
  })
console.log($(this).attr('idd'));
});


// click em excluir no consulta de cliente o metodo para exluir esta na consulta.js

$(document).on('click','#excluir_fornecedor',function(){
  console.log($(this).attr('idd'));
  $("#Excluir_fornecedor #exclui_fornecedor").attr('idd',$(this).attr('idd'));
  $("#Excluir_fornecedor").modal();
});

});
