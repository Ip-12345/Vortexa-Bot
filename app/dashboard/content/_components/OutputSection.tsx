import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface PROPS{
  aiOutput: string
}

function OutputSection({aiOutput}:PROPS) {
  const editorRef:any = useRef()

  useEffect(()=>{
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput])

  return (
    <div className='bg-white border shadow-lg rounded-lg'>
      <div className='flex items-center justify-between p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(aiOutput)}><Copy className='w-4 h-4'/>Copy</Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Picky's response appears here"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  )
}

export default OutputSection
