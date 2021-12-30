function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function myFun() {
	// Import the functions you need from the SDKs you need
  
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBIcve7T7iBV7bTNU11TLd9Hyw4Odg-t9E",
    authDomain: "eavtosola.firebaseapp.com",
    projectId: "eavtosola",
    storageBucket: "eavtosola.appspot.com",
    messagingSenderId: "436932898452",
    appId: "1:436932898452:web:26861e23470be64cad0e81"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  //const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");
	var db = firebase.firestore();
	
	db.collection("ProstiTermini").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
	var pom = parseURLParams(window.location.href)
	console.log(pom)
	db.collection(pom["vrsta_izpita"][0]).add({
    DatumUra: pom["datum_ura"],
    Lokacija: pom["lokacija"],

})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
});
}
