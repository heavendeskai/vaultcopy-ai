
import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
      }
    };

    const handleMouseUp = () => {
      if (outlineRef.current) {
        outlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className={`cursor-dot ${isHovering ? 'cursor-hover-dot' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        ref={outlineRef}
        className={`cursor-outline ${isHovering ? 'cursor-hover-outline' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};
