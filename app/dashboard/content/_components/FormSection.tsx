'use client'
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

interface PROPS{
  selectedTemplate?:TEMPLATE;
  userFormInput:any,
  loading:boolean
}
/* The @ts-ignore comment is used in TypeScript to suppress TypeScript
 compiler errors on the following line of code. It essentially tells the compiler to ignore any type-checking errors that would normally be thrown for that line.*/
function FormSection({selectedTemplate, userFormInput, loading}:PROPS) {

  const [formData, setFormData] = useState<any>()

  const handleInputChange = (event:any) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]:value})
  }

  const onSubmit = (e:any) =>{
    e.preventDefault()
    userFormInput(formData)
  }

  return (
    <div className='p-5 shadow-lg border rounded-lg bg-white'>
      {/* @ts-ignore */}
      <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70}/>
      <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
      <form className='mt-6' onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index)=>(
          <div className='my-2 flex flex-col mb-7 gap-2'>
            <label className='font-bold'>{item?.label}</label>
            {item.field == 'input'?
              <Input name={item?.name} required={item?.required} onChange={handleInputChange}/>
              :item.field == 'textarea'?
              <Textarea name={item?.name} required={item?.required} onChange={handleInputChange}/>:null
            }
          </div>
        ))}
        <Button type='submit' 
        className='w-full py-6'
        disabled={loading}
        >{loading&&<Loader2Icon className='animate-spin'/>} Generate Content</Button>
      </form>
    </div>
  )
}

export default FormSection
