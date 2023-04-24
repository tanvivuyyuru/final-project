import React, { Component } from 'react'
import axios from 'axios'
import DashboardBox from '../../components/DashboardBox'
import SlideShow from '../../components/SlideShow'

class Dashboard extends Component {

    state = {
        allCourses: [],
        notifications: [],
        studentInfo: {
            Name: this.props.state.operator.Name,
            _id: this.props.state.operator.Role
        }
    }


    componentDidMount() {

        //Get All Students
        const StudentData = this.props.state.StudentData
        if (this.props.state.operator.Role === "Student") {
            axios.get(`${this.props.state.ATLAS_URI}/getStudentByUserID/${this.props.state.operator.UserID}`)
            .then(response => {
                const responseData = response.data;

                if (typeof responseData !== 'undefined') {

                    const enrollments = (StudentData.map(x => { return x.EnrollmentID }).toString())
                    
                    axios.get(`${this.props.state.ATLAS_URI}/getAttendanceByEnrollment/${enrollments}`)
                        .then(attendance => {
                            const attendanceData = attendance.data;

                            if (typeof attendanceData !== 'undefined' && attendanceData !== null) {

                                const Student = StudentData.map(student => {
                                    const eAttendance = attendanceData.filter(x => x.EnrollmentID === student.EnrollmentID)
                                    student.attendancePercent = eAttendance.length !== 0 ? String((eAttendance.filter(x => x.Status === "P").length / (eAttendance.length)) * 100) : '0'
                                    return student
                                })

                                this.setState({ allCourses: Student, studentInfo: responseData })
                            }
                        }).catch(err => console.log(err))
                }
            }).catch(err => console.log(err))
            
        }else {
            const facultyData = this.props.state.FacultyData;
            if (facultyData.length > 0) {
                this.setState({allCourses: facultyData});
            }
        }

    }

    render() {

        return (
            <div className="content">
                <div className="box" style={{ backgroundColor: 'transparent' }}>

                    <div className="dashboardBox">
                        <h2 className="boxHeader">Academics</h2>
                        <div className="row">

                            <div className="col-12 col-md-4">
                                <div style={{ display: "flex", alignItems: 'center' }}>
                                    <img src={(this.state.studentInfo.Image && this.state.studentInfo.Image !== "") ? `${this.props.state.ATLAS_URI}/file/${this.state.studentInfo.Image}` : `${this.props.state.ATLAS_URI}/file/default-profile.png`} alt="profile" className="profilePic" />
                                    <div className="studentInfo">
                                        <h4>{this.state.studentInfo.Name}</h4>
                                        <p>{this.props.state.operator.Role}</p>
                                    </div>
                                </div>

                            </div>


                            {this.props.state.operator.Role === "Student" &&
                            
                                <>
                                    <div className="col-12 col-md-4">
                                        <div className="studentInfo">
                                            <p><b>Academic standings:</b> Excellent</p>
                                            <p><b>Semester:</b> {this.state.studentInfo.Semester || "1st Semester"}</p>
                                            <p><b>CGPA:</b> 3.91</p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-4">
                                        <div className="studentInfo">
                                            <p><b>Completed Cr. / Total Cr :</b> 71.0 / 86</p>
                                            <p><b>Inprogress Cr :</b> 18.0</p>
                                        </div>
                                    </div>
                                </>
                            }

                        </div>
                    </div>

                    <div className="dashboardBox">
                        <h2 className="boxHeader">Classes, Grades and Attendance</h2>
                        <div className="row">

                            {this.state.allCourses?.map(courses =>
                                <DashboardBox course={courses} user={this.props.state.operator.Role}/>
                            )}
                            {!this.state.allCourses || this.state.allCourses.length === 0 && 
                                <h6 style={{ margin: '4px 8px' }}>Currently not Enrolled in any course</h6>
                            }
                        </div>
                    </div>

                    <div className="dashboardBox">
                        <h2 className="boxHeader">News and Announcements</h2>
                        <SlideShow

                            announcements={this.state.notifications}

                        // announcements={[
                        //     {image: `${this.props.state.ATLAS_URI}/file/banner1.jpg`, heading: "Seminar on The Risk Factors for Adverse Outcomes with COVID-19 Infections & its Management", date: "2022-01-25 06:50:38"},
                        //     {image: `${this.props.state.ATLAS_URI}/file/banner2.jpg`, heading: "Registrations Open for NET (Series-2)", date: "2022-01-25 06:50:38"},
                        //     {image: `${this.props.state.ATLAS_URI}/file/banner3.jpg`, heading: "German Language Course (Level A1 and Level A1.1)", date: "2022-01-31 11:45:24"},
                        //     {image: `${this.props.state.ATLAS_URI}/file/banner1.jpg`, heading: "Seminar on The Risk Factors for Adverse Outcomes with COVID-19 Infections & its Management", date: "2022-01-25 06:50:38"},
                        //     {image: `${this.props.state.ATLAS_URI}/file/banner2.jpg`, heading: "Registrations Open for NET (Series-2)", date: "2022-01-25 06:50:38"},
                        // ]}
                        />
                        {!this.state.notifications || this.state.notifications.length === 0 && 
                            <h6 style={{ margin: '4px 8px' }}>Nothing in News feed</h6>
                        }
                    </div>

                </div>
            </div>
        )
    }

}

export default Dashboard