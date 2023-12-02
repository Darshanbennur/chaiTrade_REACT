//React refs:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//User made refs:
import axios from "../../api/axiosConfig.js"

export default function SimulatorCharts() {

    //Here all the listed Charts will be shown, Buying and Selling of the Stocks as well

    return (
        <>
            <div>
                {/* Charts will be Here */}
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