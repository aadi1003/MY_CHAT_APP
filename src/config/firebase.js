import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, doc, getDocs, getFirestore,query,setDoc, where } from "firebase/firestore";
import { collapseToast, toast } from "react-toastify";





const firebaseConfig = {
  apiKey: "AIzaSyBX2tAhrxpm_5gY8Z9uCQ0Tu6ubdRVM9QE",
  authDomain: "chat-app-gs-cfa82.firebaseapp.com",
  projectId: "chat-app-gs-cfa82",
  storageBucket: "chat-app-gs-cfa82.appspot.com",
  messagingSenderId: "74457663809",
  appId: "1:74457663809:web:95fd7966ac5edc18e4f9c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth =getAuth(app)
const db = getFirestore(app)


const signup=async(username,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user =res.user
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey,There i am using chat app",
            lastseen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })



    } 
    catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}



const login=async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }
    catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const logout=async()=>{
    try {
        await signOut(auth);
        console.log("go ot home page");
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }

}

const resetPass = async(email)=>{
    if(!email){
        toast.error("Enter your email ")
        return null;
    }

    try {
        const userRef=collection(db,'users');
        const q=query(userRef,where("email","==",email))
        const querySnap=await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Sent !")
        }
        else{
            toast.error("Email does not exist.")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}


export {signup,login,logout,auth,db,resetPass}

// const firebaseConfig = {
//   apiKey: "AIzaSyC5eJa3bJHNmiiBwSmQtiuQqigXrvPZh1w",
//   authDomain: "chat-app-gs-74c8b.firebaseapp.com",
//   projectId: "chat-app-gs-74c8b",
//   storageBucket: "chat-app-gs-74c8b.appspot.com",
//   messagingSenderId: "362940708992",
//   appId: "1:362940708992:web:5945f8c1537045c2334e65"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth=getAuth(app)
// const db = getFirestore(app)

// const signup=async(username,email,password)=>{
//     try {
//         const res = await createUserWithEmailAndPassword(auth,email,password)
//         const user =res.user
//         await setDoc(doc(db,"users",user,uid),{
//             id:user.uid,
//             username:username.toLowerCase(),
//             email,
//             name:"",
//             avatar:"",
//             bio:"Hey,There i am using chat app",
//             lastseen:Date.now()
//         })
//         await setDoc(doc(db,"chats",user.uid),{
//             chatData:[]
//         })
//     } catch (error) {
//         console.error(error);
//         toast.error(error.code.split('/')[1].split('-').join(" "))
//     }
// }

// const login=async(email,password)=>{
//     try{
//         await signInWithEmailAndPassword(auth,email,password);
//     }
//     catch(error){
//         console.error(error);
//         toast.error(error.code.split('/')[1].split('-').join(" "))
//     }
// }

// export {signup,login}