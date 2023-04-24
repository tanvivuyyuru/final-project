import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultBox(props) {

    const navigate = useNavigate();
    
    return ( 

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="resultBox">
                <div className="topArea" onClick={() => {
                    if (props.user !== "Faculty") {
                        navigate("/resultDetail?enrollmentID=" + props.course.EnrollmentID)
                    } else {
                        navigate("/updateExamResult?enrollmentID=" + props.course.EnrollmentID)
                    }
                }
                }>
                    <h4>{props.course.CourseName}</h4>
                    <h6>{props.course.CourseCode}</h6>
                </div>
                <div className="detailsArea">

                    <span><b>Credits: </b> {parseFloat(props.course.CreditHours).toFixed(1)}</span>
                    <span className="courseStatus">Class in progress</span>
                </div>
                <span className="flag">
                    {(Number(props.course.Semester) % 2 === 0 ? "Spring " : "Fall ") + props.course.Year}

                </span>
            </div>
        </div>
    )

}

export default React.memo(ResultBox)