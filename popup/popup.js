document.addEventListener("DOMContentLoaded", function () {
  const subscriptionsContainer = document.getElementById("subscriptions");
  const noCardsContainer = document.getElementById("no-cards");
  const subscriptionsHeading = document.getElementById("subscriptions-heading");

  // const subscriptionsData = {
  //   subscriptions: []
  // };
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
                <a href="update.html"><img src="update.png" alt="Update" />Update</a>
                <a href="${subscription.settings_url}" target="_blank"><img src="deets.png" alt="Details" />Details</a>
                <a href="#" onclick="confirmDelete()"><img src="delete.png" alt="Delete" />Delete</a>
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

  // subscriptionsData.subscriptions.forEach((subscription) => {
  //   const card = generateSubscriptionCard(subscription);
  //   subscriptionsContainer.appendChild(card);
  // });
  // Check if there are subscriptions to display
  if (subscriptionsData.subscriptions.length === 0) {
    noCardsContainer.innerHTML = "¯\\_(ツ)_/¯ No subscriptions to show"; // Display the shrug emoji
    subscriptionsHeading.style.display = "none"; // Hide the heading
  } else {
    // Generate subscription cards if there are subscriptions
    subscriptionsData.subscriptions.forEach((subscription) => {
      const card = generateSubscriptionCard(subscription);
      subscriptionsContainer.appendChild(card);
    });
  }
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

//-------------------------------------------------------------
// Login form
//-------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".login-button");
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

  const usernameInput = document.createElement("input");
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("placeholder", "Username");

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("placeholder", "Password");

  const newHere = document.createElement("a");
  newHere.classList.add("new-here");
  newHere.textContent = "New here? Register";
  newHere.setAttribute("href", "./registration.html");

  const forgotPassword = document.createElement("a");
  forgotPassword.classList.add("forgot-password");
  forgotPassword.textContent = "Forgot password?";
  forgotPassword.setAttribute("href", "./forgot-password.html");

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Login";

  loginForm.appendChild(usernameInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(newHere);
  loginForm.appendChild(forgotPassword);
  loginForm.appendChild(submitButton);

  popupContainer.appendChild(loginForm);

  function togglePopup() {
    popupContainer.classList.toggle("active");
  }

  loginButton.addEventListener("click", togglePopup);

  // Close popup when clicking outside of it
  document.addEventListener("click", function (event) {
    const isClickInsidePopup = popupContainer.contains(event.target);
    const isClickOnLoginButton = loginButton.contains(event.target);
    if (!isClickInsidePopup && !isClickOnLoginButton) {
      popupContainer.classList.remove("active");
    }
  });

  document.body.appendChild(popupContainer);
  // Add event listener to the login form submission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the username and password from the form inputs
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Make the API call
    var loggedInUser = username;
    console.log("logging in"); // Verify that loggedInUser is undefined
    fetch(
      "https://fw79wa9t2e.execute-api.us-east-1.amazonaws.com/dev/auth-signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Verify that the username is retrieved correctly
        // Store the username in sessionStorage
        sessionStorage.setItem("username", username);
        // Set the loggedInUser variable
        loggedInUser = username;
        console.log(loggedInUser); // Verify that loggedInUser holds the correct value

        // Display the loggedInUser in the HTML
        const loggedInUserSpan = document.getElementById("loggedInUser");
        console.log(loggedInUserSpan); // Verify that the element is found
        if (loggedInUserSpan) {
          loggedInUserSpan.textContent = loggedInUser;
        } else {
          console.error("Element with id 'loggedInUser' not found.");
        }
        // If login is successful, redirect to manage.html
        window.location.href = "manage.html";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    console.log("logged in user: " + loggedInUser); // Verify that loggedInUser is undefined
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(".new-here");

  loginButton.addEventListener("click", function () {
    window.location.href = "registration.html";
  });
});

function confirmDelete() {
  if (confirm("Are you sure you want to delete the subscription?")) {
    // User clicked OK, add code here to delete the subscription.
  } else {
    // User clicked Cancel, do nothing.
  }
}

//-------------------------------------------------------------
// Registration form
//-------------------------------------------------------------
const registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form inputs
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const username = document.getElementById("username").value;

  // Make sure password and confirm password match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Make the API call for registration
  fetch(
    "https://fw79wa9t2e.execute-api.us-east-1.amazonaws.com/dev/auth-signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        username: username,
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // If registration is successful, get the username from the response
      console.log("Registration successful. Username:", username);

      // store the username in sessionStorage
      sessionStorage.setItem("username", username);
      console.log("username in session", username);

      // Redirect user to enter OTP page
      window.location.href = "enter-otp.html";

      // Call function to submit OTP with retrieved username
      submitOTP(username);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
