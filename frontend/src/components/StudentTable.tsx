import React from 'react';
import { StudentStat } from '../api';

interface Props {
    data: StudentStat[];
}

const StudentTable: React.FC<Props> = ({ data }) => {
    return (
        <div className="table-section">
            <h2>Student Performance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Courses Enrolled</th>
                        <th>Assessments Attempted</th>
                        <th>Avg Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((s) => (
                        <tr key={s.userId}>
                            <td>{s.fullName}</td>
                            <td>{s.email}</td>
                            <td>{s.coursesEnrolled}</td>
                            <td>{s.assessmentsAttempted}</td>
                            <td>{s.avgScore ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;
