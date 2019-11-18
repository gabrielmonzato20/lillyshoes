var ctx = $('#myChart')
var ctx2 = $('#piechart')


$.ajax({
    url: '/total_pedidos',
    type:'GET',
}).done(function(data){
    var label = [];
    var dadoss = [];
    $.each( JSON.parse(data),function(index, value){
        label.push(value['atendente']); 
        dadoss.push(value['total']);
    });
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Vendas por atendente',
                data: dadoss,
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
   console.log(label);
   console.log(dadoss);

}).fail(function(error){
    console.log(error);
})


$.ajax({
    url: '/total_pedidos_dia',
    type:'GET',
}).done(function(data){
    var label = [];
    var dadoss = [];
    $.each( JSON.parse(data),function(index, value){
        label.push(value['created']); 
        dadoss.push(value['total']);
    });
    var myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
                label: 'Vendas por dia',
                data: dadoss,
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}).fail(function(error){
    console.log(error);
})