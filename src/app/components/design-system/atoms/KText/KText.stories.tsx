import type { Meta, StoryObj } from '@storybook/react';
import { KText } from './index';
import React from 'react';

const meta: Meta<typeof KText> = {
  title: 'Atoms/KText',
  component: KText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'body-lg', 'body-md', 'small', 'caption'],
      description: 'Jerarquía tipográfica',
    },
    color: {
      control: 'select',
      options: ['default', 'secondary', 'primary', 'navy', 'success', 'error', 'muted'],
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Estado semántico',
    },
    strong: { control: 'boolean' },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    delete: { control: 'boolean' },
    mark: { control: 'boolean' },
    code: { control: 'boolean' },
    keyboard: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KText>;

export const Default: Story = {
  args: {
    children: 'El veloz zorro marrón salta sobre el perro perezoso.',
    variant: 'body-md',
  },
};

export const Titles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <KText variant="h1">Título H1 — 38px</KText>
      <KText variant="h2">Título H2 — 30px</KText>
      <KText variant="h3">Título H3 — 24px</KText>
    </div>
  ),
};

export const SemanticTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <KText type="secondary">Secondary text</KText>
      <KText type="success">Success text</KText>
      <KText type="warning">Warning text</KText>
      <KText type="danger">Danger text</KText>
    </div>
  ),
};

export const Decorations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <KText strong>Strong text</KText>
      <KText italic>Italic text</KText>
      <KText underline>Underline text</KText>
      <KText delete>Delete text</KText>
      <KText mark>Marked text</KText>
      <KText code>Code snippet</KText>
      <KText keyboard>Ctrl + C</KText>
    </div>
  ),
};

export const CustomTag: Story = {
  args: {
    children: 'Renderizado como un <div>',
    as: 'div',
    variant: 'h2',
    color: 'navy',
  },
};
