var swiper = new Swiper(".swiper", {
    effect: "cards",
    cardsEffect: {
    rotate: true,
    },
    grabCursor: true,
    initialSlide: 2,
    speed: 500,
    loop: true,
    mousewheel: {
    invert: false,
  },
});

// Project popup functionality for swiper cards
document.addEventListener('DOMContentLoaded', function() {
    // Wait for parent window to load
    setTimeout(function() {
        if (window.parent && window.parent.document) {
            const parentDocument = window.parent.document;
            const popup = parentDocument.getElementById('project-popup');
            
            if (popup) {
                const popupTitle = popup.querySelector('.popup-title');
                const popupYear = popup.querySelector('.popup-year');
                const popupText = popup.querySelector('.popup-text');
                const popupAchievements = popup.querySelector('.popup-achievements');
                const popupTechnologies = popup.querySelector('.popup-technologies');
                const popupClose = popup.querySelector('.popup-close');
                
                // Project data (matching the main page)
                const projectData = [
                    {
                        title: "Strategic Planning and Change Management",
                        year: "2023-2024",
                        description: "When CIC embarked on a major strategic planning initiative, I was brought in to ensure the organization could successfully navigate this transformation. The challenge was significant, we needed to engage stakeholders who had varying levels of buy-in while maintaining operational excellence throughout the process.",
                        achievements: [
                            "Achieved 95% participation rate in strategy workshops, the highest engagement level the organization had ever seen",
                            "Designed and facilitated intimate 1:1 conversations with senior leaders alongside large group strategy sessions to ensure all voices were heard",
                            "Created a goal-setting framework that employees actually embraced, moving from resistance to enthusiastic adoption",
                            "Transformed complex employee feedback into actionable insights that directly influenced strategic decisions",
                            "Developed custom training programs that helped leaders communicate the strategic vision with confidence and clarity"
                        ],
                        technologies: ["Strategic Planning", "Change Management", "Data Analysis", "Stakeholder Engagement", "Training Development"]
                    },
                    {
                        title: "Change Management During Company Acquisition",
                        year: "2015-2016",
                        description: "When facing the largest bankruptcy in U.S. history followed by a $9.45 billion acquisition, I was tasked to help this organization prepare 500+ employees for their next opportunity and maintain productivity among the survivors. This wasn't just succession planning, it was helping everyone navigate uncertainty while maintaining business continuity.",
                        achievements: [
                            "Successfully prepared 500+ employees for massive organizational change during the country's largest bankruptcy, maintaining morale and productivity throughout uncertainty",
                            "Implemented 9-Box succession planning that identified and developed internal talent, reducing external hiring costs and improving retention",
                            "Created a proprietary matching system that connected internal candidates with job opportunities, resulting in a 17% improvement in internal promotions over external hires",
                            "Designed custom leadership development for the IT department, transforming technical leaders into people managers",
                            "Achieved a 20% increase in project success rates through targeted project management training"
                        ],
                        technologies: ["Change Management", "Succession Planning", "9-Box Methodology", "Leadership Development", "Acquisition Integration"]
                    },
                    {
                        title: "Employee Engagement Program",
                        year: "2017-2018",
                        description: "I inherited an engagement program that needed help connecting with employees. The challenge was creating meaningful development opportunities for 2,000+ municipal employees across diverse agencies and departments.",
                        achievements: [
                            "Transformed the city's approach to employee development, creating programs that resonated with everyone from first responders to office workers",
                            "Achieved 90% 'highly effective' ratings from department partners, the highest satisfaction scores in the organization's history",
                            "Designed and deployed engagement surveys that actually generated action, not just data, leading to tangible improvements in workplace satisfaction",
                            "Created practical job aids that supervisors actually used, moving from 'shelfware' to essential tools for daily management"
                        ],
                        technologies: ["Employee Engagement", "Learning Management System", "Training Development", "HR Analytics", "Talent Management"]
                    },
                    {
                        title: "Comprehensive Performance Management Overhaul",
                        year: "2020-2023",
                        description: "Led a comprehensive performance management transformation that moved the organization from traditional metrics to values-based performance evaluation. This initiative required redesigning the entire performance management system to align with organizational values and create fair, consistent evaluation processes.",
                        achievements: [
                            "Transformed performance management from traditional metrics to values-based evaluation criteria that aligned with organizational culture",
                            "Redesigned interview questions and interviewer training to ensure consistent, fair evaluation processes across all departments",
                            "Developed and implemented a digital tool that streamlined manager processes for evaluating team members fairly and consistently",
                            "Created comprehensive training programs for managers on values-based performance evaluation and feedback delivery",
                            "Achieved 85% manager adoption rate of the new performance management system within the first year"
                        ],
                        technologies: ["Performance Management", "Values-Based Evaluation", "Digital Tools", "Manager Training", "Process Design"]
                    }
                ];
                
                        // Function to show popup (using parent's showProject function if available)
                        function showProjectPopup(projectIndex) {
                            // Try to use parent's showProject function if available
                            if (window.parent && typeof window.parent.showProject === 'function') {
                                window.parent.showProject(projectIndex);
                            } else {
                                // Fallback to direct popup manipulation
                                const project = projectData[projectIndex];
                                if (project) {
                                    // Populate popup content
                                    popupTitle.textContent = project.title;
                                    popupYear.textContent = project.year;
                                    popupText.textContent = project.description;
                                    
                                    // Clear and populate achievements
                                    popupAchievements.innerHTML = '';
                                    project.achievements.forEach(achievement => {
                                        const li = parentDocument.createElement('li');
                                        li.textContent = achievement;
                                        popupAchievements.appendChild(li);
                                    });
                                    
                                    // Clear and populate technologies
                                    popupTechnologies.innerHTML = '';
                                    project.technologies.forEach(tech => {
                                        const tag = parentDocument.createElement('span');
                                        tag.className = 'tech-tag';
                                        tag.textContent = tech;
                                        popupTechnologies.appendChild(tag);
                                    });
                                    
                                    // Show popup
                                    popup.classList.add('active');
                                    parentDocument.body.style.overflow = 'hidden';
                                }
                            }
                        }
                
                // Add click listeners to swiper cards
                document.querySelectorAll('.swiper-slide').forEach(slide => {
                    slide.addEventListener('click', function() {
                        const projectIndex = parseInt(this.getAttribute('data-project'));
                        if (!isNaN(projectIndex)) {
                            showProjectPopup(projectIndex);
                        }
                    });
                });
                
                // Add click listener to "View Projects" button
                const viewProjectsBtn = document.getElementById('swiper-view-projects');
                if (viewProjectsBtn) {
                    viewProjectsBtn.addEventListener('click', function() {
                        // Show the first project
                        showProjectPopup(0);
                    });
                }
                
                // Close popup functionality
                if (popupClose) {
                    popupClose.addEventListener('click', function() {
                        popup.classList.remove('active');
                        parentDocument.body.style.overflow = '';
                    });
                }
                
                // Close popup when clicking overlay
                const popupOverlay = popup.querySelector('.popup-overlay');
                if (popupOverlay) {
                    popupOverlay.addEventListener('click', function() {
                        popup.classList.remove('active');
                        parentDocument.body.style.overflow = '';
                    });
                }
                
                // Close popup with Escape key
                parentDocument.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && popup.classList.contains('active')) {
                        popup.classList.remove('active');
                        parentDocument.body.style.overflow = '';
                    }
                });
            }
        }
    }, 1000); // Wait 1 second for parent to load
});