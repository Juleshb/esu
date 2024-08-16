import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HealthcenterListe() {
  const [HealthCentres, setHealthCentres] = useState([]);

  const navigate = useNavigate();

  const handleRowClick = (HealthCentreId) => {
    console.log('Clicked Health Centre ID:', HealthCentreId);
    navigate(`/users/view/${HealthCentreId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4600/api/institutions/provience');
        const data = await response.json();

        if (response.ok) {
          setHealthCentres(data || []);
        } else {
          console.error('Failed to fetch data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form className="flex flex-row flex-wrap items-center">
        <div className="relative flex w-full flex-wrap items-stretch">
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <Icon icon="line-md:search" />
          </span>
          <input
            type="text"
            placeholder="Search here..."
            className="mb-2 px-3 py-3 border border-gray-300 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm outline-none focus:outline-none focus:ring w-full pl-10"
          />
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-sky-100">
            <tr>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Province
              </th>
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Telephone
              </th>
              
            </tr>
          </thead>
          <tbody className="text-xs">
            {HealthCentres.map((HealthCentre) => {
              // Ensure the logoUrl starts with the correct base URL
              const institution_logoUrl = HealthCentre.institution_logoUrl.startsWith('http')
                ? HealthCentre.institution_logoUrl
                : `https://www.esu-identification.net${HealthCentre.institution_logoUrl}`;

              return (
                <tr key={HealthCentre.institution_id} className="hover:bg-gray-100" onClick={() => handleRowClick(HealthCentre.institution_id)}>
                <td className="px-6 py-4 whitespace-no-wrap">
                    <img src={institution_logoUrl} alt={HealthCentre.institution_name} className="h-10 w-10 object-contain" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{HealthCentre.institution_name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{HealthCentre.province_name}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{HealthCentre.institution_tel}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
