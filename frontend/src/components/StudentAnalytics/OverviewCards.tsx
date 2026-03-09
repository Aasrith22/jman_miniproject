import React from 'react';
import { OverviewStats } from '../../api';

interface Props {
    data: OverviewStats;
}

const OverviewCards: React.FC<Props> = ({ data }) => {
    const cards = [
        { label: 'Students', value: data.totalStudents, color: '#4f46e5' },
        { label: 'Courses', value: data.totalCourses, color: '#059669' },
        { label: 'Enrollments', value: data.totalEnrollments, color: '#d97706' },
        { label: 'Assessments', value: data.totalAssessments, color: '#dc2626' },
    ];

    return (
        <div className="overview-cards">
            {cards.map((card) => (
                <div key={card.label} className="card" style={{ borderTop: `4px solid ${card.color}` }}>
                    <h3>{card.value}</h3>
                    <p>{card.label}</p>
                </div>
            ))}
        </div>
    );
};

export default OverviewCards;
