import type { Meta, StoryObj } from '@storybook/react';
import { KTag, KCheckableTag } from './index';
import { Star, Settings, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import React, { useState } from 'react';

const meta: Meta<typeof KTag> = {
  title: 'Atoms/KTag',
  component: KTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'navy', 'accent', 'success', 'error', 'warning', 'info', 'default', 'processing'],
      description: 'Color predefinido',
    },
    status: {
      control: 'select',
      options: ['success', 'processing', 'error', 'warning', 'default'],
      description: 'Estado semántico',
    },
    bordered: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
    icon: {
      control: false,
    }
  },
};

export default meta;
type Story = StoryObj<typeof KTag>;

export const Default: Story = {
  args: {
    children: 'Tag Name',
    color: 'default',
  },
};

export const StatusTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <KTag status="success" icon={<CheckCircle size={12} />}>Success</KTag>
      <KTag status="processing" icon={<Clock size={12} />}>Processing</KTag>
      <KTag status="warning" icon={<AlertCircle size={12} />}>Warning</KTag>
      <KTag status="error" icon={<Info size={12} />}>Error</KTag>
      <KTag status="default">Default</KTag>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <KTag color="primary">Primary</KTag>
      <KTag color="navy">Navy</KTag>
      <KTag color="accent">Accent</KTag>
      <KTag color="#eb2f96">Custom</KTag>
    </div>
  ),
};

export const Closable: Story = {
  args: {
    children: 'Closable Tag',
    closable: true,
    onClose: () => alert('Cerrado'),
  },
};

export const Checkable: StoryObj<typeof KCheckableTag> = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <KCheckableTag checked={checked} onChange={setChecked}>
        {checked ? 'Selected' : 'Unselected'}
      </KCheckableTag>
    );
  },
};

export const IconTags: Story = {
  args: {
    children: 'Settings',
    icon: <Settings size={12} />,
    color: 'primary',
  },
};
