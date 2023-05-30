import React from 'react'
import { Link } from 'react-router-dom'

const RoleCard = ({role}) => {
  return (
    <>
        <Link className='Card' to="#">
            <p><b>Role Name :</b> {role.roleName}</p>
            <p><b>Role description :</b> {role.roleDescription}</p>
        </Link>
    </>
  )
}

export default RoleCard