import type { Meta, StoryObj } from '@storybook/react';
import { KButton } from './index';
import { Save, Plus, Trash2, Mail } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof KButton> = {
  title: 'Atoms/KButton',
  component: KButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'navy', 'dashed', 'link', 'text'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Tamaño del botón',
    },
    shape: {
      control: 'select',
      options: ['default', 'circle', 'round'],
      description: 'Forma del botón',
    },
    danger: {
      control: 'boolean',
      description: 'Estado de peligro/error',
    },
    ghost: {
      control: 'boolean',
      description: 'Fondo transparente',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carga',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
    block: {
      control: 'boolean',
      description: 'Ancho completo',
    },
    iconPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Posición del icono',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'primary',
    danger: true,
    children: 'Danger Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'primary',
    ghost: true,
    children: 'Ghost Button',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    icon: <Mail size={16} />,
    children: 'Email Us',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    shape: 'circle',
    icon: <Plus size={16} />,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    href: 'https://khor.ai',
    target: '_blank',
    children: 'Khor AI Website',
  },
};
