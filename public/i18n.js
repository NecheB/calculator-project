const bg = {
  tagline: 'Ясен път към вашата цел за оборот.', live: 'Прогноза на живо', setup: 'НАСТРОЙКИ НА КАМПАНИЯТА', language: 'Език', currency: 'Валута', start: 'Начало на кампанията', end: 'Край на кампанията', revenue: 'Целеви оборот', order: 'Средна стойност на поръчката', currencyNote: 'Валутата променя обозначението, без валутно преизчисляване.', overview: 'ВАШАТА КАМПАНИЯ С ЕДИН ПОГЛЕД', forecast: 'Пътят към вашата цел', growth: 'Натрупване за периода на кампанията', people: 'Хора', prospects: 'Контакти', leads: 'Потенциални клиенти', customers: 'Клиенти', prospectsNote: 'Хора, с които да се свържете', leadsNote: 'Разговори, които да започнете', customersNote: 'Поръчки, които да спечелите', tune: 'НАСТРОЙТЕ ПРОЦЕНТИТЕ НА ОТГОВОР', leadRate: 'Отговори от потенциални клиенти', prospectRate: 'Отговори от контакти', leadHint: 'От заинтересовани до плащащи клиенти', prospectHint: 'От първи контакт до потенциален клиент', footer: 'По-точни данни. По-ясни цели. По-добри кампании.', days: 'дни', invalidDates: 'Изберете валиден период до 10 години. Краят трябва да бъде на или след началната дата.', invalidNumbers: 'Въведете оборот от 0 до 1 трилион, средна поръчка от 0,01 до 1 трилион и проценти от 1% до 100%.', chartLabel: 'Прогноза за натрупване на резултатите от кампанията'
};
const en = { days: 'days', prospects: 'Prospects', leads: 'Leads', customers: 'Customers', invalidDates: 'Choose a valid campaign period of up to 10 years. The end must be on or after the start.', invalidNumbers: 'Enter a revenue goal from 0 to 1 trillion, an order value from 0.01 to 1 trillion, and response rates from 1% to 100%.', chartLabel: 'Cumulative campaign forecast' };
document.querySelectorAll('[data-i18n]').forEach(element => { en[element.dataset.i18n] = element.textContent; });
export function translate(language) {
  const text = language === 'bg' ? bg : en;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = text[element.dataset.i18n]; });
  document.getElementById('chart').setAttribute('aria-label', text.chartLabel);
  return text;
}
