import { useContext } from "react";
import DataProvider from "../contexts/DataProvider"

const useData =()=>{
    return useContext(DataProvider)
}
export default useData


