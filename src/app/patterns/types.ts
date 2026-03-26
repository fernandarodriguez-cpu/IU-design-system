import React from 'react';

export interface Pattern {
  id: string;
  title: string;
  description: string;
  category: string;
  component: React.ReactNode;
  code: string;
}
