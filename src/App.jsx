import { useCountdowns }  from './hooks/useCountdowns';
import { useModal }       from './hooks/useModal';
import { useToast }       from './hooks/useToast';
import Header             from './components/Header';
import EmptyState         from './components/EmptyState';
import CountdownLayout    from './components/CountdownLayout';
import CountdownModal     from './components/CountdownModal';
import Toast              from './components/Toast';

export default function App() {
  const { countdowns, addCountdown, updateCountdown, deleteCountdown } = useCountdowns();
  const { isOpen, mode, editingCountdown, openCreate, openEdit, close } = useModal();
  const { toast, showToast, hideToast } = useToast();

  function handleSave(data) {
    if (mode === 'create') {
      const created = addCountdown(data);
      showToast(`Countdown created · ${created.name}`);
    } else {
      updateCountdown(editingCountdown.id, data);
    }
    close();
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <Header onNewCountdown={openCreate} />

      {countdowns.length === 0 ? (
        <EmptyState onCreateClick={openCreate} />
      ) : (
        <CountdownLayout
          countdowns={countdowns}
          onEdit={openEdit}
          onDelete={deleteCountdown}
        />
      )}

      {isOpen && (
        <CountdownModal
          mode={mode}
          initialData={editingCountdown}
          onSave={handleSave}
          onClose={close}
        />
      )}

      {toast && (
        <Toast message={toast.message} onHide={hideToast} />
      )}
    </div>
  );
}
