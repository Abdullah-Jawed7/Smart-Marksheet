"use client"
import Image from "next/image";
import { useState ,useEffect } from "react";

import {Subject} from '@/lib/types'

 export default function Modal({ selectedSubject, }:
  { selectedSubject: Subject | null,
  })
  {
  
    
    const [modal ,setModal ] =useState(false)
    const [index ,setIndex ] =useState(0)
    const [image ,setImage ] =useState('/math2.jpg')
  
  
  let images :string[] = [];
  let selectImages: { [key: string]: string[] } = {
    maths:['/math2.jpg'],
    urdu:['/urdu1.jpg','/urdu2.jpg','/urdu3.jpg'],
    computer:['/computer2.jpg'],
    english:['/english1.jpg' ,'/english2.jpg'],
    islamiat:['islamiat1.jpg','/islamiat2.jpg'],
    physics:['/physics1.jpg' ,'/physics2.jpg']
  }
  
  useEffect(()=>{
    let sub =selectedSubject?.name
   let img = selectImages[`${sub?.toLowerCase()}`]  
   img?.forEach((i)=>images.push(i))
  console.log(images);
  console.log(images[index]);
  setImage(images[index])
  },[images ,selectedSubject , modal,index])
  
  
    return(
  
      <>
    <button onClick={()=>setModal(!modal)} id="open-carousel" className="px-5 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
     Exam Paper
    </button>
  
   
    <div id="modal" className={`${modal ? 'flex' :'hidden'}  fixed inset-0  bg-black bg-opacity-60  items-center justify-center z-50 `}>
      <div className="relative bg-white rounded-lg p-4 max-w-3xl w-full h-auto flex flex-col items-center">
        {/* <!-- Close Button --> */}
        <button onClick={()=>setModal(!modal)} id="close-button" className="absolute top-3 right-3 text-white bg-red-500 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition">
          &times;
        </button>
  
        {/* <!-- Image --> */}
        <Image id="modal-image" src={image} width={600} height={1000} alt="Projection" className="w-full max-h-[500px] object-contain rounded-lg shadow-md"/>
  
        {/* <!-- Navigation Buttons --> */}
        <button onClick={()=>setIndex((index - 1 + images.length) % images.length)} id="prev-button" className="absolute left-1 top-1/2 -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
          &#10094;
        </button>
        <button onClick={()=>setIndex( (index + 1) % images.length)} id="next-button" className="absolute right-1 top-1/2 -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
          &#10095;
        </button>
      </div>
    </div>
   
   </>
    )
  }