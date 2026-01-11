import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { levels } from './data';
import './WikiPage.css'; // Reusing styles, but we'll clean them up next

const RegionPage: React.FC = () => {
    const { regionId } = useParams<{ regionId: string }>();

    // Filter levels for this region
    const regionLevels = levels
        .filter(level => level.regionId === regionId)
        .sort((a, b) => a.order - b.order);

    if (regionLevels.length === 0) {
        return <div style={{ padding: '20px' }}>Region not found. <Link to="/">Go Home</Link></div>;
    }

    const formatRegionId = (id: string) => {
        return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="wiki-container-simple"> {/* New simple container class */}
            <div style={{ marginBottom: '20px' }}>
                <Link to="/dashboard/topics" style={{ textDecoration: 'none', color: '#0645ad' }}>← Back to Topics</Link>
            </div>

            <h1 className="wiki-title" style={{ borderBottom: '2px solid #3366cc' }}>
                {formatRegionId(regionId || '')}
            </h1>

            {regionLevels.map((level) => (
                <section key={level._id} id={level.levelId} className="wiki-section-simple">

                    <h2 className="wiki-h2" style={{ marginTop: '30px', color: '#3366cc' }}>
                        {level.title}
                    </h2>
                    <hr style={{ borderTop: '1px solid #eaecf0', margin: '10px 0 20px 0' }} />

                    <div className="wiki-body-text">
                        <p>
                            <b>{level.title}</b> represents a vital stage in understanding {formatRegionId(level.regionId)}.
                            This module (Level {level.levelId}) presents a challenge of <b>{level.difficulty}</b> difficulty,
                            designed to be completed within <b>{level.config.timeLimit} seconds</b>.
                        </p>
                        <p>
                            It stands as the {level.order}{getOrdinal(level.order)} pillar in the {formatRegionId(level.regionId)} curriculum.
                            Mastery of this topic ensures a solid foundation for subsequent rights and responsibilities.
                        </p>
                    </div>

                    <div className="wiki-video-frame">
                        {/* Placeholder for video */}
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: '3rem', display: 'block', color: '#fff' }}>▶</span>
                            <span style={{ color: '#fff' }}>Video: {level.title} Documentary</span>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

// Helper for ordinals
function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

export default RegionPage;
