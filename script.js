const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

// Paste the deployed Google Apps Script Web App URL here.
const SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyJW2QI4rUEo7-_1azcpHsHQah8LpvBr1xeDJrKHmtgeJg_8sjG3EbMrhT3K3nW2qXs1w/exec';


/* TOAST */

const toast = (msg) => {

  const e = $('#toast');

  if (!e) return;

  e.textContent = msg;
  e.classList.add('show');

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    e.classList.remove('show');
  }, 2400);
};


/* IMAGE FALLBACKS */

$$('img[data-fallback]').forEach(img => {

  img.addEventListener('error', () => {

    if (img.dataset.usedFallback) return;

    img.dataset.usedFallback = '1';
    img.src = img.dataset.fallback;

  });

});


$$('img').forEach(img => {

  img.addEventListener(
    'error',
    () => img.classList.add('image-error'),
    { once:true }
  );

});


/* MOBILE NAV */

const menuToggle = $('#menuToggle');
const mobileNav = $('#mobileNav');

menuToggle?.addEventListener('click', () => {

  const open = mobileNav.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    open
  );

});


$$('.mobile-nav a').forEach(a => {

  a.addEventListener('click', () => {

    mobileNav.classList.remove('open');

    menuToggle?.setAttribute(
      'aria-expanded',
      'false'
    );

  });

});


/* REVEAL ANIMATION */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(e => {

        if (e.isIntersecting) {

          e.target.classList.add('visible');

          revealObserver.unobserve(
            e.target
          );

        }

      });

    },
    {
      threshold:.12
    }
  );


$$('.reveal').forEach(e => {
  revealObserver.observe(e);
});


/* SOUND */

let audioCtx = null;
let soundOn = false;


function tone(freq = 520, d = .05) {

  if (!soundOn) return;

  audioCtx ??=
    new (window.AudioContext ||
    window.webkitAudioContext)();

  const o =
    audioCtx.createOscillator();

  const g =
    audioCtx.createGain();

  o.frequency.value = freq;
  o.type = 'sine';

  g.gain.setValueAtTime(
    .018,
    audioCtx.currentTime
  );

  g.gain.exponentialRampToValueAtTime(
    .0001,
    audioCtx.currentTime + d
  );

  o.connect(g).connect(
    audioCtx.destination
  );

  o.start();

  o.stop(
    audioCtx.currentTime + d
  );
}


$('#soundToggle')?.addEventListener(
  'click',
  async () => {

    soundOn = !soundOn;

    if (soundOn) {

      audioCtx ??=
        new (window.AudioContext ||
        window.webkitAudioContext)();

      if (
        audioCtx.state ===
        'suspended'
      ) {
        await audioCtx.resume();
      }

      tone(520,.08);

      setTimeout(
        () => tone(760,.09),
        55
      );

    }

    const b = $('#soundToggle');

    b.classList.toggle(
      'on',
      soundOn
    );

    b.setAttribute(
      'aria-pressed',
      soundOn
    );

    $('span',b).textContent =
      soundOn
        ? 'Sound on'
        : 'Sound off';

    if (!soundOn) {
      toast('Soundscape muted.');
    }

  }
);


/* DINING */

