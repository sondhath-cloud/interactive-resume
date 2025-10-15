// Competency Matrix Component

(function() {
    'use strict';

    // Competency data with descriptions
    const competencies = {
        'Change Management': {
            description: 'Leading organizational transformations, stakeholder engagement, adoption strategies, and change readiness assessments using proven methodologies (Prosci, ADKAR, Kotter).'
        },
        'Strategic Planning': {
            description: 'Aligning organizational capabilities with business strategy, long-term roadmap development, scenario planning, and enterprise-wide initiative design.'
        },
        'Talent Management': {
            description: 'Succession planning, workforce planning, competency modeling, career development frameworks, and organizational design for optimal capability.'
        },
        'Learning and Development': {
            description: 'Training program design and delivery, learning management systems, needs analysis, curriculum development, and building learning cultures.'
        },
        'Performance Management': {
            description: 'Performance frameworks, feedback systems, goal alignment (OKRs and KPIs), performance improvement plans, and accountability structures.'
        },
        'Organizational Effectiveness': {
            description: 'Process optimization, organizational assessments, culture transformation, operational efficiency, and continuous improvement initiatives.'
        }
    };

    // Roles data with competency levels
    // Levels: 3 = Primary focus, 2 = Secondary focus, 1 = Supporting role, 0 = Not used
    const roles = [
        {
            title: 'Independent Consultant, Organizational Development',
            subtitle: 'Sondra Hathaway',
            years: 'Nov 2023 - Present',
            competencies: {
                'Change Management': 3,
                'Strategic Planning': 3,
                'Talent Management': 2,
                'Learning and Development': 3,
                'Performance Management': 2,
                'Organizational Effectiveness': 3
            }
        },
        {
            title: 'Senior Change Management Consultant',
            subtitle: 'BerryDunn',
            years: 'Aug 2020 - Oct 2023',
            competencies: {
                'Change Management': 3,
                'Strategic Planning': 3,
                'Talent Management': 1,
                'Learning and Development': 2,
                'Performance Management': 1,
                'Organizational Effectiveness': 2
            }
        },
        {
            title: 'Engagement and Development Administrator',
            subtitle: 'City of Garland',
            years: 'Dec 2018 - Aug 2019',
            competencies: {
                'Change Management': 1,
                'Strategic Planning': 1,
                'Talent Management': 3,
                'Learning and Development': 3,
                'Performance Management': 2,
                'Organizational Effectiveness': 2
            }
        },
        {
            title: 'Senior Organizational Development Specialist',
            subtitle: 'TXU Energy',
            years: 'Apr 2015 - Oct 2016',
            competencies: {
                'Change Management': 1,
                'Strategic Planning': 2,
                'Talent Management': 3,
                'Learning and Development': 3,
                'Performance Management': 3,
                'Organizational Effectiveness': 2
            }
        },
        {
            title: 'Organizational Strategy Manager',
            subtitle: 'City of Goodyear',
            years: 'Dec 2006 - Apr 2015',
            competencies: {
                'Change Management': 3,
                'Strategic Planning': 3,
                'Talent Management': 3,
                'Learning and Development': 2,
                'Performance Management': 2,
                'Organizational Effectiveness': 3
            }
        }
    ];

    // Helper function to get emphasis display info
    function getEmphasisDisplay(level) {
        switch(level) {
            case 3:
                return { 
                    circles: 3, 
                    label: 'Primary Focus', 
                    colorClass: 'primary' 
                };
            case 2:
                return { 
                    circles: 2, 
                    label: 'Secondary Focus', 
                    colorClass: 'secondary' 
                };
            case 1:
                return { 
                    circles: 1, 
                    label: 'Supporting Role', 
                    colorClass: 'supporting' 
                };
            default:
                return { 
                    circles: 0, 
                    label: 'Not Used', 
                    colorClass: 'none' 
                };
        }
    }

    // Initialize the competency matrix
    function initCompetencyMatrix() {
        const container = document.getElementById('competency-matrix-container');
        if (!container) {
            console.warn('Competency matrix container not found');
            return;
        }

        // Build the HTML structure
        const html = `
            <div class="competency-matrix-section">
                <div class="competency-header">
                    <h2>Competency Matrix</h2>
                </div>


                <!-- Matrix Table -->
                <div class="competency-table-wrapper">
                    <div class="competency-table-scroll">
                        <table class="competency-table">
                            <thead>
                                <tr>
                                    <th>Role and Competency</th>
                                    ${Object.entries(competencies).map(([name, data]) => `
                                        <th>
                                            <div class="competency-header-cell">
                                                <span>${name}</span>
                                                <div class="competency-tooltip">
                                                    <strong>${name}</strong>
                                                    <p>${data.description}</p>
                                                </div>
                                            </div>
                                        </th>
                                    `).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${roles.map((role, roleIndex) => `
                                    <tr>
                                        <td>
                                            <div class="role-info">
                                                <div class="role-title">${role.title}</div>
                                                <div class="role-subtitle">${role.subtitle}</div>
                                                <div class="role-years">${role.years}</div>
                                            </div>
                                        </td>
                                        ${Object.keys(competencies).map((compName) => {
                                            const level = role.competencies[compName];
                                            const display = getEmphasisDisplay(level);
                                            
                                            if (level === 0) {
                                                return '<td></td>';
                                            }
                                            
                                            return `
                                                <td data-role="${roleIndex}" data-comp="${compName}">
                                                    <div class="emphasis-display">
                                                        <div class="emphasis-circles">
                                                            ${Array(display.circles).fill(0).map(() => 
                                                                `<div class="emphasis-circle ${display.colorClass}"></div>`
                                                            ).join('')}
                                                        </div>
                                                        <div class="emphasis-label">${display.label}</div>
                                                    </div>
                                                </td>
                                            `;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Summary Stats -->
                <div class="competency-summary">
                    <div class="summary-stat">
                        <div class="summary-number blue">6</div>
                        <div class="summary-label">Core Competencies</div>
                    </div>
                    <div class="summary-stat">
                        <div class="summary-number purple">5</div>
                        <div class="summary-label">Leadership Roles</div>
                    </div>
                    <div class="summary-stat">
                        <div class="summary-number teal">100%</div>
                        <div class="summary-label">Competency Coverage</div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompetencyMatrix);
    } else {
        initCompetencyMatrix();
    }

})();

