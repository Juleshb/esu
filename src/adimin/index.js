import { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Icon } from "@iconify/react";
import Navbar from "../components/Nav/nav";
import Sidebar from "../components/Sidebar/Sidebar";
import NewbornsChart from "../components/newbornchat";
import RegistrationChart from './registrationchat';

export default function Admin() {
  const [borns, setBorns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:4600/api/students')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4600/api/students', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response.data); // Log the full response to inspect its structure

      // Adjust this based on the actual structure of your API response
      if (response.data && Array.isArray(response.data.data)) {
        setBorns(response.data.data);
        console.log('Data set to state:', response.data.data); // Confirm the data is being set correctly
        setLoading(false);
      } else if (Array.isArray(response.data)) {
        setBorns(response.data);
        console.log('Data set to state:', response.data); // Confirm the data is being set correctly
        setLoading(false);
      } else {
        console.error('Invalid data format:', response.data);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportToJSON = () => {
    if (!borns || borns.length === 0) {
      console.warn('No data to export');
      return;
    }
    const json = JSON.stringify(borns);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    if (!borns || borns.length === 0) {
      console.warn('No data to export');
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(borns);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };



  if (loading) {
    return <>
    <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        <div className="relative  pt-20"> 
      </div>
    <div className='mx-auto '>
        <div className='flex flex-wrap mb-24 '>

        <div className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center ">
         <div className="animate-pulse flex flex-col space-x-4">
     
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
  </div>
  
  </div>  
    </div>
    </>;
    
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        <div className="relative md:pt-32 pb-10 "></div>
        <div className="px-4 md:px-10 mx-auto w-full m-2 ">
          <p>Export data:</p>
          <div className="text-3xl">
            <button className="p-2" onClick={exportToJSON}>
              <Icon icon="bi:filetype-json" />
            </button>
            <button className="p-2" onClick={exportToExcel}>
              <Icon icon="vscode-icons:file-type-excel" />
            </button>
          </div>
        </div>
        <NewbornsChart />

        <RegistrationChart data={data} />
      </div>
    </>
  );
}
