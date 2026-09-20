import { calculateFunnel, campaignSchedule } from './calculator.js';

const $ = id => document.getElementById(id);
const format = value => new Intl.NumberFormat('en', { maximumFractionDigits: 2 }).format(value);
function update() {
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
    $('duration').textContent = schedule.days + ' days';
    for (const key of ['prospects', 'leads', 'customers']) $(key).textContent = format(funnel[key]);
    const leadPercent = Number($('prospect-rate').value);
    const customerPercent = leadPercent * Number($('lead-rate').value) / 100;
    $('lead-percent').textContent = format(leadPercent) + '%';
    $('customer-percent').textContent = format(customerPercent) + '%';
    $('lead-meter').style.width = leadPercent + '%';
    $('customer-meter').style.width = customerPercent + '%';
    document.dispatchEvent(new CustomEvent('forecast-update', { detail: { funnel, schedule } }));
  } catch (error) {
    $('error').textContent = error.message === 'invalidDates' ? 'Choose a valid campaign period of up to 10 years. The end must be on or after the start.' : 'Enter a revenue goal from 0 to 1 trillion, an order value from 0.01 to 1 trillion, and response rates from 1% to 100%.';
    $('error').hidden = false;
    $('results').hidden = true;
    $('duration').textContent = '—';
  }
}
document.querySelectorAll('input, select').forEach(input => input.addEventListener('input', update));
$('settings').addEventListener('submit', event => event.preventDefault());
update();
