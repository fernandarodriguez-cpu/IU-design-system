export const khorMetadata = {
  "version": "5.0.0",
  "generatedAt": "2026-05-18T21:01:06.911Z",
  "components": [
    {
      "name": "KAlert",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KAlert/index.tsx",
      "props": [
        {
          "name": "type",
          "type": "'success' | 'error' | 'warning' | 'info' | 'teal'",
          "required": false,
          "description": "",
          "options": [
            "success",
            "error",
            "warning",
            "info",
            "teal"
          ],
          "isIcon": false
        },
        {
          "name": "title",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "closable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onClose",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showIcon",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": true
        },
        {
          "name": "banner",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "action",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAvatar",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KAvatar/index.tsx",
      "props": [
        {
          "name": "src",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "alt",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "srcSet",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "crossOrigin",
          "type": "'' | 'anonymous' | 'use-credentials'",
          "required": false,
          "description": "",
          "options": [
            "",
            "anonymous",
            "use-credentials"
          ],
          "isIcon": false
        },
        {
          "name": "referrerPolicy",
          "type": "React.HTMLAttributeReferrerPolicy",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "draggable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "name",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "size",
          "type": "AvatarSize | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number }",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg",
            "xl"
          ],
          "isIcon": false
        },
        {
          "name": "shape",
          "type": "'circle' | 'square'",
          "required": false,
          "description": "",
          "options": [
            "circle",
            "square"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'online' | 'offline' | 'busy' | 'away'",
          "required": false,
          "description": "",
          "options": [
            "online",
            "offline",
            "busy",
            "away"
          ],
          "isIcon": false
        },
        {
          "name": "gap",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onError",
          "type": "() => boolean | void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onClick",
          "type": "(e: React.MouseEvent) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAvatarGroup",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KAvatar/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "max",
          "type": "number | {\n    count: number;\n    style?: React.CSSProperties;\n    popover?: {\n      trigger?: 'hover' | 'click' | 'focus';\n      placement?: 'top' | 'bottom' | 'left' | 'right';\n    };\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "KAvatarProps['size']",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "shape",
          "type": "'circle' | 'square'",
          "required": false,
          "description": "",
          "options": [
            "circle",
            "square"
          ],
          "isIcon": false
        },
        {
          "name": "maxStyle",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBadgeStyles",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBadge/index.tsx",
      "props": [
        {
          "name": "root",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "indicator",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "text",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBadgeClassNames",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBadge/index.tsx",
      "props": [
        {
          "name": "root",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "indicator",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "text",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBadge",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBadge/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "text",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "status",
          "type": "KBadgeStatus",
          "required": false,
          "description": "",
          "options": [
            "success",
            "error",
            "warning",
            "info",
            "default",
            "primary",
            "processing",
            "teal"
          ],
          "isIcon": false
        },
        {
          "name": "count",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showZero",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "dot",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "offset",
          "type": "[number | string, number | string]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "overflowCount",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'default' | 'small'",
          "required": false,
          "description": "",
          "options": [
            "default",
            "small"
          ],
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "styles",
          "type": "KBadgeStyles",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "classNames",
          "type": "KBadgeClassNames",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBadgeRibbon",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBadge/index.tsx",
      "props": [
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "text",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'start' | 'end'",
          "required": false,
          "description": "",
          "options": [
            "start",
            "end"
          ],
          "isIcon": false,
          "defaultValue": "'end'"
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBadgeComponent",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBadge/index.tsx",
      "props": [
        {
          "name": "Ribbon",
          "type": "typeof KBadgeRibbon",
          "required": true,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBentoGrid",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBentoGrid/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "''"
        },
        {
          "name": "columns",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "4"
        },
        {
          "name": "gap",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "24"
        }
      ]
    },
    {
      "name": "KBentoItem",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KBentoGrid/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "''"
        },
        {
          "name": "colSpan",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "1"
        },
        {
          "name": "rowSpan",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "1"
        },
        {
          "name": "glass",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false,
          "defaultValue": "false"
        }
      ]
    },
    {
      "name": "KButton",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KButton/types.ts",
      "props": [
        {
          "name": "variant",
          "type": "KButtonVariant | 'outlined' | 'navy'",
          "required": false,
          "description": "",
          "options": [
            "outlined",
            "navy"
          ],
          "isIcon": false
        },
        {
          "name": "color",
          "type": "KButtonColor",
          "required": false,
          "description": "",
          "options": [
            "default",
            "primary",
            "secondary",
            "danger",
            "processing",
            "volcano",
            "gold",
            "lime",
            "purple"
          ],
          "isIcon": false
        },
        {
          "name": "kVariant",
          "type": "KButtonVariant | 'outlined' | 'navy'",
          "required": false,
          "description": "",
          "options": [
            "outlined",
            "navy"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "KButtonSize",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg",
            "icon"
          ],
          "isIcon": false
        },
        {
          "name": "shape",
          "type": "KButtonShape",
          "required": false,
          "description": "",
          "options": [
            "default",
            "circle",
            "round"
          ],
          "isIcon": false
        },
        {
          "name": "htmlType",
          "type": "'button' | 'submit' | 'reset'",
          "required": false,
          "description": "",
          "options": [
            "button",
            "submit",
            "reset"
          ],
          "isIcon": false
        },
        {
          "name": "type",
          "type": "'button' | 'submit' | 'reset'",
          "required": false,
          "description": "",
          "options": [
            "button",
            "submit",
            "reset"
          ],
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "iconPosition",
          "type": "'start' | 'end'",
          "required": false,
          "description": "",
          "options": [
            "start",
            "end"
          ],
          "isIcon": true
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "block",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean | { delay?: number }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "href",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "target",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "danger",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "ghost",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "autoInsertSpace",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "classNames",
          "type": "{\n    icon?: string;\n    content?: string;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "styles",
          "type": "{\n    icon?: CSSProperties;\n    content?: CSSProperties;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isPressed",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isActive",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onClick",
          "type": "(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KButtonGroup",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KButtonGroup/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "KSpaceSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "direction",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCheckbox",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KCheckbox/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning",
            "default"
          ],
          "isIcon": false
        },
        {
          "name": "styles",
          "type": "{\n    root?: React.CSSProperties;\n    input?: React.CSSProperties;\n    label?: React.CSSProperties;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "classNames",
          "type": "{\n    root?: string;\n    input?: string;\n    label?: string;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCheckboxGroup",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KCheckbox/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "any[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "any[]",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "[]"
        },
        {
          "name": "options",
          "type": "(string | { label: React.ReactNode; value: any; disabled?: boolean })[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(checkedValues: any[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "name",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "autoFocus",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDivider",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KDivider/index.tsx",
      "props": [
        {
          "name": "type",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "dashed",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "orientation",
          "type": "'left' | 'right' | 'center'",
          "required": false,
          "description": "",
          "options": [
            "left",
            "right",
            "center"
          ],
          "isIcon": false
        },
        {
          "name": "orientationMargin",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "plain",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFlex",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KFlex/index.tsx",
      "props": [
        {
          "name": "vertical",
          "type": "boolean | Partial<Record<Breakpoint, boolean>>",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "wrap",
          "type": "React.CSSProperties['flexWrap']",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "justify",
          "type": "FlexJustify",
          "required": false,
          "description": "",
          "options": [
            "normal",
            "center",
            "start",
            "end",
            "flex-start",
            "flex-end",
            "left",
            "right",
            "space-between",
            "space-around",
            "space-evenly",
            "stretch"
          ],
          "isIcon": false
        },
        {
          "name": "align",
          "type": "FlexAlign",
          "required": false,
          "description": "",
          "options": [
            "normal",
            "center",
            "start",
            "end",
            "flex-start",
            "flex-end",
            "self-start",
            "self-end",
            "baseline",
            "stretch"
          ],
          "isIcon": false
        },
        {
          "name": "flex",
          "type": "React.CSSProperties['flex']",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "gap",
          "type": "React.CSSProperties['gap'] | 'small' | 'middle' | 'large' | Partial<Record<Breakpoint, number | string | 'small' | 'middle' | 'large'>>",
          "required": false,
          "description": "",
          "options": [
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFloatButton",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KFloatButton/index.tsx",
      "props": [
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "onClick",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "tooltip",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "'primary' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "primary",
            "default"
          ],
          "isIcon": false
        },
        {
          "name": "position",
          "type": "{ bottom?: number; right?: number }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCol",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KGrid/KCol.tsx",
      "props": [
        {
          "name": "span",
          "type": "ColSpanType",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "offset",
          "type": "ColSpanType",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "order",
          "type": "ColSpanType",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "flex",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "xs",
          "type": "ColSpanType | ColSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "sm",
          "type": "ColSpanType | ColSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "md",
          "type": "ColSpanType | ColSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "lg",
          "type": "ColSpanType | ColSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "xl",
          "type": "ColSpanType | ColSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "xxl",
          "type": "ColSpanType | ColSize",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "_khorHorizontalGutter",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KRow",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KGrid/KRow.tsx",
      "props": [
        {
          "name": "gutter",
          "type": "Gutter | [Gutter, Gutter]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "align",
          "type": "'top' | 'middle' | 'bottom' | 'stretch'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "middle",
            "bottom",
            "stretch"
          ],
          "isIcon": false
        },
        {
          "name": "justify",
          "type": "'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'",
          "required": false,
          "description": "",
          "options": [
            "start",
            "end",
            "center",
            "space-around",
            "space-between",
            "space-evenly"
          ],
          "isIcon": false
        },
        {
          "name": "wrap",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KIcon",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KIcon/index.tsx",
      "props": [
        {
          "name": "name",
          "type": "KIconName",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'",
          "required": false,
          "description": "",
          "options": [
            "xs",
            "sm",
            "md",
            "lg",
            "xl",
            "xxl"
          ],
          "isIcon": false,
          "defaultValue": "'md'"
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "'currentColor'"
        },
        {
          "name": "strokeWidth",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KImage",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KImage/index.tsx",
      "props": [
        {
          "name": "src",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "alt",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "width",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "height",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "fallback",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "preview",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KInputOTP",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KInput/OTP.tsx",
      "props": [
        {
          "name": "length",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "6"
        },
        {
          "name": "value",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "''"
        },
        {
          "name": "onChange",
          "type": "(value: string) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onComplete",
          "type": "(value: string) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "mask",
          "type": "string | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning",
            "default"
          ],
          "isIcon": false,
          "defaultValue": "'default'"
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false,
          "defaultValue": "'md'"
        }
      ]
    },
    {
      "name": "KInputSearch",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KInput/Search.tsx",
      "props": [
        {
          "name": "enterButton",
          "type": "boolean | React.ReactNode",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onSearch",
          "type": "(value: string, event?: React.MouseEvent | React.KeyboardEvent) => void",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTextArea",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KInput/TextArea.tsx",
      "props": [
        {
          "name": "error",
          "type": "string | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "warning",
          "type": "string | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning",
            "default"
          ],
          "isIcon": false
        },
        {
          "name": "block",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "variant",
          "type": "'outlined' | 'borderless' | 'filled'",
          "required": false,
          "description": "",
          "options": [
            "outlined",
            "borderless",
            "filled"
          ],
          "isIcon": false
        },
        {
          "name": "autoSize",
          "type": "boolean | { minRows?: number; maxRows?: number }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showCount",
          "type": "boolean | { formatter: (info: { value: string; count: number; maxLength?: number }) => React.ReactNode }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KInput",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KInput/index.tsx",
      "props": [
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "error",
          "type": "string | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "warning",
          "type": "string | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "helperText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning",
            "default"
          ],
          "isIcon": false
        },
        {
          "name": "block",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "variant",
          "type": "'outlined' | 'borderless' | 'filled'",
          "required": false,
          "description": "",
          "options": [
            "outlined",
            "borderless",
            "filled"
          ],
          "isIcon": false
        },
        {
          "name": "prefix",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "suffix",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean | { clearIcon?: React.ReactNode }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showCount",
          "type": "boolean | { formatter: (info: { value: string; count: number; maxLength?: number }) => React.ReactNode }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "addonBefore",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "addonAfter",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onClear",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KInputPassword",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KInput/index.tsx",
      "props": [
        {
          "name": "visibilityToggle",
          "type": "boolean | { visible?: boolean; onVisibleChange?: (visible: boolean) => void }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "iconRender",
          "type": "(visible: boolean) => React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        }
      ]
    },
    {
      "name": "KLabel",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KLabel/index.tsx",
      "props": [
        {
          "name": "required",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "info",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KProgress",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KProgress/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "max",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showInfo",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "type",
          "type": "'line' | 'circle'",
          "required": false,
          "description": "",
          "options": [
            "line",
            "circle"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'active' | 'success' | 'exception'",
          "required": false,
          "description": "",
          "options": [
            "active",
            "success",
            "exception"
          ],
          "isIcon": false
        },
        {
          "name": "strokeColor",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "steps",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KQRCode",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KQRCode/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "bgColor",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KRadioGroupOptions",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KRadio/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KRadioGroup",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KRadio/index.tsx",
      "props": [
        {
          "name": "options",
          "type": "Array<KRadioGroupOptions | string>",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "direction",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "optionType",
          "type": "'default' | 'button'",
          "required": false,
          "description": "",
          "options": [
            "default",
            "button"
          ],
          "isIcon": false
        },
        {
          "name": "buttonStyle",
          "type": "'outline' | 'solid'",
          "required": false,
          "description": "",
          "options": [
            "outline",
            "solid"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg",
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "name",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KRadio",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KRadio/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "autoFocus",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KScrollArea",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KScrollArea/index.tsx",
      "props": [
        {
          "name": "orientation",
          "type": "'vertical' | 'horizontal' | 'both'",
          "required": false,
          "description": "",
          "options": [
            "vertical",
            "horizontal",
            "both"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KScrollBar",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KScrollBar/index.tsx",
      "props": [
        {
          "name": "orientation",
          "type": "'vertical' | 'horizontal' | 'both'",
          "required": false,
          "description": "",
          "options": [
            "vertical",
            "horizontal",
            "both"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'small' | 'middle' | 'large'",
          "required": false,
          "description": "",
          "options": [
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "autoHide",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSkeleton",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KSkeleton/index.tsx",
      "props": [
        {
          "name": "lines",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "circle",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "width",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "height",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "variant",
          "type": "'text' | 'circular' | 'rectangular'",
          "required": false,
          "description": "",
          "options": [
            "text",
            "circular",
            "rectangular"
          ],
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "active",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSliderTooltip",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KSlider/index.tsx",
      "props": [
        {
          "name": "formatter",
          "type": "(value: number) => React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "open",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'top' | 'bottom' | 'left' | 'right'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "bottom",
            "left",
            "right"
          ],
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSlider",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KSlider/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "number | number[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "number | number[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "min",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "max",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "step",
          "type": "number | null",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: number | number[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onAfterChange",
          "type": "(value: number | number[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showValue",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "range",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "vertical",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "reverse",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "tooltip",
          "type": "KSliderTooltipProps | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "marks",
          "type": "Record<number, React.ReactNode | { style?: React.CSSProperties; label: React.ReactNode }>",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isPressed",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSpace",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KSpace/index.tsx",
      "props": [
        {
          "name": "direction",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "KSpaceSize | [KSpaceSize, KSpaceSize]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "align",
          "type": "KSpaceAlign",
          "required": false,
          "description": "",
          "options": [
            "start",
            "end",
            "center",
            "baseline"
          ],
          "isIcon": false
        },
        {
          "name": "wrap",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "split",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSpin",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KSpin/index.tsx",
      "props": [
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg' | 'xl'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg",
            "xl"
          ],
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "fullscreen",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSwitch",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KSwitch/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'small' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "small",
            "default"
          ],
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "checkedChildren",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "unCheckedChildren",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTag",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KTag/index.tsx",
      "props": [
        {
          "name": "color",
          "type": "KTagColor | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'success' | 'processing' | 'error' | 'warning' | 'default' | 'teal'",
          "required": false,
          "description": "",
          "options": [
            "success",
            "processing",
            "error",
            "warning",
            "default",
            "teal"
          ],
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "bordered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "closable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "closeIcon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "onClose",
          "type": "(e: React.MouseEvent) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "styles",
          "type": "{\n    root?: React.CSSProperties;\n    closeIcon?: React.CSSProperties;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "classNames",
          "type": "{\n    root?: string;\n    closeIcon?: string;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCheckableTag",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KTag/index.tsx",
      "props": [
        {
          "name": "checked",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(checked: boolean) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "BaseTypography",
      "category": "atom",
      "path": "/src/app/components/design-system/atoms/KText/index.tsx",
      "props": [
        {
          "name": "type",
          "type": "TypographyType",
          "required": false,
          "description": "",
          "options": [
            "secondary",
            "success",
            "warning",
            "danger"
          ],
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "strong",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "italic",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "underline",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "delete",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "mark",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "code",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "keyboard",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "ellipsis",
          "type": "boolean | { rows?: number; expandable?: boolean; suffix?: string }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "copyable",
          "type": "boolean | { text?: string; onCopy?: () => void }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "editable",
          "type": "boolean | { onChange?: (val: string) => void; onStart?: () => void; onEnd?: () => void }",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAccordionItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KAccordion/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "extra",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAccordion",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KAccordion/index.tsx",
      "props": [
        {
          "name": "items",
          "type": "KAccordionItem[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "'single' | 'multiple'",
          "required": false,
          "description": "",
          "options": [
            "single",
            "multiple"
          ],
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "string | string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string | string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onValueChange",
          "type": "(value: any) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "collapsible",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "variant",
          "type": "'ghost' | 'bordered'",
          "required": false,
          "description": "",
          "options": [
            "ghost",
            "bordered"
          ],
          "isIcon": false
        },
        {
          "name": "accordion",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "ghost",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "defaultActiveKey",
          "type": "string | string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "expandIconPosition",
          "type": "'start' | 'end'",
          "required": false,
          "description": "",
          "options": [
            "start",
            "end"
          ],
          "isIcon": true
        },
        {
          "name": "showArrow",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAnchorLink",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KAnchor/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "href",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "KAnchorLink[]",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAnchor",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KAnchor/index.tsx",
      "props": [
        {
          "name": "items",
          "type": "KAnchorLink[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "offsetTop",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "bounds",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onClick",
          "type": "(e: React.MouseEvent<HTMLElement>, link: KAnchorLink) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "affix",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAutocompleteOption",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KAutocomplete/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAutocomplete",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KAutocomplete/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: string) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onSelect",
          "type": "(option: KAutocompleteOption) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "options",
          "type": "KAutocompleteOption[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBreadcrumbItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KBreadcrumb/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "href",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "onClick",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "menu",
          "type": "KDropdownMenuProps['menu']",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KBreadcrumb",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KBreadcrumb/index.tsx",
      "props": [
        {
          "name": "items",
          "type": "KBreadcrumbItem[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "separator",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCascaderOption",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KCascader/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "string | number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "KCascaderOption[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCascader",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KCascader/index.tsx",
      "props": [
        {
          "name": "options",
          "type": "KCascaderOption[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "(string | number)[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: (string | number)[], selectedOptions: KCascaderOption[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "changeOnSelect",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showSearch",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KColorPicker",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KColorPicker/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(color: string) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showText",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDateRange",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDatePicker/index.tsx",
      "props": [
        {
          "name": "from",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "to",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDatePicker",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDatePicker/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(date: Date | undefined) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "minDate",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "maxDate",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg",
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "picker",
          "type": "'date' | 'week' | 'month' | 'quarter' | 'year'",
          "required": false,
          "description": "",
          "options": [
            "date",
            "week",
            "month",
            "quarter",
            "year"
          ],
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showTime",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDateRangePicker",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDatePicker/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "KDateRange",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(range: KDateRange | undefined) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "[string, string]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg",
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showTime",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "presets",
          "type": "{ label: string; value: [Date, Date] }[]",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDescriptionItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDescriptions/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "span",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDescriptions",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDescriptions/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "items",
          "type": "KDescriptionItem[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "column",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "bordered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "layout",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "colon",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDividerExtended",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDividerExtended/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "orientation",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "dashed",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDropdownMenu",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KDropdownMenu/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactElement",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "menu",
          "type": "{\n    items: any[];\n    onClick?: (info: { key: string }) => void;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight'",
          "required": false,
          "description": "",
          "options": [
            "bottomLeft",
            "bottomCenter",
            "bottomRight",
            "topLeft",
            "topCenter",
            "topRight"
          ],
          "isIcon": false,
          "defaultValue": "'bottomLeft'"
        },
        {
          "name": "trigger",
          "type": "('click' | 'hover' | 'contextMenu')[]",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "['click']"
        },
        {
          "name": "arrow",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false,
          "defaultValue": "false"
        }
      ]
    },
    {
      "name": "KEmptyState",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KEmptyState/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "image",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "actionLabel",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onAction",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "actions",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "variant",
          "type": "'default' | 'simple'",
          "required": false,
          "description": "",
          "options": [
            "default",
            "simple"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFormField",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KFormField/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "required",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "error",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "hint",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "id",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KInputNumber",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KInputNumber/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: number | undefined) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "min",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "max",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "step",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "precision",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "readOnly",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "fullWidth",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "controls",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KListItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KList/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string | number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "avatar",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "extra",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onClick",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KList",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KList/index.tsx",
      "props": [
        {
          "name": "items",
          "type": "KListItem[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "bordered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "header",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "footer",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "emptyText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KNavItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KNavItem/index.tsx",
      "props": [
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "label",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "active",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "badge",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "collapsed",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KNotification",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KNotification/index.tsx",
      "props": [
        {
          "name": "message",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "KNotificationType",
          "required": false,
          "description": "",
          "options": [
            "success",
            "error",
            "info",
            "warning"
          ],
          "isIcon": false
        },
        {
          "name": "duration",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
          "required": false,
          "description": "",
          "options": [
            "top-right",
            "bottom-right",
            "top-left",
            "bottom-left"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "opacity",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KPopconfirm",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KPopconfirm/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onConfirm",
          "type": "() => void | Promise<void>",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onCancel",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "okText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "cancelText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactElement",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "okType",
          "type": "'primary' | 'danger' | 'warning' | 'default'",
          "required": false,
          "description": "",
          "options": [
            "primary",
            "danger",
            "warning",
            "default"
          ],
          "isIcon": false
        },
        {
          "name": "showCancel",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KPopover",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KPopover/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactElement",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "content",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "bottom",
            "left",
            "right",
            "topLeft",
            "topRight",
            "bottomLeft",
            "bottomRight",
            "leftTop",
            "leftBottom",
            "rightTop",
            "rightBottom"
          ],
          "isIcon": false,
          "defaultValue": "'top'"
        },
        {
          "name": "trigger",
          "type": "'hover' | 'focus' | 'click'",
          "required": false,
          "description": "",
          "options": [
            "hover",
            "focus",
            "click"
          ],
          "isIcon": false
        },
        {
          "name": "arrow",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false,
          "defaultValue": "true"
        }
      ]
    },
    {
      "name": "KResult",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KResult/index.tsx",
      "props": [
        {
          "name": "status",
          "type": "KResultStatus",
          "required": true,
          "description": "",
          "options": [
            "success",
            "error",
            "info",
            "warning",
            "404",
            "403",
            "500"
          ],
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "subTitle",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "extra",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSegmentedOption",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSegmented/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string | number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        }
      ]
    },
    {
      "name": "KSegmented",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSegmented/index.tsx",
      "props": [
        {
          "name": "options",
          "type": "(string | number | KSegmentedOption)[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: string | number) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "block",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSelectAdvancedOption",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSelectAdvanced/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSelectAdvanced",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSelectAdvanced/index.tsx",
      "props": [
        {
          "name": "options",
          "type": "KSelectAdvancedOption[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string | string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: any) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "mode",
          "type": "'single' | 'multiple' | 'tags'",
          "required": false,
          "description": "",
          "options": [
            "single",
            "multiple",
            "tags"
          ],
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSelectField",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSelectField/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "options",
          "type": "{ label: string; value: string; disabled?: boolean }[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string | string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "string | string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: any) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "error",
          "type": "string | boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "hint",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "required",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'small' | 'middle' | 'large'",
          "required": false,
          "description": "",
          "options": [
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showSearch",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'error' | 'warning'",
          "required": false,
          "description": "",
          "options": [
            "error",
            "warning"
          ],
          "isIcon": false
        },
        {
          "name": "mode",
          "type": "'single' | 'multiple' | 'tags'",
          "required": false,
          "description": "",
          "options": [
            "single",
            "multiple",
            "tags"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KStatCard",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KStatCard/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "string | number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "change",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "changeLabel",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "sparkData",
          "type": "number[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KStatistic",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KStatistic/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "value",
          "type": "number | string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "precision",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "prefix",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "suffix",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "trend",
          "type": "'up' | 'down'",
          "required": false,
          "description": "",
          "options": [
            "up",
            "down"
          ],
          "isIcon": false
        },
        {
          "name": "trendValue",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "decimalSeparator",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "groupSeparator",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "valueStyle",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "formatter",
          "type": "(value: number | string) => React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KStepItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSteps/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "status",
          "type": "'wait' | 'process' | 'finish' | 'error'",
          "required": false,
          "description": "",
          "options": [
            "wait",
            "process",
            "finish",
            "error"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSteps",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KSteps/index.tsx",
      "props": [
        {
          "name": "current",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "direction",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "items",
          "type": "KStepItem[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(current: number) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'default' | 'small'",
          "required": false,
          "description": "",
          "options": [
            "default",
            "small"
          ],
          "isIcon": false
        },
        {
          "name": "progressDot",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "labelPlacement",
          "type": "'horizontal' | 'vertical'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical"
          ],
          "isIcon": false
        },
        {
          "name": "percent",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTimePicker",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KTimePicker/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(time: string) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "format",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "use12Hours",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "allowClear",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTimelineItem",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KTimeline/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "dot",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "'primary' | 'navy' | 'success' | 'error' | 'warning' | 'info' | string",
          "required": false,
          "description": "",
          "options": [
            "primary",
            "navy",
            "success",
            "error",
            "warning",
            "info"
          ],
          "isIcon": false
        },
        {
          "name": "position",
          "type": "'left' | 'right'",
          "required": false,
          "description": "",
          "options": [
            "left",
            "right"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTimeline",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KTimeline/index.tsx",
      "props": [
        {
          "name": "items",
          "type": "KTimelineItem[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "reverse",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "pending",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "mode",
          "type": "'left' | 'alternate' | 'right'",
          "required": false,
          "description": "",
          "options": [
            "left",
            "alternate",
            "right"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTooltip",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KTooltip/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "content",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactElement",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'top' | 'bottom' | 'left' | 'right'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "bottom",
            "left",
            "right"
          ],
          "isIcon": false,
          "defaultValue": "'top'"
        },
        {
          "name": "trigger",
          "type": "'hover' | 'focus' | 'click'",
          "required": false,
          "description": "",
          "options": [
            "hover",
            "focus",
            "click"
          ],
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTrialBar",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KTrialBar/index.tsx",
      "props": [
        {
          "name": "daysLeft",
          "type": "number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "totalDays",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "14"
        },
        {
          "name": "planName",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "'Free Trial'"
        },
        {
          "name": "onUpgrade",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "''"
        }
      ]
    },
    {
      "name": "KUserCell",
      "category": "molecule",
      "path": "/src/app/components/design-system/molecules/KUserCell/index.tsx",
      "props": [
        {
          "name": "name",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "email",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "avatar",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "role",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'online' | 'offline' | 'busy' | 'away'",
          "required": false,
          "description": "",
          "options": [
            "online",
            "offline",
            "busy",
            "away"
          ],
          "isIcon": false
        },
        {
          "name": "onClick",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KAppLayout",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KAppLayout/index.tsx",
      "props": [
        {
          "name": "sidebar",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "header",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "footer",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "collapsed",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "fixedHeader",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "fixedSidebar",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCalendar",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KCalendar/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "defaultValue",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "mode",
          "type": "'month' | 'year'",
          "required": false,
          "description": "",
          "options": [
            "month",
            "year"
          ],
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(date: Date) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onPanelChange",
          "type": "(date: Date, mode: 'month' | 'year') => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "dateCellRender",
          "type": "(date: Date) => React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "monthCellRender",
          "type": "(date: Date) => React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCardSection",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KCardSection/index.tsx",
      "props": [
        {
          "name": "id",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "subtitle",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "extra",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "noPadding",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KCarousel",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KCarousel/index.tsx",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "autoplay",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "autoplayDelay",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "dots",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "arrows",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "loop",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTableDateCell",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KDataTable/KTableDateCell.tsx",
      "props": [
        {
          "name": "value",
          "type": "Date | string | number | null | undefined",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "dateFormat",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "fallbackText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KDataTable",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KDataTable/index.tsx",
      "props": [
        {
          "name": "data",
          "type": "TData[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "columns",
          "type": "ColumnDef<TData, any>[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "searchable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "searchPlaceholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "actions",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "rowKey",
          "type": "string | ((row: TData) => string)",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "pageSize",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "pageSizes",
          "type": "number[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "pagination",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onRowClick",
          "type": "(record: TData) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "enableRowSelection",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "enableColumnToggle",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "enableExport",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "stickyHeader",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "maxHeight",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "scroll",
          "type": "{ x?: number | string; y?: number | string }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "virtual",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "rowExpansion",
          "type": "{\n    expandedRowRender: (record: TData) => React.ReactNode;\n    defaultExpandAllRows?: boolean;\n  }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'small' | 'middle' | 'large'",
          "required": false,
          "description": "",
          "options": [
            "small",
            "middle",
            "large"
          ],
          "isIcon": false
        },
        {
          "name": "onSelectionChange",
          "type": "(selectedRows: TData[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isFocused",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "hasError",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "emptyContent",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "errorContent",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KEditor",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KEditor/types.ts",
      "props": [
        {
          "name": "initialValue",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(value: string) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "minHeight",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "maxHeight",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "readonly",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "toolbarPosition",
          "type": "'top' | 'bottom'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "bottom"
          ],
          "isIcon": false
        },
        {
          "name": "showToolbar",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KForm",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KForm/index.tsx",
      "props": [
        {
          "name": "methods",
          "type": "ReturnType<typeof useForm<TFieldValues>>",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onSubmit",
          "type": "(data: TFieldValues) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "layout",
          "type": "'horizontal' | 'vertical' | 'inline'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical",
            "inline"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFormItem",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KForm/index.tsx",
      "props": [
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "name",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "required",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "help",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "error",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "layout",
          "type": "'horizontal' | 'vertical' | 'inline'",
          "required": false,
          "description": "",
          "options": [
            "horizontal",
            "vertical",
            "inline"
          ],
          "isIcon": false
        },
        {
          "name": "labelCol",
          "type": "{ span: number }",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "wrapperCol",
          "type": "{ span: number }",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFormListField",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KFormList/index.tsx",
      "props": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "name",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "index",
          "type": "number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isFirst",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "isLast",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFormList",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KFormList/index.tsx",
      "props": [
        {
          "name": "name",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "addText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "maxItems",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "minItems",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "renderItem",
          "type": "(field: KFormListField, index: number, operations: { remove: (index: number) => void; move: (from: number, to: number) => void }) => React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KFormWizard",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KFormWizard/index.tsx",
      "props": [
        {
          "name": "steps",
          "type": "WizardStep[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onComplete",
          "type": "(data: any) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onCancel",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KGantt",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KGantt/index.tsx",
      "props": [
        {
          "name": "tasks",
          "type": "KGanttTask[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "startDate",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "startOfDay(new Date())"
        },
        {
          "name": "endDate",
          "type": "Date",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "endOfDay(new Date())"
        },
        {
          "name": "initialZoom",
          "type": "KGanttZoomLevel",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "'hours'"
        },
        {
          "name": "initialInterval",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "15"
        },
        {
          "name": "config",
          "type": "Partial<KGanttConfig>",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onTaskChange",
          "type": "(taskId: string, updates: Partial<KGanttTask>) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false,
          "defaultValue": "''"
        }
      ]
    },
    {
      "name": "KGanttTask",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KGantt/types.ts",
      "props": [
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "subtitle",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "avatar",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "start",
          "type": "Date",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "end",
          "type": "Date",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "progress",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info' | string",
          "required": false,
          "description": "",
          "options": [
            "primary",
            "secondary",
            "accent",
            "success",
            "error",
            "warning",
            "info"
          ],
          "isIcon": false
        },
        {
          "name": "tags",
          "type": "string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "dependencies",
          "type": "string[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "dependency",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "data",
          "type": "any",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KGanttConfig",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KGantt/types.ts",
      "props": [
        {
          "name": "rowHeight",
          "type": "number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "sidebarWidth",
          "type": "number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "intervalMinutes",
          "type": "number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showProgress",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showDependencies",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "enableDrag",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "enableResize",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KLoginForm",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KLoginForm/index.tsx",
      "props": [
        {
          "name": "onFinish",
          "type": "(values: any) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "loading",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KModalConfirm",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KModal/index.tsx",
      "props": [
        {
          "name": "open",
          "type": "boolean",
          "required": true,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onClose",
          "type": "() => void",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "content",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "KModalConfirmType",
          "required": false,
          "description": "",
          "options": [
            "confirm",
            "info",
            "success",
            "warning",
            "error"
          ],
          "isIcon": false
        },
        {
          "name": "onOk",
          "type": "() => void | Promise<void>",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "okText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "cancelText",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showCancel",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "width",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KPagination",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KPagination/index.tsx",
      "props": [
        {
          "name": "current",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "pageSize",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "total",
          "type": "number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(page: number, pageSize: number) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showSizeChanger",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSheet",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KSheet/index.tsx",
      "props": [
        {
          "name": "placement",
          "type": "'top' | 'right' | 'bottom' | 'left'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "right",
            "bottom",
            "left"
          ],
          "isIcon": false
        },
        {
          "name": "width",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "height",
          "type": "string | number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "extra",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onClose",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "isHovered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KSparklineCell",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KSparklineCell/index.tsx",
      "props": [
        {
          "name": "data",
          "type": "number[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "color",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "width",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "height",
          "type": "number | string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTabItem",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KTabs/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "label",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTabs",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KTabs/index.tsx",
      "props": [
        {
          "name": "items",
          "type": "KTabItem[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "'line' | 'card' | 'pill'",
          "required": false,
          "description": "",
          "options": [
            "line",
            "card",
            "pill"
          ],
          "isIcon": false
        },
        {
          "name": "centered",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "size",
          "type": "'sm' | 'md' | 'lg'",
          "required": false,
          "description": "",
          "options": [
            "sm",
            "md",
            "lg"
          ],
          "isIcon": false
        },
        {
          "name": "tabBarExtraContent",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KToast",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KToast/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "content",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "KToastType",
          "required": false,
          "description": "",
          "options": [
            "success",
            "error",
            "info",
            "warning"
          ],
          "isIcon": false
        },
        {
          "name": "duration",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTourStep",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KTour/index.tsx",
      "props": [
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "description",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "target",
          "type": "string | HTMLElement | null",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "placement",
          "type": "'top' | 'bottom' | 'left' | 'right' | 'center'",
          "required": false,
          "description": "",
          "options": [
            "top",
            "bottom",
            "left",
            "right",
            "center"
          ],
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTour",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KTour/index.tsx",
      "props": [
        {
          "name": "steps",
          "type": "KTourStep[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "open",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onClose",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onFinish",
          "type": "() => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KTreeNode",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KTree/index.tsx",
      "props": [
        {
          "name": "key",
          "type": "string | number",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "title",
          "type": "React.ReactNode",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "KTreeNode[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "selectable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "checkable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "icon",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": true
        }
      ]
    },
    {
      "name": "KTree",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KTree/index.tsx",
      "props": [
        {
          "name": "data",
          "type": "KTreeNode[]",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "checkable",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "checkedKeys",
          "type": "(string | number)[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onCheck",
          "type": "(keys: (string | number)[], info: { checked: boolean; node: KTreeNode }) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "selectedKeys",
          "type": "(string | number)[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onSelect",
          "type": "(keys: (string | number)[], info: { node: KTreeNode }) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "expandedKeys",
          "type": "(string | number)[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onExpand",
          "type": "(keys: (string | number)[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "showLine",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "showIcon",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": true
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KUploadFile",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KUpload/index.tsx",
      "props": [
        {
          "name": "uid",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "name",
          "type": "string",
          "required": true,
          "description": "",
          "isIcon": false
        },
        {
          "name": "size",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "type",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "status",
          "type": "'uploading' | 'done' | 'error' | 'removed'",
          "required": false,
          "description": "",
          "options": [
            "uploading",
            "done",
            "error",
            "removed"
          ],
          "isIcon": false
        },
        {
          "name": "url",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "thumbUrl",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "percent",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "originFileObj",
          "type": "File",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    },
    {
      "name": "KUpload",
      "category": "organism",
      "path": "/src/app/components/design-system/organisms/KUpload/index.tsx",
      "props": [
        {
          "name": "value",
          "type": "KUploadFile[]",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "onChange",
          "type": "(files: KUploadFile[]) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "listType",
          "type": "'text' | 'picture' | 'picture-card'",
          "required": false,
          "description": "",
          "options": [
            "text",
            "picture",
            "picture-card"
          ],
          "isIcon": false
        },
        {
          "name": "multiple",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "accept",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "maxSize",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "maxFiles",
          "type": "number",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "description": "",
          "options": [
            "true",
            "false"
          ],
          "isIcon": false
        },
        {
          "name": "onPreview",
          "type": "(file: KUploadFile) => void",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "style",
          "type": "React.CSSProperties",
          "required": false,
          "description": "",
          "isIcon": false
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "required": false,
          "description": "",
          "isIcon": false
        }
      ]
    }
  ]
};