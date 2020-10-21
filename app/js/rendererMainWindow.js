const {ipcRenderer} = require('electron');
const {remote} = require('electron');

// Mode buttons
const btnRealTime = document.getElementById("btn_realTime");
const btnFtp = document.getElementById("btn_ftp");

btnRealTime.onclick = function()
{
    btnFtp.classList.remove("active");
    btnRealTime.classList.add("active");

    // Active RealTime controller buttons
    btnPlay.classList.remove("active");
    btnPause.classList.remove("active");
    btnStop.classList.remove("active");
    btnSave.classList.remove("active");

    // Deactive FTP Open file button
    btnOpenFile.classList.add("active");
};

btnFtp.onclick = function()
{
    btnRealTime.classList.remove("active");
    btnFtp.classList.add("active");

    // Deactive RealTime controller buttons
    btnPlay.classList.add("active");
    btnPause.classList.add("active");
    btnStop.classList.add("active");
    btnSave.classList.add("active");

    // Active FTP Open file button
    btnOpenFile.classList.remove("active");
};

// System buttons
const btnClose = document.getElementById("btn_close");
const btnMaximize = document.getElementById("btn_maximize");
const btnConfigure = document.getElementById("btn_configure");

// FTP buttons
const btnOpenFile = document.getElementById("btn_openFile");

// Realtime buttons
const btnPlay = document.getElementById("btn_play");
const btnPause = document.getElementById("btn_pause");
const btnStop = document.getElementById("btn_stop");
const btnSave = document.getElementById("btn_save");
const btnAddData = document.getElementById("btn_addData");

btnClose.onclick = function()
{
    ipcRenderer.send('close-me')
};

btnMaximize.onclick = function()
{
    ipcRenderer.send('maximize-me')
};


// Create Anychart graph

var chartData = [];
var chart = null;
var dataSet = null;

anychart.onDocumentReady(function() 
{
    // create a data set
    dataSet = anychart.data.set(chartData);
    
    // map the data
    var mapping = dataSet.mapAs({x: "time", value: "value"});

    // create a chart
    chart = anychart.line();

    // create a series and set the data
    var series = chart.line(mapping);

    // set the container id and x scale
    chart.container("chart-container");
    chart.xScale().mode('continuous');

    // autoHide the scroller
    chart.xScroller().autoHide(true);
    chart.xScroller(true);

    // prevent the scrolling while the button is not released yet
    //chart.xZoom().continuous(false);
    
    // change the scroller orientation
    //chart.xScroller().position("beforeAxes");

    // adjusting the thumbs behavior and look
    //chart.xScroller().thumbs().autoHide(true);
    //chart.xScroller().thumbs().hoverFill("#FFD700");

    // set chart title
    chart.title("Top 5 pancake fillings");

    // initiate drawing the chart
    chart.draw();
    
    chart.xAxis().title("Tempo (ms)");
    chart.yAxis().title("Valor (mv)");

    chart.yScale().minimum(0);
    chart.yScale().maximum(50);

    // add a listener
    chart.xScroller().listen("scrollerchangefinish", function(e){

        var startRatio = e.startRatio;
        var endRatio = e.endRatio;
        // change the chart title
        chart.title("Exibindo de " + (startRatio*100).toFixed(0) + "% até " + (endRatio*100).toFixed(0) + "% do gráfico");

    });
});

var contador = 0;

btnAddData.addEventListener('click', function(e) {

    // Adicionar dado ao gráfico
    const valor = Math.floor(Math.random() * 21);

    dataSet.append({"time": contador, "value": valor});
    contador++;
});