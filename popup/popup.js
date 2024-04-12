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
        past_payments: [
          { date: "24 March 2024", amount: 12.99 },
          { date: "24 February 2024", amount: 12.99 },
        ],
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
        past_payments: [
          { date: "24 March 2024", amount: 12.99 },
          { date: "24 February 2024", amount: 12.99 },
        ],
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
        past_payments: [
          { date: "24 March 2024", amount: 12.99 },
          { date: "24 February 2024", amount: 12.99 },
        ],
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
        past_payments: [
          { date: "24 March 2024", amount: 12.99 },
          { date: "24 February 2024", amount: 12.99 },
        ],
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

    const plan = document.createElement("div");
    plan.classList.add("subscription-plan");
    plan.textContent = `${subscription.plan}`;

    nameAndPlanContainer.appendChild(name);
    nameAndPlanContainer.appendChild(plan);

    const cost = document.createElement("div");
    cost.classList.add("subscription-cost");
    cost.textContent = `$${subscription.cost}`;

    const nextPaymentDate = document.createElement("div");
    nextPaymentDate.classList.add("subscription-next-payment-date");
    nextPaymentDate.textContent = `${subscription.next_payment_date}`;

    const nextPaymentLabel = document.createElement("div");
    nextPaymentLabel.classList.add("next-payment-label");
    nextPaymentLabel.textContent = "Next Payment";

    const settingsBtn = document.createElement("button");
    settingsBtn.classList.add("settings-btn");
    settingsBtn.textContent = "";
    settingsBtn.addEventListener("click", function (event) {
      document.querySelectorAll(".settings-dropdown").forEach((dropdown) => {
        dropdown.remove();
      });

      const dropdown = document.createElement("div");
      dropdown.classList.add("settings-dropdown");
      dropdown.innerHTML = `
                <a href="${subscription.settings_url}" target="_blank"><img src="deets.png" alt="Details" />Details</a>
                <a href="#"><img src="delete.png" alt="Delete" />Delete</a>
            `;

      const cardRect = card.getBoundingClientRect();
      dropdown.style.top = `${cardRect.bottom - 30}px`;
      document.body.appendChild(dropdown);

      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
          dropdown.remove();
        }
      });

      event.stopPropagation();
    });

    detailsContainer.appendChild(icon);
    detailsContainer.appendChild(nameAndPlanContainer);
    detailsContainer.appendChild(cost);
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("subscription-date-container");
    dateContainer.appendChild(nextPaymentDate);
    dateContainer.appendChild(nextPaymentLabel);
    detailsContainer.appendChild(dateContainer);
    detailsContainer.appendChild(settingsBtn);

    const pastPaymentsContainer = document.createElement("div");
    pastPaymentsContainer.classList.add("past-payments-container");

    const pastPaymentsList = document.createElement("ul");
    pastPaymentsList.classList.add("past-payments-list");


    const title = document.createElement("h3");
    title.textContent = "Payment History";
    pastPaymentsList.appendChild(title);
    
    // Iterate over past payments and create list items for each payment
    subscription.past_payments.forEach((payment) => {
      const paymentItem = document.createElement("li");
      paymentItem.textContent = `Amount: $${payment.amount} was paid on ${payment.date}`;
      pastPaymentsList.appendChild(paymentItem);
    });
    pastPaymentsContainer.appendChild(pastPaymentsList);

    card.appendChild(detailsContainer);
    card.appendChild(pastPaymentsContainer);

    // Toggle function for past payments accordion
    function togglePastPayments() {
      const pastPaymentsList = card.querySelector(".past-payments-list");
      pastPaymentsList.classList.toggle("show");
    }

    // Add click event listener to card for toggling past payments
    card.addEventListener("click", togglePastPayments);

    return card;
  }

  subscriptionsData.subscriptions.forEach((subscription) => {
    const card = generateSubscriptionCard(subscription);
    subscriptionsContainer.appendChild(card);
  });

  const darkModeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  darkModeToggle.addEventListener("change", () => {
    body.classList.toggle("light-mode");
    const settingsBtns = document.querySelectorAll(".settings-btn");
    settingsBtns.forEach((btn) => {
      btn.classList.toggle("light-mode");
    });
  });

  const landingContainer = document.querySelector(".landing-container");
  const loginBtn = document.getElementById("login-btn");
  const loginForm = document.getElementById("login-form");
  const mainContainer = document.querySelector(".main-container");

  // Hide landing container and show login form when login button is clicked
  loginBtn.addEventListener("click", function () {
    landingContainer.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Handle form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Perform login authentication here

    // Assuming authentication is successful
    // Hide login form and landing container, and show manage subscription page
    loginForm.classList.add("hidden");
    landingContainer.classList.add("hidden");
    mainContainer.classList.add("show");
    // Hide other elements
  document.body.classList.add("manage-subscriptions-active");
  });
});

