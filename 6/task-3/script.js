const $areaInput = document.querySelector('#area-input');
const $locationInput = document.querySelector('#location-input');
const $result = document.querySelector('#result');

const apiUrl = 'http://localhost:8080';
let intervalId;

document.querySelector('#location-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const area = $areaInput.value;
  const location = $locationInput.value;

  while ($result.firstChild) {
    $result.removeChild($result.lastChild);
  }

  if (area === '' || location === '') return

  let counter = 1;

  const intervalCallback = async () => {
    // From API
    const response = await fetch(`${apiUrl}/${area}/${location}`);
    const data = await response.json();
    const localDate = new Date();
    // 2020-05-22T09:20:25.565297+01:00

    const queryDate = data.datetime;
    const day = queryDate.slice(0, 10);
    const time = queryDate.slice(11, 19);;
    const gmt = `GMT ${queryDate.slice(26, 32)}`;

    console.log(`${day} ${time} ${gmt}`)
    console.log(data.datetime)

    const element = document.createElement('div');
    element.innerHTML = `<div class="element" id="element">
      <h3>Element ${counter}</h3>
      <p>Local time: ${localDate.toString()}</p>
      <p>Time in ${location}: ${day} ${time} ${gmt}</p>
    </div>
    `;
    $result.appendChild(element);

    counter++;
  };

  intervalId = setInterval(intervalCallback, 1000);
});

document.querySelector('#stop').addEventListener('click', () => {
  clearInterval(intervalId);
});
