import cn from 'classnames'
import { FC } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import styles from './Button.module.scss'
import { ButtonProps } from './types'

const Button:FC<ButtonProps> = ({
  variant = 'primary',
  size = 'normal',
  loading,
  startIcon,
  endIcon,
  disabled,
  onClick,
  className,
  children,
  title,
  type,
  form,
  loadingText
}) => {
  return (
    <button
      onClick={(...args) => !disabled && onClick && onClick.apply(this, args)}
      className={cn(styles.wrapper, styles[variant], styles[size], {
        [styles.disabled]: disabled || loading,
        [styles.loading]: loading,
      }, className)}
      // disabled={disabled} // causing pointer-events to not trigger
      title={title}
      // used with <form>
      type={type}
      form={form}
    >
      {startIcon && startIcon}
      {!loading ? children : <div className={styles.loadingInner}>
        <AiOutlineLoading />
        <p className={styles.loadingText}>{loadingText || "Loading..."}</p>
      </div>}
      {endIcon && endIcon}
    </button>
  )
}

export default Button
