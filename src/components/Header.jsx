import { Menu, Transition } from '@headlessui/react'
import {AiFillCaretDown, AiOutlineSearch} from 'react-icons/ai'
import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import useIsAdmin from '../Hooks/useIsAdmin'

const Header = () => {
  const {isAdmin} = useIsAdmin()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
      setShowUserMenu(true)
    })
  }, [auth])
  
  const navigate = useNavigate()
  const location = useLocation()
  
  function pathMatchRoute(route) {
    if(route === location.pathname){
      return true;
    }
  }
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'My Books', href: '/my-books' },
    { name: 'Browse', href: '#' ,
      submenu:[{
        name: 'Recommendations', href: '/recommendations',
      }, {
        name: 'Choice Awards', href: '/choice-awards',
      }, {
        name: 'New Releases', href: '/new-releases',
      }]
    },
    { name: 'Community', href: '#',
      submenu:[{
        name: 'Groups', href: '/groups',
      }, {
        name: 'Quotes', href: '/quotes',
      }, {
        name: 'People', href: '/people',
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
  
  if(headerlessPages.includes(location.pathname)){
    return (
      <>
      </>
    )
  }
  
  async function signOut(){
    try{
      await auth.signOut()
      navigate("/")
    }catch (e){
      toast.error(e.message)
    }
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
                        pathMatchRoute(item.href) ? 'bg-[#382110] text-white' : 'text-gray-300 hover:bg-[#382110] hover:text-white text-[#382110]',
                        'px-3 py-2 font-medium h-[50px] flex items-center text-sm'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </li>
                ) : (
                  <Menu as="li" key={item.name}>
                    <Menu.Button className={classNames(item.submenu.filter(subItem => pathMatchRoute(subItem.href)).map((subItem) => (pathMatchRoute(subItem.href) && 'bg-[#382110] text-white' )) , 'hover:bg-[#382110] hover:text-white px-3 py-2 font-medium h-[50px] flex items-center text-sm')}>
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
                                className={classNames(
                                  pathMatchRoute(subItem.href) && 'bg-gray-100' ,
                                  'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                )}
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
          {showUserMenu &&
            <div className="ml-6 flex items-center">
              <ul className="flex min-h-[50px] items-center">
                {loggedIn ?
                  <Menu as="li" key="profile-menu">
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="/assets/images/u_60x60.png" alt="user" />
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
                        <Menu.Item>
                          <a href="/profile" className={classNames(pathMatchRoute('/profile') && 'bg-gray-100', 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100')}>
                            Your Profile
                          </a>
                        </Menu.Item>
                        {isAdmin &&
                          <Menu.Item>
                            <a href="/add-book" className={classNames(pathMatchRoute('/add-book') && 'bg-gray-100', 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100')}>
                              Add a book
                            </a>
                          </Menu.Item>
                        }
                        <Menu.Item>
                          <p onClick={signOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Sign out
                          </p>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu> :
                  <li>
                    <a href="/sign-in" className="text-gray-300 hover:bg-[#382110] hover:text-white text-[#382110]
                px-3 py-2 font-medium h-[50px] flex items-center text-sm">Sign In</a>
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Header
