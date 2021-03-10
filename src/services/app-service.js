import DevService from './dev-service/dev-service.js'
export default class AppService {

    //appservice = new Object()
    
    constructor(type){
        
        if(type === 'dev'){
            if (!(this.appservice instanceof DevService)){
                this.appservice = new DevService()
            }   
            return this 
        }

    }

    getTasksTypesList() {
        return this.appservice.getTasksTypesList()
    }

    getTemplates() {
        return this.appservice.getTemplates()
    }

    getTaskTemplateById(id) {
        return this.appservice.getTaskTemplateById(id)
    }

    saveTaskTemplate(template) {
        return this.appservice.saveTaskTemplate(template)
    }

    createNewTask(task) {
        return this.appservice.createNewTask(task)
    }
}