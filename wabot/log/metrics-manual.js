process.chdir("/home/luigi/WAbot-v1.0/wabot/log");
const fs = require('fs');

var tStam = [], idP = [];
const iNumber = 150; //numero intervalli

try {
    // read contents of the file
    const data = fs.readFileSync('tmp.txt','UTF-8');
    const lines = data.split("\n");
    lines.forEach((line) => {
        const tmp = line.split('#');
        tStam.push(tmp[0]);
        idP.push(tmp[1]);
    });
} catch (err) {
    console.error(err);
}
getChart(tStam,idP);
analizeId(tStam, idP);
if(parseInt(fs.statSync("tmp.txt").size)>30000){
              fs.unlinkSync("tmp.txt");
      }


async function analizeId(tStamp,id) {
    try {
        fs.unlinkSync("usage.txt");
    } catch {
        console.log("error");
    }
    const stream = fs.createWriteStream("usage.txt", { flags: 'a' }); //generate html file
    for (var i = 0; i < tStamp.length; i += 1) {
        if (tStamp[i] != 0) {//se non ▒ stato letto ancora
            var count = 0, min = tStamp[i], max = 0;
            for (var j = 0; j < id.length; j += 1) {
                if (id[j] == id[i]) {
                    count += 1;
                    if (tStamp[j] < min)
                        min = tStamp[j];
                    if (tStamp[j] > max)
                        max = tStamp[j];
                    tStamp[j] = 0;
                }
            }
            const elapsed = (max - min) / 60000;
            if (elapsed > 0.0) {
                const mAvg = count / elapsed;
                stream.write(id[i] + "#" + mAvg.toFixed(3) + "\n");

            }
        }
    }
    stream.end();
}
async function getChart( tStamp, id) {
    const start = new Date(parseInt(tStamp[0]));
    const end = new Date(parseInt(tStamp[tStamp.length - 2]));
    const delta = (end.getTime() - start.getTime()) / iNumber; //milliseconds
    const counts = [], startSt = [], endSt = [], mpm = [];
    var j = 0, tmpC = 0;
    for (var i = 0; i < iNumber; i += 1) {
        startTmp = start.getTime() + (delta * i);
        while (parseInt(tStamp[j]) < startTmp + delta) {
            j++;
            tmpC++;
        }
        counts.push(j);
        mpm.push(tmpC / (delta / 60000));
        var tmpDate = new Date(startTmp);
        startSt.push(tmpDate.getHours() + ':' + tmpDate.getMinutes());
        tmpDate.setTime(tmpDate.getTime() + delta);
        endSt.push(tmpDate.getHours() + ':' + tmpDate.getMinutes());
        tmpC = 0;
    }
    try {
        fs.unlinkSync("index.html");
    } catch {
        console.log("error");
    }
    const stream = fs.createWriteStream("index.html", { flags: 'a' }); //generate html file
    stream.write("<html>\n<head>\n<script type=\"text/javascript\" src=\"https://www.gstatic.com/charts/loader.js\"></script>\n<script type=\"text/javascript\">\ngoogle.charts.load('current', {'packages':['corechart']});\ngoogle.charts.setOnLoadCallback(drawChart);\n    function drawChart() {\nvar data = google.visualization.arrayToDataTable([\n['Orario', 'Messaggi/min'],");
    for (var i = 0; i < counts.length; i++) {
        stream.write("\n[\'" + startSt[i] + "\'," + parseInt(mpm[i]) + "],");
    }
    stream.write("]);var options = {title: 'Messaggi per minuto',curveType: 'lines',legend: { position: 'bottom' }};var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));chart.draw(data, options);}</script ></head ><body><div id=\"curve_chart\" style=\"width: 900px; height: 500px\"></div></body></html >");
    stream.end();
}
