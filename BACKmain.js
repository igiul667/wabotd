/**********************************
 *          WAbot 1.0
 *     This file contains init
 *          for the BOT
 * **********************************/

//START INITIALIZATION-----------------------
//CONSTANTS----------------------------------
const red = "\x1b[31m";
const green = "\x1b[32m";
const white = "\x1b[37m";
const MaxMessageVer = 50;
//START LOGGING & LIBS-----------------------
console.log("Starting\n _    _  ___  _           _     _               __   _____ \n| |  | |/ _ \\| |         | |   (_)             /  | |  _  |\n| |  | / /_\\ \\ |__   ___ | |_   _ ___  __   __ `| | | | | |\n| |/\\| |  _  | '_ \\ / _ \\| __| | / __| \\ \\ / /  | | | | | |\n\\  /\\  / | | | |_) | (_) | |_ _| \\__ \\  \\ V \/  _| |_\\ |_/ /\n \\/  \\/\\_| |_/_.__/ \\___/ \\__(_) |___/   \\_/   \\___(_)___/ \n                              _/ |                         \n                             |__/                          ");
//console.log(green, "Loading venom lib");
const venom = require('venom-bot');     //interface for whatsapp
//console.log(green, "Loading mime lib");
const mime = require('mime-types');    //mime library
//console.log(green, "Loading emoj lib");
const emoji = require('node-emoji')     //aggiungere emoj ai messaggi
//console.log(green, "Loading exec lib");
const exec = require('child_process');  //command library
//console.log(green, "Loading file lib");
const fs = require('fs');               //file library
//console.log(green, "Loading POST lib");
const axios = require('axios');             //POST library
//console.log(green, "Loading MySQL");
const mysql = require('mysql');         //MySQL library
//console.log(white, "Loading libraries complete!");
const strArr = [];
const setArr = [];
//LOAD SETTINGS FILES------------------------
//expand for information about file
/* 0: work dir
*  1: language
*  2: pythonCommand
*/
try {
        const data = fs.readFileSync("./setting.set", 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            setArr.push(line);
        });
    } catch (err) {
        console.error(err);
    }
    if (setArr.length != 3) {//number of settings inside file
        console.error("%sInvalid settings file, contains: %s entries", red, setArr.lenght);
        exit(99);
    }
    else {
        //console.log(green, "Loaded settings data:", white);
        //console.table(setArr);
    }
process.chdir(setArr[0]);//set running directory
//LOAD lanGUAGE FILES------------------------
//expand for information about file
/* 0: error message
*  1: search on youtube
*  2: search audio message
*  3: search video message
*  4: here's what i found
*  5: tts says
*  6: search image
*  7: on google
*  8: Check this
 */
//console.log("%sLoading language file: %s/languages/%s.lan",white,setArr[0],setArr[1]);
//START MySQL Client
var con = mysql.createConnection({
    host: "192.168.0.200",
    user: "nodejs",
    password: "Q@nDGfBFk2%CpAr@y",
    port: '3306',
    database: "roberto_db",
});
//START MAIN [usage:start(filename, N° strings, success callback)
start(setArr[0] + "/languages/" + setArr[1]+".lan", 9, function(){
    //code only runs if language file OK
    //start the venom library
    venom
        .create({disableWelcome: true, headless: true})
        .then(tmp => main(tmp))
        .catch((erro) => {
            console.error(erro);
        });

});









