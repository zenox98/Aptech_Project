import { Outlet } from "react-router";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LeftSideTab from "../../components/LeftSideTab/LeftSideTab";


export default function HomeLayout() {
  return (
    <div className="w-full h-screen flex flex-wrap">
      
      {/* Left Side Tab */}
      <div className="border border-black w-2/12 h-full flex flex-wrap justify-center items-center">
        <LeftSideTab />
      </div>

      {/* Header and Main Body */}
      <div className="boder border-black w-10/12 h-full flex flex-wrap justify-start flex-col">
        <div className="border border-black w-full h-1/12 flex flex-wrap flex-row">
          <Header />
        </div>

        <div className="border border-black w-full h-10/12 flex flex-wrap justify-center items-center">
          <Outlet />
        </div>

        <div className="border border-black w-full h-1/12">
          <Footer />
        </div>
      </div>
      
    </div>
  )
}
