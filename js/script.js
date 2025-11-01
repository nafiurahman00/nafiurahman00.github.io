$(document).ready(function() {
	// Navigation functionality
	$('.navbar-nav>li>a').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});

    $('#myButton').on('click', function(){
        if ($('#navbarCollapse').is(":visible") == true) {
            $('.navbar-collapse').collapse('hide');
        } else {
            $('.navbar-collapse').collapse('show');
        }
    });

	$('a').on('click', function (e) {
        var target = this.hash,
            $target = $(target);

       $('html, body').stop().animate({
        'scrollTop': $target.offset().top-100
		}, 100, 'swing', function () {
		});

        console.log(window.location);

        return false;
    });
	
	// Load all data from JSON files
	loadAllData();
});

// Load all data from JSON files
function loadAllData() {
	Promise.all([
		fetch('data/profile.json').then(res => res.json()),
		fetch('data/research.json').then(res => res.json()),
		fetch('data/projects.json').then(res => res.json()),
		fetch('data/education.json').then(res => res.json()),
		fetch('data/work.json').then(res => res.json()),
		fetch('data/achievements.json').then(res => res.json()),
		fetch('data/skills.json').then(res => res.json())
	]).then(([profile, research, projects, education, work, achievements, skills]) => {
		populateProfile(profile);
		populateResearch(research);
		populateProjects(projects);
		populateEducation(education);
		populateWork(work);
		populateAchievements(achievements);
		populateSkills(skills);
	}).catch(error => {
		console.error('Error loading data:', error);
	});
}

// Populate profile section
function populateProfile(profile) {
	$('#profile-name').text(profile.name);
	
	// Set profile image
	if (profile.image) {
		$('#profile-image').attr('src', profile.image);
	}
	
	const bioHtml = `<p>${profile.bio}</p>`;
	$('#profile-bio').html(bioHtml);
	
	const contactHtml = `
		<p>Email: ${profile.email}</p>
		<p>
			Links:
			${profile.cv ? `[<a href="${profile.cv}" target="_blank">Curriculum Vitae</a>]` : ''}
			[<a href="${profile.googlescholar}" target="_blank">Google Scholar</a>]
			[<a href="${profile.linkedin}" target="_blank">LinkedIn</a>]
			[<a href="${profile.github}" target="_blank">GitHub</a>]
		</p>
	`;
	$('#profile-contact').html(contactHtml);
}

// Populate research/publications section
function populateResearch(research) {
	let html = '';
	research.forEach((paper, index) => {
		const bibId = `paper_${index}_bib`;
		const absId = `paper_${index}_abs`;
		
		html += `<li>`;
		if (paper.paperLink) {
			html += `<a href="${paper.paperLink}" target="_blank"><b>${paper.title}</b></a><br/>`;
		} else {
			html += `<b>${paper.title}</b><br/>`;
		}
		html += `${paper.authors}<br/>`;
		if (paper.venue) {
			html += `<i>${paper.venue}</i><br/>`;
		}
		if (paper.status) {
			html += `Status: ${paper.status}<br/>`;
		}
		
		// Links
		html += `[<a href="#" onclick="toggleAbstract('${absId}'); return false;">abstract</a>]`;
		if (paper.codelink) {
			html += ` [<a href="${paper.codelink}" target="_blank">code</a>]`;
		}
		
		// Abstract
		html += `<div id="${absId}" class="abstract" style="display:none;">
			<p>${paper.description}</p>
		</div>`;
		
		html += `</li><br/>`;
	});
	$('#research-list').html(html);
}

// Populate projects section
function populateProjects(projects) {
	let html = '';
	projects.forEach((project, index) => {
		const summaryId = `project_${index}_summary`;
		
		html += `<li>`;
		html += `<b>${project.name}</b>`;
		if (project.technologies && project.technologies.length > 0) {
			html += ` (${project.technologies.join(', ')})`;
		}
		html += `<br/>`;
		html += `[<a href="#" onclick="$('#${summaryId}').toggle();return false;">Summary</a>]`;
		if (project.githubLink) {
			html += ` [<a href="${project.githubLink}" target="_blank">GitHub Repository</a>]`;
		}
		
		html += `<div id="${summaryId}" class="summary" style="display:none;">
			<p>${project.description}</p>
		</div>`;
		html += `</li><br/>`;
	});
	$('#projects-list').html(html);
}

// Populate education section
function populateEducation(education) {
	let html = '';
	education.forEach(edu => {
		html += `<li>`;
		html += `<b>${edu.degree}</b><br/>`;
		html += `${edu.institution}, ${edu.location}<br/>`;
		html += `${edu.details}<br/>`;
		html += `${edu.year}<br/>`;
		if (edu.coursework) {
			html += `<i>Coursework: ${edu.coursework}</i><br/>`;
		}
		html += `<br/></li>`;
	});
	$('#education-list').html(html);
}

// Populate work experience section
function populateWork(work) {
	let html = '';
	work.forEach(job => {
		html += `<li>`;
		html += `<h6 style="text-align:left;">
			${job.company}
			<span style="float:right;">${job.duration}</span>
		</h6>`;
		html += `<b>${job.title}</b><br/>`;
		if (job.department) {
			html += `${job.department}<br/>`;
		}
		html += `${job.description}<br/>`;
		if (job.coursesTaught && job.coursesTaught.length > 0) {
			html += `<i>Courses: ${job.coursesTaught.join(', ')}</i><br/>`;
		}
		html += `<br/></li>`;
	});
	$('#work-list').html(html);
}

// Populate achievements section
function populateAchievements(achievements) {
	let html = '';
	achievements.forEach(achievement => {
		html += `<li>${achievement}</li>`;
	});
	$('#achievements-list').html(html);
}

// Populate skills section
function populateSkills(skills) {
	let html = '';
	
	// Technical Skills
	if (skills.technicalSkills) {
		html += `<h5>Technical Skills</h5><ul>`;
		for (const [category, skillList] of Object.entries(skills.technicalSkills)) {
			html += `<li><b>${category}:</b> ${skillList.join(', ')}</li>`;
		}
		html += `</ul>`;
	}
	
	// Spoken Languages
	if (skills.spokenLanguages) {
		html += `<h5>Languages</h5><ul>`;
		skills.spokenLanguages.forEach(lang => {
			html += `<li>${lang}</li>`;
		});
		html += `</ul>`;
	}
	
	$('#skills-content').html(html);
}

// Toggle abstract display
function toggleAbstract(elementId) {
	$('#' + elementId).toggle();
}
