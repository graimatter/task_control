export default class DevService {


    getDataFromURL = async (url) => {

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not get data from ${url}, ${res.status}`);
        }
        return await res.json();
    };

    saveTaskTemplate = async(template) => {

        let newId = -1
        await fetch('http://localhost:3001/createTemplate', {
            method: 'post',
            //mode: 'no-cors',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(template)
        })
            .then(result => result.json())  
            .then(data => {
                console.log(data)
                newId = data
            })  
            .catch(function (error) {
                console.log('Request failed', error);
            });

            return newId

    }

    getTemplates = async () => {
        const templates = []

        await fetch('http://localhost:3001/getAllTask', { method: 'post' })
        .then(result => result.json())
        .then(items =>
        items.forEach((item) => {
            
            if (item !== null && item.id) {

                templates.push(
                    {
                        id: item.id,
                        title: item.title
                    }
                )

            }
        }
        ))
        console.log(templates)
        return templates
    }

    /*getTaskTemplateById = async (id) => {
        const templates = []
        await fetch('http://localhost:3001/getTask', {
            method: 'post',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : id})
        })
        .then(result => result.json())
        .then(items =>
            items.forEach((item) => {
                if (item !== null) {
                    let template = {}
                    template.task_id = item.task_id
                    template.element_id = item.element_id
                    template.field_type = item.TYPE
                    template.field_name = item.LABEL
                    template.current_id = -1
                    template.current_value = ''
                    template.values =[]
                    if(item.value !== null){
                        let ids = item.value_id.split(',')
                        let keys = item.value.split(',')
                        for(let i = 0; i < ids.length; i++){
                            let newitem = {
                                id : 100+(+ids[i]),
                                key : keys[i]
                            }
                            template.values.push(newitem)
                        }

                    }
                    templates.push(template)

                }
            }
            )
        )

        return templates
    }*/


}

