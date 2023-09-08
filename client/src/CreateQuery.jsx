import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function CreateQuery() {
    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        query: '',
    })
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("mobile", data.mobile);
        formdata.append("query", data.query);
        console.log(formdata.get("query"));
        axios.post('http://localhost:8081/create', formdata)
            .then(res => {
                alert("Enquiry has been registered Sucessfully...")
                navigate('/start')
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm text-center'>
                <h2>Client Query Portal</h2>
                <div className='d-flex justify-content-between mt-5'>
                    <form class="row g-3 w-60" onSubmit={handleSubmit}>
                        <div class="col-12">
                            <label for="inputName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                                onChange={e => setData({ ...data, name: e.target.value })} />
                        </div>
                        <div class="col-12">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                                onChange={e => setData({ ...data, email: e.target.value })} />
                        </div>
                        <div class="col-12">
                            <label for="inputMobile" class="form-label">Mobile Number</label>
                            <input type="text" class="form-control" id="inputMobile" placeholder='Enter Mobile No.'
                                onChange={e => setData({ ...data, mobile: e.target.value })} />
                        </div>
                        <div class="col-12">
                            <label for="inputQuery" class="form-label">Query</label>
                            <input type="text" class="form-control" id="inputQuery" placeholder="Enter Query" autoComplete='off'
                                onChange={e => setData({ ...data, query: e.target.value })} />
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Create Query</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateQuery