// const worker = new Worker("./worker.ts");
// const countDisplay = document.getElementById("count");
// const startButton = document.getElementById("start");
// const changeBakcground = document.getElementById("background");
// const stopButton = document.getElementById("stop");

// if (startButton) {
// 	startButton.addEventListener("click", () => {
// 		worker.postMessage("start");

// 		worker.onmessage = function (event) {
// 			console.log(event.data);

// 			if (countDisplay) {
// 				countDisplay.textContent = event.data;
// 			}
// 		};
// 	});
// }
// if (stopButton) {
// 	stopButton.addEventListener("click", () => {
// 		if (worker) {
// 			worker.terminate();
// 		}
// 	});
// }

// if (changeBakcground) {
// 	changeBakcground.addEventListener("click", () => {
// 		if (document.body.style.background !== "blue") {
// 			document.body.style.background = "blue";
// 		} else if (document.body.style.background === "blue") {
// 			document.body.style.background = "red";
// 		}
// 	});
// }
