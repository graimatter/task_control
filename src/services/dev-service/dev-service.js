export default class DevService {


    getDataFromURL = async (url, inputdata , auth = false, token = '') => {

        let ans = {}
        let headers = {
            'Content-Type': 'application/json'
        }
        if (auth) {
            headers = {
                'authorization': 'Basic ' + token,
                'Content-Type': 'application/json'
            }
        }
        await fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(inputdata)
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
    };

    logout = async (data) => {

        return await this.getDataFromURL('http://localhost:3001/logout') 

    }

    authorization = async (data) => {

        return await this.getDataFromURL('http://localhost:3001/login', {}, true, data)

    }

    registration = async (data) => {

        return await this.getDataFromURL('http://localhost:3001/registration', data)

    }

    saveTaskTemplate = async (template) => {

        return await this.getDataFromURL('http://localhost:3001/createTemplate', template)

    }

    getTemplates = async () => {

        return await this.getDataFromURL('http://localhost:3001/getAllTemplates')

    }

    getTowns = async () => {

        return await this.getDataFromURL('http://localhost:3001/getAllTowns')

    }

    reportTasksDays = async (dates) => {

        return await this.getDataFromURL('http://localhost:3001/reportTasksDays', dates)

    }

    getTasks = async (curDate) => {

        return await this.getDataFromURL('http://localhost:3001/getAllTasks', curDate)

    }

    /*deleteTemplateById = async (templateId) => {

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

    }*/

    createNewTask = async (task) => {

        return await this.getDataFromURL('http://localhost:3001/createNewTask', task)

        /*let ans = {}

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

        return ans*/

    }

    actionsFromTask = async (taskinfo) => {

        return await this.getDataFromURL('http://localhost:3001/controllTask', taskinfo)

        /*let ans = {}

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

        return ans*/

    }

}

