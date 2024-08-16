import { useState, useEffect } from 'react';
// import { Line, Pie, Bar } from 'react-chartjs-2';
// import { Chart, registerables } from 'chart.js';
 import { Icon } from "@iconify/react";
 import { Link } from "react-router-dom";


// Chart.register(...registerables);

 const Dashboard = () => {


  const [data, setData] = useState({
    institutions: null,
    students: null,
    agents: null,
    faculties: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:4600/api/institutions/sum'),
          fetch('http://localhost:4600/api/students/sum'),
          fetch('http://localhost:4600/api/agents/sum'),
          fetch('http://localhost:4600/api/faculties/sum'),
        ]);

        const dataArr = await Promise.all(responses.map((response) => response.json()));

        setData({
          institutions: dataArr[0][0]["COUNT(*)"],
          students: dataArr[1][0]["COUNT(*)"],
          agents: dataArr[2][0]["COUNT(*)"],
          faculties: dataArr[3][0]["COUNT(*)"],
        });
      } catch (error) {
        console.error('Error fetching the data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  if (loading) {
    return <div className='mx-auto '>
        <div className='flex flex-wrap mb-24 '>

        <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
         <div className="animate-pulse flex flex-col space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
  </div>

  <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
         <div className="animate-pulse flex flex-col space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
  </div>
  <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
         <div className="animate-pulse flex flex-col space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
  </div>
  <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
         <div className="animate-pulse flex flex-col space-x-4">
    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
  </div>

  </div>

{/*   
         <div className="animate-pulse flex flex-col  space-x-4">
    
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
      <div className="h-2 bg-slate-700 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div> */}
  
         
    </div>;
    
  }

  return (

    <div>
       <div className='flex flex-wrap border border-primary'>
    <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
    <Link to="/users" className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 duration-300 hover:text-white hover:bg-primary text-primary relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="border hover:border-white text-5xl  text-primary bg-cyan-100 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                    <Icon icon="ph:student-bold" />
                    </div>
                    <h6 className="text-sm  font-semibold">Total d&apos;étudiants</h6>
                    <p className="mt-2 mb-4 text-4xl ">{data.students}</p>
                  </div>
      </Link>
              </div>
              <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
                <div className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 duration-300 hover:text-white hover:bg-primary text-primary relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="border hover:border-white text-5xl  text-yellow-300  bg-yellow-100 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                    <Icon icon="mage:user-fill" />
                    </div>
                    <h6 className="text-sm  font-semibold">Total Agent</h6>
                    <p className="mt-2 mb-4 text-4xl ">{data.agents}</p>
                    

                  </div>
                </div>
              </div>
              <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
                <div className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 duration-300 hover:text-white hover:bg-primary text-primary relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="border hover:border-white text-5xl text-green-300 bg-green-100 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                    <Icon icon="bxs:school" />
                    </div>
                    <h6 className="text-sm  font-semibold">Total Universités</h6>
                    <p className="mt-2 mb-4 text-4xl ">{data.institutions}</p>
                    
                  </div>
                </div>
              </div>

              <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
                <div className="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-80 duration-300 hover:text-white hover:bg-primary text-primary relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="border hover:border-white text-5xl  text-orange-500 bg-orange-200 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full ">
                    <Icon icon="mingcute:department-line" />
                    </div>
                    <h6 className="text-sm  font-semibold">Total des faculté</h6>
                    <p className="mt-2 mb-4 text-4xl ">{data.faculties}</p>
                    

                  </div>
                </div>
              </div>


              </div> 
   
    </div>
  );
};

export default Dashboard;
