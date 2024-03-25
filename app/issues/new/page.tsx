"use client"
import { Button,  Callout,  Text,  TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { creatIssueSchema } from '@/app/creatIssueSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm= z.infer<typeof creatIssueSchema>
const New = () => {
  const {register,control,handleSubmit,formState :{ errors}} =useForm<IssueForm>({resolver:zodResolver(creatIssueSchema)})
  const [error,setError] = useState('')
  const router =useRouter()
  const onSubmit =handleSubmit(
    async (data) =>{
      try{   
        await axios.post('/api/issues',data)
       router.push('/issues')
      }catch(error){
        setError("An unexpected error occured")
      }
   
    }
    )
  return (
    <div className="max-w-xl">
      {error&&<Callout.Root className='mb-5' color="red">
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
    <form className="space-y-3" onSubmit={onSubmit}>
 <TextField.Root>
  <TextField.Input placeholder="Title" {...register('title')} />
</TextField.Root>
<ErrorMessage>{errors.title?.message}</ErrorMessage>
<Controller
 name='description'
 control={control}
 render={({field}) => 
<SimpleMDE placeholder="description" {...field} />
 }
/>
 <ErrorMessage>{errors?.description?.message}</ErrorMessage>
<Button>Create new issue</Button>
    </form>
    </div>
  )
}

export default New