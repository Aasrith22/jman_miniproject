import React from 'react';

const s: Record<string, React.CSSProperties> = {
  page: { maxWidth: 1160, margin: '0 auto', padding: '40px 24px', fontFamily: 'Inter, system-ui, sans-serif' },
  pageTitle: {
    fontSize: 28, fontWeight: 800, marginBottom: 32, color: '#1e1b4b',
    borderLeft: '4px solid #7c3aed', paddingLeft: 14,
  },
  headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 12 },
  searchBar: { display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' },
  searchInput: {
    padding: '10px 12px', fontSize: 14, borderRadius: 10, border: '1px solid #e6e7f8', outline: 'none', minWidth: 280,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)'
  },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 },
  card: {
    background: 'linear-gradient(160deg, #fff 70%, #f5f3ff 100%)',
    border: '1px solid #e0e7ff', borderRadius: 18,
    padding: '22px 22px 18px', boxShadow: '0 4px 20px rgba(79,70,229,0.08)',
    display: 'flex', flexDirection: 'column', gap: 10,
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  techBadge: {
    background: 'linear-gradient(90deg,#7c3aed,#4f46e5)', color: '#fff',
    padding: '3px 13px', borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
  },
  enrolledBadge: {
    background: '#d1fae5', color: '#065f46', padding: '3px 12px',
    borderRadius: 20, fontSize: 11, fontWeight: 700,
  },
  courseName: { margin: 0, fontSize: 16, fontWeight: 700, color: '#1e1b4b', lineHeight: 1.45 },
  instructorText: { margin: 0, fontSize: 13, color: '#6b7280', flex: 1 },
  enrollBtn: {
    background: 'linear-gradient(90deg,#4f46e5,#7c3aed)', color: '#fff', border: 'none',
    borderRadius: 10, padding: '11px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 14,
    marginTop: 6, boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
  },
  registeredBtn: {
    background: 'transparent', color: '#4f46e5', border: '1.5px solid #7c3aed',
    borderRadius: 10, padding: '11px 18px', fontWeight: 700, fontSize: 14,
    cursor: 'default', flex: 1,
  },
  actionRow: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 },
  dotsBtn: {
    background: '#f5f3ff', border: '1.5px solid #ddd6fe', borderRadius: 10,
    padding: '8px 13px', cursor: 'pointer', fontSize: 20, color: '#7c3aed', lineHeight: 1,
  },
  heartBtn: {
    background: 'transparent', border: '1.5px solid #ddd6fe', borderRadius: 10,
    padding: '8px 13px', cursor: 'pointer', fontSize: 18, lineHeight: 1,
    flexShrink: 0,
  },
  dropdown: {
    position: 'absolute', right: 0, top: 'calc(100% + 6px)',
    background: '#fff', border: '1px solid #e0e7ff', borderRadius: 10,
    boxShadow: '0 8px 24px rgba(79,70,229,0.15)', zIndex: 50, minWidth: 140, overflow: 'hidden',
  },
  dropdownItem: {
    display: 'block', width: '100%', padding: '11px 18px', background: 'none',
    border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 14,
    fontWeight: 600, color: '#ef4444',
  },
  centered: { textAlign: 'center', marginTop: 100, fontSize: 18, color: '#6b7280' },
  toast: {
    position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
    color: '#fff', padding: '14px 24px', borderRadius: 12, zIndex: 9999,
    display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(79,70,229,0.35)',
    fontSize: 14, fontWeight: 600, minWidth: 280, maxWidth: 480,
    animation: 'slideDown 0.3s ease',
  },
  toastClose: {
    marginLeft: 'auto', fontSize: 18, opacity: 0.8, lineHeight: 1,
  },
};

export default s;
