import React, { Component } from 'react'
import axios from 'axios'
import CollapsibleTable from '../../components/CollapsibleTable'

class ExamsResultDetail extends Component {

    state = {
        innerTableField: ["Assessment", "TotalMarks", "ObtainedMarks", "ClassAverage", "Percentage"],
        resultDetails: [
            {
                AssessmentType: "One Hour Test",
                ObtainedPercentage: "80%",
                table: {
                    tableField: ["Assessment", "TotalMarks", "ObtainedMarks", "ClassAverage", "Percentage"],
                    tableData: [
                        { Assessment: "OHT1", TotalMarks: "15", ObtainedMarks: "14", ClassAverage: "12.11", Percentage: "93.33" },
                        { Assessment: "OHT2", TotalMarks: "15", ObtainedMarks: "14", ClassAverage: "9.57", Percentage: "93.33" }
                    ]
                }
            },
            {
                AssessmentType: "Assignment",
                ObtainedPercentage: "80%",
                table: {
                    tableField: ["Assessment", "TotalMarks", "ObtainedMarks", "ClassAverage", "Percentage"],
                    tableData: [
                        { Assessment: "Assignment1", TotalMarks: "10", ObtainedMarks: "9", ClassAverage: "7.57", Percentage: "90.00" },
                        { Assessment: "Assignment2", TotalMarks: "10", ObtainedMarks: "9", ClassAverage: "8.03", Percentage: "90.00" },
                        { Assessment: "Assignment3", TotalMarks: "10", ObtainedMarks: "9.5", ClassAverage: "6.31", Percentage: "95.00" }
                    ]
                }
            },
            {
                AssessmentType: "Quiz",
                ObtainedPercentage: "80%",
                table: {
                    tableField: ["Assessment", "TotalMarks", "ObtainedMarks", "ClassAverage", "Percentage"],
                    tableData: [
                        { Assessment: "Quiz1", TotalMarks: "10", ObtainedMarks: "8", ClassAverage: "7.57", Percentage: "80.00" },
                        { Assessment: "Quiz2", TotalMarks: "10", ObtainedMarks: "8", ClassAverage: "8.03", Percentage: "80.00" },
                        { Assessment: "Quiz3", TotalMarks: "10", ObtainedMarks: "8", ClassAverage: "5.57", Percentage: "80.00" }
                    ]
                }
            },
            {
                AssessmentType: "Final",
                ObtainedPercentage: "80%",
                table: {
                    tableField: ["Assessment", "TotalMarks", "ObtainedMarks", "ClassAverage", "Percentage"],
                    tableData: [
                        { Assessment: "Q1", TotalMarks: "10", ObtainedMarks: "8", ClassAverage: "6.00", Percentage: "80.00" },
                        { Assessment: "Q2", TotalMarks: "10", ObtainedMarks: "9", ClassAverage: "9.57", Percentage: "90.00" },
                        { Assessment: "Q2", TotalMarks: "10", ObtainedMarks: "7", ClassAverage: "9.57", Percentage: "70.00" },
                        { Assessment: "Q2", TotalMarks: "10", ObtainedMarks: "9", ClassAverage: "9.57", Percentage: "90.00" },
                        { Assessment: "Q2", TotalMarks: "10", ObtainedMarks: "10", ClassAverage: "9.57", Percentage: "100.00" }
                    ]
                }
            },


        ],

    }

    constructor(props) {
        super(props);
        if (props.state.currentPage !== "Exams Result Details") {
            props.state.setCurrentPage("Exams Result Details")
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const enrollmentID = params.get("enrollmentID");

        axios.get(`${this.props.state.ATLAS_URI}/getResultByEnrollmentID/` + enrollmentID)
            .then(response => {
                const tableData = []
                const results = response.data.map(result => {
                    result.AssessmentType = result.Assessment
                    result.ObtainedPercentage = ((result.ObtainedMarks / result.TotalMarks) * 100).toFixed(2) + "%"
                    tableData.push()
                    result.table = {
                        tableField: ["Assessment", "TotalMarks", "ObtainedMarks", "ClassAverage", "Percentage"],
                        tableData: [result]
                    }
                    return result
                })
                
                //this.setState({ resultDetails: results })
            }).catch(err => console.log(err))

    }

    render() {
        return (
            <div className="content">

                <h2>Results</h2>

                <section className="box">
                    <nav className="tabNavigation">
                        <ul>
                            <li className="active">Lecture</li>
                        </ul>
                    </nav>

                    <CollapsibleTable
                        displayField={["AssessmentType", "ObtainedPercentage"]}
                        data={this.state.resultDetails}
                        innerTableField={this.state.innerTableField}
                    />

                </section>

            </div>

        )
    }

}

export default ExamsResultDetail