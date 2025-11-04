'use client'



import * as React from "react"

import { Waves } from "@/components/ui/wave-background"



export function WavesDemo() {

  return (

    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">

      <Waves className="h-full w-full" />

    </div>

  )

}



export { WavesDemo }

