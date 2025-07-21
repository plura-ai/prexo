import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function CtaBtns() {
  return (
    <div className='flex items-center justify-center gap-4 mt-20 z-[500]'>
      <Button variant='outline' size={"lg"}>
        Documentation
      </Button>

        <div className="relative flex flex-col items-center">
          <Image
            src={"/img/try-it.png"}
            alt="Try it now"
            width={150}
            height={150}
            className="invert absolute -top-20 left-1/2 -translate-x-1/4 z-50"
          />
          <Button size={"lg"}>
            Get Started for Free
          </Button>
        </div>
    </div>
  )
}
