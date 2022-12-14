import { Menu, Transition } from '@headlessui/react'
import {AiFillCaretDown, AiOutlineSearch} from 'react-icons/ai'
import { Fragment } from 'react'

const Header = () => {
  const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'My Books', href: '#', current: false },
    { name: 'Browse', href: '#', current: false ,
      submenu:[{
        name: 'Sub 1', href: '#', current: false
      }, {
        name: 'Sub 2', href: '#', current: false
      }, {
        name: 'Sub 3', href: '#', current: false
      }, {
        name: 'Sub 4', href: '#', current: false
      }]
    },
    { name: 'Community', href: '#', current: false ,
      submenu:[{
        name: 'Sub 1', href: '#', current: false
      }, {
        name: 'Sub 2', href: '#', current: false
      }, {
        name: 'Sub 3', href: '#', current: false
      }, {
        name: 'Sub 4', href: '#', current: false
      }]
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (
    <nav className="bg-[#f4f1ea] w-full min-h-[50px]">
      <div className="max-w-7xl mx-auto h-[50px]">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start h-[50px]">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="hidden h-8 w-auto lg:inline-block align-middle"
              src="../assets/images/logo.png"
              alt="Goodreads"
            />
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <ul className="flex min-h-[50px] items-center">
              {navigation.map((item) => (
                !item.submenu ? (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-[#382110] text-white' : 'text-gray-300 hover:bg-[#382110] hover:text-white text-[#382110]',
                        'px-3 py-2 font-medium h-[50px] flex items-center text-sm'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </li>
                ) : (
                  <li key={item.name}>
                    <Menu>
                      <Menu.Button className="text-gray-300 hover:bg-[#382110] hover:text-white text-[#382110] px-3 py-2 font-medium h-[50px] flex items-center text-sm ui-open:bg-[#382110] ui-open:text-white">
                        {item.name}
                        <AiFillCaretDown />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute top-[60px] w-56 divide-y divide-gray-100 bg-white shadow-lg focus:outline-none">
                          {item.submenu.map((subItem) => (
                            <Menu.Item key={subItem.name}>
                              {({ active }) => (
                                <a
                                  className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  href={subItem.href}
                                >
                                  {subItem.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                )
              ))}
            </ul>
          </div>
          <div className="flex-1 flex px-2 lg:ml-6">
            <div className="max-w-lg w-full lg:max-w-xs flex items-center">
              <label htmlFor="search" className="sr-only">Search </label>
              <form methode="get" action="#" className="relative z-50 w-full">
                <button type="submit" id="searchSubmit" className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineSearch />
                </button>
                <input type="text" name="s" id="s" className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-md leading-5 bg-white text-gray-300 placeholder-gray-400 shadow-sm border-[1px] border-[] focus:outline-none focus:shadow-lg focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out" placeholder="Search books"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
