"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

function page() {
    const path = usePathname();

  return (
    <div>Deep Dynamic
        <p>path name:{path}</p>
    </div>
  )
}

export default page