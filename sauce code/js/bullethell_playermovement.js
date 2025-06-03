
// listen for mouse data from the main thread
// e.data message may contain...

// speedDivider - to update how fast it should go
// cursorPos - {x, y} of current cursor position
// pressedKeys - an object of all keys currently pressed
// wasdEnabled - changes self value 
// paused

self.usingKeyControls = false // if a key is held down, use keys
self.wasdEnabled = true // if WASD should be considered
self.pressedKeys

self.windowSize = {x: 1920, y: 1080} //updated periodically from main thread
self.cursorPos = {x:100, y:100} // regularly updated object of current position
self.cursorDelta = { x: 100, y: 100} //internal record of last position
self.lastMouseX = self.cursorDelta.x
self.speedDivider = 2
self.speedLimit = 30
self.paused = false

//message from main thread containing any important data
self.addEventListener('message', (e) => {
	//sent sparingly
	if(e.data.hasOwnProperty("initPos")) {
		self.cursorDelta = e.data.initPos
		self.cursorPos = e.data.initPos
	}

	//updated each mousemove
	if(e.data.hasOwnProperty("cursorPos")) self.cursorPos = e.data.cursorPos

	//updated every 30ms ideally
	if(e.data.hasOwnProperty("paused")) self.paused = e.data.paused
	if(e.data.hasOwnProperty("pressedKeys")) self.pressedKeys = e.data.pressedKeys

	//updated every 500ms
	if(e.data.hasOwnProperty("wasdEnabled")) self.wasdEnabled = e.data.wasdEnabled
	if(e.data.hasOwnProperty("speedLimit")) self.speedDivider = e.data.speedDivider
	if(e.data.hasOwnProperty("speedDivider")) self.speedDivider = e.data.speedDivider
	if(e.data.hasOwnProperty("windowSize")) {
		self.windowSize = e.data.windowSize
		self.speedLimit = Math.max(self.windowSize.x * 0.01 + self.windowSize.y * 0.01, 30)
	}
});

//where the magic happens
setInterval(()=>{
	if(!self.paused) {
		if(self.wasdEnabled) bh_wasdTracker()

		//check for mouse movement, which will override wasd
		if(self.lastMouseX != self.cursorPos.x) {
			self.usingKeyControls = false
			self.lastMouseX = self.cursorPos.x
		}

		let cursorLimited = bh_limitEdges()
		
		var xD = ((cursorLimited.x - self.cursorDelta.x)/6)
		var yD = ((cursorLimited.y - self.cursorDelta.y)/6)

		//limit movement to a certain range
		if(xD > self.speedLimit) { xD = self.speedLimit }
		if(xD < self.speedLimit * -1) { xD = self.speedLimit * -1}
		if(yD > self.speedLimit) { yD = self.speedLimit }
		if(yD < self.speedLimit * -1) { yD = self.speedLimit * -1}

		//get rid of da hyperspeed diagonals by splitting anything over 10 between the two deltas
		let totalMovement = Math.abs(xD) + Math.abs(yD);
		if(totalMovement > self.speedLimit) {
			//get the ratio of movement - how much goes to X, and how much goes to Y
			let xRatio = Math.abs(xD) / totalMovement
			let yRatio = Math.abs(yD) / totalMovement

			xD = xD * xRatio
			yD = yD * yRatio
		}

		self.cursorDelta.x += xD
		self.cursorDelta.y += yD

		self.postMessage({
			//transform: `translate(calc(${self.cursorDelta.x}px - 15px), calc(${self.cursorDelta.y}px - 15px))`,
			position: self.cursorDelta
		});
	}
}, 30)

//executes "mouse" adjustment based on what's held down, controlling movement
function bh_wasdTracker() {
	if(self.pressedKeys.w || self.pressedKeys.arrowup) {self.cursorDelta.y -= self.speedLimit / self.speedDivider; self.usingKeyControls = true}
	if(self.pressedKeys.a || self.pressedKeys.arrowleft) {self.cursorDelta.x -= self.speedLimit / self.speedDivider; self.usingKeyControls = true}
	if(self.pressedKeys.s || self.pressedKeys.arrowdown) {self.cursorDelta.y += self.speedLimit / self.speedDivider; self.usingKeyControls = true}
	if(self.pressedKeys.d || self.pressedKeys.arrowright) {self.cursorDelta.x += self.speedLimit / self.speedDivider; self.usingKeyControls = true}
}

//caps the movement to the visible screen
function bh_limitEdges(){
	var cursorLimited = {x: self.cursorPos.x + 0, y: self.cursorPos.y + 0}
	if(self.usingKeyControls) cursorLimited = { x: self.cursorDelta.x, y: self.cursorDelta.y }

	if(cursorLimited.x > self.windowSize.x) {
		cursorLimited.x = self.windowSize.x - self.speedLimit;
	} else if(cursorLimited.x < 0) {
		cursorLimited.x = self.speedLimit;
	}

	if(cursorLimited.y > self.windowSize.y) {
		cursorLimited.y = self.windowSize.y - (self.speedLimit * 2);
	} else if(cursorLimited.y < 0) {
		cursorLimited.y = self.speedLimit * 2;
	}

	return cursorLimited
}