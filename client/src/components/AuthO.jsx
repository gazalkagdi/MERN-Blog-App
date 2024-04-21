import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'

export default function AuthO() {

    const handleGoogleClick = () => {

    }

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline className='items-center' onClick={handleGoogleClick}><AiFillGoogleCircle className='w-6 h-6 mr-2' />Continue with Google</Button>
    )
}
