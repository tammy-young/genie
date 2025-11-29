
export function OutlinedButton({ className, onClick, type, disabled, children }) {
  return (
    <button
      className={`px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform border !text-black dark:!text-white ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className='mb-0 font-semibold'>{children}</span>
    </button>
  )
}

export function FilledButton({ className, onClick, type, disabled, children }) {
  return (
    <button
      className={`px-3 py-2 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !bg-primary !text-white ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className='mb-0 font-semibold'>{children}</span>
    </button>
  )
}