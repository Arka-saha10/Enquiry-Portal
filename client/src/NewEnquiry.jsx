import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NewEnquiry() {
    const [data, setData] = useState([])
    const navigate = useNavigate();

  useEffect(()=> {
    axios.get('http://localhost:8081/getNewQuery')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleClose = (id) => {
    axios.put('http://localhost:8081/close/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate("/closedEnquiry");
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  const handlePending = (id) => {
    axios.put('http://localhost:8081/pending/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        navigate("/pendingEnquiry");
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

    return (
        <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>New Enquiry List</h3>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Query</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((query, index) => {
              return <tr key={index}>
                  <td>{query.Uname}</td>
                  <td>{query.MobNo}</td>
                  <td>{query.email}</td>
                  <td>{query.queryn}</td>
                  <td>
                    <button onClick={e=>handlePending(query.id)} className='btn btn-primary btn-sm me-2'>Pending</button>
                    <button onClick={e=>handleClose(query.id)} className='btn btn-sm btn-danger'>Close</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default NewEnquiry