import React, { Component } from 'react'
import EnrollmentBox from '../../components/EnrollmentBox'
import axios from 'axios'
import Dialog from '../../components/Dialog'

class Enrollments extends Component {

    state = {
        courses: [],
        dialogInfo: {
            isOpened: false,
            text: ""
        },
        EnrolledCourse: {
            CourseID: "",
            AssignedCourse: "",
            ResultID: "",
            AttendanceID: ""
        },

        tabShown: "Active Courses"
    }

    constructor(props) {
        super(props);
        this.EnrollNow = this.EnrollNow.bind(this)
        if (props.state.currentPage !== "Enrollments") {
            props.state.setCurrentPage("Enrollments")
        }
    }

    componentDidMount() {
        if (this.props.state.operator.Role === "Student") {
            axios.get(`${this.props.state.ATLAS_URI}/getStudentByUserID/` + this.props.state.operator.UserID)
                .then(student => {
                    const studentData = student.data;
                    const degree = studentData.Program
                    const semester = studentData.Semester.substring(0, 1)
                    const dept = studentData.Department
                    const year = String((new Date().getFullYear()))

                    if (typeof studentData !== 'undefined') {
                        axios.get(`${this.props.state.ATLAS_URI}/getAssignedCourseByDegreeSemDeptYear/${degree}/${semester}/${dept}/${year}`)
                            .then(assignedCourse => {
                                const assignedCourseData = assignedCourse.data;

                                if (typeof assignedCourseData !== 'undefined') {

                                    const course = (assignedCourseData.map(x => { return x.Course })).toString()
                                    const faculty = (assignedCourseData.map(x => { return x.Faculty })).toString()
                                    const assignIDs = (assignedCourseData.map(x => { return x._id })).toString()

                                    axios.get(`${this.props.state.ATLAS_URI}/getMultipleCourses/${course}`)
                                        .then(courses => {

                                            const coursesData = courses.data;

                                            if (typeof coursesData !== 'undefined') {

                                                axios.get(`${this.props.state.ATLAS_URI}/getMultipleFaculty/${faculty}`)
                                                    .then(faculties => {

                                                        const facultyData = faculties.data;
                                                        if (typeof facultyData !== 'undefined') {

                                                            axios.get(`${this.props.state.ATLAS_URI}/getEnrollmentByAssignedCourseStudent/${assignIDs}/${studentData._id}`)
                                                                .then(enrollment => {
                                                                    const enrollmentData = enrollment.data

                                                                    assignedCourseData.map(asgnCrs => {

                                                                        if (typeof enrollmentData != 'undefined') {
                                                                            asgnCrs.enrolled = enrollmentData.filter(x => x.AssignedCourse === asgnCrs._id).length === 0 ? false : true
                                                                        } else {
                                                                            asgnCrs.enrolled = false
                                                                        }
                                                                        const enterCourse = coursesData.filter(x => x._id === asgnCrs.Course)[0]
                                                                        const enterFaculty = facultyData.filter(x => x._id === asgnCrs.Faculty)[0]

                                                                        asgnCrs.CourseCode = enterCourse.CourseCode
                                                                        asgnCrs.CourseName = enterCourse.CourseName
                                                                        asgnCrs.CreditHours = enterCourse.CreditHours
                                                                        asgnCrs.CourseType = enterCourse.CourseType
                                                                        asgnCrs.FacultyName = enterFaculty.FacultyName
                                                                        asgnCrs.Institution = studentData.Institution
                                                                        asgnCrs.Department = studentData.Department
                                                                        asgnCrs.Semester = studentData.Semester
                                                                        asgnCrs.StudentID = studentData._id
                                                                        asgnCrs.SemType = Number(studentData.Semester) % 2 === 0 ? "Spring " + asgnCrs.Year : "Fall " + asgnCrs.Year
                                                                    })
                                                                    this.setState({
                                                                        courses: assignedCourseData,
                                                                    })
                                                                }
                                                                ).catch(err => console.log(err))
                                                        }
                                                    }).catch(err => console.log(err))
                                            }
                                        }).catch(err => console.log(err))
                                }
                            }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))

        }
    }

    EnrollNow(course) {
        const AssignedCourse = course._id
        const Student = course.StudentID
        axios.post(`${this.props.state.ATLAS_URI}/AddEnrollment/`, { AssignedCourse, Student })
            .then(response => {
                if (response.status === 200) {
                    const newDialogInfo = { isOpened: true, text: "Course Enrolled", type: "Success" }

                    const allCourses = this.state.courses.map(x => { if (x._id === AssignedCourse) { x.enrolled = true } return x })

                    this.setState({ dialogInfo: newDialogInfo, courses: allCourses })
                    window.location.reload();
                    
                }
            })
            .catch(err => alert(err))
    }

    render() {
        return (

            <div className="content">
                <Dialog
                    onClose={(e) => this.setState({ dialogInfo: { isOpened: false, text: "" } })}
                    dialogInfo={this.state.dialogInfo}
                />

                <h2>Results</h2>

                <section className="box p20">
                    <nav className="tabNavigation">
                        <ul>
                            <li className="active">Active Courses</li>
                        </ul>
                    </nav>

                    <div className="tabs">
                        <div className="row">
                            {this.state.courses.map(course =>
                                <EnrollmentBox course={course} EnrollNow={() => this.EnrollNow(course)} />
                            )}
                            
                            {this.state.courses.length === 0 && 
                                <h6 style={{ margin: '8px' }}>No Active Courses</h6>
                            }
                        </div>

                    </div>


                </section>

            </div>

        )
    }

}

export default Enrollments;