import {ItemTypes} from '../../components/constants/constants'
export default class DevService {

    domain = (req) => `${ItemTypes.PATH}/${req}`

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

    deleteTemplateById = async (data) => {

        return await this.getDataFromURL(this.domain('deleteTemplate'),data) 

    }

    logout = async (data) => {

        return await this.getDataFromURL(this.domain('logout')) 

    }

    authorization = async (data) => {

        return await this.getDataFromURL(this.domain('login'), {}, true, data)

    }

    registration = async (data) => {

        return await this.getDataFromURL(this.domain('registration'), data)

    }

    saveTaskTemplate = async (template) => {

        return await this.getDataFromURL(this.domain('createTemplate'), template)

    }

    getTemplates = async () => {

        return await this.getDataFromURL(this.domain('getAllTemplates'))

    }

    getTowns = async () => {

        return await this.getDataFromURL(this.domain('getAllTowns'))

    }

    reportTasksDays = async (dates) => {

        return await this.getDataFromURL(this.domain('reportTasksDays'), dates)

    }

    getTasks = async (curDate) => {

        return await this.getDataFromURL(this.domain('getAllTasks'), curDate)

    }

    createNewTask = async (task) => {

        return await this.getDataFromURL(this.domain('createNewTask'), task)

    }

    actionsFromTask = async (taskinfo) => {

        return await this.getDataFromURL(this.domain('controllTask'), taskinfo)
      
    }

}

