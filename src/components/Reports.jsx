import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Reports({ trainers, attendance }) {
  // Trainer-wise % calculate panrom
  const reportData = trainers.map(trainer => {
    const trainerRecords = attendance.filter(a => a.trainerId === trainer.id);
    const presentCount = trainerRecords.filter(a => a.status === 'Present').length;
    const total = trainerRecords.length;
    const percentage = total === 0? 0 : Math.round((presentCount / total) * 100);
    return {
      name: trainer.name,
      present: presentCount,
      total: total,
      percentage: percentage
    };
  });

  // Chart Data
  const chartData = {
    labels: reportData.map(d => d.name),
    datasets: [
      {
        label: 'Attendance %',
        data: reportData.map(d => d.percentage),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Trainer Attendance Percentage' },
    },
    scales: { y: { beginAtZero: true, max: 100 } }
  };

  // CSV Export Function - Question 3 ku mukkiyam
  const exportToCSV = () => {
    const headers = 'Trainer Name,Present Days,Total Days,Attendance %\n';
    const rows = reportData.map(d => `${d.name},${d.present},${d.total},${d.percentage}%`).join('\n');
    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Reports</h2>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Export to CSV
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Bar options={chartOptions} data={chartData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Detailed Report</h3>
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trainer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportData.map((data) => (
              <tr key={data.name}>
                <td className="px-6 py-4 font-medium">{data.name}</td>
                <td className="px-6 py-4">{data.present}</td>
                <td className="px-6 py-4">{data.total}</td>
                <td className="px-6 py-4 font-bold text-blue-600">{data.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}