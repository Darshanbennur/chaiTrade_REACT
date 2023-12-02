//React refs:
import { useSelector } from "react-redux";


//User made refs :
import SimulatorCharts from "./SimulatorCharts";
import SimulatorTransactions from "./SimulatorTransactions";

export default function SimulatorMain() {
    const reduxUserData = useSelector((state) => state.userData)
    //Here everything will be called

    return (
        <>
            <div>
                {/* Here the wallet and In-Hand will be maintained */}
            </div>
            <SimulatorCharts />
            <SimulatorTransactions />
        </>
    );
}