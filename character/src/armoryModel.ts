interface ArmoryData {
  0: string[]
  1: string[]
  2: string[]
  3: string[]
}

class ArmoryModel {
  items: string[] = []
  weapons: string[] = []
  magazines: string[] = []
  backpacks: string[] = []

  constructor(data: ArmoryData) {
    this.items = data[0]
    this.weapons = data[1]
    this.magazines = data[2]
    this.backpacks = data[3]
  }
}

export default ArmoryModel
