import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';  // Make sure this import is correct
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import React from 'react';
import CopyButton from './copy';
import Image from 'next/image';

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

async function History() {
  const user = await currentUser();

  {/* @ts-ignore*/ }
  const historyList: HISTORY[] = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress as string))
    .orderBy(desc(AIOutput.id));

  // Function to get the template name by slug
  const getTemplate = (slug: string) => {
    return Templates.find((item) => item.slug === slug) || { name: 'Unknown Template', icon: '/default-icon.png' };
  };


  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated AI content</p>

      <div className="grid grid-cols-5 font-bold bg-secondary mt-5 py-3 px-3 gap-4">
        <div>Template</div>
        <div>AI Response</div>
        <div>Date</div>
        <div>Words</div>
        <div>Copy</div>
      </div>


      {historyList.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className="grid grid-cols-5 my-5 py-3 px-3 gap-4 w-full">
            <div className="flex items-center gap-4">
              <Image src={getTemplate(item.templateSlug).icon} alt="icon" width={30} height={30} />
              <div>{getTemplate(item.templateSlug).name}</div>
            </div>
            <div>{item.aiResponse.slice(0, 100)}...</div>
            <div>{item.createdAt}</div>
            <div>{item.aiResponse?.length}</div>
            <div>
              <CopyButton textToCopy={item.aiResponse} />
            </div>
          </div>
          {/* Full-width hr */}
          {index < historyList.length - 1 && (
            <div className="col-span-5">
              <hr className="w-full border-t border-gray-300 my-4" />
            </div>
          )}
        </React.Fragment>
      ))}

    </div>
  );
}

export default History;
