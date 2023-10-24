import { useState } from 'react'
import axios from 'axios'
const DetailsDsNormal = () => {
  const [file, setFile] = useState<any>(null)
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0])
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axios.post('http://localhost:8282/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div
        className='relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover '
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
        }}
      >
        <div className='absolute bg-black opacity-60 inset-0 z-0' />
        <div className='sm:max-w-lg w-full p-10 bg-white rounded-xl z-10'>
          <div className='text-center'>
            <h2 className='mt-5 text-3xl font-bold text-gray-900'>File Upload!</h2>
            <p className='mt-2 text-sm text-gray-400'>Lorem ipsum is placeholder text.</p>
          </div>
          <form className='mt-8 space-y-3' onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 space-y-2'>
              <label className='text-sm font-bold text-gray-500 tracking-wide'>Title</label>
              <input
                className='text-base  p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                type='file'
                id='clmm-title_modal'
                onChange={handleFileChange}
                placeholder='mail@gmail.com'
              />
            </div>
            <div className='grid grid-cols-1 space-y-2'>
              <label className='text-sm font-bold text-gray-500 tracking-wide'>Attach Document</label>
              <div className='flex items-center justify-center w-full '>
                <label className='flex  cursor-pointer flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center'>
                  <div className='h-full w-full text-center flex flex-col items-center justify-center  '>
                    <div className='flex flex-auto max-h-48 w-2/5 mx-auto -mt-10'>
                      <img
                        className='has-mask h-36 object-center'
                        src='https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg'
                        alt='freepik image'
                      />
                    </div>
                    <p className='pointer-none text-gray-500 '>
                      <span className='text-sm'>Drag and drop</span> files here <br /> or{' '}
                      <a className='text-blue-600 hover:underline'>select a file</a> from your computer
                    </p>
                  </div>
                  <input type='file' onChange={handleFileChange} className='hidden' />
                </label>
              </div>
            </div>
            <p className='text-sm text-gray-300'>
              <span>File type: Excel</span>
            </p>
            <div>
              <button
                type='submit'
                className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-full tracking-wide bg-secondary  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DetailsDsNormal
