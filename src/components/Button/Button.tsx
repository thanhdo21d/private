import { Link } from 'react-router-dom'
import clsxm from '~/utils/clsxm'

interface ButtonProps {
  styleClass?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
  href?: string
}

export const Button = ({
  styleClass,
  children,
  onClick,
  disabled,
  type = 'button',
  loading,
  icon,
  size,
  variant,
  href
}: ButtonProps) => {
  const classNames =
    'flex items-center justify-center gap-2.5 rounded-md py-3 px-6 bg-primary text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'

  switch (size) {
    case 'sm':
      classNames.concat(' text-sm')
      break
    case 'md':
      classNames.concat(' text-base')
      break
    case 'lg':
      classNames.concat(' text-lg')
      break
    default:
      classNames.concat(' text-base')
      break
  }

  switch (variant) {
    case 'primary':
      classNames.concat(' bg-primary hover:bg-primary-dark')
      break
    case 'secondary':
      classNames.concat(' bg-secondary hover:bg-secondary-dark')
      break
    case 'danger':
      classNames.concat(' bg-danger hover:bg-danger-dark')
      break
    case 'warning':
      classNames.concat(' bg-warning hover:bg-warning-dark')
      break
    case 'success':
      classNames.concat(' bg-success hover:bg-success-dark')
      break
    default:
      classNames.concat(' bg-primary hover:bg-primary-dark')
      break
  }

  if (href) {
    return (
      <Link
        to={href}
        className={clsxm(
          `flex items-center justify-center gap-2.5 rounded-md py-3 px-6 bg-primary text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10`,
          { 'pointer-events-none opacity-50': disabled },
          styleClass,
          classNames,
          { 'bg-opacity-90': disabled }
        )}
      >
        {icon && icon}
        {children}
      </Link>
    )
  }

  return (
    <button
      className={clsxm(
        `flex items-center justify-center gap-2.5 rounded-md py-3 px-6 bg-primary text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10`,
        { 'pointer-events-none opacity-50': disabled },
        styleClass,
        classNames,
        { 'bg-opacity-90': disabled },
        { 'cursor-not-allowed': disabled },
        { 'cursor-wait bg-opacity-90': loading }
      )}
    >
      {icon && icon}
      {children}
    </button>
  )
}
