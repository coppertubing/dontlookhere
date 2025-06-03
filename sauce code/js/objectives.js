/*
    this file defines two classes:

    Objective
        these say what to happen
        objects that have a name, and a variety of controls

    ObjectiveList
        these make what should happen, happen
        objects that hook into the corru_changed event to keep track of the OBJECTIVES they contain
        may create an HTML element if the constructor calls for it

        on every corru_changed, run through the list of objectives and determine:
            - whether they can be shown
            - whether they've been completed
            - whether any exec should happen as a result
        
        additionally, update HTML element if it exists
        should hook into corru_leaving to delete itself and unhook the event

        currently no need to add/remove objectives outside of creation
  
    usage IE:
        let x = new ObjectiveList({objectives: [
                new Objective({
                        name: "Find a Foundry Vat",
                        completion: "higuys2",
                        exec: ()=>{console.log('higuys')}
                }),
                new Objective({
                        name: "Upgrade 3 Abilities",
                        progress: ()=> {return `(${check('PAGE!!upgrades')}/3)`},
                        showIf: "higuys2",
                        completion: ()=>{return check("PAGE!!upgrades") >= 3},
                        exec: ()=>{console.log('higuys')}
                }),
                new Objective({
                        name: "Find Itzil's Kivii",
                        completion: "testehehe",
                        showIf: "higuys244",
                        exec: ()=>{console.log('higuys')}
                })
            ],
        })
*/

class Objective {
    constructor({
        name, //required, human-readable string of what this objective is
        completion, //required, a getShowValidity() condition to determine if it's been done yet
        progress, //optional, a function that is ran to get the progress string (i.e. 0/3)
        showIf, //optional, a getShowValidity() condition to determine if it should be rendered
        hideOnCompletion, //optional bool, treats the opposite of completion as the showIf
        definition, //optional string, adds definition hover text to objective
        exec, //optional, function, ran when completion occurs - will not run if completion is true on creation of objective
        priority = 0, //optional #, used to order in lists of ObjectiveList
    }) {
        Object.assign(this, {name, completion, showIf, exec, priority, progress, hideOnCompletion, definition})
        this.id = Objective.count++

        //determine if this has already been completed before definition
        if(getShowValidity(this.completion)) this.completed = true
    }

    //check for completion, and if it's newly completed, run the exec
    checkCompletion = () => {
        if(this.completed) return true

        if(getShowValidity(this.completion)) {
            this.completed = true
            if(this.exec) this.exec()
            return true
        }

        return false
    }

    //getShowValidity with a wrapper for "hideOnCompletion"
    shouldShow = () => {
        let validity

        if(this.hideOnCompletion) {
            validity = (!getShowValidity(this.completion)) && (this.showIf ? getShowValidity(this.showIf) : true)
        } else {
            validity = getShowValidity(this.showIf)
        }
        
        return validity
    }

    static count = 0
}

class ObjectiveList {
    constructor({
        objectives = [],
        renderHTML = true
    }) {
        this.objectives = objectives
        this.objectives.sort((a, b) => a.priority - b.priority);

        document.addEventListener('corru_changed', this.changeTracker)
        document.addEventListener('corru_leaving', this.cleanup)
        
        this.renderHTML = renderHTML
        this.render()
        return this        
    }

    //ran on corru_changes, runs through all this.objectives to update them
    changeTracker = () => {
        this.objectives.forEach(objective=>{
            objective.checkCompletion()
        })

        this.render()
    }

    //will either create or update the objective list 
    render = () => {
        if(!this.renderHTML) return

        //create el if needed
        if(!this.el && !body.querySelector('#objectives')) {
            body.insertAdjacentHTML('beforeend', `<div id="objectives" class="active"><div class="toggle"></div></div>`)
            this.el = body.querySelector('#objectives')

            this.el.querySelector('.toggle').addEventListener('click', ()=>{
                this.el.classList.toggle('active')
            })

            this.objectives.forEach(objective => {
                this.el.insertAdjacentHTML('beforeend', `
                    <div id="objective-${objective.id}" class="objective ${objective.completed ? "completed" : ""} ${objective.shouldShow() ? "" : "hide"}" ${objective.definition ? `definition="${objective.definition}"` : ""}>
                        <span>
                            ${objective.name}
                            ${typeof objective.progress == "function" ? `<span class="progress">${objective.progress()}</span>` : ``}
                        </span>
                    </div>
                `)
                objective.el = this.el.querySelector(`#objective-${objective.id}`)
            })
        }

        //otherwise run through and update objectives
        else {
            this.objectives.forEach(objective => {
                if(objective.completed) objective.el.classList.add('completed')
                if(!objective.shouldShow()) objective.el.classList.add('hide'); else objective.el.classList.remove('hide')
                if(typeof objective.progress == "function") objective.el.querySelector('.progress').innerHTML = objective.progress()
            })
        }
    }

    //if all objectives within the list are completed, this is true
    isListCompleted = () => {
        return this.objectives.every(objective => objective.completed == true)
    }

    cleanup = () => {
        document.removeEventListener('corru_changed', this.changeTracker)
        document.removeEventListener('corru_leaving', this.cleanup)
        if(this.el) {
            this.el.remove()
            this.el = null
        }
    }
}