const menus = {

  breakfast:[
    [
      'Seraya Breakfast',
      'Eggs, sourdough, fruit, yoghurt, coffee',
      '$28'
    ],
    [
      'Coconut Pancakes',
      'Palm sugar, banana, coconut cream',
      '$16'
    ],
    [
      'Tropical Fruit Bowl',
      'Seasonal island fruit, lime, mint',
      '$13'
    ],
    [
      'Avocado Toast',
      'Sourdough, avocado, herbs, poached egg',
      '$18'
    ],
    [
      'Garden Granola',
      'Coconut yoghurt, seeds, mango',
      '$15'
    ],
    [
      'French Toast',
      'Brioche, vanilla, berries',
      '$17'
    ],
    [
      'Fresh Juice',
      'Pineapple, orange or watermelon',
      '$9'
    ]
  ],

  lunch:[
    [
      'Grilled Catch',
      'Daily fish, herbs, greens, lemon',
      '$34'
    ],
    [
      'Coconut Curry',
      'Vegetables, jasmine rice, coconut broth',
      '$26'
    ],
    [
      'Island Chicken',
      'Charred chicken, garden salad, citrus',
      '$29'
    ],
    [
      'Herb Pasta',
      'Seasonal vegetables, parmesan, basil',
      '$26'
    ],
    [
      'Seraya Salad',
      'Leaves, mango, cucumber, toasted seeds',
      '$18'
    ],
    [
      'Crispy Fish Tacos',
      'Three tacos, slaw, lime, salsa',
      '$24'
    ]
  ],

  snacks:[
    [
      'Coconut Chips',
      'Toasted coconut with sea salt',
      '$8'
    ],
    [
      'Garden Hummus',
      'Hummus, flatbread, vegetables',
      '$12'
    ],
    [
      'Truffle Fries',
      'Crisp potatoes, herbs, parmesan',
      '$11'
    ],
    [
      'Fruit Skewers',
      'Seasonal fruit with lime',
      '$9'
    ],
    [
      'Afternoon Tea',
      'Tea, pastries, finger sandwiches',
      '$22'
    ]
  ],

  dinner:[
    [
      'Seraya Tasting Menu',
      "Chef's five-course island-inspired menu",
      '$85'
    ],
    [
      'Charcoal Grilled Catch',
      'Catch of the day, vegetables, citrus butter',
      '$42'
    ],
    [
      'Coconut Prawn Curry',
      'Prawns, coconut, herbs, jasmine rice',
      '$38'
    ],
    [
      'Garden Risotto',
      'Seasonal vegetables, parmesan, herbs',
      '$32'
    ],
    [
      'Slow Roasted Chicken',
      'Herbs, root vegetables, pan jus',
      '$36'
    ],
    [
      'Mushroom Tagliatelle',
      'Wild mushrooms, parmesan, black pepper',
      '$30'
    ]
  ],

  dessert:[
    [
      'Chocolate Tart',
      'Dark chocolate, sea salt, vanilla cream',
      '$14'
    ],
    [
      'Coconut Panna Cotta',
      'Mango, lime, toasted coconut',
      '$13'
    ],
    [
      'Mango Sorbet',
      'Fresh mango, lime zest',
      '$9'
    ],
    [
      'Warm Banana Cake',
      'Banana, caramel, coconut cream',
      '$14'
    ],
    [
      'Island Cheesecake',
      'Passionfruit and vanilla',
      '$15'
    ]
  ],

  /* ZERO-PROOF ONLY */

  bar:[
    [
      'Citrus Spritz',
      'Orange, grapefruit, lime, sparkling water',
      '$12'
    ],
    [
      'Passionfruit Cooler',
      'Passionfruit, pineapple, lime, soda',
      '$11'
    ],
    [
      'Coconut Lime Fizz',
      'Coconut water, lime, mint, sparkling water',
      '$11'
    ],
    [
      'Hibiscus Iced Tea',
      'Hibiscus, berries, citrus',
      '$9'
    ],
    [
      'Ginger Pineapple',
      'Fresh pineapple, ginger, lime',
      '$10'
    ],
    [
      'Cucumber Tonic',
      'Cucumber, basil, lime, tonic',
      '$10'
    ],
    [
      'Sunset Lemonade',
      'Lemon, peach, rosemary',
      '$9'
    ],
    [
      'Island Coffee',
      'Cold brew, coconut, vanilla',
      '$9'
    ]
  ]

};


function renderMenu(key = 'breakfast') {

  const panel = $('#menuPanel');

  if (!panel) return;

  panel.innerHTML =
    menus[key]
      .map(x => `
        <article class="menu-item">

          <div>
            <h4>${x[0]}</h4>
            <p>${x[1]}</p>
          </div>

          <span class="menu-price">
            ${x[2]}
          </span>

        </article>
      `)
      .join('');

}


renderMenu();


$$('.menu-tabs button').forEach(b => {

  b.addEventListener('click', () => {

    $$('.menu-tabs button')
      .forEach(x =>
        x.classList.remove('active')
      );

    b.classList.add('active');

    renderMenu(
      b.dataset.menu
    );

    tone(620,.05);

  });

});


/* MAP */

const places = {

  arrival:{
    n:'01',
    title:'Arrival Lounge',
    desc:
      'Your first pause on the island, with cool towels, fresh fruit and an ocean-facing welcome.',
    meta:'08:00 — 22:00',
    price:'Included',
    photo:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=82'
  },

  villas:{
    n:'02',
    title:'Ocean Residences',
    desc:
      'Four private residences positioned around gardens, beach and evening light.',
    meta:'24 hour access',
    price:'From $680',
    photo:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=82'
  },

  pool:{
    n:'03',
    title:'Infinity Pool',
    desc:
      'An ocean-facing pool with shaded loungers and a long afternoon horizon.',
    meta:'07:00 — 21:00',
    price:'Included',
    photo:
      'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=1100&q=82'
  },

  dining:{
    n:'04',
    title:'Tide House',
    desc:
      'All-day dining built around island produce, grilled catch and long lunches.',
    meta:'07:00 — 22:30',
    price:'From $13',
    photo:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=82'
  },

  wellness:{
    n:'05',
    title:'Wellness House',
    desc:
      'A quiet house for facial rituals, movement, meditation and restorative treatments.',
    meta:'08:00 — 20:00',
    price:'From $30',
    photo:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1100&q=82'
  },

  games:{
    n:'06',
    title:'Games Pavilion',
    desc:
      'Table tennis, chess, board games and a relaxed family lounge.',
    meta:'10:00 — 23:00',
    price:'From $12',
    photo:
      'https://images.unsplash.com/photo-1523867574998-1a336b6ded04?auto=format&fit=crop&w=1100&q=82'
  },

  cinema:{
    n:'07',
    title:'Cinema Lawn',
    desc:
      'Outdoor film nights beneath the stars with blankets and island snacks.',
    meta:'Selected nights',
    price:'$24',
    photo:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1100&q=82'
  },

  reef:{
    n:'08',
    title:'Reef Deck',
    desc:
      'A calm launch point for supervised ocean experiences and quiet time beside the water.',
    meta:'09:00 — 17:00',
    price:'From $35',
    photo:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1100&q=82'
  }

};


