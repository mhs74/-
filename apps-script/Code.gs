/**
 * 강의 섭외 문의 → 구글 시트 저장 + 이메일 알림 + 자동 회신
 *
 * 받는 값 (POST, JSON 또는 폼 형식)
 *   name     이름 (필수)
 *   email    이메일 (필수)
 *   phone    전화번호
 *   company  회사, 직함
 *   message  강의 문의 내용
 *
 * 설치 방법은 같은 폴더의 README.md 를 보세요.
 */

// ===== 설정 =====
const OWNER_EMAIL = 'meshe921@gmail.com'; // '새 문의 도착' 알림을 받을 내 이메일
const OWNER_NAME = '서미화'; // 자동 회신 메일의 보내는 사람 이름
const SHEET_NAME = '문의'; // 문의를 쌓을 시트(탭) 이름. 없으면 자동으로 만듭니다.
const HEADERS = ['이름', '이메일', '전화번호', '회사,직함', '강의 문의 내용'];
const SEND_AUTO_REPLY = true; // 신청자에게 '문의가 접수되었습니다' 회신을 보낼지
// =================

const LIMITS = { name: 50, email: 100, phone: 30, company: 100, message: 3000 };

/** 문의 접수 (웹 앱 POST) */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = readPayload_(e);

    // 스팸 방지: 사람에게는 보이지 않는 칸(website)이 채워져 있으면 저장하지 않고 성공처럼 응답합니다.
    if (data.website) return json_({ ok: true });

    const inquiry = clean_(data);
    const error = validate_(inquiry);
    if (error) return json_({ ok: false, error: error });

    lock.waitLock(10000);
    const sheet = getSheet_();
    sheet.appendRow([
      safeCell_(inquiry.name),
      safeCell_(inquiry.email),
      textCell_(inquiry.phone),
      safeCell_(inquiry.company),
      safeCell_(inquiry.message),
    ]);
    SpreadsheetApp.flush();
    lock.releaseLock();

    notifyOwner_(inquiry, sheet);
    if (SEND_AUTO_REPLY) replyToApplicant_(inquiry);

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: '문의를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.' });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignore) {}
  }
}

/** 주소를 브라우저로 열었을 때 동작 확인용 */
function doGet() {
  return json_({ ok: true, message: '문의 접수 스크립트가 동작 중입니다.' });
}

/**
 * 처음 한 번 실행해서 권한을 허용하고 동작을 확인하는 테스트입니다.
 * 실행하면 시트에 한 줄이 추가되고, 알림·자동 회신 메일이 OWNER_EMAIL 로 옵니다.
 */
function testDoPost() {
  const res = doPost({
    postData: {
      type: 'application/json',
      contents: JSON.stringify({
        name: '서미화',
        email: 'meshe921@gmail.com',
        phone: '01021262533',
        company: '뷰티앤웰니스 AI 대표',
        message: '[테스트] 임직원 대상 생성형 AI 챗GPT 활용 특강 문의드립니다.',
      }),
    },
  });
  console.log(res.getContent());
}

// ----- 내부 함수 -----

function readPayload_(e) {
  if (!e) return {};
  const body = e.postData && e.postData.contents;
  if (body) {
    try {
      return JSON.parse(body);
    } catch (ignore) {
      // JSON 이 아니면 폼 형식(e.parameter)으로 읽습니다.
    }
  }
  return e.parameter || {};
}

function clean_(d) {
  const out = {};
  Object.keys(LIMITS).forEach(function (k) {
    out[k] = String(d[k] == null ? '' : d[k]).trim().slice(0, LIMITS[k]);
  });
  out.email = out.email.toLowerCase();
  return out;
}

function validate_(q) {
  if (!q.name) return '이름을 입력해 주세요.';
  if (!q.email) return '이메일을 입력해 주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.email)) return '이메일 형식을 확인해 주세요.';
  return '';
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#f5e3e8');
    sheet.setFrozenRows(1);
    sheet.getRange('C:C').setNumberFormat('@');
    sheet.setColumnWidth(HEADERS.length, 420);
  }
  return sheet;
}

// 전화번호처럼 0 으로 시작하는 값이 숫자로 바뀌어 0 이 사라지지 않도록 글자로 저장합니다.
function textCell_(v) {
  return v ? "'" + v : v;
}

// =, +, -, @ 로 시작하는 값은 시트가 수식으로 실행하지 않도록 앞에 ' 를 붙입니다.
function safeCell_(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function notifyOwner_(q, sheet) {
  const url = sheet.getParent().getUrl() + '#gid=' + sheet.getSheetId();
  const rows = [
    ['이름', q.name],
    ['이메일', q.email],
    ['전화번호', q.phone],
    ['회사, 직함', q.company],
    ['강의 문의 내용', q.message],
  ];
  const text =
    rows.map(function (r) { return r[0] + ': ' + (r[1] || '-'); }).join('\n') +
    '\n\n시트에서 보기: ' + url +
    '\n이 메일에 답장하면 신청자에게 바로 회신됩니다.';
  const html =
    '<h2 style="margin:0 0 16px">새 강의 문의가 도착했습니다</h2>' +
    '<table style="border-collapse:collapse;font-size:14px">' +
    rows
      .map(function (r) {
        return (
          '<tr><th style="text-align:left;padding:8px 16px 8px 0;color:#7a7074;vertical-align:top;white-space:nowrap">' +
          r[0] +
          '</th><td style="padding:8px 0;white-space:pre-wrap">' +
          escape_(r[1] || '-') +
          '</td></tr>'
        );
      })
      .join('') +
    '</table>' +
    '<p style="margin-top:20px"><a href="' + url + '">시트에서 보기</a> · 이 메일에 답장하면 신청자에게 바로 회신됩니다.</p>';

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: '새 문의 도착 - ' + q.name + (q.company ? ' (' + q.company + ')' : ''),
    body: text,
    htmlBody: html,
    replyTo: q.email,
    name: '강의 문의 알림',
  });
}

function replyToApplicant_(q) {
  const text =
    q.name + '님, 안녕하세요. ' + OWNER_NAME + '입니다.\n\n' +
    '강의 문의가 정상적으로 접수되었습니다.\n' +
    '내용을 확인한 뒤 남겨주신 연락처로 회신드리겠습니다.\n\n' +
    '— 접수 내용 —\n' +
    '회사, 직함: ' + (q.company || '-') + '\n' +
    '전화번호: ' + (q.phone || '-') + '\n' +
    '강의 문의 내용:\n' + (q.message || '-') + '\n\n' +
    '추가로 전하실 내용이 있으면 이 메일에 바로 답장해 주세요.\n\n' +
    OWNER_NAME + ' 드림';

  MailApp.sendEmail({
    to: q.email,
    subject: '문의가 접수되었습니다 - ' + OWNER_NAME + ' 강사',
    body: text,
    replyTo: OWNER_EMAIL,
    name: OWNER_NAME,
  });
}

function escape_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
