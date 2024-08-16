
import PropTypes from 'prop-types';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const RegistrationChart = ({ data }) => {
  // Process the data to get the number of registrations per day
  const registrationData = data.reduce((acc, curr) => {
    const date = new Date(curr.dateCreation).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(registrationData);
  const counts = Object.values(registrationData);

  // Line chart data
  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Registrations per Day',
        data: counts,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: dates,
    datasets: [
      {
        label: 'Registrations per Day',
        data: counts,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (


  <div className=" bg-white text-primary p-10 mt-5 flex flex-wrap border border-primary">
      
      <div className="p-4 mb-8  pt-6 w-full md:w-1/2 px-4 text-center">
        <h2 className="text-sm  font-semibold">Registrations Over Time</h2>
        <Line data={lineData} />
      </div>
      {/* <div className=" p-4  mb-8 pt-6 w-full md:w-4/12 px-4 text-center"  style={pieChartStyle}>
        <h2 className="text-sm  font-semibold">OAE Result Distribution</h2>
        <Pie className='h-2' data={oaerResultChartData}  />
      </div> */}
      <div className=" p-4  mb-8 pt-6 w-full md:w-1/2 px-4 text-center">
        <h2 className="text-sm  font-semibold">Bar chart</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

// Define prop types for the RegistrationChart component
RegistrationChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    dateCreation: PropTypes.string.isRequired,
  })).isRequired,
};

export default RegistrationChart;
