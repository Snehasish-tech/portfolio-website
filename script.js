// ==================== SMOOTH SCROLL ====================
        function scrollToSection(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
            }
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ==================== COPY TO CLIPBOARD ====================
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Copied to clipboard: ' + text);
            });
        }

        // ==================== SCROLL REVEAL ANIMATION ====================
        function initScrollReveal() {
            const reveals = document.querySelectorAll('.scroll-reveal');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            reveals.forEach(reveal => observer.observe(reveal));
        }

        // ==================== 3D CARD EFFECT ====================
        function init3DCards() {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const rotateX = (e.clientY - centerY) / 10;
                    const rotateY = (centerX - e.clientX) / 10;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            });
        }

        // ==================== PARALLAX EFFECT ====================
        function initParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('[data-parallax]');

                parallaxElements.forEach(element => {
                    const speed = element.getAttribute('data-parallax') || 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }

        // ==================== STAGGER ANIMATION ====================
        function initStaggerAnimation() {
            const skillCards = document.querySelectorAll('.skill-card');
            skillCards.forEach((card, index) => {
                card.style.animationDelay = (index * 0.08) + 's';

                // Animate the level fill bars when skill card comes into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const levelFill = entry.target.querySelector('.level-fill');
                            if (levelFill) {
                                const width = levelFill.style.width;
                                levelFill.style.width = '0';
                                setTimeout(() => {
                                    levelFill.style.width = width;
                                }, 100);
                            }
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                observer.observe(card);
            });
        }

        // ==================== MOUSE TRACK EFFECT ====================
        document.addEventListener('mousemove', (e) => {
            const floatingElements = document.querySelectorAll('[data-mouse-track]');
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;

            floatingElements.forEach(el => {
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // ==================== AI ASSISTANT ====================
        class AIAssistant {
            constructor() {
                this.trigger = document.getElementById('aiChatTrigger');
                this.widget = document.getElementById('aiChatWidget');
                this.messagesContainer = document.getElementById('aiChatMessages');
                this.inputField = document.getElementById('aiInputField');
                this.sendBtn = document.getElementById('aiSendBtn');
                this.suggestions = document.querySelectorAll('.ai-suggestion');

                this.knowledgeBase = {
                    'projects': 'Snehasish has completed several impressive projects:\n1. Personal Portfolio Website - A modern portfolio with HTML5, CSS3, and JavaScript\n2. Marku SGPA Calculator - A student GPA calculator tool\n3. ChhatroBondhu - An academic assistant platform\nWould you like more details about any specific project?',
                    'skills': 'Snehasish is proficient in:\n☕ Java\n🌐 HTML5\n🎨 CSS3\n⚡ JavaScript\n🔧 C Programming\n📱 Git & GitHub\n🧮 Data Structures\n🔍 Algorithms\n💻 VS Code\nAnd many more technologies!',
                    'education': 'Snehasish is pursuing B.Tech in Information Technology at Narula Institute of Technology.\n📊 Current CGPA: 8.41 (1st Year)\n📍 Currently in 2nd Year\n🎓 Expected Graduation: 2028\nHe also has excellent scores in his 10th and 12th exams.',
                    'contact': 'You can reach Snehasish through:\n📱 Phone: +91 7908242467\n✉️ Email: snehasishdey02@gmail.com\n📍 Location: Kolkata, West Bengal, India\n💼 LinkedIn: linkedin.com/in/snehasish-dey-821b7732a\n💻 GitHub: github.com/Snehasish-tech'
                };

                this.init();
            }

            init() {
                this.trigger.addEventListener('click', () => this.toggleWidget());
                this.sendBtn.addEventListener('click', () => this.sendMessage());
                this.inputField.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });

                this.suggestions.forEach(suggestion => {
                    suggestion.addEventListener('click', () => {
                        const question = suggestion.getAttribute('data-question');
                        this.inputField.value = question;
                        this.sendMessage();
                    });
                });
            }

            toggleWidget() {
                this.widget.classList.toggle('active');
            }

            sendMessage() {
                const message = this.inputField.value.trim();
                if (!message) return;

                this.addMessage(message, 'user');
                this.inputField.value = '';

                setTimeout(() => this.respondToMessage(message), 500);
            }

            addMessage(text, type) {
                const messageEl = document.createElement('div');
                messageEl.classList.add('ai-message');
                if (type === 'user') messageEl.classList.add('user-message');
                messageEl.textContent = text;
                this.messagesContainer.appendChild(messageEl);
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }

            respondToMessage(message) {
                const lowerMessage = message.toLowerCase();
                let response = "I didn't quite understand that. Ask me about Snehasish's projects, skills, education, or how to contact him!";

                for (const [key, value] of Object.entries(this.knowledgeBase)) {
                    if (lowerMessage.includes(key) || lowerMessage.includes(key.slice(0, -1))) {
                        response = value;
                        break;
                    }
                }

                this.addMessage(response, 'ai');
            }
        }

        // ==================== INIT ALL EFFECTS ====================
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize 3D card effect
            init3DCards();

            // Initialize parallax effect
            initParallax();

            // Initialize stagger animation for skills
            initStaggerAnimation();

            // Initialize AI Assistant
            new AIAssistant();

            // Add scroll-reveal class to elements (except hero which is visible on load)
            const sections = document.querySelectorAll('section:not(.hero)');
            sections.forEach(section => {
                section.classList.add('scroll-reveal');
            });

            const cards = document.querySelectorAll('.project-card, .certificate-card, .stat-card, .experience-item');
            cards.forEach(card => {
                card.classList.add('scroll-reveal');
            });

            // Initialize scroll reveal animations after adding classes
            initScrollReveal();
        });

        // ==================== SCROLL EFFECTS ====================
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            document.getElementById('progressBar').style.width = scrolled + '%';

            // Show/hide back to top button
            const backToTop = document.getElementById('backToTop');
            if (scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }

            // Add shadow to navbar on scroll
            const navbar = document.getElementById('navbar');
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Mouse track parallax
            const parallaxBg = document.querySelector('.hero::before');
            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${scrollTop * 0.3}px)`;
            }
        });

        // ==================== HAMBURGER MENU ====================
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        function closeMenu() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // ==================== CURSOR GLOW EFFECT ====================
        document.addEventListener('mousemove', (e) => {
            const glow = document.createElement('div');
            glow.style.position = 'fixed';
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
            glow.style.width = '20px';
            glow.style.height = '20px';
            glow.style.borderRadius = '50%';
            glow.style.pointerEvents = 'none';
            glow.style.background = 'radial-gradient(circle, rgba(0, 102, 255, 0.3) 0%, transparent 70%)';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.zIndex = '1';
            document.body.appendChild(glow);

            setTimeout(() => glow.remove(), 1000);
        });

        // ==================== STAGGER ANIMATION ====================
function initStaggerAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.08) + 's';
        
        // Animate the level fill bars when skill card comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const levelFill = entry.target.querySelector('.level-fill');
                    if (levelFill) {
                        const width = levelFill.style.width;
                        levelFill.style.width = '0';
                        setTimeout(() => {
                            levelFill.style.width = width;
                        }, 100);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}
// ===============================
// Resume PDF Download Function
// ===============================
function downloadResume() {
    const pdfUrl = "resume/Snehasish_Dey_Resume.pdf";

    try {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "Snehasish_Dey_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showDownloadFeedback();
    } catch (error) {
        console.error("Download failed:", error);
        showNotification("❌ Download failed. Please try again.", "error");
    }
}

// ===============================
// Button Feedback Animation
// ===============================
function showDownloadFeedback() {
    const btn = document.querySelector(".download-btn");
    if (!btn) return;

    const originalText = btn.textContent;

    btn.textContent = "✅ Downloaded!";
    btn.style.background = "linear-gradient(45deg, #4caf50, #45a049)";
    btn.style.transform = "scale(0.95)";

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.style.transform = "";
    }, 2500);

    showNotification("📄 Resume downloaded successfully!", "success");
}

// ===============================
// Notification Popup Function
// ===============================
function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.textContent = message;

    notification.style.position = "fixed";
    notification.style.bottom = "30px";
    notification.style.right = "30px";
    notification.style.padding = "12px 18px";
    notification.style.borderRadius = "8px";
    notification.style.color = "#fff";
    notification.style.fontSize = "14px";
    notification.style.zIndex = "1000";
    notification.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
    notification.style.transition = "opacity 0.3s ease";

    if (type === "success") {
        notification.style.background = "#4caf50";
    } else {
        notification.style.background = "#f44336";
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2500);
}
