import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';

import { BrowserRouter, Navigate, Outlet, useRoutes } from "react-router-dom";
import { Login, Home, Dashboard, Profile, Attendance, AttendanceDetail, ExamsResult, ExamsResultDetail, FeeInvoices, Enrollments } from './pages/Miscellaneous/All'
import TopHeader from './components/TopHeader'
import Header from './components/Header'
import SideBar from './components/Sidebar'
import PublicHeader from './components/PublicHeader'

import { AddStudent, ListStudents } from './pages/Students/Students'
import { AddCourse, AssignCourse } from './pages/Courses/Courses'
import { AddFaculty, ListFaculty } from './pages/Faculty/Faculty'
import { AddDegree, ListDegrees } from './pages/Degree/Degree'
import { MarkAttendance, UpdateExamResult } from './pages/Extra/Extra'
import { ManageUsers, ManageRoles, UsersListAndLastLogin } from './pages/Settings/Settings'
import Faculties from './pages/Browse/Faculties';
import Courses from './pages/Browse/Courses';

class App extends Component {

  state = {
    ATLAS_URI: "http://localhost:5000",
    institute: "School Management System",
    operator: {
      Name: "",
      Username: "",
      Role: "",
      UserID: "",
      RoleID: ""
    },
    pageAccessible: [],
    sessionID: "",
    EditDetailsData: {},
    StudentData: [],
    FacultyData: [],

    currentPage: "Dashboard",
    setCurrentPage: page => {
      let newEditDetailsData = {};
      if (this.state.EditDetailsData.pageFlag === page) {
        newEditDetailsData = this.state.EditDetailsData;
      }
      this.setState({
        currentPage: page,
        EditDetailsData: newEditDetailsData
      });
    }
  }

