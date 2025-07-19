"use client"
import Image from "next/image"

export default function TopNav({useSave} : {useSave: boolean}){
    return (
        <header className="w-screen flex justify-between items-center py-3 md:py-6 px-5 font-medium text-[rgb(0,0,0,0.75)] bg-white border-b-2 border-[var(--sh-color)]">
          <div className="flex gap-2 items-center">
            <Image width={25} height={25} src="/dummy-image.jpg" alt="image-not-found" className="w-full h-auto"/>
            <p>FoodAdmin</p>
          </div>
          {useSave ? <div className="flex gap-3 items-center border-1 rounded-[20px] border-dashed p-4">
            <p className="p-0.5 md:p-2">Unsaved changes</p>
            <div className="bg-gray-100 rounded-[2.5px] md:rounded-[5px] shadow-[0_0_2px_var(--sh-color)] px-2 md:px-4 py-1 md:py-2">Discard</div>
            <div className="bg-blue-700 rounded-[2.5px] md:rounded-[5px] shadow-[0_0_2px_var(--sh-color)] px-2 md:px-4 py-1 md:py-2 text-white">Save</div>
          </div> : ""}
        </header>
    )
}