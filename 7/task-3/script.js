const $searchForm = $('#search');
const $result = $('#result');
const $progressBar = $('.progress-bar');
const $button = $('#button');

const url = 'http://localhost:8080/search';

const requestLimit = Math.floor(Math.random() * 5 + 3);
const progressWidth = parseInt($('.progress').css('width').slice(0, -2));
const increment = progressWidth / requestLimit;

$searchForm.on('submit', async (e) => {
  e.preventDefault();
  const id = $("#id").val();

  const res = await fetch(`${url}/${encodeURIComponent(id)}`);
  const data = await res.json();

  const curProgress = parseInt($progressBar.css('width').slice(0, -2));
  $progressBar.css('width', `${curProgress + increment}px`);
  $progressBar.text(`${Math.ceil(((curProgress + increment) / progressWidth) * 100)}%`);

  if ($('.progress').css('width') <= `${curProgress + increment}px`) {
    $button.prop('disabled', true);
    $progressBar.text("100%");
  }

  for (let [key, value] of Object.entries(data))
    $result.append(`<tr><td>${key}</td><td>${value}</td></tr>`);
  $result.append(`<br>`);
});
