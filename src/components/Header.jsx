import { Menu, Transition } from '@headlessui/react'
import {AiFillCaretDown, AiOutlineSearch} from 'react-icons/ai'
import { Fragment } from 'react'
import { useLocation } from 'react-router'

const Header = () => {
  
  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'My Books', href: '/my-books', current: false },
    { name: 'Browse', href: '#', current: false ,
      submenu:[{
        name: 'Recommendations', href: '/recommendations', current: false
      }, {
        name: 'Choice Awards', href: '/choice-awards', current: false
      }, {
        name: 'New Releases', href: '/new-releases', current: false
      }]
    },
    { name: 'Community', href: '#', current: false ,
      submenu:[{
        name: 'Groups', href: '/groups', current: false
      }, {
        name: 'Quotes', href: '/quotes', current: false
      }, {
        name: 'People', href: '/people', current: false
      }]
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  //write the urls
  const headerlessPages = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
  ];
  
  if(headerlessPages.includes(useLocation().pathname)){
    return (
      <>
      </>
    )
  }
  
  return (
    <nav className="bg-[#f4f1ea] w-full min-h-[50px] fixed">
      <div className="max-w-7xl mx-auto h-[50px]">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start h-[50px]">
          <div className="flex flex-shrink-0 items-center">
            <a href="/" className="w-[160px] h-[35px] hidden lg:inline-block align-middle" style={{backgroundImage: "url(/assets/images/logo.png)", backgroundSize: "160px", backgroundRepeat: "no-repeat"}}>
            </a>
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
                  <Menu as="li" key={item.name}>
                    <Menu.Button className="text-gray-300 hover:bg-[#382110] hover:text-white text-[#382110] px-3 py-2 font-medium h-[50px] flex items-center text-sm">
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
                      <Menu.Items className="absolute top-[50px] w-56 divide-y divide-gray-100 bg-white drop-shadow-lg focus:outline-none">
                        {item.submenu.map((subItem) => (
                          <Menu.Item key={subItem.name}>
                            {({ active }) => (
                              <a
                                className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm hover:underline`}
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
          <div className="ml-6 flex items-center">
            <ul className="flex min-h-[50px] items-center">
              <li>
                <a href="/sign-in" className="text-gray-300 hover:bg-[#382110] hover:text-white text-[#382110]
                px-3 py-2 font-medium h-[50px] flex items-center text-sm">Sign In</a>
              </li>
              <Menu as="li" key="profile-menu">
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="/logo192.png" alt="" />
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
                  <Menu.Items className="absolute mt-2 -ml-20 w-48 rounded-md bg-white py-1 shadow-lg focus:outline-none">
                    <Menu.Item>
                      <a href="" className="block px-4 py-2 text-sm text-gray-700 bg-gray-300">
                        Your Profile
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </ul>
            {/*<div className="relative ml-3">
              <div>
                <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
              </div>
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 bg-gray-100" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
