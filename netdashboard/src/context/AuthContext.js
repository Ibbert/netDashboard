import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, getAdditionalUserInfo, FacebookAuthProvider } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc} from "firebase/firestore";

/**
 * The AuthContext sends the user state 
 * to all other components in the app.
 * And holds some authentication functions. 
 */

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setUser] = useState()
    const [loading, setLoading] = useState()

    // Providers
    const googleProvider = new GoogleAuthProvider()
    const facebookProvider = new FacebookAuthProvider()
    
    // Registers user with email and password 
    // and sets user data in the database. 
    function registerUser(email, dob, password, firstname, lastname, degree) {
        createUserWithEmailAndPassword(auth, email, password).then(cred => {
            setDoc(doc(db, 'users', cred.user.uid), {
                name:   {
                    first: `${firstname}`,
                    last: `${lastname}`
                },
                email: `${email}`,
                dateOfBirth: `${dob}`,
                degreeLevel: `${degree}`
            })
        })
    }

    // Runs once per refresh.
    // Checks if the user state has changed.
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })

        return unsubscribe
    }, [])

    function logout(){
        return signOut(auth)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // This function is a littlebit special becasue it works
    // with login and register.
    // First the function opens a popup window and you login with your googe account.
    // Then we get a result back wich gives us some user information like uid and email.
    // But we can also get more information via the getAdditionalUserInfo() 
    // which gives us more infomration from their google account like firstname and lastname.
    // We also get back a boolean variabel which says if the user is returning or new.
    // And if the user is new we will set data in the database.
    function loginOrRegisterWithGoogle() {
        signInWithPopup(auth, googleProvider).then(result => {
            const googleInfo = getAdditionalUserInfo(result)
            const user = result.user
            const isNewUser = googleInfo.isNewUser
            const googleUser = googleInfo.profile
            if(isNewUser === true) {
                setDoc(doc(db, 'users', user.uid), {
                    name: {
                        first: `${googleUser.given_name}`,
                        last: `${googleUser.family_name}`
                    },
                    email: `${user.email}`,
                    degreeLevel: ""
                })
            }
            console.log(isNewUser ? "Google: This user just registered" : "Google: Existing User")
        })
    }

    // This function is exactly the same as google login or register.
    // The biggest difference is Facebooks key naming in the facebookInfo object.
    function loginOrRegisterWithFacebook() {
        signInWithPopup(auth, facebookProvider).then(result => {
            const facebookInfo = getAdditionalUserInfo(result)
            const facebookUser = facebookInfo.profile
            const user = result.user
            const isNewUser = facebookInfo.isNewUser
            if(isNewUser === true) {
                setDoc(doc(db, 'users', user.uid), {
                    name: {
                        first: `${facebookUser.first_name}`,
                        last: `${facebookUser.last_name}`
                    },
                    email: `${user.email}`,
                    degreeLevel: ""
                })
            }
            console.log(isNewUser ? "Facebook: This user just registered" : "Facebook: Existing User")
        })
    }

    // All functions to be exported to components.
    const value = {
        currentUser,
        registerUser,
        login,
        logout,
        loginOrRegisterWithGoogle,
        loginOrRegisterWithFacebook
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}