import NavLink from '@/components/NavLink'
import routes from '../../data/routes.json'

export function LargeLinks() {
  return (
    <div className='hidden md:block'>
      <ul className='flex items-center gap-6'>
        {routes.map((route, index) => (
          <li key={index}>
            <NavLink href={route.route}>
              {({ isActive }) => (
                <div className={`relative text-base font-medium text-center after:content-[''] after:absolute after:bg-[#FF9400]-1 after:h-1 after:left-0 after:-bottom-1 after:-z-10 after:rounded-md hover:after:w-full after:transition-all after:duration-300 ${isActive
                  ? 'after:w-full text-[#FF9400]'
                  : 'hover:text-[#FF9400] after:w-0'
                  }`}>
                  {route.name}
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
