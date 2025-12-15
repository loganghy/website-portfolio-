let theme = localStorage.getItem("theme");

if (theme == null) {
	setTheme("light");
} else {
	setTheme(theme);
}

let themeDots = document.getElementsByClassName("theme-dot");

for (var i = 0; themeDots.length > i; i++) {
	themeDots[i].addEventListener("click", function () {
		let mode = this.dataset.mode;
		setTheme(mode);
	});
}

function setTheme(mode) {
	document.body.classList.add(mode);
	document.body.dataset.theme = mode;

	localStorage.setItem("theme", mode);
}

const myForm = document.querySelector(".contact-form");
const submitBtn = document.getElementById("submit-btn");
const submitMsg = document.querySelector(".form-message");

myForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	submitBtn.disabled = true;

	submitBtn.value = "sending...";

	try {
		const response = await fetch(myForm.action, {
			method: "POST",
			body: new FormData(myForm),
			headers: {
				Accept: "application/json",
			},
		});

		if (response.ok) {
			myForm.reset();
			submitMsg.style.display = "block";
		} else {
			alert("Something went wrong. Please try again.");
		}
	} catch (err) {
		alert("Network error. Please try again.");
	} finally {
		submitBtn.disabled = false;
		submitBtn.value = "Send";
	}
});
