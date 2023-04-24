import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Faculties({ state }) {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const [faculties, setFaculties] = useState([]);
    const [filteredFaculties, setFilteredFaculties] = useState([]);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        axios.get(`${state.ATLAS_URI}/getFaculty/`)
            .then(response => {
                const responseData = response.data;
                if (typeof responseData !== 'undefined') {
                    setFaculties(responseData)
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
        setFilteredFaculties(faculties.filter(o => !search || o.FacultyName?.toLowerCase().includes(search.toLowerCase())))
    }, [searchParams, faculties])

    return (
        <section style={{ padding: '0 20px' }}>    
            
            <div className='py-4 px-2 flex items-center'>
                <h4 className='mb-0'>
                    Faculties
                </h4>

                <span style={{ backgroundColor: '#0063A8' }} class="badge mx-2">{filteredFaculties.length}</span>
                
                <div style={{ width: '280px'}} class="relative mx-2 flex-shrink-1">
                    <div class="pointer-events-none absolute px-3 py-2">
                        <i class="fas fa-search"></i>
                    </div>

                    <input 
                        type="search" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full py-2 px-5 border' 
                        placeholder="Search by faculty name"
                        style={{ backgroundColor: '#F9FAFB', borderRadius: '8px', borderColor: '#555', width: '100%'}}
                    />
                </div>
            </div>
            
            <div className='row'>
                {filteredFaculties?.map(faculty => (
                    <div className="col-md-4 col-lg-3">
                        <div className='card' style={{ margin: '0.5rem', borderRadius: '10px' }}>
                            <div class="card-body">
                                <p className="font-medium">{faculty.FacultyDepartment}</p>
                                <h5 className='mb-4'>{faculty.FacultyName}</h5>
                                <p className="font-medium mb-2">Email: {faculty.FacultyEmail}</p>
                                <p className="font-medium mb-2">Phone: {faculty.FacultyPhone}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {!filteredFaculties?.length && 
                    <h5 className="text-center text-secondary mt-4">No Faculty found</h5>
                }
            </div>
        </section>
    )

}

export default Faculties;