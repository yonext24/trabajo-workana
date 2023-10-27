import { Link } from 'react-router-dom'

export function Tab({ href, text, isSelected }) {
  return (
    <Link
      to={href}
      className={`py-px px-1 min-w-[100px] text-center border-t-2 border-x-[1px] border-b-2 border-black rounded-t-lg font-semibold  transition-colors
  ${isSelected ? 'bg-azulfondo text-white' : ''}`}
    >
      <span>{text}</span>
    </Link>
  )
}
