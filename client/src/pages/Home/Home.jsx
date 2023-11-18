import { useSelector } from "react-redux";
import Footer from "../../components/Footer";

export default function Home() {
    const data = useSelector((state) => state.userData)
    return (
        <>
            <div>
                Name : <h4>{data.currentUser.userName}</h4>
                Email : <h4>{data.currentUser.email}</h4>
            </div>
            {/* <Footer/> */}
        </>
    );
}