  constructor() {
    super();

    this.updateOperatorInfo = this.updateOperatorInfo.bind(this);
    this.updateEditDetails = this.updateEditDetails.bind(this);
    this.redirectFromEditDetails = this.redirectFromEditDetails.bind(this);

    let operator = JSON.parse(window.localStorage.getItem('operator'));
    if (operator) {
      this.state.operator = operator;
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  componentDidMount() {

    if (this.state.operator.Username === "") {
      if (window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== '/browse/faculties' && window.location.pathname !== '/browse/courses') {
        window.location.replace("/login")
      }

    } else {
      //Get All Roles
      axios.get(`${this.state.ATLAS_URI}/getRoleByID/${this.state.operator.RoleID}`)
        .then(response => {
          const roleData = response.data;
          if (typeof roleData !== 'undefined' && roleData !== null) {
            this.setState({
              pageAccessible: roleData.Pages
            })

          }
        }).catch(err => console.log(err))

      if (this.state.operator.Role === 'Student') {

        //Get Student ID
        axios.get(`${this.state.ATLAS_URI}/getStudentByUserID/${this.state.operator.UserID}`)
          .then(student => {
            const studentData = student.data;

            if (typeof studentData !== 'undefined' && studentData !== null) {

              axios.get(`${this.state.ATLAS_URI}/getEnrollmentByStudent/${studentData._id}`)
                .then(enrollment => {

                  const enrollmentData = enrollment.data;
                  const searchAssignedCourse = (enrollmentData.map(x => { return x.AssignedCourse })).toString()

                  if (typeof enrollmentData !== 'undefined' && enrollmentData !== null) {

                    axios.get(`${this.state.ATLAS_URI}/getMultipleAssignedCourses/${searchAssignedCourse}`)
                      .then(assigned => {

                        const assignedData = assigned.data;
                        if (typeof assignedData !== 'undefined' && assignedData !== null) {

                          const searchCourse = (assignedData.map(x => { return x.Course })).toString()

                          axios.get(`${this.state.ATLAS_URI}/getMultipleCourses/${searchCourse}`)
                            .then(allCourses => {

                              const allCourseData = allCourses.data;
                              if (typeof allCourseData !== 'undefined' && allCourseData !== null) {


                                const finalData = []

                                enrollmentData.forEach(enroll => {

                                  const eAssignCourse = assignedData.filter(x => { return x._id === enroll.AssignedCourse && x.Semester == studentData.Semester.substring(0, 1) })[0]
                                  if (typeof eAssignCourse !== 'undefined') {
                                    const eCourses = allCourseData.filter(x => x._id === eAssignCourse.Course)[0]
                                    enroll.Year = eAssignCourse.Year
                                    enroll.Semester = eAssignCourse.Semester
                                    enroll.CourseData = eCourses
                                    enroll.EnrollmentID = enroll._id
                                    finalData.push(enroll)
                                  }
                                })

                                this.setState({ StudentData: finalData })

                              }
                            }).catch(err => console.log(err))
                        }
                      }).catch(err => console.log(err))
                  }
                }).catch(err => console.log(err))
            }
          }).catch(err => console.log(err))

      } else {
        //Get All Faculties
        axios.get(`${this.state.ATLAS_URI}/getFacultyByUserID/${this.state.operator.UserID}`)
          .then(faculty => {
            const facultyData = faculty.data;

            if (typeof facultyData !== 'undefined' && facultyData !== null) {

              axios.get(`${this.state.ATLAS_URI}/getAssignedCoursesByFaculty/${facultyData._id}`)
                .then(assignedCourses => {
                  const assignedCoursesData = assignedCourses.data;
                  if (typeof assignedCoursesData !== 'undefined' && assignedCoursesData.length > 0) {

                    const searchCourse = (assignedCoursesData.map(x => { return x.Course })).toString()

                    axios.get(`${this.state.ATLAS_URI}/getMultipleCourses/${searchCourse}`)
                      .then(allCourses => {
                        const allCourseData = allCourses.data;

                        axios.get(`${this.state.ATLAS_URI}/getDegrees`)
                          .then(allDegree => {
                            const allDegreeData = allDegree.data;

                            if (typeof allCourseData !== 'undefined' && allCourseData !== null) {

                              const finalData = assignedCoursesData.map(tempAssignedCourses => {
                                tempAssignedCourses.Course = allCourseData.filter(course => course._id === tempAssignedCourses.Course)[0];
                                tempAssignedCourses.Semester = this.getFormattedSemester(tempAssignedCourses.Semester)
                                tempAssignedCourses.Degree = allDegreeData.filter(degree => degree._id === tempAssignedCourses.Degree)[0];
                                return tempAssignedCourses
                              })

                              this.setState({ FacultyData: finalData })
                            }

                          }).catch(err => console.log(err))

                      }).catch(err => console.log(err))
                  }
                }).catch(err => console.log(err))
            }
          }).catch(err => console.log(err))

      }

    }

  }

  getFormattedSemester(semester) {
    let temp;
    switch (semester) {
      case "1":
        temp = "1st Semester";
        break;

      case "2":
        temp = "2nd Semester";
        break;

      case "3":
        temp = "3rd Semester";
        break;

      default:
        temp = semester + "th Semester";
        break;
    }
    return temp;
  }

  setAttendance(attendance) {
    this.setState({ attendances: attendance })
  }

  updateOperatorInfo(operator) {
    const start = parseInt(Math.random() * (operator.Username.length - 3));
    const sessionCode = operator.Username.substr(start, 3).toUpperCase() + (new Date()).getTime() + String(parseInt(Math.random() * 10));

    const newOperator = {
      UserID: operator.UserID,
      Name: operator.Name,
      Username: operator.Username,
      Role: operator.Role,
      RoleID: operator.RoleID,
      LastLogin: operator.LastLogin
    }
    this.setState({
      operator: newOperator,
      sessionID: sessionCode
    })

    window.localStorage.setItem('operator', JSON.stringify(newOperator));
  }

  updateEditDetails(newEditDetailsData) {
    this.state.EditDetailsData = newEditDetailsData;
  }

  redirectFromEditDetails(page) {
    this.state.EditDetailsData = {};
    if (page !== null) {
      window.location.replace(page)
    }
  }

  render() {

    const PublicLayout = () => {
      return (
        <>
          <PublicHeader />
          
          <main style={{ paddingTop: '70px' }}>
            <Outlet />
          </main>
        </>
      )
    }

    const MainLayout = () => {

      const [authorized, setAuthorized] = useState(true);

      useEffect(() => {
        if (this.state.pageAccessible?.length) {
          let page = (window.location.pathname?.split('/')[1] || '  ')
          page = page.charAt(0).toLowerCase() + page.slice(1);
          page = page.replace(/([A-Z])/g, " $1");
          page = page.charAt(0).toUpperCase() + page.slice(1).trim();
          
          setAuthorized(this.state.pageAccessible.includes(page));
        }
        
      }, [this.state.pageAccessible])
      
      if (!authorized) {
        return <Navigate to="/login" />
      }
      
      return (
        <>
          <TopHeader operator={this.state.operator} BACKEND_URI={this.state.ATLAS_URI} institute={this.state.institute} />
          <Header currentPage={this.state.currentPage} />
  
          <main id="pageContainer">
  
            <SideBar pageAccessible={this.state.pageAccessible} />
  
            <section id="page_section">
              <Outlet />
            </section>
          </main>
        </>
      )
    }

    const Routes = () => {
      return (
        useRoutes([
          {
            path: '/login',
            element: <Login state={this.state} updateOperatorInfo={this.updateOperatorInfo} />
          },
          {
            path: '/',
            element: <PublicLayout />,
            children: [
              {
                path: '',
                element: <Home  />
              },
              {
                path: '/browse/faculties',
                element: <Faculties state={this.state} />
              },
              {
                path: '/browse/courses',
                element: <Courses state={this.state} />
              }
            ]
          },
          {
            path: '/',
            element: <MainLayout />,
            children: [
              {
                path: 'dashboard',
                element: <Dashboard state={this.state} />
              },
              {
                path: 'profile',
                element: <Profile state={this.state} />
              },
              {
                path: 'attendance',
                element: <Attendance state={this.state} setAttendance={this.setAttendance} />
              },
              {
                path: 'attendanceDetail',
                element: <AttendanceDetail state={this.state} />
              },
              {
                path: 'examsResult',
                element: <ExamsResult state={this.state} />
              },
              {
                path: 'resultDetail',
                element: <ExamsResultDetail state={this.state} />
              },
              {
                path: 'enrollments',
                element: <Enrollments state={this.state} />
              },
              {
                path: 'feeInvoices',
                element: <FeeInvoices state={this.state} />
              },
              {
                path: 'markAttendance',
                element: <MarkAttendance state={this.state} />
              },
              {
                path: 'updateExamResult',
                element: <UpdateExamResult state={this.state} />
              },
              {
                path: '/Students',
                children: [
                  {
                    path: 'addStudent',
                    element: <AddStudent state={this.state} redirectFromEditDetails={this.redirectFromEditDetails} />
                  },
                  {
                    path: 'listStudents',
                    element: <ListStudents state={this.state} updateEditDetails={this.updateEditDetails} />
                  }
                ]
              },
              {
                path: '/Faculty',
                children: [
                  {
                    path: 'addFaculty',
                    element: <AddFaculty state={this.state} redirectFromEditDetails={this.redirectFromEditDetails} />
                  },
                  {
                    path: 'viewAllFaculty',
                    element: <ListFaculty state={this.state} updateEditDetails={this.updateEditDetails} />
                  }
                ]
              },
              {
                path: '/Courses',
                children: [
                  {
                    path: 'addCourse',
                    element: <AddCourse state={this.state} redirectFromEditDetails={this.redirectFromEditDetails} />
                  },
                  {
                    path: 'assignCourse',
                    element: <AssignCourse state={this.state} updateEditDetails={this.updateEditDetails} />
                  }
                ]
              },
              {
                path: '/Degree',
                children: [
                  {
                    path: 'addDegree',
                    element: <AddDegree state={this.state} redirectFromEditDetails={this.redirectFromEditDetails} />
                  },
                  {
                    path: 'viewAllDegrees',
                    element: <ListDegrees state={this.state} updateEditDetails={this.updateEditDetails} />
                  }
                ]
              },
              {
                path: '/Settings',
                children: [
                  {
                    path: 'manageUsers',
                    element: <ManageUsers state={this.state} />
                  },
                  {
                    path: 'manageRoles',
                    element: <ManageRoles state={this.state} />
                  },
                  {
                    path: 'userListsAndLastLogin',
                    element: <UsersListAndLastLogin state={this.state} />
                  }
                ]
              }
            ]
          },
          
        ])
      )
    }

    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }

}


export default App;
