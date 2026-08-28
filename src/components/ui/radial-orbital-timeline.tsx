"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 220;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "in-progress":
        return "text-cyan-400 bg-cyan-500/10 border-cyan-500/30";
      case "pending":
        return "text-indigo-400 bg-indigo-500/10 border-indigo-500/30";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full min-h-[85vh] flex flex-col items-center justify-center bg-transparent overflow-visible relative py-12"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Pulsing Star Core */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-cyan-500 to-teal-500 animate-pulse flex items-center justify-center z-10 shadow-[0_0_50px_rgba(6,182,212,0.6)]">
            <div className="absolute w-28 h-28 rounded-full border border-cyan-400/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-36 h-36 rounded-full border border-indigo-500/20 animate-ping opacity-40"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>

          {/* Orbital Orbit Ring */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-cyan-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)] pointer-events-none"></div>
          <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-white/5 pointer-events-none"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Pulsing Energy Aura */}
                <div
                  className={`absolute rounded-full -inset-1 pointer-events-none ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(99,102,241,0) 70%)`,
                    width: `${item.energy * 0.6 + 40}px`,
                    height: `${item.energy * 0.6 + 40}px`,
                    left: `-${(item.energy * 0.6 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.6 + 40 - 40) / 2}px`,
                  }}
                ></div>

                {/* Satellite Node Badge */}
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-cyan-500 text-black shadow-[0_0_25px_rgba(6,182,212,0.8)]"
                      : isRelated
                      ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                      : "bg-black/90 text-cyan-400"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-cyan-300 scale-125"
                      : isRelated
                      ? "border-indigo-400 animate-pulse"
                      : "border-cyan-500/40 hover:border-cyan-400"
                  }
                  transition-all duration-300 transform
                `}
                >
                  <Icon size={20} />
                </div>

                {/* Node Title */}
                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-mono font-bold tracking-wider
                  transition-all duration-300 pointer-events-none
                  ${isExpanded ? "text-cyan-400 scale-110" : "text-white/80"}
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Dossier Card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-80 bg-black/95 backdrop-blur-xl border-cyan-500/40 shadow-2xl shadow-cyan-500/20 overflow-visible z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-cyan-400/80"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2.5 py-0.5 text-[10px] font-mono tracking-wider ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETED"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-cyan-400/80">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-white mt-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-gray-300 space-y-3">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                          <span className="flex items-center text-cyan-400">
                            <Zap size={12} className="mr-1 text-cyan-400" />
                            Academic Energy
                          </span>
                          <span className="font-bold text-white">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-400"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="pt-2 border-t border-white/10">
                          <div className="flex items-center mb-2 font-mono text-[10px] text-gray-400 uppercase tracking-wider">
                            <Link size={10} className="mr-1 text-cyan-400" />
                            Connected Pathways
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2.5 py-0 text-[11px] font-mono rounded bg-white/5 border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-300 hover:text-white transition-all cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-1 text-cyan-400"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
