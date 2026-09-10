# Mritunjai Pratap Singh (Jai) - Executive Web Portfolio

An elegant, dark-themed, high-performance web portfolio engineered specifically for hiring managers, engineering directors, and tech recruiters. Highlights 14+ years of leadership in distributed backend architectures (.NET Core, C#, Microservices, Cloud), securing 90M+ user accounts at Dell, delivering 50+ microservices at Koch, and machine learning credentials from IISc Bangalore.

---

## 🌟 Key Features

1. **Matte Black & Refined Gold Aesthetics**: Velvety matte carbon finish (`#0a0c10`), hairline gold borders (`rgba(212, 175, 55, 0.28)`), warm champagne & metallic gold highlights, and executive typography (`Outfit`, `Inter`, and `JetBrains Mono`).
2. **Recruiter Fast-Track (60-Second Pitch)**: High-density executive summary drawer highlighting strengths, quantified metrics, and target roles with a one-click "Copy Recruiter Packet" feature.
3. **Interactive Experience Timeline**: In-depth breakdown of leadership and architectural impact at **Koch Global Services**, **Dell Technologies**, and **Odessa Technologies**.
4. **Architectural Spotlights**: Technical breakdowns of three mission-critical systems:
   - *Distributed Toll-Free Rate Limiter & Message Throttler (Redis + .NET Core)*
   - *Zero-Downtime Identity Federation & Dynamic Feature Flags for 90M Users (Dell DAIS)*
   - *50+ Microservices Voter/Consumer Analytics Pipeline (Koch i360, 35M+ Records)*
5. **Interactive Skills Matrix**: Filterable across categories (Backend, Architecture, Cloud, Databases, Leadership, AI/Frontend) plus real-time live search.
6. **AI Digital Twin Recruiter Assistant**: Interactive simulated AI assistant loaded with comprehensive career knowledge, responsive to custom recruiter inquiries and pre-configured prompt chips.
7. **Print / PDF-Ready Mode**: Pre-configured ATS-compliant printable stylesheet for `Ctrl+P` or clicking "Print / PDF CV".

---

## 🚀 Running Locally

This portfolio is built with modern, zero-bloat web standards (HTML5, Vanilla CSS3, Vanilla ES6+ JS) and requires no build step.

To preview locally:

### Option 1: Python
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000`

### Option 2: Node / npx
```bash
npx serve .
```

---

## 📤 Pushing to GitHub (`github.com/jai00271`)

1. Verify git status in the project directory:
   ```bash
   git status
   ```
2. Link your remote GitHub repository:
   ```bash
   git remote add origin https://github.com/jai00271/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

---

## ☁️ Hosting on AWS (Production Deployment)

### Option A: AWS S3 + CloudFront (Recommended)
1. **Create S3 Bucket**: Create an Amazon S3 bucket named `mritunjai-singh-portfolio` (or your preferred domain).
2. **Enable Static Website Hosting**: In Bucket Properties, enable Static Website Hosting with `index.html` as the index document.
3. **Upload Files**:
   ```bash
   aws s3 sync . s3://your-bucket-name/ --exclude ".git/*" --exclude "README.md"
   ```
4. **Set Up CloudFront (CDN + Free SSL)**:
   - Create a CloudFront distribution pointing to your S3 bucket website endpoint.
   - Configure Custom SSL Certificate via AWS Certificate Manager (ACM) for your custom domain.

### Option B: AWS Amplify (Continuous Deployment)
1. Go to **AWS Amplify Console** > **Host web app**.
2. Connect your GitHub repository (`https://github.com/jai00271/<repo-name>`).
3. Select `main` branch; Amplify automatically detects the static HTML/CSS/JS and deploys upon every git push.

---

## 📬 Contact Information

- **Name**: Mritunjai Pratap Singh (Jai)
- **Role**: Technical Manager & Principal Backend Engineer
- **Email**: [jai00271@gmail.com](mailto:jai00271@gmail.com)
- **Phone**: [+91 8970995611](tel:+918970995611)
- **Location**: Mahadevpura, Bengaluru, India
- **LinkedIn**: [linkedin.com/in/mpsinghdonet8yexp](https://www.linkedin.com/in/mpsinghdonet8yexp/)
- **GitHub**: [github.com/jai00271](https://github.com/jai00271)
