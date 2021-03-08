import React, { useState, useEffect } from "react";
import "./styles.css";

const data = [
  { id: 1, name: "Johnny", transaction: 50, date: "01-01-2020" },
  { id: 1, name: "Johnny", transaction: 50, date: "01-22-2020" },
  { id: 1, name: "Johnny", transaction: 0, date: "02-01-2020" },
  { id: 1, name: "Johnny", transaction: 120, date: "03-01-2020" },
  { id: 2, name: "James", transaction: 50, date: "01-01-2020" },
  { id: 2, name: "James", transaction: 50, date: "02-01-2020" },
  { id: 2, name: "James", transaction: 200, date: "03-01-2020" }
];
function calculateRP() {
  const individualTrade = data.map((i) => {
    let points = 0;
    let over100 = i.transaction - 100;
    if (over100 > 0) {
      points += over100 * 2;
    }
    if (i.transaction > 50) {
      points += 50;
    }
    const month = new Date(i.date).getMonth();
    return { ...i, points, month };
  });

  let person = {};
  let totalPoints = {};
  individualTrade.forEach((individualTrade) => {
    let { id, name, month, points } = individualTrade;
    if (!person[id]) {
      person[id] = [];
    }
    if (!totalPoints[id]) {
      totalPoints[name] = 0;
    }
    totalPoints[name] += points;
    if (person[id][month]) {
      person[id][month].points += points;
    } else {
      person[id][month] = {
        id,
        name,
        month: month + 1,
        points
      };
    }
  });
  let total = [];
  for (var key in person) {
    person[key].forEach((cRow) => {
      total.push(cRow);
    });
  }

  let totalPeople = [];
  for (key in totalPoints) {
    totalPeople.push({
      name: key,
      points: totalPoints[key]
    });
  }
  return {
    total: total,
    individualTrade,
    totalPoints: totalPeople
  };
}

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(calculateRP());
  }, []);
  return (
    <div>
      <table border="1">
        <tr>
          <th>Name</th>
          <th>Month</th>
          <th>Reward Points</th>
        </tr>
        {data == null
          ? ""
          : data.total.map((i) => {
              return (
                <tr>
                  <th>{i.name}</th>
                  <th>{i.month}</th>
                  <th>{i.points}</th>
                </tr>
              );
            })}
      </table>
      {data == null
        ? ""
        : data.totalPoints.map((i) => {
            return (
              <div>
                Total reward points for {i.name} is {i.points}
              </div>
            );
          })}
    </div>
  );
}

export default App;
