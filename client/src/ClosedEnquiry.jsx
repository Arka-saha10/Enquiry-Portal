import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ClosedEnquiry() {
    const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/getClosedQuery')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

    return (
        <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Closed Enquiry List</h3>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Query</th>
            </tr>
          </thead>
          <tbody>
            {data.map((query, index) => {
              return <tr key={index}>
                  <td>{query.Uname}</td>
                  <td>{query.MobNo}</td>
                  <td>{query.email}</td>
                  <td>{query.queryn}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
    )
}

export default ClosedEnquiry