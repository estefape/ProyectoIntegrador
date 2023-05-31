import {useState} from 'react'

const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState)

    const handleInputChanges = ({target}) => {
        setValues({
            ...values,
            [target.name]:target.value

        })
    }

    const handleFileChanges = ({target}) => {
        let file = target.files[0];
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);
      
        reader.onloadend = function (e) {
            setValues({
                ...values,
                [target.name]: file
    
            })
                //console.log(reader.result)
          }

        setValues({
            ...values,
            [target.name]: file

        })
        console.log(target.files)
    }

    const reset = () => {
        setValues(initialState)
    }

    return [values,handleInputChanges,handleFileChanges,reset]
}

export default useForm;