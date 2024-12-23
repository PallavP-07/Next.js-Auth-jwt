
'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function page() {
    const router = useRouter()
    const handleRoute = () => {
        router.push('/service/nest')
    }
    return (
        <div>This is service page

            <Link href={'/'} className='bg-blue-500 p-2 m-2'>home page</Link>
            <button onClick={handleRoute}> nest page</button>
        </div>

    )
}

export default page