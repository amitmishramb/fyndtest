function filterBirthday() {
  let birthdayDays = {
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
    SUN: [],
  };

  let data = JSON.parse(document.getElementById("textArea").value);

  const inputDate = document.getElementById("inputDate").value;
  if (!inputDate || (inputDate && inputDate.length !== 4) || !data)
    return false;

  data.forEach((values) => {
    let newDate = new Date(values.birthday);
    let year = newDate.getFullYear();
    let day = dayName[newDate.getDay()];
    if (inputDate >= year) {
      birthdayDays[day] = [...birthdayDays[day], values];
    }
  });

  renderUI(birthdayDays);
}

//sort data and render ui for each day
function renderUI(birthdayDays) {
  sortByAge(birthdayDays);

  for (const key in birthdayDays) {
    if (birthdayDays.hasOwnProperty(key)) {
      createBirdayElement(birthdayDays[key], key);
    }
  }
}
let height = {
  100: 0.99,
  50: 0.5,
};



//clear existing ui and fill birthdays days
function createBirdayElement(data, key) {
  let dayElement = document.getElementById(key);
  dayElement.innerHTML = "";

  if (!data.length) {
    let newItem = document.createElement("DIV");
    newItem.setAttribute("class", "no-data");
    newItem.innerHTML="No Birthday"
    dayElement.appendChild(newItem);
  } else {
    let width = 100 / data.length;
    let calculatedHeight = 100 / data.length;

    data.forEach((value, index) => {
      let name = value["name"].split(" ");
      let newItem = document.createElement("DIV");
      newItem.setAttribute("class", "card-body-item");
      newItem.setAttribute(
        "style",
        `background-color:${
          colors[index] || colors[index - 7]
        };width:${width}%;height:calc(20vh*${
          calculatedHeight > 34 ? height[calculatedHeight] : 0.33333
        })`
      );
      newItem.innerHTML = name[0][0] + name[1][0];
      dayElement.appendChild(newItem);
    });
  }
}

//sort bithday asseding
function sortByAge(birthdayDays) {
  for (const key in birthdayDays) {
    if (birthdayDays.hasOwnProperty(key)) {
      if (birthdayDays[key].length) {
        birthdayDays[key] = birthdayDays[key].sort(function (a, b) {
          return new Date(b.birthday) - new Date(a.birthday);
        });
      }
    }
  }
}

const colors = [
  "#555D7B",
  "#9ED301",
  "#C87C98",
  "#79CAE5",
  "#E8492A",
  "#0055D0",
  "#FF1BAA",
  "#0CCBFD",
];
const dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
