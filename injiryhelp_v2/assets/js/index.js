document.addEventListener("DOMContentLoaded", function () {

    const formOpenerBtn = document.querySelector("#eligibilityBtn");
    // Select questions from forms
    const questions = document.querySelectorAll("form > div");
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input , textarea");

    // Select submit button 
    const submitButton = document.querySelector("button[type='submit']");

    const backButton = document.getElementById("backBtn");
    const loader = document.querySelector("#loader > div");
    // this index will used for check that currently we are on which question
    let currentIndex = 0;


    if(formOpenerBtn) {
        formOpenerBtn.addEventListener("click", () => {
            const mainContentDiv = document.querySelector("#mainContent");
            const loaderDiv = document.querySelector("#loader");
            mainContentDiv.classList.add("hidden");
            loaderDiv.classList.remove("hidden");
            form.classList.remove("hidden");
        });
    }






    
    const updateUI = () => {
        questions.forEach((question, index) => {
            question.classList.toggle("hidden", index !== currentIndex);
        });

        // Update loader width
        const progressPercentage = ((currentIndex) / questions.length) * 100;
        loader.style.width = `${progressPercentage}%`;

        backButton.classList.toggle("hidden", currentIndex === 0);
    };



    // Custom Form Submission
    const submitForm = (event) => {
        event.preventDefault();


        // Logic to send data to backend comes here...

        // form.classList.add("hidden");

    }


    questions.forEach((question, index) => {
        const options = question.querySelectorAll("button");
        if (options) {
            options.forEach(option => {
                option.addEventListener("click", function (event) {
                    event.preventDefault();
                    if (index < questions.length - 1) {
                        const hiddenInput = question.querySelector("input[type='hidden']");
                        hiddenInput.value = option.textContent;
                        currentIndex++; // Move to the next question
                        updateUI();
                    } else {
                        // Submit the form if it's the last question
                        submitForm(event);
                    }
                });
            });
            
        }
    });


    const validateField = (input) => {
        const errorDiv = input.nextElementSibling;
        const value = input.value.trim();

        if (input.hasAttribute("required") && value === "") {
            errorDiv.classList.remove("hidden");
        } 
        else {
            if (input.type === "email" && value !== "") {
                validateEmail(value) ? errorDiv.classList.add("hidden") : errorDiv.classList.remove("hidden");
            } 
            else if (input.type === "tel" && value !== "") {
                validatePhone(value) ? errorDiv.classList.add("hidden") : errorDiv.classList.remove("hidden");
            }
            else if (input.type === "number" && value !== "") {
                validateZipCode(value) ? errorDiv.classList.add("hidden") : errorDiv.classList.remove("hidden");
            }
            else {
                errorDiv.classList.add("hidden");
            }
        } 
    };


    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    // Simple phone validation (Example: Format like 213-456-7890)
    function validatePhone(phone) {
        const regex = /^\d{3}-\d{3}-\d{4}$/;
        return regex.test(phone);
    }

    // Zip code validation
    function validateZipCode(zip) {
        const regex = /^[0-9]{5}$/;  // 5 digits for zip code
        return regex.test(zip);
    }

    inputs.forEach((input) => {
        input.addEventListener("blur", function () {
            validateField(input);
        });
    });

    backButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--; // Move to the previous question
            updateUI();
        }
    });

    submitButton.addEventListener("click", function (event) {
        submitForm(event);
    });

    // Initial UI setup
    updateUI();
});
