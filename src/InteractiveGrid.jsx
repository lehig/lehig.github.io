import React, { useRef, useEffect } from 'react';

export default function InteractiveGrid() {
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

        // Initial position in top right
        let mouse = { x: width * 0.8, y: height * 0.2 };
        let targetMouse = { x: width * 0.8, y: height * 0.2 };

        const handleMouseMove = (e) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            // Drift back to top right when mouse leaves
            targetMouse.x = width * 0.8;
            targetMouse.y = height * 0.2;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        let animationFrameId;
        const size = 50; // Spacing of the grid lines

        const render = () => {
            // Fluid easing interpolation
            mouse.x += (targetMouse.x - mouse.x) * 0.08;
            mouse.y += (targetMouse.y - mouse.y) * 0.08;

            ctx.clearRect(0, 0, width, height);

            // Define grid area: fading bounds. 
            // Amorphous means no sharp box; it gradients away.
            const startX = Math.max(0, width * 0.3); // Starts fading in around left third
            const endX = width + 100;
            const startY = -100;
            const endY = height * 0.8; // Fades out before the bottom

            const maxDist = 700; // Radius of cursor influence in pixels

            ctx.lineWidth = 1.5;

            // === DRAW VERTICAL LINES ===
            for (let x = Math.floor(startX / size) * size; x <= endX; x += size) {
                const dx = x - mouse.x;
                const dist = Math.abs(dx);

                let offsetX = 0;
                if (dist < maxDist) {
                    // Shift the entire line based on horizontal distance
                    const force = Math.pow((maxDist - dist) / maxDist, 2.5);
                    offsetX = (dx > 0 ? 1 : -1) * force * 70;
                }

                ctx.beginPath();
                ctx.moveTo(x + offsetX, startY);
                ctx.lineTo(x + offsetX, endY);

                // Alpha interpolation for the left/right "amorphous" fade
                const alphaX = Math.pow(Math.max(0, (x - startX) / (endX - startX)), 1.5);
                const gradient = ctx.createLinearGradient(0, startY, 0, endY);
                gradient.addColorStop(0, `rgba(16, 185, 129, ${alphaX * 1.0})`);
                gradient.addColorStop(0.4, `rgba(16, 185, 129, ${alphaX * 0.8})`);
                gradient.addColorStop(1, `rgba(16, 185, 129, 0)`);

                ctx.strokeStyle = gradient;
                ctx.stroke();
            }

            // === DRAW HORIZONTAL LINES ===
            for (let y = Math.floor(startY / size) * size; y <= endY; y += size) {
                const dy = y - mouse.y;
                const dist = Math.abs(dy);

                let offsetY = 0;
                if (dist < maxDist) {
                    // Shift the entire line based on vertical distance
                    const force = Math.pow((maxDist - dist) / maxDist, 2.5);
                    offsetY = (dy > 0 ? 1 : -1) * force * 70;
                }

                ctx.beginPath();
                ctx.moveTo(startX, y + offsetY);
                ctx.lineTo(endX, y + offsetY);

                // Alpha interpolation for the top/bottom "amorphous" fade
                const alphaY = Math.pow(Math.max(0, 1 - (y - startY) / (endY - startY)), 1.5);
                const gradient = ctx.createLinearGradient(startX, 0, endX, 0);
                gradient.addColorStop(0, `rgba(16, 185, 129, 0)`);
                gradient.addColorStop(0.6, `rgba(16, 185, 129, ${alphaY * 0.8})`);
                gradient.addColorStop(1, `rgba(16, 185, 129, ${alphaY * 1.0})`);

                ctx.strokeStyle = gradient;
                ctx.stroke();
            }

            // Subtly paint a glowing aura at the exact mouse coordinate for visual fidelity
            const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxDist * 0.6);
            glow.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
            glow.addColorStop(1, 'rgba(16, 185, 129, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, width, height);

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
            className="amorphous-interactive-grid"
        />
    );
}
