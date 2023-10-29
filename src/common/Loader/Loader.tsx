const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-black'>
      <div>
        <div className='cube'>
          <div className='face front' />
          <div className='face back' />
          <div className='face right' />
          <div className='face left' />
          <div className='face top' />
          <div className='face bottom' />
        </div>
      </div>
    </div>
  )
}

export default Loader
