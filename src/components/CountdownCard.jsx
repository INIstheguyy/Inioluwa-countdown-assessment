import { useState } from "react";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { URGENCY_CONFIG } from "../constants/urgency";
import {
  getProgressPercent,
  formatRelativePast,
  formatTargetDate,
} from "../utils/timeUtils";

function TimeUnit({ value, label, compact, imminent }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: compact ? "28px" : "36px",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "var(--ink)",
          animation: imminent
            ? "urgency-pulse 1.5s ease-in-out infinite"
            : "none",
        }}
      >
        {padded}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fontWeight: 500,
          color: "var(--ink-3)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginTop: "3px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Divider({ compact }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: compact ? "22px" : "28px",
        fontWeight: 800,
        color: "var(--ink-3)",
        lineHeight: 1,
        marginBottom: compact ? "12px" : "16px",
      }}
    >
      :
    </div>
  );
}

export default function CountdownCard({
  countdown,
  positionClass,
  onEdit,
  onDelete,
  compact = false,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { days, hours, minutes, seconds, isExpired, urgency } =
    useCountdownTimer(countdown.targetDate);
  const config = URGENCY_CONFIG[urgency];
  const progress = getProgressPercent(
    countdown.createdAt,
    countdown.targetDate,
  );

  const cardPadding = compact ? "18px 20px 16px" : "28px";

  return (
    <div
      className={`countdown-card ${positionClass}`}
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--white)",
        borderRadius: compact ? "16px" : "20px",
        padding: cardPadding,
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      {/* Urgency accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: compact ? "18px" : "24px",
          right: compact ? "18px" : "24px",
          height: "3px",
          borderRadius: "0 0 4px 4px",
          background: config.primary,
          opacity: isExpired ? 0.4 : 1,
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: compact ? "12px" : "20px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            {countdown.emoji && (
              <span
                style={{ fontSize: compact ? "16px" : "20px", lineHeight: 1 }}
              >
                {countdown.emoji}
              </span>
            )}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: compact ? "15px" : "18px",
                fontWeight: 700,
                color: isExpired ? "var(--ink-3)" : "var(--ink)",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {countdown.name}
            </h2>
          </div>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "10px",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              color: config.primary,
              background: config.light,
              borderRadius: "100px",
              padding: "2px 8px",
              letterSpacing: "0.03em",
            }}
          >
            {isExpired ? "✓" : "●"} {config.label}
          </span>
        </div>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "5px",
            marginLeft: "10px",
            flexShrink: 0,
          }}
        >
          {!isExpired && (
            <button
              onClick={() => onEdit(countdown)}
              title="Edit"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--ink-3)",
                cursor: "pointer",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.borderColor = "var(--ink-3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-3)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              ✎
            </button>
          )}
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              title="Delete"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--ink-3)",
                cursor: "pointer",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.15s, border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--coral)";
                e.currentTarget.style.borderColor = "var(--coral)";
                e.currentTarget.style.background = "var(--coral-lt)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-3)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg)";
              }}
            >
              ✕
            </button>
          ) : (
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "10px",
                  color: "var(--coral)",
                  fontFamily: "var(--font-mono)",
                  whiteSpace: "nowrap",
                }}
              >
                Sure?
              </span>
              <button
                onClick={() => onDelete(countdown.id)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  border: "none",
                  background: "var(--coral)",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "white",
                  color: "var(--ink-2)",
                  fontSize: "10px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Timer display */}
      {isExpired ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <div style={{ fontSize: compact ? "24px" : "32px" }}>🎉</div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: compact ? "16px" : "22px",
              fontWeight: 700,
              color: "var(--ink-3)",
              letterSpacing: "-0.02em",
            }}
          >
            {countdown.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--expired)",
              fontWeight: 500,
            }}
          >
            {formatRelativePast(countdown.targetDate)}
          </div>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            position: "relative",
          }}
        >
          <TimeUnit
            value={days}
            label="days"
            compact={compact}
            imminent={urgency === "imminent"}
          />
          <Divider compact={compact} />
          <TimeUnit
            value={hours}
            label="hrs"
            compact={compact}
            imminent={urgency === "imminent"}
          />
          <Divider compact={compact} />
          <TimeUnit
            value={minutes}
            label="min"
            compact={compact}
            imminent={urgency === "imminent"}
          />
          <Divider compact={compact} />
          <TimeUnit
            value={seconds}
            label="sec"
            compact={compact}
            imminent={urgency === "imminent"}
          />

          {/* Buzzing alarm for imminent & soon countdowns */}
          {(urgency === "imminent" || urgency === "soon") && (
            <span
              className={
                urgency === "imminent" ? "alarm-icon" : "alarm-icon-soon"
              }
              style={{
                position: "absolute",
                bottom: compact ? "-2px" : "2px",
                right: compact ? "2px" : "6px",
                fontSize: compact ? "18px" : "22px",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: compact ? "32px" : "38px",
                height: compact ? "32px" : "38px",
                background:
                  urgency === "imminent"
                    ? "var(--coral-lt)"
                    : "var(--amber-lt)",
              }}
              title={
                urgency === "imminent"
                  ? "Less than 24 hours!"
                  : "Less than 7 days!"
              }
            >
              🔔
            </span>
          )}
        </div>
      )}

      {/* Progress bar + target date */}
      <div style={{ marginTop: compact ? "10px" : "16px" }}>
        <div
          style={{
            height: "3px",
            background: "var(--border)",
            borderRadius: "100px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: config.primary,
              borderRadius: "100px",
              transition: "width 1s linear",
              opacity: isExpired ? 0.4 : 1,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: "var(--ink-3)",
              fontWeight: 500,
            }}
          >
            {isExpired ? "Was" : "Target"}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              color: isExpired ? "var(--expired)" : "var(--ink-2)",
              fontWeight: 500,
            }}
          >
            {formatTargetDate(countdown.targetDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
