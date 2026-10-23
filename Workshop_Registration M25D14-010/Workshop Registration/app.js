'use strict';

const workshopOptions = [
  'Web Development Basics',
  'UI/UX Design',
  'JavaScript and React',
  'Cybersecurity Essentials'
];

const form = document.getElementById('registration-form');
const workshopSelect = document.getElementById('workshop');
const notice = document.getElementById('notice');
const list = document.getElementById('registration-list');
const search = document.getElementById('search');
const registrations = [];

workshopOptions.forEach((workshop) => {
  const option = document.createElement('option');
  option.value = workshop;
  option.textContent = workshop;
  workshopSelect.appendChild(option);
});

document.getElementById('workshop-count').textContent = workshopOptions.length;
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
document.getElementById('date').min = localToday;

function setError(field, message = '') {
  const input = document.getElementById(field);
  input.closest('.field').classList.toggle('invalid', Boolean(message));
  document.getElementById(`${field}-error`).textContent = message;
}

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Enter your full name.';
  else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!data.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email, such as name@example.com.';

  if (!data.phone.trim()) errors.phone = 'Enter your phone number.';
  else if (!/^\+?[\d\s()-]{7,20}$/.test(data.phone.trim()) || data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number with at least 7 digits.';

  if (!data.date) errors.date = 'Choose a preferred date.';
  else if (data.date < localToday) errors.date = 'Choose today or a future date.';

  if (!data.age) errors.age = 'Enter your age.';
  else if (!Number.isInteger(Number(data.age)) || Number(data.age) < 16 || Number(data.age) > 100) errors.age = 'Age must be a whole number from 16 to 100.';

  if (!data.workshop) errors.workshop = 'Select a workshop.';

  if (!data.portfolio.trim()) errors.portfolio = 'Enter a portfolio or website URL.';
  else {
    try {
      const url = new URL(data.portfolio.trim());
      if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) throw new Error('Invalid URL');
    } catch {
      errors.portfolio = 'Enter a complete URL starting with https:// or http://.';
    }
  }
  return errors;
}

function showNotice(message, success = false) {
  notice.textContent = message;
  notice.className = `notice show${success ? ' success' : ''}`;
}

function renderRegistrations() {
  document.getElementById('registration-count').textContent = registrations.length;
  document.getElementById('count-pill').textContent = `${registrations.length} total`;
  const term = search.value.trim().toLowerCase();
  const visible = registrations.filter((person) =>
    [person.name, person.email, person.workshop].some((value) => value.toLowerCase().includes(term))
  );
  list.replaceChildren();

  if (visible.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    heading.textContent = registrations.length && term ? 'No matching participants' : 'No registrations yet';
    paragraph.textContent = registrations.length && term ? 'Try another name, email, or workshop.' : 'Complete the form above to add the first participant.';
    empty.append(heading, paragraph);
    list.appendChild(empty);
    return;
  }

  visible.forEach((person) => {
    const article = document.createElement('article');
    article.className = 'registration-item';
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = person.name.trim().charAt(0).toUpperCase();
    const info = document.createElement('div');
    info.className = 'participant';
    const name = document.createElement('h3');
    name.textContent = person.name.trim();
    const contact = document.createElement('p');
    contact.textContent = `${person.email} · ${person.phone}`;
    const tags = document.createElement('div');
    tags.className = 'tags';
    [person.workshop, person.date, `Age ${person.age}`].forEach((text) => {
      const tag = document.createElement('span');
      tag.textContent = text;
      tags.appendChild(tag);
    });
    const portfolio = document.createElement('a');
    portfolio.href = person.portfolio;
    portfolio.target = '_blank';
    portfolio.rel = 'noopener noreferrer';
    portfolio.textContent = 'View portfolio';
    info.append(name, contact, tags, portfolio);
    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove registration for ${person.name}`);
    remove.addEventListener('click', () => {
      // filter() creates a new array instead of mutating the existing one.
      const remaining = registrations.filter((item) => item.id !== person.id);
      registrations.splice(0, registrations.length, ...remaining);
      showNotice(`Registration for ${person.name} was removed.`, true);
      renderRegistrations();
    });
    article.append(avatar, info, remove);
    list.appendChild(article);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const errors = validate(data);
  ['name', 'email', 'phone', 'date', 'age', 'workshop', 'portfolio'].forEach((field) => setError(field, errors[field] || ''));

  if (Object.keys(errors).length) {
    const firstInvalid = form.querySelector('.field.invalid input, .field.invalid select');
    firstInvalid?.focus();
    showNotice('Please correct the highlighted fields before submitting.');
    return;
  }

  // Spread syntax creates a new registration object; the list is updated immutably.
  const registration = { ...data, id: `${Date.now()}-${Math.random()}` };
  const nextRegistrations = [...registrations, registration];
  registrations.splice(0, registrations.length, ...nextRegistrations);
  form.reset();
  ['name', 'email', 'phone', 'date', 'age', 'workshop', 'portfolio'].forEach((field) => setError(field));
  showNotice(`Registration completed successfully for ${registration.name.trim()}.`, true);
  renderRegistrations();
});

form.addEventListener('input', (event) => {
  if (event.target.name) setError(event.target.name);
});
form.addEventListener('change', (event) => {
  if (event.target.name) setError(event.target.name);
});
search.addEventListener('input', renderRegistrations);
renderRegistrations();
