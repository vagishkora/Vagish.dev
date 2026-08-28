'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import './Dock.css';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, label }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {children}
      <AnimatePresence>
        {label && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={isHovered.get() ? { opacity: 1, y: -10 } : { opacity: 0, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="dock-label"
            style={{ opacity: useTransform(isHovered, [0, 1], [0, 1]) }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DockDivider() {
  return <div className="dock-divider" />;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className="dock-outer"
    >
      <motion.div
        onMouseMove={e => {
          mouseX.set(e.pageX);
          isHovered.set(1);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          isHovered.set(0);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          item.divider ? (
            <DockDivider key={`divider-${index}`} />
          ) : (
            <DockItem
              key={item.label || index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
              label={item.label}
            >
              {item.icon}
            </DockItem>
          )
        ))}
      </motion.div>
    </motion.div>
  );
}
