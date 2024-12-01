
function GuessGen(number){
    if (number > "898")
        return "9"
    else if (number > "809")
        return "8"
    else if (number > "721")
        return "7"
    else if (number > "649")
        return "6"
    else if (number > "493")
        return "5"
    else if (number > "386")
        return "4"
    else if (number > "251")
        return "3"
    else if (number > "151")
        return "2"
    else if (number > "0")
        return "1"
}


class Pokemon {
    constructor(name, number, type, type2, gen, description, sprite){
        this.name = name
        this.number = number
        this.type = type
        this.type2 = type2
        this.gen = GuessGen(number)
        this.description = description
        this.sprite = sprite
    }
}
