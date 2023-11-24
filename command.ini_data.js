const { setDoc, doc, addDoc } = require("firebase/firestore");
const { fireStore } = require("./firebase.config");
const data = [{ name: "users", child: [] }];
//  user = { name : '' , role : 'STUDENT' , email :'',password:''}

data.forEach((d) => {
  d.child.forEach((dd) => {
    addData(fireStore, d.name, dd);
  });
});
async function addData(db, collection, data) {
  await addDoc(collection(db, collection), data);
}
