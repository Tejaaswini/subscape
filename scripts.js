document.addEventListener("DOMContentLoaded", function () {
    const subscriptionsContainer = document.getElementById("subscriptions");

    // Mock JSON data
    const subscriptionsData = {
        subscriptions: [
            {
                uuid: "456789",
                name: "Netflix",
                url: "https://www.netflix.com",
                settings_url: "https://www.netflix.com/settings",
                plan: "monthly",
                start_date: "2024-04-01",
                cost: 12.99,
                icon: "https://static-00.iconduck.com/assets.00/netflix-icon-icon-2048x2048-yj41gpvr.png",
                next_payment_date: "24 April 2024",
            },
            {
                uuid: "123456",
                name: "Prime",
                url: "https://www.amazon.com/prime",
                settings_url: "https://www.amazon.com/prime/settings",
                plan: "annual",
                start_date: "2024-03-15",
                cost: 119.99,
                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Amazon_Prime_Video_blue_logo_1.svg/2048px-Amazon_Prime_Video_blue_logo_1.svg.png",
                next_payment_date: "15 March 2025",
            },
            {
                uuid: "987654",
                name: "Hulu",
                url: "https://www.hulu.com",
                settings_url: "https://www.hulu.com/settings",
                plan: "monthly",
                start_date: "2024-02-20",
                cost: 5.99,
                icon: "https://d12jofbmgge65s.cloudfront.net/wp-content/uploads/2023/02/tech-guide_header-image-hulu.webp",
                next_payment_date: "20 February 2024",
            },
            {
                uuid: "654321",
                name: "F1 TV",
                url: "https://www.formula1.com/en/subscribe-to-f1.html",
                settings_url: "https://www.formula1.com/en/account",
                plan: "annual",
                start_date: "2024-01-10",
                cost: 79.99,
                icon: "https://mir-s3-cdn-cf.behance.net/projects/404/7aab22159615505.Y3JvcCwyMDIwLDE1ODAsMCww.png",
                next_payment_date: "10 January 2025",
            },
        ],
    };

    function generateSubscriptionCard(subscription) {
        const card = document.createElement("div");
        card.classList.add("card");

        const icon = document.createElement("img");
        icon.classList.add("subscription-icon");
        icon.src = subscription.icon;

        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("subscription-details-container");

        const nameAndPlanContainer = document.createElement("div");
        nameAndPlanContainer.classList.add("name-and-plan-container");

        const name = document.createElement("div");
        name.classList.add("subscription-name");
        name.textContent = subscription.name;

        const plan = document.createElement("div"); // New element for plan
        plan.classList.add("subscription-plan");
        plan.textContent = `${subscription.plan}`; // Display plan value

        nameAndPlanContainer.appendChild(name);
        nameAndPlanContainer.appendChild(plan);

        const cost = document.createElement("div");
        cost.classList.add("subscription-cost");
        cost.textContent = `$${subscription.cost}`;

        const nextPaymentDate = document.createElement("div");
        nextPaymentDate.classList.add("subscription-next-payment-date");
        nextPaymentDate.textContent = `${subscription.next_payment_date}`;

        const nextPaymentLabel = document.createElement("div"); // New element for next payment label
        nextPaymentLabel.classList.add("next-payment-label");
        nextPaymentLabel.textContent = "Next Payment"; // Display label

        const settingsBtn = document.createElement("button");
        settingsBtn.classList.add("settings-btn");
        settingsBtn.textContent = "";
        settingsBtn.addEventListener("click", function (event) {
            const dropdown = document.createElement("div");
            dropdown.classList.add("settings-dropdown");
            dropdown.innerHTML = `
                <a href="#" onclick="window.open('${subscription.settings_url}', '_blank')">Details</a>
                <a href="#">Delete</a>
            `;
            detailsContainer.appendChild(dropdown);

            // Close dropdown when clicking outside
            document.addEventListener("click", function (e) {
                if (!detailsContainer.contains(e.target)) {
                    dropdown.remove();
                }
            });

            event.stopPropagation();
        });

        detailsContainer.appendChild(icon);
        detailsContainer.appendChild(nameAndPlanContainer);
        detailsContainer.appendChild(cost);
        const dateContainer = document.createElement("div"); // Create date container
        dateContainer.classList.add("subscription-date-container");
        dateContainer.appendChild(nextPaymentDate);
        dateContainer.appendChild(nextPaymentLabel); // Append label to date container
        detailsContainer.appendChild(dateContainer); // Append date container to details container
        detailsContainer.appendChild(settingsBtn);

        card.appendChild(detailsContainer);

        return card;
    }

    // Generate subscription cards
    subscriptionsData.subscriptions.forEach((subscription) => {
        const card = generateSubscriptionCard(subscription);
        subscriptionsContainer.appendChild(card);
    });
});

// JavaScript for dark mode toggle
const darkModeToggle = document.getElementById('mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    const settingsBtns = document.querySelectorAll('.settings-btn');
    settingsBtns.forEach((btn) => {
        btn.classList.toggle('light-mode');
    });
});
