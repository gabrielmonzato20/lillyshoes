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
         buttons:    [{extend: 'excel', text:'Excel',class:'btn btn-default'},{extend: 'csv', text:'CSV',class:'btn btn-warning'}],
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
                  'preco': '',
              },
  
            ],
  
            },
            methods:{
              add_linha:function(){
                  this.dados.push({
                  'produto':'  ',
                  'quantidade':'',
                  'preco': '',
                })
                console.log(this.dados);
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
  
              $.ajax({
                url: '/pedidos/store',
                headers: { "X-CSRFToken":  csrftoken },
                type:'POST',
                data:{'produtos':{'data':this.dados} , 'cliente':$('select[name="cliente_pedido"]').val(),'atendente':$('select[name="atendente_pedido"]').val()},
                success: function(data){
                  console.log('data passou');
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
  
                  Toast.fire({
                    type: 'success',
                    title: data.menssagem
                  });
              $('select[name="cliente_pedido"]').val('');
              $('select[name="atendente_pedido"]').val('');
                tabela_pedido.DataTable().ajax.reload();
                },
                error: function(err){
                  console.log(err);
                }
              })
  remove_all()
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
              "<div class='col-md-6'><button class='btn btn-dark' id='excluir_pedido' idd='"+row.id+"' type='button'>DELETAR</button></div>"+
              "</div>"+
              "</div>");
        }
        $(document).on('click','#excluir_pedido',function(){
          console.log($(this).attr('idd'));
          $("#Excluir_Pedido #destroy_pedido").attr('idd',$(this).attr('idd'));
          $("#Excluir_Pedido").modal();
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
                let valor_total = dados_pedido[index]['preco_venda'] *dados_pedido[index]['qtd_venda'];
                $("#produtos_show > tbody").append("<tr><td>"+dados_pedido[index]['nome']+"</td><td>"+dados_pedido[index]['qtd_venda']+"</td><td>"+dados_pedido[index]['preco_venda']+"</td><td>R$"+valor_total+"</td></tr>");
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