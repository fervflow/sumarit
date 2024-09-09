"use client";

import { useApiContext } from '@/app/contexts/ApiContext';

export default function TestComponent() {
  const api = useApiContext();
  
  return (<div>{api ? 'API is available' : 'No API'}</div>);
}
