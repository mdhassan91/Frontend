import { useContext } from "react";
import AuthProvider from "../contexts/AuthProvider"

const useAuth =()=>{
    return useContext(AuthProvider)
}
export default useAuth


