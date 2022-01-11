const firebaseConfig = {
    apiKey: "AIzaSyDIdSpACQbc1-_JICLQ6gRjl_YrX25eiOA",
  authDomain: "mini-diary-organization.firebaseapp.com",
  projectId: "mini-diary-organization",
  storageBucket: "mini-diary-organization.appspot.com",
  messagingSenderId: "542075449644",
  appId: "1:542075449644:web:26133a6448c78f79927c89"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const username = prompt("What's your name?");

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
  });
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
});
