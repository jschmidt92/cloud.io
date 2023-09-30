interface GarageData {
  0: string[]
  1: string[]
  2: string[]
  3: string[]
  4: string[]
  5: string[]
}

class GarageModel {
  cars: string[] = []
  armor: string[] = []
  helis: string[] = []
  planes: string[] = []
  naval: string[] = []
  static: string[] = []

  constructor(data: GarageData) {
    this.cars = data[0]
    this.armor = data[1]
    this.helis = data[2]
    this.planes = data[3]
    this.naval = data[4]
    this.static = data[5]
  }
}

export default GarageModel
