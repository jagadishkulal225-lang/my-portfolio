/**
 * JAGADISH KULAL - DEVELOPER PORTFOLIO
 * Vanilla JavaScript Application Logic
 * Poornaprajna Institute of Management (PIM)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Toast Notification Utility
     ------------------------------------------------------------------------ */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info', duration = 3200) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');

    // Simple SVG check icon for toast
    const iconSvg = `
      <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, duration);
  }

  /* ------------------------------------------------------------------------
     2. Theme Management (Light / Dark)
     ------------------------------------------------------------------------ */
  const htmlRoot = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Check saved theme or default to 'light' (per user preferences)
  const savedTheme = localStorage.getItem('jagadish_portfolio_theme') || 'light';
  applyTheme(savedTheme, false);

  function applyTheme(theme, notify = true) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('jagadish_portfolio_theme', theme);

    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    if (notify) {
      showToast(theme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme, true);
    });
  }

  /* ------------------------------------------------------------------------
     3. Responsive Mobile Drawer Navigation
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');

  function toggleMobileMenu(forceClose = false) {
    if (!mobileMenuBtn || !mobileDrawer) return;

    const isOpen = forceClose ? false : !mobileDrawer.classList.contains('is-open');

    if (isOpen) {
      mobileDrawer.classList.add('is-open');
      mobileMenuBtn.classList.add('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // prevent bg scroll
    } else {
      mobileDrawer.classList.remove('is-open');
      mobileMenuBtn.classList.remove('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  /* ------------------------------------------------------------------------
     4. Smooth Active Navigation ScrollSpy
     ------------------------------------------------------------------------ */
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* ------------------------------------------------------------------------
     5. Academic Coursework & Exploration Filter Tabs
     ------------------------------------------------------------------------ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const explorationCards = document.querySelectorAll('.exploration-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active tab button state
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter cards
      explorationCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filter === 'all' || cardCategory === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. Academic Code Snippets Data & Inspector Modal
     ------------------------------------------------------------------------ */
  const snippetData = {
    'python-calc': {
      title: 'Student Academic Record & Grade Evaluation Script',
      badge: 'Python Lab Exercise',
      file: 'student_evaluator.py',
      description: 'First-year MCA lab program demonstrating Python list handling, dictionary data structures, GPA score evaluation, and CLI validation.',
      code: `# Student Academic Grade Calculator
# Lab Exercise: Poornaprajna Institute of Management (PIM)
# Author: Jagadish Kulal (First-Year MCA)

def calculate_grade(marks):
    """Computes letter grade and grade points based on percentage."""
    if marks >= 90:
        return 'A+', 10.0
    elif marks >= 80:
        return 'A', 9.0
    elif marks >= 70:
        return 'B+', 8.0
    elif marks >= 60:
        return 'B', 7.0
    elif marks >= 50:
        return 'C', 6.0
    else:
        return 'F', 0.0

def process_student_records():
    course_credits = {
        'Python Programming': 4,
        'Database Management': 4,
        'Software Engineering': 3,
        'Web Technologies': 3
    }
    
    student = {
        'reg_no': 'MCA26PIM042',
        'name': 'Jagadish Kulal',
        'scores': {
            'Python Programming': 88,
            'Database Management': 84,
            'Software Engineering': 79,
            'Web Technologies': 91
        }
    }
    
    total_points = 0
    total_credits = sum(course_credits.values())
    
    print(f"Academic Report for {student['name']} ({student['reg_no']})")
    print("-" * 55)
    
    for subject, marks in student['scores'].items():
        grade, point = calculate_grade(marks)
        credits = course_credits[subject]
        total_points += point * credits
        print(f"{subject:<24} | Marks: {marks} | Grade: {grade} ({point})")
        
    sgpa = total_points / total_credits
    print("-" * 55)
    print(f"Semester Grade Point Average (SGPA): {sgpa:.2f}")

if __name__ == '__main__':
    process_student_records()`,
      notes: 'Key learnings: Function modularity, dictionary iteration, floating-point formatting, and academic scoring logic.'
    },

    'sql-schema': {
      title: 'College Library Relational Schema & Analytical Queries',
      badge: 'SQL & Relational DBMS',
      file: 'pim_library_schema.sql',
      description: 'Normalized database schema design with table constraints, foreign key referential integrity, and multi-table JOIN queries.',
      code: `-- Poornaprajna Institute of Management (PIM)
-- Coursework: Relational Database Management Systems
-- Student: Jagadish Kulal (MCA Sem 1)

-- 1. Create Students Table
CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    reg_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    program VARCHAR(10) DEFAULT 'MCA',
    enrollment_year INT NOT NULL
);

