let E_HP = 0
let My_HP = 50
let Enemy = 0
let Attack = 2
let Power = 1
let E_Power = 1
let p

function Start() {
  E_HP = 0
  My_HP = 50
  const dialog = document.getElementById("Start");
  dialog.show();  // ダイアログを表示する
  dialog.setAttribute("open", "true");  // "open"属性を設定してダイアログを表示状態にする
};

function Battle() {
  document.getElementById("open").remove();  
  let button = document.createElement("button")
  button.setAttribute('id','Word')
  button.setAttribute('onclick','Word()')
  button.innerHTML = "Word"
  document.body.appendChild(button)
  document.getElementById("Ename").innerHTML = "りんご"
  document.getElementById("title").innerHTML = "<img src='Enemy0.jpg'>"
  let HP = document.createElement("p")
  HP.setAttribute('id','HP')
  document.body.appendChild(HP)
  document.getElementById("HP").innerHTML = `Your HP:${My_HP}`
};

function Word() {
  const dialog = document.getElementById("Word");
  dialog.show()
  dialog.setAttribute("open","true")
};

function Fight() {
  const text = document.getElementById("Text").value
  const jsonData = {
    "悪口":"3",
    "カウンター":"1",
    "パンチ": "5",
    "キック": "7",
    "チョップ":"10",
    "ミラクルパンチ":Math.floor(Math.random() * 50) + 50,
    "リーフストーム":"20",
    "雷魔法":"25",
    "闇魔法":"50",
    "緊急回避":"0",
    "回復魔法":"0",
    "超回復魔法":"0",
    "かかと落とし":"30",
    "正拳突き":"700",
    "攻撃力上昇":"0",
    "サンダーソード":"50",
    "破壊光線":"300",
    "デスビーム":"500",
    "かめはめ波":"1000",
    "フラッシュライト":"0",
    "死ね":"1",
    "炎魔法":"2500",
    "風魔法":"1200",
    "ビッグバン":"3000"
  };
  function getElementValue(elementToCheck) {
    if (elementToCheck in jsonData) {
      document.getElementById("Text").value = ""
      return jsonData[elementToCheck];
    } else {
      return null;
    }
  }
  
  let MODE = "noraml"

  const elementToCheck = text; // 調べたい要素名を指定してください
  
  if (elementToCheck in jsonData) {
    const value = getElementValue(elementToCheck) * Power;
    Power = 1
    H = 0

    if (elementToCheck == "回復魔法" || elementToCheck == "超回復魔法") {
      MODE = "回復"
      if (elementToCheck == "回復魔法") {
        H = My_HP + Math.floor(Math.random() * 5) + 10;
        My_HP = My_HP + H
        if (My_HP >= 700) {
          alert(`あなたのHPは上限値です`)
          My_HP = 700
        } else {
          alert(`あなたはHPが${H}回復した`)
        }
      } else {
        H = My_HP + Math.floor(Math.random() * 25) + 10;
        My_HP = My_HP + H
        if (My_HP >= 700) {
          alert(`あなたのHPは上限値です`)
          My_HP = 700
        } else {
          alert(`あなたはHPが${H}回復した`)
        }
      }

    } else if (elementToCheck == "カウンター") {
      alert("あなたはカウンターの態勢に入った")
      MODE = "カウンター"

    } else if (elementToCheck == "フラッシュライト" && document.getElementById("Ename").textContent == "魔王") {
      alert('目の前が真っ白になった')
      alert('魔王が弱体化したようだ')
      E_HP = Math.round(E_HP/1000)
      Attack = 2

    } else if (elementToCheck == "攻撃力上昇") { 
      alert('次のターン攻撃力が2倍になる！！')
      Power = 2

    } else if (elementToCheck == "緊急回避") { 
      alert('このターンの攻撃を気で察知して避けに専念した！！')
      MODE = "回避"

    } else {
      E_HP = Math.max(0,E_HP - value);
      alert(`あなたは${elementToCheck}を繰り出した！！`)
      alert(`${value}のダメージ`);
      if (elementToCheck == "ミラクルパンチ") {
        const H = Math.round(value / 2)
        alert(`あなたはHPが${H}回復した`)
      };
    };

    if (E_HP == 0) {

      if (document.getElementById("Ename").textContent == "last boss") {
        const dialog = document.getElementById("Clear");
        dialog.show();
        dialog.setAttribute("open","true")
      } else {
        const dialog = document.getElementById("K_O");
        dialog.show();
        dialog.setAttribute("open","true")
      }

    } else {

      let damage

      //敵の攻撃
      if (document.getElementById("Ename").textContent == "りんご") {
        const pattern = Math.floor(Math.random() * 2) + 1

        if (pattern == "1") {
          damage = Math.floor(Math.random() * 5) + 1 * E_PowerW
          alert(`${document.getElementById("Ename").textContent}は悪口を言ってきた`)
          if (MODE == "カウンター") {
            damage = damage * 2
            alert(`あなたは${damage}のダメージを跳ね返した`)
            E_HP = E_HP - damage
          } else if (MODE == "回避")  {
            alert('しかし、技を察知して回避した')
          } else {
            alert(`あなたは${damage}のダメージを受けた`)
            My_HP = My_HP - damage
          };
        } else if (pattern == "2") {
          alert("相手は不気味に笑っている")
        }
        

      } else if (document.getElementById("Ename").textContent == "バナナ") {
        const pattern = Math.floor(Math.random() * 4) + 1

        if (pattern == "1") {
          damage = Math.floor(Math.random() * 10) + 10
          alert(`${document.getElementById("Ename").textContent}はリーフストームを放ってきた`)
          alert(`あなたは${damage}のダメージを受けた`)
          My_HP = My_HP - damage

        } else if (pattern == "2") {
          damage = Math.round(value/1.5)
          alert(`${document.getElementById("Ename").textContent}はカウンターを仕掛けてきた`)
          if (MODE == "カウンター") {
            alert("特に効果はなかった")
          } else if (MODE == "回避")  {
            alert('特に効果はなかった')
          } else {
            alert(`あなたは${damage}のダメージを受けた`)
          }
          My_HP = My_HP - damage
          
        } else if (pattern == "3") {
          const recoverly = Math.floor(Math.random() * 10) + 10
          alert(`${document.getElementById("Ename").textContent}は回復魔法を使用した`)
          alert(`${document.getElementById("Ename").textContent}は${recoverly}回復した`)

        } else if (pattern == "4") {
          damage = Math.floor(Math.random() * 15) + 10
          alert(`${document.getElementById("Ename").textContent}はかかと落としを放ってきた`)
          if (MODE == "カウンター") {
            damage = damage * 2
            alert(`あなたは${damage}のダメージを跳ね返した`)
            E_HP = E_HP - damage
          } else if (MODE == "回避")  {
            alert('しかし、技を察知して回避した')
          } else {
            alert(`あなたは${damage}のダメージを受けた`)
            My_HP = My_HP - damage
          }
        }

      } else if (document.getElementById("Ename").textContent == "魔王") {
        if (p == "yes") {
          damage = Math.floor(Math.random() * 50) + 20000000000000000000000000
          alert(`${document.getElementById("Ename").textContent}は近くの自然や生命の力を奪い取ってビームを繰り出した`)
          if (MODE == "回避")  {
            alert('しかし、技を察知して回避した')
          } else {
            alert(`あなたは${damage}のダメージを受けた`)
            My_HP = My_HP - damage
            E_HP = E_HP + damage
          };

          p = "no"

        } else {
          const pattern = Math.floor(Math.random() * 10) + 1

          if (pattern == "1") {
            damage = Math.floor(Math.random() * 25) + 20 * Attack * E_Power
            alert(`${document.getElementById("Ename").textContent}は闇魔法を放ってきた`)
            if (MODE == "回避")  {
              alert('しかし、技を察知して回避した')
            } else {
              alert(`あなたは${damage}のダメージを受けた`)
              My_HP = My_HP - damage
            }

          } else if (pattern == "2") {
            damage = value * 2 * Attack * E_Power
            alert(`${document.getElementById("Ename").textContent}はカウンターを仕掛けてきた`)
            if (MODE == "カウンター") {
              alert("特に効果はなかった")
            } else if (MODE == "回避")  {
              alert('しかし、技を察知して回避した')
            } else {
              alert(`あなたは${damage}のダメージを受けた`)
              My_HP = My_HP - damage
            }
          
          } else if (pattern == "3") {
            const recoverly = Math.floor(Math.random() * 70) + 50 * Attack * E_Power
            alert(`${document.getElementById("Ename").textContent}は回復魔法を使用した`)
            alert(`${document.getElementById("Ename").textContent}は${recoverly}回復した`)
            E_HP = E_HP + recoverly

          } else if (pattern == "4") {
            damage = Math.floor(Math.random() * 20) + 50 * Attack * E_Power
            alert(`${document.getElementById("Ename").textContent}は正拳突きを放ってきた`)
            if (MODE == "カウンター") {
              damage = damage * 2
              alert(`あなたは${damage}のダメージを跳ね返した`)
              E_HP = E_HP - damage
            } else if (MODE == "回避")  {
              alert('しかし、技を察知して回避した')
            } else {
              alert(`あなたは${damage}のダメージを受けた`)
              My_HP = My_HP - damage
            };

          } else if (pattern == "5") {
            alert(`${document.getElementById("Ename").textContent}は攻撃量上昇を発動した`)
            E_Power = Attack * 4

          } else if (pattern == "6") {
            alert(`${document.getElementById("Ename").textContent}はつらら張りを発動した`)
            const num = Math.floor(Math.random() * 5) + 7
            let y = 0
            for (let x = 0; x < num; x++) {
              damage = Math.floor(Math.random() * 5) + 5 * Attack * Power
              if (MODE == "カウンター") {
                damage = damage * 2 
                alert(`あなたは${damage}のダメージを跳ね返した`)
                E_HP = E_HP - damage
              } else if (MODE == "回避")  {
                alert('しかし、技を察知して回避した')
              } else {
                alert(`あなたは${damage}のダメージを受けた`)
                My_HP = My_HP - damage
                y = y + damage
              };
            }
            alert(`${num}回当たって、${y}のダメージを受けた`)

          } else if (pattern == "7") {
            alert(`${document.getElementById("Ename").textContent}はミラクルパンチを放った`)
            damage = Math.floor(Math.random() * 30) + 20 * Attack * E_Power
            if (MODE == "カウンター") {
              damage = damage * 2
              alert(`あなたは${damage}のダメージを跳ね返した`)
              E_HP = E_HP - damage
            } else if (MODE == "回避")  {
              alert('しかし、技を察知して回避した')
            } else {
              alert(`${document.getElementById("Ename").textContent}は${damage}回復した`)
              alert(`は${damage}のダメージを受けた`)
              My_HP = My_HP - damage
              E_HP = E_HP + damage
            };

          } else if (pattern == "8") {
            alert(`${document.getElementById("Ename").textContent}は様子をうかがっている`)

          } if (pattern == "9") {
            damage = Math.floor(Math.random() * 40) + 25 * Attack * E_Power
            alert(`${document.getElementById("Ename").textContent}はカウンターと回避を読む攻撃を仕掛けた`)
            if (MODE == "カウンター" || MODE == "回避" || MODE == "回復") {
              My_HP = My_HP - damage
              alert(`カウンターを読まれて${damage}のダメージを受けた`)
            } else {
              alert('しかし、当たらなかった')
            };
          
          } else if (pattern == "10") {
            alert(`${document.getElementById("Ename").textContent}は不気味に笑っている`)
            p = "yes"
          }
          E_HP = E_HP + 50

        }  
      };


      if (My_HP <= 0) {
        const dialog = document.getElementById("GAME_OVER");
        dialog.show();
        dialog.setAttribute("open","true")

      } else {
        document.getElementById("HP").innerHTML = `Your HP:${My_HP}`
      };
    }
  } else {
    alert("その言葉は今回含まれていません");
  }

 
};

function Back() {
  location.reload()
};

function NEXT() {
  if (document.getElementById("Ename").textContent == "りんご") {
    document.getElementById("Ename").innerHTML = "バナナ"
    E_HP = 200
    document.getElementById("title").innerHTML = "<img src='Enemy1.jpg'>"
    My_HP = 50
    let HP = document.createElement("p")
    HP.setAttribute('id','HP')
    document.body.appendChild(HP)
    document.getElementById("HP").innerHTML = `Your HP:${My_HP}`
  } else if (document.getElementById("Ename").textContent == "バナナ") {
    document.getElementById("Ename").innerHTML = "魔王"
    E_HP = 1000000000
    Attack = 4
    p = "no"
    document.getElementById("title").innerHTML = "<img src='Enemy2.jpg'>"
    My_HP = 75
    let HP = document.createElement("p")
    HP.setAttribute('id','HP')
    document.body.appendChild(HP)
    document.getElementById("HP").innerHTML = `Your HP:${My_HP}`
  }
}