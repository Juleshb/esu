import Navbar from "../components/Nav/nav";
import Sidebar from "../components/Sidebar/Sidebar";
import User from '../components/Agent/user'


export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />

        <div className="relative  pt-20"> 
      </div>
        <div className="px-4 md:px-10 mx-auto w-full m-2">
          
         <User/>
         
        </div>
        
       
      </div>
    </>
  );
}