$$('.map-pin').forEach(pin => {

  pin.addEventListener('click', () => {

    const p =
      places[pin.dataset.place];

    if (!p) return;

    $$('.map-pin').forEach(x =>
      x.classList.remove('active')
    );

    pin.classList.add('active');

    $('#mapNumber').textContent =
      p.n;

    $('#mapTitle').textContent =
      p.title;

    $('#mapDescription').textContent =
      p.desc;

    $('#mapMeta').textContent =
      p.meta;

    $('#mapPrice').textContent =
      p.price;

    const photo =
      $('#mapPhoto');

    photo.style.opacity = '0';

    setTimeout(() => {

      photo.src = p.photo;
      photo.alt = p.title;
      photo.style.opacity = '1';

    },150);

    tone(700,.06);

  });

});


/* RESIDENCE BUTTONS */

$$('.stay-select,.table-add')
  .forEach(b => {

    b.addEventListener('click', () => {

      const name =
        b.dataset.stay;

      const option =
        [...$('#staySelect').options]
          .find(o =>
            o.textContent.startsWith(name)
          );

      if (option) {
        $('#staySelect').value =
          option.value;
      }

      $('#planner')
        ?.scrollIntoView({
          behavior:'smooth'
        });

      toast(
        `${name} selected for your sample plan.`
      );

      tone(640,.06);

    });

  });


/* PLANNER */

function nights(a,b){

  if (!a || !b) return 0;

  const n =
    Math.round(
      (
        new Date(b + 'T00:00:00') -
        new Date(a + 'T00:00:00')
      ) / 86400000
    );

  return n > 0 ? n : 0;
}


$('#plannerForm')?.addEventListener(
  'submit',
  async e => {

    e.preventDefault();

    const checkIn = $('#checkIn').value;
    const checkOut = $('#checkOut').value;
    const n = nights(checkIn, checkOut);

    if (!n) {
      $('#checkOut').setCustomValidity(
        'Check-out must be after check-in.'
      );
      $('#checkOut').reportValidity();
      return;
    }

    $('#checkOut').setCustomValidity('');

    const room =
      Number($('#staySelect').value);

    const selectedAdditions =
      $$('#plannerForm fieldset input[type=checkbox]:checked');

    const extras =
      selectedAdditions
        .map(x =>
          Number(x.dataset.price)
        );

    const names =
      selectedAdditions
        .map(x => x.value);

    const total =
      room * n +
      extras.reduce(
        (a,b) => a + b,
        0
      );

    $('#planResult').innerHTML = `

      <span>
        YOUR PLAN · ${n} NIGHTS
      </span>

      <h3>
        ${
          $('#staySelect')
            .selectedOptions[0]
            .textContent
            .split(' — ')[0]
        }
      </h3>

      <p>
        ${
          names.length
            ? 'Added: ' + names.join(' · ')
            : 'A beautifully simple stay with no additions selected.'
        }
      </p>

      <div class="estimate">

        <small>
          ILLUSTRATIVE ESTIMATE
        </small>

        <strong>
          $${total.toLocaleString()}
        </strong>

      </div>

    `;

    if (!SHEETS_WEB_APP_URL) {
      toast('Add your Apps Script Web App URL to script.js to enable submission.');
      return;
    }

    const submitButton =
      $('#plannerForm button[type="submit"]');

    submitButton.disabled = true;

    const inquiry = new URLSearchParams({
      guestName: $('#guestName').value.trim(),
      guestEmail: $('#guestEmail').value.trim(),
      guestPhone: $('#guestPhone').value.trim(),
      guestCount: $('#guestCount').value,
      residence: $('#staySelect').selectedOptions[0].textContent.trim(),
      checkIn,
      checkOut,
      nights: String(n),
      additions: names.join(', '),
      estimate: String(total),
      website: $('[name="website"]').value
    });

    try {
      await fetch(SHEETS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: inquiry
      });

      toast('Inquiry sent. This is not a confirmed reservation.');
      tone(520,.08);
    } catch (error) {
      console.error('Booking inquiry submission failed:', error);
      toast('Could not send your inquiry. Please try again.');
    } finally {
      submitButton.disabled = false;
    }

  }
);


