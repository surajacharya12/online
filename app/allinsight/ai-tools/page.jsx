'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import ImageGeneratorPage from './components/image-transform/page';
import Grammarly from '../grammarly/page';

export default function AiToolsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get('tab');
  const [currentTab, setCurrentTab] = useState(tabParam || 'image');

  useEffect(() => {
    setCurrentTab(tabParam || 'image');
  }, [tabParam]);

  const handleTabChange = (value) => {
    const params = new URLSearchParams();
    params.set('tab', value);
    router.push(`/allinsight/ai-tools?${params.toString()}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-[400px] mt-10">
      <TabsList>
        <TabsTrigger value="image">Image</TabsTrigger>
        <TabsTrigger value="grammarly">Grammarly</TabsTrigger>
      </TabsList>

      <TabsContent value="image">
        <ImageGeneratorPage />
      </TabsContent>

      <TabsContent value="grammarly">
        <Grammarly />
      </TabsContent>
    </Tabs>
  );
}
