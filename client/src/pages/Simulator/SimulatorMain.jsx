//React refs:
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/AddCircle';

//User made refs :
import SimulatorCharts from "./SimulatorCharts";
import SimulatorTransactions from "./SimulatorTransactions";
import charts from "../../images/charts.jpg"
import "./simulator.css"
import Footer from "../../components/Footer";

const MyBlog_backgroundPicStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover',
};

export default function SimulatorMain() {

    const reduxUserData = useSelector((state) => state.userData)
    const navigate = useNavigate();

    const userWallet = +(reduxUserData.currentUser.wallet)
    const usercostInHand = +(reduxUserData.currentUser.costInHand)
    const userCostInvested = +(reduxUserData.currentUser.costInvested)

    function handleSubmitofPricingButton() {
        navigate('/pricing')
    }

    return (
        <>
            <img src={charts} style={MyBlog_backgroundPicStyle} alt="background" />
            <div className="totalCostContainer">
                <div className="totalCost">
                    Cash In Hand (INR) : <span className="amount" id="costUser">
                        {usercostInHand.toFixed(2)}
                    </span>
                </div>
                <div className="totalCost">
                    Amount Invested (INR) : <span className="amount" id="costInvested">
                        {userCostInvested.toFixed(2)}
                    </span>
                </div>
                <div className="totalCost">
                    Wallet (INR) : <span className="amount" id="wallet">
                        {userWallet.toFixed(2)}
                    </span>
                    <button
                        onClick={handleSubmitofPricingButton}
                        style={{ color: "white", height: "25px", marginLeft: "8px", background: "none", border: "none" }}>
                        <AddIcon />
                    </button>

                </div>
            </div>
            <SimulatorCharts />
            <SimulatorTransactions />
            <Footer/>
        </>
    );
}