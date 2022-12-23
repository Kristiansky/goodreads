import { Outlet, Navigate } from 'react-router'
import useIsAdmin from '../Hooks/useIsAdmin'


const PrivateRouteAdmin = () => {
  const {isAdmin, checkingStatus} = useIsAdmin()
  if(checkingStatus){
    return <h3>Loading</h3>
  }
  
  return isAdmin ? <Outlet/> : <Navigate to="/profile" />
}

export default PrivateRouteAdmin
