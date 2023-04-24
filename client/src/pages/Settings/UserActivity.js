import React from 'react'
import axios from 'axios'
import BoxHeader from '../../components/BoxHeader'
import DataTable from '../../components/DataTable'
import PageComponent from '../../components/PageComponent'
import Dialog from '../../components/Dialog'
import SelectBox from '../../components/SelectBox'
import * as $ from 'jquery'

class UserActivity extends PageComponent {

    state = {
        resetNewRow: {
            _id: "",
            Activity: "",
            Description: "",
            Date: "",
            User: "",
            SelectUser: "Select",
            SelectRole: "Select"
        },
        newTableRow: {
            _id: "",
            Activity: "",
            Description: "",
            Date: "",
            User: "",
            SelectUser: "Select",
            SelectRole: "Select"
        },
        tableBodyList: [

        ],
        userRole: "",
        Username: "",
        editingActivated: false,
        editingID: "",
        userList: [],
        roleList: [],
        allActivities: [],
        APIs: {
            AddData: "addUserActivity",
            UpdateData: "updateUserActivity",
            DeleteData: "deleteUserActivity"
        },
        dialogInfo: {
            isOpened: false,
            text: "",
            type: ""
        }
    }
    constructor(props) {
        super(props);
        this.state.Username = props.state.operator.Username;
        this.state.resetNewRow.User = props.state.operator.Username;
        this.downloadReport = this.downloadReport.bind(this)
        this.state.resetNewRow.Date = this.getFormattedDate();

    }

    componentDidMount() {
        this.setState({
            newTableRow: this.state.resetNewRow,
            userRole: this.props.state.operator.Role
        })



        //Get User Activities
        axios.get(`${this.props.state.ATLAS_URI}/getUserActivitiesByUser/${this.state.Username}`)
            .then(response => {
                const responseData = response.data;
                if (typeof responseData !== 'undefined') {

                    if (this.state.userRole === "Admin") {
                        //Get All Activities
                        axios.get(`${this.props.state.ATLAS_URI}/getUserActivities`)
                            .then(response2 => {
                                const responseData2 = response2.data;
                                if (typeof responseData2 !== 'undefined') {
                                    this.setState({
                                        allActivities: responseData2,
                                        newTableRow: this.state.resetNewRow,
                                        tableBodyList: responseData,
                                    })

                                }
                            }).catch(err => console.log(err))
                    } else {

                        this.setState({
                            newTableRow: this.state.resetNewRow,
                            tableBodyList: responseData,

                        })
                    }

                }

            }).catch(err => console.log(err))

        axios.get(`${this.props.state.ATLAS_URI}/getRoles/`)
            .then(res4 => {
                let rolesData = res4.data;
                if (typeof rolesData !== 'undefined') {
                    //Get All Users
                    axios.get(`${this.props.state.ATLAS_URI}/getUsers/`)
                        .then(res3 => {
                            let userData = res3.data;

                            this.setState({
                                userList: userData,
                                roleList: rolesData
                            });
                        }

                        ).catch(err => console.log(err))
                }

            }).catch(err => console.log(err))
    }

    getRolesUser(role, user) {
        let x = this.state.userList.filter(users => (users.Role === role && users.Username === user))
        return (typeof x !== "undefined" && x.length !== 0);
    }

    downloadReport(e) {

        e.preventDefault();

        let user = ""
        let role = ""
        let enterRole = ""
        let searchList = []
        if (this.state.userRole === "Admin") {

            if (this.state.newTableRow.SelectUser !== "Select") { user = this.state.userList.filter(u => u._id === this.state.newTableRow.SelectUser)[0].Username }
            if (this.state.newTableRow.SelectRole !== "Select") { role = this.state.newTableRow.SelectRole }
            if (this.state.newTableRow.SelectRole !== "Select") { enterRole = this.state.roleList.filter(u => u._id === this.state.newTableRow.SelectRole)[0].Role }

            searchList = this.state.allActivities

        } else {
            role = (this.state.roleList.filter(u => u.Role === this.state.userRole)[0]._id)
            enterRole = this.state.userRole
            user = this.props.state.operator.Username
            searchList = this.state.tableBodyList
        }


        var temp = $("#searchEnquiryFromDate").val();
        const enquiryFromDate = this.returnTime(this.getNormalDate(temp))
        var temp2 = $("#searchEnquiryToDate").val();
        const enquiryToDate = this.returnTime(this.getNormalDate(temp2))


        let newList = [];
        newList.push({ Date: enterRole + " Username", Activity: user })
        newList.push({ Date: "Activity List ", Description: "From " + this.getNormalDate(temp) + " To " + this.getNormalDate(temp2) })
        newList.push({})
        newList.push({})
        newList.push({ Date: "Date:", Activity: "Activity", Description: "Description", User: "User" })

        let list = newList.concat(
            searchList.filter(data =>
                (!isNaN(enquiryFromDate) ? this.returnTime(data.Date) >= enquiryFromDate : true) &&
                (!isNaN(enquiryToDate) ? this.returnTime(data.Date) <= enquiryToDate : true) &&
                (user !== "" ? data.User === user : true) &&
                (role !== "" ? this.getRolesUser(role, data.User) : true)

            ))

        axios.post(`${this.props.state.ATLAS_URI}/downloadActivities/`, list)
            .then(res3 => {
                if (res3.status === 200) {

                    if (res3.data !== null) {
                        const downloadWin = window.open(`${this.props.state.ATLAS_URI}/excel/${res3.data}`);
                        if (downloadWin) downloadWin.opener = null;

                    }
                }

            })
            .catch(err => alert(err))
    }

