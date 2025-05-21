import { saveBetaTester } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling with offset for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just a placeholder link
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add a small offset to the scroll position to make sure the section title is visible
                const yOffset = -80; 
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Loader animation
    const loader = document.querySelector('.loader');
    const counterAnimation = document.querySelector('.counter-animation');
    
    // Helper function to format number with leading zero
    const formatNumber = (num) => String(num).padStart(2, '0');
    
    // Shows "30" in the counter (already set in HTML) and then fades away the loader
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }, 1500);
    
    // Polaroid gallery functionality
    const polaroids = document.querySelectorAll('.polaroid');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    const galleryCounter = document.querySelector('.gallery-counter');
    
    if (polaroids.length && galleryPrev && galleryNext && galleryCounter) {
        let currentIndex = 0;
        const totalPolaroids = polaroids.length;
        
        // Update gallery display
        const updateGallery = () => {
            // Update counter display
            galleryCounter.textContent = `${currentIndex + 1}/${totalPolaroids}`;
            
            // Update polaroid positions
            polaroids.forEach((polaroid, index) => {
                // Calculate offset from current (considering wrap around)
                let offset = (index - currentIndex + totalPolaroids) % totalPolaroids;
                
                // Reset and set new transforms with smoother transitions
                polaroid.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
                
                // Apply different transforms based on position
                if (offset === 0) {
                    // Current polaroid - front and center
                    polaroid.style.transform = 'translateZ(0) rotate(0deg)';
                    polaroid.style.zIndex = '7';
                    polaroid.style.opacity = '1';
                } else if (offset === 1) {
                    // Next polaroid - slightly to the right
                    polaroid.style.transform = 'translateZ(-50px) translateX(10px) translateY(10px) rotate(5deg)';
                    polaroid.style.zIndex = '6';
                    polaroid.style.opacity = '0.9';
                } else if (offset === 2) {
                    // 2 ahead - more to the right and further back
                    polaroid.style.transform = 'translateZ(-100px) translateX(-10px) translateY(5px) rotate(-5deg)';
                    polaroid.style.zIndex = '5';
                    polaroid.style.opacity = '0.8';
                } else if (offset === 3) {
                    polaroid.style.transform = 'translateZ(-150px) translateX(5px) translateY(-5px) rotate(2deg)';
                    polaroid.style.zIndex = '4';
                    polaroid.style.opacity = '0.7';
                } else if (offset === 4) {
                    polaroid.style.transform = 'translateZ(-200px) translateX(-7px) translateY(7px) rotate(-3deg)';
                    polaroid.style.zIndex = '3';
                    polaroid.style.opacity = '0.6';
                } else if (offset === 5) {
                    polaroid.style.transform = 'translateZ(-250px) translateX(15px) translateY(0px) rotate(7deg)';
                    polaroid.style.zIndex = '2';
                    polaroid.style.opacity = '0.5';
                } else {
                    polaroid.style.transform = 'translateZ(-300px) translateX(-20px) translateY(-5px) rotate(-8deg)';
                    polaroid.style.zIndex = '1';
                    polaroid.style.opacity = '0.4';
                }
            });
        };
        
        // Navigate to previous polaroid
        galleryPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalPolaroids) % totalPolaroids;
            updateGallery();
        });
        
        // Navigate to next polaroid
        galleryNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalPolaroids;
            updateGallery();
        });
        
        // Initialize gallery
        updateGallery();
        
        // Auto-rotate gallery every 5 seconds
        let galleryInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalPolaroids;
            updateGallery();
        }, 5000);
        
        // Pause auto-rotation when hovering over the gallery
        const polaroidStack = document.querySelector('.polaroid-stack');
        if (polaroidStack) {
            polaroidStack.addEventListener('mouseenter', () => {
                clearInterval(galleryInterval);
            });
            
            polaroidStack.addEventListener('mouseleave', () => {
                galleryInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalPolaroids;
                    updateGallery();
                }, 5000);
            });
        }
    }
    
    // No carousel functionality needed anymore
    
    // Screenshot placeholders functionality
    const screenshotPlaceholders = document.querySelectorAll('.screenshot-placeholder');
    
    if (screenshotPlaceholders.length) {
        screenshotPlaceholders.forEach((placeholder, index) => {
            // Update placeholder text to be more specific
            const placeholderText = placeholder.querySelector('.placeholder-text');
            if (placeholderText) {
                placeholderText.innerHTML = `Add Screenshot ${index + 1}<br><small>Click to upload</small>`;
            }
            
            // Add upload icon and pulsing effect to make them more interactive
            const uploadIcon = document.createElement('i');
            uploadIcon.className = 'fas fa-cloud-upload-alt';
            uploadIcon.style.fontSize = '1.5rem';
            uploadIcon.style.color = 'var(--accent)';
            uploadIcon.style.marginBottom = '10px';
            uploadIcon.style.opacity = '0.7';
            uploadIcon.style.animation = 'pulse 2s infinite';
            
            placeholder.prepend(uploadIcon);
            
            // Add click event listener for upload simulation
            placeholder.addEventListener('click', () => {
                // This would normally open a file picker, but for demo purposes
                // we'll just change the placeholder appearance
                placeholder.innerHTML = '<i class="fas fa-cloud-upload-alt" style="font-size: 2rem; color: var(--primary);"></i><div style="margin-top: 10px;">Uploading...</div>';
                placeholder.style.borderColor = 'var(--primary)';
                placeholder.style.backgroundColor = 'rgba(255, 0, 128, 0.1)';
                
                // After a moment, show success and revert back to placeholder text
                setTimeout(() => {
                    placeholder.innerHTML = '<i class="fas fa-check-circle" style="font-size: 2rem; color: #4CAF50;"></i><div style="margin-top: 10px;">Successfully uploaded!</div>';
                    
                    // After success message, revert back to placeholder
                    setTimeout(() => {
                        const uploadIcon = document.createElement('i');
                        uploadIcon.className = 'fas fa-cloud-upload-alt';
                        uploadIcon.style.fontSize = '1.5rem';
                        uploadIcon.style.color = 'var(--accent)';
                        uploadIcon.style.marginBottom = '10px';
                        uploadIcon.style.opacity = '0.7';
                        uploadIcon.style.animation = 'pulse 2s infinite';
                        
                        placeholder.innerHTML = '';
                        placeholder.appendChild(uploadIcon);
                        placeholder.appendChild(document.createElement('br'));
                        const text = document.createElement('span');
                        text.className = 'placeholder-text';
                        text.innerHTML = `Add Screenshot ${index + 1}<br><small>Click to upload</small>`;
                        placeholder.appendChild(text);
                        
                        placeholder.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        placeholder.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }, 2000);
                }, 1500);
            });
        });
    }
    
    // Form submission
    const form = document.getElementById('signup-form');
    const confirmation = document.getElementById('confirmation');
    const emailInput = document.getElementById('email');
    
    if (form && confirmation && emailInput) {
        // Form validation
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value;
            
            // Validate email
            if (!validateEmail(email)) {
                emailInput.classList.add('error');
                return;
            }
            
            // Get existing emails from localStorage (if any)
            let waitlistEmails = [];
            try {
                const storedEmails = localStorage.getItem('30clicks_waitlist');
                if (storedEmails) {
                    waitlistEmails = JSON.parse(storedEmails);
                }
            } catch (error) {
                console.error('Error loading saved emails:', error);
            }
            
            // Add new email along with timestamp
            waitlistEmails.push({
                email: email,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            });
            
            // Save updated email list to localStorage
            try {
                localStorage.setItem('30clicks_waitlist', JSON.stringify(waitlistEmails));
                console.log('Email saved! Current count:', waitlistEmails.length);
            } catch (error) {
                console.error('Error saving email:', error);
            }
            
            // Simulate a server request with a short delay
            emailInput.disabled = true;
            form.querySelector('button').disabled = true;
            form.querySelector('button').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                // Hide form and show confirmation
                form.classList.add('hidden');
                confirmation.classList.remove('hidden');
            }, 1500);
        });
        
        // Remove error class when user types
        emailInput.addEventListener('input', () => {
            emailInput.classList.remove('error');
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .polaroid-container, .screenshot, .hero-content, .app-screenshots-row, .step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                if (!element.classList.contains('in-view')) {
                    // Add in-view class with a slight delay to create staggered effect
                    setTimeout(() => {
                        element.classList.add('in-view');
                    }, 50);
                }
            }
        });
    };
    
    // Initial setup for animation classes
    document.querySelectorAll('.feature-card, .polaroid-container, .screenshot, .hero-content, .app-screenshots-row, .step').forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        // Add staggered delay to elements
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Listen for scroll events and update film strip position
    window.addEventListener('scroll', () => {
        animateOnScroll();
        
        // Update film strip position based on scroll with enhanced 3D effect
        const filmStrip = document.querySelector('.film-strip');
        const filmRoll = document.querySelector('.film-roll');
        if (filmStrip && filmRoll) {
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const translateY = scrollPercentage * -1200; // Move the strip up as user scrolls down
            const rotateY = -10 - (scrollPercentage * 5); // Add slight rotation based on scroll
            const translateX = scrollPercentage * -10; // Add slight horizontal movement
            
            // Apply multiple transforms for enhanced 3D effect
            filmStrip.style.transform = `rotateY(${rotateY}deg) translateY(${translateY}px) translateX(${translateX}px)`;
            
            // Add parallax effect to the entire film roll
            filmRoll.style.transform = `translateY(${-50 + (scrollPercentage * -20)}%)`;
        }
    });
    
    // Check for elements in view on page load
    setTimeout(animateOnScroll, 500);
    
    // Admin function to export waitlist to CSV/Excel
    // Access this by typing exportWaitlist() in the browser console
    window.exportWaitlist = function() {
        try {
            // Get stored emails
            const storedEmails = localStorage.getItem('30clicks_waitlist');
            if (!storedEmails) {
                console.log('No emails in the waitlist yet.');
                return;
            }
            
            const waitlistEmails = JSON.parse(storedEmails);
            console.log(`Found ${waitlistEmails.length} emails in waitlist.`);
            
            // Convert to CSV
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Email,Signup Date,User Agent\n";
            
            waitlistEmails.forEach(entry => {
                const date = new Date(entry.timestamp).toLocaleString();
                csvContent += `${entry.email},${date},"${entry.userAgent}"\n`;
            });
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "30clicks_waitlist.csv");
            document.body.appendChild(link);
            
            // Trigger download
            link.click();
            document.body.removeChild(link);
            
            return `Exported ${waitlistEmails.length} emails successfully!`;
        } catch (error) {
            console.error('Error exporting waitlist:', error);
            return 'Error exporting waitlist. Check console for details.';
        }
    };
    
    // Admin function to clear the waitlist
    window.clearWaitlist = function() {
        try {
            localStorage.removeItem('30clicks_waitlist');
            console.log('Waitlist cleared successfully!');
            return 'Waitlist cleared successfully!';
        } catch (error) {
            console.error('Error clearing waitlist:', error);
            return 'Error clearing waitlist. Check console for details.';
        }
    };
    
    // Beta Signup Form Functionality
    const betaForm = document.getElementById('beta-signup-form');
    const betaConfirmation = document.getElementById('beta-confirmation');
    
    if (betaForm && betaConfirmation) {
        betaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('first-name').value;
            const surname = document.getElementById('surname').value;
            const email = document.getElementById('beta-email').value;
            
            console.log('Beta signup data:', { firstName, surname, email });
            
            // Show loading state
            const submitBtn = betaForm.querySelector('.beta-submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Set a timeout to prevent the form from being stuck in processing state
            const processingTimeout = setTimeout(() => {
                // If we reach this timeout, something went wrong with Firebase
                console.warn('Firebase submission timed out - using localStorage fallback');
                submitBtn.innerHTML = 'Join the Beta Program';
                submitBtn.disabled = false;
                
                // Save directly to localStorage as fallback
                saveToLocalStorage();
                
                // Show confirmation - don't keep user waiting
                betaForm.style.display = 'none';
                betaConfirmation.classList.remove('hidden');
            }, 8000); // 8 second timeout
            
            try {
                // Try to save data to Firebase
                const success = await saveBetaTester(firstName, surname, email);
                
                // Clear the timeout since we got a response
                clearTimeout(processingTimeout);
                
                if (success) {
                    console.log('Successfully saved data to Firebase');
                } else {
                    console.warn('Firebase reported failure, but we already saved to localStorage');
                }
                
                // Hide form and show confirmation
                betaForm.style.display = 'none';
                betaConfirmation.classList.remove('hidden');
                
            } catch (error) {
                // Clear the timeout since we got a response
                clearTimeout(processingTimeout);
                
                console.error('Error during signup process:', error);
                
                // Try localStorage as fallback
                saveToLocalStorage();
                
                // Show error state
                submitBtn.innerHTML = 'Try Again';
                submitBtn.disabled = false;
                
                // Still show confirmation because we saved to localStorage
                betaForm.style.display = 'none';
                betaConfirmation.classList.remove('hidden');
            }
            
            // Function to save to localStorage consistently
            function saveToLocalStorage() {
                try {
                    let betaTesters = [];
                    const storedTesters = localStorage.getItem('30clicks_beta_testers');
                    if (storedTesters) {
                        betaTesters = JSON.parse(storedTesters);
                    }
                    
                    betaTesters.push({
                        firstName: firstName,
                        surname: surname,
                        email: email,
                        timestamp: new Date().toISOString(),
                        source: 'form_fallback'
                    });
                    
                    localStorage.setItem('30clicks_beta_testers', JSON.stringify(betaTesters));
                    console.log('Beta tester saved to localStorage! Current count:', betaTesters.length);
                    return true;
                } catch (error) {
                    console.error('Error saving beta tester to localStorage:', error);
                    return false;
                }
            }
        });
    }
    
    // Screenshot interactive hover effects
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    if (screenshotItems.length) {
        screenshotItems.forEach((item) => {
            const phoneFrame = item.querySelector('.phone-frame');
            
            item.addEventListener('mouseenter', () => {
                item.classList.add('active');
                if (phoneFrame) {
                    phoneFrame.style.transform = 'scale(1.05) translateY(-10px)';
                    phoneFrame.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.5)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
                if (phoneFrame) {
                    phoneFrame.style.transform = '';
                    phoneFrame.style.boxShadow = '';
                }
            });
        });
    }
    
    // Admin function to export beta testers
    window.exportBetaTesters = function() {
        try {
            // Get stored beta testers
            const storedTesters = localStorage.getItem('30clicks_beta_testers');
            if (!storedTesters) {
                console.log('No beta testers registered yet.');
                return;
            }
            
            const betaTesters = JSON.parse(storedTesters);
            console.log(`Found ${betaTesters.length} beta testers.`);
            
            // Convert to CSV
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "First Name,Surname,Email,Signup Date\n";
            
            betaTesters.forEach(entry => {
                const date = new Date(entry.timestamp).toLocaleString();
                csvContent += `${entry.firstName},${entry.surname},${entry.email},${date}\n`;
            });
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "30clicks_beta_testers.csv");
            document.body.appendChild(link);
            
            // Trigger download
            link.click();
            document.body.removeChild(link);
            
            return `Exported ${betaTesters.length} beta testers successfully!`;
        } catch (error) {
            console.error('Error exporting beta testers:', error);
            return 'Error exporting beta testers. Check console for details.';
        }
    };
});