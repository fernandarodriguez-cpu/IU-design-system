import type { Meta, StoryObj } from '@storybook/react';
import { KInput } from './index';
import { Mail, User, Lock, Search, Info } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof KInput> = {
  title: 'Atoms/KInput',
  component: KInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'borderless', 'filled'],
      description: 'Estilo visual del input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'warning'],
      description: 'Estado de validación',
    },
    disabled: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
      description: 'Muestra botón para limpiar',
    },
    showCount: {
      control: 'boolean',
      description: 'Muestra contador de caracteres',
    },
    maxLength: {
      control: 'number',
    },
    block: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KInput>;

export const Default: Story = {
  args: {
    placeholder: 'Escribe algo...',
    variant: 'outlined',
    size: 'md',
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: 'Correo electrónico',
    prefix: <Mail size={16} />,
  },
};

export const WithAddons: Story = {
  args: {
    placeholder: 'google',
    addonBefore: 'https://',
    addonAfter: '.com',
  },
};

export const AllowClear: Story = {
  args: {
    defaultValue: 'Contenido inicial',
    allowClear: true,
  },
};

export const ShowCount: Story = {
  args: {
    placeholder: 'Máximo 20 caracteres',
    maxLength: 20,
    showCount: true,
  },
};

export const ErrorStatus: Story = {
  args: {
    status: 'error',
    helperText: 'Este campo es obligatorio',
    defaultValue: 'Valor incorrecto',
  },
};

export const WarningStatus: Story = {
  args: {
    status: 'warning',
    helperText: 'La contraseña es débil',
    defaultValue: '123456',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Estilo relleno',
  },
};

export const Borderless: Story = {
  args: {
    variant: 'borderless',
    placeholder: 'Estilo sin bordes',
  },
};
