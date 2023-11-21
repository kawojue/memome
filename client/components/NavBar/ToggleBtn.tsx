export function ToggleButton({ setOpened, opened }: ToggleProps) {
  return (
    <div className="block md:hidden">
      <button
        onClick={() => setOpened(!opened)}
        className={`flex flex-col gap-1 focus:outline-none focus:ring focus:ring-[#FF9400] p-1 rounded-md`}
      >
        <div
          className={`rounded-full h-1 bg-[#FF9400] transition-all duration-300 ${opened ? "w-7 rotate-45 translate-y-2" : "w-4 rotate-0"
            }`}
        />
        <div
          className={`rounded-full h-1 bg-[#FF9400] w-7 transition-all duration-300  ${opened ? "opacity-0" : "opacity-100"
            }`}
        />
        <div
          className={`rounded-full h-1 bg-[#FF9400] self-end transition-all duration-300 ${opened ? "w-7 -rotate-45 -translate-y-2" : "w-4 rotate-0"
            }`}
        />
      </button>
    </div>
  )
}
