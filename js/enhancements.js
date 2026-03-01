// ========== AMÉLIORATIONS UI ==========

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Détection et correction des problèmes de responsive
    function checkResponsiveIssues() {
        const width = window.innerWidth;
        const issues = [];

        if (width <= 768) {
            // Vérifier les éléments qui pourraient déborder
            document.querySelectorAll('*').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.width > width) {
                    issues.push({
                        element: el,
                        width: rect.width,
                        message: 'Élément plus large que l\'écran'
                    });
                    
                    // Correction automatique
                    el.style.maxWidth = '100%';
                    el.style.overflowX = 'auto';
                }
            });
        }

        if (issues.length > 0) {
            console.log('Problèmes responsive détectés :', issues);
        }
    }

    // 2. Optimisation des performances d'affichage
    function optimizeRendering() {
        // Utiliser requestAnimationFrame pour les animations
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // Appliquer les effets au scroll
                    document.querySelectorAll('.stat-card').forEach(card => {
                        const rect = card.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        
                        if (isVisible) {
                            card.style.transform = `translateY(${Math.min(0, (rect.top - window.innerHeight) * 0.1)}px)`;
                        }
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }

    // 3. Amélioration de l'accessibilité
    function enhanceAccessibility() {
        // Ajouter des attributs ARIA
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.setAttribute('role', 'region');
            card.setAttribute('aria-label', `Statistique ${index + 1}`);
        });

        // Améliorer la navigation au clavier
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
    }

    // 4. Correction des contrastes
    function checkContrast() {
        const elements = document.querySelectorAll('*');
        
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const bgColor = style.backgroundColor;
            
            // Cette fonction nécessiterait une bibliothèque pour calculer le contraste
            // Simulation simple ici
            if (color === 'rgb(255, 255, 255)' && bgColor === 'rgb(255, 255, 255)') {
                console.warn('Problème de contraste détecté sur :', el);
            }
        });
    }

    // 5. Gestion du mode sombre
    function handleDarkMode() {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        function toggleDarkMode(e) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
        
        darkModeMediaQuery.addListener(toggleDarkMode);
        toggleDarkMode(darkModeMediaQuery);
    }

    // 6. Optimisation des images
    function optimizeImages() {
        document.querySelectorAll('img').forEach(img => {
            // Ajouter lazy loading
            img.loading = 'lazy';
            
            // Ajouter des dimensions si manquantes
            if (!img.width && !img.height) {
                img.onload = function() {
                    if (!img.width) {
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                    }
                };
            }
        });
    }

    // 7. Gestion des erreurs d'affichage
    function handleDisplayErrors() {
        // Vérifier les flexbox bugs
        const flexContainers = document.querySelectorAll('[style*="display: flex"]');
        
        flexContainers.forEach(container => {
            const children = container.children;
            let totalWidth = 0;
            
            Array.from(children).forEach(child => {
                totalWidth += child.offsetWidth;
            });
            
            if (totalWidth > container.offsetWidth) {
                console.warn('Débordement flexbox détecté dans :', container);
                container.style.flexWrap = 'wrap';
            }
        });
    }

    // 8. Animation de chargement
    function addLoadingStates() {
        // Simuler un chargement pour les données
        const statsCards = document.querySelectorAll('.stat-card');
        
        statsCards.forEach(card => {
            card.classList.add('loading');
            
            setTimeout(() => {
                card.classList.remove('loading');
            }, 1000);
        });
    }

    // 9. Correction des marges et paddings
    function fixSpacing() {
        // Uniformiser les espacements
        const containers = document.querySelectorAll('.main-content, .stats-grid, .recent-activity');
        
        containers.forEach(container => {
            const style = window.getComputedStyle(container);
            
            if (style.paddingLeft === '0px' && style.paddingRight === '0px') {
                container.style.paddingLeft = '1rem';
                container.style.paddingRight = '1rem';
            }
        });
    }

    // 10. Amélioration des formulaires
    function enhanceForms() {
        document.querySelectorAll('input, textarea, select').forEach(field => {
            // Ajouter validation en temps réel
            field.addEventListener('input', function() {
                if (this.required && !this.value) {
                    this.classList.add('error');
                    this.setAttribute('aria-invalid', 'true');
                } else {
                    this.classList.remove('error');
                    this.setAttribute('aria-invalid', 'false');
                }
            });
            
            // Ajouter des messages d'erreur
            field.addEventListener('invalid', (e) => {
                e.preventDefault();
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Ce champ est requis';
                errorMessage.setAttribute('role', 'alert');
                
                field.parentNode.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            });
        });
    }

    // Initialiser toutes les améliorations
    function initEnhancements() {
        checkResponsiveIssues();
        optimizeRendering();
        enhanceAccessibility();
        checkContrast();
        handleDarkMode();
        optimizeImages();
        handleDisplayErrors();
        addLoadingStates();
        fixSpacing();
        enhanceForms();
        
        console.log('✅ Toutes les améliorations UI ont été appliquées');
    }

    // Lancer les améliorations
    initEnhancements();

    // Réagir au redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkResponsiveIssues();
            handleDisplayErrors();
        }, 250);
    });
});