"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import "./CertificateGrid.css";

const CertificateGrid = ({ certificates }) => {
  const scrollRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false });

  // ── Keyboard close ────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setExpanded(null);
    };
    if (expanded !== null) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  // ── Drag-to-scroll ────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = {
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const el = scrollRef.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - dragState.current.startX) * 1.5;
      if (Math.abs(walk) > 5) dragState.current.moved = true;
      el.scrollLeft = dragState.current.scrollLeft - walk;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ── Scroll arrows ─────────────────────────────────
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  const handleCardClick = (idx) => {
    if (dragState.current.moved) return;
    setExpanded(idx);
  };

  return (
    <>
      <div className="cert-grid-wrapper">
        {/* Left arrow */}
        <button
          className="cert-scroll-btn cert-scroll-btn--left"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="cert-grid-scroll"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className={`cert-card${cert.vertical ? " cert-card--vertical" : ""}`}
              onClick={() => handleCardClick(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${cert.title} certificate`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpanded(idx);
                }
              }}
            >
              <div className="cert-card__image-wrap">
                <img
                  className="cert-card__image"
                  src={cert.key}
                  alt={`${cert.title} certificate from ${cert.issuer}`}
                  draggable="false"
                  loading="lazy"
                />
              </div>
              <div className="cert-card__overlay" />
              <div className="cert-card__zoom-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <div className="cert-card__info">
                <span className="cert-card__title">{cert.title}</span>
                <span className="cert-card__issuer">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          className="cert-scroll-btn cert-scroll-btn--right"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Expanded Preview (full certificate view) ──── */}
      {expanded !== null && (
        <>
          <div
            className="cert-expanded-backdrop cert-expanded-backdrop--visible"
            onClick={() => setExpanded(null)}
          />
          <div
            className={`cert-expanded-container cert-expanded-container--visible${
              certificates[expanded].vertical ? " cert-expanded-container--vertical" : ""
            }`}
            onClick={() => setExpanded(null)}
          >
            <div
              className="cert-expanded-card"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={certificates[expanded].key}
                alt={`${certificates[expanded].title} certificate`}
              />
              <div className="cert-expanded-info">
                <div>
                  <div className="cert-expanded-title">
                    {certificates[expanded].title}
                  </div>
                  <div className="cert-expanded-issuer">
                    {certificates[expanded].issuer}
                  </div>
                </div>
                <button
                  className="cert-expanded-close"
                  onClick={() => setExpanded(null)}
                  aria-label="Close preview"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CertificateGrid;
