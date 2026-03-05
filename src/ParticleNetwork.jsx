import React, { useRef, useEffect } from 'react';

export default function ParticleNetwork() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', setSize);

        // Mouse tracking for interactivity
        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Configuration
        // Not too many particles to keep the space clean
        const PARTICLE_COUNT = 50;
        const MAX_DISTANCE = 150;
        const MOUSE_DISTANCE = 100;

        // Create random particles
        const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6, // Slow drifting speed
            vy: (Math.random() - 0.5) * 0.6,
            radius: Math.random() * 2 + 0.5, // 0.5 to 2.5 size
            glowOffset: Math.random() * Math.PI * 2 // Personal phase angle for pulsing glow
        }));

        let animationFrameId;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Update particle positions
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce elegantly off edges so they stay on screen
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            });

            // 1. Draw connections between particles
            ctx.lineWidth = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MAX_DISTANCE) {
                        const opacity = (1 - dist / MAX_DISTANCE) * 0.3; // Very subtle ambient line
                        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // 2. Interactivity to connect and pull to the mouse cursor
            particles.forEach((p) => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_DISTANCE) {
                    // Lines hooking into the user's cursor
                    const opacity = (1 - dist / MOUSE_DISTANCE) * 0.5;
                    ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    // Smoothly pull particles towards cursor to form a web/net
                    const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE;
                    p.x -= dx * force * 0.02;
                    p.y -= dy * force * 0.02;
                }
            });

            // 3. Draw particles directly (Glowing Dots)
            const time = Date.now() * 0.002;
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                // Sine wave pulsing logic based on the individual particle offset
                const pulse = (Math.sin(time + p.glowOffset) + 1) / 2; // Range 0 to 1
                // We ensure minimum opacity is 0.2 and max is 0.9 for varied twinkling effect
                const alpha = 0.2 + (pulse * 0.7);

                ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;

                // Expensive drop-shadow but applied subtly to just the particles for bloom effect
                ctx.shadowBlur = 8;
                ctx.shadowColor = `rgba(16, 185, 129, ${alpha * 0.8})`;
                ctx.fill();

                ctx.shadowBlur = 0; // reset for lines to optimize performance
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none',
                display: 'block'
            }}
            aria-hidden="true"
        />
    );
}
