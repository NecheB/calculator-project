import { calculateFunnel, campaignSchedule } from './calculator.js';
import { renderChart } from './chart.js';
import { translate } from './i18n.js';

const $ = id => document.getElementById(id);
const format = value => new Intl.NumberFormat($('language').value, { maximumFractionDigits: 2 }).format(value);
function update() {
  const locale = $('language').value;
  const text = translate(locale);
  const symbol = { USD: '$', EUR: '€', BGN: 'лв.', GBP: '£' }[$('currency').value];
  document.querySelectorAll('.currency-symbol').forEach(element => { element.textContent = symbol; });
  for (const name of ['lead', 'prospect']) {
    const slider = $(name + '-rate');
    $(name + '-output').textContent = slider.value + '%';
    slider.style.setProperty('--fill', slider.value + '%');
  }
  try {
    const revenue = $('revenue').value === '' ? NaN : Number($('revenue').value);
    const funnel = calculateFunnel({ revenue, order: Number($('order').value), leadRate: Number($('lead-rate').value), prospectRate: Number($('prospect-rate').value) });
    const schedule = campaignSchedule($('start').value, $('end').value);
    $('error').hidden = true;
    $('results').hidden = false;
    $('duration').textContent = schedule.days + ' ' + text.days;
    for (const key of ['prospects', 'leads', 'customers']) $(key).textContent = format(funnel[key]);
    const leadPercent = Number($('prospect-rate').value);
    const customerPercent = leadPercent * Number($('lead-rate').value) / 100;
    $('lead-percent').textContent = format(leadPercent) + '%';
    $('customer-percent').textContent = format(customerPercent) + '%';
    $('lead-meter').style.width = leadPercent + '%';
    $('customer-meter').style.width = customerPercent + '%';
    renderChart({ funnel, schedule }, { locale, labels: { prospects: text.prospects, leads: text.leads, customers: text.customers } });
  } catch (error) {
    $('error').textContent = text[error.message] || text.invalidNumbers;
    $('error').hidden = false;
    $('results').hidden = true;
    $('duration').textContent = '—';
  }
}
document.querySelectorAll('input, select').forEach(input => input.addEventListener('input', update));
$('settings').addEventListener('submit', event => event.preventDefault());
update();
