import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

export function DashboardHeader() {
  const [dateTime, setDateTime] = useState(new Date());
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Card className="mb-6">
      <CardContent className="flex justify-between items-center py-4">
        <div className="flex gap-4">
          <span className="font-semibold">Date: {formatDate(dateTime)}</span>
          <span className="font-semibold">Time: {formatTime(dateTime)}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-semibold">User: {user?.email || 'N/A'}</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-semibold">Role: {user?.role || 'N/A'}</span>
        </div>
      </CardContent>
    </Card>
  );
}
