import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import axios from "../../api/axiosConfig.js";
import styles from "./profile.module.css"
import chart from "../../images/charts.jpg"
import { useNavigate } from "react-router-dom";

export default function ProfileComponent() {
    const reduxUserData = useSelector((state) => state.userData)
    const navigate = useNavigate();

    const initialUserData = reduxUserData.currentUser;
    const [userData, setUserData] = useState(initialUserData)

    //Changes regarding the Profile Form Data
    function handleProfileChanges(event) {
        setUserData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleMentorApplication() {
        navigate('/mentorApplication')
    }

    function handleSubmitChanges(event) {
        event.preventDefault()
        try {
            const changesResult = axios.post("/user/makeChanges", userData)
            alert("User Profile updated Successfully!!")
            console.log("User Updated Successfully")
            window.location.href = '/profile';
        } catch (Err) {
            console.log("Error Occured in Profile Changes")
            console.log(Err)
        }
        console.log("Submitted!!")
    }

    useEffect(() => {
        console.log("Rendered!!")
        setUserData(reduxUserData.currentUser);
        if (!reduxUserData.isUserloggedIn) {
            navigate('/login');
        }
    }, [reduxUserData.currentUser, reduxUserData.isUserloggedIn, navigate]);

    return (
        <div className={styles.main_body}>
            <div>
                <div className={`${styles.backpic} ${styles.row}`}>
                    <img src={chart} alt="background" className={styles.backgroundpic} />
                </div>

                <div className={styles.container}>
                    <div className={styles.card + ' ' + styles['right-card']}>
                        <form id="changeProfile" onSubmit={handleSubmitChanges}>
                            <div className={styles.part1}>
                                <div className={`col-md-6 ${styles.field} ${styles.field1}`}>
                                    <label htmlFor="firstname">User Name:</label>
                                    <input
                                        onChange={handleProfileChanges}
                                        className={styles.input_field1}
                                        name="userName"
                                        type="text"
                                        id="userName"
                                        value={userData.userName} />
                                </div>
                            </div>

                            <div className={styles.part2}>
                                <div className={`${styles.field} ${styles.educationfield}`}>
                                    <label htmlFor="education">Education:</label>
                                    <select
                                        onChange={handleProfileChanges}
                                        className={styles.select_field}
                                        id="education"
                                        name="education"
                                        value={userData.education}
                                        defaultValue={userData.education}
                                    >
                                        <option value="">--Please select an education--</option>
                                        <option value="BCOM">BCOM</option>
                                        <option value="Btech">Btech</option>
                                        <option value="Mtech">Mtech</option>
                                        <option value="PG">PG</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className={`${styles.field} ${styles.phonefield}`}>
                                    <label htmlFor="countryCode">Phone:</label>
                                    <div className={styles['phone-dropdown']}>
                                        <select
                                            onChange={handleProfileChanges}
                                            className={styles.select_field}
                                            id="countryCode"
                                            name="countryCode"
                                            value={userData.countryCode}
                                            defaultValue={userData.countryCode}
                                        >
                                            <option value="">--Please select a code--</option>
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
                                            <option value="+81">+81</option>
                                            <option value="+91">+91</option>
                                        </select>
                                        <input
                                            onChange={handleProfileChanges}
                                            className={styles.input_field}
                                            name="phoneNumber"
                                            type="number"
                                            id="phone"
                                            placeholder="123-456-7890"
                                            value={userData.phoneNumber} />
                                    </div>
                                </div>

                                <div className={`${styles.field} ${styles.emailfield}`}>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        onChange={handleProfileChanges}
                                        className={styles.input_field1}
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={userData.email} />
                                </div>

                                <div className={`${styles.field} ${styles.incomefield}`}>
                                    <label htmlFor="income">Income:</label>
                                    <div className={styles['input-group']}>

                                        <input
                                            onChange={handleProfileChanges}
                                            className={styles.input_field1}
                                            name="income"
                                            type="number"
                                            id="income"
                                            placeholder="Amount"
                                            value={userData.income} />

                                        <div className={styles['input-group-append']}>
                                            <select
                                                onChange={handleProfileChanges}
                                                name="incomeType"
                                                id="incomeType"
                                                className={styles.select_field}
                                                value={userData.incomeType}
                                                defaultValue={userData.incomeType}>

                                                <option value="">--select currency--</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="INR" selected>INR</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" id="changesButton" className={styles['save-button']}>Save Changes</button>

                                {!reduxUserData.isMentor && <button
                                    onClick={handleMentorApplication}
                                    style={{ marginTop: "14px" }}
                                    className={styles['mentorButton']}
                                >
                                    Apply as a Mentor
                                </button>}

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}