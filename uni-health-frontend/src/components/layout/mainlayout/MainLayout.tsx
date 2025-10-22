import Navigation from "../../common/nav/Navigation"
import Footer from "../../common/nav/Footer"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <div className="mt-25">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout
