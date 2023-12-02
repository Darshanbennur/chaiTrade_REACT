//React refs:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//User made refs:
import axios from "../../api/axiosConfig.js"

export default function SimulatorTransactions(){

    //All the stock holdings will be shown here : 

    return(
        <>
            <div>
                {/* Stock holding will be here */}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
}