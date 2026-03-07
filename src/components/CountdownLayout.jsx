import { useState, useEffect } from "react";
import { useIntersectionActive } from "../hooks/useIntersectionActive";
import CountdownCard from "./CountdownCard";

function getPositionClass(index, activeIndex) {
  const diff = index - activeIndex;
  if (diff === 0) return "is-active";
  if (diff === -1) return "is-above";
  if (diff === 1) return "is-below-1";
  if (diff === 2) return "is-below-2";
  if (diff >= 3) return "is-below-3";
  return "is-above"; // far above
}

function ScrollDots({ total, activeIndex }) {
  return (
    <div
      style={{
        position: "fixed",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        zIndex: 50,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === activeIndex ? "8px" : "5px",
            height: i === activeIndex ? "8px" : "5px",
            borderRadius: "50%",
            background: i === activeIndex ? "var(--indigo)" : "var(--border)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

export default function CountdownLayout({ countdowns, onEdit, onDelete }) {
  const { activeIndex, setRef } = useIntersectionActive(countdowns.length);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (isMobile) {
    return (
      <MobileLayout
        countdowns={countdowns}
        activeIndex={activeIndex}
        setRef={setRef}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 61px)" }}>
      {/* LEFT: Sticky Stacked Deck */}
      <div
        style={{
          position: "sticky",
          top: "61px",
          width: "50%",
          height: "calc(100vh - 61px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "400px",
            height: "320px",
          }}
        >
          {countdowns.map((countdown, index) => (
            <CountdownCard
              key={countdown.id}
              countdown={countdown}
              positionClass={getPositionClass(index, activeIndex)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Scroll Track */}
      <div style={{ width: "50%", padding: "0 40px" }}>
        {countdowns.map((countdown, index) => (
          <section
            key={countdown.id}
            ref={(el) => setRef(el, index)}
            data-section-index={index}
            style={{
              minHeight: "calc(100vh - 61px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 0",
            }}
          >
            <ScrollTrackItem
              countdown={countdown}
              isActive={index === activeIndex}
            />
          </section>
        ))}
      </div>

      {countdowns.length > 1 && (
        <ScrollDots total={countdowns.length} activeIndex={activeIndex} />
      )}
    </div>
  );
}

/* ── MOBILE LAYOUT ── */
function MobileLayout({ countdowns, activeIndex, setRef, onEdit, onDelete }) {
  // Compact card deck — fixed at top below header
  const CARD_HEIGHT = 230;

  return (
    <div>
      {/* Sticky compact card deck */}
      <div
        style={{
          position: "sticky",
          top: "61px",
          zIndex: 40,
          background: "var(--bg)",
          padding: "16px 20px 24px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            position: "relative",
            height: `${CARD_HEIGHT}px`,
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          {countdowns.map((countdown, index) => (
            <CountdownCard
              key={countdown.id}
              countdown={countdown}
              positionClass={getPositionClass(index, activeIndex)}
              onEdit={onEdit}
              onDelete={onDelete}
              compact
            />
          ))}
        </div>
      </div>

      {/* Scrollable sections */}
      <div>
        {countdowns.map((countdown, index) => (
          <section
            key={countdown.id}
            ref={(el) => setRef(el, index)}
            data-section-index={index}
            style={{
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "40px 24px",
            }}
          >
            <MobileScrollItem
              countdown={countdown}
              isActive={index === activeIndex}
            />
          </section>
        ))}
      </div>
    </div>
  );
}

function MobileScrollItem({ countdown, isActive }) {
  return (
    <div
      style={{
        opacity: isActive ? 1 : 0.4,
        transform: isActive ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "26px",
          fontWeight: 700,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom: "8px",
          lineHeight: 1.2,
        }}
      >
        {countdown.emoji && (
          <span style={{ marginRight: "8px" }}>{countdown.emoji}</span>
        )}
        {countdown.name}
      </div>
      {countdown.description && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--ink-2)",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          {countdown.description}
        </p>
      )}
      <div
        style={{
          marginTop: "12px",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          color: "var(--ink-3)",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>↓</span>
        <span>scroll for next</span>
      </div>
    </div>
  );
}

function ScrollTrackItem({ countdown, isActive }) {
  return (
    <div
      style={{
        opacity: isActive ? 1 : 0.45,
        transform: isActive ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom: "8px",
          lineHeight: 1.2,
        }}
      >
        {countdown.emoji && (
          <span style={{ marginRight: "8px" }}>{countdown.emoji}</span>
        )}
        {countdown.name}
      </div>
      {countdown.description && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--ink-2)",
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: "320px",
          }}
        >
          {countdown.description}
        </p>
      )}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--ink-3)",
          fontWeight: 500,
        }}
      >
        <span>↓</span>
        <span>scroll for next</span>
      </div>
    </div>
  );
}
