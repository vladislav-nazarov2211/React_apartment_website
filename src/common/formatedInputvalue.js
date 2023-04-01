let getInputNumberValue = function(input) {
    return input.value.replace(/\D/g, "") 
} 

export function onPhoneInput(e) {
    let input = e.target
    let inputNumbersValue = getInputNumberValue(input)
    let formattedInputValue = ''
    let selectionStart = input.selectionStart
    
    if (!inputNumbersValue) {
        return input.value = ''
    }

    if (input.value.length != selectionStart) {
        if (e.nativeEvent.data && /\D/g.test(e.nativeEvent.data)) {
            input.value = inputNumbersValue
        }
        return
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {   
        formattedInputValue = '+7' + " " 
        if (inputNumbersValue.length > 1) {
            formattedInputValue += "(" + inputNumbersValue.substring(1, 4)
        }
        if (inputNumbersValue.length >= 5) {
            formattedInputValue += ") " + inputNumbersValue.substring(4, 7)
        }  
        if (inputNumbersValue.length >= 8) {
            formattedInputValue += "-" + inputNumbersValue.substring(7, 9)
        } 
        if (inputNumbersValue.length >= 10) {
            formattedInputValue += "-" + inputNumbersValue.substring(9, 11)
        }       

    } else {
        formattedInputValue = '+' + inputNumbersValue.substring(0, 16)
    }

    input.value = formattedInputValue

}

export let onPhoneKeyDown = function(e) {
    let input = e.target
    if (e.keyCode == 8 && getInputNumberValue(input).length == 1) {
        input.value = ''
    }
}

export let onPhonePaste = function(e) {
    let pasted = e.clipboardData || window.clipboardData
    let input = e.target
    let inputNumbersValue = getInputNumberValue(input)

    if (pasted) {
        let pastedText = pasted.getData('Text')
        if (/\D/g.test(pastedText)) {
            input.value = inputNumbersValue
        }
    }
}