// Placeholder summary page to resolve build errors
import React from 'react';
import { Card } from '../../../components/ui/card';
import Badge from '../../../components/ui/badge';
import Youtube from '../../../lib/youtube';

export default function SummaryPage() {
  return (
    <div>
      <h1>Summary Page</h1>
      <Card>
        <Badge>Sample Badge</Badge>
        <div>
          <Youtube />
        </div>
      </Card>
    </div>
  );
}
