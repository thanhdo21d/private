import React, { useEffect, useState } from 'react'

const TestRole = () => {
  // const [task, setDataTask] = useState([])
  // const [roles, setRoles] = useState([])
  // const [selectedRole, setSelectedRole] = useState('')
  // const [assignedTasks, setAssignedTasks] = useState([])
  // useEffect(() => {
  //   fetch('http://localhost:8282/role')
  //     .then((res) => res.json())
  //     .then((data: any) => {
  //       setRoles(data)
  //     })
  //   fetch('http://localhost:8282/task')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDataTask(data)
  //       console.log(data)
  //     })
  // }, [])
  // function actionTask(type : any, id : any) {
  //   const role = selectedRole
  //   const xhr = new XMLHttpRequest()
  //   const obj : any = document.getElementById('btn_' + id)
  //   if (obj.style.color === '#f22' || obj.style.color === 'rgb(255, 0, 0)' || obj.style.color === 'rgb(255, 34, 34)') {
  //     obj.style.color = 'green'
  //     obj.style.borderColor = 'green'
  //   } else {
  //     obj.style.color = '#f22'
  //     obj.style.borderColor = '#f22'
  //   }
  //   // xhr.open('GET', `http://localhost:8282/task?type=${type}&task=${id}&role=${role}`, true)
  //   // xhr.send()
  // }
  return (
    <div>
      {/* <div>
        <h3>Chọn nhiệm vụ cho role</h3>
        <div>
          <select name='' id='role' onChange={(e: any) => setSelectedRole(e.target.value)}>
            <option value='Chọn role'></option>
            {roles.map((role: any) => (
              <option key={role.name} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <br />
        <span id='task'></span>
        <span id='OnTask'></span>
      </div>

      {task.map((task: any) => (
        <button
          id={`btn_${task._id}`}
          key={task._id}
          style={{
            padding: '5px',
            margin: '5px',
            color: assignedTasks.includes(task?._id) ? 'green' : '#f00',
            border: `1px ${assignedTasks.includes(task?._id) ? 'green' : '#f00'} solid`
          }}
          onClick={() => actionTask(assignedTasks.includes(task?._id) ? 'delete' : 'add', task._id)}
        >
          {task.name}
        </button>
      ))} */}
    </div>
  )
}

export default TestRole
