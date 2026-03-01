// ========== FONCTIONNALITÉS PRINCIPALES ==========

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestion du menu mobile (sidebar)
    function setupMobileMenu() {
        // Créer le bouton menu si on est en mobile
        if (window.innerWidth <= 768) {
            const menuButton = document.createElement('button');
            menuButton.className = 'menu-toggle';
            menuButton.innerHTML = '☰';
            menuButton.setAttribute('aria-label', 'Menu');
            
            document.querySelector('.main-header').prepend(menuButton);
            
            menuButton.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
            
            // Fermer le menu en cliquant ailleurs
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
                    document.querySelector('.sidebar').classList.remove('active');
                }
            });
        }
    }

    // 2. Gestion des tâches (checkboxes)
    function setupTaskCheckboxes() {
        document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskItem = this.closest('.task-item');
                if (this.checked) {
                    taskItem.classList.add('completed');
                    showNotification('Tâche complétée ! 🎉');
                } else {
                    taskItem.classList.remove('completed');
                }
            });
        });
    }

    // 3. Système de notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Disparition après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 4. Mise à jour des stats en temps réel (simulation)
    function setupLiveStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        setInterval(() => {
            statNumbers.forEach(stat => {
                if (Math.random() > 0.7) { // 30% de chance de mise à jour
                    const currentValue = parseInt(stat.textContent);
                    const change = Math.floor(Math.random() * 3) + 1;
                    const newValue = currentValue + (Math.random() > 0.5 ? change : -change);
                    
                    if (newValue > 0) {
                        stat.textContent = newValue;
                        
                        // Animation de mise à jour
                        stat.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 200);
                    }
                }
            });
        }, 10000); // Toutes les 10 secondes
    }

    // 5. Gestion du thème (clair/sombre)
    function setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '🌓';
        themeToggle.setAttribute('aria-label', 'Changer le thème');
        
        document.querySelector('.user-info').appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '☀️' : '🌓';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // Restaurer le thème sauvegardé
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '☀️';
        }
    }

    // 6. Animations au scroll
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.stat-card, .activity-item, .task-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            observer.observe(el);
        });
    }

    // 7. Validation des formulaires (si présents)
    function setupFormValidation() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let isValid = true;
                const inputs = form.querySelectorAll('input[required], textarea[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.classList.add('error');
                        
                        // Ajouter message d'erreur
                        let errorMsg = input.nextElementSibling;
                        if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                            errorMsg = document.createElement('span');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Ce champ est requis';
                            input.parentNode.insertBefore(errorMsg, input.nextSibling);
                        }
                    } else {
                        input.classList.remove('error');
                        const errorMsg = input.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.remove();
                        }
                    }
                });
                
                if (isValid) {
                    showNotification('Formulaire envoyé avec succès !');
                    form.reset();
                }
            });
        });
    }

    // 8. Tooltips personnalisés
    function setupTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.target.dataset.tooltip;
                
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                e.target.addEventListener('mouseleave', () => {
                    tooltip.remove();
                }, { once: true });
            });
        });
    }

    // Initialiser toutes les fonctionnalités
    setupMobileMenu();
    setupTaskCheckboxes();
    setupLiveStats();
    setupThemeToggle();
    setupScrollAnimations();
    setupFormValidation();
    setupTooltips();
    
    // Ajouter les styles pour les notifications et tooltips
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: #2ecc71;
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 2000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-error {
            background: #e74c3c;
        }
        
        .menu-toggle {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            display: none;
        }
        
        @media screen and (max-width: 768px) {
            .menu-toggle {
                display: block;
            }
        }
        
        .theme-toggle {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background-color 0.3s;
        }
        
        .theme-toggle:hover {
            background-color: rgba(0,0,0,0.1);
        }
        
        .dark-theme {
            background-color: #1a1a1a;
            color: #f0f0f0;
        }
        
        .dark-theme .main-content {
            background-color: #1a1a1a;
        }
        
        .dark-theme .stat-card,
        .dark-theme .recent-activity,
        .dark-theme .profile-header,
        .dark-theme .profile-details {
            background-color: #2d2d2d;
            color: #f0f0f0;
        }
        
        .skill-item {
            margin-bottom: 1rem;
        }
        
        .skill-bar {
            height: 8px;
            background-color: #e0e0e0;
            border-radius: 4px;
            margin-top: 0.5rem;
            overflow: hidden;
        }
        
        .skill-progress {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .error {
            border: 2px solid #e74c3c !important;
        }
        
        .error-message {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.25rem;
            display: block;
        }
        
        .tooltip {
            position: fixed;
            background: #333;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.85rem;
            pointer-events: none;
            z-index: 3000;
            animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
});
