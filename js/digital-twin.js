/**
 * Mritunjai Pratap Singh (Jai) - AI Digital Twin Recruiter Assistant
 * Interactive conversational assistant simulating Jai's professional persona,
 * system architecture expertise, leadership philosophy, and resume details.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDigitalTwin();
});

function initDigitalTwin() {
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendChatBtn');
  const promptChips = document.querySelectorAll('.prompt-chip');

  if (!chatMessages || !chatInput || !sendBtn) return;

  // Knowledge Base Q&A Map
  const qaKnowledge = [
    {
      keywords: ['why hire', 'why should we hire', 'value', 'fit', 'strengths', 'pitch'],
      answer: `<strong>Why Hire Jai:</strong><br>
With over <strong>14 years of enterprise engineering experience</strong>, I bring a rare blend of deep hands-on backend architecture and proven engineering management:<br>
• <strong>Proven Scale:</strong> Architected systems securing <strong>90M+ user accounts</strong> (Dell) and processing <strong>35M+ voter records</strong> across <strong>50+ microservices</strong> (Koch).<br>
• <strong>Measurable Performance:</strong> Reduced API latency by <strong>60%</strong> with Redis caching, improved SQL performance by <strong>2x</strong>, and automated accounting workflows by <strong>80%</strong>.<br>
• <strong>Team Leadership:</strong> Consistently delivered <strong>95% of projects on time</strong> while boosting engineering sprint velocity by <strong>15%</strong>.<br>
• <strong>Deep Continuous Learning:</strong> Certified Machine Learning Engineer from <strong>IISc</strong> and HackerRank Problem Solving Gold Medalist.`
    },
    {
      keywords: ['scale', 'traffic', 'high scale', 'distributed', 'volume', 'throughput', 'users', 'records'],
      answer: `<strong>Systems Scale & Throughput Highlights:</strong><br>
• <strong>90 Million+ Active Identities:</strong> In Dell's Access-Management & Identity Services (DAIS), secured Dell Web Account (DWA)—one of e-commerce's largest identity stores—across 70+ applications.<br>
• <strong>35 Million+ User Records:</strong> Engineered i360 search and election analytics at Koch over 50+ microservices with RabbitMQ messaging.<br>
• <strong>Toll-Free Message Throttler:</strong> Implemented a high-throughput dynamic Redis throttling engine ensuring regulatory compliance and zero message dropping under burst traffic.<br>
• <strong>Sub-Second Latency:</strong> Scaled reusable ASP.NET frameworks with distributed Redis caching, cutting latency under heavy load by 60%.`
    },
    {
      keywords: ['dell', 'dais', 'identity', 'auth', 'oauth', 'saml', 'dwa', 'feature flag'],
      answer: `<strong>Experience at Dell Technologies (Team Lead, 2015–2019):</strong><br>
• <strong>Mission:</strong> Core identity engineering for Dell Access-Management & Identity Services (DAIS).<br>
• <strong>Protocols:</strong> Integrated enterprise SAML 2.0, OAuth 2.0, and Basic Auth, protecting 70+ applications.<br>
• <strong>Dynamic Feature Flags:</strong> Engineered a feature-flag-based authentication control system that enabled zero-downtime production switching and reduced deployment rollbacks by <strong>30%</strong>.<br>
• <strong>Distributed Caching:</strong> Integrated Redis with core ASP.NET packages to drop API response latency by up to <strong>60%</strong>.<br>
• <strong>Award:</strong> Received the Dell Bronze Award in 2018 for engineering excellence.`
    },
    {
      keywords: ['koch', 'technical manager', 'manager', 'i360', 'rabbitmq', 'servicenow', 'fsm'],
      answer: `<strong>Experience at Koch Global Services (Technical Manager, 2019–Present):</strong><br>
• <strong>Engineering Leadership:</strong> Directed and mentored a team of 5 engineers, maintaining a 95% on-time delivery record and improving sprint velocity by 15%. Applied Market-Based Management (MBM®).<br>
• <strong>i360 Analytics Platform:</strong> Built voter campaign tagging and election analytics across 50+ microservices using ASP.NET MVC, RabbitMQ, and SQL/Postgres for 35M+ records.<br>
• <strong>Message Throttling Engine:</strong> Built a dynamic Redis-backed rate limiter for compliant high-volume toll-free messaging.<br>
• <strong>ServiceNow Automation:</strong> Automated Infor accounting integration via REST APIs, slashing manual entry by 80% and turnaround time by 40% (Koch Automation Award 2021).<br>
• <strong>TechFiesta Hackathon:</strong> Won the 2025 Jury Award for 'People Pulse' built in React to empower leaders with real-time workforce analytics.`
    },
    {
      keywords: ['odessa', 'hnb', 'sql', 'tax', 'asset finance', 'leasing'],
      answer: `<strong>Experience at Odessa Technologies (Senior Software Engineer, 2011–2015):</strong><br>
• <strong>Core Banking Tax Optimization:</strong> Rewrote legacy SQL stored procedures and database logic for HNB Bank's tax module, achieving a <strong>2x query speedup</strong> and eliminating processing bottlenecks during peak load.<br>
• <strong>Framework Modernization:</strong> Partnered directly with the core architecture team to pilot a new enterprise web framework, driving early adoption across multiple business units in under 6 months.<br>
• <strong>Award:</strong> Won the prestigious HNB Award in 2012 for simplifying tax calculations and boosting system performance.`
    },
    {
      keywords: ['leadership', 'management', 'mentor', 'team', 'velocity', 'agile', 'hiring'],
      answer: `<strong>Leadership & Engineering Management Philosophy:</strong><br>
• <strong>Mentorship & Empowerment:</strong> Led and coached 5+ engineers, fostering psychological safety, clear technical roadmaps, and continuous growth.<br>
• <strong>Velocity & Predictability:</strong> Increased sprint velocity by 15% through clear requirement decomposition, reducing technical debt, and iterative Agile delivery.<br>
• <strong>Technical Hiring:</strong> Experienced in designing rigorous coding and system design interviews, onboarding engineers, and building cohesive, high-performing squads.<br>
• <strong>Stakeholder Alignment:</strong> Proven ability to bridge business requirements, product managers, and architectural design into clear deliverables.`
    },
    {
      keywords: ['tech stack', 'technology', 'skills', 'c#', '.net', 'microservices', 'redis', 'tools'],
      answer: `<strong>Core Technical Stack:</strong><br>
• <strong>Languages & Frameworks:</strong> C#, ASP.NET Core (.NET 8/7/6), .NET Framework, Web API, ASP.NET MVC, LINQ, ADO.NET, WCF, SOAP.<br>
• <strong>Architecture:</strong> Microservices (50+ services), Event-Driven Architecture, CQRS, Distributed Caching, Message Throttling, Feature Flags.<br>
• <strong>Messaging & Caching:</strong> RabbitMQ, Redis, In-Memory Caching.<br>
• <strong>Cloud & DevOps:</strong> AWS, Azure, GCP, PCF, Docker, Git, TFS, GitLab, TeamCity, Octopus Deploy.<br>
• <strong>Databases:</strong> Microsoft SQL Server, Azure SQL, PostgreSQL, Redis, Infor DataLake.<br>
• <strong>AI & Frontend:</strong> Machine Learning (IISc Certified), React, Angular 12, TypeScript.`
    },
    {
      keywords: ['awards', 'recognition', 'certifications', 'cert', 'hackathon', 'bronze', 'iisc', 'scaler', 'hackerrank'],
      answer: `<strong>Awards & Certifications:</strong><br>
🏆 <strong>TechFiesta Hackathon Jury Award (2025)</strong> – Koch (People Pulse in React)<br>
🏆 <strong>Automation Award (2021)</strong> – Koch (ServiceNow REST API integration)<br>
🏆 <strong>Dell Bronze Award (2018)</strong> – Dell Technologies (Identity & DAIS security)<br>
🏆 <strong>HNB Award (2012)</strong> – Odessa Technologies (Tax calculation engine optimization)<br>
🎓 <strong>Certified Machine Learning Engineer</strong> – Indian Institute of Science (IISc Bangalore)<br>
🎖️ <strong>Data Structures & Algorithms Certification</strong> – Scaler Academy (InterviewBit)<br>
🎖️ <strong>Gold Medalist in Problem Solving</strong> – HackerRank`
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'interview', 'hire', 'linkedin', 'github', 'call'],
      answer: `<strong>Direct Contact Information:</strong><br>
• <strong>Email:</strong> <a href="mailto:jai00271@gmail.com" style="color:var(--gold);text-decoration:underline;">jai00271@gmail.com</a><br>
• <strong>Phone:</strong> <a href="tel:+918970995611" style="color:var(--gold);text-decoration:underline;">+91 8970995611</a><br>
• <strong>Location:</strong> Mahadevpura, Bengaluru, India<br>
• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mpsinghdonet8yexp/" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:underline;">linkedin.com/in/mpsinghdonet8yexp</a><br>
• <strong>GitHub:</strong> <a href="https://github.com/jai00271" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:underline;">github.com/jai00271</a><br><br>
<em>Feel free to drop an email or reach out on LinkedIn to set up a technical interview or exploratory chat!</em>`
    },
    {
      keywords: ['roles', 'target', 'looking for', 'notice', 'location', 'relocation', 'remote'],
      answer: `<strong>Target Roles & Preferences:</strong><br>
• <strong>Target Roles:</strong> Technical Manager, Engineering Manager, Lead Backend Architect, Principal Systems Engineer.<br>
• <strong>Current Location:</strong> Bengaluru (Bangalore), India.<br>
• <strong>Work Model:</strong> Open to Hybrid roles in Bengaluru or Full Remote opportunities with global teams.<br>
• <strong>Domain Interests:</strong> Distributed Systems, Enterprise Cloud Platforms, FinTech, High-Volume Data Systems, and AI-assisted Backend Infrastructure.`
    }
  ];

  function appendMessage(text, sender = 'bot') {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = text;

    messageEl.appendChild(bubble);
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserInput(userText) {
    if (!userText.trim()) return;

    // Display user message
    appendMessage(escapeHtml(userText), 'user');
    chatInput.value = '';

    // Typing effect simulation
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot typing';
    typingIndicator.innerHTML = `<div class="message-bubble" style="color:var(--gold);font-family:var(--font-mono);font-size:0.8rem;">Jai's Digital Twin is thinking...</div>`;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const answer = generateResponse(userText.toLowerCase());
      appendMessage(answer, 'bot');
    }, 450);
  }

  function generateResponse(query) {
    // Check against knowledge base
    for (const item of qaKnowledge) {
      if (item.keywords.some(kw => query.includes(kw))) {
        return item.answer;
      }
    }

    // Default intelligent response
    return `Thank you for asking! While I might not have an exact script for that specific wording, my background includes <strong>14+ years in .NET Core, Microservices, and System Architecture</strong>, leading engineering teams at <strong>Koch</strong> and <strong>Dell</strong>.<br><br>
Would you like to know more about:
• <a href="javascript:void(0)" onclick="triggerPrompt('What scale of systems has he built?')" style="color:var(--gold);text-decoration:underline;">The scale of systems I have built</a><br>
• <a href="javascript:void(0)" onclick="triggerPrompt('Tell me about his experience at Dell and Koch.')" style="color:var(--gold);text-decoration:underline;">My work at Dell and Koch</a><br>
• <a href="javascript:void(0)" onclick="triggerPrompt('How can I contact or schedule an interview with him?')" style="color:var(--gold);text-decoration:underline;">How to contact me for an interview</a>`;
  }

  // Handle send button
  sendBtn.addEventListener('click', () => {
    handleUserInput(chatInput.value);
  });

  // Handle Enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput(chatInput.value);
    }
  });

  // Handle prompt chips
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.textContent.replace(/^["“”]|["“”]$/g, '').trim();
      handleUserInput(promptText);
    });
  });

  // Global helper for prompt clicks
  window.triggerPrompt = function(promptText) {
    handleUserInput(promptText);
  };

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
