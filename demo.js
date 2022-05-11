let day = 1
let dayMoney = []

for (let money = 1; true; day++) {
     let addMoney = 0
     if (day === 1) {
          dayMoney[day] = money
          console.log(`第${day}天赚${money}`)
          continue
     }
     money = money * 2
     dayMoney[day] = money
     for (let v in dayMoney) {
          addMoney = addMoney + dayMoney[v]
     }
     console.log(`第${day}天赚${addMoney}`)
     if (addMoney >= 500) {
          break
     }
}
//1+2+4+8