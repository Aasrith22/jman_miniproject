import React from 'react';
import { AssessmentStat } from '../../api';

interface Props {
    data: AssessmentStat[];
}

const AssessmentTable: React.FC<Props> = ({ data }) => {
    return (
        <div className="table-section">
            <h2>Assessment Performance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Assessment</th>
                        <th>Module</th>
                        <th>Course</th>
                        <th>Total Marks</th>
                        <th>Attempts</th>
                        <th>Avg Score</th>
                        <th>Highest</th>
                        <th>Lowest</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((a) => (
                        <tr key={a.assessmentId}>
                            <td>{a.title}</td>
                            <td>{a.moduleName}</td>
                            <td>{a.courseName}</td>
                            <td>{a.totalMarks ?? '—'}</td>
                            <td>{a.totalAttempts}</td>
                            <td>{a.avgScore ?? '—'}</td>
                            <td>{a.highestScore ?? '—'}</td>
                            <td>{a.lowestScore ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssessmentTable;
