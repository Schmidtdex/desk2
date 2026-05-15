"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, animate, motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: Props) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [size, setSize] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const translation = useMotionValue(0);

  // Measure the animated div with ResizeObserver (replaces react-use-measure)
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () =>
      setSize(direction === "horizontal" ? el.scrollWidth : el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [direction]);

  useEffect(() => {
    if (size === 0) return;
    let controls: ReturnType<typeof animate> | undefined;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to   = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration *
          Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey(k => k + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls?.stop();
  }, [key, translation, currentDuration, size, gap, isTransitioning, direction, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={`overflow-hidden${className ? ` ${className}` : ""}`}>
      <motion.div
        ref={innerRef}
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
