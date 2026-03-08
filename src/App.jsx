import { useState } from "react";
import { useCountdowns } from "./hooks/useCountdowns";
import { useModal } from "./hooks/useModal";
import { useToast } from "./hooks/useToast";
import { getUrgency } from "./utils/timeUtils";
import Header from "./components/Header";
import EmptyState from "./components/EmptyState";
import FilterBar from "./components/FilterBar";
import CountdownLayout from "./components/CountdownLayout";
import CountdownModal from "./components/CountdownModal";
import Toast from "./components/Toast";

export default function App() {
  const { countdowns, addCountdown, updateCountdown, deleteCountdown } =
    useCountdowns();
  const { isOpen, mode, editingCountdown, openCreate, openEdit, close } =
    useModal();
  const { toast, showToast, hideToast } = useToast();
  const [filter, setFilter] = useState("all");

  // Compute counts per urgency category
  const counts = { all: countdowns.length };
  countdowns.forEach((c) => {
    const u = getUrgency(c.targetDate);
    counts[u] = (counts[u] || 0) + 1;
  });

  // Apply filter
  const filteredCountdowns =
    filter === "all"
      ? countdowns
      : countdowns.filter((c) => getUrgency(c.targetDate) === filter);

  function handleSave(data) {
    if (mode === "create") {
      const created = addCountdown(data);
      showToast(`Countdown created · ${created.name}`);
    } else {
      updateCountdown(editingCountdown.id, data);
    }
    close();
  }

  // Reset filter if current filter has no results but countdowns exist
  function handleFilterChange(key) {
    setFilter(key);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header onNewCountdown={openCreate} />

      {countdowns.length === 0 ? (
        <EmptyState onCreateClick={openCreate} />
      ) : (
        <>
          <FilterBar
            active={filter}
            onChange={handleFilterChange}
            counts={counts}
          />

          {filteredCountdowns.length === 0 ? (
            /* No results for current filter */
            <div
              style={{
                minHeight: "calc(100vh - 120px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "40px 20px",
              }}
            >
              <span style={{ fontSize: "36px" }}>🔍</span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                No countdowns here
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "var(--ink-3)",
                  fontWeight: 300,
                }}
              >
                Nothing matches this filter right now.
              </p>
              <button
                onClick={() => setFilter("all")}
                style={{
                  marginTop: "8px",
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--indigo)",
                  background: "var(--indigo-lt)",
                  border: "none",
                  borderRadius: "100px",
                  padding: "8px 18px",
                  cursor: "pointer",
                }}
              >
                Show all
              </button>
            </div>
          ) : (
            <CountdownLayout
              countdowns={filteredCountdowns}
              onEdit={openEdit}
              onDelete={deleteCountdown}
            />
          )}
        </>
      )}

      {isOpen && (
        <CountdownModal
          mode={mode}
          initialData={editingCountdown}
          onSave={handleSave}
          onClose={close}
        />
      )}

      {toast && <Toast message={toast.message} onHide={hideToast} />}
    </div>
  );
}
