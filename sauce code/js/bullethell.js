//initializes and begins the BH sequence
//requires you to give an HTML string with the ID "bh_player" - the exact center point of it will be the hitbox
function bh_start({
	playerEl = `<div id="bh_player"></div>`,
	protectionTime = 800,
	centered = false, 
	usePageBounds = false, 
	onMove,
	onHit,
	onEnd
}){
	MUI("off")
	MUI("prohibit")
	env.temporaryOptimize = true
	env.hoverIntervalRate = 1000

	env.bulletHell = {
		over: false,
		paused: false,
		protectionTime: protectionTime,
		recentlyHit: false,
		ignoreRecentlyHit: false, //this will let the player take huge amounts of damage really quickly if set true
		hits: 0,
		bulletCount: 0,
		speedDivider: 2,
		speedLimit: Math.max(window.innerHeight * 0.015, window.innerWidth * 0.015), // pixel speed limit since last draw
		cursorDelta: {x: 100, y: 100},
		
		timeouts: [],
		setTimeout: (func, time) => {
			let newTimeout = setTimeout(func, time)
			env.bulletHell.timeouts.push(newTimeout)
			return newTimeout
		},
		clearTimeouts: ()=>{
			env.bulletHell.timeouts.forEach(timeout => {
				clearTimeout(timeout)
			});
			env.bulletHell.timeouts = []
		},
			
		intervals: [],
		setInterval: (func, time) => {
			let newInterval = setInterval(func, time)
			env.bulletHell.intervals.push(newInterval)
			return newInterval
		},
		clearIntervals: ()=>{
			env.bulletHell.intervals.forEach(interval => {
				clearInterval(interval)
			});
			env.bulletHell.intervals = []
		},

		onMove: onMove,
		usingOnMove: typeof onMove == "function", //need to optimize this for the worker
		onEnd: onEnd
	}

	body.classList.add('bh_started')
	content.insertAdjacentHTML('beforeend', playerEl)

	//determines where the cursor starts
	if(centered) {
		env.bulletHell.cursorDelta.x = window.innerWidth / 2; env.bulletHell.cursorDelta.y = window.innerHeight / 2
	} else {
		env.bulletHell.cursorDelta.x = env.pageCursor.x; env.bulletHell.cursorDelta.y = env.pageCursor.y
	}

	env.bulletHell.onHit = onHit
	env.bulletHell.p = document.querySelector('#bh_player')
	env.bulletHell.p.classList.add('active')
	env.bulletHell.lastMouseX = env.pageCursor.x
	env.bulletHell.wasdEnabled = true
	env.bulletHell.usingKeyControls = false
	env.bulletHell.usePageBounds = usePageBounds || false //if false, uses viewport bounds - if true, uses page (content) bounds

	//events on THIS thread:
	//on mouse move, send position
	env.bulletHell.mouseEvent = function(e){
		env.bulletHell.moveWorker.postMessage({
			cursorPos: env.pageCursor
		})
	}
	
	//on message receive, update cursor position with received style string
	env.bulletHell.moveWorkerMessage = function(e) {
		env.bulletHell.p.style.top = e.data.position.y + 'px';
		env.bulletHell.p.style.left = e.data.position.x + 'px';
		env.bulletHell.cursorDelta = e.data.position

		if(env.bulletHell.usingOnMove) env.bulletHell.onMove(e.data.position)
	}

	//intervals on THIS thread:
	//every 30ms, send held keys, whether it's paused
	//we define and reuse this object to not trigger garbage collection
	//since it's using env object, no updates needed before sending
	env.bulletHell.moveWorkerHighDataObj = {
		cursorPos: env.pageCursor,
		pressedKeys: env.pressedKeys,
	}
	
	env.bulletHell.moveWorkerHighData = () => env.bulletHell.moveWorker.postMessage(env.bulletHell.moveWorkerHighDataObj)
	
	//every 500ms, send infrequent changes (speed limit, speed divider, window size)
	//we define and reuse this object to not trigger garbage collection
	env.bulletHell.moveWorkerLowDataObj = {
		wasdEnabled: env.bulletHell.wasdEnabled,
		speedLimit: env.bulletHell.speedLimit,
		usePageBounds: env.bulletHell.usePageBounds,
		speedDivider: env.bulletHell.speedDivider,
		paused: env.bulletHell.paused,

		//this is NOT updated automatically
		windowSize: env.bulletHell.usePageBounds ? {x: content.getBoundingClientRect().width, y: content.getBoundingClientRect().height} : {x: window.innerWidth, y: window.innerHeight}
	}

	env.bulletHell.moveWorkerLowData = () => { 
		env.bulletHell.moveWorkerLowDataObj.wasdEnabled = env.bulletHell.wasdEnabled
		env.bulletHell.moveWorkerLowDataObj.speedLimit = env.bulletHell.speedLimit,
		env.bulletHell.moveWorkerLowDataObj.speedDivider = env.bulletHell.speedDivider,
		env.bulletHell.moveWorkerLowDataObj.paused = env.bulletHell.paused

		env.bulletHell.moveWorker.postMessage(env.bulletHell.moveWorkerLowDataObj)
	}

	//detect any hits
	env.bulletHell.hitterLoop = function(){
		if(!env.bulletHell.paused && !env.bulletHell.invulnerable) {		
			let pLoc = env.bulletHell.p.getBoundingClientRect()
			let hitElements = document.elementsFromPoint(pLoc.x + (pLoc.width / 2), pLoc.y + (pLoc.height / 2))
			var onPlatform = false
			var safe = false

			hitElements.forEach(el => {
				if(el.classList.contains("bh_platform") || el.classList.contains("clickable")) { // "elevated" above whatever - elementsFromPoint goes top down, so anything past this is ignored
					onPlatform = true
					if(el.classList.contains("bh_safe")) safe = true
				}

				if(el.classList.contains("bh_damager") && !onPlatform) {
					bh_hit(env.bulletHell.onHit)
				}
			})

			if(safe && !env.bulletHell.platformNoted) {
				env.bulletHell.platformNoted = true
				env.bulletHell.p.classList.add('safe')
				console.log("adding note because safe")
			} else if(!safe && env.bulletHell.platformNoted) {
				env.bulletHell.platformNoted = false
				env.bulletHell.p.classList.remove('safe')
				console.log("removing note because not safe")
			}

			//GC cleanup
			hitElements = null
			pLoc = null
		}
		if(env.bulletHell.over) clearInterval(env.bulletHell.hitterLoop)
	}

	//begin...
	window.addEventListener('mousemove', env.bulletHell.mouseEvent, {passive: true})
	env.bulletHell.hitterInterval = setInterval(env.bulletHell.hitterLoop, 100)

	//worker setup
	env.bulletHell.moveWorker = new Worker("/js/bullethell_playermovement.js")
	env.bulletHell.moveWorker.onmessage = env.bulletHell.moveWorkerMessage

	//worker data feeds
	env.bulletHell.moveWorkerHighInterval = setInterval(env.bulletHell.moveWorkerHighData, 30)
	env.bulletHell.moveWorkerLowInterval = setInterval(env.bulletHell.moveWorkerLowData, 500)
	env.bulletHell.moveWorker.postMessage({
		initPos: env.bulletHell.cursorDelta
	})

	env.bulletHell.moveWorkerLowData()
}

