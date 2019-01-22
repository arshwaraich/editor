window.onload = function(){
    if (screen.width <= 699) {
        var card = document.getElementsByClassName('card')[0];
        card.style.width = "90vw";
        card.style.height = "90vh";
        card.style.marginBottom = "0px";
        card.style.marginTop = "5vh";
        
        var buttSave = document.getElementById('buttSave');
        buttSave.style.fontSize = "10vw";
        buttSave.style.margin = "30px 10px";
        buttSave.style.width = "20vw";
        buttSave.style.height = "20vw";
    }
    var hour = new Date().getHours();
    if(hour < 8 || hour > 22){
        //nightMode();
    }
    
}
function nightMode(){
    var card = document.getElementsByClassName('card')[0];
    card.style.backgroundColor = "#505050";
    card.style.color = "#ffffff";

    var bd = document.getElementsByTagName('body')[0];
    bd.style.backgroundColor = "#383838";
    bd.style.backgroundImage = "none";
}

function blobToTxt(){
    var txtAreaValue = document.getElementById("textArea").textContent;

    var blob = new Blob([txtAreaValue], {type : 'text/plain'});
    var url = URL.createObjectURL(blob);

    var link = document.createElement("a");
    document.getElementsByTagName("body")[0].appendChild(link);
    link.href = url;
    link.download = document.getElementById("titleArea").textContent;
    link.style.display = "none";
    link.click();
}

var str;
function reParse() {
    var txtAr = document.getElementById("textArea");
    str = "";
    for(var i = 0; i < txtAr.childNodes.length; ++i) {
        str += txtAr.childNodes[i].textContent + "\n";
    }
    str = str.slice(0, -1);
    txtAr.innerHTML = '';
    txtAr.textContent = str;
    hljs.highlightBlock(txtAr);
}

function deParse() {
    var txtAr = document.getElementById("textArea");
    txtAr.removeAttribute("class");
    txtAr.innerHTML = '';
    txtAr.textContent = str;
}