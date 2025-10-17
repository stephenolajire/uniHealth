import {Outlet} from 'react-router-dom'
import Sidebar from '../sidebar/PatientSidebar'

const PatientLayout = () => {
  return (
    <div>
      <div className='flex flex-row w-full'>
        <div className='fixed hidden lg:flex'>
          <Sidebar />
        </div>
        <div className='flex-1 lg:ml-72 lg:mr-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PatientLayout
