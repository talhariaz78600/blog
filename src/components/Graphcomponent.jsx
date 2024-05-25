// import { selecteUsers, selectAllActiveUsers } from '../../Store/authSlice';
import { selectActiveUsers } from "../StoreRedux/UserSlice";

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const GraphComponent = () => {
  //   const storeUsers = useSelector(selectuserSuccess);
  const storeAllActiveUsers = useSelector(selectActiveUsers);
  const [chartData, setChartData] = useState();
  console.log(storeAllActiveUsers)


  useEffect(() => {
    const prepareChartData = () => {
      const dateCounts = {};
      storeAllActiveUsers.forEach(user => {
        const loginDate = new Date(user.lastLogin).toLocaleDateString();
        dateCounts[loginDate] = (dateCounts[loginDate] || 0) + 1;
      });

      const chartDataN = {
        labels: Object.keys(dateCounts),
        datasets: [
          {
            label: 'Last week active users ',
            data: Object.values(dateCounts),
            backgroundColor: '#588157',
          },
        ],
      };
      setChartData(chartDataN);
    };

    if (storeAllActiveUsers && storeAllActiveUsers.length > 0) {
      prepareChartData();
    }
  }, []);

  //   console.log(storeUsers);
  //   console.log(storeAllActiveUsers);
  //   console.log(chartData);

  return (
    <div>
      <h2>User Data Graph</h2>
      {chartData && (
        <div>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default GraphComponent;
