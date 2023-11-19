import { Breadcrumb, Divider, Form, Input, Skeleton, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '~/components'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetDetailsExamsQuery } from '~/apis/department/department'

const EditQuestionExams = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    data: getDetailsExams,
    isFetching: isDeailFetching,
    isLoading
  } = useGetDetailsExamsQuery({
    idDepartment: id
  })
  return (
    <div className='m-10'>
      <Breadcrumb
        items={[
          {
            title: 'Trang Quản Trị'
          },
          {
            title: 'Chỉnh Sửa Câu Hỏi'
          }
        ]}
      />
      <div className=' mt-15 justify-center items-center w-1/6'>
        <Button onClick={() => navigate(-1)} styleClass='py-2 w-2/3 bg-[#24A19C]'>
          Quay Lại
        </Button>
      </div>
      {isLoading || isDeailFetching ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='mt-10'>
          <Form layout='vertical' initialValues={{ name: getDetailsExams?.dataDepartments?.question }}>
            <Divider orientation='left'>Chi Tiết Câu Hỏi</Divider>
            <Form.Item
              name='name'
              label={<p className='font-bold text-xl'>Câu Hỏi</p>}
              rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
            >
              <TextArea
                className='rounded-md border border-[#ccc] '
                placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
              />
            </Form.Item>
            <Divider></Divider>
            <Form.Item
              name='imageQuestion'
              label={<p className='font-bold text-xl'>Ảnh (Nếu có )</p>}
              rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
            >
              <Upload listType='picture-card'>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Divider orientation='left'>Chi Tiết đáp án</Divider>

            <div className='grid grid-cols-2 gap-5 items-center'>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Đáp án A </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea className='rounded-md border border-[#ccc] ' placeholder='vui lòng nhập Thêm Câu Hỏi ...!' />
              </Form.Item>
              <Form.Item
                name='name'
                style={{ display: 'flex', justifyContent: 'center' }}
                label={<p className='font-bold text-xl'>Ảnh Đáp án A (Nếu Có )</p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Upload listType='picture-card'>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <Divider></Divider>

            <div className='grid grid-cols-2 gap-5 items-center'>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Đáp án B </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea className='rounded-md border border-[#ccc] ' placeholder='vui lòng nhập Thêm Câu Hỏi ...!' />
              </Form.Item>
              <Form.Item
                name='name'
                style={{ display: 'flex', justifyContent: 'center' }}
                label={<p className='font-bold text-xl'>Ảnh Đáp án B (Nếu Có )</p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Upload listType='picture-card'>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <Divider></Divider>

            <div className='grid grid-cols-2 gap-5 items-center'>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Đáp án C </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea className='rounded-md border border-[#ccc] ' placeholder='vui lòng nhập Thêm Câu Hỏi ...!' />
              </Form.Item>
              <Form.Item
                name='name'
                style={{ display: 'flex', justifyContent: 'center' }}
                label={<p className='font-bold text-xl'>Ảnh Đáp án D (Nếu Có )</p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Upload listType='picture-card'>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <Divider></Divider>

            <div className='grid grid-cols-2 gap-5 items-center'>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Đáp án D </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea className='rounded-md border border-[#ccc] ' placeholder='vui lòng nhập Thêm Câu Hỏi ...!' />
              </Form.Item>
              <Form.Item
                name='name'
                style={{ display: 'flex', justifyContent: 'center' }}
                label={<p className='font-bold text-xl'>Ảnh Đáp án D (Nếu Có )</p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Upload listType='picture-card'>
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </div>
            <Divider></Divider>

            <div className='grid grid-cols-2 gap-10'>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Đáp án Đúng </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Input
                  className='rounded-md border w-full  border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Điểm</p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Input
                  className='rounded-md border w-full  border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
            </div>

            <Button type='submit' styleClass='  w-full '>
              Submit
            </Button>
          </Form>
        </div>
      )}
    </div>
  )
}

export default EditQuestionExams
