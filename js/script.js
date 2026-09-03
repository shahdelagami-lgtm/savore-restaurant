
function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];
    cart.push({ name: itemName, price: itemPrice });
    localStorage.setItem('restaurantCart', JSON.stringify(cart));
    updateCartCount();
    alert(`تمت إضافة "${itemName}" إلى السلة بنجاح!`);
}

// updating the cart
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('restaurantCart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    const orderButtons = document.querySelectorAll('.order-btn');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const card = e.target.closest('.card');
            
            if (card) {
                const itemName = card.querySelector('h3').innerText;
                const itemPriceText = card.querySelector('.price').innerText;
                const itemPrice = parseFloat(itemPriceText.replace('$', ''));
                
                addToCart(itemName, itemPrice);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".auth-panel form"); 
    const emailInput = document.querySelector("#login-email");
    const passwordInput = document.querySelector("#login-password");

    if (loginForm && emailInput && passwordInput) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (email === "" || password === "") {
                alert("من فضلك املأ جميع الحقول المطلوبة!");
            } else {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", email.split('@')[0]);
                window.location.href = "index.html";
            }
        });
    }
    const navLinks = document.querySelector(".nav-links");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (isLoggedIn === "true" && navLinks) {
        const loginLink = navLinks.querySelector('a[href="login.html"]') || navLinks.querySelector('a[href*="login"]');
        if (loginLink) {
            loginLink.textContent = `WELCOME, ${username.toUpperCase()}`;
            loginLink.href = "#";
            
            loginLink.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm("هل تريد تسجيل الخروج؟")) {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("username");
                    window.location.href = "index.html";
                }
            });
        }
    }
});

const usernameregex = /^[a-zA-Z ]{3,15}$/;
const phoneregex = /^01[0125][0-9]{8}$/;
const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const usename = document.querySelector("#name1");
const phone = document.querySelector("#phone");
const usermail = document.querySelector("#email1");
const nameError = document.querySelector("#nameError");
const phoneError = document.querySelector("#phoneError");
const emailError = document.querySelector("#emailError");
const form = document.getElementById("form1");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isvalid = true;

        if (usename.value.trim() === "") {
            nameError.textContent = "username is required";
            isvalid = false;
        } else if (!usernameregex.test(usename.value)) {
            nameError.textContent = "username must be 3-15 char";
            isvalid = false;
        } else {
            nameError.textContent = "";
        }
        
        if (phone.value.trim() === "") {
            phoneError.textContent = "phone is required";
            isvalid = false;
        } else if (!phoneregex.test(phone.value)) {
            phoneError.textContent = "phone must start with 01 and be atleast 11 numbers";
            isvalid = false;
        } else {
            phoneError.textContent = "";
        }

        if (usermail.value.trim() === "") {
            emailError.textContent = "email is required";
            isvalid = false;
        } else if (!emailregex.test(usermail.value)) {
            emailError.textContent = "ex:name@gmail.com";
            isvalid = false;
        } else {
            emailError.textContent = "";
        }

        if (isvalid) {
            let dateVal = form.querySelector("input[type='date']").value;
            let timeVal = form.querySelector("input[type='time']").value;
            let alertBox = document.getElementById("book-alert");

            if (alertBox) {
                alertBox.textContent = "reservation is confirmed on " + dateVal + " at " + timeVal;
                alertBox.classList.add("show");

                setTimeout(function () {
                    alertBox.classList.remove("show");
                }, 4000);
            }

            form.reset();
        }
    });
}