    render() {

        return (
            <section className="content">
                <div className="row">
                    <Dialog
                        onFalse={(e) => this.setState({ dialogInfo: { isOpened: false, text: "" } })}
                        onTrue={(e) => this.deleteFromTable(e)}
                        dialogInfo={this.state.dialogInfo}
                    />
                    <div className="col-md-5">

                        <div className="box box-primary">

                            <BoxHeader title={`${this.state.editingActivated ? "Edit" : "Add"} Activity`} />

                            <form onSubmit={this.insertIntoTable} autoComplete='off'>

                                <div className="box-body bozero">

                                    

                                    <div className="form-group">
                                        <label >Activity </label><small className="req"> *</small>
                                        <input name="Activity" value={this.state.newTableRow.Activity} onChange={this.changeHandler} required type="text" className="form-control" />
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label><small className="req"> *</small>
                                        <textarea value={this.state.newTableRow.Description} required className='form-control' rows='5' name='Description' onChange={this.changeHandler} ></textarea>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right ">Save</button>
                                </div>
                            </form>
                        </div>

                        <div className="box box-primary">

                            <BoxHeader title={`Export Activities`} />

                            <form onSubmit={this.downloadReport} autoComplete='off'>

                                <div className="box-body bozero row">

                                    

                                    <div className="col-sm-6 col-md-6">
                                        <div className="form-group">
                                            <label>Enquiry From Date</label>
                                            <input type="date" id="searchEnquiryFromDate" className="form-control" />
                                        </div>
                                        <span className="text-danger"></span>

                                    </div>

                                    <div className="col-sm-6 col-md-6">
                                        <div className="form-group">
                                            <label>Enquiry To Date</label>
                                            <input type="date" id="searchEnquiryToDate" className="form-control" />
                                        </div>
                                        <span className="text-danger"></span>

                                    </div>
                                    {this.state.userRole === "Admin" && <div className='row'>
                                        <div className="col-sm-6 col-md-6">
                                            <SelectBox
                                                label="Role"
                                                name="SelectRole"
                                                options={this.state.roleList}
                                                attributeShown="Role"
                                                changeHandler={this.changeHandler}
                                                value={this.state.newTableRow.SelectRole}
                                                resetValue={() => this.setState(prevState => ({ newTableRow: { ...prevState.newTableRow, SelectRole: "Select" } }))}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <SelectBox
                                                label="User"
                                                name="SelectUser"
                                                options={this.state.userList.filter(users => users.Role === this.state.newTableRow.SelectRole)}
                                                attributeShown="Name"
                                                changeHandler={this.changeHandler}
                                                value={this.state.newTableRow.SelectUser}
                                                resetValue={() => this.setState(prevState => ({ newTableRow: { ...prevState.newTableRow, SelectUser: "Select" } }))}
                                            />

                                        </div>
                                    </div>}

                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right ">Download</button>
                                </div>
                            </form>
                        </div>



                    </div>

                    <div className="col-md-7">
                        <div className="box box-primary">

                            <BoxHeader title="List of Added Activities" />

                            <div className="box-body">

                                <DataTable
                                    tableHeader={["_id", "Activity", "Description", "Date"]}
                                    searchField="Activity"
                                    tableBody={this.state.tableBodyList}
                                    deleteFromTable={this.openDialog}
                                    editTableRow={this.editTableRow}
                                />

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        )

    }

}

export default UserActivity