//adds a low-priority player-like check for another element
//this doesn't use workers, it's just gonna be a 100ms check
//intended for use with the 'carrier' idea
function bh_friend({
	el = `<div id="carrier"></div>`,
	onMove,
	onHit,
	onEnd
}) {

}

//ends bh and cleans up
function bh_stop(){
    env.bulletHell.paused = true
	env.bulletHell.over = true
	env.bulletHell.ignoreRecentlyHit = false;
	
	env.temporaryOptimize = false
	env.hoverIntervalRate = env.defaultHoverRate

	body.classList.remove('bh_started')

	env.bulletHell.moveWorker.terminate()
	window.removeEventListener('mousemove', env.bulletHell.mouseEvent)

	clearTimeout(env.bulletHell.moveWorkerHighInterval)
	clearTimeout(env.bulletHell.moveWorkerLowInterval)
	try {
		clearInterval(env.bulletHell.bulletTimeout)
	} catch (e) { /* no gunner - gotta update this one to the interval system */ }

	env.bulletHell.clearIntervals()
	env.bulletHell.clearTimeouts()
	if(typeof env.bulletHell.onEnd == "function") env.bulletHell.onEnd()
}

//apply damage if recently hit
function bh_hit(onHit = false) {
	if(!env.bulletHell.recentlyHit || env.bulletHell.ignoreRecentlyHit) {
		env.bulletHell.recentlyHit = true
		env.bulletHell.hits++;

		//custom onHits should return a damage type, i.e. "damaged" or "dodged"
		var onHitValue = "damaged"
        if(typeof onHit == "function") onHitValue = onHit() //if there's a custom onhit, do it
		console.log(onHitValue)
		
		body.classList.add(`bh_${onHitValue}`)
		setTimeout(function(){ body.classList.remove(`bh_${onHitValue}`) }, env.bulletHell.protectionTime)
		setTimeout(function(){ env.bulletHell.recentlyHit = false }, env.bulletHell.protectionTime)
	}
}

function bh_invuln(state) {
	if(state) { env.bulletHell.p.classList.add('invuln'); env.bulletHell.invulnerable = true }
	else { env.bulletHell.p.classList.remove('invuln'); env.bulletHell.invulnerable = false }
}

