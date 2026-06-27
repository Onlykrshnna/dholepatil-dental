const fs = require('fs');

const indexPath = 'public/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// Replace address in map section and footer
html = html.replace(/Bhargavi Platinum # 38\/4, 3rd Cross, Sahakarnagar Main Rd, G Block/g, 'Shankar Parvati Chambers, Balkrishna Sakharam Dhole Patil Rd');
html = html.replace(/Bhargavi Platinum # 38\/4, 3rd Cross, Sahakarnagar Main Rd/g, 'Shankar Parvati Chambers, Balkrishna Sakharam Dhole Patil Rd');
html = html.replace(/↳ West of Chord Road, Sangamvadi/g, 'Located in: Shankar Parvati Chambers | Plus code: GVPG+8H Pune, Maharashtra');
html = html.replace(/Dholepatil\+Dental\+Health\+Centre\+Sangamvadi\+Pune/g, 'Dholepatil+Dental+Clinic+Sangamvadi+Pune');

// Add Hindi name in title and hero
html = html.replace(/<title>Dholepatil Dental Clinic/g, '<title>Dholepatil Dental Clinic (ढोलेपटिल डेंटल क्लिनिक)');
html = html.replace(/<div class="hero-label" id="heroLabel">Sangamvadi · Pune<\/div>/, '<div class="hero-label" id="heroLabel">ढोलेपटिल डेंटल क्लिनिक · Sangamvadi, Pune</div>');
html = html.replace(/<div class="nav-brand">Dholepatil<span class="dot">\.<\/span><\/div>/g, '<div class="nav-brand">Dholepatil<span class="dot">.</span></div>');

// Replace the testimonials
const review1 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"I visited the clinic last month for swelling and pain in the tooth. I was very scared to undergo dental treatment, but the doctor was very cooperative and made me comfortable. They did the Root Canal treatment and cap for my tooth.Pain got …"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">SK</div>
          <div><div class="test-card-name">Shilpa Kamble</div><div class="test-card-location">Pune</div></div>
        </div>
      </div>`;
const review2 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"I recently had a tooth canal done here in this clinic of Dr. Pooja Dholepatil. She is an excellent dentist and a true professional! She is extremely skilled at her work and brings a lot of clarity to the entire treatment process! What …"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">NS</div>
          <div><div class="test-card-name">Nitin sawardekar</div><div class="test-card-location">Pune</div></div>
        </div>
      </div>`;
const review3 = `
      <div class="test-card">
        <div class="test-card-stars">★★★★★</div>
        <p class="test-card-quote">"Excellent help and guidance given for better oral health. And the treatment was done well, I felt very comfortable. Would recommend Dr. Pooja Dhole Patil to everyone looking for an amazing dentist!"</p>
        <div class="test-card-author">
          <div class="test-card-avatar">TP</div>
          <div><div class="test-card-name">Tejaswini Patil</div><div class="test-card-location">Pune</div></div>
        </div>
      </div>`;

// Use regex to replace the first 3 test-cards, then the next 3, or just replace the whole test-track innerHTML
// To be safe, let's just replace all "test-card"s inside "test-track" by parsing it manually or with regex.
const testTrackRegex = /<div class="test-track" id="testTrack">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;
const match = html.match(testTrackRegex);
if (match) {
    const newTestTrackInner = `
${review1}
${review2}
${review3}
<!-- Duplicate for infinite scroll -->
${review1}
${review2}
${review3}
    `;
    const replaced = html.replace(match[1], newTestTrackInner);
    html = replaced;
}

// Replace team info
html = html.replace(/Our Expert Dental Team/g, 'Dr. Pooja Dholepatil');
html = html.replace(/our expert team/gi, 'Dr. Pooja Dholepatil');

fs.writeFileSync(indexPath, html);
console.log("Details updated.");
