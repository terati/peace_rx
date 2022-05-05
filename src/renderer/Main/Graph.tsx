import * as React from 'react';
import { faker } from '@faker-js/faker';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        color: 'rgb(255, 255, 255)',
        boxWidth: 20,
        padding: 20,
      },
    },
    title: {
      display: false,
      text: 'Inventory Trends',
      color: 'white',
    },
  },


  scales: {
    x: {
      grid: {
        display: false,
      },
      title: {
        color: 'white',
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }

};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'In',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 1.0)',
    },
    {
      label: 'Out',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 1.0)',
    },
  ],
};

function Graph() {
  return (
    <>
      <Bar options={options} data={data} />
    </>
    
  )
}

export default Graph