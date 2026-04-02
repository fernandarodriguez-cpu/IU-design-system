import type { Meta, StoryObj } from '@storybook/react';
import { KAvatar, KAvatarGroup } from './index';
import { User, Bell, Star } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof KAvatar> = {
  title: 'Atoms/KAvatar',
  component: KAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Tamaño del avatar',
    },
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
      description: 'Forma del avatar',
    },
    src: {
      control: 'text',
      description: 'URL de la imagen',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo',
    },
    name: {
      control: 'text',
      description: 'Nombre para generar iniciales',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Estado de presencia',
    },
    color: {
      control: 'color',
      description: 'Color de fondo personalizado',
    }
  },
};

export default meta;
type Story = StoryObj<typeof KAvatar>;

export const Default: Story = {
  args: {
    name: 'Dani Lez',
    size: 'md',
  },
};

export const Image: Story = {
  args: {
    src: 'https://images.unsplash.com,photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
    alt: 'User Portrait',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    icon: <User size={24} />,
    size: 'lg',
    color: '#051758',
  },
};

export const Square: Story = {
  args: {
    name: 'Khor AI',
    shape: 'square',
    size: 'lg',
  },
};

export const Status: Story = {
  args: {
    name: 'Active User',
    status: 'online',
    size: 'xl',
  },
};

export const CustomColors: Story = {
  args: {
    name: 'Custom User',
    color: '#f43f5e',
    size: 'lg',
  },
};

export const AvatarGroup: StoryObj<typeof KAvatarGroup> = {
  render: () => (
    <KAvatarGroup max={3}>
      <KAvatar name="User One" />
      <KAvatar name="User Two" />
      <KAvatar name="User Three" />
      <KAvatar name="User Four" />
      <KAvatar name="User Five" />
    </KAvatarGroup>
  ),
};
