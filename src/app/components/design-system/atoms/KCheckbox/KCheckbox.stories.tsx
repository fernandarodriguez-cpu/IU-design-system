import type { Meta, StoryObj } from '@storybook/react';
import { KCheckbox } from './index';
import React, { useState } from 'react';

const meta: Meta<typeof KCheckbox> = {
  title: 'Atoms/KCheckbox',
  component: KCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado de la casilla',
    },
    disabled: {
      control: 'boolean',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning'],
    },
    label: {
      control: 'text',
    }
  },
};

export default meta;
type Story = StoryObj<typeof KCheckbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox Label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked state',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled state',
    disabled: true,
    checked: true,
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <KCheckbox status="default" label="Default Status" />
      <KCheckbox status="warning" label="Warning Status" />
      <KCheckbox status="error" label="Error Status" />
      <KCheckbox status="error" label="Error & Checked" checked />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <KCheckbox 
          checked={checked} 
          onCheckedChange={setChecked}
          label={checked === 'indeterminate' ? 'Indeterminate' : (checked ? 'Checked' : 'Unchecked')}
        />
        <button 
          onClick={() => setChecked('indeterminate')}
          style={{ fontSize: 12, padding: '4px 8px', backgroundColor: '#f3f4f6', borderRadius: 4, width: 'fit-content' }}
        >
          Set Indeterminate
        </button>
      </div>
    );
  }
};