-- 2. Create Books Table
CREATE TABLE Books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1
);

-- 3. Create Borrow Transaction Log
CREATE TABLE BorrowRecords (
    record_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    book_id INT NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

-- Query: Active Overdue Borrows with Student Contact Info
SELECT 
    s.reg_number,
    s.full_name AS student_name,
    b.title AS book_title,
    r.borrow_date,
    r.due_date,
    DATEDIFF(CURRENT_DATE, r.due_date) AS days_overdue
FROM BorrowRecords r
INNER JOIN Students s ON r.student_id = s.student_id
INNER JOIN Books b ON r.book_id = b.book_id
WHERE r.return_date IS NULL AND CURRENT_DATE > r.due_date
ORDER BY days_overdue DESC;`,
      notes: 'Key learnings: Primary/foreign key constraints, normalized 3NF table design, INNER JOIN syntax, and date calculation functions.'
    },

    'web-theme': {
      title: 'Semantic HTML & CSS Custom Properties Theme Engine',
      badge: 'Web Fundamentals',
      file: 'theme-engine.js',
      description: 'Clean JavaScript module managing light/dark theme switching, local storage persistence, and WCAG AA contrast preservation.',
      code: `// Lightweight Theme Switcher Module
// Jagadish Kulal Portfolio
const ThemeController = (() => {
  const STORAGE_KEY = 'jagadish_portfolio_theme';
  const root = document.documentElement;

  const init = () => {
    // Respect stored user preference or system default
    const saved = localStorage.getItem(STORAGE_KEY) || 'light';
    apply(saved);
  };

  const apply = (mode) => {
    root.setAttribute('data-theme', mode);
    localStorage.setItem(STORAGE_KEY, mode);
    
    // Broadcast event for UI synchronization
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: mode }));
  };

  const toggle = () => {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    apply(next);
    return next;
  };

  return { init, toggle, apply };
})();

// Execution
ThemeController.init();`,
      notes: 'Key learnings: Revealing module pattern, DOM attribute manipulation, localStorage persistence, and decoupled event messaging.'
    },

    'python-sqlite': {
      title: 'Python SQLite3 Local Data Persistence Script',
      badge: 'Python & SQLite',
      file: 'sqlite_crud_demo.py',
      description: 'Practical Python script connecting to an SQLite database, executing parameterized statements, and managing transactions securely.',
      code: `import sqlite3
# Practical Database Integration Lab
# Poornaprajna Institute of Management (PIM)
# Author: Jagadish Kulal