//bh movefriend variant - uses the "room" to attack a target
//moves:
//	Pillars - a vertical or horizontal spot is chosen to close in, splitting the stage in potentially disastrous ways
//	Spikes - similar to pillar, selects a side to send in a triangular projectile. telegraphs a little at the edge before sending through
//  Pits - hits one of a few pre-selected spots on the screen with a growing damage zone for the duration of the 
//levels: 
//	tutorial - drops a few spikes from the top
// 	healthy - above, plus spikes from any side, and a random pit position
//  threatened - above, plus pillars that come down slowly occasionally
//	final stand - above, minus pillars, but the walls close in to create an enclosed circle (similar to old hello)
function bh_movefriend({level="tutorial", duration=15000}) {
	var sending = {} //holds objects passed to attack functions
	var effectiveDuration = duration

	//switch to determine what to send and how quickly to send it
	var possibleConfigs
	ratween(env.bgm, 1)

	bh_invuln(true)
	setTimeout(()=>bh_invuln(false), 1500)
	setTimeout(()=>env.bulletHell.p.classList.add('hidenotice'), 1500)

	env.bulletHell.complete = ()=>{
		bh_stop()
		MUI("deprohibit")
		env.bulletHell.p.classList.remove('active')
		body.classList.remove('in-golem-vortex')
		env.rpg.classList.remove('cull')
		env.rpg.vortex.classList.remove('active')
		env.rpg.actionZone.classList.remove('active')
		if(env.rpg.active) ratween(env.bgm, 0.75)
						
		setTimeout(()=>{
			env.rpg.vortex.remove()
			env.rpg.actionZone.remove()
			env.bulletHell.p.remove()
			if(env.rpg.active) advanceTurn()
		}, 2000)
	}

	switch(level) {
		case "tutorial":
			//starts with top bullets, then moves to faster side ones
			let topBullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 5000, targetPlayer: 0.25 }), 500)
			bh_wall({side: "left", size: 35, speed: 12000})
			bh_wall({side: "top", size: 35, speed: 12000})
			bh_wall({side: "right", size: 35, speed: 12000})
			bh_wall({side: "bottom", size: 35, speed: 12000})
			env.bulletHell.setTimeout(()=> {
					clearInterval(topBullets)
					env.bulletHell.intervals.push(bh_spiralspike({speed: 5000, rate: 500}))
			}, 5000)
		break

		case "healthy":
			//we start with the list of 'basic' attacks
			possibleConfigs = [
				//two random pits and random spikes
				()=> {
					bh_pit({ spot: "random", growSpeed: 5000, size: "75vmax" })
					bh_pit({ spot: "random", growSpeed: 5000, size: "75vmax" })
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 4000, targetPlayer: 1 }), 500)
					env.bulletHell.intervals.push(bh_spiralspike({speed: 5000, rate: 1000}))
				},
		
				//diagonal pits that shift to other pits, with random spikes
				()=> {
					let firstPits = [bh_pit({ spot: "top left", growSpeed: 5000, size: "75vmax" }), bh_pit({ spot: "bottom right", growSpeed: 5000, size: "75vmax" })]
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 4000, targetPlayer: 1 }), 500)
					env.bulletHell.setTimeout(()=>{
						firstPits.forEach(el=>el.classList.remove('growing'))
						bh_pit({ spot: "bottom left", growSpeed: 5000, size: "75vmax" })
						bh_pit({ spot: "top right", growSpeed: 5000, size: "75vmax" })
					}, 8000)
				},

				//a wall comes in from above, then below, while speedy horizontal spikes are thrown
				()=> {
					let topWall = bh_wall({side: "top"})
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "horizontal", duration: 3000, targetPlayer: 1, targetVariance: 200 }), 500)

					env.bulletHell.setTimeout(()=>{
						topWall.classList.add('inactive')
						let bottomWall = bh_wall({side: "bottom"})
					}, 8000)
				},

				//ditto, but turned 90 degrees
				()=> {
					let topWall = bh_wall({side: "right"})
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "vertical", duration: 3000, targetPlayer: 1, targetVariance: 200 }), 500)

					env.bulletHell.setTimeout(()=>{
						topWall.classList.add('inactive')
						let bottomWall = bh_wall({side: "left"})
					}, 8000)
				},
			]
			possibleConfigs[rand(0, possibleConfigs.length)]()
		break

		case "threatened":
			//then comes the list of more intermediate attacks
			possibleConfigs = [
				//walls come in from bottom and left with bullets from above, then shifts down to left corner through some more walls, then moves to right corner
				()=> {
					let bottomWall = bh_wall({side: "bottom", speed: 5000, size: 70})
					let leftWall = bh_wall({side: "left", speed: 5000, size: 70})
					let bottomBullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "bottom", duration: 5000, targetPlayer: 0 }), 500)

					var topBullets, topWall, rightWall
					env.bulletHell.setTimeout(()=>{
						bottomWall.classList.add('inactive')
						leftWall.classList.add('inactive')

						clearInterval(bottomBullets)
						topBullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "top", duration: 5000, targetPlayer: 0 }), 900)

						topWall = bh_wall({side: "top", speed: 5000, size: 70})
						rightWall = bh_wall({side: "right", speed: 5000, size: 70})
					}, 5000)

					env.bulletHell.setTimeout(()=>{
						rightWall.classList.add('inactive')
						bh_wall({side: "left", speed: 5000, size: 70})
					}, 10000)
				},
				
				//spiral spike attack
				()=>{
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "horizontal", duration: 8000, targetPlayer: 0}), 900)
					
					env.bulletHell.setTimeout(()=>{
						bh_pit({spot: "center", size: "80vmax"})
						env.bulletHell.intervals.push(bh_spiralspike({}))
					}, 2000)
					env.bulletHell.setTimeout(()=>{
						bh_pit({spot: "top left", size: "50vmax"})
						bh_pit({spot: "bottom right", size: "45vmax"})
					}, 4000)
					env.bulletHell.setTimeout(()=>{
						bh_pit({spot: "bottom left", size: "45vmax"})
						bh_pit({spot: "top right", size: "50vmax"})
					}, 4000)
				},
				
				
				//pits form, only leaving one spot (the center) safe at first
				//outer pits recede, while a center one expands
				()=>{
					let topLeftPit = bh_pit({spot: "top left", size: '70vmax', growSpeed: "3000"})
					let midLeftPit = bh_pit({spot: "center left", size: '70vmax', growSpeed: "3000"})
					let botLeftPit = bh_pit({spot: "bottom left", size: '70vmax', growSpeed: "3000"})
					let topRightPit = bh_pit({spot: "top right", size: '75vmax', growSpeed: "3000"})
					let midRightPit = bh_pit({spot: "center right", size: '70vmax', growSpeed: "3000"})
					let botRightPit = bh_pit({spot: "bottom right", size: '70vmax', growSpeed: "3000"})
					let botPit = bh_pit({spot: "bottom", size: '50vmax', growSpeed: "3000"})
					let topPit = bh_pit({spot: "top", size: '50vmax', growSpeed: "3000"})
					let cenPit;

					env.bulletHell.speedDivider = 3

					let bullets = env.bulletHell.setInterval(()=>bh_sidespike({ side: "vertical", duration: 5000, targetPlayer: 0.8, targetVariance: 400}), 500)
					env.bulletHell.setTimeout(()=>{
						cenPit = bh_pit({spot: "center", size: "80vmax", growSpeed: "8000"})
						midLeftPit.classList.remove('growing')
						midRightPit.classList.remove('growing')
					}, 3000)

					env.bulletHell.setTimeout(()=>{
						midLeftPit.style.setProperty("--growSpeed", "4000ms")
						midRightPit.style.setProperty("--growSpeed", "4000ms")
						midLeftPit.classList.add('growing')
						midRightPit.classList.add('growing')

						topLeftPit.classList.remove('growing')
						botRightPit.classList.remove('growing')
						
						env.bulletHell.speedDivider = 4
					}, 6000)

					env.bulletHell.setTimeout(()=>{
						topLeftPit.style.setProperty("--growSpeed", "4000ms")
						botRightPit.style.setProperty("--growSpeed", "4000ms")
						topLeftPit.classList.add('growing')
						botRightPit.classList.add('growing')

						topPit.classList.remove('growing')
						botPit.classList.remove('growing')
					}, 10000)
				}
				
			]
			possibleConfigs[rand(0, possibleConfigs.length)]()
		break

		case "last stand":
			//in this mode, it starts with pits in all corners that grow over some time
			changeBgm(env.embassy.music_p1boss_laststand, {preserve: false, length: 7000})

			let currentPits = [
				bh_pit({ spot: "top left", growSpeed: 7500, size: "75vmax" }),
				bh_pit({ spot: "top right", growSpeed: 7500, size: "75vmax" }),
				bh_pit({ spot: "bottom left", growSpeed: 7500, size: "75vmax" }),
				bh_pit({ spot: "bottom right", growSpeed: 7500, size: "75vmax" }),
			]

			let fastSpeed = 500
			if(window.innerHeight < 800) {
				fastSpeed = 900
			}

			//meanwhile some mostly targeted side spikes fly in
			let currentSpikes = []
			env.bulletHell.setTimeout(()=>{
				currentSpikes.push(
					env.bulletHell.setInterval(()=>bh_sidespike({ side: "left", duration: 3000, targetPlayer: 0.8 }), fastSpeed)
				)

				env.bulletHell.setTimeout(()=>
					currentSpikes.push(
						env.bulletHell.setInterval(()=>bh_sidespike({ side: "right", duration: 3000, targetPlayer: 0.8 }), fastSpeed)
					)
				, 250)
			}, 1000)

			var firstSpiral
			env.bulletHell.setTimeout(()=>{
				firstSpiral = bh_spiralspike({speed: 3000, rate: fastSpeed, targetPlayer: 0.5, targetVariance: 100})
			}, 5000)

			//after a little bit of survival, we put walls over the pits and then fade the pits away
			//then the side spikes are swapped out for vertical spikes
			let currentWalls = []
			env.bulletHell.setTimeout(()=>{
				currentPits.forEach(el=>{
					el.classList.remove('growing')
					env.bulletHell.setTimeout(()=>el.remove, 7500)
				})

				currentWalls.push(
					bh_wall({side: "top", speed: 10000, size: 40}),
					bh_wall({side: "bottom", speed: 10000, size: 40})
				)

				env.bulletHell.setTimeout(()=>{
					currentSpikes.forEach(spike => clearInterval(spike))
					currentSpikes = []
				}, 4000)

				env.bulletHell.setTimeout(()=>{
					currentSpikes.push(
						env.bulletHell.setInterval(()=>bh_sidespike({ side: "top", duration: 3000, targetPlayer: 0.8, targetvariance: 300 }), 1000)
					)
	
					env.bulletHell.setTimeout(()=>
						currentSpikes.push(
							env.bulletHell.setInterval(()=>bh_sidespike({ side: "bottom", duration: 3000, targetPlayer: 0.8, targetvariance: 300 }), 1000)
						)
					, 500)
	
					env.bulletHell.setTimeout(()=>
						currentSpikes.push(
							env.bulletHell.setInterval(()=>bh_sidespike({ side: "vertical", duration: 4000, targetPlayer: 0 }), 1000)
						)
					, 750)
				}, 4005)
			}, 10000)

			//after a little longer, a wall closes in from the left, then retracts as another comes in from the right
			var leftWall
			env.bulletHell.setTimeout(()=>{
				leftWall = bh_wall({side: "left", speed: 10000, size: 60})
				currentWalls.push(leftWall)
			}, 20000)

			//the left wall recedes again, letting the right one come in
			var rightWall
			env.bulletHell.setTimeout(()=>{
				let tempLeft = leftWall
				tempLeft.classList.add("inactive")
				env.bulletHell.setTimeout(()=>{tempLeft.remove()}, 10000)

				rightWall = bh_wall({side: "right", speed: 10000, size: 60})
				currentWalls.push(rightWall)

				clearInterval(firstSpiral)
			}, 30000)

			//the walls recede, giving way to growing pits
			var briefSpiral
			env.bulletHell.setTimeout(()=>{
				currentWalls.forEach(wall=>{
					wall.classList.add('inactive')
					env.bulletHell.setTimeout(()=>{wall.remove()}, 10000)
				})

				briefSpiral = bh_spiralspike({speed: 5000, rate: 800, targetPlayer: 0.5, targetVariance: 100})

				bh_pit({spot: "top right", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "top left", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "bottom right", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "bottom left", size: "100vmax", growSpeed: 30000})
				bh_pit({spot: "top", size: "40vmax", growSpeed: 30000})
				bh_pit({spot: "bottom", size: "40vmax", growSpeed: 30000})

				currentSpikes.forEach(spike => clearInterval(spike))
				currentSpikes = []
			}, 35000)
			
			//spikes are refreshed to be a little more aggressive, slowly growing less so
			//at first they're fairly targeted
			let lastSpikes
			env.bulletHell.setTimeout(()=>{
				clearInterval(lastSpikes)
				lastSpikes = env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 3000, targetPlayer: 0.7, targetvariance: 100 }), 400)
				ratween(env.bgm, 0.5, 20000)
			}, 35000)

			env.bulletHell.setTimeout(()=>{
				firstSpiral = bh_spiralspike({speed: 4000, rate: fastSpeed, targetPlayer: 0.5, targetVariance: 100})
			}, 40000)

			//then they grow slower and more random
			env.bulletHell.setTimeout(()=>{
				clearInterval(lastSpikes)
				clearInterval(firstSpiral)
				clearInterval(briefSpiral)
				env.bulletHell.speedDivider = 3
				env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 4000, targetPlayer: 0.5, targetvariance: 200 }), 600)
				env.bulletHell.setInterval(()=>bh_sidespike({ side: "random", duration: 6000, targetPlayer: 0.5, targetvariance: 300 }), 800)
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'just hold on....', readout: true}), 1000)
			}, 45000)

			//gakvu tries to get through
			var gakplat
			env.bulletHell.setTimeout(()=>{
				env.rpg.actionZone.insertAdjacentHTML("beforeend", `<div class="bh_platform bh_gakvuplatform">`)
				gakplat = document.querySelector(".bh_gakvuplatform")
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'i almost...', readout: true}), 100)

				env.bulletHell.setTimeout(()=>gakplat.classList.add('active'), 100)
				env.bulletHell.setTimeout(()=>gakplat.classList.add('activefail'), 2000)
                env.setTimeout(()=>chatter({actor: 'gakvu', text: 'ⵙ┴❀ᚈ⒫', readout: true}), 2000)
			}, 55000)
			
			//finally, they stop, gakvu breaking through
			env.bulletHell.setTimeout(()=>{
				env.bulletHell.clearIntervals()
                chatter({actor: 'gakvu', text: 'got it!!', readout: true})
				setTimeout(()=>{play("mend", 0.25)}, 1000),
				env.bulletHell.setTimeout(()=>{gakplat.classList.remove('activefail'); play("mend", 0.25)}, 2000)
				env.bulletHell.setTimeout(()=>gakplat.classList.add('explosion'), 4100)
			}, 63000)

			env.bulletHell.setTimeout(()=>{
				try{ endCombat(env.rpg.enemyTeam) } catch(e) { /* miltzabug */ }
				env.embassy.endMovefriendBoss()
			}, 68000)
		break
	}

	//set up ending based on input duration
	env.bulletHell.setTimeout(env.bulletHell.complete, effectiveDuration); 
}

