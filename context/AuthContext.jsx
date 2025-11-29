import { createContext,useEffect,useState,useContext } from "react";
const AuthContext = createContext()
import supabase from "../src/config/SupabaseClient";


export const AuthContextProvider = ({children}) =>{
    const [session,setSession]= useState(undefined)
    //signup
    const signUpNewUser = async ()=>{
        const {data,error}=await supabase.auth.signUp({
            email:email,
            password:password,
        })
    if(error){
        console.error("There was a problem signing up")
        return {success:false,error};

    }
    return {success:true,data}
}

useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
        
    })
})
    return(


        <AuthContext.Provider value={{session,signUpNewUser}} >

  {children}

        </AuthContext.Provider>
    )
}

export const UserAuth = ()=>{
 return useContext(AuthContext)
}