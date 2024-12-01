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
