$(document).ready(function(){
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        let tabela_pedido=$("#tabela_pedido");

          tabela_pedido.DataTable({
        ajax: '/pedidos/index',
        columns:[
          {'data':'cliente',"name":'cliente'},
          {'data':'atendente',"name":'atendente'},
          {"data":'id','name':'id'},
          {"data":'id','name':'id'},

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
         buttons:    [{extend: 'excel', text:'EXCEL',class:'btn btn-default'},{extend: 'csv', text:'CSV',class:'btn btn-warning'}],
         "columnDefs": [
           {
            "targets": [2],
            Width: '150px',
            'orderning': false,
            "render":function(data,type,row){
               return produtos_show(data,type,row);
            }
          },
          {
             "targets": [3],
             Width: '150px',
             'orderning': false,
             render:function(data,type,row){
                return gerenciamento(data,type,row);
             }
           }
        ]
        });
        lista_produto = []
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        var app = new Vue({
            el:'#pedido_orcamento',
            data:{
              dados:[
              {
                  'produto':' ',
                  'quantidade':'',
                  'desconto': '',
              },

            ],

            },
            methods:{
              add_linha:function(){
                  this.dados.push({
                  'produto':'  ',
                  'quantidade':'',
                  'desconto': '',
                })
                console.log(this.dados);
              },
              limpa_form:function(){
                this.dados = [{
                  'produto':'  ',
                  'quantidade':'',
                  'desconto': '',
                }];
                
            },
              excluir_linha:function(index){
                  if(this.dados.length >1){
                      this.dados.splice(index,1)
                  }

              },
              remove_all:function(){
                this.dados.splice(0,this.dados.length-1)
              },
              post_data: function(){
                if ($("#qtdep").val() == '' ||$("#valorp").val() == ''){
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

               axios({
        method: 'post',
        url:'/pedidos/store',
      data: {
        produtos:this.dados,
      cliente:$('select[name="cliente_pedido"]').val(),
      atendente:$('select[name="atendente_pedido"]').val()
    },
    headers: { "X-CSRFToken":  csrftoken }
  }).then(function (response) {
                  console.log(response)

                  const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });

              Toast.fire({
                type: 'success',
                title: response.data.menssagem
              });
              $('select[name="cliente_pedido"]').val('');
              $('select[name="atendente_pedido"]').val('');
              tabela_pedido.DataTable().ajax.reload();
              this.dados = [{
                'produto':'  ',
                'quantidade':'',
                'desconto': '',
              }];
              // console.log('oi');
              }.bind(this))
              .catch(function (error) {
                console.log(error.responseText);
                console.log(error.response);
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                });

                Toast.fire({
                  type: 'error',
                  title: error.response.data
                })
              });
            
        }
        }
        });
  var produtos_show= function(data,type,row){
    return (
      "<a id="+row.id+" class='mostrar_produto'><i class='fa fa-tag'></i></a>"
    );
  }
        var gerenciamento = function(data,type,row){

             return ("<div class ='row'>"+
              "<div class ='col-md-12 d-flex'>"+
              // "<div class='col-md-4'><button class='btn btn-outline-dark' id='editar_pedido' idd='"+row.id+"'>EDITAR</button></div>"+
              "<div class='col-md-6'><button class='btn btn-outline-dark' id='edit_pedido' idd='"+row.id+"' type='button'>EDITAR</button></div>"+
              "<div class='col-md-6'><button class='btn btn-dark' id='excluir_pedido' idd='"+row.id+"' type='button'>DELETAR</button></div>"+
              "</div>"+
              "</div>");
        }
        $(document).on('click','#excluir_pedido',function(){
          console.log($(this).attr('idd'));
          $("#Excluir_Pedido #destroy_pedido").attr('idd',$(this).attr('idd'));
          $("#Excluir_Pedido").modal();
        });
var lista_ids = []
        $(document).on('click','#edit_pedido',function(){
          console.log($(this).attr('idd'));
          $("#Editar_Pedido  input[name='id_pedido']").val($(this).attr('idd'));
          $("#Editar_Pedido").modal();
          $('#pedido_orcamento_edit').attr('id','pedido_orcamento_edit'+$(this).attr('idd'))
          if(lista_ids.includes($(this).attr('idd'))){

          }else{
            var app_edit = new Vue({
              el:'#pedido_orcamento_edit'+$(this).attr('idd'),
              data:{
                dados_edit:[
                {
                    'produto':' ',
                    'quantidade':'',
                    'desconto': '',
                },

              ],

              },
              methods:{
                add_linha_edit:function(){
                    this.dados_edit.push({
                    'produto':'  ',
                    'quantidade':'',
                    'desconto': '',
                  })
                  console.log(this.dados);
                },
                excluir_linha_edit:function(index){
                    if(this.dados_edit.length >1){
                        this.dados_edit.splice(index,1)
                    }

                },
                remove_all:function(){
                  this.dados_edit.splice(0,this.dados.length-1)
                },
                post_data_edit: function(){
                  if ($("#qtdep_edit").val() == '' ||$("#valorp_edit").val() == ''){
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

               axios({
          method: 'post',
          url:'/pedidos/edit/'+  $("#Editar_Pedido  input[name='id_pedido']").val(),
        data: {
          produtos:this.dados_edit,
        cliente:$('select[name="cliente_pedido_edit"]').val(),
        atendente:$('select[name="atendente_pedido_edit"]').val()
      },
      headers: { "X-CSRFToken":  csrftoken }
    }) .then(function (response) {
                    console.log(response)

                    const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000
                });

                Toast.fire({
                  type: 'success',
                  title: response.data.menssagem
                });
                $('select[name="cliente_pedido_edit"]').val('');
                $('select[name="atendente_pedido_edit"]').val('');
                tabela_pedido.DataTable().ajax.reload();
                // console.log('oi');
                  $("#Editar_Pedido").modal('hide');
                })
                .catch(function (error) {
                  console.log(error.responseText);
                  console.log(error.response);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });

                  Toast.fire({
                    type: 'error',
                    title: error.response.data
                  })
                });
                app = app.bind(this);
          }
          }
          });
          lista_ids.push($(this).attr('idd'));
          }
        
          console.log(app_edit);
          console.log(lista_ids);
        });


        $(document).on('click','.mostrar_produto',function(){
          $.ajax({
            url: '/pedidos/show/'+$(this).attr('id'),
            headers: { "X-CSRFToken":  csrftoken },
            type:'GET',
            success: function(data){
                var dados_pedido = data['data'][0]['produtos'];
                $('#produtos_show tbody > tr').remove();

                for (index = 0; index < dados_pedido.length; ++index) {
                console.log(dados_pedido[index]);
                let valor_total = (dados_pedido[index]['preco_venda'] *dados_pedido[index]['qtd_venda'])-dados_pedido[index]['desconto'];
                $("#produtos_show > tbody").append("<tr><td>"+dados_pedido[index]['nome']+"</td><td>"+dados_pedido[index]['qtd_venda']+"</td><td>"+dados_pedido[index]['preco_venda']+"</td><td>"+dados_pedido[index]['desconto']+"</td><td>R$"+valor_total+"</td></tr>");
}
                $("h1#ti").html(data[0]);
                $("#Modal_produtos").modal();

            },
            error: function(err){
              console.log(err);
            }
          })
        });
        $("#destroy_pedido").click(function(){
            $.ajax({
              url:"/pedidos/destroy/"+$(this).attr('idd'),
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
                $('#Excluir_Pedido').modal('hide')
                tabela_pedido.DataTable().ajax.reload();
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
    });
