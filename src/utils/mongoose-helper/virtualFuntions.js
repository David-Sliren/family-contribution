export function totalContributed() {
  if (!this.contributions || this.contributions.length === 0) return 0;

  return this.contributions.reduce((acc, item) => acc + (item.amount || 0), 0);
}

export function monthMoreActive() {
  if (
    !this.contributions ||
    this.contributions.length === 0 ||
    !this.contributions[0].date
  )
    return "ninguno";

  const countMonth = {};

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  this.contributions.forEach((item) => {
    const newDate = new Date(item.date);
    const selectMonth = months[newDate.getMonth()];

    countMonth[selectMonth] = (countMonth[selectMonth] || 0) + 1;
  });

  let monthMoreActive = "ninguno";
  let maxMonthActive = 0;

  for (const month in countMonth) {
    if (countMonth[month] > maxMonthActive) {
      maxMonthActive = countMonth[month];
      monthMoreActive = month;
    }
  }

  return monthMoreActive;
}