const today =
  new Date()
    .toISOString()
    .slice(0,10);


if ($('#checkIn'))
  $('#checkIn').min =
    today;


if ($('#checkOut'))
  $('#checkOut').min =
    today;


$('#checkIn')?.addEventListener(
  'change',
  () =>
    $('#checkOut').min =
      $('#checkIn').value || today
);


/* CELEBRATIONS */

const celebrationCopy = {

  Birthday:
    'Birthday selected — your sample concept includes a sunset table, cake and garden lights.',

  Anniversary:
    'Anniversary selected — your sample concept includes a quiet ocean table, flowers and a sunset setting.',

  'Private Dinner':
    'Private dinner selected — your sample concept includes a tailored menu and intimate table setting.',

  'Family Gathering':
    'Private event selected — your sample concept includes a flexible gathering layout and shared dining.'

};


$$('.celebrate').forEach(b => {

  b.addEventListener('click', () => {

    $$('.celebrate')
      .forEach(x =>
        x.classList.remove('active')
      );

    b.classList.add('active');

    $('#celebrationResult')
      .textContent =
      celebrationCopy[
        b.dataset.celebration
      ];

    tone(600,.05);

  });

});


/* SHOP BAG */

let bag = 0;


$$('.shop-btn').forEach(b => {

  b.addEventListener('click', () => {

    bag++;

    $('#bagCount').textContent =
      bag;

    toast(
      `${b.dataset.product} added to your sample bag.`
    );

    tone(780,.06);

  });

});


/* JOURNAL MODAL */

const stories = {

  mornings:[
    '01 / STORY',
    'The Art of Slow Mornings',
    'The first hour at Seraya is intentionally unhurried: warm coffee, soft light, garden paths and the sound of water moving beyond the trees. The idea is simple — start the day with less noise and more room to notice things.'
  ],

  food:[
    '02 / FOOD',
    'Island Flavours',
    'Tide House follows the rhythm of the island. Bright fruit, herbs, grilled vegetables, fresh catch and warm breads become the building blocks of a menu that feels generous without feeling heavy.'
  ],

  reef:[
    '03 / PLACE',
    'Life Beneath the Reef',
    'The reef is part of the Seraya story even when you are standing on land. The concept experience keeps ocean time calm, supervised and respectful of the surrounding environment.'
  ]

};


const modal =
  $('#storyModal');


$$('.story-btn').forEach(b => {

  b.addEventListener('click', () => {

    const s =
      stories[b.dataset.story];

    $('#storyCategory').textContent =
      s[0];

    $('#storyTitle').textContent =
      s[1];

    $('#storyText').textContent =
      s[2];

    modal.classList.add('open');

    modal.setAttribute(
      'aria-hidden',
      'false'
    );

  });

});


function closeStory(){

  modal.classList.remove('open');

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

}


$('#storyClose')
  ?.addEventListener(
    'click',
    closeStory
  );


$$('[data-close-modal]')
  .forEach(x =>
    x.addEventListener(
      'click',
      closeStory
    )
  );


/* GALLERY LIGHTBOX */

const lightbox =
  $('#lightbox');


$$('.gallery-item img')
  .forEach(img => {

    img.addEventListener(
      'click',
      () => {

        $('#lightboxImage').src =
          img.currentSrc || img.src;

        $('#lightboxImage').alt =
          img.alt;

        lightbox.classList.add(
          'open'
        );

        lightbox.setAttribute(
          'aria-hidden',
          'false'
        );

      }
    );

  });


function closeLightbox(){

  lightbox.classList.remove(
    'open'
  );

  lightbox.setAttribute(
    'aria-hidden',
    'true'
  );

}


$('#lightboxClose')
  ?.addEventListener(
    'click',
    closeLightbox
  );


lightbox?.addEventListener(
  'click',
  e => {

    if (
      e.target === lightbox
    ) {
      closeLightbox();
    }

  }
);


/* CURSOR GLOW */

const cursor =
  $('.cursor-glow');


window.addEventListener(
  'pointermove',
  e => {

    if (
      cursor &&
      innerWidth > 900
    ) {

      cursor.style.left =
        e.clientX + 'px';

      cursor.style.top =
        e.clientY + 'px';

    }

  },
  {
    passive:true
  }
);


/* ESCAPE KEY */

document.addEventListener(
  'keydown',
  e => {

    if (e.key === 'Escape') {

      closeStory();
      closeLightbox();

      mobileNav?.classList.remove(
        'open'
      );

    }

  }
);


/* HERO VIDEO FALLBACK */

const video =
  $('.hero-video');


video?.addEventListener(
  'error',
  () => {
    video.style.display = 'none';
  }
);