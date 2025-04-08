        // Update clock in real-time with animation
        function updateClock() {
            const now = new Date();
            const timeElement = document.getElementById('current-time');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            
            // Add animation class
            timeElement.classList.add('time-update');
            setTimeout(() => {
                timeElement.classList.remove('time-update');
            }, 500);
            
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;

            // Update greeting based on time of day
            const greetingElement = document.getElementById('greeting');
            if (hours < 12) {
                greetingElement.textContent = 'Good morning with SRI Bot';
            } else if (hours < 18) {
                greetingElement.textContent = 'Good afternoon with SRI Bot';
            } else {
                greetingElement.textContent = 'Good evening with SRI Bot';
            }
        }
        
        //Visitor-count
        fetch("https://visitor.api.akuari.my.id/umum/view/tambah?id=Waluka")
       .then((response) => response.json())
       .then((data) => {
        const visitorCount = data?.visitor?.total; 
        const visitorCountTdy = data?.visitor?.hari; 
        if (visitorCount !== undefined) {
        document.getElementById("visitor-count").innerText = visitorCountTdy;
        document.getElementById("total-requests").innerText = visitorCount;
        } else {
        console.error("Visitor count not available.");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

        // Update last updated date to current date
        document.getElementById('last-updated').textContent = new Date().toISOString().split('T')[0];

        // Initialize clock and update every second
        updateClock();
        setInterval(updateClock, 1000);

        // Simulate changing system health for demo purposes
        setInterval(() => {
            const batteryFill = document.querySelector('.battery-fill');
            const batteryValue = document.querySelector('.battery .value');
            const batteryStatus = document.querySelector('.battery-status');
            const randomHealth = Math.floor(Math.random() * 20) + 80; // Random between 80-100
            
            batteryFill.style.width = `${randomHealth}%`;
            batteryValue.textContent = `${randomHealth}%`;
            
            if (randomHealth > 90) {
                batteryStatus.textContent = "Optimal performance";
            } else if (randomHealth > 75) {
                batteryStatus.textContent = "Good condition";
            } else {
                batteryStatus.textContent = "Needs attention";
            }
        }, 5000);

        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');

        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(event.target) && 
                !mobileMenuBtn.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });

        // Keep your existing JavaScript functions here
        
        // Chat Toggle Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const chatToggleBtn = document.getElementById('chatToggleBtn');
            const chatWindow = document.getElementById('chatWindow');
            const chatHeader = document.getElementById('chatHeader');
            const closeChat = document.getElementById('closeChat');
            const resizeHandle = document.getElementById('resizeHandle');

            // Drag එකට බාධා නොකිරීම සඳහා
            chatHeader.addEventListener('mousedown', function(e) {
                // Close බොත්තම මත ක්ලික් කලහොත් drag නොකිරීම
                if(e.target.closest('.close-btn')) return;
                
                isDragging = true;
                offsetX = e.clientX - chatWindow.getBoundingClientRect().left;
                offsetY = e.clientY - chatWindow.getBoundingClientRect().top;
                chatWindow.style.cursor = 'grabbing';
                e.preventDefault();
            });

                        // Toggle chat window
            chatToggleBtn.addEventListener('click', function() {
                chatWindow.classList.toggle('active');
                chatToggleBtn.classList.toggle('active');
            });

            

            // Make window draggable
            let isDragging = false;
            let offsetX, offsetY;

            chatHeader.addEventListener('mousedown', function(e) {
                isDragging = true;
                offsetX = e.clientX - chatWindow.getBoundingClientRect().left;
                offsetY = e.clientY - chatWindow.getBoundingClientRect().top;
                chatWindow.style.cursor = 'grabbing';
                e.preventDefault();
            });

            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                // Calculate new position
                let newLeft = e.clientX - offsetX;
                let newTop = e.clientY - offsetY;
                
                // Keep window within viewport
                newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - chatWindow.offsetWidth));
                newTop = Math.max(0, Math.min(newTop, window.innerHeight - chatWindow.offsetHeight));
                
                chatWindow.style.left = newLeft + 'px';
                chatWindow.style.top = newTop + 'px';
            });

            document.addEventListener('mouseup', function() {
                isDragging = false;
                chatWindow.style.cursor = '';
            });

            // Make window resizable
            let isResizing = false;
            let startWidth, startHeight, startX, startY;

            resizeHandle.addEventListener('mousedown', function(e) {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(document.defaultView.getComputedStyle(chatWindow).width, 10);
                startHeight = parseInt(document.defaultView.getComputedStyle(chatWindow).height, 10);
                e.preventDefault();
            });

            document.addEventListener('mousemove', function(e) {
                if (!isResizing) return;
                
                // Calculate new size
                let newWidth = startWidth + (e.clientX - startX);
                let newHeight = startHeight + (e.clientY - startY);
                
                // Set minimum size
                newWidth = Math.max(300, newWidth);
                newHeight = Math.max(200, newHeight);
                
                chatWindow.style.width = newWidth + 'px';
                chatWindow.style.height = newHeight + 'px';
            });

            document.addEventListener('mouseup', function() {
                isResizing = false;
            });

            // Touch support for mobile devices
            chatHeader.addEventListener('touchstart', function(e) {
                isDragging = true;
                const touch = e.touches[0];
                offsetX = touch.clientX - chatWindow.getBoundingClientRect().left;
                offsetY = touch.clientY - chatWindow.getBoundingClientRect().top;
                e.preventDefault();
            });

            document.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                const touch = e.touches[0];
                
                let newLeft = touch.clientX - offsetX;
                let newTop = touch.clientY - offsetY;
                
                newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - chatWindow.offsetWidth));
                newTop = Math.max(0, Math.min(newTop, window.innerHeight - chatWindow.offsetHeight));
                
                chatWindow.style.left = newLeft + 'px';
                chatWindow.style.top = newTop + 'px';
                e.preventDefault();
            });

            document.addEventListener('touchend', function() {
                isDragging = false;
            });

            resizeHandle.addEventListener('touchstart', function(e) {
                isResizing = true;
                const touch = e.touches[0];
                startX = touch.clientX;
                startY = touch.clientY;
                startWidth = parseInt(document.defaultView.getComputedStyle(chatWindow).width, 10);
                startHeight = parseInt(document.defaultView.getComputedStyle(chatWindow).height, 10);
                e.preventDefault();
            });

            document.addEventListener('touchmove', function(e) {
                if (!isResizing) return;
                const touch = e.touches[0];
                
                let newWidth = startWidth + (touch.clientX - startX);
                let newHeight = startHeight + (touch.clientY - startY);
                
                newWidth = Math.max(300, newWidth);
                newHeight = Math.max(200, newHeight);
                
                chatWindow.style.width = newWidth + 'px';
                chatWindow.style.height = newHeight + 'px';
                e.preventDefault();
            });

            document.addEventListener('touchend', function() {
                isResizing = false;
            });
        });