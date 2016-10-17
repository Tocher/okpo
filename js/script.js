$(document).ready(function () {
    var table = $('.table'),
        renredButton = $('.render'),
        chartElement = $('#chart'),
        dataFromTable = [],
        TABLE_INIT_ROWS = 10,
        TABLE_DATA_COLS = 3;

    for (var i = 0; i < TABLE_DATA_COLS; i++) {
        dataFromTable.push([]);
    }

    initTable(TABLE_INIT_ROWS);

    fillTableWithData();

    renredButton.click(onRenderClick);

    function onRenderClick() {
        var dataset = [];

        getDataFromTable();

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        dataset = dataFromTable.map(function (line, i) {
            return {
                label: 'ex ' + i,
                fill: false,
                borderColor: getRandomColor(),
                borderWidth: 2,
                data: line.map(function(elem, num) {
                    console.log('sad', elem, num, i);
                    return elem;
                    // return {
                    //     x: num,
                    //     y: elem
                    // };
                })
            };
        });

        console.log(dataset);

        var chart = new Chart(chartElement, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: dataset
                }
            });
    }

    function getDataFromTable() {
        var rows = table.find('tr');

        for (var i = 1; i < rows.length; i++) {
            $(rows[i]).children('td').map(function(j) {
                if (j === 0) return;

                var val = $(this).find('input').val();

                if (val)
                    return dataFromTable[j-1].push(parseFloat(val));
            }).get();
        }
    }

    function fillTableWithData() {
        var cells = $('.cell');

        cells.each(function (i, cell) {
            $(cell).val(randomNum());
        });
    }

    function randomNum() {
        return (Math.random() * 100).toFixed(2);
    }

    function initTable(n) {
        var rows = [],
            colsNum = table.find('td').length,
            row, el;

        for (var i = 0; i < n; i++) {
            row = [];

            for (var j = 0; j < colsNum; j++) {
                if (j === 0) {
                    el = i + 1;
                } else {
                    el = '<input type="text" class="cell form-control"/>';
                }

                row.push('<td>' + el + '</td>');
            }

            rows.push('<tr>' + row + '</tr>');
        }

        table.append(rows);
    }
});