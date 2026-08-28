"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import './Lanyard.css';

export default function Lanyard() {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft, smooth springs for pendulum-like physics return
  const springX = useSpring(x, { stiffness: 90, damping: 15, mass: 1.2 });
  const springY = useSpring(y, { stiffness: 90, damping: 15, mass: 1.2 });

  // Dynamic tilt based on drag position and momentum
  const rotateX = useTransform(springY, [-300, 300], [25, -25]);
  const rotateY = useTransform(springX, [-300, 300], [-25, 25]);
  const rotateZ = useTransform(springX, [-300, 300], [-18, 18]);

  // Dynamic SVG elastic cord calculations
  const [cordPath, setCordPath] = useState("M 125 0 Q 125 45 125 90");

  useEffect(() => {
    const unsubscribeX = springX.on('change', (currX) => {
      const currY = springY.get();
      const targetX = 125 + currX;
      const targetY = 90 + currY;
      const controlX = 125 + currX * 0.45;
      const controlY = 45 + currY * 0.25;
      setCordPath(`M 125 0 Q ${controlX} ${controlY} ${targetX} ${targetY}`);
    });

    return () => unsubscribeX();
  }, [springX, springY]);

  // Holographic glare tracking
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

    const glareX = ((clientX - rect.left) / rect.width) * 100;
    const glareY = ((clientY - rect.top) / rect.height) * 100;
    setGlare({ x: glareX, y: glareY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Smoothly and slowly animate back to resting position (0, 0)
    animate(x, 0, {
      type: "spring",
      stiffness: 70,
      damping: 14,
      mass: 1.4,
    });
    animate(y, 0, {
      type: "spring",
      stiffness: 70,
      damping: 14,
      mass: 1.4,
    });
  };

  return (
    <div className="lanyard-wrapper">
      <div className="lanyard-css-card-container">
        {/* Elastic Lanyard SVG Ribbon that stretches on drag */}
        <svg className="lanyard-svg-cord" viewBox="0 0 250 500">
          <defs>
            <linearGradient id="cordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="cordGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6366f1" floodOpacity="0.5" />
            </filter>
          </defs>
          <path
            d={cordPath}
            fill="none"
            stroke="url(#cordGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#cordGlow)"
          />
          {/* Decorative cord pattern */}
          <path
            d={cordPath}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>

        {/* Anchor point at the top */}
        <div className="lanyard-anchor-point" />

        {/* Draggable 3D Holographic ID Card */}
        <motion.div
          drag
          dragSnapToOrigin={true}
          dragElastic={0.25}
          dragTransition={{
            bounceStiffness: 70,
            bounceDamping: 14,
            power: 0.1,
          }}
          style={{
            x,
            y,
            rotateX,
            rotateY,
            rotateZ,
            transformPerspective: 1000,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMove}
          whileDrag={{ scale: 1.06, cursor: "grabbing" }}
          whileHover={{ scale: 1.02 }}
          className={`lanyard-draggable-wrapper ${isDragging ? 'is-dragging' : ''}`}
        >
          {/* Metallic Clip */}
          <div className="lanyard-css-clip-ring" />
          <div className="lanyard-css-clip" />

          {/* Card Body */}
          <div
            ref={cardRef}
            className={`lanyard-css-card ${isHovered || isDragging ? 'lanyard-css-card--hovered' : ''}`}
          >
            {/* Dynamic Glare */}
            <div
              className="lanyard-css-card-glare"
              style={{
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(99, 102, 241, 0.5) 0%, rgba(6, 182, 212, 0.25) 40%, transparent 70%)`,
                opacity: isHovered || isDragging ? 1 : 0.3,
              }}
            />

            {/* Hologram scanlines */}
            <div className="lanyard-css-hologram-lines" />

            {/* Header */}
            <div className="lanyard-css-header">
              <span className="lanyard-css-chip" />
              <span className="lanyard-css-title">SECURITY CLEARANCE</span>
              <span className="lanyard-css-status-dot" />
            </div>

            {/* Photo */}
            <div className="lanyard-css-photo-wrapper">
              <div className="lanyard-css-photo-corner tl" />
              <div className="lanyard-css-photo-corner tr" />
              <div className="lanyard-css-photo-corner bl" />
              <div className="lanyard-css-photo-corner br" />
              <img
                src="/Vagish.dev/assets/memoji.webp"
                alt="Vagish N Kora"
                className="lanyard-css-photo"
                draggable="false"
                onError={(e) => {
                  e.currentTarget.src = "/Vagish.dev/assets/favicon.webp";
                }}
              />
            </div>

            {/* Name & Title */}
            <div className="lanyard-css-name">Vagish N Kora</div>
            <div className="lanyard-css-subtitle">ACM TECH CO-HEAD // CYBER ENG</div>

            {/* Details Table */}
            <div className="lanyard-css-details">
              <div className="lanyard-css-row">
                <span className="lanyard-css-label">DOB:</span>
                <span className="lanyard-css-val">29 OCT 2003</span>
              </div>
              <div className="lanyard-css-row">
                <span className="lanyard-css-label">ORG:</span>
                <span className="lanyard-css-val">NMAMIT // ACM</span>
              </div>
              <div className="lanyard-css-row">
                <span className="lanyard-css-label">ROLE:</span>
                <span className="lanyard-css-val text-cyan-400">ACM TECH CO-HEAD</span>
              </div>
              <div className="lanyard-css-row">
                <span className="lanyard-css-label">CLEARANCE:</span>
                <span className="lanyard-css-val text-cyan-400">LEVEL 5 // ALPHA</span>
              </div>
            </div>

            {/* Barcode */}
            <div className="lanyard-css-barcode-wrapper">
              <div className="lanyard-css-barcode" />
              <span className="lanyard-css-barcode-num">#8492-VK-2024-X99</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
