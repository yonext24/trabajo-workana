export function SeeAmount({ see, handleChange, currentAmount }) {
  const parsedSee = see ? see : [5, 10, 15, 20, 25]

  return (
    <div className="flex flex-col">
      <span>Ver por página</span>
      <div className="flex gap-0">
        {parsedSee.map(el => (
          <button
            onClick={() => {
              handleChange(el)
            }}
            key={el}
            data-current={el === currentAmount}
            className="data-[current=true]:text-azulfondo hover:underline px-1"
          >
            {el}
          </button>
        ))}
      </div>
    </div>
  )
}
