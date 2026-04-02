import type { Meta, StoryObj } from '@storybook/react';
import { KBadge } from './index';
import { Mail, Bell, ShoppingCart, User } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof KBadge> = {
  title: 'Atoms/KBadge',
  component: KBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'primary', 'processing', 'default'],
      description: 'Estado del badge',
    },
    count: {
      control: 'number',
      description: 'Valor a mostrar',
    },
    overflowCount: {
      control: 'number',
      description: 'Número máximo antes de mostrar +',
    },
    showZero: {
      control: 'boolean',
    },
    dot: {
      control: 'boolean',
      description: 'Mostrar como un punto',
    },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: 'Tamaño del badge',
    },
    color: {
      control: 'color',
      description: 'Color de fondo personalizado',
    },
    label: {
      control: 'text',
      description: 'Texto para variante Status Chip',
    }
  },
};

export default meta;
type Story = StoryObj<typeof KBadge>;

export const Default: Story = {
  args: {
    count: 5,
    children: <div style={{ width: 42, height: 42, backgroundColor: '#f3f4f6', borderRadius: 8 }} />,
  },
};

export const OverFlow: Story = {
  args: {
    count: 120,
    overflowCount: 99,
    children: <Bell size={24} />,
  },
};

export const Dot: Story = {
  args: {
    dot: true,
    children: <Mail size={24} />,
  },
};

export const StatusChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <KBadge status="success" label="Aprobado" />
      <KBadge status="error" label="Rechazado" />
      <KBadge status="processing" label="Enviando..." />
      <KBadge status="warning" label="Pendiente" />
    </div>
  ),
};

export const SmallSize: Story = {
  args: {
    count: 8,
    size: 'small',
    children: <ShoppingCart size={24} />,
  },
};

export const CustomColor: Story = {
  args: {
    count: 10,
    color: '#8b5cf6',
    children: <User size={24} />,
  },
};
