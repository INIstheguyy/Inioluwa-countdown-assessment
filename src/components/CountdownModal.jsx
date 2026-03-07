import { useState, useEffect } from "react";

export default function CountdownModal({ mode, initialData, onSave, onClose }) {
  const isEdit = mode === "edit";

  function getInitialDateStr() {
    if (!initialData?.targetDate) return "";
    const d = new Date(initialData.targetDate);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  function getInitialTimeStr() {
    if (!initialData?.targetDate) return "";
    const d = new Date(initialData.targetDate);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  const [name, setName] = useState(initialData?.name || "");
  const [date, setDate] = useState(getInitialDateStr);
  const [time, setTime] = useState(getInitialTimeStr);
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [emoji, setEmoji] = useState(initialData?.emoji || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function buildDate(dateStr, timeStr) {
    // Use local Date constructor — avoids iOS Safari parsing issues with string formats
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = (timeStr || "00:00").split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, 0);
  }

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!date) errs.date = "Date is required";
    // Use errs (local) NOT errors (stale state)
    if (!errs.name && !errs.date) {
      const targetDate = buildDate(date, time);
      if (!targetDate || isNaN(targetDate.getTime())) {
        errs.date = "Invalid date";
      } else if (!isEdit && targetDate <= new Date()) {
        errs.date = "Date must be in the future";
      }
    }
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const targetDate = buildDate(date, time).toISOString();
    onSave({ name, targetDate, description, emoji });
  }

  const QUICK_EMOJIS = [
    "✈️",
    "🎂",
    "🚀",
    "🎓",
    "💍",
    "🏠",
    "🎉",
    "🏋️",
    "📅",
    "🌴",
  ];

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 200,
        padding: "24px 16px",
        overflowY: "auto",
      }}
    >
      <div
        className="modal-box"
        style={{
          background: "var(--white)",
          borderRadius: "20px",
          padding: "28px 28px 24px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "22px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            {isEdit ? "Edit Countdown" : "New Countdown"}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "none",
              background: "var(--bg)",
              color: "var(--ink-3)",
              cursor: "pointer",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Name */}
        <Field label="Event Name *" error={errors.name}>
          <input
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="Trip to Tokyo, Product launch…"
            style={inputStyle(!!errors.name)}
          />
        </Field>

        {/* Date + Time */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Field label="Date *" error={errors.date} style={{ flex: 1 }}>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: "" }));
              }}
              style={inputStyle(!!errors.date)}
            />
          </Field>
          <Field label="Time" style={{ flex: 1 }}>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={inputStyle(false)}
            />
          </Field>
        </div>

        {/* Description */}
        <Field label="Description (optional)">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any notes about this event…"
            style={inputStyle(false)}
          />
        </Field>

        {/* Emoji */}
        <Field label="Emoji (optional)">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="✈️  or pick below"
              style={{ ...inputStyle(false), width: "160px" }}
            />
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {QUICK_EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji((prev) => (prev === em ? "" : em))}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border:
                      emoji === em
                        ? "2px solid var(--indigo)"
                        : "1px solid var(--border)",
                    background: emoji === em ? "var(--indigo-lt)" : "var(--bg)",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
        </Field>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            marginTop: "20px",
            paddingTop: "18px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button type="button" onClick={onClose} style={ghostBtnStyle}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} style={primaryBtnStyle}>
            {isEdit ? "Save Changes" : "Create Countdown"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children, style }) {
  return (
    <div style={{ marginBottom: "18px", ...style }}>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          fontWeight: 600,
          color: "var(--ink-3)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          marginBottom: "4px",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--coral)",
            marginTop: "4px",
          }}
        >
          ⚠ {error}
        </div>
      )}
    </div>
  );
}

// Underline-only input style
const inputStyle = (hasError) => ({
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: `2px solid ${hasError ? "var(--coral)" : "var(--border)"}`,
  borderRadius: "0",
  padding: "8px 2px",
  fontFamily: "var(--font-body)",
  fontSize: "14px",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 0.2s",
});

const ghostBtnStyle = {
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  fontWeight: 500,
  padding: "9px 20px",
  borderRadius: "100px",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--ink-2)",
  cursor: "pointer",
};

const primaryBtnStyle = {
  fontFamily: "var(--font-body)",
  fontSize: "13px",
  fontWeight: 600,
  padding: "9px 20px",
  borderRadius: "100px",
  border: "none",
  background: "var(--indigo)",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
};
