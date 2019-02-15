window.onload = function(){
    loadDoc(document.location.href.split("=")[1]);
    indentTab();

    if (screen.width <= 699) {
        var card = document.getElementsByClassName('card')[0];
        card.style.width = "90vw";
        card.style.minHeight = "90vh";
        card.style.marginBottom = "0px";
        card.style.marginTop = "5vh";
        card.style.fontSize = "50px";

        var txtAr = document.getElementById("textArea");
        txtAr.style.fontSize = "40px";
        txtAr.style.margin = "20px";
	txtAr.style.overflow = "auto";

        var buttSave = document.getElementById('buttSave');
        buttSave.style.fontSize = "10vw";
        buttSave.style.margin = "30px 10px";
        buttSave.style.width = "20vw";
        buttSave.style.height = "20vw";
    }
    else {
	var card = document.getElementsByClassName('card')[0];
	card.style.minWidth = "60vw";
	card.style.maxWidth = "90vw";
	card.style.overflow = "auto";
	card.style.resize = "horizontal";
    }
    var hour = new Date().getHours();
    if(hour < 8 || hour > 22){
        nightMode();
    }
    else{
	isIncognito();
    }
}
function nightMode(){
    var card = document.getElementsByClassName('card')[0];
    card.style.backgroundColor = "#505050";
    card.style.color = "#ffffff";

    var link = document.getElementsByTagName('link');
    for(i = 0; i < link.length; ++i) {
	if(link[i].href == "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/solarized-light.min.css")
		link[i].href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/solarized-dark.min.css";	
    }

    var bd = document.getElementsByTagName('body')[0];
    bd.style.backgroundColor = "#383838";
    bd.style.backgroundImage = "none";

    var tit = document.getElementById("titleArea");
    tit.onfocus = function() {
	tit.style.backgroundColor = "#383838";
    }
    tit.onblur = function() {
	tit.style.backgroundColor = "inherit";
    }

    document.getElementsByName("theme-color")[0].content = "#383838";
}

function blobToTxt(){
    var txtAreaValue = document.getElementById("textArea").textContent;

    var blob = new Blob([txtAreaValue], {type : 'text/plain'});
    var url = URL.createObjectURL(blob);

    //Drive save request
    var form = new FormData();
    form.append("uploaded_file", blob, document.getElementById("titleArea").textContent);
    var req = new XMLHttpRequest();
    req.open("POST", 'https://drive.arshwaraich.com/upload', true);
    req.onreadystatechange = function() { // Call a function when the state changes.
	if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
		console.log('done');
	}
    }
    req.send(form);

    //local save
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

function loadDoc(url) {
    if(url != undefined) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		document.getElementById("textArea").textContent = this.responseText;
		reParse();
	    }
	};
	xhttp.open("GET", url, true);
	xhttp.send();
    }
}

function isIncognito() {
    window.webkitRequestFileSystem(window.TEMPORARY,100,()=>{},nightMode);
}

function indentTab() {
	document.getElementById('textArea').onkeydown = function(event){
		if(event.keyCode == 9){
			event.preventDefault();
			if(event.shiftKey){
				document.execCommand('outdent', true, null);
			}
			else {
				document.execCommand('indent', true, null);
			}
		}
	}
}
