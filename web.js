(function() {
    const config = {
        apiKey: "AIzaSyBBJfI1xVF6yV4NEQaos6hkob14oagLs2c",
        authDomain: "test-ce9c3.firebaseapp.com",
        databaseURL: "https://test-ce9c3.firebaseio.com",
        storageBucket: "test-ce9c3.appspot.com",
        //   messagingSenderId: "453098043145",
    };
    firebase.initializeApp(config);
    var toDay = moment().format("DD-MM-YYYY");
    //  var ggggg = "22-03-2017";
    var HumiNode1 = "Device/Humidity/Node1";
    var HumiNode2 = "Device/Humidity/Node2";
    var HumiNode3 = "Device/Humidity/Node3";
    var TempNode1 = "Device/Temp/Node1";
    var dataNowDate = "DataLogger/TempNode1/" + toDay;
    //  console.log(dataNowDate);
    // const preObject = document.getElementById('object');
    const humiN1 = firebase.database().ref().child(HumiNode1);
    const humiN2 = firebase.database().ref().child(HumiNode2);
    const humiN3 = firebase.database().ref().child(HumiNode3);
    const tempN1 = firebase.database().ref().child(TempNode1);
    const NowDateLogger = firebase.database().ref().child(dataNowDate);
    $('#toggleHumi').click(function() {
        $("#humiBody").toggle("slow", function() {
            // Animation complete.
        });
    });
    $('#toggleTemp').click(function() {
        $("#tempBody").toggle("slow", function() {
            // Animation complete.
        });
    });
    $('#toggleData').click(function() {
        $("#dataBody").toggle("slow", function() {
            // Animation complete.
        });
    });
    var pieOptions = {
        events: false,
        animation: {
            animateRotate: true,
            duration: 500,
            easing: "easeOutQuart",
            onComplete: function() {
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function(dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                            total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                            mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                            start_angle = model.startAngle,
                            end_angle = model.endAngle,
                            mid_angle = start_angle + (end_angle - start_angle) / 2;
                        var x = mid_radius * Math.cos(mid_angle);
                        var y = mid_radius * Math.sin(mid_angle);
                        ctx.fillStyle = '#2C3E50';
                        if (i == 3) { // Darker text color for lighter background
                            ctx.fillStyle = '#444';
                        }
                        var val = dataset.data[i];
                        var percent = String(Math.round(val / total * 100)) + "%";
                        if (val != 0) {
                            //ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                            // Display percent in another line, line break doesn't work for fillText
                            ctx.fillText(percent, model.x + x, model.y + y + 15);
                        }
                    }
                });
            }
        }
    }; //piobtion
    humiN1.on('value', function(snapshot) {
        // var data = JSON.stringify(snapshot.val(), null, 3); // to string
        var data = JSON.stringify(snapshot.val());
        var valueFor = snapshot.val();
        var graphVal1 = valueFor;
        var data = {
            labels: ["100 %", "%Sensor N.1"],
            datasets: [{
                data: [graphVal1, 100 - graphVal1],
                backgroundColor: ["#52B3D9", "#EEEEEE"],
                hoverBackgroundColor: ["#4183D7", "#EEEEEE"]
            }]
        };
        var ctx = document.getElementById("serverstatus02");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: pieOptions
        });
    });
    humiN2.on('value', function(snapshot) {
        // var data = JSON.stringify(snapshot.val(), null, 3); // to string
        var data = JSON.stringify(snapshot.val());
        var valueFor = snapshot.val();
        var graphVal1 = valueFor;
        var data = {
            labels: ["100 %", "%Sensor N.2"],
            datasets: [{
                data: [graphVal1, 100 - graphVal1],
                backgroundColor: ["#52B3D9", "#EEEEEE"],
                hoverBackgroundColor: ["#4183D7", "#EEEEEE"]
            }]
        };
        var ctx = document.getElementById("serverstatus03");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: pieOptions
        });
    });
    humiN3.on('value', function(snapshot) {
        // var data = JSON.stringify(snapshot.val(), null, 3); // to string
        var data = JSON.stringify(snapshot.val());
        var valueFor = snapshot.val();
        var graphVal1 = valueFor;
        var data = {
            labels: ["100 %", "%Sensor N.3"],
            datasets: [{
                data: [graphVal1, 100 - graphVal1],
                backgroundColor: ["#52B3D9", "#EEEEEE"],
                hoverBackgroundColor: ["#4183D7", "#EEEEEE"]
            }]
        };
        var ctx = document.getElementById("serverstatus04");
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: pieOptions
        });
    });
    tempN1.on('value', function(snapshot) {
        // var data = JSON.stringify(snapshot.val(), null, 3); // to string
        var data = JSON.stringify(snapshot.val());
        $('#progressTemp1').html(data + "°C");
        $('#progressTemp1').width(data + "%");
    });
    NowDateLogger.on('value', function(snapshot) {
        // var data = JSON.stringify(snapshot.val(), null, 3); // to string
        var templogger = Object.values(snapshot.val());
        //console.log(data);
        var data = {
            labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
            datasets: [{
                label: "อุณหภูมิ",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "#F4B350",
                borderColor: "#F89406",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#F9690E",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 2,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: templogger,
                spanGaps: false,
            }]
        };
        var asdddd = document.getElementById("line01");
        var stackedLine = new Chart(asdddd, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    yAxes: [{
                        stacked: false
                    }]
                }
            }
        });
    });
    /*var amountUI = Object.keys(valueFor).length;
    var container = $('#data');
    var dataNameList = [];
    var arrrayName = JSON.stringify(valueFor); //
    for (i = 0; i < amountUI; i++) {
        var dataList = Object.keys(valueFor)[i];
        dataNameList.push(valueFor[dataList]['Name']);
        pathObject.push(valueFor[dataList]['path']);
        //  console.log(valueFor[dataList]['Name']);
    }*/
    //console.log(pathObject);
    /* var html = '';
     for (i = 0; i < amountUI; i++) {
         html += '<div id="div' + i + '" class="col-md-3"><div class="panel panel-primary"><div class="panel-body"><canvas height="50" id="myChart' + i + '" width="50"></canvas><span class="label label-info" id="label' + i + '">' + dataNameList[i] + '</span></div></div></div>';
     }
     var data = {
         labels: ["Red", "Blue"],
         datasets: [{
             data: [80, 50],
             backgroundColor: ["#FF6384", "#36A2EB"],
             hoverBackgroundColor: ["#FF6384", "#36A2EB"]
         }]
     };
     container.html(html);
     var ctx = document.getElementById("myChart0");
     var myChart = new Chart(ctx, {
         type: 'pie',
         data: data,
         options: {
             responsive: true
         }
     });*/
    // $("#object").text(valueFormget);
    //  $("#percentage").text(valueFormget + "%");
    //  var myDoughnut = new Chart(document.getElementById("humi").getContext("2d")).Pie(doughnutData);
    //  var myDoughnut2 = new Chart(document.getElementById("storage").getContext("2d")).Doughnut(storageData);
    /*console.log(pathObject);
    for (i = 0; i < pathObject.length; i++) {
        const dbRefObject3 = firebase.database().ref('Device/Humidity/Node1');
        dbRefObject3.on('value', function(snap) {
            console.log();
        });
    }*/
}());