// import { Form, Input } from 'antd'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Button } from '~/components'

// const CreateAliasForder = () => {
//   const navigate = useNavigate()
//   const [data, setData] = useState({})
//   const [folderName, setFolderName] = useState('')
//   const [inputKey, setInputKey] = useState(0)
//   const handleFolderNameChange = (e) => {
//     setFolderName(e.target.value)
//   }
//   const handleAddFolder = () => {
//     if (folderName) {
//       setData((prevData) => ({
//         ...prevData,
//         [folderName]: false
//       }))
//       setFolderName('')
//       setInputKey((prevKey) => prevKey + 1)
//     }
//   }
//   const renderFolders = (folders) => {
//     return (
//       <ul>
//         {Object.keys(folders).map((folder) => (
//           <li className=' gap-10 items-center' key={folder}>
//             <input
//               key={inputKey}
//               className='w-[450px] border border-[#ccc] rounded-md'
//               type='text'
//               value={folders[folder]}
//               onChange={(e) => handleFolderInputChange(folder, e)}
//             />
//             <p className='text-black font-medium'>{folder}</p>
//             <Button styleClass='bg-black' onClick={() => handleAddSubFolder(folder)}>
//               Add Subfolder
//             </Button>
//             {renderFolders(folders[folder])}
//           </li>
//         ))}
//       </ul>
//     )
//   }
//   const handleFolderInputChange = (folder, e) => {
//     const updatedData = {
//       ...data,
//       [folder]: e.target.value
//     }
//     setData(updatedData)
//   }
//   const handleAddSubFolder = (folder) => {
//     const subFolderName = prompt('Enter subfolder name:')
//     if (subFolderName) {
//       setData((prevData) => ({
//         ...prevData,
//         [folder]: {
//           ...prevData[folder],
//           [subFolderName]: false
//         }
//       }))
//     }
//   }
//   console.log(data)

//   return (
//     <div>
//       <div className='mb-20'>
//         <Button onClick={() => navigate(-1)} styleClass='py-2'>
//           Quay Lại
//         </Button>
//       </div>
//       <div className='flex gap-10'>
//         <input
//           className='w-[450px] border border-[#ccc] rounded-md'
//           type='text'
//           placeholder='Enter folder name'
//           value={folderName}
//           onChange={handleFolderNameChange}
//         />
//         <Button styleClass='bg-black' onClick={handleAddFolder}>
//           Add Folder
//         </Button>
//       </div>
//       <div className='mt-3'>{renderFolders(data)}</div>
//     </div>
//   )
// }

// export default CreateAliasForder
import React, { useState } from 'react'
import { Button } from '~/components'
import { useNavigate } from 'react-router-dom'
import { Divider } from 'antd'
import axios from 'axios'
import { toastService } from '~/utils/toask/toaskMessage'
import Cookies from 'js-cookie'
import { useCreateAliasFoldersMutation } from '~/apis/aliasFolder/aliasFolder'
const CreateAliasFolder = () => {
  const uri = import.meta.env.VITE_API
  const idCate = localStorage.getItem('idCategories')
  const [createAlias] = useCreateAliasFoldersMutation()
  const [data, setData] = useState({})
  const [name, setName] = useState('')
  const token = Cookies.get('token')
  const navigate = useNavigate()
  const [folderName, setFolderName] = useState('')
  const handleFolderNameChange = (e: any) => {
    setFolderName(e.target.value)
  }
  const handleAddFolder = () => {
    if (folderName) {
      setData((prevData) => ({
        ...prevData,
        [folderName]: false
      }))
      setFolderName('')
    }
  }
  const handleAddSubFolder = (folderPath: any) => {
    const subFolderName = prompt('Enter subfolder name:')
    if (subFolderName) {
      const updatedData = { ...data }
      const folderNames = folderPath.split('/').filter((folder: any) => folder !== '') // Loại bỏ các chuỗi rỗng
      console.log(folderNames)
      let currentData: any = updatedData
      for (const folderName of folderNames) {
        currentData[folderName] = currentData[folderName] || {}
        currentData = currentData[folderName]
      }
      currentData[subFolderName] = false
      setData(updatedData)
    }
  }
  console.log(data)
  const renderFolders = (folders: any, path = '') => {
    return (
      <ul className='mt-4'>
        {Object.keys(folders).map((folder) => (
          <li key={folder}>
            <input className='w-[450px] border border-[#ccc] rounded-md' type='text' value={folder} readOnly />
            <button
              className='bg-black text-white font-medium py-3 px-7 rounded-md ml-5'
              onClick={() => handleAddSubFolder(`${path}/${folder}`)}
            >
              Add Subfolder
            </button>
            {renderFolders(folders[folder], `${path}/${folder}`)}
          </li>
        ))}
      </ul>
    )
  }
  const handelSubmitAliasFolders = () => {
    try {
      createAlias({
        id: idCate,
        name: name,
        data: data
      })
        .then(() => {
          toastService.success('created successfully')
          navigate(-1)
        })
        .catch(() => toastService.error('error creating'))
    } catch (error) {
      toastService.error('error creating')
    }
  }
  return (
    <div>
      <div className='mb-10'>
        <Button onClick={() => navigate(-1)} styleClass='py-2'>
          Quay Lại
        </Button>
      </div>
      <Divider orientation='left'>
        <h2 className='mb-10'>Create Alias Folder</h2>
      </Divider>
      <div>
        <p className='py-2'> Tên Alias Folders </p>
        <input
          onChange={(event) => setName(event.target.value)}
          className='w-[450px] border border-[#ccc] rounded-md'
          type='text'
          placeholder='Enter Alias folder name'
        />
      </div>
      <Divider orientation='left'>
        <p className=''> Tên Folder</p>
      </Divider>
      <div className='flex gap-5 mt-3'>
        <input
          className='w-[450px] border border-[#ccc] rounded-md'
          type='text'
          placeholder='Enter folder name'
          value={folderName}
          onChange={handleFolderNameChange}
        />
        <Button styleClass='' onClick={handleAddFolder}>
          Add Folder
        </Button>
      </div>
      {renderFolders(data)}
      <div className='mt-5 w-full'>
        <Button onClick={handelSubmitAliasFolders} styleClass='w-full bg-meta-5'>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default CreateAliasFolder
