$(document).ready(function(){

    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    let tabela_produto=$("#tabela_produto");
	tabela_produto.DataTable({
    ajax: '/produtos/index',
    columns:[
      {'data':'nome',"name":'nome'},
      {'data':'descricao',"name":'descricao'},
      {"data":'cor','name':'cor'},
        {"data":'tamamho','name':'tamamho'},
      {"data":'preco','name':'preco'},
      {"data":'quantidade','name':'quantidade'},
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
  "autoWidth": true,
  dom: 'Bfrtip',
	 buttons: true,
     buttons:    [{extend: 'excel', text:'Excel',class:'btn btn-default'},{extend: 'csv', text:'CSV',class:'btn btn-warning'}],
     "columnDefs": [ {
        "targets": [6],
        Width: '150px',
        'orderning': false,
        "render":function(data,type,row){
           return gerenciamento(data,type,row);
        }
      },
      {
         "targets": [2],
         Width: '150px',
         'orderning': false,
         "render":function(data,type,row){
           return '<div style="background:'+data+';padding:15%"></div>'
         }
       }
    ]
    });


  $("#edit_produtos").click(function(){
    $.ajax({

    url: "/produtos/edit/"+$(this).attr('idd'),
    headers: { "X-CSRFToken":  csrftoken },
    data :$("#editar_produto_form").serialize(),
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
      $('#Editar_produto').modal('hide')
      tabela_produto.DataTable().ajax.reload();
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

    $("#destroy_produto").click(function(){
        $.ajax({
          url:"/produtos/destroy/"+$(this).attr('idd'),
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
            $('#Excluir_Produto').modal('hide')
            tabela_produto.DataTable().ajax.reload();
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
        "<div class='col-md-4'><button class='btn btn-outline-dark' id='editar_produto' idd='"+row.id+"'>EDITAR</button></div>"+
        "<div class='col-md-6'><button class='btn btn-dark' id='excluir_produto' idd='"+row.id+"'>DELETAR</button></div>"+
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
  });
    $('#cadastra_produto').click(function(){
        if ($("#nomep").val() == '' || $("#estoquec").val() == '' || $("#precoc").val() == ''){
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
             url: "/produtos/store",
             type:'POST',
             headers: { "X-CSRFToken": `{{ csrf_token }}` },
             data :$(".form_produto").serialize(),
             dataType : 'json',
             success: function(data){
             console.log(data);
             $("input[name='produto_nome']").val('');
             $("input[name='produto_descricao']").val('');
             $("input[name='produto_cor']").val('');
             $("input[name='produto_preco']").val('');
             $("input[name='produto_tamanho']").val('');
             $("input[name='produto_estoque]").val('');

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

              tabela_produto.DataTable().ajax.reload();
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
$(document).on('click','#editar_produto',function(){
  $.ajax({
    url:'/produtos/show/'+$(this).attr('idd'),
    success: function(data){
      console.log(data.data[0]['id']);
      $("#Editar_produto input[name='produto_nome_edit']").val(data.data[0]['nome']);
      $("#Editar_produto input[name='produto_descricao_edit']").val(data.data[0]['descricao']);
      $("#Editar_produto input[name='produto_cor_edit']").val(data.data[0]['cor']);
      $("#Editar_produto input[name='produto_preco_edit']").val(data.data[0]['preco']);
      $("#Editar_produto input[name='produto_tamanho_edit']").val(data.data[0]['tamamho']);
      $("#Editar_produto input[name='produto_estoque_edit']").val(data.data[0]['quantidade']);
      $("#Editar_produto #edit_produtos").attr('idd',data.data[0]['id'])
      $("#Editar_produto").modal()
    },
    error: function(error){
      console.log(error);
    }
  })
console.log($(this).attr('idd'));
});


// click em excluir no consulta de cliente o metodo para exluir esta na consulta.js

$(document).on('click','#excluir_produto',function(){
  console.log($(this).attr('idd'));
  $("#Excluir_Produto #destroy_produto").attr('idd',$(this).attr('idd'));
  $("#Excluir_Produto").modal();
});

});
