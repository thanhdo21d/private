import React from 'react'
// import Spreadsheet from 'react-spreadsheet'
// ES2015 module syntax
import { Spreadsheet } from '@progress/kendo-react-spreadsheet'
import '@progress/kendo-theme-default/dist/all.css'
const DemoExcel = () => {
  return (
    <div>
      <div>
        {/* <Spreadsheet data={data} columnLabels={col} rowLabels={row} /> */}
        <Spreadsheet
          style={{
            width: '100%',
            height: 700
          }}
          defaultProps={{
            sheets: "data"
          }}
        />
      </div>
    </div>
  )
}

export default DemoExcel
