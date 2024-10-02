// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
// Function to generate resume content dynamically
var generateResumeContent = function (data) {
    return "\n        <h2>".concat(data.name, "</h2>\n        <p><strong>Email:</strong> ").concat(data.email, "</p>\n        <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n        <h3>Education</h3>\n        <p>").concat(data.education, "</p>\n        <h3>Experience</h3>\n        <p>").concat(data.experience, "</p>\n        <h3>Skills</h3>\n        <p>").concat(data.skills, "</p>\n    ");
};
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Display the resume content
    resumeDisplayElement.innerHTML = generateResumeContent(resumeData);
    // Generate a shareable link to the same page with the user query parameter
    var shareableLink = "".concat(window.location.origin).concat(window.location.pathname, "?user=").concat(username);
    shareableLinkElement.href = shareableLink;
    shareableLinkElement.textContent = shareableLink;
    shareableLinkContainer.style.display = 'block';
    // Enable the download PDF button
    downloadPdfButton.disabled = false;
});
// Function to get query parameters
function getQueryParams(param) {
    var params = new URLSearchParams(window.location.search);
    return params.get(param);
}
// On page load, check if a username is provided in the query parameter
var usernameFromQuery = getQueryParams('user');
if (usernameFromQuery) {
    var savedResumeData = localStorage.getItem(usernameFromQuery);
    if (savedResumeData) {
        var resumeData = JSON.parse(savedResumeData);
        resumeDisplayElement.innerHTML = generateResumeContent(resumeData);
        shareableLinkContainer.style.display = 'block'; // Show shareable link and download options
    }
    else {
        alert('No resume found for this user.');
    }
}
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    // Use html2pdf to generate the PDF from the resume display element
    var opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumeDisplayElement).set(opt).save();
});
