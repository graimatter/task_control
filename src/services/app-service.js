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

   

    saveTaskTemplate(template) {
        return this.appservice.saveTaskTemplate(template)
    }

    getTemplates() {
        return this.appservice.getTemplates()
    }

    getTasks(curDate) {
        return this.appservice.getTasks(curDate)
    }

    deleteTemplateById(templateId) {
        return this.appservice.deleteTemplateById(templateId)
    }

    createNewTask(task) {
        return this.appservice.createNewTask(task)
    }

    actionsFromTask(taskinfo) {
        return this.appservice.actionsFromTask(taskinfo)
    }

}