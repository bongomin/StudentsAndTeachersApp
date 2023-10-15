import React from 'react';

function TeachersTable() {
    const sampleData = [
        {
            id: 1,
            name: 'John',
            students: [
                { id: 1, name: 'Bongomin', surname: 'Kilama' },
                { id: 2, name: 'Bongomin2', surname: 'Kilama2' },
                { id: 3, name: 'Bongomin', surname: 'Kilama' },
                { id: 4, name: 'Bongomin2', surname: 'Kilama2' }
            ]
        },
        { id: 2, name: 'Sarah', students: [] },
        { id: 3, name: 'Michael', students: [] }
    ];

    return (
        <div className="container mx-auto p-6">
            {sampleData.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <table className="w-full">
                        <thead>
                            <tr className='text-center'>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center border'>
                                <td className="p-2 font-semibold text-gray-900 text-left">{teacher.name}</td>
                                <td className="p-4 space-x-2 text-right">
                                    <button className="px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                        Update
                                    </button>
                                    <button className="px-3 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-lg font-semibold mt-2 mb-2">Associated Students</div>
                    <div className="space-y-2">
                        {teacher.students.length > 0 ? (
                            teacher.students.map((student) => (
                                <div
                                    key={student.id}
                                    className="bg-gray-100 p-4 rounded-lg"
                                >
                                    <div>
                                        <strong>ID:</strong> {student.id}
                                    </div>
                                    <div>
                                        <strong>Name:</strong> {student.name}
                                    </div>
                                    <div>
                                        <strong>Surname:</strong> {student.surname}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No students</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TeachersTable;
