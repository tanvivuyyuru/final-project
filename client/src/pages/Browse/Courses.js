import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Courses({ state }) {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        axios.get(`${state.ATLAS_URI}/getCourses/`)
            .then(response => {
                const responseData = response.data;
                if (typeof responseData !== 'undefined') {
                    setCourses(responseData)
                }
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 500)
        return () => { clearTimeout(timer) }
    }, [search])
    

    useEffect(() => {
        setSearchParams(debouncedSearch ? `?search=${debouncedSearch}` : '')

    }, [debouncedSearch])

    useEffect(() => {
        const search = searchParams.get('search')
        setFilteredCourses(courses.filter(o => !search || o.CourseName?.toLowerCase().includes(search.toLowerCase())))
    }, [searchParams, courses])
    
    return (
        <section style={{ padding: '0 20px' }}>    
            
            <div className='py-4 px-2 flex items-center'>
                <h4 className='mb-0'>
                    Courses
                </h4>

                <span style={{ backgroundColor: '#0063A8' }} class="badge mx-2">{filteredCourses.length}</span>
                
                <div style={{ width: '280px'}} class="relative mx-2 flex-shrink-1">
                    <div class="pointer-events-none absolute px-3 py-2">
                        <i class="fas fa-search"></i>
                    </div>

                    <input 
                        type="search" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full py-2 px-5 border' 
                        placeholder="Search by course name"
                        style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', borderColor: '#555', width: '100%'}}
                    />
                </div>
            </div>
            
            <div className='row'>
                {filteredCourses?.map(course => (
                    <div className="col-md-4 col-lg-3">
                        <div className='card' style={{ margin: '0.5rem', borderRadius: '10px' }}>
                            <div class="card-body">
                                <p style={{ color: '#004979'}} className="font-semibold">{course.CourseCode}</p>
                                <h5 className='mb-4'>{course.CourseName}</h5>
                                <p className="font-medium mb-2">Credit Hours: {course.CreditHours}</p>
                                <p className="font-medium mb-2">Course Type: {course.CourseType}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {!filteredCourses?.length && 
                    <h5 className="text-center text-secondary mt-4">No Course found</h5>
                }
            </div>
        </section>
    )

}

export default Courses;