//returns an interval that sends spikes towards the player in a spiral pattern
function bh_spiralspike({rate = 400, duration = 3000, angleIncrement = 30, targetPlayer = 0.9, targetVariance = 100}) {
	if(!env.bulletHell.lastAngle || env.bulletHell.lastAngle > 360) env.bulletHell.lastAngle = 0
	var angle

	return setInterval(()=>{
		env.bulletHell.lastAngle += angleIncrement
		angle = env.bulletHell.lastAngle

		//choose random values - overidden by player position if needed
		let randX = rand(0, window.innerWidth)
		let randY = rand(0, window.innerHeight)
		if(Math.random() <= targetPlayer) { // target player
			randX = env.bulletHell.cursorDelta.x + ((Math.random() * targetVariance) - targetVariance * 0.5)
			randY = env.bulletHell.cursorDelta.y + ((Math.random() * targetVariance) - targetVariance * 0.5)
		}

		//create element with css variables necessary, correspond to css setup for animation
		let currentBullet = env.bulletHell.bulletCount++
		document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
			<div id="bh_spike-${currentBullet}" 
			  class="bh_spiralspike" 
			  style="--x: ${randX}px; --y: ${randY}px; --angle: ${angle}deg; --duration: ${duration}ms;">
				<div class="bh_damager bh_movespike"></div>
			</div>
		`)
		let bh_currentBullet = document.querySelector('#bh_spike-' + currentBullet)

		//add timeout to remove
		env.bulletHell.setTimeout(()=>bh_currentBullet.remove(), duration)
	}, rate)
}

//sends in a spike from the specified side (random/vertical/horizontal for random-ish, top/right/bottom/left for specific)
//targetPlayer (false/between 0 and 1 (%) of the time/true) determines if they drop on player position or not
//duration is how long it takes to travel across the map
//targetvariance is, in pixels, how wide the inaccuracies can be
function bh_sidespike({side = "random", targetPlayer = 0.5, duration=10000, targetVariance = 100}) {
	let origin, decidedSide

	//determine the side to use if it's one of the random options
	switch(side) {
		case "random": 		decidedSide = ["top", "right", "bottom", "left"][rand(0, 4)]; break
		case "vertical": 	decidedSide = ["top", "bottom"][rand(0, 2)]; break
		case "horizontal": 	decidedSide = ["right", "left"][rand(0, 2)]; break
		default: 			decidedSide = side
	}

	//choose random values - overidden by player position if needed
	let randX = rand(0, window.innerWidth)
	let randY = rand(0, window.innerHeight)
	if(Math.random() <= targetPlayer) { // target player
		randX = env.bulletHell.cursorDelta.x + ((Math.random() * targetVariance) - targetVariance * 0.5)
		randY = env.bulletHell.cursorDelta.y + ((Math.random() * targetVariance) - targetVariance * 0.5)
	}

	//determine position based on the decided side
	switch(decidedSide) {
		case "top": 	origin = { x: randX, y: 0 }; break
		case "right": 	origin = { x: window.innerWidth, y: randY}; break
		case "bottom": 	origin = { x: randX, y: window.innerHeight }; break
		case "left": 	origin = { x: 0, y: randY }; break
	}

	//create element with css variables necessary, correspond to css setup for animation
	let currentBullet = env.bulletHell.bulletCount++
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_spike-${currentBullet}" 
			class="bh_damager bh_movespike" 
			side="${decidedSide}"
			style="--duration: ${duration}; --x: ${origin.x}px; --y: ${origin.y}px">
		</div>
	`)
	let bh_currentBullet = document.querySelector('#bh_spike-' + currentBullet)

	//add timeout to remove
	env.bulletHell.setTimeout(()=>bh_currentBullet.remove(), duration)
}

//creates a growing pit in one of a few pre-selected spots
//duration is how long it takes to grow to full size, it will stay until the end of the sequence
function bh_pit({spot = "random", growSpeed = 10000, size="50vmax"}) {
	//spot is given as classes, so we select one from the list of possible spots if random
	let decidedSpot = spot
	if(spot == "random") {
		//true center can't be chosen at random
		let possibleSpots = ["center right", "center left", "bottom", "bottom left", "bottom right", "top", "top left", "top right"]

		//additionally, decidedSpot can't be one already selected in this bullet hell
		if(!env.bulletHell.usedPitSpots) env.bulletHell.usedPitSpots = []
		possibleSpots = possibleSpots.filter(n => !env.bulletHell.usedPitSpots.includes(n))
		decidedSpot = possibleSpots[rand(0, possibleSpots.length)]

		//we keep track of used random spots
		env.bulletHell.usedPitSpots.push(decidedSpot)
	}
	
	//create element, timeouts with variables to dictate grow/duration/shrinkspeed, css controls the grow/shrink animation
	let currentBullet = env.bulletHell.bulletCount++
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_pit-${currentBullet}" 
			class="bh_damager bh_movepit ${decidedSpot}"
			style="--growSpeed: ${growSpeed}ms; --size: ${size}">
		</div>
	`)

	let currentElement = document.querySelector(`#bh_pit-${currentBullet}`)
	env.bulletHell.setTimeout(()=>{
		currentElement.classList.add('growing')
	}, 100)
	return currentElement
}

//creates a wall that moves in from the specified side with the given size
//size is based on the side it comes in on - horizontal is vw, vertical is vh
//no random for this one cause it's too dangerous
function bh_wall({side = "left", speed = 5000, size = "50"}) {
	let currentBullet = env.bulletHell.bulletCount++
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_wall-${currentBullet}" 
			class="bh_damager bh_movewall inactive ${side}"
			style="--speed: ${speed}ms; --size: ${size}">
		</div>
	`)

	let currentElement = document.querySelector(`#bh_wall-${currentBullet}`)
	env.bulletHell.setTimeout(()=>{
		currentElement.classList.remove('inactive')
	}, 100)
	return currentElement
}

//bh gunner variant - shoots delayed/telegraphed spots DIRECTLY at the cursor, along with random EXPLOSIONS (also timed)
//include random shots with higher urgency, more explosions
function bh_gundown(urgency = "low"){
	if(typeof env.rpg.kavrukaDamage == "undefined") env.rpg.kavrukaDamage = []
	bh_invuln(true)
	env.bulletHell.protectionTime = 200; //we want it to hurt really bad if you stay still

	setTimeout(()=>env.bulletHell.p.classList.add('hidenotice'), 1500)
	setTimeout(()=>env.bulletHell.p.classList.remove('notice', 'hidenotice'), 2000)

	setTimeout(()=>{bh_invuln(false)}, 2000)
	
	env.bulletHell.complete = ()=>{
		bh_stop()
		MUI("deprohibit")
		body.classList.remove('in-golem-vortex')
		env.rpg.classList.remove('cull')
		env.rpg.vortex.classList.remove('active')
		env.rpg.actionZone.classList.remove('active')
		
		setTimeout(()=>{
			env.rpg.vortex.remove()
			env.rpg.actionZone.remove()
			env.bulletHell.p.remove()
			if(env.rpg.currentActor.name == "BSTRD Golem") advanceTurn();
		}, 2000)

		env.bulletHell.p.classList.remove('active')
	}

	switch(urgency) {
		case 'tutorial': 
			bh_kavruka({})

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 3000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 5000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 7000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 9000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 10000)

			env.bulletHell.setInterval(()=>bh_spreadShot(), 4000)

			env.bulletHell.setTimeout(env.bulletHell.complete, 17000)
		break

		case 'low': 
			bh_kavruka({})
			bh_spreadShot()

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 3000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 5000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 7000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 9000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 10000)

			env.bulletHell.setInterval(()=>bh_spreadShot(), 4000)

			env.bulletHell.setTimeout(env.bulletHell.complete, 17000)
		break

		//last stand focuses more on bullets or grenades depending on stage damage
		case "last_stand": 
			env.ADVANCE_RATE = 2000
			env.bulletHell.protectionTime = 600
			ratween(env.bgm, 1.15)

			let bstrd = env.rpg.enemyTeam.members.find(member => member.name == "BSTRD Golem")
			let tozik = env.rpg.allyTeam.members.find(member => member.name == "Tozik")
			if(env.rpg.kavrukaDamage.length <= 20){
				rpgDialogue(bstrd, "I STILL GOT SO MANY!!!", true)
				bh_spreadShot({count: 10, delay: 4000})
				for (let i = 0; i < 10; i++) bh_kavruka({delay: 4000 + (i * 500)})
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "BOOM!! BOOM!!!!", true), 3000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "WOOOO!!!! YEAAAA!!!", true), 5000)
				env.bulletHell.setTimeout(()=>{
					bh_spreadShot({count: 10, delay: 4000})
					for (let i = 0; i < 10; i++) bh_kavruka({delay: 4000 + (i * 500)})
					rpgDialogue(bstrd, "HOLD ON I GOT SOME MORE", true)
				}, 8000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "nyeooowww", true), 11000)
				env.bulletHell.setTimeout(()=>rpgDialogue(tozik, "stop it already! you will kill us all!!", true), 17000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "yeaa :P", true), 20000)
				env.bulletHell.setTimeout(()=>{
					for (let i = 0; i < 10; i++) bh_kavruka({delay: 4000 + (i * 500)})
					rpgDialogue(bstrd, "nyyuueeeooowww", true)
				}, 22000)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "o sht", true), 30000)
				env.bulletHell.setTimeout(()=>{
					play('click1')
					setTimeout(()=>play('click1'), 200)
					setTimeout(()=>play('click1'), 400)
					setTimeout(()=>play('click1'), 700)
					setTimeout(()=>play('click1'), 900)
				}, 30000)
			} else {
				ratween(env.bgm, 0.75, 2000)
				rpgDialogue(bstrd, "OVER ALREADY??", true)
				env.bulletHell.setTimeout(()=>rpgDialogue(bstrd, "BUT I STILL HAVE SO MUCH!!", true), 2000)
				env.bulletHell.setTimeout(()=>{
					rpgDialogue(bstrd, "OK IM JUST GONNA USE EVERYTHING NOW", true)
					ratween(env.bgm, 1.15)
					bh_spreadShot({count:5, delay: 1500})
				}, 4000)
				
				for (let i = 0; i < 50; i++) {
					env.bulletHell.setTimeout(()=>bh_spreadShot({count:5, delay: 2000}), 3500 + (i * 500))
				}
				
				for (let i = 0; i < 13; i++) {
					env.bulletHell.setTimeout(()=>bh_kavruka({}), 3500 + (i * 2000))
				}

				env.bulletHell.setTimeout(()=>{	
					play('click1')
					setTimeout(()=>play('click1'), 200)
					setTimeout(()=>play('click1'), 400)
					setTimeout(()=>play('click1'), 700)
					setTimeout(()=>play('click1'), 900)
				}, 36000)
			}

			env.bulletHell.setTimeout(()=>{	
				env.bulletHell.complete()
				ratween(env.bgm, 0.25, 6000)
				env.bgm.fade(env.bgm.volume(), getModifiedVolume('music', 0.25), 6000)

				if(env.rpg.enemyTeam.members[0].hp > 0 || env.rpg.enemyTeam.members[2].hp > 0) {
					cutscene(true)
					env.rpg.enemyTeam.members[0].hp = 0
					env.rpg.enemyTeam.members[2].hp = 0
					updateStats({actors: env.rpg.enemyTeam.members})

					env.bulletHell.setTimeout(()=>{
						rpgDialogue(bstrd, "blew them up", true)
					}, 2000)

					env.bulletHell.setTimeout(()=>{
						rpgDialogue(bstrd, "im out", true)
					}, 4000)

					env.bulletHell.setTimeout(()=>{
						endCombat(env.rpg.enemyTeam)
						cutscene(false)
					}, 7000)
				} else {
					cutscene(true)

					env.bulletHell.setTimeout(()=>{
						rpgDialogue(bstrd, "im out", true)
					}, 2000)

					env.bulletHell.setTimeout(()=>{
						endCombat(env.rpg.enemyTeam)
						cutscene(false)
					}, 7000)
				}
			}, 36000)
		break;

		default:
			bh_kavruka({})
			bh_spreadShot({count: 15, delay: 2000})

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 2000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 4000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 6000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 8000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 10000)

			env.bulletHell.setTimeout(()=>{
				bh_kavruka({})
			}, 12000)

			env.bulletHell.setInterval(()=>bh_spreadShot({count: 15, delay: 2000}), 3000)

			env.bulletHell.setTimeout(env.bulletHell.complete, 17000)
		break;
	}
}

