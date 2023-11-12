import { useSelector } from "react-redux";

export default function Home(){
    const data = useSelector((state) => state.userData)
    
    return(
        <div>
            <h1>{data.currentUser}</h1>
        </div>
    );
}