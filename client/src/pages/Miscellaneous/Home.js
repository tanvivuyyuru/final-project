import React from 'react';

function Home() {

    return (
        <>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/banner_1.jpg" width="100%" style={{ maxHeight: '500px' }} />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1 className='d-none d-sm-block'>Experienced Faculty</h1>
                                <p>Highly Qualified Faculty members with years of experience.</p>
                                <p><a className="btn btn-md" style={{ backgroundColor: '#004979', color: 'white' }} href="/browse/faculties">Browse Faculty</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/banner_2.jpg" width="100%" style={{ maxHeight: '500px' }} />
                        <div className="container">
                            <div style={{ backgroundColor: '#00000033'}} className="carousel-caption">
                                <h1 className='d-none d-sm-block'>Login to your Portal</h1>
                                <p>login to your portal to get the latest updates related to your academics</p>
                                <p><a className="btn btn-md" style={{ backgroundColor: '#004979', color: 'white' }} href="/login">Log in</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src="/banner_3.jpg" width="100%" style={{ maxHeight: '500px' }} />
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h1 className='d-none d-sm-block'>Latest Courses.</h1>
                                <p>We offers the latest curriculum to our students.</p>
                                <p><a className="btn btn-md" style={{ backgroundColor: '#004979', color: 'white' }} href="/browse/courses">Browse Courses</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>   

            <div className="container marketing my-5">
                

                <hr className="featurette-divider my-5" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <div className='content py-1 py-sm-6'>
                            <h2 className="featurette-heading">Keep a better track your <span className="text-muted">ACADEMICS</span></h2>
                            
                            <p style={{ padding: '0px 0.6rem' }} className="lead">An online school management system is an effective way to keep track of academics and ensure that students are receiving the education they need to succeed.</p>
                            
                            <ol className='d-none d-md-block'>
                                <li>Gradebook: The online school management system should have a gradebook that allows teachers to record grades and assignments for each student. This information should be easily accessible to both teachers and students.</li>

                                <li className='mt-2'>Attendance tracking: Attendance tracking is an important aspect of academic tracking. An online school management system should have a feature that allows teachers to record attendance for each class.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <img src="/hero_2.jpeg" width="100%" />
                    </div>
                </div>

                <hr className="featurette-divider my-5" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <div className='content'>
                            <h2 className="featurette-heading">Manage everything from your <span className="text-muted">PORTAL</span></h2>
                            
                            <p style={{ padding: '0px 20px' }} className="lead">School management system can help you manage everything related to academics by providing a comprehensive set of tools and features.</p>
                            
                            <ol className='d-none d-md-block'>
                                <li>Progress reports: The system should generate progress reports for each student, which can be shared with parents and guardians. These reports should provide a detailed overview of the student's academic performance, including grades, attendance, and completed assignments.</li>

                                <li className='mt-2'>Student portal: The online school management system should have a student portal that allows students to access their grades, assignments, and progress reports. This portal should be user-friendly and easy to navigate.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="col-md-5 order-md-1">
                        <img src="/hero_1.jpg" width="100%" />
                    </div>
                </div>

                <hr className="featurette-divider my-5" />

                <h1 className='text-center py-4'>Testimonials</h1>
                
                <div className="row gy-4">
                    <div className="col-12 col-lg-4">
                        <section className="content text-center bg-white p-4 rounded-lg">
                            <img className='rounded-circle mx-auto mb-2' width="140" height="140" src="/profile.jpg" />
                            <h2>James Fish</h2>
                            <p>It has been a great experience to use this system as it is user friendly and I have been sharing assignments, taking quizzes and through news forum interact with students very easily on this portal"</p>
                        </section>
                    </div>

                    <div className="col-12 col-lg-4">
                        <section className="content text-center bg-white p-4 rounded-lg">
                            <img className='rounded-circle mx-auto mb-2' width="140" height="140" src="/profile.jpg" />
                            <h2>Erin Phil</h2>
                            <p>School Management System is a great platform for online learning activities and managing students. I have been using this system for many years with a wonderful experience. Making education system easy"</p>
                        </section>
                    </div>

                    <div className="col-12 col-lg-4">
                        <section className="content text-center bg-white p-4 rounded-lg">
                            <img className='rounded-circle mx-auto mb-2' width="140" height="140" src="/profile.jpg" />
                            <h2>Kilan Joe</h2>
                            <p> Most of the features of this system are not fully explored due to its variety of substantial sub features which are available for interactive learning environment. I would like to emphasize the Quiz module"</p>
                        </section>
                    </div>
                </div>

                <br /><br />

            </div>
        </>
    )

}

export default Home;