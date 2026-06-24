import React from 'react';

export default function Dashboard({ trainers, batches, attendance }) {
  const totalTrainers = trainers.length;
  const totalBatches = batches.length;
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today).length;

  const StatCard = ({ title, value, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Trainer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Trainers" value={totalTrainers} color="border-blue-500" />
        <StatCard title="Total Batches" value={totalBatches} color="border-green-500" />
        <StatCard title="Today's Attendance" value={todayAttendance} color="border-purple-500" />
      </div>
    </div>
  );
}