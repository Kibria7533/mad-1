import React from 'react'
import {
 
  CCol,
  CContainer,
  CRow
} from '@coreui/react'
const CheckandActive = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">Great</h1>
              <h4 className="pt-3">You all done please Check your gmail we send a activition link!</h4>
              <p className="text-muted float-left">Please click activation within a day.</p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default CheckandActive
