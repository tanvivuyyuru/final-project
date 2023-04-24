import React from 'react'
import * as $ from 'jquery'
import axios from 'axios'
import md5 from 'md5'
import BoxHeader from '../../components/BoxHeader'
import PageComponent from '../../components/PageComponent'
import SelectBox from '../../components/SelectBox'
import Dialog from '../../components/Dialog'

class AddStudent extends PageComponent {

    state = {

        resetNewRow: {
            _id: "",
            Name: "",
            Program: "Select",
            Semester: "",
            Email: "",
            Phone: "",
            EmergencyContact: "",
            PresentAddress: "",
            PermanentAddress: "",
            DOB: "",
            Gender: "",
            CNIC: "",
            FatherName: "",
            FatherCNIC: "",
            FatherPhone: "",
            ParentOccupation: "",
            City: "",
            PostalCode: "",
            Image: "",
            Department: ""

        },

        newTableRow: {},
        tableBodyList: [

        ],
        dialogInfo: {
            isOpened: false,
            text: ""
        },
        editingActivated: false,
        editingID: "",

        ProgramList: [],
        DepartmentList: [{ _id: "001", Department: "CSE" }],

    }

    constructor(props) {
        super(props);
        this.addNewStudent = this.addNewStudent.bind(this);
        this.validateThenAddStudent = this.validateThenAddStudent.bind(this);

        if (props.state.currentPage !== "Students > Add Student") {
            props.state.setCurrentPage("Students > Add Student")
        }
    }

    componentDidMount() {

        if (typeof this.props.state.EditDetailsData.id !== 'undefined' && this.props.state.EditDetailsData.id !== null) {

            this.setState({ editingActivated: true })
            //Get Student with ID
            axios.get(`${this.props.state.ATLAS_URI}/getStudentByID/${this.props.state.EditDetailsData.id}`)
                .then(response => {
                    const responseData = response.data;
                    if (typeof responseData !== 'undefined' && responseData !== null) {
                        this.setState({ newTableRow: responseData })

                    }

                }).catch(err => console.log(err))
        } else {

            this.setState({ newTableRow: { ...this.state.resetNewRow } })

        }

        //Get All Programs
        axios.get(`${this.props.state.ATLAS_URI}/getDegrees/`)
            .then(response => {
                const responseData = response.data;

                if (typeof responseData !== 'undefined') {
                    this.setState({
                        ProgramList: responseData,
                    })

                }

            }).catch(err => console.log(err))

    }

    validateThenAddStudent(e) {
        e.preventDefault();
        if (this.state.newTableRow.Program === "Select") {
            const newDialogInfo = { isOpened: true, text: "Program Empty", type: "Error" }
            this.setState({ dialogInfo: newDialogInfo })
            setTimeout(() => { this.setState({ dialogInfo: { isOpened: false, text: "", type: "" } }) }, 3000)

        } else {
            this.addNewStudent(e);
        }
    }

    changeHandler(e) {
        let newValue;
        const tempData = this.state.newTableRow;
        if (e.target.type === "file") {
            newValue = Object.values(e.target.files)[0];
            tempData.Image = "";
        } else {
            newValue = e.target.value;
            if (e.target.type !== "button") {
                if (typeof $(e.target).attr("index") !== 'undefined') {
                    newValue = [...tempData[e.target.name]]
                    newValue[$(e.target).attr("index")] = e.target.value
                }

                if (e.target.type === "checkbox") {
                    newValue = [...tempData[e.target.name]]
                    if (e.target.checked) {
                        newValue.push(e.target.value)
                    } else {
                        newValue = newValue.filter(data => data !== e.target.value)
                    }
                }
            }

        }

        tempData[e.target.name] = newValue;
        this.setState({ newTableRow: tempData })

    }


