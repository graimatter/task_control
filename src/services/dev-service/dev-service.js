export default class DevService {


    getDataFromURL = async (url) => {

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not get data from ${url}, ${res.status}`);
        }
        return await res.json();
    };

    saveTaskTemplate = async (template) => {

        let ans = {}

        await fetch('http://localhost:3001/createTemplate', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template)
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans

    }

    getTemplates = async () => {
        
        let ans = {}

        await fetch('http://localhost:3001/getAllTemplates', { method: 'post' })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans
    }

    getTowns = async () => {
        
        let ans = {}

        await fetch('http://localhost:3001/getAllTowns', { method: 'post' })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans
    }

    reportTasksDays = async (dates) => {
        
        let ans = {}
        await fetch('http://localhost:3001/reportTasksDays', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dates)
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans
    }

    getTasks = async (curDate) => {
        
        let ans = {}
        await fetch('http://localhost:3001/getAllTasks', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({curDate : curDate})
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans
    }

    deleteTemplateById = async (templateId) => {

        let ans = {}
        await fetch('http://localhost:3001/deleteTemplate', {
            method: 'post',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : templateId})
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans

    }

    saveDescription = async (taskId) => {

        let ans = {}
        await fetch('http://localhost:3001/saveDescription', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : taskId})
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans

    }

    createNewTask = async (task) => {

        let ans = {}

        await fetch('http://localhost:3001/createNewTask', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans

    }

    actionsFromTask  = async (taskinfo) => {

        let ans = {}

        await fetch('http://localhost:3001/controllTask', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskinfo)
        })
            .then(result => result.json())
            .then(data => {
                ans = data
            })
            .catch(function (error) {
                const badRes = {
                    status: -1,
                    result: error
                }
                ans = badRes
            });

        return ans

    }

}