//FUNCTION DECLARATIONS----------------------
//MAIN FUNCTIONS-----------------------------
function start(filename, strNum, callback) {
    try {
        const data = fs.readFileSync(filename, 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            strArr.push(line);
        });
    } catch (err) {
        console.error(err);
    }
    if (strArr.length != strNum) {
        console.error("%sInvalid language file, contains: %s entries", red, strArr.lenght);
        exit(100);
    }
    else {
        //console.log(green, "Loaded language data:", white);
        //console.table(strArr);
        callback();
    }
    console.log("Cleaning old files");
    exec.exec("rm " + setArr[0] + "*.mp3",(er) => {});
    exec.exec("rm " + setArr[0] + "*.mp4",(er) => {});
    exec.exec("rm " + setArr[0] + "*.jpg",(er) => {});
    exec.exec("rm " + setArr[0] + "*.jpeg",(er) => {});
}
function main(client) { //check for new messages (runs in loop forever)
    client.onMessage((message) => {
//      msgFile.write(Date.now()+"#"+message.from+'\n');
//      if(parseInt(fs.statSync(setArr[0]+"/log/tmp.txt").size)>30000){
//              fs.unlinkSync(setArr[0]+"/log/tmp.txt");
//      }
        axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+message.from+"&t=event&ec=messaggio&ea=messagio").catch(error => {console.error("error sending post request")});
        client.sendSeen(message.from);
        if (message.type == "chat" && message.body.length < 400) {
            if (message.body.startsWith(".roberto")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        tts(client, message.body.replace(".roberto", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith(".foto")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        foto(client, message.body.replace(".foto", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith(".audio")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        audio(client, message.body.replace(".audio", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith("@tagall") && message.isGroupMsg === true) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        tagall(client, message.from, message);
                });
            }
            if (message.body.startsWith(".video")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        video(client, message.body.replace(".video", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith("comandi")) {
                help(client, message.from);
            }
        }
        else {
            if (message.caption.startsWith(".sticker")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        sticker(client, message.from, message, Date.now());
                });
            }
        }
    });
}
//BACK END-----------------------------------
function exit(code) {
    console.log(red, "Process returned:", code);
    console.log(white, "Press any key to exit");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', () => {process.exit();useFile.end()});
}
function sendErr(client, chatId) {//Inizializzare funzione invio errore
    client.sendText(chatId, strArr[0]);
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=Errore").catch(error => {console.error("error sending post request")});

}

function setCode(chatId, callback) { //ottiene chatCode casuale e verifica, poi lo restituisce come int (da usare se l'entrata chatID non è presente nella tabella)
    var tempCode = Math.floor(100000 + Math.random() * 900000);//genera codice a 6 cifre
    //con.query("UPDATE utenti SET chatCode = '" + tempCode + "', active = '0' WHERE chatId = '" + chatId + "';", function (err, result, fields) {
    con.query("INSERT INTO utenti (chatId, chatCode, count) VALUES ('" + chatId + "','" + tempCode + "','" + (MaxMessageVer + 1) + "');", function (err, result, fields) {
        if (err) console.log(err);
        callback(tempCode);
    });
}
function upCode(chatId, callback) { //ottiene chatCode casuale e verifica, poi lo restituisce come int (aggiorna un'entrata gia presente)
    var tempCode = Math.floor(100000 + Math.random() * 900000);//genera codice a 6 cifre
    con.query("UPDATE utenti SET chatCode = '" + tempCode + "' WHERE chatId = '" + chatId + "';", function (err, result, fields) {
        if (err) console.log(err);
        callback(tempCode);
    });
}
//BOT----------------------------------------
async function tts(client, text, chatId, title) { //funzione per generare audio (TTS) e inviare
//    console.log("%sCalling external program: %s%stts.py -c \"%s\" -n %s -l %s", green, setArr[2], setArr[0], text, title, setArr[1]);
    await exec.execSync(setArr[2] + setArr[0] + 'tts.py -c "' + text + '" -n ' + title + ' -l ' + setArr[1]);
    await client
        .sendFile(chatId, setArr[0] + title + ".mp3", text, "")
        .then(() => {
            client.sendText(chatId, emoji.get('arrow_up') + strArr[5]);
	    fs.unlink(setArr[0] + title + ".mp3", (er) => {} ); //delete non necessary media
        })
        .catch((erro) => {
            console.error("%sError sending tts audio! ", red);
            sendErr(client, chatId);
        });
//     client.sendText(chatId, "Roberto ha superato il limite di messaggi giornalieri è bloccato");
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=roberto&el=roberto_char_count&ev="+text.length).catch(error => {console.error("error sending post request")});
}
async function audio(client, text, chatId, title) { //funzione per generare audio e inviare
//    console.log("%salling external program: %s%sytd.py -t \"%s\" -n %s -m audio", green, setArr[2], setArr[0], text, title);
    await client.sendText(chatId, emoji.get('mag') + strArr[2] + text + strArr[1]);
    await exec.execSync(setArr[2] + setArr[0] + 'ytd.py -t "' + text + '" -n ' + title + ' -m audio');
  //  console.log(setArr[2] + setArr[0] + 'ytd.py -t "' + text + '" -n ' + title + ' -m audio');
    await client
	  .sendFile(chatId, setArr[0] + title + ".mp3", text, "")
	  .then(()=>{
	     fs.unlink(setArr[0] + title + ".mp3", (er) => {  }); //delete non necessary media
	     client.sendText(chatId, emoji.get('arrow_up') + strArr[4] + text);

	  })
	  .catch((erro) => {
            console.error("%sError sending video! (filename:%s.mp3)", red, title);
//	     console.log(red,erro,white);
            sendErr(client, chatId);
        });

     axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=audio").catch(error => {console.error("error sending post request")});

}
async function video(client, text, chatId, title) { //funzione per generare video e inviare
//    console.log("%sCalling external program: %s%sytd.py -t \"%s\" -n %s -m video", green, setArr[2], setArr[0], text, title);
    await client.sendText(chatId, emoji.get('mag') + strArr[3] + text + strArr[1]); //invio messaggio unknowledge
    await exec.execSync(setArr[2] + setArr[0] + 'ytd.py -t "' + text + '" -n ' + title + ' -m video'); //esegui python script
    await client.sendFile(chatId, setArr[0] + title + ".mp4", text, emoji.get('white_check_mark') + strArr[4] + text)
	.then(()=>{
	    fs.unlink(setArr[0] + title + ".mp4", (er) => {  }); //delete non necessary media
	})
        .catch((erro) => {
            console.error("%sError sending video! (filename:%s.mp4)", red, title);
            sendErr(client, chatId);
        });
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=video").catch(error => {console.error("error sending post request")});

}
async function foto(client, text, chatId, title) { //funzione per generare foto e inviare
    var mode = "-";
    if (text.includes("NSFW")) {
        text.replace("NSFW", "");
        mode = "NSFW";
    }
//    console.log("%sCalling external program: %s%sfoto.py -t \"%s\" -n %s -m %s", green, setArr[2], setArr[0], text, title, mode);
    await client.sendText(chatId, emoji.get('mag') + strArr[6] + text + strArr[7]); //invio messaggio unknowledge
    await exec.execSync(setArr[2] + setArr[0] + 'foto.py -t "' + text + '" -n ' + title + ' -m ' + mode); //esegui python script
    await client.sendFile(chatId, setArr[0] + title + ".jpg", text, emoji.get('white_check_mark') + strArr[4] + text)
	.then(()=>{
	    fs.unlink(setArr[0] + title + ".jpg", (er) => {  }); //delete non necessary media
	    fs.unlink(setArr[0] + title + ".jpeg", (er) => {  }); //delete non necessary media
	})
        .catch((erro) => {
            console.error("%sError sending foto! (filename:%s.jpg)", red, title);
            sendErr(client, chatId);
        });

//    await client.sendText(chatId, "Limite foto giornaliere raggiunto, si resetta alle 0:00 del 21/05/2021"); 
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=foto").catch(error => {console.error("error sending post request")});

}
async function sticker(client, chatId, message, title) {
    const buffer = await client.decryptFile(message);
    const ext = "." + await mime.extension(message.mimetype);
    fs.writeFileSync(setArr[0] + title + ext, buffer, (err) => {
        console.error(red, "Error downloading media");
    });
/*    if (ext == ".gif") { //NOT WORKING
        client.sendImageAsStickerGif(chatId, setArr[0] + title + ext)
            .then((res) => {
                fs.unlinkSync(setArr[0] + title + ext);
            })
            .catch((erro) => {
                console.error(red, "Error sending sticker gif");
            });
    }*/
    if (ext == ".jpeg" || ext == ".jpg") {
        await client.sendImageAsSticker(chatId, setArr[0] + title + ext)
	    .then(()=>{
        	fs.unlink(setArr[0] + title + ".jpg", (er) => {  }); //delete non necessary media
	        fs.unlink(setArr[0] + title + ".jpeg", (er) => {  }); //delete non necessary media
	    })
            .catch((erro) => {
                console.error(red, "Error sending sticker");
            });
    }
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=sticker").catch(error => {console.error("error sending post request")});

}
async function tagall(client, chatId, message) { //funzione per generare foto e inviare
//    console.log("%sCalling external program: %s%sfoto.py -t \"%s\" -n %s -m %s", green, setArr[2], setArr[0], text, title, mode);
        var repl = await client.returnReply(message); // replicated message
        var part = await client.getGroupMembers(chatId);
        var arr = [];
        var msg="";
//      console.log(repl);
        for (let i=0;i<part.length;i++){
//              console.log(part[i].id.user);
                arr.push(part[i].id.user);
                msg += (' @'+part[i].id.user);
        }
        await client.sendMentioned(
          chatId,
          msg,
          arr,
        );
	console.log("ReplyID:",repl.id);
	console.log("cahtID:",chatId);
	client.reply(
         chatId,
         emoji.get('arrow_up')+strArr[8],
         repl.id,
        ).catch((erro) => {
            console.error('Error when replying: ', erro); //return object error
        });;
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=tagall").catch(error => {console.error("error sending post request")});

}
async function help(client, chatId) { //funzione per messaggio aiuto
        const text = fs.readFileSync(setArr[0]+"/languages/"+setArr[1]+".help",'UTF-8').toString();
        await client.sendText(chatId,text);
    axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=interazione&ea=comandi").catch(error => {console.error("error sending post request")});
}
function validate(client, chatId, callback) { //funzione per validazione chat
    con.query("SELECT count FROM utenti WHERE chatId = '" + chatId + "';", function (err, result, fields) {
        if (err) console.log(err);
        if (result[0] == undefined ) {//check if the entry exists
            console.log("recived message from new group, verifying");
            setCode(chatId, function (code){
		sendCode(client, code, chatId);
                callback(false);
            });
        }
        else {
            if (result[0].count < MaxMessageVer) { //chatId registrato e valido
                callback(true);
                con.query("UPDATE utenti SET count=count+1  WHERE chatId = '" + chatId + "';", function (err, result, fields) {
                    if (err) console.log(err);
                });
            }
            else { //se il chatId è registrato, ma non è attivo allora aggiorna il codice
                upCode(chatId,  function (code){
		    sendCode(client, code, chatId);
                    callback(false);
                });
            }
        }

    });
}
async function sendCode(client, codice, chatId){
	await client.sendText(chatId,	"*Questa chat ha terminato le interazioni*\nPer riabilitare il bot, visita:\n http://robertobot.duckdns.org \nVerrai spostato su una pagina dove verrà richiesto di inserire il seguente codice:");
	await client.sendText(chatId,codice.toString());
	axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=verifica&ea=limite_messaggi").catch(error => {console.error("error sending post request")});
}
