export function renderChart({ funnel, schedule }, { locale = 'en', labels = { prospects: 'Prospects', leads: 'Leads', customers: 'Customers' } } = {}) {
  const chart = document.getElementById('chart');
  const axis = document.getElementById('axis');
  const number = value => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  const date = value => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(value);
  const maximum = funnel.prospects || 1;
  chart.replaceChildren();
  for (const point of schedule.points) {
    const row = document.createElement('div');
    row.className = 'chart-row';
    row.tabIndex = 0;
    const description = [date(point.date), ...Object.keys(labels).map(key => `${labels[key]}: ${number(funnel[key] * point.fraction)}`)].join('\n');
    row.setAttribute('aria-label', description.replaceAll('\n', ', '));
    for (const [key, className] of [['prospects', 'prospect'], ['leads', 'lead'], ['customers', 'customer']]) {
      const bar = document.createElement('span');
      bar.className = 'bar ' + className;
      bar.style.width = (funnel[key] * point.fraction / maximum * 100) + '%';
      row.append(bar);
    }
    const label = document.createElement('span');
    label.className = 'month-label';
    label.textContent = date(point.date);
    const tooltip = document.createElement('span');
    tooltip.className = 'tooltip';
    tooltip.textContent = description;
    row.append(label, tooltip);
    chart.append(row);
  }
  axis.replaceChildren();
  for (let index = 0; index <= 5; index++) {
    const tick = document.createElement('span');
    tick.textContent = new Intl.NumberFormat(locale, { notation: maximum > 9999 ? 'compact' : 'standard', maximumFractionDigits: 1 }).format(funnel.prospects * index / 5);
    axis.append(tick);
  }
}
