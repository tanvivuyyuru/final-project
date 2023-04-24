import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as $ from 'jquery'
import axios from 'axios';
import md5 from 'md5';
import logo from '../../assets/img/logo.png'
import Dialog from '../../components/Dialog'

function Login(props) {

    const navigate = useNavigate();

    const [state, setState] = useState({
        dialogInfo: {
            isOpened: false,
            text: ""
        }
    })
    
    const loginOperator = (e) => {
        e.preventDefault();

        const enteredUsername = $("#username").val();
        axios.get(`${props.state.ATLAS_URI}/getUserByUsername/${enteredUsername}`)
        .then(res1 => {
            const userData = res1.data;
            if (typeof userData !== 'undefined' && userData !== null) {
                const { _id, Username, Password, Name, Role } = userData;
                if (Password === md5($("#password").val()).substring(5, 25)) {

                    axios.get(`${props.state.ATLAS_URI}/getRoleByID/${Role}`)
                        .then(role => {
                            if (typeof role !== 'undefined') {

                                const roleData = role.data;
                                const loginTime = getCurrentTime();
                                const addedData = {UserID: _id, Name: Name, Username: Username, Role: roleData.Role, RoleID: Role, LoginTime: loginTime };
                                
                                axios.post(`${props.state.ATLAS_URI}/addLoginDetail/`, addedData)
                                .then(response => {
                                    if (response.status === 200) {
                                        
                                        addedData.LastLogin = loginTime;

                                        props.updateOperatorInfo(addedData);
                                        window.location.href = "/dashboard"

                                    }
                                }).catch(err => alert(err))
                            }
                        }).catch(err => alert(err))

                } else {
                    const newDialogInfo = { isOpened: true, text: "Incorrect Password", type: "Error" }
                    setState({ dialogInfo: newDialogInfo })
                    $(".errorMsg").css({ "font-size": "14px" })
                    setTimeout(() => { setState({ dialogInfo: { isOpened: false, text: "", type: "" } }) }, 3000)
                }

            } else {
                const newDialogInfo = { isOpened: true, text: "Incorrect Username", type: "Error" }
                setState({ dialogInfo: newDialogInfo })
                $(".errorMsg").css({ "font-size": "14px" })
                setTimeout(() => { setState({ dialogInfo: { isOpened: false, text: "", type: "" } }) }, 3000)
            }

        }).catch(err => console.log(err))
    }

    const getCurrentTime = () => {
        const today = new Date();

        const date = today.getDate();
        const month = String(parseInt(today.getMonth()) + 1);

        return (date < 10 && "0") + date + "-" + (month < 10 && "0") + month + "-" + today.getFullYear() + "  " +
            ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
    }

    return (
        <React.Fragment>
            <Dialog
                onClose={(e) => setState({ dialogInfo: { isOpened: false, text: "" } })}
                dialogInfo={state.dialogInfo}
            />
            <main id="loginSection">
                <section id="topHeader" style={{ position: 'fixed', zIndex: 10, inset: 10, backgroundColor: 'transparent' }}>
                    <div onClick={() => navigate("/")} className='flex items-center cursor-pointer'>
                        <img src={logo} width="80px" height="68px" />
                        <span className='brandTitle'>School Management System</span>
                    </div>
                </section>

                <div className='login_container'>

                    <p className='login_heading'>{props.state.institute}</p>
                    <p className='login_subHeading'>User Login</p>

                    <div className="login_card">

                        <form onSubmit={loginOperator} autoComplete="off">

                            <br /><br />

                            <div className="form-floating loginFormField">
                                <input type="text" className="form-control loginField" required id="username" placeholder="Username" />
                                <label>Username</label>
                                <i className="inputIcon fas fa-user"></i>
                            </div>

                            <div className="form-floating loginFormField">
                                <input type="password" className="form-control loginField" required id="password" placeholder="Password" />
                                <label>Password</label>
                                <i className="inputIcon fas fa-lock"></i>
                            </div>

                            <button type="submit" id="loginBtn" className="btn btn-success">Sign in</button>

                            <br /><br />
                        </form>

                        <br />
                    </div>
                </div>

            </main>

        </React.Fragment>
    );

}

export default Login