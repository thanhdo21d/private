// import React, { useState } from 'react'
// import addIcons from '~/assets/add (1).png'

// const AddQuestion = () => {
//   const handleAddQuestion = () => {
//     const [dynamicQuestions, setDynamicQuestions] = useState([])
//     setDynamicQuestions((prevQuestions) => [...prevQuestions, { img: '', question: '' }])
//   }
//   return (
//     <div>
//       <div className='flex justify-center'>
//         <img
//           onClick={handleAddQuestion}
//           className='w-[50px] cursor-pointer hover:scale-110 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'
//           src={addIcons}
//         />
//       </div>
//       // ...
//       {dynamicQuestions.map((question, index) => (
//         <div key={index}>
//           <div className='grid grid-cols-2 gap-15 items-center'>
//             <Form.Item
//               name={`question${index}`}
//               label={<p className='font-bold text-xl'>Đáp án {listName[index]} </p>}
//               rules={[{ required: true, message: 'Vui lòng nhập Thêm Câu Hỏi ...!' }]}
//             >
//               <TextArea
//                 onChange={(event) =>
//                   setDataQuestion({
//                     ...dataQuestion,
//                     [`question${index}`]: event.target.value
//                   })
//                 }
//                 className='rounded-md border border-[#ccc] '
//                 placeholder='Vui lòng nhập Thêm Câu Hỏi ...!'
//               />
//             </Form.Item>
//             <div className='flex items-center w-full'>
//               <div className='w-1/2'>
//                 {question.img !== '' ? (
//                   <Image className='!w-[200px]' src={`${uri}${question.img}`} />
//                 ) : (
//                   <div>{/* Render your default image or placeholder here */}</div>
//                 )}
//               </div>
//               <div className='block w-1/2'>
//                 <form className=''>
//                   <label
//                     htmlFor={`fileInput${index}`}
//                     className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
//                   >
//                     <input
//                       type='file'
//                       id={`fileInput${index}`}
//                       className='w-full'
//                       onChange={(e) => setFile(e.target.files[0])}
//                       style={{ display: 'none' }}
//                     />
//                     Select Image
//                   </label>
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault()
//                       handleUpload(String(index + 2))
//                     }}
//                     type='submit'
//                     className='bg-success  py-2 w-1/3 mt-5 rounded-md text-white font-medium'
//                   >
//                     Upload
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//           <Divider></Divider>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default AddQuestion
