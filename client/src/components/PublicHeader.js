import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/img/logo.png'

const PublicHeader = () => {

    const navigate = useNavigate();

    return (
        <section id="topHeader" className='flex items-center justify-between' style={{ position: 'fixed', zIndex: 10, inset: 0, height: '90px', backgroundColor: 'white' }}>
            <div onClick={() => navigate("/")} className='flex items-center cursor-pointer'>
                <img src={logo} width="60px" height="54px" />
                <span className='d-none d-md-inline-block brandTitle'>School Management System</span>
            </div>

            <div className='flex items-center'>
                <a href="/browse/faculties" className='headerLinks mx-sm-4 mx-3'>Faculties</a>

                <a href="/browse/courses" className='headerLinks mx-sm-4 mx-3'>Courses</a>

                <button onClick={() => navigate("/login")} className='btn portalBtn px-2 px-4 py-2'>
                    Portal &nbsp;<i className="fa fa-sign-in"></i>
                </button>
            </div>
        </section>
    )
}

export default PublicHeader