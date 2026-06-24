import React, { useState } from 'react';

export default function Attendance({ trainers, batches, attendance, setAttendance }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBatch, setSelectedBatch] = useState(batches[0]?.id || '');

  const batchTrainers = trainers.filter(t => t.batchId === selectedBatch);

  const markAttendance = (trainerId, status) => {
    const newRecord = {
      id: Date.now(),
      trainerId,
      batchId: selectedBatch,
      date: selectedDate,
      status
    };
    const filtered = attendance.filter(a =>
     !(a.trainerId === trainerId && a.date === selectedDate)
    );
    setAttendance([...filtered, newRecord]);
  };

  const getStatus = (trainerId) => {
    const record = attendance.find(a => a.trainerId === trainerId && a.date === selectedDate);
    return record?.status || 'Not Marked';
  };

  // Attendance Percentage Calculation - Question 2 ku mukkiyam
  const getPercentage = (trainerId) => {
    const trainerRecords = attendance.filter(a => a.trainerId === trainerId);
    if (trainerRecords.length === 0) return 0;
    const presentCount = trainerRecords.filter(a => a.status === 'Present').length;
    return Math.round((presentCount / trainerRecords.length) * 100);
  };

  return (
    <div className="p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Mark Attendance</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-4 mb-6">
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <select
            value={selectedBatch}
            onChange={e => setSelectedBatch(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trainer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batchTrainers.map((trainer) => (
              <tr key={trainer.id}>
                <td className="px-6 py-4 font-medium">{trainer.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    getStatus(trainer.id) === 'Present'? 'bg-green-100 text-green-800' :
                    getStatus(trainer.id) === 'Absent'? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getStatus(trainer.id)}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-blue-600">{getPercentage(trainer.id)}%</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => markAttendance(trainer.id, 'Present')}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Present
                  </button>
                  <button
                    onClick={() => markAttendance(trainer.id, 'Absent')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Absent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}