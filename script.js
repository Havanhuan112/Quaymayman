const wheel = document.getElementById("wheel");
        const spinBtn = document.getElementById("spinBtn");
        const notification = document.getElementById("notification");
        const message = document.getElementById("message");

        let spinsLeft = localStorage.getItem("spinsLeft");
        if (spinsLeft === null) {
            spinsLeft = 2;
            localStorage.setItem("spinsLeft", spinsLeft);
        }

        spinBtn.addEventListener("click", () => {
            if (spinsLeft <= 0) {
                showNotification("Bạn đã hết lượt quay!");
                return;
            }

            const spins = [0, 72, 144, 216, 288];
            const prizes = ["Chúc bạn may mắn lần sau!", "🎉 Chúc mừng! Bạn trúng 10k!", "Chúc bạn may mắn lần sau!", "🎉 Chúc mừng! Bạn trúng 15k!", "Chúc bạn may mắn lần sau!"];
            
            let randomIndex = Math.random();
            if (randomIndex < 0.08) {
                randomIndex = 1; // Trúng 10k
            } else if (randomIndex < 0.16) {
                randomIndex = 3; // Trúng 15k
            } else {
                randomIndex = [0, 2, 4][Math.floor(Math.random() * 3)]; // Thua
            }

            const spinAngle = spins[randomIndex] + (360 * 3);
            wheel.style.transform = `rotate(${spinAngle}deg)`;

            setTimeout(() => {
                showNotification(prizes[randomIndex]);
                spinsLeft--;
                localStorage.setItem("spinsLeft", spinsLeft);
                if (spinsLeft === 0) {
                    spinBtn.disabled = true;
                }
            }, 3000);
        });

        function showNotification(text) {
            message.innerText = text;
            notification.style.display = "block";
        }

        function closeNotification() {
            notification.style.display = "none";
        }