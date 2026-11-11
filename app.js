const CHECK_DATE_URL = 'https://vk.ru/write-49944516';
const GROUP_URL = 'https://vk.ru/ockula';
const media = await fetch('media.json').then((response) => response.json());
const order = ['IMG_3399', 'IMG_3391', 'IMG_3394', 'IMG_3402', 'IMG_3393', 'IMG_3405', 'IMG_3398', 'IMG_1237', 'IMG_0881', 'IMG_3392', 'IMG_3395', 'IMG_3403', 'IMG_3401', 'IMG_3404'];
const layouts = {
  IMG_3399: [0, 0, 100, 100, 0, 0], IMG_3391: [68, 55, 30, 18, -4, 8], IMG_3394: [1, 4, 32, 19, 3, 7], IMG_3402: [55, 30, 42, 23, 2, 11], IMG_3393: [55, 3, 43, 27, -3, 13], IMG_3405: [1, 52, 31, 18, 3, 10], IMG_3398: [2, 28, 40, 22, -3, 12], IMG_1237: [3, 70, 28, 16, -2, 7], IMG_0881: [70, 70, 27, 17, 2, 8], IMG_3392: [18, 12, 50, 27, -2, 9], IMG_3395: [41, 34, 48, 26, 2, 10], IMG_3403: [1, 78, 31, 17, -3, 11], IMG_3401: [13, 54, 47, 31, -2, 12], IMG_3404: [49, 56, 49, 36, 3, 14]
};
const key = (item) => item.src.match(/IMG_\d{4}/)?.[0] ?? item.src;
const photos = [...media].sort((a,b) => order.indexOf(key(a)) - order.indexOf(key(b)));
const page = document.createElement('div'); page.className = 'page';
const gallery = document.createElement('section'); gallery.className = 'gallery'; gallery.setAttribute('aria-label', 'Свадебная галерея');
photos.forEach((item, index) => {
  const card = document.createElement('article'); card.className = 'media-card';
  const l = layouts[key(item)] ?? [30, 30, 30, 22, 0, index];
  ['--x','--y','--w','--h','--tilt'].forEach((name, i) => card.style.setProperty(name, `${l[i]}${i === 4 ? 'deg' : '%'}`));
  card.style.setProperty('--delay', `${index * 70}ms`); card.style.zIndex = l[5];
  const frame = document.createElement('div'); frame.className = 'media-frame';
  const image = document.createElement('img'); image.src = item.src; image.alt = item.alt; image.loading = index < 4 ? 'eager' : 'lazy'; image.decoding = 'async'; frame.append(image); card.append(frame); gallery.append(card);
});
const actions = document.createElement('nav'); actions.className = 'end-actions'; actions.setAttribute('aria-label', 'Навигация');
const date = document.createElement('a'); date.className = 'action primary'; date.href = CHECK_DATE_URL; date.textContent = '📅 Проверить дату';
const back = document.createElement('a'); back.className = 'action'; back.href = GROUP_URL; back.textContent = '↩️ Вернуться обратно';
actions.append(date, back); gallery.append(actions); page.append(gallery); document.querySelector('#app').replaceChildren(page);
requestAnimationFrame(() => document.querySelectorAll('.media-card').forEach((card) => card.classList.add('is-visible')));
