export function calculateFunnel({ revenue, order, leadRate, prospectRate }) {
  if (![revenue, order, leadRate, prospectRate].every(Number.isFinite) || revenue < 0 || revenue > 1e12 || order < 0.01 || order > 1e12 || leadRate < 1 || leadRate > 100 || prospectRate < 1 || prospectRate > 100) {
    throw new RangeError('invalidNumbers');
  }
  const customers = revenue / order;
  const leads = customers * 100 / leadRate;
  const prospects = leads * 100 / prospectRate;
  return { customers, leads, prospects };
}

export function campaignSchedule(start, end) {
  const parse = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new RangeError('invalidDates');
    const date = new Date(value + 'T00:00:00Z');
    if (!Number.isFinite(+date) || date.toISOString().slice(0, 10) !== value) throw new RangeError('invalidDates');
    return date;
  };
  const first = parse(start), last = parse(end);
  const days = Math.round((last - first) / 86400000) + 1;
  if (days <= 0 || days > 3660) throw new RangeError('invalidDates');
  const count = Math.min(6, days);
  const points = Array.from({ length: count }, (_, index) => {
    const elapsed = Math.ceil(days * (index + 1) / count);
    return { date: new Date(+first + (elapsed - 1) * 86400000), fraction: elapsed / days };
  });
  return { days, points };
}
