import * as React from "react"
import { cn } from "./utils"

export interface AffixProps {
  children: React.ReactNode
  offsetTop?: number
  offsetBottom?: number
  target?: () => HTMLElement | Window | null
  onChange?: (affixed?: boolean) => void
  className?: string
}

export function Affix({
  children,
  offsetTop,
  offsetBottom,
  target,
  onChange,
  className,
}: AffixProps) {
  const [affixed, setAffixed] = React.useState(false)
  const placeholderRef = React.useRef<HTMLDivElement>(null)
  const fixedNodeRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const getTarget = () => {
      return target ? target() : window
    }

    const updatePosition = () => {
      if (!placeholderRef.current || !fixedNodeRef.current) return

      const targetNode = getTarget()
      if (!targetNode) return

      const placeholderRect = placeholderRef.current.getBoundingClientRect()
      
      let newAffixed = false

      if (offsetTop !== undefined) {
        newAffixed = placeholderRect.top <= offsetTop
      } else if (offsetBottom !== undefined) {
        const windowHeight = window.innerHeight
        newAffixed = placeholderRect.bottom >= windowHeight - offsetBottom
      }

      if (newAffixed !== affixed) {
        setAffixed(newAffixed)
        onChange?.(newAffixed)
      }
    }

    const targetNode = getTarget()
    if (!targetNode) return

    updatePosition()

    targetNode.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)

    return () => {
      targetNode.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [offsetTop, offsetBottom, target, affixed, onChange])

  const getStyle = (): React.CSSProperties => {
    if (!affixed || !placeholderRef.current) return {}

    const placeholderRect = placeholderRef.current.getBoundingClientRect()

    if (offsetTop !== undefined) {
      return {
        position: 'fixed',
        top: offsetTop,
        left: placeholderRect.left,
        width: placeholderRect.width,
      }
    }

    if (offsetBottom !== undefined) {
      return {
        position: 'fixed',
        bottom: offsetBottom,
        left: placeholderRect.left,
        width: placeholderRect.width,
      }
    }

    return {}
  }

  return (
    <>
      <div ref={placeholderRef} style={{ width: '100%' }}>
        {!affixed && children}
      </div>
      {affixed && (
        <div
          ref={fixedNodeRef}
          style={getStyle()}
          className={cn(className)}
        >
          {children}
        </div>
      )}
    </>
  )
}
