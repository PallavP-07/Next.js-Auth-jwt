import { redirect } from 'next/navigation';
import React from 'react'

function page() {
 let nestPage =null;

 if(nestPage === null) redirect('/')

  return (
    <div>Service Nested Route Page</div>
  )
}

export default page