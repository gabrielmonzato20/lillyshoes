var ctx = $('#myChart')
var ctx2 = $('#piechart')


$.ajax({
    url: '/total_pedidos',
    type:'GET',
}).done(function(data){
    var label_pie = [];
    var dadoss_pie = [];
    var color = [];
    var linhas_fora = [];
    var hover_color = [];
    $.each( JSON.parse(data),function(index, value){
        label_pie.push(value['atendente']); 
        dadoss_pie.push(value['total']);
        var randomR = Math.floor((Math.random() * 130) + 100);
        var randomG = Math.floor((Math.random() * 130) + 100);
        var randomB = Math.floor((Math.random() * 130) + 100);
       
        var graphBackground = "rgb(" 
                + randomR + ", " 
                + randomG + ", " 
                + randomB + ")";
        color.push(graphBackground);
        var graphOutline = "rgb(" 
        + (randomR - 80) + ", " 
        + (randomG - 80) + ", " 
        + (randomB - 80) + ")";
        linhas_fora.push(graphOutline);
        var hoverColors = "rgb(" 
        + (randomR + 25) + ", " 
        + (randomG + 25) + ", " 
        + (randomB + 25) + ")";
        hover_color.push(hoverColors);
    });
    console.log(label_pie);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label_pie,
            datasets: [{
                label: 'Vendas por atendente',
                data: dadoss_pie,
                borderWidth: 1,
                backgroundColor: color,
                hoverBackgroundColor: hover_color,
                borderColor: linhas_fora
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
    var color = [];
    var linhas_fora = [];
    var hover_color = [];
    $.each( JSON.parse(data),function(index, value){
        label.push(value['created']); 
        dadoss.push(value['total']);
        var randomR = Math.floor((Math.random() * 130) + 100);
        var randomG = Math.floor((Math.random() * 130) + 100);
        var randomB = Math.floor((Math.random() * 130) + 100);
       
        var graphBackground = "rgb(" 
                + randomR + ", " 
                + randomG + ", " 
                + randomB + ")";
        color.push(graphBackground);
        var graphOutline = "rgb(" 
        + (randomR - 80) + ", " 
        + (randomG - 80) + ", " 
        + (randomB - 80) + ")";
        linhas_fora.push(graphOutline);
        var hoverColors = "rgb(" 
        + (randomR + 25) + ", " 
        + (randomG + 25) + ", " 
        + (randomB + 25) + ")";
        hover_color.push(hoverColors);
    });
    var myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: label,
            datasets: [{
                label: 'Vendas por dia',
                data: dadoss,
                borderWidth: 1,
                backgroundColor: color,
                hoverBackgroundColor: hover_color,
                borderColor: linhas_fora
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