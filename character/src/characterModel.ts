interface CharacterData {
  [key: string]: any[] | any
}

class CharacterModel {
  garage: { category: string; item: string }[] = []
  locker: { category: string; item: string }[] = []
  cash: number = 0
  cash_bank: number = 0
  paygrade: string = ''
  holster: {
    active: number
    data: {
      classname: string
      magazine: string
      handgunitems: []
      rounds: number
    }
  } = {
    active: 0,
    data: { classname: '', magazine: '', handgunitems: [], rounds: 0 }
  }
  phone_number: number = 0
  rating: number = 0
  position: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
  direction: number = 0
  currentWeapon: string = ''
  stance: string = ''
  uniform: string = ''
  vest: string = ''
  backpack: string = ''
  goggles: string = ''
  headgear: string = ''
  primaryWeapon: string = ''
  secondaryWeapon: string = ''
  handgunWeapon: string = ''
  primaryWeaponItems: string[] = []
  secondaryWeaponItems: string[] = []
  handgunItems: string[] = []
  assignedItems: string[] = []
  uniformWeapons: string[] = []
  uniformItems: { item: string; count: number }[] = []
  uniformMagazines: { classname: string; value?: number; rounds: number }[] = []
  vestWeapons: string[] = []
  vestItems: string[] = []
  vestMagazines: { classname: string; value?: number; rounds: number }[] = []
  backpackWeapons: string[] = []
  backpackItems: string[] = []
  backpackMagazines: { classname: string; value?: number; rounds: number }[] =
    []
  loadedMagazines: { classname: string; rounds: number }[] = []

  constructor(data: CharacterData) {
    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case 'Garage':
          this.garage = value.map(([category, item]: [string, string]) => ({
            category,
            item
          }))
          break
        case 'Locker':
          this.locker = value.map(([category, item]: [string, string]) => ({
            category,
            item
          }))
          break
        case 'Cash':
          this.cash = value as number
          break
        case 'Cash_Bank':
          this.cash_bank = value as number
          break
        case 'Paygrade':
          this.paygrade = value as string
          break
        case 'Holster':
          let [active, holsterData] = value
          if (holsterData.length > 0) {
            this.holster = {
              active,
              data: {
                classname: holsterData[0],
                magazine: holsterData[1],
                handgunitems: holsterData[2].map((item: string) => ({
                  classname: item
                })),
                rounds: holsterData[3]
              }
            }
          } else {
            this.holster = {
              active,
              data: {
                classname: '',
                magazine: '',
                handgunitems: [],
                rounds: 0
              }
            }
          }
          break
        case 'Phone_Number':
          this.phone_number = value as number
          break
        case 'Rating':
          this.rating = value as number
          break
        case 'Position':
          this.position = { x: value[0], y: value[1], z: value[2] }
          break
        case 'Direction':
          this.direction = value as number
          break
        case 'CurrentWeapon':
          this.currentWeapon = value as string
          break
        case 'Stance':
          this.stance = value as string
          break
        case 'Uniform':
          this.uniform = value as string
          break
        case 'Vest':
          this.vest = value as string
          break
        case 'Backpack':
          this.backpack = value as string
          break
        case 'Goggles':
          this.goggles = value as string
          break
        case 'Headgear':
          this.headgear = value as string
          break
        case 'PrimaryWeapon':
          this.primaryWeapon = value as string
          break
        case 'SecondaryWeapon':
          this.secondaryWeapon = value as string
          break
        case 'HandgunWeapon':
          this.handgunWeapon = value as string
          break
        case 'PrimaryWeaponItems':
          this.primaryWeaponItems = value.map((item: string) => item)
          break
        case 'SecondaryWeaponItems':
          this.secondaryWeaponItems = value.map((item: string) => item)
          break
        case 'HandgunItems':
          this.handgunItems = value.map((item: string) => item)
          break
        case 'AssignedItems':
          this.assignedItems = value.map((item: string) => item)
          break
        case 'UniformMagazines':
          this.uniformMagazines = value.map(
            ([classname, value, rounds]: [string, number, number]) => ({
              classname,
              // value,
              rounds
            })
          )
          break
        case 'VestMagazines':
          this.vestMagazines = value.map(
            ([classname, value, rounds]: [string, number, number]) => ({
              classname,
              // value,
              rounds
            })
          )
          break
        case 'BackpackMagazines':
          this.backpackMagazines = value.map(
            ([classname, value, rounds]: [string, number, number]) => ({
              classname,
              // value,
              rounds
            })
          )
          break
        case 'LoadedMagazines':
          this.loadedMagazines = value.map(
            ([classname, rounds]: [string, number]) => ({
              classname,
              rounds
            })
          )
          break
        default:
          break
      }
    })
  }
}

export default CharacterModel
