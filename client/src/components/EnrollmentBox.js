import React from 'react';
import { useNavigate } from 'react-router-dom';

function EnrollmentBox(props) {

    const navigate = useNavigate();

    return (

        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="resultBox">
                <div className="topArea" onClick={() =>
                    navigate("/resultDetail?code=" + props.course.CourseCode + "&name=" + props.course.CourseName)
                }>
                    <h4>{props.course.CourseName}</h4>
                    <h6>{props.course.CourseCode}</h6>
                </div>
                <div className="detailsArea">

                    <span><b>Credits: </b>{parseFloat(props.course.CreditHours).toFixed(1)}</span><br />
                    <span><b>Course Type: </b>{props.course.CourseType}</span><br />


                </div>
                {
                    props.course.enrolled ?
                        <span className="btn btn-secondary">Enrolled</span>
                        :
                        <button className='btn btn-primary pull-left' onClick={props.EnrollNow}>Enroll Now</button>

                }
                <span className="flag">{props.course.SemType}</span>
            </div>
        </div>
    )

}

export default React.memo(EnrollmentBox)