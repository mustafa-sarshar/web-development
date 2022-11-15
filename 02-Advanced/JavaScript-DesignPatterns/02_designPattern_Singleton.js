// Creational Category: Singleton Pattern
// Purpose: To limit the number of instances of an object to at most one
// Define Objects

const Singleton = (function () {
    function ProcessManager() {
        this.numProcess = 0;
    }

    let pManager;
    function createProcessManager() {
        pManager = new ProcessManager();
        return pManager;
    }

    return {
        getProcessManager: () => {
            if (!pManager)
                pManager = createProcessManager();
            return pManager;
        }
    }
})();

const processManager1 = Singleton.getProcessManager();
const processManager2 = Singleton.getProcessManager();

console.log(processManager1 === processManager2);