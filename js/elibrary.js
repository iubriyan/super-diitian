/* ============================================================
   E-Library Shelf & Secure PDF Reader Engine
   ============================================================ */

window.openBookDetails = function(bookKey) {
  const mainView = document.getElementById('elibMainView');
  const detailView = document.getElementById('elibDetailContainer');
  if (mainView && detailView) {
    mainView.style.display = 'none';
    detailView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.backToBookShelf = function() {
  const mainView = document.getElementById('elibMainView');
  const detailView = document.getElementById('elibDetailContainer');
  const readerView = document.getElementById('nativePdfReader');
  if (mainView && detailView) {
    if (readerView) readerView.style.display = 'none';
    detailView.style.display = 'block';
    mainView.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.loadInlineReader = function(pdfUrl, titleText) {
  const chaptersGrid = document.querySelector('.elib-chapters-grid');
  const nuBox = document.querySelector('.nu-archive-box');
  const sectionTitles = document.querySelectorAll('.elib-section-title');
  const readerContainer = document.getElementById('nativePdfReader');
  const frame = document.getElementById('nativePdfFrame');
  const titleEl = document.getElementById('nativeReaderTitle');
  
  if (readerContainer && frame) {
    if (titleEl) titleEl.innerText = titleText || "Document Viewer";
    
    let embedUrl = pdfUrl;
    if (pdfUrl.includes('drive.google.com')) {
      embedUrl = pdfUrl.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }
    
    frame.src = embedUrl;
    
    if (chaptersGrid) chaptersGrid.style.display = 'none';
    if (nuBox) nuBox.style.display = 'none';
    sectionTitles.forEach(el => el.style.display = 'none');
    
    readerContainer.style.display = 'block';
    readerContainer.scrollIntoView({ behavior: 'smooth' });
  }
};

window.closeNativeReader = function() {
  const chaptersGrid = document.querySelector('.elib-chapters-grid');
  const nuBox = document.querySelector('.nu-archive-box');
  const sectionTitles = document.querySelectorAll('.elib-section-title');
  const readerContainer = document.getElementById('nativePdfReader');
  const frame = document.getElementById('nativePdfFrame');
  
  if (readerContainer && frame) {
    frame.src = "";
    readerContainer.style.display = 'none';
    
    if (chaptersGrid) chaptersGrid.style.display = 'grid';
    if (nuBox) nuBox.style.display = 'flex';
    sectionTitles.forEach(el => el.style.display = 'flex');
  }
};