/* shortcut for rapidly shooting bh_delayShot a number of times */
function bh_spreadShot({count = 25, delay = 4000} = {}) {
	for (let i = 0; i < count; i++) {
		let spot = "random"
		if(i >= count * 0.8) spot = "player"
		env.bulletHell.setTimeout(()=>{
			bh_delayShot({ spot: spot, delay: delay, targetVariance: 400 })
		}, i * 20)
	}
}

//bullet - dot that appears at specified location, becomes damage reticle after x seconds
//"Spot" determines where the dot appears
	//"specific" requires that X and Y be specified
	//"random" is truly random
	//"player" appears around the player
//"targetVariance" is a pixel amount, determines the position variance on player attack only
function bh_delayShot({spot = "random", delay = 5000, x, y, targetVariance = 800}) {
	let finalX, finalY

	switch(spot) {
		case "specific": 
			finalX = x, finalY = y; 
		break

		case "random": 
			finalX = rand(0, window.innerWidth)
			finalY = rand(0, window.innerHeight)
		break

		case "player":
			finalX = env.bulletHell.cursorDelta.x + ((Math.random() * targetVariance) - targetVariance * 0.5)
			finalY = env.bulletHell.cursorDelta.y + ((Math.random() * targetVariance) - targetVariance * 0.5)
		break
	}

	//create element with css variables necessary, correspond to css setup for animation
	let currentBullet = env.bulletHell.bulletCount++
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_shot-${currentBullet}" 
			class="bh_damager bh_shot bh_shot_windup"
			style="--delay: ${delay}ms; --x: ${finalX}px; --y: ${finalY}px">
		</div>
	`)
	let bh_currentBullet = document.querySelector(`#bh_shot-${currentBullet}`)

	//add timeout to enter damage mode
	env.bulletHell.setTimeout(()=>{
		bh_currentBullet.classList.remove("bh_shot_windup")
		play("shot", true, 0.5)
	}, delay + 500)

	//add timeout to remove
	env.bulletHell.setTimeout(()=>bh_currentBullet.remove(), delay + 600)
}

