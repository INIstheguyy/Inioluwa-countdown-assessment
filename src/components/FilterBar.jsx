import { URGENCY_CONFIG } from "../constants/urgency";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "imminent", label: "Imm" },
  { key: "soon", label: "Soon" },
  { key: "upcoming", label: "Up" },
  { key: "distant", label: "Dist" },
  { key: "expired", label: "Pass" },
];

export default function FilterBar({ active, onChange, counts }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 32px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        overflowX: "auto",
      }}
    >
      {FILTERS.map((f) => {
        const isAll = f.key === "all";
        const isActive = active === f.key;
        const color = isAll ? "var(--ink-2)" : URGENCY_CONFIG[f.key].primary;
        const lightBg = isAll
          ? "rgba(0,0,0,0.04)"
          : URGENCY_CONFIG[f.key].light;
        const count = counts[f.key] ?? 0;
        const isEmpty = !isAll && count === 0;

        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: isActive ? 600 : 500,
              letterSpacing: "0.04em",
              padding: "5px 12px",
              borderRadius: "100px",
              border: isActive
                ? `1.5px solid ${color}`
                : "1.5px solid transparent",
              background: isActive ? lightBg : "transparent",
              color: isActive ? color : "var(--ink-3)",
              cursor: isEmpty ? "default" : "pointer",
              opacity: isEmpty ? 0.45 : 1,
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {/* Color dot */}
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: isAll
                  ? isActive
                    ? "var(--ink-2)"
                    : "var(--ink-3)"
                  : URGENCY_CONFIG[f.key].primary,
                opacity: isActive ? 1 : 0.5,
                flexShrink: 0,
              }}
            />

            {f.label}

            {/* Count badge */}
            <span
              style={{
                fontSize: "9px",
                opacity: 0.6,
                fontWeight: 400,
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
