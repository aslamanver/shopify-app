var chatBox = `
<div class="my-chat-bot">
<div id="d-head" class="cb-head">
    I am a ChatBot
</div>
<div id="d-body" class="cb-body">
    <div class="my-chat">
        <div class="my-chat-body">
            Hi I am a chatBot, How can I help you
        </div>
    </div>
    <div class="my-chat me-chat">
        <div class="my-chat-body">
            Hi
        </div>
    </div>
</div>
<div class="cb-footer">
    <div class="ft-wrapper" id="d-fwrapper">
        <div class="input-area">
            <input id="txt-chat" type="text" />
        </div>
        <div class="submit-area">
            <button onclick="send()" type="submit">Send</button>
        </div>
    </div>
    <div class="copy-text"><a onclick="minimize()" href="#">X</a> © 2020 Aslam Anver, Some Company Inc.</div>
</div>
</div>`

var chat = (x) => `
<div class="my-chat me-chat">
    <div class="my-chat-body">
        ${x}
    </div>
</div>`


function send() {

    var body = document.getElementById('d-body');
    var text = document.getElementById('txt-chat');

    if (text.value == '') return;
    var htmlText = chat(text.value);
    body.innerHTML = body.innerHTML + htmlText;
    text.value = '';
}

function minimize() {

    var display = document.getElementById('d-head').style.display == 'none' ? 'block' : 'none';

    document.getElementById('d-head').style.display = display;
    document.getElementById('d-body').style.display = display;
    document.getElementById('d-fwrapper').style.display = display == 'block' ? 'flex' : 'none';
}

function initChatBox() {

    var head = document.head;
    var body = document.body;
    var style = document.createElement("link");

    style.type = "text/css";
    style.rel = "stylesheet";
    style.href = '/public/my-chat-style.css';

    head.appendChild(style);

    body.innerHTML = body.innerHTML + chatBox;

    var chatHead = document.getElementById('d-head');
    chatHead.innerHTML = chatHead.innerHTML + window.location;
}

window.addEventListener("load", function (evt) {
    initChatBox();
});