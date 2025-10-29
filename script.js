// ===================================
// State Management
// ===================================
let currentPage = 'home';
let data = {
    profile: null,
    education: null,
    work: null,
    research: null,
    projects: null,
    skills: null,
    achievements: null
};

// ===================================
// Data Loading
// ===================================
async function loadData() {
    try {
        const [profile, education, work, research, projects, skills, achievements] = await Promise.all([
            fetch('public/profile.json').then(r => r.json()),
            fetch('public/education.json').then(r => r.json()),
            fetch('public/work.json').then(r => r.json()),
            fetch('public/research.json').then(r => r.json()),
            fetch('public/projects.json').then(r => r.json()),
            fetch('public/skills.json').then(r => r.json()),
            fetch('public/achievements.json').then(r => r.json())
        ]);

        data = { profile, education, work, research, projects, skills, achievements };
        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
}

// ===================================
// Page Rendering Functions
// ===================================
function renderHomePage() {
    const profile = data.profile;
    return `
        <div class="page-section">
            <div class="profile-header">
                <img src="assets/nfu.jpg" alt="${profile.name}" class="profile-picture">
            </div>
            <div class="profile-info">
                <h1 class="hero-title">${profile.name}</h1>
                <p class="hero-subtitle">${profile.title}</p>
            </div>
            
            <div class="hero-contact">
                <a href="mailto:${profile.email}" class="contact-link" aria-label="Email">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                </a>
                <a href="${profile.github}" target="_blank" rel="noopener noreferrer" class="contact-link" aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                </a>
                <a href="${profile.googlescholar}" target="_blank" rel="noopener noreferrer" class="contact-link" aria-label="Google Scholar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                </a>
                <a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                </a>
            </div>
            
            <div style="margin-top: var(--spacing-xl); text-align: center;">
                <h2 class="section-title" style="text-align: center;">About Me</h2>
                <p class="about-text">${profile.bio}</p>
                <div style="display: flex; justify-content: center; margin-top: var(--spacing-md);">
                    <a href="assets/Md_Nafiu_Rahman_resume.pdf" download class="download-cv-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download CV
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderEducationPage() {
    const education = data.education;
    return `
        <div class="page-section">
            <h1 class="section-title" style="text-align: center;">Education</h1>
            <div class="timeline">
                ${education.map(edu => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3 class="timeline-title">${edu.institution}</h3>
                            <span class="timeline-date">${edu.year}</span>
                        </div>
                        <p class="timeline-subtitle">${edu.degree}</p>
                        ${edu.details ? `<p class="timeline-gpa">${edu.details}</p>` : ''}
                        ${edu.coursework ? `
                            <div class="timeline-details">
                                <strong>Relevant coursework:</strong> ${edu.coursework}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderExperiencePage() {
    const work = data.work;
    return `
        <div class="page-section">
            <h1 class="section-title" style="text-align: center;">Professional Experience</h1>
            <div class="timeline">
                ${work.map(job => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3 class="timeline-title">${job.title}</h3>
                            <span class="timeline-date">${job.duration}</span>
                        </div>
                        <p class="timeline-subtitle">${job.company}${job.department ? `, ${job.department}` : ''}</p>
                        <p class="timeline-details">${job.description}</p>
                        ${job.coursesTaught ? `
                            <div class="courses-taught">
                                <strong>Courses Taught:</strong>
                                <div class="course-tags">
                                    ${job.coursesTaught.map(course => `<span class="course-tag">${course}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderResearchPage() {
    const research = data.research;
    return `
        <div class="page-section">
            <h1 class="section-title" style="text-align: center;">Research Experience</h1>
            <div class="research-list">
                ${research.map(paper => `
                    <div class="research-item">
                        <h3 class="research-title">${paper.title}</h3>
                        <p class="research-authors">${paper.authors}</p>
                        ${paper.status ? `<div class="research-status-badge">${paper.status}</div>` : ''}
                        ${paper.paperLink ? `
                            <div class="research-paper-link">
                                <a href="${paper.paperLink}" target="_blank" rel="noopener noreferrer" class="paper-link">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                    Paper Link
                                </a>
                            </div>
                        ` : ''}
                        <p class="research-description">${paper.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProjectsPage() {
    const projects = data.projects;
    return `
        <div class="page-section">
            <h1 class="section-title" style="text-align: center;">Academic Projects</h1>
            <div class="projects-grid">
                ${projects.map(project => `
                    <div class="project-card">
                        <h3 class="project-title">${project.name}</h3>
                        <p class="project-description">${project.description}</p>
                        ${project.githubLink ? `
                            <div class="project-github">
                                <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="github-link" aria-label="View on GitHub">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                    <span>View on GitHub</span>
                                </a>
                            </div>
                        ` : ''}
                        ${project.technologies ? `
                            <div class="project-tech">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderSkillsPage() {
    const skills = data.skills;
    const technicalSkills = skills.technicalSkills;
    return `
        <div class="page-section">
            <h1 class="section-title" style="text-align: center;">Technical Skills</h1>
            <div class="skills-container">
                ${Object.entries(technicalSkills).map(([category, skillList]) => `
                    <div class="skill-category">
                        <h3 class="skill-category-title">${category}</h3>
                        <div class="skill-tags">
                            ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            ${skills.spokenLanguages ? `
                <div class="skills-container" style="margin-top: var(--spacing-lg);">
                    <div class="skill-category">
                        <h3 class="skill-category-title">Languages (Spoken/Written)</h3>
                        <div class="skill-tags">
                            ${skills.spokenLanguages.map(lang => `<span class="skill-tag">${lang}</span>`).join('')}
                        </div>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderAchievementsPage() {
    const achievements = data.achievements;
    return `
        <div class="page-section">
            <h1 class="section-title" style="text-align: center;">Achievements</h1>
            <ul class="achievements-list">
                ${achievements.map(achievement => `
                    <li>${achievement}</li>
                `).join('')}
            </ul>
        </div>
    `;
}

// ===================================
// Navigation & Routing
// ===================================
function navigateToPage(page) {
    currentPage = page;
    const mainContent = document.getElementById('main-content');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    // Render appropriate page
    switch(page) {
        case 'home':
            mainContent.innerHTML = renderHomePage();
            break;
        case 'education':
            mainContent.innerHTML = renderEducationPage();
            break;
        case 'experience':
            mainContent.innerHTML = renderExperiencePage();
            break;
        case 'research':
            mainContent.innerHTML = renderResearchPage();
            break;
        case 'projects':
            mainContent.innerHTML = renderProjectsPage();
            break;
        case 'skills':
            mainContent.innerHTML = renderSkillsPage();
            break;
        case 'achievements':
            mainContent.innerHTML = renderAchievementsPage();
            break;
        default:
            mainContent.innerHTML = renderHomePage();
    }
    
    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Theme Toggle
// ===================================
function initTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ===================================
// Mobile Navigation
// ===================================
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ===================================
// Event Listeners
// ===================================
function initEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
            
            // Update URL hash
            window.location.hash = page === 'home' ? '' : page;
        });
    });
    
    // Logo click
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage('home');
        window.location.hash = '';
    });
    
    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || 'home';
        navigateToPage(hash);
    });
}

// ===================================
// Initialization
// ===================================
async function init() {
    // Initialize theme
    initTheme();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Load data
    await loadData();
    
    // Check URL hash for initial page
    const hash = window.location.hash.slice(1) || 'home';
    navigateToPage(hash);
    
    // Initialize event listeners
    initEventListeners();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
