import React, { Component } from 'react'
import * as $ from 'jquery'
import axios from 'axios'
import Dialog from '../../components/Dialog'
import EditableField from '../../components/EditableField'
import PageComponent from "../../components/PageComponent";

class Profile extends PageComponent {

    state = {
        info: {
            _id: "",
            Name: "",
            Career: "",
            Program: "",
            Semester: "",
            Email: "",
            Phone: "",
            PresentAddress: "",
            PermanentAddress: "",
            DOB: "",
            Gender: "",
            CNIC: "",
            FatherName: "",
            FatherCNIC: "",
            MaritalStatus: "",
            Image: ""
        },
        dialogInfo: {
            isOpened: false,
            text: ""
        },
        editingActivated: false,
        tabShown: "About"
    }

    constructor(props) {
        super(props);
        this.setTabShown = this.setTabShown.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.updateInfo = this.updateInfo.bind(this)
        if (props.state.currentPage !== "Profile") {
            props.state.setCurrentPage("Profile")
        }
    }

    componentDidMount() {
        //Get All Students
        if (this.props.state.operator.Role === "Student") {
            axios.get(`${this.props.state.ATLAS_URI}/getStudentByUserID/${this.props.state.operator.UserID}`)
                .then(response => {
                    const responseData = response.data;
                    if (typeof responseData !== 'undefined') {

                        axios.get(`${this.props.state.ATLAS_URI}/getDegreeByID/${responseData.Program}`)
                            .then(degree => {
                                const degreeData = degree.data;
                                if (typeof degreeData !== 'undefined') {

                                    responseData.Program = degreeData.DegreeName
                                    this.setState({ info: responseData })
                                }

                            }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))
        }
    }

    setTabShown(e) {
        $(".profileInfo li").removeClass("active");
        $(e.target).addClass("active");
        const tabShown = $(e.target).html()
        if (tabShown === "About") {
            $(".profileTab").animate({ "left": '+=100%', "opacity": "-=1" }, 250);
        } else {
            $(".profileTab").animate({ "left": '-=100%', "opacity": "-=1" }, 250);
        }
        setTimeout(() => {
            this.setState({ tabShown: tabShown });
            if (tabShown === "About") {
                $(".profileTab").css({ "left": "-100%" });
                $(".profileTab").animate({ "left": '+=100%', "opacity": "+=1" }, 250);
            } else {
                $(".profileTab").css({ "left": "100%" });
                $(".profileTab").animate({ "left": '-=100%', "opacity": "+=1" }, 250);
            }
        }, 300);

    }

    updateInfo(e) {
        e.preventDefault();

        if (this.state.editingActivated) {
            const updatedInfo = { ...this.state.info || {} }
            delete updatedInfo['Program'];
            axios.post(`${this.props.state.ATLAS_URI}/updateStudent/${updatedInfo._id}`, updatedInfo)
                .then(() => {
                    const newDialogInfo = { isOpened: true, text: "Student details updated", type: "Success" }
                    this.setState({ dialogInfo: newDialogInfo, editingActivated: false })
                })
                .catch(err => {
                    alert(err);
                    this.setState({ editingActivated: false })
                })
        }else {
            this.setState({ editingActivated: true })
        }

    }

    handleFieldChange(e) {
        this.setState({
            info: {
                ...this.state.info,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="content">
                <Dialog
                    onClose={(e) => this.setState({ dialogInfo: { isOpened: false, text: "" } })}
                    dialogInfo={this.state.dialogInfo}
                />

                <section className="topProfile">

                    <img src={(this.state.info.Image && this.state.info.Image !== "") ? `${this.props.state.ATLAS_URI}/file/${this.state.info.Image}` : `${this.props.state.ATLAS_URI}/file/default-profile.png`} alt="profile" />

                    <div className="info">

                        <h2 className='pt-3'>{this.state.info.Name}</h2>
                        <p>Student</p>

                        <div className="more">
                            <div>
                                <h5>Department</h5>
                                <h3>{this.state.info.Department}</h3>
                            </div>
                            <div>
                                <h5>Program</h5>
                                <h3>{this.state.info.Program}</h3>
                            </div>
                            <div>
                                <h5>Current Semester</h5>
                                <h3>{this.state.info.Semester}</h3>
                            </div>
                        </div>

                    </div>

                    <span onClick={this.updateInfo} className="profileEdit">
                        <i className={this.state.editingActivated ? "fas fa-save" : "fas fa-pencil"} />
                    </span>

                </section>

                <section className="profileInfo">
                    <nav className="tabNavigation">
                        <ul>
                            <li className="active" onClick={this.setTabShown}>About</li>
                            <li onClick={this.setTabShown}>Bio Data</li>
                        </ul>
                    </nav>
                    <div className="profileTab">
                        {this.state.tabShown === "About" ?
                            <div className="row">
                                <div className="col-6">
                                    <h5>Contact Information</h5>
                                    <EditableField
                                        icon="fas fa-envelope"
                                        label="Email"
                                        type="email" name="Email"
                                        value={this.state.info.Email}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        icon="fas fa-phone"
                                        label="Phone"
                                        name="Phone"
                                        value={this.state.info.Phone}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        icon="fas fa-home"
                                        label="Present Address"
                                        name="PresentAddress"
                                        onChange={this.handleFieldChange}
                                        value={this.state.info.PresentAddress}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        icon="fas fa-home"
                                        label="Permanent Address"
                                        type="textarea" 
                                        name="PermanentAddress"
                                        onChange={this.handleFieldChange}
                                        value={this.state.info.PermanentAddress}
                                        editable={this.state.editingActivated}
                                    />
                                </div>
                                <div className="col-6">

                                </div>
                            </div>

                            :
                            <div className="row">
                                <div className="col-6">
                                    <h5>Personal Detail</h5>
                                    <EditableField
                                        icon="fas fa-birthday-cake"
                                        label="Date of Birth"
                                        type="email" 
                                        name="DOB"
                                        value={this.state.info.DOB}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        icon="fas fa-venus-mars"
                                        label="Gender"
                                        name="Gender"
                                        value={this.state.info.Gender}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        icon="fas fa-id-card"
                                        label="CNIC"
                                        name="CNIC"
                                        value={this.state.info.CNIC}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        icon="fas fa-map"
                                        label="Address"
                                        name="PresentAddress"
                                        value={this.state.info.PresentAddress}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                </div>

                                <div className="col-6">
                                    <h5>Family Detail</h5>
                                    <EditableField
                                        label="Father Name"
                                        name="FatherName"
                                        value={this.state.info.FatherName}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        label="Father CNIC"
                                        name="FatherCNIC"
                                        value={this.state.info.FatherCNIC}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        label="Father Phone"
                                        name="FatherPhone"
                                        value={this.state.info.FatherPhone}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                    <EditableField
                                        label="Father Occupation"
                                        name="FatherOccupation"
                                        value={this.state.info.FatherOccupation}
                                        onChange={this.handleFieldChange}
                                        editable={this.state.editingActivated}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </section>

            </div>
        )
    }

}

export default Profile;