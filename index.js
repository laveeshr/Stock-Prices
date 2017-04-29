/**
 * Created by laveeshrohra on 28/04/17.
 */

function addStock() {
    var stock = $("#stock");
    var stockVal = stock.val();
    $("#stockLists").append('<li class="stockVals">'+ stockVal +'</li>');
    stock.val("");
    reloadGraph();
}

function reloadGraph() {
    var stockVals = $(".stockVals");
    if(stockVals.length <= 0){
        return;
    }

    var stocks = [];

    $.each(stockVals, function (key, val) {
        stocks.push(val.innerHTML.toUpperCase());
    })

    $.ajax({
        url: 'http://finance.google.com/finance/info?client=ig&q=' + stocks.join(),
        dataType: 'jsonp',
        success: function (json) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Stocks');
            data.addColumn('number', 'Values');

                $.each(json, function (key, val) {
                    data.addRow([val['t'], parseFloat(val['l_cur'])]);
                })

            var options = {
                'title': "Stock Prices",
                'width':$("#stockChart").outerWidth(),
                'height':400,
                chartArea: {width: '80%'},
                hAxis: {
                    title: 'Price'
                },
                vAxis: {
                    title: 'Stock'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('stockChart'));
            chart.draw(data, options);
        }
    });
}