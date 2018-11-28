$(document).ready(function () {
    window.onload = function () {
        //console.log(document);
        var ctx = document.getElementById("myChart").getContext("2d");
        var data1 = {
            labels: [],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [10]
                }
            ]
        };
        var chartObj = new Chart(ctx, {
            type: 'line',
            data: data1,
            onAnimationComplete: function () {
                var sourceCanvas = this.chart.ctx.canvas;
                var copyWidth = this.scale.xScalePaddingLeft - 5;
                // the +5 is so that the bottommost y axis label is not clipped off
                // we could factor this in using measureText if we wanted to be generic
                var copyHeight = this.scale.endPoint + 5;
                var targetCtx = document.getElementById("myChartAxis").getContext("2d");
                targetCtx.canvas.width = copyWidth;
                targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth, copyHeight, 0, 0, copyWidth, copyHeight);
            }
        });

        $.connection.hub.url = "http://localhost:8090/signalr";
        var feedback = $.connection.feedbackHub;
        feedback.client.addMessage = function (data) {
            console.log(data.Size);
            addData(chartObj, data.Time, data.Size);
        };

        $.connection.hub.start().done(function () { });
        
        function addData(chartObj, label, data) {
            var k = Date.parse(label);
            chartObj.data.labels.push(k);
            var dt = chartObj.data.datasets[0].data;
            chartObj.data.datasets[0].data.push(data);
            if (dt.length > 20) {
                chartObj.data.datasets[0].data.shift();
                chartObj.data.labels.shift();
            }
            chartObj.update();
        }
    };
});