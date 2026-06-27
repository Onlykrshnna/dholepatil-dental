const fs = require('fs');

const updateFile = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const replacements = [
        // Names
        [/Amaya Dental Clinic/g, 'Dholepatil Dental Clinic'],
        [/Amaya Dental Health Centre/g, 'Dholepatil Dental Clinic'],
        [/Amaya Dental Centre/g, 'Dholepatil Dental Clinic'],
        [/Amaya Dental/gi, 'Dholepatil Dental Clinic'],
        [/Amaya/gi, 'Dholepatil'],
        [/Shankari Smile Studio/gi, 'Dholepatil Dental Clinic'],
        [/Shankari Dental/gi, 'Dholepatil Dental Clinic'],
        [/Shankari/gi, 'Dholepatil'],
        
        // Locations
        [/Bhargavi Platinum # 38\/4 first floor 3rd cross, Sahakarnagar Main Rd, G Block/gi, 'Shankar Parvati Chambers, Balkrishna Sakharam Dhole Patil Rd, Sangamvadi'],
        [/Sahakar Nagar, Bengaluru/gi, 'Sangamvadi, Pune'],
        [/Sahakar Nagar/gi, 'Sangamvadi'],
        [/Bengaluru/gi, 'Pune'],
        [/Kuvempu Nagara · Mysuru/gi, 'Sangamvadi, Pune'],
        [/Kuvempu Nagara, Mysuru/gi, 'Sangamvadi, Pune'],
        [/Kuvempu Nagara/gi, 'Sangamvadi'],
        [/Mysuru/gi, 'Pune'],
        [/Karnataka 560092/gi, 'Maharashtra 411001'],
        [/Karnataka 570023/gi, 'Maharashtra 411001'],
        [/Karnataka/gi, 'Maharashtra'],
        [/560092/gi, '411001'],
        [/570023/gi, '411001'],
        
        // Phone/Contact
        [/\+916366614266/g, '09607032999'],
        [/6366614266/g, '9607032999'],
        [/\+91 98765 43210/g, '096070 32999'],
        [/hello@shankarismile\.com/g, 'info@dholepatildental.com'],
        [/hello@amayadental\.in/g, 'info@dholepatildental.com'],
        
        // Rating
        [/5\.0★/g, '4.9★'],
        [/5\.0/g, '4.9'],
        [/4\.9 · 195/g, '4.9 · 69'],
        [/144 patients/g, '69 patients'],
        [/144 reviews/gi, '69 reviews'],
        [/144/g, '69'],
        [/195 Reviews/gi, '69 Reviews'],
        [/195/g, '69']
    ];

    for (let [pattern, replacement] of replacements) {
        content = content.replace(pattern, replacement);
    }

    fs.writeFileSync(filePath, content);
};

updateFile('public/index.html');
updateFile('src/routes/index.tsx');

// Also update the preloader specifically in index.html
let indexHtml = fs.readFileSync('public/index.html', 'utf8');
indexHtml = indexHtml.replace(/<span>Amaya<\/span> <span>Dental<\/span> <span>Clinic<\/span>/g, '<span>Dholepatil</span> <span>Dental</span> <span>Clinic</span>');
indexHtml = indexHtml.replace(/<span>Shankari<\/span> <span>Dental<\/span>/g, '<span>Dholepatil</span> <span>Dental</span> <span>Clinic</span>');
indexHtml = indexHtml.replace(/<span>Shankari<\/span> <span>Smile<\/span> <span>Studio<\/span>/g, '<span>Dholepatil</span> <span>Dental</span> <span>Clinic</span>');

// Specifically update the brand dots
indexHtml = indexHtml.replace(/Shankari Dental<span class="dot">\.<\/span>/gi, 'Dholepatil Dental Clinic<span class="dot">.</span>');
indexHtml = indexHtml.replace(/Amaya Dental<span class="dot">\.<\/span>/gi, 'Dholepatil Dental Clinic<span class="dot">.</span>');

fs.writeFileSync('public/index.html', indexHtml);

console.log("Global replacements for Dholepatil complete.");
