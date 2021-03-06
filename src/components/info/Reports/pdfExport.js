/*global chrome*/
import jsPDF from "jspdf";

const PageBufferLength = 45;
const SectionBufferLength = 10;
const ItemBufferLength = 10;

const DefaultYPos = 35;
const XMargin = 10;

const LargeText = 20;
const NormalText = 14;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


async function getData() {
  const chrome_data = {};

  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(null, (data) => {
        Object.assign(chrome_data, {
          user_info: data.user_info,
          limits: data.limits,
          transaction_info: data.transaction_info
        });
        resolve(chrome_data.transaction_info);
      });
    }
    catch (ex) {
      reject(ex);
    }
  });
}

export async function exportPDF(type, day, month, year) {
  const transaction_info = await getData();

  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  const target = `${String((date.getMonth() + 1))}/${date.getFullYear()}`;
  const fullMonth = months[date.getMonth()];

  const doc = new jsPDF();
  writeTitleToPdf(doc, "$pendy Spending Report");
  let y = DefaultYPos;

  if (transaction_info === undefined || transaction_info[target] === undefined) {
    doc.save("SpendyReport.pdf");
    return;
  }

  if (type === 'Monthly') {
    exportPDFMonth(doc, transaction_info[target], fullMonth, y, date);
  } else if (type === 'Weekly') {
    exportPDFWeek(doc, transaction_info, target, fullMonth, y, date);
  } else { // type === 'day'
    exportPDFDay(doc, transaction_info[target]["days"], fullMonth, y, date);
  }
  doc.save("SpendyReport.pdf");
}

function exportPDFMonth(doc, monthInfo, fullMonth, y, date) {
  y = writeToPdf(doc, `${fullMonth} ${date.getFullYear()} Spending Report - Total Spent: $${monthInfo["amount_spent"]}`, y, true);

  for (const day in monthInfo["days"]) {
    y = writeToPdf(doc,  `${fullMonth} ${day}`, y, true);
    y = writeItemsFromDay(doc, monthInfo["days"][day], y);
  }
}

function exportPDFWeek(doc, transaction_info, target, fullMonth, y, date) {
  let weekAgoDate = new Date(new Date(date).setDate(date.getDate() - 7));

  y = writeToPdf(doc, `${months[weekAgoDate.getMonth()]} ${weekAgoDate.getDate()} ${weekAgoDate.getFullYear()} to ${fullMonth} ${date.getDate()} ${date.getFullYear()} Spending Report`, y, true);

  if (date.getMonth() === weekAgoDate.getMonth()) {
    for (const day in transaction_info[target]["days"]) {
      if (weekAgoDate.getDate() < day && day <= date.getDate()) {
        y = writeToPdf(doc,  `${fullMonth} ${day}`, y, true);
        y = writeItemsFromDay(doc, transaction_info[target]["days"][day], y);
      }
    }
  } else { // 7 days goes over month/year bounds
    let weekAgoTarget = `${String((weekAgoDate.getMonth() + 1))}/${weekAgoDate.getFullYear()}`;

    if (transaction_info[weekAgoTarget] !== undefined) {
      for (const day in transaction_info[weekAgoTarget]["days"]) {
        if (day > weekAgoDate.getDate()) {
          y = writeToPdf(doc,  `${months[weekAgoDate.getMonth()]} ${day}`, y, true);
          y = writeItemsFromDay(doc, transaction_info[weekAgoTarget]["days"][day], y);
        }
      }
    }

    for (const day in transaction_info[target]["days"]) {
      if (day <= date.getDate()) {
        y = writeToPdf(doc, `${fullMonth} ${day}`, y, true);
        y = writeItemsFromDay(doc, transaction_info[target]["days"][day], y);
      }
    }
  }
}

function exportPDFDay(doc, days, fullMonth, y, date) {
  for (const day in days) {
    if (day === String(date.getDate())) {
      y = writeToPdf(doc, `${fullMonth} ${date.getDate()} ${date.getFullYear()} Spending Report`, y, true);
      y = writeItemsFromDay(doc, days[day], y);
      return;
    }
  }
}

function writeTitleToPdf(doc, title) {
  doc.setFont(undefined, 'bold').setFontSize(LargeText);
  doc.text(title, doc.internal.pageSize.width / 2, 20, null, null, 'center');
  doc.setFont(undefined, 'normal').setFontSize(NormalText);
}

function writeItemsFromDay(doc, day, y) {
  for (let item = 0; item < day.length; item++) {
    y = writeToPdf(doc, `$${day[item]["amount"]} - ${day[item]["item_desc"]}`, y, false);
  }
  return y + SectionBufferLength;
}

function extendPage(doc, y) {
  if (y >= doc.internal.pageSize.height - PageBufferLength) {
    doc.addPage();
    return DefaultYPos;
  }
  return y + ItemBufferLength;
}

function writeToPdf(doc, text, y, bold) {
  if (bold) {
    doc.setFont(undefined, 'bold');
  }
  doc.text(text, XMargin, y);
  doc.setFont(undefined, 'normal');

  return extendPage(doc, y);
}
