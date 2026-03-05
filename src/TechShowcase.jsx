import React, { useRef, useState } from 'react';
import './TechShowcase.css';

const FrontendIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);

const ServerIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
);

const CloudIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
);

const DatabaseIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);

const NetworkIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
);

const SecurityIcon = () => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const skills = [
    { name: 'Frontend & UI', description: 'Building fluid, interactive web applications with React.', icon: <FrontendIcon /> },
    { name: 'Backend Systems', description: 'Developing scalable microservices using Go.', icon: <ServerIcon /> },
    { name: 'Cloud Infrastructure', description: 'Deploying robust serverless architectures on AWS.', icon: <CloudIcon /> },
    { name: 'Network Programming', description: 'Engineering high-performance applications in C# & .NET.', icon: <NetworkIcon /> },
    { name: 'Databases', description: 'Designing optimized schemas with DynamoDB & NoSQL.', icon: <DatabaseIcon /> },
    { name: 'Applied Security', description: 'Implementing robust cryptography and IAM controls.', icon: <SecurityIcon /> },
];

const TiltCard = ({ title, description, icon, index }) => {
    const cardRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for the radial glow tracking
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max tilt up/down
        const rotateY = ((x - centerX) / centerX) * 10;  // Max tilt left/right

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
        // Softly fade out the CSS property
        if (cardRef.current) {
            cardRef.current.style.setProperty('--mouse-x', `-1000px`);
            cardRef.current.style.setProperty('--mouse-y', `-1000px`);
        }
    };

    return (
        <div
            ref={cardRef}
            className="tilt-card-wrapper fade-in-section"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="tilt-card"
                style={{
                    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                    transition: isHovered ? 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
            >
                <div className="tilt-card-content">
                    <div className="tilt-card-icon">{icon}</div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

                {/* The blurry accent glow that trails the card rotation behind the content */}
                <div
                    className="tilt-card-glow"
                    style={{
                        opacity: isHovered ? 0.7 : 0,
                        transform: `translate(${rotation.y * 3}px, ${-rotation.x * 3}px)`
                    }}
                />
            </div>
        </div>
    );
};

export default function TechShowcase() {
    return (
        <section className="panel showcase-panel" aria-label="Technical Arsenal">
            <h2 className="showcase-title">Technical Arsenal</h2>
            <div className="tech-showcase-grid">
                {skills.map((skill, i) => (
                    <TiltCard key={i} index={i} title={skill.name} description={skill.description} icon={skill.icon} />
                ))}
            </div>
        </section>
    );
}
