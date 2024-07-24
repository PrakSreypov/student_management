import React, { useEffect } from 'react';
import {request} from '../../utils/request'

const AdminTeacherPage = () => {
  useEffect(() => {
    getList
  }, [])
  
  const getList = async () => {
    const res = await request('teacher', 'get')
  }
  return (
    <div>
      AdminTeacherPage
    </div>
  )
}

export default AdminTeacherPage
