/**********************************
 *          WAbot 1.0
 *     This file contains init
 *          for the BOT
 * **********************************/

//START INITIALIZATION-----------------------
//CONSTANTS----------------------------------

const MaxMessageVer = 50;
const SETTINGS_LINES = 3;
const STRING_LINES = 9;
const DEBUG_LVL = 3;
//START LOGGING & LIBS-----------------------
const red = "\x1b[31m";
const green = "\x1b[32m";
const white = "\x1b[37m";
console.log("\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\r\n\u2588\u2588\u2591\u2588\u2588\u2588\u2591\u2588\u2591\u2584\u2584\u2580\u2588\u2591\u2584\u2584\u2580\u2588\u2580\u2584\u2584\u2580\u2588\u2584\u2591\u2584\u2588\u2588\u2588\u2588\u2588\u2588\u2584\u2588\u2591\u2584\u2584\u2588\u2588\u2588\u2591\u2584\u2591\u2588\u2588\u2588\u2588\u2591\u2584\u2584\u2591\r\n\u2588\u2588\u2591\u2588\u2591\u2588\u2591\u2588\u2591\u2580\u2580\u2591\u2588\u2591\u2584\u2584\u2580\u2588\u2591\u2588\u2588\u2591\u2588\u2588\u2591\u2588\u2588\u2580\u2580\u2588\u2588\u2588\u2591\u2588\u2584\u2584\u2580\u2588\u2588\u2588\u2588\u2580\u2584\u2588\u2580\u2580\u2588\u2591\u2580\u2584\u2591\r\n\u2588\u2588\u2584\u2580\u2584\u2580\u2584\u2588\u2591\u2588\u2588\u2591\u2588\u2584\u2584\u2584\u2584\u2588\u2588\u2584\u2584\u2588\u2588\u2588\u2584\u2588\u2588\u2584\u2584\u2588\u2591\u2580\u2591\u2588\u2584\u2584\u2584\u2588\u2588\u2588\u2591\u2580\u2580\u2588\u2584\u2584\u2588\u2591\u2580\u2580\u2591\r\n\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580");
if(DEBUG_LVL>1) console.log(white, "Loading venom lib");
const venom = require('venom-bot');     //interface for whatsapp
if (DEBUG_LVL > 1) console.log(white, "Loading mime lib");
const mime = require('mime-types');    //mime library
if (DEBUG_LVL > 1) console.log(white, "Loading emoj lib");
const emoji = require('node-emoji')     //aggiungere emoj ai messaggi
if (DEBUG_LVL > 1) console.log(white, "Loading exec lib");
const exec = require('child_process');  //command library
if (DEBUG_LVL > 1) console.log(white, "Loading file lib");
const fs = require('fs');               //file library
if (DEBUG_LVL > 1) console.log(white, "Loading POST lib");
const axios = require('axios');             //POST library
if (DEBUG_LVL > 1) console.log(white, "Loading MySQL");
const mysql = require('mysql');         //MySQL library
if (DEBUG_LVL > 1) console.log(green, "Loading libraries complete!");
const strArr = []; //array messaggi
const setArr = []; //array impostazioni
//LOAD SETTINGS FILES------------------------
if (DEBUG_LVL > 1) console.log(white, "Loading settings");
try {
        const data = fs.readFileSync("./setting.set", 'UTF-8');
        const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
	    if(line!='') setArr.push(line);
        });
}
catch (err) {
    console.error(err);
}
if (setArr.length != SETTINGS_LINES) {//number of settings inside file
    console.error("%sInvalid settings file, contains: %s entries", red, setArr.lenght);
    exit(99);
}
else {
    if (DEBUG_LVL > 1) console.log(green, "Loaded settings data:", white);
    if (DEBUG_LVL > 3) console.table(setArr);
}
process.chdir(setArr[0]);//set running directory
//LOAD lanGUAGE FILES------------------------
if (DEBUG_LVL > 1) console.log("%sLoading language file: %s/languages/%s.lan",white,setArr[0],setArr[1]);
//START MySQL Client
/*
var con = mysql.createConnection({
    host: "192.168.0.200",
    user: "nodejs",
    password: "Q@nDGfBFk2%CpAr@y",
    port: '3306',
    database: "roberto_db",
});*/
//START MAIN [usage:start(filename, N° strings, success callback)
start(setArr[0] + "/languages/" + setArr[1]+".lan", function(){
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
function start(filename, callback) {
    try {
        const data = fs.readFileSync(filename, 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            if(line!='') strArr.push(line);
        });
    } catch (err) {
        console.error(err);
    }
    if (strArr.length != STRING_LINES) {
        console.error("%sInvalid language file, contains: %s entries", red, strArr.lenght);
        exit(100);
    }
    else {
        //console.log(green, "Loaded language data:", white);
        //console.table(strArr);
        callback();
    }
    console.log(green, "Cleaning old files");
    exec.exec("rm " + setArr[0] + "*.mp3",(er) => {});
    exec.exec("rm " + setArr[0] + "*.mp4",(er) => {});
    exec.exec("rm " + setArr[0] + "*.jpg",(er) => {});
    exec.exec("rm " + setArr[0] + "*.jpeg",(er) => {});
}
function main(client) { //check for new messages (runs in loop forever)
    //console.log("Check if this runs");
    leaveOld(client);
    client.onMessage((message) => {
//      msgFile.write(Date.now()+"#"+message.from+'\n');
//      if(parseInt(fs.statSync(setArr[0]+"/log/tmp.txt").size)>30000){
//              fs.unlinkSync(setArr[0]+"/log/tmp.txt");
//      }
        analytics(message.from, "Message");
        client.sendSeen(message.from);
        if (message.type == "chat" && message.body.length < 400) {
            if (message.body.startsWith(".roberto")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        tts(client, message.body.replace(".roberto ", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith(".foto")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        foto(client, message.body.replace(".foto ", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith(".audio")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        audio(client, message.body.replace(".audio ", ""), message.from, Date.now());
                });
            }
            if (message.body.startsWith("@tagall") && message.isGroupMsg === true) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        tagall(client, message.from, message);
                });
            }
            if (message.body.startsWith(".video ")) {
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
                    if (active)  //controlla se il chatId è attivo
                        video(client, message.body.replace(".video ", ""), message.from, Date.now());
                });
            }
	    if (message.body.toLowerCase().startsWith(".sticker ")){
                validate(client, message.from, (active) => { //controlla se il chatId è registrato
	           if (active)  //controlla se il chatId è attivo
	               tagsticker(client, message.from, message, Date.now());
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
    analytics(chatId,"Error")

}

function setCode(chatId, callback) { //ottiene chatCode casuale e verifica, poi lo restituisce come int (da usare se l'entrata chatID non è presente nella tabella)
    /*
    var tempCode = Math.floor(100000 + Math.random() * 900000);//genera codice a 6 cifre
    //con.query("UPDATE utenti SET chatCode = '" + tempCode + "', active = '0' WHERE chatId = '" + chatId + "';", function (err, result, fields) {
    con.query("SELECT count FROM utenti WHERE chatCode = '" + tempCode + "';", function (err, result, fields) {
	if(result[0] == undefined){
	     con.query("INSERT INTO utenti (chatId, chatCode, count) VALUES ('" + chatId + "','" + tempCode + "','" + (MaxMessageVer + 1) + "');", function (err, result, fields) {
             	if (err) console.log(err);
	        callback(tempCode);
	     });
	}
	else{
	    setCode(chatId,(code)=>{callback(code)});
	}
    });*/
}
function upCode(chatId, callback) { //ottiene chatCode casuale e verifica, poi lo restituisce come int (aggiorna un'entrata gia presente)
    
 /*   var tempCode = Math.floor(100000 + Math.random() * 900000);//genera codice a 6 cifre
    con.query("SELECT count FROM utenti WHERE chatCode = '" + tempCode + "';", function (err, result, fields) {
	if(result[0] == undefined){
             con.query("UPDATE utenti SET chatCode = '" + tempCode + "' WHERE chatId = '" + chatId + "';", function (err, result, fields) {
             	if (err) console.log(err);
	        callback(tempCode);
	     });
	}
	else{
	    setCode(chatId,(code)=>{callback(code)});
	}
    });*/
}
//BOT----------------------------------------
async function tts(client, text, chatId, title) { //funzione per generare audio (TTS) e inviare
    if (DEBUG_LVL > 2) console.log("%sCalling external program: %s%stts.py -c \"%s\" -n %s -l %s", green, setArr[2], setArr[0], text, title, setArr[1]);
    await exec.execSync(setArr[2] + setArr[0] + 'tts.py -c "' + text + '" -n ' + title + ' -l ' + setArr[1]);
    await client
        .sendVoice(chatId, setArr[0] + title + ".mp3", text, "")
        .then(() => {
            client.sendText(chatId, emoji.get('arrow_up') + strArr[5]);
	    fs.unlink(setArr[0] + title + ".mp3", (er) => {} ); //delete non necessary media
        })
        .catch((erro) => {
            if (DEBUG_LVL > 1) console.error("%sError sending tts audio! ", red);
            sendErr(client, chatId);
        });
//     client.sendText(chatId, "Roberto ha superato il limite di messaggi giornalieri è bloccato");
    analytics(chatId,"TTS");
}
async function audio(client, text, chatId, title) { //funzione per generare audio e inviare
    if (DEBUG_LVL > 2) console.log("%sCalling external program: %s%sytd.py -t \"%s\" -n %s -m audio", green, setArr[2], setArr[0], text, title);
    await client.sendText(chatId, emoji.get('mag') + strArr[2] + text + strArr[1]);
    try{
	    await exec.execSync(setArr[2] + setArr[0] + 'ytd.py -t "' + text + '" -n ' + title + ' -m audio')
    } catch (error) {
        if (DEBUG_LVL > 1) console.error(red, "Error downloading audio", white);
    }
;
    if (DEBUG_LVL > 1) console.log(setArr[2] + setArr[0] + 'ytd.py -t "' + text + '" -n ' + title + ' -m audio');
    await client
	  .sendFile(chatId, setArr[0] + title + ".mp3", text, "")
	  .then(()=>{
          fs.unlink(setArr[0] + title + ".mp3", (er) => { }); //delete non necessary media
          fs.unlink(setArr[0] + title + ".mp4", (er) => { }); //delete non necessary media
	     client.sendText(chatId, emoji.get('arrow_up') + strArr[4] + text);
	  })
	  .catch((erro) => {
          if (DEBUG_LVL > 1) console.error("%sError sending audio! (filename:%s.mp3)", red, title);
          sendErr(client, chatId);
        });

    analytics(chatId, "Audio");

}
async function video(client, text, chatId, title) { //funzione per generare video e inviare
    if (DEBUG_LVL > 2) console.log("%sCalling external program: %s%sytd.py -t \"%s\" -n %s -m video", green, setArr[2], setArr[0], text, title);
    await client.sendText(chatId, emoji.get('mag') + strArr[3] + text + strArr[1]); //invio messaggio unknowledge
    try{
	await exec.execSync(setArr[2] + setArr[0] + 'ytd.py -t "' + text + '" -n ' + title + ' -m video')
    } catch (error){
        if (DEBUG_LVL > 1) console.error(red,"Error downloading video", white);
    }
    await client.sendFile(chatId, setArr[0] + title + ".mp4", text, emoji.get('white_check_mark') + strArr[4] + text)
	  .then(()=>{
	    fs.unlink(setArr[0] + title + ".mp4", (er) => {  }); //delete non necessary media
	  })
      .catch((erro) => {
        if (DEBUG_LVL > 1) console.error("%sError sending video! (filename:%s.mp4)", red, title);
        sendErr(client, chatId);
      });
    analytics(chatId, "Video");

}
async function foto(client, text, chatId, title) { //funzione per generare foto e inviare
    var mode = "-";
    if (text.includes("NSFW")) {
        text.replace("NSFW", "");
        mode = "NSFW";
    }
    if (DEBUG_LVL > 2)    console.log("%sCalling external program: %s%sfoto.py -t \"%s\" -n %s -m %s", green, setArr[2], setArr[0], text, title, mode);
    await client.sendText(chatId, emoji.get('mag') + strArr[6] + text + strArr[7]); //invio messaggio unknowledge
    try{
    	await exec.execSync(setArr[2] + setArr[0] + 'foto.py -t "' + text + '" -n ' + title + ' -m ' + mode); //esegui python script
    } catch (error){
        if (DEBUG_LVL > 1) console.error(red,"Error downloading foto", white);
    }

    await client.sendFile(chatId, setArr[0] + title + ".jpg", text, emoji.get('white_check_mark') + strArr[4] + text)
	.then(()=>{
	    fs.unlink(setArr[0] + title + ".jpg", (er) => {  }); //delete non necessary media
	    fs.unlink(setArr[0] + title + ".jpeg", (er) => {  }); //delete non necessary media
	})
        .watch((erro) => {
            if (DEBUG_LVL > 1) console.error("%sError sending foto! (filename:%s.jpg)", red, title);
            sendErr(client, chatId);
        });

//    await client.sendText(chatId, "Limite foto giornaliere raggiunto, si resetta alle 0:00 del 21/05/2021"); 
    analytics(chatId, "Foto");

}
async function sticker(client, chatId, message, title) {
    const buffer = await client.decryptFile(message);
    const ext = "." + await mime.extension(message.mimetype);
    fs.writeFileSync(setArr[0] + title + ext, buffer, (err) => {
        if (DEBUG_LVL > 1) console.error(red, "Error downloading media");
    });
    if (DEBUG_LVL > 2) console.log("Sticker extension:",ext);
    if (ext == ".mp4") { //NOT WORKING
        await  exec.execSync("ffmpeg -loglevel panic -y -i " + setArr[0]+title + ".mp4 -vf palettegen " + setArr[0]+title + ".png");
        await  exec.execSync("ffmpeg -loglevel panic -y -i " + setArr[0]+title + ".mp4 -i " +setArr[0]+title + ".png -filter_complex scale=512:-1,crop=in_w:512,paletteuse -r 10 " + setArr[0]+title + ".gif");
        fs.unlink(setArr[0] + title + ".mp4", (er) => {  }); //delete non necessary media
        fs.unlink(setArr[0] + title + ".png", (er) => {  }); //delete non necessary media
        if (DEBUG_LVL > 2) console.log("sending gif");
        await client.sendImageAsStickerGif(chatId, setArr[0] + title + ".gif")
            .catch((erro) => {
                if (DEBUG_LVL > 1) console.error(red, "Error sending sticker gif");
            });
        fs.unlink(setArr[0] + title + ".gif", (er) => {  }); //delete non necessary media
    }
    if (ext == ".jpeg" || ext == ".jpg") {
        await client.sendImageAsSticker(chatId, setArr[0] + title + ext)
	    .then(()=>{
        	fs.unlink(setArr[0] + title + ext, (er) => {  }); //delete non necessary media
	    })
            .catch((erro) => {
                if (DEBUG_LVL > 1) console.error(red, "Error sending sticker");
            });
    }
    analytics(chatId, "Sticker");

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
	client.reply(
         chatId,
         emoji.get('arrow_up')+strArr[8],
         repl.id,
        ).catch((erro) => {
            if (DEBUG_LVL > 1) console.error('Error when replying: ', erro); //return object error
        });;
    analytics(chatId, "Tagall");

}
async function tagsticker(client, chatId, message, title){
    var repl = await client.returnReply(message); // replicated message
    if(repl != undefined){
        sticker(client, chatId, repl, title);
    }
}
async function help(client, chatId) { //funzione per messaggio aiuto
        const text = fs.readFileSync(setArr[0]+"/languages/"+setArr[1]+".help",'UTF-8').toString();
        await client.sendText(chatId,text);
    analytics(chatId, "Comandi");
}
function validate(client, chatId, callback) { //funzione per validazione chat
    callback(true)
    /*con.query("SELECT count FROM utenti WHERE chatId = '" + chatId + "';", function (err, result, fields) {
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

    });*/
}
async function sendCode(client, codice, chatId){
	await client.sendText(chatId,	"*Questa chat ha terminato le interazioni*\nPer riabilitare il bot, visita:\n http://robertobot.duckdns.org \nVerrai spostato su una pagina dove verrà richiesto di inserire il seguente codice:");
	await client.sendText(chatId,codice.toString());
	axios.post("https://www.google-analytics.com/collect","v=1&t=pageview&tid=UA-196829682-1&cid="+chatId+"&t=event&ec=verifica&ea=limite_messaggi").catch(error => {console.error("error sending post request")});
}
function leaveOld(client){
    /*con.query("select chatId from utenti where last_use < NOW() - INTERVAL 2 WEEK;", function (err, result, fields) {
	if(result[0]!=undefined){
	   result.forEach(groupId => {
		console.log("leaving group:",groupId.chatId);
//		client.leaveGroup(groupId.chatId).then(()=>{ await client.leaveGroup(groupId.chatId); });
           })
	}
	else
	    console.log("No old groups to leave");
    });*/
}
function analytics(client_id, event_name) {
    const measurement_id = 'G-0BE6M947L6';
    const api_secret = '-4eLYTRSTyGdFAa1_kafZA';
    axios.post('https://www.google-analytics.com/mp/collect?&api_secret=' + api_secret + '&measurement_id=' + measurement_id,
        {
            "client_id": client_id,
            "events": [{
                "name": event_name,
                "params": {
                    "engagement_time_msec": "100",
                    "session_id": client_id
                },
            }
            ]

        });
}