def initialize_database():
    with sqlite3.connect('pim_coursework.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS lab_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lab_name TEXT NOT NULL,
                student_name TEXT NOT NULL,
                submission_date TEXT DEFAULT CURRENT_TIMESTAMP,
                status TEXT CHECK(status IN ('Submitted', 'Pending', 'Graded'))
            )
        ''')
        conn.commit()
        print("Database & schema successfully initialized.")

def insert_lab_entry(lab_name, student_name, status):
    """Inserts a new record using parameterized query to prevent SQL injection."""
    with sqlite3.connect('pim_coursework.db') as conn:
        cursor = conn.cursor()
        query = "INSERT INTO lab_submissions (lab_name, student_name, status) VALUES (?, ?, ?)"
        cursor.execute(query, (lab_name, student_name, status))
        conn.commit()
        print(f"Record for '{lab_name}' successfully added (ID: {cursor.lastrowid}).")

def fetch_all_submissions():
    with sqlite3.connect('pim_coursework.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, lab_name, student_name, status FROM lab_submissions")
        records = cursor.fetchall()
        for row in records:
            print(f"[{row[0]}] {row[1]} - {row[2]} -> Status: {row[3]}")

if __name__ == '__main__':
    initialize_database()
    insert_lab_entry('Python Data Structures', 'Jagadish Kulal', 'Graded')
    insert_lab_entry('Relational Normalization', 'Jagadish Kulal', 'Submitted')
    fetch_all_submissions()`,
      notes: 'Key learnings: SQLite cursor workflows, parameterized tuple binding against SQL injection, and context manager transaction commits.'
    }
  };

  const snippetModal = document.getElementById('snippet-modal');
  const modalSnippetTitle = document.getElementById('modal-snippet-title');
  const modalSnippetBadge = document.getElementById('modal-snippet-badge');
  const modalSnippetDesc = document.getElementById('modal-snippet-desc');
  const modalTerminalFile = document.getElementById('modal-terminal-file');
  const modalSnippetCode = document.getElementById('modal-snippet-code');
  const modalSnippetNotes = document.getElementById('modal-snippet-notes');
  const closeSnippetBtn = document.getElementById('close-snippet-btn');
  const closeSnippetBtnFooter = document.getElementById('close-snippet-btn-footer');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  function openSnippetModal(snippetKey) {
    const data = snippetData[snippetKey];
    if (!data || !snippetModal) return;

    modalSnippetTitle.textContent = data.title;
    modalSnippetBadge.textContent = data.badge;
    modalSnippetDesc.textContent = data.description;
    modalTerminalFile.textContent = data.file;
    modalSnippetCode.textContent = data.code;
    modalSnippetNotes.innerHTML = `<strong>Lab Takeaways:</strong> ${data.notes}`;

    snippetModal.classList.add('is-active');
    snippetModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (closeSnippetBtn) closeSnippetBtn.focus();
  }

  function closeSnippetModal() {
    if (!snippetModal) return;
    snippetModal.classList.remove('is-active');
    snippetModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-snippet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const snippetKey = btn.getAttribute('data-snippet');
      openSnippetModal(snippetKey);
    });
  });

  if (closeSnippetBtn) closeSnippetBtn.addEventListener('click', closeSnippetModal);
  if (closeSnippetBtnFooter) closeSnippetBtnFooter.addEventListener('click', closeSnippetModal);

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeText = modalSnippetCode.textContent;
      if (navigator.clipboard && codeText) {
        navigator.clipboard.writeText(codeText).then(() => {
          showToast('Code snippet copied to clipboard!');
          const originalText = copyCodeBtn.querySelector('span').textContent;
          copyCodeBtn.querySelector('span').textContent = 'Copied!';
          setTimeout(() => {
            copyCodeBtn.querySelector('span').textContent = originalText;
          }, 2000);
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. Resume Modal & Print Logic
     ------------------------------------------------------------------------ */
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const closeResumeBtn = document.getElementById('close-resume-btn');
  const closeResumeFooterBtn = document.getElementById('close-resume-footer-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const printResumeFooterBtn = document.getElementById('print-resume-footer-btn');

  function openResume() {
    if (!resumeModal) return;
    resumeModal.classList.add('is-active');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      toggleMobileMenu(true);
    }
  }

  function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('is-active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function triggerPrint() {
    window.print();
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResume);
  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (closeResumeFooterBtn) closeResumeFooterBtn.addEventListener('click', closeResume);
  if (printResumeBtn) printResumeBtn.addEventListener('click', triggerPrint);
  if (printResumeFooterBtn) printResumeFooterBtn.addEventListener('click', triggerPrint);

  // Close modals on Escape key or backdrop click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (snippetModal && snippetModal.classList.contains('is-active')) closeSnippetModal();
      if (resumeModal && resumeModal.classList.contains('is-active')) closeResume();
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) toggleMobileMenu(true);
    }
  });

  [snippetModal, resumeModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (modal === snippetModal) closeSnippetModal();
        if (modal === resumeModal) closeResume();
      }
    });
  });

  /* ------------------------------------------------------------------------
     8. Copy Email to Clipboard Feature
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'jagadishkulal225@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  });

  /* ------------------------------------------------------------------------
     9. Contact Form Client-side Validation & Mailto Trigger
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const subjectInput = document.getElementById('message-subject');
      const bodyInput = document.getElementById('message-body');

      let isValid = true;

      // Helper validator
      function validateField(input, condition) {
        const group = input.closest('.form-group');
        if (!condition) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      validateField(nameInput, nameInput.value.trim().length > 0);
      validateField(emailInput, emailRegex.test(emailInput.value.trim()));
      validateField(subjectInput, subjectInput.value.trim().length > 0);
      validateField(bodyInput, bodyInput.value.trim().length > 0);

      if (!isValid) {
        showToast('Please correct the highlighted fields.', 'error');
        return;
      }

      // Generate mailto link
      const studentEmail = 'jagadishkulal225@gmail.com';
      const senderName = encodeURIComponent(nameInput.value.trim());
      const senderEmail = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(`[Portfolio Contact] ${subjectInput.value.trim()}`);
      
      const bodyText = `Hello Jagadish,\n\n${bodyInput.value.trim()}\n\n---\nSender Name: ${decodeURIComponent(senderName)}\nSender Email: ${decodeURIComponent(senderEmail)}`;
      const encodedBody = encodeURIComponent(bodyText);

      showToast('Launching your email client...');

      // Trigger mailto link
      const mailtoUrl = `mailto:${studentEmail}?subject=${subject}&body=${encodedBody}`;
      window.location.href = mailtoUrl;

      // Optional form reset after small delay
      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    });
  }

  /* ------------------------------------------------------------------------
     10. Back to Top Button & Dynamic Year
     ------------------------------------------------------------------------ */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

});