    addNewStudent(e) {
        e.preventDefault();

        const formData = new FormData();
        let updateWithoutImage = true;
        if (this.state.newTableRow.ImageSelected) {
            updateWithoutImage = false;
            formData.append('ImageSelected', this.state.newTableRow.ImageSelected);
        }
        formData.append('Name', this.state.newTableRow.Name);
        formData.append('Institution', this.state.newTableRow.Institution);
        formData.append('Career', this.state.newTableRow.Career);
        formData.append('Program', this.state.newTableRow.Program);
        formData.append('Semester', this.state.newTableRow.Semester);
        formData.append('Email', this.state.newTableRow.Email);
        formData.append('Phone', this.state.newTableRow.Phone);
        formData.append('EmergencyContact', this.state.newTableRow.EmergencyContact);
        formData.append('PresentAddress', this.state.newTableRow.PresentAddress);
        formData.append('PermanentAddress', this.state.newTableRow.PermanentAddress);
        formData.append('DOB', this.state.newTableRow.DOB);
        formData.append('Gender', this.state.newTableRow.Gender);
        formData.append('CNIC', this.state.newTableRow.CNIC);
        formData.append('Domicile', this.state.newTableRow.Domicile);
        formData.append('Religion', this.state.newTableRow.Religion);
        formData.append('BloodGroup', this.state.newTableRow.BloodGroup);
        formData.append('FatherName', this.state.newTableRow.FatherName);
        formData.append('FatherCNIC', this.state.newTableRow.FatherCNIC);
        formData.append('FatherPhone', this.state.newTableRow.FatherPhone);
        formData.append('GuardianName', this.state.newTableRow.GuardianName);
        formData.append('GuardianCNIC', this.state.newTableRow.GuardianCNIC);
        formData.append('GuardianPhone', this.state.newTableRow.GuardianPhone);
        formData.append('GuardianOccupation', this.state.newTableRow.GuardianOccupation);
        formData.append('GuardianAddress', this.state.newTableRow.GuardianAddress);
        formData.append('City', this.state.newTableRow.City);
        formData.append('PostalCode', this.state.newTableRow.PostalCode);
        formData.append('Department', this.state.newTableRow.Department);
        formData.append('Nationality', this.state.newTableRow.Nationality);

        document.getElementById("ImageSelected").value = "";
        if (!this.state.editingActivated) {

            //Register Login for Student
            const newUser = { Name: this.state.newTableRow.Name, Username: "", Password: "", Role: "0002" }

            const tempPassword = "123";
            newUser.Password = md5(tempPassword).substring(5, 25);

            const tempName = this.state.newTableRow.Name.split(" ");
            newUser.Username = (tempName.length > 1 ? tempName[0].substring(0, 1) + "_" + tempName[1] : tempName[0] + "_" + String(Date.now()).substring(3, 4)).toLowerCase();

            axios.post(`${this.props.state.ATLAS_URI}/addUser/`, newUser)
                .then(response => {

                    const responseData = response.data;
                    const newStudent = { ...this.state.newTableRow, UserID: responseData.addedData._id }
                    formData.append('UserID', responseData.addedData._id)

                    axios.post(`${this.props.state.ATLAS_URI}/${updateWithoutImage ? 'addStudentWithoutImage' : 'addStudent'}/`, updateWithoutImage ? newStudent : formData)
                        .then(() => {

                            if (response.status === 200) {

                                const newDialogInfo = { isOpened: true, text: "Student Added Successfully", type: "Success" }
                                this.setState({ newTableRow: { ...this.state.resetNewRow }, dialogInfo: newDialogInfo })
                                setTimeout(() => { this.setState({ dialogInfo: { isOpened: false, text: "", type: "" } }) }, 3000)

                            }
                        })
                        .catch(err => alert(err))

                })
                .catch(err => alert(err))

        } else {
            let updateAPI = "updateStudentWithoutImage"
            if (!updateWithoutImage) {
                updateAPI = "updateStudent";
            }
            axios.post(`${this.props.state.ATLAS_URI}/${updateAPI}/` + this.props.state.EditDetailsData.id, updateWithoutImage ? this.state.newTableRow : formData)
                .then(response => {
                    const responseData = response.data;
                    if (typeof responseData !== 'undefined' && responseData.PreviousImage !== "") {
                        axios.delete(`${this.props.state.ATLAS_URI}/file/${responseData.PreviousImage}`);
                    }
                    this.props.redirectFromEditDetails(this.props.state.EditDetailsData.redirectFrom)
                })
                .catch(err => alert(err))

        }

    }

