const firebaseConfig = {
  apiKey: "AIzaSyAgcMf7umnASf0vSmuKWJlVSIbe3K0tAfA",
  authDomain: "chess-game-a8036.firebaseapp.com",
  projectId: "chess-game-a8036",
  storageBucket: "chess-game-a8036.appspot.com",
  messagingSenderId: "481285790558",
  appId: "1:481285790558:web:3c2218fcedb674f0f94dcf",
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