//kavruka - a bomb that permanently damages the stage for the rest of combat
// one of a few fixed spots are picked for the kavruka to be thrown (slightly random)
// the kavruka arcs inwards as if tossed, though it slows at the last second
// a yellow circle appears for half a second, allowing the player to swoop in and deflect
// if they do, the kavruka is thrown back at the boss for some damage
// if they do not, env.rpg.kavrukaDamage is created (or added to)
// env.rpg.kavrukaDamage is an array of positions to add damage radii to
// there's no limit - this can create unwinnable conditions
function bh_kavruka({delay = 4400}) {
	//chooses random spot within screen bounds, leave space for full circle
	if(typeof env.rpg.kavrukaDamage == "undefined") env.rpg.kavrukaDamage = []
	if(env.rpg.kavrukaDamage >= 100) return
	let ringLimitX = env.rpg.kavrukaDamage.length * (window.innerWidth * 0.005);
	let ringLimitY = env.rpg.kavrukaDamage.length * (window.innerHeight * 0.005);
	let limits = {
		x: {
			min: ringLimitX,
			max: window.innerWidth - ringLimitX
		},
		y: {
			min: ringLimitY,
			max: window.innerHeight - ringLimitY
		}
	}

	if(env.rpg.kavrukaDamage.length < 60) {
		//do an initial random roll for position
		function roll() {finalX = rand(limits.x.min, limits.x.max); finalY = rand(limits.y.min, limits.y.max)}
		roll()

		//account for updated limits given screen damage
		//reroll the position if what it got was within one of the existing damage zones
		let rollTries = 0
		while(!env.rpg.kavrukaDamage.every(damage=>{
			return (!(finalX > damage.x && finalX < damage.xMax) && !(finalY > damage.y && finalY < damage.yMax))
		}) && rollTries < 10) { roll(); rollTries++ }
	} else {
		let scale = (window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight)
		finalX = (window.outerWidth / 2) - scale * 0.15
		finalY = (window.outerHeight / 2) - scale * 0.15
	}

	//lifecycle:
	// start - spot chosen, kavruka animates in as if tossed
	// risk - yellow spot appears, in this window pressing Q/E or clicking deflects
	// fail - explosion - kavruka explodes, wracking screen with static for an instant (invuln)
	//		  permadamage appears and is added to list

	//create element with css variables necessary, correspond to css setup for animation
	let currentBullet = env.bulletHell.bulletCount++
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_kavruka-${currentBullet}" 
			class="bh_kavruka"
			style="--delay: ${delay}ms; --spritedelay: ${delay + 500}ms; --x: ${finalX}px; --y: ${finalY}px">
		</div>
	`)
	let bh_currentBullet = document.querySelector(`#bh_kavruka-${currentBullet}`)

	//mouse or q/e press event for kavruka deflection
	//if you're over "deflectable", mark it deflected and track that out here too
	//this is an inner function so each kavruka has its own reference
	let deflected = false
	function bh_kavruka_action() {
		env.bulletHell.p.classList.remove('pulse')
		env.setTimeout(()=>{env.bulletHell.p.classList.add('pulse')}, 50)

		let targets = document.elementsFromPoint(env.bulletHell.cursorDelta.x, env.bulletHell.cursorDelta.y)
		targets.forEach(el=>{
			if(el.classList.contains('bh_deflectable')) {
				el.classList.add('bh_deflected')
				deflected = true
				play('miss', 0.75)
			}
		})
	}
	function bh_kavruka_keydown(e) {if (e.key == "q" || e.key == "e") bh_kavruka_action()}

	//add timeout to enter deflect mode
	env.bulletHell.setTimeout(()=>{
		body.addEventListener('click', bh_kavruka_action)
		body.addEventListener('keydown', bh_kavruka_keydown)

		bh_currentBullet.classList.add("bh_deflectable")
	}, delay)

	//add timeout to remove or explode
	//deflected == false means failure
	env.bulletHell.setTimeout(()=>{
		body.removeEventListener('click', bh_kavruka_action)
		body.removeEventListener('keydown', bh_kavruka_keydown)

		if(deflected) { //successful reflection
			setTimeout(()=> bh_currentBullet.remove(), 1000 )
		} else { //detonation
			bh_currentBullet.classList.remove("bh_deflectable")
			bh_currentBullet.classList.add('exploding', 'bh_damager')
			play('shot1', 0.5, 2)

			let pos = bh_currentBullet.getBoundingClientRect()
			let scale = (window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight)
			let kavrukaData = {
				x: pos.x + (pos.width / 2),
				y: pos.y + (pos.height / 2),
				//these are used for calcs on rolling future throw positions
				xMax: pos.x + pos.width,
				yMax: pos.y + pos.height,
				width: scale * 0.3,
				height: scale * 0.3,
				deg: `${rand(0, 360)}deg`
			}
			env.rpg.kavrukaDamage.push(kavrukaData)

			//update or add fire ring if needed
			if(env.rpg.kavrukaFireRing) env.rpg.kavrukaFireRing.style.setProperty('--kavrukaDamageCount', env.rpg.kavrukaDamage.length);
			else {
				env.rpg.actionZone.insertAdjacentHTML('beforeend', `
				<div id="bh_kavrukafirering" 
					class="bh_damager bh_kavrukafirering"
					style="--kavrukaDamageCount: ${env.rpg.kavrukaDamage.length}">
				</div>`)
				env.rpg.kavrukaFireRing = document.querySelector('#bh_kavrukafirering')
			}

			setTimeout(()=>{ //do fire addition
				bh_kavrukadamage(kavrukaData, true)
			}, 750)

			setTimeout(()=>{		
				bh_currentBullet.remove()
			}, 1000)
		}
		
	}, delay + 500)
}

//adds a kavruka damage layer to the bullet hell stage
function bh_kavrukadamage(data, doGrow = false) {
	document.querySelector('.bh_damage-wrapper').insertAdjacentHTML('beforeend', `
		<div id="bh_kavrukafire" 
			class="bh_kavrukafire bh_damager ${doGrow ? "grow" : ""}"
			style="--x: ${data.x}px; --y: ${data.y}px; --deg: ${data.deg}">
		</div>
	`)
}