    render() {

        return (
            <section className="content">
                <div className="row">
                    <Dialog
                        onClose={(e) => this.setState({ dialogInfo: { isOpened: false, text: "" } })}
                        dialogInfo={this.state.dialogInfo}
                    />

                    <div className="col-md-12">

                        <div className="box box-primary">

                            <BoxHeader title={`${this.state.editingActivated ? "Edit" : "Add"} Student`} />

                            <form onSubmit={this.validateThenAddStudent}>
                                <div className="box-body bozero mx2p">

                                    <h4 className="pagetitleh2 mb-4">Public Details</h4>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Student Name</label> <small className="req"> *</small>
                                                <input name="Name" type="text" className="form-control" required value={this.state.newTableRow.Name} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Student Email</label> <small className="req"> *</small>
                                                <input name="Email" type="email" className="form-control" required value={this.state.newTableRow.Email} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Student Phone</label> <small className="req"> *</small>
                                                <input name="Phone" type="text" className="form-control" required value={this.state.newTableRow.Phone} onChange={this.changeHandler} />
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        
                                        <div className='col-md-4'>
                                            <div className="form-group">
                                                <label>Semester</label> <small className="req"> *</small>
                                                <select required className="form-control" name="Semester" value={this.state.newTableRow.Semester} onChange={this.changeHandler} >
                                                    <option value="">Select</option>
                                                    <option value="1st Semester">1st Semester</option>
                                                    <option value="2nd Semester">2nd Semester</option>
                                                    <option value="3rd Semester">3rd Semester</option>
                                                    <option value="4th Semester">4th Semester</option>
                                                    <option value="5th Semester">5th Semester</option>
                                                    <option value="6th Semester">6th Semester</option>
                                                    <option value="7th Semester">7th Semester</option>
                                                    <option value="8th Semester">8th Semester</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Department</label> <small className="req"> *</small>
                                                <select required className="form-control" name="Department" value={this.state.newTableRow.Department} onChange={this.changeHandler} >
                                                    <option value="">Select</option>
                                                    {this.state.DepartmentList.map((dept, key) => {
                                                        return <option key={key} value={dept.Department}>{dept.Department}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <SelectBox
                                                label="Program"
                                                name="Program"
                                                options={this.state.ProgramList}
                                                attributeShown="DegreeName"
                                                changeHandler={this.changeHandler}
                                                value={this.state.newTableRow.Program}
                                                resetValue={() => this.setState(prevState => ({ newTableRow: { ...prevState.newTableRow, Program: "Select" } }))}
                                            />

                                        </div>

                                    </div>

                                    <h4 className="pagetitleh2 mb-4">Private Details</h4>

                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Identification no.</label>
                                                <input name="CNIC" type="text" className="form-control" value={this.state.newTableRow.CNIC} onChange={this.changeHandler} />
                                            </div>
                                        </div>


                                        <div className='col-md-3'>

                                            <div className="form-group">
                                                <label>Gender</label>
                                                <select className="form-control" name="Gender" value={this.state.newTableRow.Gender} onChange={this.changeHandler} >
                                                    <option value="">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Present Address</label>
                                                <textarea name="PresentAddress" type="text" className="form-control" value={this.state.newTableRow.PresentAddress} onChange={this.changeHandler} rows="2"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Permanent Address</label>
                                                <textarea name="PermanentAddress" type="text" className="form-control" value={this.state.newTableRow.PermanentAddress} onChange={this.changeHandler} rows="2"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>City</label>
                                                <input name="City" type="text" className="form-control" value={this.state.newTableRow.City} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Postal Code</label>
                                                <input name="PostalCode" type="text" className="form-control" value={this.state.newTableRow.PostalCode} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>DOB</label>
                                                <input name="DOB" type="date" className="form-control" value={this.state.newTableRow.DOB} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Student Image</label>
                                                <input id="ImageSelected" name="ImageSelected" type="file" accept=".png, .jpg, .jpeg" className='form-control' onChange={this.changeHandler} />

                                                {this.state.newTableRow.Image && this.state.newTableRow.Image !== "" &&
                                                    <img alt="database images" style={{ margin: "5px 2px", objectFit: "cover" }} src={`${this.props.state.ATLAS_URI}/file/${this.state.newTableRow.Image}`} width={60} height={60}></img>
                                                }

                                                {this.state.newTableRow.ImageSelected && this.state.newTableRow.ImageSelected !== "" &&
                                                    <img alt="selected images" style={{ margin: "5px 2px", objectFit: "cover" }} src={URL.createObjectURL(this.state.newTableRow.ImageSelected)} width={60} height={60}></img>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Father Name</label>
                                                <input
                                                    type="text" name="FatherName" className="form-control"
                                                    value={this.state.newTableRow.FatherName} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Father Phone</label>
                                                <input type="text" name="FatherPhone" className="form-control" value={this.state.newTableRow.FatherPhone} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Father CNIC</label>
                                                <input type="text" name="FatherCNIC" className="form-control" value={this.state.newTableRow.FatherCNIC} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Father Occupation</label>
                                                <input type="text" name="FatherOccupation" className="form-control" value={this.state.newTableRow.FatherOccupation} onChange={this.changeHandler} />
                                            </div>
                                        </div>

                                    </div>

                                </div>


                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right">Save</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </section>
        )

    }

}

export default AddStudent