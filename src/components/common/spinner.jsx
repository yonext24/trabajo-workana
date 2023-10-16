export function Spinner ({ className, ...props }) {
  return <div className={`w-12 h-12 border-2 border-[currentColor] border-solid border-t-0 border-transparent rounded-full inline-block box-border animate-spin ${className}`} {...props}></div>
}
