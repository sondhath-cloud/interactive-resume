// Experience Pop-up Functionality
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    const popup = document.getElementById('experience-popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');
    const popupTitle = document.getElementById('popup-title');
    const popupCompany = document.getElementById('popup-company');
    const popupDate = document.getElementById('popup-date');
    const popupContent = document.getElementById('popup-content');

    // Experience data
    const experienceData = {
        0: {
            title: 'Change Manager',
            company: 'CIC',
            date: 'Nov 2023-Present',
            content: `
                <h6>Key Accomplishments:</h6>
                <ul>
                    <li>Lead change management efforts during and after organizational strategic planning</li>
                    <li>Engage individuals through 1:1, small and large group discussions; secured active participation from 95% of key stakeholders in strategy workshops and feedback sessions</li>
                    <li>Guide employees in goal-setting process and throughout plan implementation</li>
                    <li>Analyze and convey employee and customer insights through quantitative and qualitative data analysis</li>
                    <li>Develop and deliver training to employees and leadership</li>
                </ul>
            `
        },
        1: {
            title: 'Senior Change Management Consultant',
            company: 'BerryDunn',
            date: 'Aug 2020-Oct 2023',
            content: `
                <h6>Key Tasks and Accomplishments:</h6>
                <ul>
                    <li>Lead change management initiatives to successfully transform culture, including multi-year digital transformations, totaling over $1.3 million revenue annually</li>
                    <li>Conduct change impact and stakeholder analyses, sponsor coaching, and change readiness assessments</li>
                    <li>Develop success metrics, evaluate, and report on change effort effectiveness</li>
                    <li>Coach and develop leaders and project teams on effective change management methodologies including ADKAR, Bridges, and Kotter's theory</li>
                    <li>Conduct highly effective business development, including scoping, budgeting, proposal writing, and sales presentations, winning 75% of proposals compared to firm average of 33%</li>
                    <li>Up-sell add-on change management services resulting in over $500,000 annual revenue</li>
                    <li>Supervise, train, and mentor BerryDunn consultants delivering organizational development and change management services</li>
                </ul>
            `
        },
        2: {
            title: 'Engagement and Development Administrator',
            company: 'City of Garland, Texas',
            date: 'Dec 2017-Aug 2018',
            content: `
                <h6>Key Tasks and Accomplishments:</h6>
                <ul>
                    <li>Managed engagement, learning, and development initiatives for over 2,000 employees</li>
                    <li>Collaborated with HR Business Partners to innovate, implement, and evaluate talent strategies; received "highly effective" ratings from 90% of HRBPs in quarterly partnership reviews</li>
                    <li>Deployed employee engagement surveys; analyzed and communicated results</li>
                    <li>Designed and created quick-reference guides and job aids to support leaders in talent management, performance management, and career development</li>
                    <li>Implemented learning management system for organization-wide training registration, delivery, and documentation and led change management efforts to ensure adoption</li>
                    <li>Created engaging online learning courses and tests for employees using Articulate software</li>
                    <li>Collaborated closely with communications team to ensure awareness, desire, knowledge, and ability for internal and public stakeholders throughout major changes</li>
                </ul>
            `
        },
        3: {
            title: 'Senior Organizational Development Consultant',
            company: 'TXU Energy',
            date: 'Apr 2015-Oct 2016',
            content: `
                <h6>Key Accomplishments:</h6>
                <ul>
                    <li>Developed organizational change readiness in preparation for $9.45 billion company acquisition</li>
                    <li>Led organization-wide succession planning using 9-Box methodology</li>
                    <li>Developed proprietary career planning process to match internal candidates with company positions based on competencies resulting in a 17% improved ratio of Internal Promotions to External Hires for key leadership and operational roles</li>
                    <li>Developed and delivered custom in-house leadership development program for Information Technology Department</li>
                    <li>Provided executive coaching to company leaders</li>
                    <li>Created online learning for employees using Camtasia software on topics including "Managing a Remote Workforce," and "Coaching Through Change"</li>
                    <li>Demonstrated a 20% increase in project success rates for initiatives based on project manager training</li>
                </ul>
            `
        }
    };

    // Function to show popup
    function showPopup(experienceIndex) {
        const data = experienceData[experienceIndex];
        if (data) {
            popupTitle.textContent = data.title;
            popupCompany.textContent = data.company;
            popupDate.textContent = data.date;
            popupContent.innerHTML = data.content;
            
            popupOverlay.classList.add('active');
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Function to hide popup
    function hidePopup() {
        popupOverlay.classList.remove('active');
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Add click event listeners to experience cards
    experienceCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showPopup(index);
        });
    });

    // Close popup when clicking close button
    popupClose.addEventListener('click', hidePopup);

    // Close popup when clicking overlay
    popupOverlay.addEventListener('click', hidePopup);

    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            hidePopup();
        }
    });
});
