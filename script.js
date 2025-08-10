// script.js - basic interactive behaviors and simulated climate data
document.addEventListener('DOMContentLoaded', () => {
  const simulateBtn = document.getElementById('simulateBtn');
  const tempValue = document.getElementById('tempValue');
  const co2Value = document.getElementById('co2Value');
  const seaValue = document.getElementById('seaValue');

  // Tools
  const cInput = document.getElementById('cInput');
  const convertBtn = document.getElementById('convertBtn');
  const fResult = document.getElementById('fResult');
  const kResult = document.getElementById('kResult');

  // Notes
  const noteInput = document.getElementById('noteInput');
  const saveNoteBtn = document.getElementById('saveNoteBtn');
  const notesList = document.getElementById('notesList');
  const clearNotesBtn = document.getElementById('clearNotesBtn');

  // Load notes from localStorage
  function loadNotes(){
    const raw = localStorage.getItem('nm_notes') || '[]';
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  function renderNotes(){
    notesList.innerHTML = '';
    const notes = loadNotes();
    if (notes.length === 0) {
      notesList.innerHTML = '<div class="muted">No saved notes yet.</div>';
      return;
    }
    notes.slice().reverse().forEach((n, idx) => {
      const el = document.createElement('div');
      el.className = 'note';
      el.textContent = n;
      notesList.appendChild(el);
    });
  }
  function saveNote(text){
    if (!text || text.trim() === '') return;
    const notes = loadNotes();
    notes.push(text.trim());
    localStorage.setItem('nm_notes', JSON.stringify(notes));
    renderNotes();
  }
  function clearNotes(){
    localStorage.removeItem('nm_notes');
    renderNotes();
  }

  // Simple conversion helpers
  function cToF(c){ return (c * 9/5) + 32; }
  function cToK(c){ return Number(c) + 273.15; }

  convertBtn.addEventListener('click', () => {
    const c = parseFloat(cInput.value);
    if (Number.isNaN(c)) {
      alert('Please enter a valid Celsius value.');
      return;
    }
    fResult.textContent = cToF(c).toFixed(1);
    kResult.textContent = cToK(c).toFixed(2);
  });

  // Save/clear notes handlers
  saveNoteBtn.addEventListener('click', () => {
    saveNote(noteInput.value);
    noteInput.value = '';
  });
  clearNotesBtn.addEventListener('click', () => {
    if (confirm('Clear all saved notes?')) clearNotes();
  });

  // Simulate climate data
  simulateBtn.addEventListener('click', () => {
    // Generate plausible sample values with small randomness
    const temp = (14 + Math.random() * 6 + (Math.random() < 0.2 ? 2 : 0)).toFixed(1); // 14-22°C typical sample
    const co2 = (410 + Math.random() * 50).toFixed(1); // 410-460 ppm sample
    const sea = (3 + Math.random() * 25).toFixed(1); // cm since baseline (toy example)
    tempValue.textContent = `${temp} °C`;
    co2Value.textContent = `${co2} ppm`;
    seaValue.textContent = `${sea} cm`;
  });

  // Initialize UI
  renderNotes();

  // Optionally, simulate a first sample for nicer appearance
  simulateBtn.click();
});
