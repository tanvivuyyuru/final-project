import React, { Component } from 'react'
import * as $ from 'jquery'
import axios from 'axios'
import ResultBox from '../../components/ResultBox'
import CollapsibleTable from '../../components/CollapsibleTable'

class ExamsResult extends Component {

    state = {
        courses: [],

        previousResults: [
            {
                Term: "Fall 2019",
                GradePoints: "65.0",
                TotalCredits: "17.0",
                EarnedCredits: "17.0",
                GPA: "3.82",
                CGPA: "3.82",
                table: {
                    tableField: ["Course", "Credits", "MarksObtained", "GradePts", "MidGrade", "FinalGrade"],
                    tableData: [
                        {
                            Course: "Fundamentals of Programming",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Calculus & Analytical Geometry",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Discrete Mathematics",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Workshop Practice",
                            Credits: "1.0",
                            MarksObtained: "0.0",
                            GradePts: "4.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Applied Physics",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Pakistan Studies",
                            Credits: "2.0",
                            MarksObtained: "0.0",
                            GradePts: "6.0",
                            MidGrade: "",
                            FinalGrade: "B"
                        },
                        {
                            Course: "English",
                            Credits: "2.0",
                            MarksObtained: "0.0",
                            GradePts: "7.0",
                            MidGrade: "",
                            FinalGrade: "B+"
                        }

                    ]
                }
            },
            {
                Term: "Spring 2020",
                GradePoints: "65.0",
                TotalCredits: "17.0",
                EarnedCredits: "17.0",
                GPA: "3.82",
                CGPA: "3.82",
                table: {
                    tableField: ["Course", "Credits", "MarksObtained", "GradePts", "MidGrade", "FinalGrade"],
                    tableData: [
                        {
                            Course: "Engineering Drawing",
                            Credits: "2.0",
                            MarksObtained: "0.0",
                            GradePts: "8.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Object Oriented Programming",
                            Credits: "4.0",
                            MarksObtained: "0.0",
                            GradePts: "16.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Communication Skills",
                            Credits: "2.0",
                            MarksObtained: "0.0",
                            GradePts: "7.0",
                            MidGrade: "",
                            FinalGrade: "B+"
                        },
                        {
                            Course: "Digital Logic Design",
                            Credits: "4.0",
                            MarksObtained: "0.0",
                            GradePts: "16.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Islamic Studies",
                            Credits: "2.0",
                            MarksObtained: "0.0",
                            GradePts: "6.0",
                            MidGrade: "",
                            FinalGrade: "B"
                        },
                        {
                            Course: "Linear Algebra & ODEs",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        }

                    ]
                }
            },
            {
                Term: "Fall 2020",
                GradePoints: "80.0",
                TotalCredits: "20.0",
                EarnedCredits: "20.0",
                GPA: "4.00",
                CGPA: "4.00",
                table: {
                    tableField: ["Course", "Credits", "MarksObtained", "GradePts", "MidGrade", "FinalGrade"],
                    tableData: [
                        {
                            Course: "Complex Variables And Transforms",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Human Resource Management",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Data Structures and Algorithms",
                            Credits: "4.0",
                            MarksObtained: "0.0",
                            GradePts: "16.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Database Systems",
                            Credits: "4.0",
                            MarksObtained: "0.0",
                            GradePts: "16.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Probability & Statistics",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Software Engineering",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        }

                    ]
                }
            },
            {
                Term: "Spring 2021",
                GradePoints: "68.0",
                TotalCredits: "17.0",
                EarnedCredits: "17.0",
                GPA: "4.00",
                CGPA: "4.00",
                table: {
                    tableField: ["Course", "Credits", "MarksObtained", "GradePts", "MidGrade", "FinalGrade"],
                    tableData: [
                        {
                            Course: "Computer Networks",
                            Credits: "4.0",
                            MarksObtained: "0.0",
                            GradePts: "16.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Software Requirements Engineering",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Computer Architecture And Organization",
                            Credits: "4.0",
                            MarksObtained: "0.0",
                            GradePts: "16.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Theory Of Automata & Formal Lang",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        },
                        {
                            Course: "Numerical Methods",
                            Credits: "3.0",
                            MarksObtained: "0.0",
                            GradePts: "12.0",
                            MidGrade: "",
                            FinalGrade: "A"
                        }

                    ]
                }
            }
        ],

        tabShown: "Active Courses"
    }

    constructor(props) {
        super(props);
        this.setTabShown = this.setTabShown.bind(this)
        if (props.state.currentPage !== "Exams Result") {
            props.state.setCurrentPage("Exams Result")
        }
    }

    componentDidMount() {

        if (this.props.state.operator.Role === "Student") {


            const allCourses = this.props.state.StudentData.map(x => {
                x.CourseData.EnrollmentID = x.EnrollmentID
                x.CourseData.Year = x.Year
                return x.CourseData
            })

            this.setState({ courses: allCourses });
          
        } else if (this.props.state.operator.Role === "Faculty") {

            const facultyData = this.props.state.FacultyData;
            if (facultyData.length > 0) {
                const courses = facultyData.map(faculty => {
                    const temp = faculty.Course;
                    temp.Year = faculty.Year;
                    return temp;
                })
                this.setState({ courses:  courses});
            }
        }

    }

    setTabShown(e) {
        $(".box li").removeClass("active");
        $(e.target).addClass("active");
        const tabShown = $(e.target).html()
        if (tabShown === "Active Courses") {
            $(".tabs").animate({ "left": '+=100%', "opacity": "-=1" }, 250);
        } else {
            $(".tabs").animate({ "left": '-=100%', "opacity": "-=1" }, 250);
        }
        setTimeout(() => {
            this.setState({ tabShown: tabShown });
            if (tabShown === "Active Courses") {
                $(".tabs").css({ "left": "-100%" });
                $(".tabs").animate({ "left": '+=100%', "opacity": "+=1" }, 250);
            } else {
                $(".tabs").css({ "left": "100%" });
                $(".tabs").animate({ "left": '-=100%', "opacity": "+=1" }, 250);
            }
        }, 300);

    }

    render() {
        return (
            <div className="content">

                <h2>Results</h2>

                <section className="box p20">
                    <nav className="tabNavigation">
                        <ul>
                            {this.props.state.operator.Role === "Student" ?
                                <>
                                    <li className="active" onClick={this.setTabShown}>Active Courses</li>
                                    <li onClick={this.setTabShown}>Previous Courses</li>
                                </>
                                :
                                <li className="active">Active Courses</li>
                            }
                        </ul>
                    </nav>

                    <div className="tabs">
                        {this.state.tabShown === "Active Courses" ?
                            <div className="row">
                                {this.state.courses.map(course =>
                                    <ResultBox course={course} user={this.props.state.operator.Role} />
                                )}
                            </div>
                            :
                            <div>
                                <CollapsibleTable
                                    displayField={["Term", "GradePoints", "TotalCredits", "EarnedCredits", "GPA", "CGPA"]}
                                    data={this.state.previousResults}
                                />
                            </div>
                        }
                    </div>


                </section>

            </div>

        )
    }

}

export default ExamsResult;