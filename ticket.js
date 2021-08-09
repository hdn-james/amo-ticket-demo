const Queue = () => {
	let _front = 0;
	let _rear = 0;
	let _queue = [];
	return {
		enqueue: (value) => {
			++_rear;
			_queue.push(value);
		},
		dequeue: () => {
			return _queue[_front++];
		},
		peek: () => {
			return _queue[_front];
		},
		size: () => {
			return _rear - _front - 1;
		},
	};
};

const TicketSystem = () => {
	let milButton = document.getElementById("mil-click");
	let saleNumber = document.getElementById("sale-number");
	let saleProgress = document.getElementById("sale-progress");
	let tickerRemaining = document.getElementById("ticket-remaining");
	let noti = document.getElementById("noti");
	let start = document.getElementById("start");
	let queueStatus = document.getElementById("queue-status");

	let ticketQueue = Queue();
	let array = new Array(100).fill(0);
	let sold = 0;
	let billID = 20210900000;

	// perform a million clicks
	const startDemo = async () => {
		console.time("init");
		let a = new Array(100).fill(0);
		for (let i = 0; i < 100; i++) {
			for await (arr of a) {
				milButton.click();
			}
		}
		console.timeEnd("init");
	};

	// handle million clicks
	const handleMillionClicks = async (array) => {
		const promises = array.map(handleOneClick);
		await Promise.all(promises);
	};

	// random delay
	const sleep = () => {
		return new Promise((resolve) =>
			setTimeout(resolve, Math.floor(Math.random() * 100 + 1))
		);
	};

  // handle one click
	const handleOneClick = async () => {
		await sleep();
		if (sold++ < 40000) {
			handleInput();
			updateCurrentStatus();
			handleSold();
		} else {
			handleSoldOut();
		}
	};

	// enqueue
	const handleInput = () => {
		ticketQueue.enqueue(billID++);
	};

	// dequeue
	const handleSold = async () => {
		let id = ticketQueue.dequeue();
		noti.innerHTML = `<h3 style="color: green;">Payment success, bill id = ${id}</h3>`;
	};

  // sold out 
	const handleSoldOut = async () => {
		ticketQueue.dequeue();
		noti.innerHTML = `<h3 style="color: red;">Sold out</h3>`;
	};

  // update current status
	const updateCurrentStatus = async () => {
		saleNumber.innerText = `${sold}/40000`;
		tickerRemaining.innerText = `${40000 - sold} tickets available`;
		saleProgress.innerHTML = `<progress value=${sold} max=40000></progress>`;
		queueStatus.innerText = `${ticketQueue.size()} in queue`;
	};

	milButton.addEventListener("click", () => handleMillionClicks(array));
	start.addEventListener("click", startDemo);
};

TicketSystem();
