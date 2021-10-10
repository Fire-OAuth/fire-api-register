const FIRE_REGISTRATION_ENDPOINT = "http://localhost:3003/api/apis/api/register"

function returnUserCard(user) {
	return `<div class="userContainer">
                <div class="transparentCard">
                    <img src="${user.profilePic}" alt="Profile Pic">
                </div>
                <div class="userCard pt-25">
                    <div class="nameContainer">
                        <span class="firstName">${user.firstName}</span>
                        <span class="lastName">${user.lastName}</span>
                    </div>
                    <div class="email"><a href="mailto:${user.email}" aria-label="Email">${user.email}</a></div>
                </div>
            </div>`
}

function getDomain(url) {
    let newUrl = new URL(url)
    return newUrl.hostname
}

function timeDifference(current, previous) {
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;

	var elapsed = current - previous;

	if (elapsed < msPerMinute) {
		if (elapsed / 1000 < 30) return "Just now";
		return Math.round(elapsed / 1000) + "s";
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + "m";
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + "h";
	} else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerDay) + "d";
	} else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + "month";
	} else {
		return Math.round(elapsed / msPerYear) + "y";
	}
}

function showListOfTransactions (data) {
    let html = ""
    // reverse the data

    data.reverse().forEach(element => {

        let domain = getDomain(element.url)
        let timeAgo = timeDifference(new Date(), new Date(element.time))
        let token = element.token

        html += `<div class="signup" data-id="${token}">
                    <div class="signupHeader" data-id="${token}">
                        <div class="signupDomain" data-id="${token}"> <span>${domain}</span> </div>
                        <div class="signupTime" data-id="${token}"> ${timeAgo} </div>
                    </div>
                    <div class="signupInfo" data-id="${token}">
                        <div class="signUpInfoContainer" data-id="${token}">
                            <div class="fullSignupDomain" data-id="${token}">
                                <span>${element.url}</span>
                            </div>
                            <div class="fullTimeContainer" data-id="${token}">
                                <span>${new Date(element.time)}</span>
                            </div>
                            <div class="signupMethod" data-id="${token}">
                                <span>Method: ${element.method}</span>
                            </div>
                        </div>
                    </div>
                </div>`
    });

    return html
}

function renderAPICard(data) {
    return `<div class='dataContainer'>
        <div class="apiContainer formContainer">
            <div class="domainName">
                <span>${data.domainName}</span>
            </div>
            <div class="apiTitle">
                <span>Your API Key</span>
            </div>
            <div class="apiKey">
                <input type="text" value="${data._id}" onkeydown="return false">
                <button onclick="copyToClipboard('${data._id}')">
                    <img src="/assets/images/copy.svg" alt="Copy">
                </button>
            </div>
        </div>

        <div class="readMore">
            <a href='https://github.com/Fire-OAuth/client-server/wiki'>
                <button>Read Docs</button>
            </a>
            <span>To know more about how to use this, click the above button</span>
        </div>

    </div>`
}

async function copyToClipboard(copyText) {
    await navigator.clipboard.writeText(copyText)
}
